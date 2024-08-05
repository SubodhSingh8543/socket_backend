const WebSocket = require('ws');
const data = require("./inputUpdates.json");

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', socket => {
    console.log('Connected to listener');

    let orders = data;
    console.log(orders.length);
    const sendUpdates = (updates, delay) => {
        setTimeout(() => {
            updates.forEach(update => {
                socket.send(JSON.stringify({update,logs:`Update sent to order book at ${new Date().toISOString()} for client ${update.ClientID} : ${JSON.stringify(update)}`}));
            });
        }, delay);
    };

    sendUpdates(orders.slice(0, 10), 1000);
    sendUpdates(orders.slice(10, 30), 3000);
    sendUpdates(orders.slice(30, 70), 6000);
    sendUpdates(orders.slice(70, 100), 11000);
});

console.log('WebSocket server started on port 8080');
