const {app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const storage = require('electron-localstorage');

let mainWindow = BrowserWindow.fromId(1);

import sq3 from 'sqlite3';
let configDir = app.getPath('userData');
const dbPath = path.join(configDir, 'tsinghua.db')

const sqlite3 = sq3.verbose();
const db = new sqlite3.Database(dbPath);

ipcMain.on('download', function(event, url) {
    db.get("SELECT * FROM DOWNLOADS WHERE url = ?",url,function(err,res){
        if(res && res.status == 1){
            if(!fs.existsSync(res.filepath)){
                mainWindow.webContents.downloadURL(url)
            }
        }else{
            mainWindow.webContents.downloadURL(url)
        }
    }) 
});

mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    //设置文件存放位置
    var url = item.getURL();
    var fileId = crypto.createHash('md5').update(url).digest("hex");
    var filename = fileId+'_'+item.getFilename();
    var filepath = path.resolve('./download/'+filename)
    item.setSavePath(filepath);
    try{
        fs.accessSync(filepath,fs.constants.F_OK)
        item.cancel()
    }catch(err){
        // 写入数据库
        db.get("SELECT * FROM DOWNLOADS WHERE url = ?",url,function(err,res){
            console.log('select',err,res)
            if(!res){
                db.run("INSERT INTO DOWNLOADS(url,url_md5,filename,filepath,status) VALUES ((?),(?),(?),(?),(?))",[url,fileId,filename,filepath,0],function(err,res){
                    // console.log(err,res,this.lastId)
                })
            }else{
                db.run("UPDATE DOWNLOADS SET status = ? WHERE url = ? ",[0,url],function(err,res){
                    // console.log(err,res,this.lastId)
                })
            }
        })
        
        item.on('updated', (event, state) => {
            if (state === 'interrupted') {
            } else if (state === 'progressing') {
                if (item.isPaused()) {
                    // console.log('Download is paused')
                } else {
                    // console.log(`Received bytes: ${item.getReceivedBytes()}`)
                }
            }
        })
        item.once('done', (event, state) => {
            if (state === 'completed') {
                console.log('Download successfully')
                db.run("UPDATE DOWNLOADS SET status = ? WHERE url = ? ",[1,url],function(err,res){
                    // console.log(err,res,this.lastId)
                })
            } else {
                // console.log(`Download failed: ${state}`)
            }
        })
    }
})