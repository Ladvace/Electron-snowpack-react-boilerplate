const { contextBridge, ipcRenderer } = require("electron");

// read https://github.com/electron/electron/issues/9920#issuecomment-575839738 to know more about this implementation

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = [
      "toMain",
      "minimize-window",
      "window-maximized",
      "quit-app",
      "min-max-window",
      "getIsWindowMaximized",
    ];
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["window-maximized", "window-minimized"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
