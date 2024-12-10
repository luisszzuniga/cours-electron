const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const log = require('electron-log');
log.transports.file.resolvePathFn = () => {
    return path.join(app.getPath('userData'), 'log.log');
};

const { updateElectronApp } = require('update-electron-app')
updateElectronApp({
    logger: log,
    updateInterval: "5 minutes",
});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})