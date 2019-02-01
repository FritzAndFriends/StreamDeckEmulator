const dotenv = require("dotenv");
const envConfig = dotenv.config();
require('colors');

if (envConfig.error){
    const errorMessage = '>>>  The environment ("./.env") file could not be loaded. Check that it exists and that it is valid. <<<';
    console.error(errorMessage.bgRed.white.underline);
    throw (errorMessage + '\n\t' + envConfig.error + '\n');
}

let config = {};
config.executable = {
    path: process.env.BUILD_PATH,
    manifest: "manifest.json",
    winexe: process.env.WINEXE_NAME,
    osxexe: process.env.OSXEXE_NAME
};
config.server = {
    deviceId : process.env.DEVICE_ID,
    port : process.env.DEVICE_PORT,
    winplatform: "windows",
    osxplatform : "osx"
}

module.exports = config;
