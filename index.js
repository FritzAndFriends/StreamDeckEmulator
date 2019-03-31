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

let registrationParams = [
    '-port', config.server.port, 
    '-pluginUUID', manifest.Actions[0].UUID,
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
            forked.send('keyDown');
            break;
        case 'ku':
            forked.send('keyUp');
            break;
        case 'wa':
            forked.send('willAppear');
            break;
        case 'wd':
            forked.send('willDisappear');
            break;
        case 'dc':
            forked.send('deviceDidConnect');
            break;
        case 'dd':
            forked.send('deviceDidDisconnect');
            break;
        case 'q':
// Is this too much? Unnecessary? Over-achiever?
            forked.disconnect();
            forked.removeAllListeners();
            forked.kill();
            return;
        case 'al':
            forked.send('applicationDidLaunch');
            break;
        case 'at':
            forked.send('applicationDidTerminate');
            break;
        case 'pa':
            forked.send('propertyInspectorDidAppear');
            break;
        case 'pd':
            forked.send('propertyInspectorDidDisappear');
            break;
        case 'sp':
            forked.send('sendToPlugin');
            break;
        default:
            break;
    }
    promptUser();
}
