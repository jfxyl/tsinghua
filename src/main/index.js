import { app, BrowserWindow, ipcMain} from 'electron'
const fs = require('fs');
const path = require('path')
const crypto = require('crypto');
// const storage = require('electron-localstorage');
const AutoLaunch = require('auto-launch');
// const DownloadManager = require("electron-download-manager");


import sq3 from 'sqlite3';
let configDir = app.getPath('userData');
const dbPath = path.join(configDir, 'tsinghua.db')
if(fs.existsSync(dbPath)){
  fs.openSync(dbPath, 'w');
}
const sqlite3 = sq3.verbose();
const db = new sqlite3.Database(dbPath);
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS DOWNLOADS(
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      url TEXT NOT NULL,
      url_md5 VARCHAR(50) NOT NULL,
      filename VARCHAR(1000) NOT NULL,
      filepath VARCHAR(1000) NOT NULL,
      status INTEGER NOT NULL
    )`, err => {
    console.log(err);
  });
});



// DownloadManager.register({
//   downloadFolder: './download/'
// });

/**
 * 添加开机自启动
 * @type {AutoLaunch}
 */
var minecraftAutoLauncher = new AutoLaunch({
  name: 'tsinghua',
});
minecraftAutoLauncher.enable();

/**
 * 避免重复启动
 */
let myWindow = null
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})
if (shouldQuit) {
  app.quit()
}

/**
 * 禁用缓存
 */
// app.commandLine.appendSwitch('--disable-http-cache')
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    webPreferences: {webSecurity: false},
    height: 563,
    useContentSize: true,
    width: 1000,
    frame:false,
    fullscreen:true,
  })

  // mainWindow.setFullScreen(true)

  mainWindow.loadURL(winURL)

  // 凌晨2点刷新
  setInterval(() => {
    var date = new Date()
    if(date.getHours() == 2 && date.getMinutes() == 0){
      mainWindow.webContents.reload()
    }
  }, 60000);

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // 删掉未记录的下载文件（未记录=未完成）
  db.all("SELECT * FROM DOWNLOADS where status = 1",function(err,res){
    let dir = path.resolve('./download/');
    if(fs.existsSync(dir)){
      let files = fs.readdirSync(dir);
      let filenames = [];
      if(res){
        filenames = res.map(function(r){
          return r.filename
        })
      }
      if(filenames){
        files = files.filter(function(file){
          return !filenames.includes(file)
        })
      }
      files.forEach((file, index) => {
        fs.unlinkSync(dir+"\\"+file); //删除文件
      });
    }
  })
  // let filenames = storage.getItem('filenames')
  // let dir = path.resolve('./download/');
  // console.log(filenames)
  // if(fs.existsSync(dir)){
  //   let files = fs.readdirSync(dir);
  //   if(filenames){
  //     files.filter(function(file){
  //       return !filenames.includes(file)
  //     })
  //   }
  //   console.log(22222,files)
  //   files.forEach((file, index) => {
  //     fs.unlinkSync(dir+"\\"+file); //删除文件
  //   });
  // }

  require('./menu.js')
  require('./download.js')
  // require('./download-new.js')

  // ipcMain.on('download', function(event, url) {
  //   var fileId = crypto.createHash('md5').update(url).digest("hex");
  //   let fileTask = fileId+'_task';
  //   let bool = storage.getItem(fileTask)
  //   if(!bool){
  //     storage.setItem(fileTask,1)
  //     DownloadManager.download({
  //         url: url
  //     }, function (error, info) {
  //         if (error) {
  //             console.log(error);
  //             return;
  //         }
  //         var filepath = path.resolve(info.filePath)
  //         storage.setItem(fileTask,2)
  //         storage.setItem(fileId,filepath)
  //     });
  //   }else if(bool == 1){
  //     storage.setItem(fileTask,1)
  //     DownloadManager.download({
  //         url: url
  //     }, function (error, info) {
  //         if (error) {
  //             console.log(error);
  //             return;
  //         }
  //         var filepath = path.resolve(info.filePath)
  //         storage.setItem(fileTask,2)
  //         storage.setItem(fileId,filepath)
  //     });
  //   }
    
  // });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
