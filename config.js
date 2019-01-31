require("dotenv").config();

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
