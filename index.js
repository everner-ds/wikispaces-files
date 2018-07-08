const path = require('path');
const fs = require('fs');
const http = require('http');
const rp = require('request-promise');
const cheerio = require('cheerio');


function makeDirectory(dirPath) {
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

var getPageFromHref = function(href) {
  // Gets page number from href
  /*
  http://saludspeakers.wikispaces.com/space/content?orderBy=name&orderDir=asc&o=120&responseToken=d6920ea426fa7133e7b66c6deacae13c
  */
  const url = new URL(href);
  return url.SearchParams.get('o');
}

var getPageNums = function($) {
  // Gets number of files that each page starts with
  var pages = [];
  var list = $('tfoot').find('tr').find('ul[class=pagination pull-left]');
  list.each(function(i, elem) {
    var href = $(this).find('a').attr('href')
    pages[i] = getPageFromHref(href);
  });

}

var processHTML = function($, folder) {

  var lastPage = getLastPageNum($);
  $('tbody').find('tr').each(function(i, elem) {
    console.log(i);
    var children = $(this).find('td').get(2)['children'];
    children.forEach(function(el) {
      if (el.name == 'a') {
        filePath = el.attribs.href;
        console.log(filePath);
        //download(filePath, folder)
      }
    });
  });
}

const folder = 'files'
makeDirectory(folder);

const url = "http://saludspeakers.wikispaces.com/space/content?orderBy=name&orderDir=asc"

const options = {
  uri: url,
  transform: function (body) {
    return cheerio.load(body)
  }
}

rp(options)
  .then(($) => {
    processHTML($, folder);
  })
  .catch((err) => {
    console.log(err);
  });

