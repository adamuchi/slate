import { app, autoUpdater, Menu, MenuItemConstructorOptions } from 'electron';

const quit = () => app.quit();
const checkForUpdates = () => autoUpdater.checkForUpdates();
const quitAndInstall = () => autoUpdater.quitAndInstall();

let updateItems: MenuItemConstructorOptions[] = [];
if(!process.mas) {
    // Only enable the update items if we aren't an App Store build
    updateItems = [
        { label: 'Version ' + app.getVersion(), enabled: false },
        { label: 'Checking for Update', enabled: false },
        { label: 'Check for Update', enabled: false, click: checkForUpdates },
        { label: 'Restart and Install Update', enabled: false, click: quitAndInstall }
    ];
}

const gameMenuItem: MenuItemConstructorOptions = {
    label: 'Game',
    submenu: [
        { label: 'Open' },
        { label: 'Save' },
        { label: 'Quick Connect' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Alt+F4', click: quit }
    ],
};

const windowMenuItem: MenuItemConstructorOptions = {
    label: 'Window',
    submenu: [
        { label: 'Minimize', role: 'minimize' },
        { label: 'Close', role: 'close', accelerator: 'Ctrl+F4' },
    ],
};

const helpMenuItem: MenuItemConstructorOptions = {
    label: 'Help',
    submenu: [
        ...updateItems,
        { label: 'About' },
        { label: 'Learn More', enabled: false },
    ],
};

export const createMainMenu = () => Menu.buildFromTemplate([gameMenuItem, windowMenuItem, helpMenuItem]);
