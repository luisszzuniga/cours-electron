const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    getDefaultIterations: () => ipcRenderer.invoke('getDefaultIterations'),
    start: (data) => ipcRenderer.invoke('start', data),
    onForestUpdated: (callback) => {
        ipcRenderer.on('forest-updated', (event, data) => {
            callback(data);
        });
    }
});
