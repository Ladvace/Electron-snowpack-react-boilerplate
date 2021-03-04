const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: "#1B2533",
    show: true,
    frame: false,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  if (process.env.NODE_ENV === "production") {
    mainWindow.loadFile("./build/index.html");
  } else {
    mainWindow.loadURL("http://localhost:8080");
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window-maximized");
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window-minimized");
  });
}
app.on("ready", createWindow);

// this are custom events to make the navbar working
ipcMain.handle("minimize-window", (event, args) => {
  mainWindow.minimize();
});

ipcMain.handle("quit-app", () => {
  mainWindow.close();
  mainWindow = null;
});

ipcMain.handle("getIsWindowMaximized", () => {
  return !mainWindow.maximizable;
});

ipcMain.handle("min-max-window", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});
