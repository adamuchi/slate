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

const appMenuItem: MenuItemConstructorOptions = {
    label: app.getName(),
    submenu: [
        { label: 'About', role: 'about' },
        ...updateItems,
        { type: 'separator' },
        { label: 'Services', role: 'services', submenu: [] },
        { type: 'separator' },
        { label: 'Hide', role: 'hide', accelerator: 'Command+H' },
        { label: 'Show All', role: 'unhide' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: quit },
    ],
};

const gameMenuItem: MenuItemConstructorOptions = {
    label: 'Game',
    submenu: [
        { label: 'Open' },
        { label: 'Save' },
        { label: 'Quick Connect' }
    ],
};

const windowMenuItem: MenuItemConstructorOptions = {
    label: 'Window',
    submenu: [
        { label: 'Minimize', role: 'minimize' },
        { label: 'Close', role: 'close' },
        { type: 'separator' },
        { label: 'Bring All to Front', role: 'front' }
    ],
};

const helpMenuItem: MenuItemConstructorOptions = {
    label: 'Help',
    submenu: [
        { label: 'About' },
        { label: 'Learn More', enabled: false },
    ],
};

export const createMainMenu = () => Menu.buildFromTemplate([appMenuItem, gameMenuItem, windowMenuItem, helpMenuItem]);
