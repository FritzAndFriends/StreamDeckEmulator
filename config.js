let config = {};
config.executable = {
    path: "C:\\SourceCode\\Fritz\\StreamDeckToolkit\\src\\SamplePlugin\\bin\\Debug\\netcoreapp2.2\\win10-x64",
    manifest: "manifest.json",
    winexe: "SamplePlugin.exe",
    osxexe: "SamplePlugin"
};
config.server = {
    deviceId : "55F16B35884A859CCE4FFA1FC8D3DE5B",
    port : 3000,
    winplatform: "windows",
    osxplatform : "osx"
}

module.exports = config;
