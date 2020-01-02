const http = require('http');
const gpio = require('onoff').Gpio;

const relays = [
  new gpio(26, 'out'),
  new gpio(20, 'out'),
  new gpio(21, 'out')
];

// Turn off all relays.
relays.forEach(relay => relay.writeSync(0));

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
    const relayNumber = parseInt(
      request.url.substring(request.url.length - 1), 
      10
    );

    if (request.method === 'POST') {
      relays[relayNumber -1].writeSync(1);
    }     

    response.end(relays[relayNumber -1].readSync() === 1 ? 'true': 'false'); 
    return;
  }

  // Unknown request.
  response.writeHead(404);
  response.end('Not found.');
}).listen(8888);
