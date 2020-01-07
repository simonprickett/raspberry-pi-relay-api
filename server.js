const http = require('http');
const gpio = require('onoff').Gpio;

const relays = [
  new gpio(26, 'out'),
  new gpio(20, 'out'),
  new gpio(21, 'out')
];

const allRelaysOff = () => {
  relays.forEach(relay => relay.writeSync(0));
};


// Turn off all relays on start up.
allRelaysOff();

http.createServer((request, response) => {
  const requestBody = [];

  request.on('data', chunk => {
    requestBody.push(chunk);
  });

  request.on('end', () => {
    // Check request method is valid.
    if (!['GET', 'POST'].includes(request.method)) {
      response.writeHead(500);
      response.end('Bad request.');
      return;
    }

    if (['/relays/1', '/relays/2', '/relays/3'].includes(request.url)) {
      response.writeHead(200);
      const relayNumber = parseInt(
        request.url.substring(request.url.length - 1),
        10
      );

      if (request.method === 'POST') {
        switch (requestBody.join('')) {
          case 'true':
            relays[relayNumber - 1].writeSync(1);
            break;
          case 'false':
            relays[relayNumber - 1].writeSync(0);
            break;
          default:
            response.writeHead(500);
            response.end('Bad request.');
            return;
        }
      }

      // Return true if the relay is on, otherwise false.
      response.end(relays[relayNumber - 1].readSync() === 1 ? 'true' : 'false');
      return;
    }

    // If we get to here, we have an unknown request.
    response.writeHead(404);
    response.end('Not found.');
  });
}).listen(8888);

// Handle Ctrl+C exit cleanly by turning off all relays.
process.on('SIGINT', () => {
  allRelaysOff();
  process.exit();
})
