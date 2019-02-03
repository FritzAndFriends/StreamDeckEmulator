const path = require("path");
const Chalk = require('chalk');
const Cli = require('structured-cli');
const { spawn } = require('cross-spawn');

function handleRun(args) {
  console.log(Chalk.bold(`Running Emulator on ${args.executable} located in ${args.path}`));
  spawn.sync('npm', ['start'], {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '../../'),
    env: Object.assign(process.env, {
      'BUILD_PATH': args.path,
      'WINEXE_NAME': args.executable,
      'OSXEXE_NAME': args.executable
    }),
  });
}

module.exports = Cli.createCommand('run', {
  description: 'Starts the emulator',
  options: {
    'path': {
      alias: 'p',
      required: true,
      description: 'The path to your Stream Deck Plugin directory.',
      dest: 'path',
      type: 'string'
    },
    'executable': {
      alias: 'e',
      required: true,
      description: 'The executable file name for your Stream Deck Plugin.',
      dest: 'executable',
      type: 'string'
    }
  },
  handler: handleRun
});
