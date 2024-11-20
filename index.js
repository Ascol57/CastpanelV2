const { app, BrowserWindow } = require('electron')
const { updateElectronApp } = require('update-electron-app')
updateElectronApp()

const createWindow = () => {
    const win = new BrowserWindow({
        width: 300,
        height: 400,
        frame: false
    })

    win.loadFile('public/loading.html')
}

app.whenReady().then(() => {
    createWindow()
})