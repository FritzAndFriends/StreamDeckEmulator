const config = require('./config');
const colors = require('colors');
var manifest = require(config.executable.path +'\\'+ config.executable.manifest);

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
                console.log('*******OK ICON IS SHOWN\n'.green);
                break;
            case 'showAlert':
                console.log('*******ALERT ICON IS DISPLAYED\n'.green);
                break;
            case 'registerEvent':
                console.log(`********PLUGIN REGISTERED: uuid=${evt.uuid}\n`.green);
                break;
            case 'openUrl':
                console.log(`********OPENING URL ${evt.payload.url}\n`.green)
                break;
            case 'setTitle':
                console.log(`********TITLE SET: title: ${evt.payload.title} - Sending titleParametersDidChange event to plugin\n`.green)
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
                console.log(JSON.stringify(json).bgGreen.black);
                _socket.send(JSON.stringify(json));
                break;
            case 'setSettings':
                console.log(`********SETTINGS STORED: ${JSON.stringify(evt.payload)} *******\n`.green);
                _settings = evt.payload;
                break;
            default: 
                console.log(`********UNKNOWN MESSAGE ${msg}\n`.red);
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
            console.log(JSON.stringify(json).bgGreen.black);
            _socket.send(JSON.stringify(json));
            break;
        case 'keyUp':
            json.event = 'keyUp';
            console.log(JSON.stringify(json).bgGreen.black);
            _socket.send(JSON.stringify(json));
            break;
        case 'willAppear': 
            json.event = 'willAppear';
            console.log(JSON.stringify(json).bgGreen.black);
            _socket.send(JSON.stringify(json));
            break;
        case 'willDisappear':
            json.event = 'willDisappear';
            console.log(JSON.stringify(json).bgGreen.black);
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
            console.log(JSON.stringify(ddcJson).bgGreen.black);
            _socket.send(JSON.stringify(ddcJson));
            break;
        case 'deviceDidDisconnect':
            let dddJson= {
                'event': 'deviceDidDisconnect',
                'device': config.server.deviceId
            };
            console.log(JSON.stringify(dddJson).bgGreen.black);
            _socket.send(JSON.stringify(dddJson));
            break;
        default:
            console.log(`\nUnknown Index message: ${msg}`.red);
            break;
    }
});