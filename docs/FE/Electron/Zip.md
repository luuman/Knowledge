```JavaScript
'use strict'
import { app, protocol, BrowserWindow, ipcMain, dialog, shell } from 'electron'
```


### 程序地址

```JavaScript
var exePath = path.dirname(app.getPath('exe'))
```

### electron-log
可视化日志log

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
### 启动
```JavaScript
start 应用绝对路径
```

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
## 唤起应用
[两种方式的mac/win注册协议唤起Electron应用](https://juejin.im/post/6844904176246325255)

### url scheme

```JavaScript
OmniFocus:///add?name=[prompt]&note=[prompt]
```

[URL Schemes 使用详解](https://sspai.com/post/31500)

### open
> 用法

```JavaScript
// 打开地址
open /Applications/xxx(应用的名称).app

open /Applications/Emacs.app --args ~/workspace/assignment.sh
// 打开应用名称
open -a “xxx(应用的名称).app” "文件地址"
open -a Emacs ~/workspace/assignment.sh
// url scheme + 参数
open myapp://host/path?a=1&b=2
```

### Shell

```JavaScript
// shell启动浏览器
shell.openExternal('http://www.google.com')
// 地址打开A应用
shell.openPath(filePath).then(res => {
  console.log('解压完毕')
  event.reply('download-finish', filePath)
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
// 设置它为 true 可以使 asar 文件在node的内置模块中实效
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

> 用法

[extract源码](https://npmdoc.github.io/node-npmdoc-extract-zip/build/apidoc.html)

```JavaScript
const extract = require('extract-zip')
async function main () {
  try {
    await extract(source, { dir: target })
    console.log('Extraction complete')
  } catch (err) {
    // handle any errors
  }
}
```
dir - 默认为 process.cwd()
defaultDirMode —— 整数 - 目录模式（权限）默认为493（八进制0755整数）
defaultFileMode —— 整数 - 文件模式（权限）默认为420（八进制0644整数）
onEntry —— 函数 - 如果存在，将使用（entry，zipfile）调用，entry 是从yauzl 的 entry 事件转发的zip文件中的每个条目。 zipfile 是 yauzl 实例
仅当 zip 文件中未设置权限时才使用默认模式。

> 乱码

```JavaScript
const iconv = require('iconv-lite')
// 用于在node当中处理在各种操作系统出现的各种奇特编码，该模块不提供读写文件的操作，只提供文件编码转换的功能。
const extract = require('extract-zip')
async function fileZip () {
  try {
    await extract(source, {
      dir: target,
      onEntry: (entry，zipfile) => {
        // entry 文件目录实例
        // zipfile 压缩文件实例
        item.fileName = iconv.decode(iconv.encode(item.fileName, 'CP437'), 'UTF-8')
    }})
    console.log('Extraction complete')
  } catch (err) {
    // handle any errors
  }
}
// iconvLite.decode(data,'gbk') 默认为utf8编码格式的字符串
// iconv.decode 解码
// iconv.encode 编译
// Buffer对象

```

## 其他解压

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

Electron项目搭建需求点：
1. electron项目搭建（2天）
1. mock本地数据（0.5天）
1. vuex模块化（0.5天）
1. api封装（0.5天）
1. 登录权限（router）（0.5天）
1. 应用打包（win/Mac）（0.5天）
1. 自动化测试（0.2天）
1. 开发文档docsify（0.2天）
1. 公共组件（0.2天）
1. Tool（0.2天）

底层功能封装：
1. 解压（1天）
1. 下载（可视化、下载进度、下载速度、剩余时间）（2天）
1. 启动（win/Mac）（1天）
1. 应用检测（win/Mac）（2天）
1. 应用是否启动（win/Mac）（2天）
1. 更新机制（全量更新、增量更新）（3天）
1. 打包压缩DMG

首屏优化方案：
1. 滞后显示窗口（0.5天）
1. 骨架图（loading.html）（1天）

下载器：（待研究）


## 打包问题
[在vue-cli-plugin-electron-builder下用electron:build打包或生成应用程序的两种方法](https://www.jianshu.com/p/1dbb96bc8f37)
vuecli 
