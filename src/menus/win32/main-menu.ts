import { app, Menu, MenuItemConstructorOptions } from 'electron';
import { Flags } from '@/common';
import { MainMenuCallbacks } from '..';

export const createMainMenu = (callbacks: MainMenuCallbacks) => {
    let updateItems: MenuItemConstructorOptions[] = [];
    if(!process.mas) {
        // Only enable the update items if we aren't an App Store build
        updateItems = [
            { label: 'Version ' + app.getVersion(), enabled: false },
            { label: 'Checking for Update', enabled: false },
            { label: 'Check for Update', enabled: false, click: callbacks.checkForUpdates },
            { label: 'Restart and Install Update', enabled: false, click: callbacks.quitAndInstall }
        ];
    }

    const gameMenuItem: MenuItemConstructorOptions = {
        label: 'Game',
        submenu: [
            { label: 'Open', accelerator: 'Ctrl+O', click: callbacks.open },
            { label: 'Save', accelerator: 'Ctrl+S', click: callbacks.save },
            { label: 'Quick Connect', click: callbacks.quickConnect },
            { type: 'separator' },
            { label: 'Quit', accelerator: 'Alt+F4', click: callbacks.quit }
        ],
    };

    const windowMenuItem: MenuItemConstructorOptions = {
        label: 'Window',
        submenu: [
            { label: 'New Window', accelerator: 'Ctrl+Shift+N', click: callbacks.newWindow },
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

    const debugMenuItems: MenuItemConstructorOptions = {
        label: 'Debug',
        submenu: [
            { label: 'Toggle Dev Tools', accelerator: 'Ctrl+Shift+I', click: callbacks.toggleDevTools }
        ]
    }
    const template = [gameMenuItem, windowMenuItem, helpMenuItem];
    if(Flags.devmode) {
        template.push(debugMenuItems);
    }
    return Menu.buildFromTemplate(template);
};
