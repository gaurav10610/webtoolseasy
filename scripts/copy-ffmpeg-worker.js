var fs = require('fs');

let baseDestinationPath = './src/assets/@ffmpeg';

let baseSourcePath = './node_modules/@ffmpeg/ffmpeg/dist/esm';

let files = ['const.js', 'errors.js', 'worker.js'];

files.forEach(file => {
  if (fs.existsSync(`${baseDestinationPath}/${file}`)) {
    fs.rmSync(`${baseDestinationPath}/${file}`);
  }

  fs.copyFileSync(`${baseSourcePath}/${file}`, `${baseDestinationPath}/${file}`);
});