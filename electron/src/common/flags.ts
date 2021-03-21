import { app } from 'electron';

export const Flags = {
    devmode: app.commandLine.hasSwitch('developer'),
};
