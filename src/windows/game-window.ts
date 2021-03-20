import { BrowserWindow, BrowserWindowConstructorOptions, Menu } from 'electron';
import * as path from 'path';

import { Flags, rootdir } from '@/common';

export const createGameWindow = () => {
    const windowOptions: BrowserWindowConstructorOptions = {
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
        },
    };

    const main = new BrowserWindow(windowOptions);

    main.loadFile(path.join(rootdir, 'index.html'));
};
