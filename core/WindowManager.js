const { BrowserWindow, WebContentsView, ipcMain } = require('electron');
const path = require('path');

module.exports = class WindowManager {
    constructor(winOptions) {
        const t = this;
        t.window = new BrowserWindow(winOptions);

        t.currentPage = 'home'

        t.view1 = new WebContentsView({
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, '../public/preloads/navbar.js')
            }
        })

        t.view2 = new WebContentsView({
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, '../public/preloads/view.js')
            }
        })

        t.view1.webContents.loadFile('public/navbar.html')
        t.window.contentView.addChildView(this.view1)
        
        t.view2.webContents.loadFile('public/home.html')
        t.window.contentView.addChildView(this.view2)

        //t.view1.webContents.openDevTools()

        t.window.on('resize', function () {
            t.resize();
        });

        console.log('Init')
        t.resize();

        ipcMain.on('navbar:Client:changePage', (event, page) => {
            t.currentPage = page
            this.reloadPage()
        })
    }

    reloadPage() {
        if (this.currentPage == 'home') {
            console.log('Load home')
            this.view2.webContents.loadFile('public/home.html')
        } else if (this.currentPage == 'settings') {
            console.log('Load settings')
            this.view2.webContents.loadFile('public/settings.html')
        } else if (this.currentPage == 'store') {
            console.log('Load store')
            this.view2.webContents.loadURL('https://floorp.app/')
        }
    }

    resize() {
        var size = this.window.getSize();
        var width = size[0];
        var height = size[1];
        this.view1.setBounds({ x: 0, y: 0, width: width, height: 63 });
        this.view2.setBounds({ x: 0, y: 63, width: width, height: height - 63 });
    }
}