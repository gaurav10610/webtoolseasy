import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

/**
 *
 * fixing document is undefined error
 */
// const domino = require('domino');
// const fs = require('fs');
// const path = require('path');
// const distFolder = join(process.cwd(), 'dist/webtoolseasy/browser');
// const template = fs
//   .readFileSync(path.join(distFolder, 'index.html'))
//   .toString();
// const win = domino.createWindow(template.toString());
// // @ts-ignore
// global['document'] = win.document;

import { AppServerModule } from './src/main.server';

const serverCache: Map<string, any> = new Map();

// The Express app is exported so that it can be used by serverless Functions.
export function app(serverCache: Map<string, any>): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/webtoolseasy/browser');
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

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
      setHeaders: function (res) {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      },
    })
  );

  // All regular routes use the Universal engine
  server.get(
    '*',
    (req, res, next) => {
      const cachedHtml = serverCache.get(req.url);
      if (cachedHtml) {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

        // Cache exists. Send it.
        res.send(cachedHtml);
      } else {
        // Cache does not exist. Render a response using the Angular app
        next();
      }
    },
    (req, res) => {
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      res.render(
        indexHtml,
        {
          req,
          providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
        },
        (err: Error, html: string) => {
          // Cache the rendered `html` for this request url to use for subsequent requests
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
