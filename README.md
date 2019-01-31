# StreamDeckEmulator

A simple emulator for the Stream Deck Application to allow plugin developers to develop, test, and debug their plugins without requiring a physical [Stream Deck][] device.


## Pre-requisites

In order to be able to run this emulator, you will need to have [Node.js][] installed. The most recent <abbr title="Long Term Service">LTS</abbr> is suggested.

## Setup

```bash
npm i -g streamdeckemulator
```

## Usage

### Run the Emulator on a Specific Plugin

```bash
sde -p /path/to/built/streamdeck/plugin -e nameofplugin
```

### Using the Emulator


## Local Development

### Getting Started

1. Clone the repository using git: `git clone https://github.com/FritzAndFriends/StreamDeckEmulator.git`.
2. Change directory to the repository: `cd StreamDeckEmulator`.
3. Run `npm install`.
4. Create a copy of the .env_sample file: `cp .env_sample .env`.
5. Update `.env` file to set your environment specific values.
   1. Update the value of `BUILD_PATH` to be the build output path of your plugin's executable.
   2. Update the value of `WINEXE_NAME` or `OSXEXE_NAME` to be the filename of the your plugin's executable.


### Starting and Stopping the Emulator

1. Open a command prompt/terminal/shell and navigate to the current directory.
2. Start the emulator with the command `npm start`
3. When you are done, press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop the emulator.

<!-- Reference Links -->

[Stream Deck]: https://www.elgato.com/gaming/stream-deck/ "Elgato's Stream Deck product page"

[Node.js]: https://nodejs.org/ "Learn about and get Node.js"
