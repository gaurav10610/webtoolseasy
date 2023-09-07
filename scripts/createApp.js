var fs = require('fs');

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
