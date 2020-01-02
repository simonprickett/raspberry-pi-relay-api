const http = require('http');

http.createServer((request, response) => {
  // Check request method is valid.
  if (! ['GET', 'POST'].includes(request.method)) {
    response.writeHead(500);
    response.end('Bad request.');
    return;
  }

  if (request.url === '/relays') {
    response.writeHead(200);
    response.end('All relays.');
    return;
  }

  if (['/relays/1', '/relays/2', '/relays/3'].includes(request.url)) {
    response.writeHead(200);
    const relayNumber = request.url.substring(request.url.length - 1);

    // TODO Deal with GET or POST here...
    response.end(`Relay ${relayNumber}.`);
    return;
  }

  // Unknown request.
  response.writeHead(404);
  response.end('Not found.');
}).listen(8888);