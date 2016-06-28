
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'Content-Type' : 'application/json',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var stubMsg = {results: []};


var requestHandler = function(request, response) {
  var method = request.method;
  var url = request.url;

  var statusCode = 404;

  console.log('Serving request type ' + method + ' for url ' + url);
  
  if (method === 'OPTIONS') {
    statusCode = 200;
    response.writeHead(statusCode, defaultCorsHeaders);
    response.end();
    
 
  } else if (method === 'GET') {
    if (request.url === '/classes/messages/' || request.url === '/classes/messages') {
      statusCode = 200;
    }  
  } else if (method === 'POST') {
    if (request.url === '/classes/messages/' || request.url === '/classes/messages') {
      statusCode = 201;
      request.on('data', function(chunk) {
        stubMsg.results.push(JSON.parse(chunk.toString()));
      });
      request.on('end', function() {
        response.writeHead(statusCode, defaultCorsHeaders);
        response.end();
      });
    }
  } 
   
  response.writeHead(statusCode, defaultCorsHeaders);

 
  response.end(JSON.stringify(stubMsg));
};


exports.requestHandler = requestHandler;
