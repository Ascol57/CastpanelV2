const { app, BrowserWindow } = require('electron')
const { autoUpdater } = require("electron-updater")
const WindowManager = require('./core/WindowManager')

const loadApp = () => {
    const win = new BrowserWindow({
        width: 300,
        height: 400,
        frame: false,
        resizable: false
    })

    win.loadFile('public/loading.html')
    autoUpdater.checkForUpdatesAndNotify()
    win.close()

    Mwin = new WindowManager({
        width: 800,
        height: 600,
        frame: false,
        resizable: true
    })
}

app.whenReady().then(() => {
    loadApp()
})