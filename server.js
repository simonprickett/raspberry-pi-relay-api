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
  let requestBody = '';

  request.on('data', chunk => {
    requestBody = `${requestBody}${chunk.toString}`;
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
      let relayNumber = parseInt(
        request.url.substring(request.url.length - 1),
        10
      );

      // Take 1 off of relayNumber as arrays are indexed.
      relayNumber = relayNumber - 1;

      if (request.method === 'POST') {
        // Parse the request body JSON.
        const r = JSON.parse(requestBody);

        switch (r.state) {
          case 'true':
            relays[relayNumber].writeSync(1);
            console.log(`Switched relay ${relayNumber} on.`);
            break;
          case 'false':
            relays[relayNumber].writeSync(0);
            console.log(`Switched relay ${relayNumber} off.`);
            break;
          default:
            response.writeHead(500);
            response.end('Bad request.');
            return;
        }
      }

      // Return true if the relay is on, otherwise false.
      // TODO UPGRADE THIS TO A JSON RESPONSE WITH RELAY NUMBER AND STATE...
      response.end(relays[relayNumber].readSync() === 1);
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
