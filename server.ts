import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { addResponseHeaders } from 'ssr-server-helper';

const serverCache: Map<string, any> = new Map();

// The Express app is exported so that it can be used by serverless Functions.
export function app(serverCache: Map<string, any>): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/webtoolseasy/browser');
  const monacoDistFolder = join(
    process.cwd(),
    'dist/webtoolseasy/browser/assets/monaco'
  );
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  /**
   * added this only to get rid of the error for this specific file
   */
  server.get(
    '**/simpleWorker.nls.js.map',
    express.static(monacoDistFolder, {
      maxAge: '1y',
      fallthrough: false,
      setHeaders: addResponseHeaders,
    })
  );

  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
      fallthrough: false,
      setHeaders: addResponseHeaders,
    })
  );

  // All regular routes use the Universal engine
  server.get(
    '*',
    (req, res, next) => {
      const cachedHtml = serverCache.get(req.url);
      if (cachedHtml) {
        addResponseHeaders(res);

        // console.log(`[WebToolsEasy] Serving from server cache`);

        // Cache exists. Send it.
        res.send(cachedHtml);
      } else {
        // Cache does not exist. Render a response using the Angular app
        next();
      }
    },
    (req, res) => {
      addResponseHeaders(res);
      res.render(
        indexHtml,
        {
          req,
          providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
        },
        (err: Error, html: string) => {
          // Cache the rendered `html` for this request url to use for subsequent requests
          // console.log(`[WebToolsEasy] Serving from server`);
          serverCache.set(req.url, html);
          res.send(html);
        }
      );
    }
  );

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4200;

  // Start up the Node server
  const server = app(serverCache);
  server.listen(port, () => {
    console.log(`webtoolseasy server started at port: ${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
