const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const { updateElectronApp, UpdateSourceType } = require('update-electron-app')
updateElectronApp({
    updateSource: {
        type: UpdateSourceType.ElectronPublicUpdateService,
        repo: 'luisszzuniga/cours-electron',
        host: 'https://github.com'
    }
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