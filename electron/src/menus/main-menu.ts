import { BrowserWindow, KeyboardEvent, MenuItem } from 'electron';

type Callback = (menuItem: MenuItem, browserWindow: (BrowserWindow) | (undefined), event: KeyboardEvent) => void;

export interface MainMenuCallbacks {
    open: Callback,
    save: Callback,
    quickConnect: Callback,
    toggleDevTools: Callback,
    quit: Callback,
    checkForUpdates: Callback;
    quitAndInstall: Callback;
    newWindow: Callback;
}

export function createMainMenu(callbacks: MainMenuCallbacks) {
    if(process.platform === 'darwin') {
        return require('./darwin').createMainMenu(callbacks);
    }

    return require('./win32').createMainMenu(callbacks);
}
