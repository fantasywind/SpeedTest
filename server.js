var express = require('express');
var app = express();
var debug = require('debug')('SpeedTest');
var stream = require('stream');

app.use(express.static('static'));

app.get('/100m', function (req, res) {
  var faker = new stream.PassThrough();
  var buf = new Buffer(104857600); // 100m
  debug(`Send Buffer Size: ${buf.length}`);

  faker.end(buf);

  res.set({
    'Content-Length': buf.length,
  });
  faker.pipe(res);
});

app.get('/1g', function (req, res) {
  var faker = new stream.PassThrough();
  var buf = new Buffer(1073741824); // 1g
  debug(`Send Buffer Size: ${buf.length}`);

  faker.end(buf);

  res.set({
    'Content-Length': buf.length,
  });
  faker.pipe(res);
});

debug('Server Listen on 3010 port');

app.listen(3010);
