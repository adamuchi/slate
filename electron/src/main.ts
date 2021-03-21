// We use TS path aliases, so register
import 'module-alias/register';

import { app, BrowserWindow } from 'electron';
import { createGameWindow } from '@/windows';

app.on('ready', () => {
    createGameWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if(BrowserWindow.getAllWindows().length === 0) {
            createGameWindow();
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
