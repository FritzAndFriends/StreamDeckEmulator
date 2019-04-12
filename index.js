const Chalk = require('chalk');
const config = require('./config');
const { fork } = require('child_process');
const rlSync = require('readline-sync');
const { spawn } = require('cross-spawn');
const path = require('path');
const os = require('os');
let manifest = require(path.join(config.executable.path, config.executable.manifest));
const pluginExe = os.platform == 'win32' ? config.executable.winexe : `./${config.executable.osxexe}`;

const forked = fork('server.js');
console.log(Chalk.green('<status>Web Socket Server Started....'));

console.log([
    'Green Text denotes hardware action',
    'Green Highlight denotes hardware messages sent',
    'Cyan highlight denotes messages received from plugin'
].join('\n'));

// Registration Stuff
let info = {
    'application': {
      'language': 'en', 
      'platform': os.platform == 'win32' ? config.server.winplatform : config.server.osxplatform,
      'version': '4.0.0'
    }, 
    'devices': [
      {
        'id': config.server.deviceId, 
        'size': {
          'columns': 5, 
          'rows': 3
        }, 
        'type': 0
      }
    ]
  };

let actionIndex = selectAction();
forked.send({event:'registerActionIndex', arguments: actionIndex});
let registrationParams = [
    '-port', config.server.port, 
    '-pluginUUID', manifest.Actions[actionIndex].UUID,
    '-registerEvent','registerEvent',
    '-info', JSON.stringify(info),
    '-break'
];

console.log(`spawning ${pluginExe} in ${config.executable.path}`);
const plugin = spawn(pluginExe, registrationParams, { cwd: config.executable.path, stdio: 'inherit' });
console.log(`${pluginExe} has a PID of ${plugin.pid}`);

plugin.on('error', () => {
    console.log(arguments);
});

plugin.on('exit', () => {
    console.log(arguments);
});

promptUser();

function promptUser() {
    var msg = {event:'', arguments: null};
    var cmd = rlSync.question(`
    Enter: 
    'kd' for keyDown 
    'ku' for keyUp
    'wa' for willAppear
    'wd' for willDisappear
    'dc' for deviceDidConnect
    'dd' for deviceDidDisconnect
    'al' for applicationDidLaunch
    'at' for applicationDidTerminate
    'pa' for propertyInspectorDidAppear
    'pd' for propertyInspectorDidDisappear
    'sp' for sendToPlugin

    To quit, press 'q'\n`);

    switch(cmd) {
        case 'kd':
            msg.event = 'keyDown';
            forked.send(msg);
            break;
        case 'ku':
            msg.event = 'keyUp';
            forked.send(msg);
            break;
        case 'wa':
            msg.event = 'willAppear';
            forked.send(msg);
            break;
        case 'wd':
            msg.event = 'willDisappear';
            forked.send(msg);
            break;
        case 'dc':
            msg.event = 'deviceDidConnect';
            forked.send(msg);
            break;
        case 'dd':
            msg.event = 'deviceDidDisconnect';
            forked.send(msg);
            break;
        case 'q':
// Is this too much? Unnecessary? Over-achiever?
            forked.disconnect();
            forked.removeAllListeners();
            forked.kill();
            return;
        case 'al':
            msg.event = 'applicationDidLaunch';
            forked.send(msg);
            break;
        case 'at':
            msg.event = 'applicationDidTerminate';
            forked.send(msg);
            break;
        case 'pa':
            msg.event = 'propertyInspectorDidAppear';
            forked.send(msg);
            break;
        case 'pd':
            msg.event = 'propertyInspectorDidDisappear';
            forked.send(msg);
            break;
        case 'sp':
            msg.event = 'sendToPlugin';
            forked.send(msg);
            break;
        default:
            break;
    }
    promptUser();
}

function selectAction() {

    var menu = 'Enter: \n';
    manifest.Actions.forEach((act, idx)=> {
        menu += `'${idx}' for UUID: ${act.UUID} \n`;
    });

    return rlSync.question(menu);   
}

