const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require("electron-updater")
const WindowManager = require('./core/WindowManager')

const loadApp = () => {
    const win = new BrowserWindow({
        width: 300,
        height: 400,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: __dirname + '/public/preloads/loading.js'
        }
    })

    win.loadFile('public/loading.html')
    autoUpdater.checkForUpdatesAndNotify()
    setTimeout(() => {
        win.webContents.send('loading:App:loadingfinished')
    }, 0)

    ipcMain.on('loading:Client:loadingfinished', () => {
        Mwin = new WindowManager({
            title: "CastPanel",
            width: 800,
            height: 600,
            titleBarStyle: 'hidden',
            titleBarOverlay: {
                color: '#2e3538',
                symbolColor: '#ffffff',
                height: 58
            }
        })

        win.close()
    })
}

app.whenReady().then(() => {
    loadApp()
})