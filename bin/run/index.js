const Chalk = require('chalk');
const Cli = require('structured-cli');
const { spawnSync } = require('child_process')

function handleRun(args) {
  console.log(Chalk.bold(`Running Emulator on ${args.executable} located in ${args.path}`));

  spawnSync('npm', ['start'], {
    stdio: 'inherit',
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
