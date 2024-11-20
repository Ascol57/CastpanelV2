const { app, BrowserWindow } = require('electron')

const { autoUpdater } = require("electron-updater")

const createWindow = () => {
    const win = new BrowserWindow({
        width: 300,
        height: 400,
        frame: false
    })

    win.loadFile('public/loading.html')
    autoUpdater.checkForUpdatesAndNotify()
}

app.whenReady().then(() => {
    createWindow()
})