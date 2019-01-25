const config = require('./config');
const path = require('path');
let manifest = require(path.join(config.executable.path, config.executable.manifest));

const WebSocket = require('ws');
const server = new WebSocket.Server({ port: config.server.port});
let _socket; 

server.on('connection', (socket) => {
    _socket = socket;
    _socket.on('message',(msg)=> {
        console.log("\n"+ msg);
    });
});

// Message from index.js
process.on('message', (msg) => {
    switch(msg) {
        case 'button':
            var json = {
                "action": manifest.Actions[0].UUID,
                "event": "keyUp",
                "context": '',
                "device": config.deviceId,
                "payload": {
                    "settings": {},
                    "coordinates": {
                        "column": 3, 
                        "row": 1
                    },
                    "state": 0,
                    "userDesiredState": 1,
                    "isInMultiAction": false
                }
            };
            _socket.send(JSON.stringify(json));
            break;
        default:
            console.log('\nUnknown Index message: '+ msg);
            break;
    }
});
