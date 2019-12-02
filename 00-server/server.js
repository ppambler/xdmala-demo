var http = require('http');
var url = require('url')
var smzdm = require('./mock')
var data = [];

var app = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)
  var path = parsedUrl.pathname
  console.log(path)
  var reg = /\/(\w+)/g
  var arr = path.match(reg) || []
  path = arr[arr.length - 1]
  if (path) {
    (async function () {
      data = await smzdm(`${path}`)
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data, null, 3));
    })()
  } else if (!path) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.write('呜呜呜')
    res.end()
  }
});
app.listen(8888);
console.log('请打开 http://localhost:8888')