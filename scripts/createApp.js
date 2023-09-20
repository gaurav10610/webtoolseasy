var fs = require('fs');
var { XMLParser, XMLBuilder } = require('fast-xml-parser');
var xmlFormat = require('xml-formatter');

function addUrlInSitemap(newAppUrl) {
  var siteMapData = fs.readFileSync('./src/sitemap.xml', {
    encoding: 'UTF-8',
  });

  const parser = new XMLParser({
    ignoreAttributes: false,
    ignoreDeclaration: false
  });

  let jObj = parser.parse(siteMapData);
  jObj.urlset.url.push({
    loc: `https://webtoolseasy.com/tools/${newAppUrl}`,
    lastmod: new Date().toISOString().split('T')[0],
  });

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    ignoreDeclaration: false
  });
  const xmlContent = xmlFormat(builder.build(jObj));

  // write updated sitemap
  fs.writeFileSync('./src/sitemap.xml', xmlContent, {
    encoding: 'UTF-8',
  });
}

function createNewAppConfig() {
  console.log('creating app config for new app: ' + process.env.APP_NAME);
  var configPath =
    './src/environments/component-config/' + process.env.APP_NAME;

  fs.mkdirSync(configPath);
  fs.copyFileSync(
    './scripts/bootstrap-data/bootstrapConfig.ts',
    configPath + '/config.ts'
  );
}

createNewAppConfig();

//addUrlInSitemap('new-app-url');
