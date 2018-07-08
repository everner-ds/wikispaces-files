var expect = require('chai').expect;
var web = require('../web');

describe('getParamFromURL()', function () {
  it('should extract parameter from URL', function () {

    var real_param1 = 'a';
    var real_param2 = 'b';
    var url = `http://website.com/example?param1=${real_param1}&param2=${real_param2}`;
    console.log(url);

    var param1 = web.getParamFromURL(url, 'param1');
    expect(param1).to.be.equal(real_param1);

    var param2 = web.getParamFromURL(url, 'param2');
    expect(param2).to.be.equal(real_param2);
  });
});
