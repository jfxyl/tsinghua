const { BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const storage = require('electron-localstorage');
let mainWindow = BrowserWindow.fromId(1)

ipcMain.on('download-main-video', function(event, url) {
    event.video_type = 'aaaaa'
    console.log(event)
    mainWindow.webContents.downloadURL(url)
});
ipcMain.on('download-douyin-video', function(event, url) {
    mainWindow.webContents.downloadURL(url)
});

mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    console.log(event)
    console.log(item)
    console.log(webContents)
    //设置文件存放位置
    var fileId = crypto.createHash('md5').update(item.getURL()).digest("hex");
    var filename = fileId+'_'+item.getFilename();
    var filepath = path.resolve('./download/'+filename)
    console.log(filepath)
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
                console.log('Download successfully')
                storage.setItem(fileId,filepath);
                console.log(storage.getStoragePath())
            } else {
                console.log(`Download failed: ${state}`)
            }
        })
    }
})