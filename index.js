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
        title: "CastPanel",
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#19171c',
            symbolColor: '#efeff1',
            height: 30
        }
    })
}

app.whenReady().then(() => {
    loadApp()
})