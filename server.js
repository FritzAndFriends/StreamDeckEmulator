const Chalk = require('chalk');
const config = require('./config');
const path = require('path');
let manifest = require(path.join(config.executable.path, config.executable.manifest));

const WebSocket = require('ws');
const server = new WebSocket.Server({ port: config.server.port});
let _socket; 
let _settings = {};
let _globalSettings = {};

server.on('connection', (socket) => {
    _socket = socket;
    _socket.on('message',(msg)=> {
        var evt = JSON.parse(msg);
        console.log(Chalk.black.bgCyan(msg));
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
                console.log(Chalk.green(`********TITLE SET: title: ${evt.payload.title} - Sending titleParametersDidChange event to plugin\n`));
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
                var json = {
                    'action': manifest.Actions[0].UUID, 
                    'event': 'didReceiveSettings', 
                    'context': '', 
                    'device': config.server.deviceId, 
                    'payload': {
                      'settings': _settings,
                      'coordinates': {
                        'column': 3, 
                        'row': 1
                      }, 
                    'isInMultiAction': false
                    }
                };
                console.log(Chalk.black.bgGreen(JSON.stringify(json)));
                _socket.send(JSON.stringify(json));
                break;

            case 'getGlobalSettings':
                var json = {
                    'event': 'didReceiveGlobalSettings', 
                    'payload': {
                      'settings': _globalSettings
                    }
                };
                console.log(Chalk.black.bgGreen(JSON.stringify(json)));
                _socket.send(JSON.stringify(json));
                break;

            case 'getSettings':
                var json = {
                    'action': manifest.Actions[0].UUID, 
                    'event': 'didReceiveSettings', 
                    'context': '', 
                    'device': config.server.deviceId, 
                    'payload': {
                      'settings': _settings,
                      'coordinates': {
                        'column': 3, 
                        'row': 1
                      }, 
                    'isInMultiAction': false
                    }
                };
                console.log(Chalk.black.bgGreen(JSON.stringify(json)));
                _socket.send(JSON.stringify(json));
                break;

            case 'setGlobalSettings':
                console.log(Chalk.green(`********GLOBAL SETTINGS STORED: ${JSON.stringify(evt.payload)} *******\n`));
                _globalSettings = evt.payload;
                var json = {
                    'event': 'didReceiveGlobalSettings', 
                    'payload': {
                      'settings': _globalSettings
                    }
                };
                console.log(Chalk.black.bgGreen(JSON.stringify(json)));
                _socket.send(JSON.stringify(json));
                break;
            case 'setImage':
                console.log(Chalk.green(`********SET IMAGE RECEIVED: ${evt.payload.target} *******\n`));
                break;
            case 'setState':
                console.log(Chalk.green(`********SET STATE RECEIVED: ${JSON.stringify(evt.payload)} *******\n`));
                break;
            case 'switchToProfile':
                console.log(Chalk.green(`********SWITCH TO PROFILE RECEIVED: ${JSON.stringify(evt.payload)} *******\n`));
                break;
            case 'logMessage':
                console.log(Chalk.green(`********LOG MESSAGE RECEIVED: ${JSON.stringify(evt.payload)} *******\n`));
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
        case 'applicationDidLaunch':
            var adlJson = {
                "event": "applicationDidLaunch",
                "payload" : {
                    "application": "com.apple.mail"
                }
            };
            console.log(Chalk.black.bgGreen(JSON.stringify(adlJson)));
            _socket.send(JSON.stringify(adlJson));
            break;
        case 'applicationDidTerminate':
            var adtJson = {
                "event": "applicationDidTerminate",
                "payload" : {
                    "application": "com.apple.mail"
                }
            };
            console.log(Chalk.black.bgGreen(JSON.stringify(adtJson)));
            _socket.send(JSON.stringify(adtJson));
            break;
        case 'propertyInspectorDidAppear':
            json.event =  "propertyInspectorDidAppear";
            console.log(Chalk.black.bgGreen(JSON.stringify(json)));
            _socket.send(JSON.stringify(json));
            break;
        case 'propertyInspectorDidDisappear':
            json.event =  "propertyInspectorDidDisappear";
            console.log(Chalk.black.bgGreen(JSON.stringify(json)));
            _socket.send(JSON.stringify(json));
            break;
        case 'sendToPlugin':
            json.event = "sendToPlugin";
            json.payload.settings.message = "It can be anything you want";
            console.log(Chalk.black.bgGreen(JSON.stringify(json)));
            _socket.send(JSON.stringify(json));
            break;
        default:
            console.log(Chalk.red(`\nUnknown Index message: ${msg}`));
            break;
    }
});
