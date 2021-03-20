export function createMainMenu() {
    if(process.platform === 'darwin') {
        return require('./darwin').createMainMenu();
    }

    return require('./win32').createMainMenu();
}
