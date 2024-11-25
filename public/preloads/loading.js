const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    test: true,
    onLoadingFinished: (callback) => {
        ipcRenderer.on('loading:App:loadingfinished', callback)
    },
    finishLoading: () => {
        ipcRenderer.send('loading:Client:loadingfinished')
    }
})