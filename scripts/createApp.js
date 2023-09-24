var fs = require('fs');
var { XMLParser, XMLBuilder } = require('fast-xml-parser');
var xmlFormat = require('xml-formatter');

/**
 * add the new app's url in 'src/sitemap.xml'
 * @param {*} newAppName
 */
function addUrlInSitemap(newAppName) {
  var siteMapData = fs.readFileSync('./src/sitemap.xml', {
    encoding: 'UTF-8',
  });

  const parser = new XMLParser({
    ignoreAttributes: false,
    ignoreDeclaration: false,
  });

  let jObj = parser.parse(siteMapData);

  // add new tool url
  jObj.urlset.url.push({
    loc: `https://webtoolseasy.com/tools/${newAppName}`,
    lastmod: new Date().toISOString().split('T')[0],
  });

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    ignoreDeclaration: false,
  });
  const xmlContent = xmlFormat(builder.build(jObj));

  // write updated sitemap
  fs.writeFileSync('./src/sitemap.xml', xmlContent, {
    encoding: 'UTF-8',
  });
}

/**
 * create app's component config in 'src/environments/component-config/new-app'
 */
function createNewAppComponentConfig() {
  var configPath =
    './src/environments/component-config/' + process.env.APP_NAME;

  /**
   * check if the directory exists
   */
  if (!fs.existsSync(configPath)) {
    fs.mkdirSync(configPath);
  }

  fs.copyFileSync(
    './scripts/bootstrap-data/bootstrapConfig.ts',
    configPath + '/config.ts'
  );
}

/**
 * register new app in 'src/environments/apps.json'
 * @param {*} newAppName
 */
function registerNewApp(newAppName) {
  const formattingSpace = '  '
  const appsConfigJson = JSON.parse(
    fs.readFileSync('./src/environments/apps.json', {
      encoding: 'utf8',
    })
  );

  const applicationId = newAppName.replaceAll('-', '');
  appsConfigJson[applicationId] = {
    applicationId,
    displayText: newAppName,
    iconName: `${newAppName}-icon`,
    navigateUrl: `/tools/${newAppName}`,
    iconRelativeUrl: '',
  };

  fs.writeFileSync(
    './src/environments/apps.json',
    JSON.stringify(appsConfigJson, null, formattingSpace),
    {
      encoding: 'utf8',
    }
  );
}

createNewAppComponentConfig();

addUrlInSitemap(process.env.APP_NAME);

registerNewApp(process.env.APP_NAME);

console.log(`new application has been created: ${process.env.APP_NAME}`);
