const { BrowserWindow } = require('electron');

module.exports = class WindowManager {
    constructor(winOptions) {
        this.windows = new BrowserWindow(winOptions);
    }
}