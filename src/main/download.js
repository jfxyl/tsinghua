const { BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const storage = require('electron-localstorage');
let mainWindow = BrowserWindow.fromId(1)

// ipcMain.on('download-local-video', function(event, url) {
//     mainWindow.webContents.downloadURL(url)
// });
// ipcMain.on('download-douyin-video', function(event, url) {
//     mainWindow.webContents.downloadURL(url)
// });

ipcMain.on('download', function(event, url) {
    console.log(url)
    mainWindow.webContents.downloadURL(url)
});

mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    //设置文件存放位置
    var fileId = crypto.createHash('md5').update(item.getURL()).digest("hex");
    var filename = fileId+'_'+item.getFilename();
    var filepath = path.resolve('./download/'+filename)

    try{
        fs.accessSync(filepath,fs.constants.F_OK)
        item.cancel()
    }catch(err){
        item.setSavePath(filepath);
        item.on('updated', (event, state) => {
            if (state === 'interrupted') {
                console.log('Download is interrupted but can be resumed')
            } else if (state === 'progressing') {
                if (item.isPaused()) {
                    console.log('Download is paused')
                } else {
                    console.log(`Received bytes: ${item.getReceivedBytes()}`)
                }
            }
        })
        item.once('done', (event, state) => {
            if (state === 'completed') {
                console.log(fileId+'------'+filepath)
                console.log('Download successfully')
                storage.setItem(fileId,filepath)
                console.log(storage.getItem(fileId))
            } else {
                console.log(`Download failed: ${state}`)
            }
        })
    }
})