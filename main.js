const {app, BrowserWindow, ipcMain} = require("electron");

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

let win;

function createWindow() {
  win = new BrowserWindow({width:800, height: 600});
  win.loadFile("index.html")
  //win.loadURL("https://github.com");
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
  console.log("window-all-closed!!");
});

app.on("activate", () => {
  if (win === null) createWindow();
  console.log("activate!!");
});
