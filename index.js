const { app, BrowserWindow, ipcMain } = require('electron')
const { checkForUpdates } = require('./core/Updater')
const WindowManager = require('./core/WindowManager')

const loadApp = async () => {
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
    await checkForUpdates()
    win.webContents.send('loading:App:loadingfinished')

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