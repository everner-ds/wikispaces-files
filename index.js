const path = require('path');
const http = require('http');
const rp = require('request-promise');
const cheerio = require('cheerio');
const web = require('./web');
const fileio = require('./fileio');

const folder = 'files'
fileio.makeDirectory(folder);

const URL = "http://saludspeakers.wikispaces.com/space/content?orderBy=name&orderDir=asc"

const options = {
  uri: URL,
  transform: function (body) {
    return cheerio.load(body)
  }
};

rp(options)
  .then(($) => {
    // Get each page of files
    console.log('Start of callback');
    var pages = web.getPageNums($);
    console.log('Pages');
    console.log(pages);
    pages.forEach(function(element) {
      newOptions = {
        uri: web.getURLForPage(URL, element), // URL for next page
        transform: function (body) {
          return cheerio.load(body);
        }
      };
      rp(newOptions)
        .then(($) => {
          web.downloadFilesOnPage($, folder);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
  .catch((err) => {
    console.log(err);
  });

