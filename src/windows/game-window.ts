import { app, autoUpdater, BrowserWindow, BrowserWindowConstructorOptions, Menu } from 'electron';
import * as path from 'path';

import { rootdir } from '@/common';
import { createMainMenu } from '@/menus';

export const createGameWindow = () => {
    const windowOptions: BrowserWindowConstructorOptions = {
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
        },
    };

    const window = new BrowserWindow(windowOptions);

    window.loadFile(path.join(rootdir, 'game.html'));

    const menu = createMainMenu({
        open: () => console.log('open'),
        save: () => console.log('save'),
        quickConnect: () => console.log('quickConnect'),
        toggleDevTools: () => window.webContents.toggleDevTools(),
        quit: () => app.quit(),
        checkForUpdates: () => autoUpdater.checkForUpdates(),
        quitAndInstall: () => autoUpdater.quitAndInstall(),
        newWindow: () => createGameWindow(),
    });

    window.on('focus', () => {
        Menu.setApplicationMenu(menu);
    });
};
