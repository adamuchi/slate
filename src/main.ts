import { app, BrowserWindow } from 'electron';
import * as path from 'path';

const devmode = app.commandLine.hasSwitch('developer');

function createWindow() {
    const main = new BrowserWindow({
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        width: 800,
    });

    main.loadFile(path.join(__dirname, '../index.html'));
    
    if(devmode) {
        main.webContents.openDevTools();
    }
}

app.on('ready', () => {
    createWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, expect on macOS. There, the convention
// is for applications and their menu bar to stay active until the user quits
// explicitly with cmd+Q
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});
