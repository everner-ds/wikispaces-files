const path = require('path');
const fs = require('fs');
const http = require('http');
const rp = require('request-promise');
const cheerio = require('cheerio');
const web = require('./web');
const fileio = require('./fileio');

const folder = 'files'
fileio.makeDirectory(folder);

const url = "http://saludspeakers.wikispaces.com/space/content?orderBy=name&orderDir=asc"

const options = {
  uri: url,
  transform: function (body) {
    return cheerio.load(body)
  }
}

rp(options)
  .then(($) => {
    web.processHTML($, folder);
  })
  .catch((err) => {
    console.log(err);
  });

