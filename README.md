# StreamDeckEmulator

A simple emulator for the Stream Deck Application to allow plugin developers to develop, test, and debug their plugins without requiring a physical [Stream Deck][] device.


### Pre-requisites

In order to be able to run this emulator, you will need to have [Node.js][] installed. The most recent <abbr title="Long Term Service">LTS</abbr> is suggested.

### Getting Started

1. Clone the repository using git: `git clone https://github.com/FritzAndFriends/StreamDeckEmulator.git`.
2. Change directory to the repository: `cd StreamDeckEmulator`.
3. Run `npm install`.
4. Create a copy of the .env_sample file: `cp .env_sample .env`.
5. Update `.env` file to set your environment specific values.
   1. Update the value of `BUILD_PATH` to be the build output path of your plugin's executable.
   *Note*: Make sure you use the correct path syntax for your operating system.
   2. Update the value of `WINEXE_NAME` (if you're on Windows) or `OSXEXE_NAME` (if you're on macOS) to be the filename of the your plugin's executable.
6. Run `npm start` to launch the emulator.


### Starting and Stopping the Emulator

1. Open a command prompt/terminal/shell and navigate to the current directory.
2. Start the emulator with the command `npm start`
3. When you are done, use the `q` option to shut down the emulator.


### Using the Emulator

#### Simulating events

At this time, the following are the events supported by the emulator, and their associated keyboard commands.

* `keyDown` (<kbd>kd</kbd>)
* `keyUp` (<kbd>ku</kbd>)
* `willAppear` (<kbd>wa</kbd>)
* `willDisappear` (<kbd>wd</kbd>)
* `deviceDidConnect` (<kbd>dc</kbd>)
* `deviceDidDisconnect` (<kbd>dd</kbd>)

#### Caveats, Limitations, and Known Issues

**Caveat**: The emulator will only send events to the first action defined in the `manifest.json` (manifest) file.  
**Workaround**: To test a different action, move its definition to the top of the `actions` array in the manifest.  

**Issue**: If, for any reason, when sending a command to the plugin, the websocket connection is closed or otherwise broken, no further messages can be sent.  
**Workaround**: Quit the emulator (using the <kbd>q</kbd> command) and restart it.  

**Issue**: If the emulator is force quit (using <kbd>Ctrl</kbd>+<kbd>C</kbd>), the WebSocket connection *may* not be closed, and the configured port *could* remain in use.  
**Workaround**: Find if there is an instance of `node` running for the `index.js` script, and end it. This varies per operating system.  


<!-- Reference Links -->

[Stream Deck]: https://www.elgato.com/gaming/stream-deck/ "Elgato's Stream Deck product page"

[Node.js]: https://nodejs.org/ "Learn about and get Node.js"
