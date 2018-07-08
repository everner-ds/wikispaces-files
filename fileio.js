var makeDirectory = function(dirPath) {
  // Creates directory if it doesn't exist
  if (fs.existsSync(dirPath)) {
    return true;
  } else {
    fs.mkdirSync(dirPath);
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
      file.close(cb);
    });
  }).on('error', function(err) {
    fs.unlink(dest);
    if (cb) {
      cb(err.message);
    }
  });
}

module.exports = {makeDirectory, download};
