const config = require('./config');
const { fork } = require('child_process');
var rlSync = require('readline-sync');
var exec = require('child_process').execFile;
var manifest = require(config.executable.path +'\\'+ config.executable.manifest);

const forked = fork('server.js');
forked.send('<status>Web Socket Server Started....');

// Registration Stuff
var info = {
    'application': {
      'language': 'en', 
      'platform': 'windows', 
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

var registrationParams = ['-port', config.server.port, '-pluginUUID', manifest.Actions[0].UUID,'-registerEvent','registerEvent','-info', JSON.stringify(info)];
exec(config.executable.exe, registrationParams, { cwd: config.executable.path }, (err, data) => {
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



