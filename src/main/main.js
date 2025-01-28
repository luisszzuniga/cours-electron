const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { Forest } = require('../Forest');

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
        fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js')
        }
    })


    win.loadFile(path.join(__dirname, '../renderer/index.html'))

    return win;
}

app.whenReady().then(() => {
    const window = createWindow()
    const updateForest = (data) => {
        if (window) {
            window.webContents.send('forest-updated', data);
        }
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    ipcMain.handle('start', async (event, data) => {
        const { iterations, wind, ground, vegetation } = data;

        const forest = new Forest(iterations, wind, ground, vegetation);

        for (let i = 0; i < forest.getIterations(); i++) {
            forest.iterate();

            updateForest(forest.getSquares());
        }
    });

    ipcMain.handle('getDefaultIterations', (iterations) => {
        return Forest.DefaultIterations;
    });
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
