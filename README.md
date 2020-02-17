# Raspberry Pi Relay API

This is a Node.js project for the Raspberry Pi.  It uses a relay hat to independently control three light bulbs.

Each bulb can be switched on and off through a simple HTTP POST API, which also allows the current status of each bulb to be retrieved.

There is a simple HTML front end that allows the user to see and change the state of each bulb.

This project was put together for the San Diego JS Fundamental JS Meetup group in January 2020.  Fundamental JS aims to explore vanilla JavaScript with minimal use of frameworks, so this project doesn't use any Node or front end frameworks apart from the npm package used to control the relays via the Pi's GPIO ports.

[Read the full blog post with video on my website!](https://simonprickett.dev/controlling-real-world-objects-with-raspberry-pi-and-node-js/)

Hardware used for this:

* Raspberry Pi 3 (any model with 40 pin GPIO header works).
* [Electronics Salon 3 Relay hat for Raspberry Pi](https://www.amazon.com/gp/product/B07CZL2SKN/).
* A [6 position terminal strip](https://www.amazon.com/gp/product/B07DM14L14/) for connecting wires without soldering.
* 3 x [cleat style light sockets](https://www.amazon.com/gp/product/B000BQRY5M/) that can be screwed to a board.
* 3 x colored lightbulbs from Home Depot.
* Lamp cord to cut up and connect the bulbs to the relays with.
* A length of wood from Home Depot to screw everything down to.
