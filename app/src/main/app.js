
const electron = require('electron');
// Module to control application life.
const { ipcMain, BrowserWindow, app } = electron;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let parserWindow;
// Create a hidden background window
function createBgWindow() {
  parserWindow = new BrowserWindow({ show: true });
  parserWindow.loadURL(`file://${__dirname}/ReplayParser.html`);
  parserWindow.on('closed', () => {
    console.log('Background window closed'); // eslint-disable-line
  });
}

/** This function will create the mainWindow */
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1366, height: 768 });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));
  createBgWindow();
  ipcMain.on('ready', () => {

  });

  ipcMain.on('parsed', (event, parsed, current, error) => {
    console.log(`A replay was parsed successfully${current}`, error); // eslint-disable-line
    mainWindow.webContents.send('parsed', parsed, current, error);
  });

  ipcMain.on('parseReplay', (event, current, filepath) => {
    console.log(`main received parsing request: ${current} ${filepath}`); // eslint-disable-line
    parserWindow.webContents.send('task', current, filepath);
  });

  if (process.env.NODE_ENV === 'development') {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer'); // eslint-disable-line
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`)) // eslint-disable-line
      .catch(err => console.log('An error occurred: ', err)); // eslint-disable-line

    installExtension(REDUX_DEVTOOLS)
      .then(name => console.log(`Added Extension:  ${name}`)) // eslint-disable-line
      .catch(err => console.log('An error occurred: ', err)); // eslint-disable-line
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    parserWindow.destroy();
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.prom
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
