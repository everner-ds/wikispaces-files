const url = require('url');

var getParamFromURL = function(href, param) {
  // Gets page number from href
  /*
  http://saludspeakers.wikispaces.com/space/content?orderBy=name&orderDir=asc&o=120&responseToken=d6920ea426fa7133e7b66c6deacae13c
  */
  const myURL = new url.URL(href);
  return myURL.searchParams.get(param);
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

module.exports = { getParamFromURL, getPageNums, processHTML};
