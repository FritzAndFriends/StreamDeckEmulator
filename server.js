const Chalk = require('chalk');
const config = require('./config');
const path = require('path');
let manifest = require(path.join(config.executable.path, config.executable.manifest));

const WebSocket = require('ws');
const server = new WebSocket.Server({ port: config.server.port});
let _socket; 
let _settings = {};

server.on('connection', (socket) => {
    _socket = socket;
    _socket.on('message',(msg)=> {
        var evt = JSON.parse(msg);
        console.log(msg.bgCyan.black);
        switch(evt.event) {
            case 'showOk':
                console.log(Chalk.green('*******OK ICON IS SHOWN\n'));
                break;
            case 'showAlert':
                console.log(Chalk.green('*******ALERT ICON IS DISPLAYED\n'));
                break;
            case 'registerEvent':
                console.log(Chalk.green(`********PLUGIN REGISTERED: uuid=${evt.uuid}\n`));
                break;
            case 'openUrl':
                console.log(Chalk.green(`********OPENING URL ${evt.payload.url}\n`));
                break;
            case 'setTitle':
                console.log(Chalk.green(`********TITLE SET: title: ${evt.payload.title} - Sending titleParametersDidChange event to plugin\n`.green));
                var json = {
                    'action': manifest.Actions[0].UUID, 
                    'event': 'titleParametersDidChange', 
                    'context': '', 
                    'device': config.server.deviceId, 
                    'payload': {
                      'coordinates': {
                        'column': 3, 
                        'row': 1
                      }, 
                      'settings': _settings, 
                      'state': 0, 
                      'title': '', 
                      'titleParameters': {
                        'fontFamily': '', 
                        'fontSize': 12, 
                        'fontStyle': '', 
                        'fontUnderline': false, 
                        'showTitle': true, 
                        'titleAlignment': 'bottom', 
                        'titleColor': '#ffffff'
                      }
                    }
                };
                console.log(Chalk.black.bgGreen(JSON.stringify(json)));
                _socket.send(JSON.stringify(json));
                break;
            case 'setSettings':
                console.log(Chalk.green(`********SETTINGS STORED: ${JSON.stringify(evt.payload)} *******\n`));
                _settings = evt.payload;
                break;
            default: 
                console.log(Chalk.red(`********UNKNOWN MESSAGE ${msg}\n`));
                break;
        }
    });
});

// Message from index.js
process.on('message', (msg) => {
    var json = {
        'action': manifest.Actions[0].UUID,
        'event': '',
        'context': '',
        'device': config.server.deviceId,
        'payload': {
            'settings': _settings,
            'coordinates': {
                'column': 3, 
                'row': 1
            },
            'state': 0,
            'userDesiredState': 1,
            'isInMultiAction': false
        }
    };
    switch(msg) {
        case 'keyDown':
            json.event = 'keyDown';
            console.log(Chalk.black.bgGreen(JSON.stringify(json)));
            _socket.send(JSON.stringify(json));
            break;
        case 'keyUp':
            json.event = 'keyUp';
            console.log(Chalk.black.bgGreen(JSON.stringify(json)));
            _socket.send(JSON.stringify(json));
            break;
        case 'willAppear': 
            json.event = 'willAppear';
            console.log(Chalk.black.bgGreen(JSON.stringify(json)));
            _socket.send(JSON.stringify(json));
            break;
        case 'willDisappear':
            json.event = 'willDisappear';
            console.log(Chalk.black.bgGreen(JSON.stringify(json)));
            _socket.send(JSON.stringify(json));
            break;
        case 'deviceDidConnect':
            let ddcJson = {
                'event': 'deviceDidConnect',
                'device': config.server.deviceId,
                 'deviceInfo': {
                    'type': 0,
                     'size': {
                        'columns': 5,
                        'rows': 3
                    }
                },
            };
            console.log(Chalk.black.bgGreen(JSON.stringify(ddcJson)));
            _socket.send(JSON.stringify(ddcJson));
            break;
        case 'deviceDidDisconnect':
            let dddJson= {
                'event': 'deviceDidDisconnect',
                'device': config.server.deviceId
            };
            console.log(Chalk.black.bgGreen(JSON.stringify(dddJson)));
            _socket.send(JSON.stringify(dddJson));
            break;
        default:
            console.log(Chalk.red(`\nUnknown Index message: ${msg}`));
            break;
    }
});
