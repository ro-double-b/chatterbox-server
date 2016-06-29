var express = require('express');
// var serverStatic = require('server-static')
var app = express();
var http = require('http');

app.use(express.static(__dirname + '/client'));
// var handleRequest = require('./request-handler');
var defaultCorsHeaders = {
  'Content-Type' : 'application/json',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var stubMsg = {results: [
    {username: 'anonymous',
    text: 'hello',
    roomname: 'lobby'}]};

app.get('/classes/messages', (request, response) => {
  response.writeHead(200, defaultCorsHeaders);
  response.end(JSON.stringify(stubMsg));
});

app.post('/classes/messages', (request, response) => {
  request.on('data', (chunk) => {
    stubMsg.results.push(JSON.parse(chunk.toString()));
  });
  request.on('end', function() {
    response.writeHead(201, defaultCorsHeaders);
    response.end();
  });
});

app.options('/classes/messages', (request, response) => {
  response.writeHead(200, defaultCorsHeaders);
  response.end();
});

var server = app.listen(3000, () => {
  var host = '127.0.0.1';
  var port = 3000;
});
console.log('Listening on http://' + '127.0.0.1' + ':' + 3000);

