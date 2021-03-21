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
            { label: 'Quit', accelerator: 'Command+Q', click: callbacks.quit },
        ],
    };
    
    const gameMenuItem: MenuItemConstructorOptions = {
        label: 'Game',
        submenu: [
            { label: 'Open', accelerator: 'Command+O', click: callbacks.open },
            { label: 'Save', accelerator: 'Command+S', click: callbacks.save },
            { label: 'Quick Connect', click: callbacks.quickConnect }
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
    
    const debugMenuItems: MenuItemConstructorOptions = {
        label: 'Debug',
        submenu: [
            { label: 'Toggle Dev Tools', accelerator: 'Option+Command+I', click: callbacks.toggleDevTools }
        ]
    }

    const template = [appMenuItem, gameMenuItem, windowMenuItem, helpMenuItem];
    if(Flags.devmode) {
        template.push(debugMenuItems);
    }
    return Menu.buildFromTemplate(template);
};
