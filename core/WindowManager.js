const { BrowserWindow, WebContentsView } = require('electron');

module.exports = class WindowManager {
    constructor(winOptions) {
        const t = this;
        t.window = new BrowserWindow(winOptions);

        t.view1 = new WebContentsView()
        t.view1.webContents.loadFile('public/navbar.html')
        t.window.contentView.addChildView(this.view1)

        t.window.on('resize', function () {
            t.resize();
        });

        console.log('Init')
        t.resize();
    }

    resize() {
        var size = this.window.getSize();
        var width = size[0];
        var height = size[1];
        this.view1.setBounds({ x: 0, y: 0, width: Math.max(width / 5, 200), height: height });
    }
}