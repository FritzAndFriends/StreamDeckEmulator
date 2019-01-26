const config = require('./config');
const { fork } = require('child_process');
const path = require('path');
const os = require('os');

let rlSync = require('readline-sync');
let exec = require('child_process').execFile;
let manifest = require(path.join(config.executable.path, config.executable.manifest));
const pluginExe = os.platform == 'win32' ? config.executable.winexe : config.executable.osxexe;

const forked = fork('server.js');
forked.send('<status>Web Socket Server Started....');

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

let registrationParams = ['-port', config.server.port, '-pluginUUID', manifest.Actions[0].UUID,'-registerEvent','registerEvent','-info', JSON.stringify(info)];
exec(pluginExe, registrationParams, { cwd: config.executable.path }, (err, data) => {
    if(err){
        console.log(`ERROR: ${err}`);
    } else {
        console.log(`DATA: ${data}`);
    }
} );

// Type b at any time to send a KeyUp event to the plugin
promptUser();

function promptUser() {
    var cmd = rlSync.question("Enter 'b' to simulate a button press ");
    switch(cmd) {
        case 'b':
            forked.send('button');
            break;
        default:
            break;
    }
    promptUser();
}



