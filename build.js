const electronInstaller = require('electron-winstaller');
const packager = require('@electron/packager');
const fs = require('fs');

async function createInstaller() {
    if (fs.existsSync('./build')) {
        fs.rmdirSync('./build', { recursive: true });
    }
    await packager({
        "dir": "./project",
        "out": "./build",
        "platform": "win32",
        "arch": "x64",
    });
    console.log('Packaged!');
    await electronInstaller.createWindowsInstaller({
        appDirectory: './build/Castpanel-win32-x64',
        outputDirectory: './build/installer64',
        authors: 'Ascol57'
    });
    console.log('It worked!');
}

try {
    createInstaller();
} catch (e) {
    console.log(`No dice: ${e.message}`);
}