const path = require('path');
const fs = require('fs');
const http = require('http');

var makeDirectory = function(dirPath) {
  // Creates directory if it doesn't exist
  if (fs.existsSync(dirPath)) {
    console.log('Folder named ' + dirPath + ' exists');
    return true;
  } else {
    fs.mkdirSync(dirPath);
    console.log('Creating ' + dirPath);
  }
}

var download = function(url, folder, cb) {
  // Downloads file
  var dest = path.join(folder, path.basename(url));
  var file = fs.createWriteStream(dest);
  console.log('Downloading ' + url + ' to ' + dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      console.log('Finished downloading');
      file.close(cb);
    });
  }).on('error', function(err) {
    console.log('Error: ' + err);
    fs.unlink(dest);
    if (cb) {
      cb(err.message);
    }
  });
}

module.exports = {makeDirectory, download};
