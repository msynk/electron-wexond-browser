const path = require('path')
const { app, Tray, Menu, BrowserWindow } = require('electron')

class Application {
    root = null
    window = null
    tray = null

    constructor(root) {
        this.root = root
        this.mainRoot = path.join(root, 'main')
        this.rendererRoot = path.join(root, 'renderer')
        this.staticRoot = path.join(root, '..', 'static')

        this.tray = new Tray(path.join(this.staticRoot, 'icon.png'))
        this.tray.setToolTip('Electron Wexond Browser')
        this.tray.setContextMenu(Menu.buildFromTemplate([
            { label: 'Open', click: () => this.createWindow() },
            { label: 'Close', click: () => app.quit() },
        ]))

        this.createWindow()
    }

    createWindow() {
        if (this.window) {
            return this.window.show()
        }

        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(this.mainRoot, 'preload.js')
            },
            icon: path.join(this.staticRoot, 'icon2.png')
        })

        this.window.loadFile(path.join(this.rendererRoot, 'index.html'))

        this.window.on('close', e => {
            this.window = null
        })
    }
}

Application.start = root => {
    const application = new Application(root)
    return application
}

module.exports = Application