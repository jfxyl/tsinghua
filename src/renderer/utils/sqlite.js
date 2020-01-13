// 建表脚本，导出db对象供之后使用
import path from 'path';
import sq3 from 'sqlite3';
// 将数据存至系统用户目录，防止用户误删程序
export const dbPath = path.join(__dirname, '../../tsinghua.db')

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

export default db;