```JavaScript
'use strict'
import { app, protocol, BrowserWindow, ipcMain, dialog, shell } from 'electron'
```

### 启动下载
```JavaScript
ipcMain.on('download', (event, fileUrl) => {
  try {
    console.log('download fly')
    const path = require('path')
    win.webContents.session.on('will-download', (e, item) => {
      // 获取文件的总大小
      const totalBytes = item.getTotalBytes()
      let fileBase = 0
      // 设置文件的保存路径，此时默认弹出的 save dialog 将被覆盖
      const filePath = path.join(app.getPath('downloads'), item.getFilename())
      console.log(filePath)
      item.setSavePath(filePath)
      // 监听下载过程，计算并设置进度条进度
      item.on('updated', () => {
        let baifenb = item.getReceivedBytes() / totalBytes
        if (fileBase !== baifenb) {
          fileBase = baifenb
          if (win) win.setProgressBar(baifenb)
          if (win) event.reply('download-reply', baifenb, baifenb)
        }
      })
      // 监听下载结束事件
      item.on('done', (e, state) => {
        // 如果窗口还在的话，去掉进度条
        if (win && !win.isDestroyed()) win.setProgressBar(-1)
        // 下载被取消或中断了
        if (state === 'interrupted') {
          dialog.showErrorBox(
            '下载失败',
            `文件 ${item.getFilename()} 因为某些原因被中断下载`
          )
        }
        // 下载完成，让 dock 上的下载目录Q弹一下下
        if (state === 'completed') {
          app.dock.downloadFinished(filePath)
          // shell启动浏览器
          // shell.openExternal('http://www.google.com')
          // ipcRenderer.invoke('app-child', 'name')
          shell.openPath(filePath).then(res => {
            console.log('解压完毕')
            event.reply('download-finish', filePath)
          })
        }
      })
    })

    // const path = require('path')
    // win.webContents.session.on('will-download', (event, item, webContents) => {
    //   const filePath = path.join(app.getPath('downloads'), item.getFilename())
    //   item.setSavePath(filePath)
    // })
    win.webContents.downloadURL(fileUrl)
  } catch (error) {
    console.log(error)
  }
})
const { spawn, exec } = require('child_process')
```

## 启动window
借助node的child_process模块

### 检测用户是否安装
```JavaScript
reg query HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\|find /i "应用(可能会是一个hash)"
// 如果有就会返回路径，没有就什么都不返回
```

### 检测用户是否启动
```JavaScript
wmic process where caption=”XXXX.exe” get caption,commandline /value
```

### 杀死某个进程
```JavaScript
taskkill /F /IM XXX.exe
```
启动

start 应用绝对路径

## mac

### 检测用户是否安装
```JavaScript
// 没有的话就会报错
const log = spawn('osascript', ['-e', 'id of application \"应用名字\"']);
const log = spawn('osascript', ['-e', 'id of application \"应用名字\"']);
let buffer = '';
log.stdout.on('data', (data) => { buffer += data });
log.stdout.on('end', () => {})
log.stderr.on('data', (err) => { console.log('err', err) });
log.stderr.on('end', () => {});
```

### mac检测是否在运行
```JavaScript
const log = exec('ps -e | grep -v grep | grep "应用名字"');
let is_running = false;
log.stdout.on('data', () => {
  is_running = true;
});
log.stdout.on('end', () => {
  if (is_running) {
    console.log(11);
  } else {
    console.log(222);
  }
});
log.stderr.on('data', () => {});
log.stderr.on('end', () => {});
```

### mac 杀死进程
```JavaScript
killall 应用名字
```

### 启动应用
```JavaScript
open -a 应用.app
```


### 打开应用
```JavaScript
ipcMain.on('openApp', (event, appName) => {
  exec(`open -a "${appName}.app"`, (error, stdout, stderr) => {
    console.log(error, stdout, stderr)
  })
})
```

### 是否安装
```JavaScript
ipcMain.on('appIs', (event, appName) => {
  const log = spawn('osascript', ['-e', `id of application \"${appName}\"`])
  // const log = spawn('osascript', ['-e', 'id of application \"应用名字\"'])
  let buffer = ''
  log.stdout.on('data', (data) => {
    buffer += data
  })
  log.stdout.on('end', () => {
    console.log(buffer)
    event.reply('appIs-finish', buffer)
  })
  log.stderr.on('data', (err) => {
    console.log('err', err)
  })
  log.stderr.on('end', () => {
  }
})
```
## 解压

### extractFile
```JavaScript

process.noAsar = true

ipcMain.on('extractFile', (event, filePath, desPath) => {
  const extract = require('extract-zip')
  // const fs = require('fs')
  try {
    extract(filePath, { dir: path.join(desPath, 'extractFile') }, err => {
      if (err) console.log('extractFile err: ', err)
      // fs.writeFile(path.join(desPath, 'path.txt'), 'Electron.app/Contents/MacOS/Electron', err => {
      //   if (err) console.log('extractFile err: ', err)
      //   console.log('extractFile')
      // })
    })
  } catch (error) {
    console.log('catch : ', error)
  }
})
```

### compressing

```JavaScript
ipcMain.on('compressing', (event, filePath, desPath) => {
  console.log('compressing')
  const compressing = require('compressing')
  // 解压缩
  compressing.zip.uncompress(filePath, desPath)
    .then(() => {
      console.log('success')
    })
    .catch(err => {
      console.error(err)
    })
})
```

### DecompressZip
```JavaScript
ipcMain.on('DecompressZip', (event, filePath, desPath) => {
  console.log('DecompressZip')
  var DecompressZip = require('decompress-zip')
  var unzipper = new DecompressZip(filePath)
  // Add the error event listener
  unzipper.on('error', function (err) {
    console.log('Caught an error', err)
  })

  // Notify when everything is extracted
  unzipper.on('extract', function (log) {
    console.log('Finished extracting', log)
  })

  // Notify "progress" of the decompressed files
  unzipper.on('progress', function (fileIndex, fileCount) {
    console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount)
  })
  unzipper.extract({
    path: desPath,
    // You can filter the files that you want to unpack using the filter option
    filter: function (file) {
        console.log(file)
        return file.type !== 'SymbolicLink'
    }
  })
})
```

### unzip
```JavaScript
ipcMain.on('unzip', (event, filePath, desPath) => {
  console.log('unzip')
})
```

### AdmZip
```JavaScript
ipcMain.on('AdmZip', (event, filePath, desPath) => {
  console.log('AdmZip')
  var AdmZip = require('adm-zip')
  const unzipper = new AdmZip(filePath)
  unzipper.extractAllTo(desPath, true)
  console.log('app.asar.unpacked.zip 解压缩完成')
  console.log('unzipper.Extract({path: route}')
})
```

### StreamZip
```JavaScript
ipcMain.on('StreamZip', (event, filePath, desPath) => {
  // invalid or unsupported zip format 不支持的格式
  console.log('StreamZip')
  const StreamZip = require('node-stream-zip')
  const zip = new StreamZip({
    file: filePath
  })
  zip.on('ready', () => {
    console.log('Entries read: ' + zip.entriesCount);
    for (const entry of Object.values(zip.entries())) {
        const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
        console.log(`Entry ${entry.name}: ${desc}`);
    }
    // 读取完毕，记得关闭文件
    zip.close()
  });
  // 报错提示
  zip.on('error', err => {
    console.log('unzip err：', err)
  })
})
```