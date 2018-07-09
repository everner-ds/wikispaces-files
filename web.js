const url = require('url');
const fileio = require('./fileio');

const PAGE_PARAM = 'o';
const FAKE_HREF_ORIGIN = 'http://fake.com'

var getParamFromURL = function(href, param) {
  // Gets page number from href
  /*
  http://saludspeakers.wikispaces.com/space/content?orderBy=name&orderDir=asc&o=120&responseToken=d6920ea426fa7133e7b66c6deacae13c
  */
  const myURL = new url.URL(href);
  return myURL.searchParams.get(param);
}

var getPageNums = function($) {
  // Quick fix with known page numbers
  return [0, 20, 40, 60, 80, 100, 120];
}
/*
var getPageNums = function($) {
  // Gets number of files that each page starts with
  var pages = [];
  var list = $('tfoot').find('tr').find('ul[class="pagination pull-left"]');
  list.each(function(i, elem) {
    if (elem.class != 'disabled') {
      var href = $(this).find('a').attr('href')
      var hrefValid = makeURLValid(href);
      pages[i] = getParamFromURL(hrefValid, PAGE_PARAM);
    }
  });
  return pages;
}
*/

var makeURLValid = function(href) {
  // Inserts beginning of URL to make it valid for url module
  return FAKE_HREF_ORIGIN + href;
}

var getURLForPage = function(href, page) {
  return href + '&o=' + page;
}

var downloadFilesOnPage = function($, folder) {
  // Go to each page, find all the files, and download them

  $('tbody').find('tr').each(function(i, elem) {
    console.log(i);
    var children = $(this).find('td').get(2)['children'];
    children.forEach(function(el) {
      if (el.name == 'a') {
        fileDetailPath = el.attribs.href;
        filePath = fileDetailPath.replace('detail', 'view');
        console.log('Downloading ' + filePath);
        fileio.download(filePath, folder);
      }
    });
  });
}

module.exports = { getParamFromURL, getPageNums, getURLForPage, downloadFilesOnPage};
