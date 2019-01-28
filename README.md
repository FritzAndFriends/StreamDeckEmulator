# StreamDeckEmulator

A simple emulator for the Stream Deck Application to allow plugin developers to develop, test, and debug their plugins without requiring a physical [Stream Deck][https://www.elgato.com/en/gaming/stream-deck] device.


### Pre-requisites

In order to be able to run this emulator, you will need to have [Node.js][https://nodejs.org/] installed. The most recent <abbr title="Long Term Service">LTS</abbr> is suggested.

### Getting Started

1. Clone the repository using git: `git clone https://github.com/FritzAndFriends/StreamDeckEmulator.git`.
2. Change directory to the repository: `cd StreamDeckEmulator`.
3. Run `npm install`.
4. Create a copy of the .env_sample file: `cp .env_sample .env`.
5. Update `.env` file to set your environment specific values.
   1. Update the value of `BUILD_PATH` to be the build output path of your plugin's executable
   2. Update the value of `config.executable.exe` to be the filename of the your plugin's executable
6. Run `npm start` to launch the emulator.


### Starting and Stopping the Emulator

1. Open a command prompt/terminal/shell and navigate to the current directory.
2. Start the emulator with the command `npm start`
3. When you are done, press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop the emulator.


### Using the Emulator

#### Simulating events

At this time, the emulator only supports emulating a button press, which results in a `keyUp` event with its respective payload.

To simulate the `keyUp` event, press the <kbd>B</kbd> button on your keyboard.




<!-- Reference Links -->

[Stream Deck]: https://www.elgato.com/gaming/stream-deck/ "Elgato's Stream Deck product page"

[Node.js]: https://nodejs.org/ "Learn about and get Node.js"