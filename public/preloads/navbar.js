const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    test: true,
    changePage: (page) => {
        ipcRenderer.send('navbar:Client:changePage', page)
    }
})