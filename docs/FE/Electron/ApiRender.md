# 渲染进程
# window.open
创建并开启新窗口，多次调用仅有一个同一`frameName`窗口。

## 创建

```js
window.open(url[, frameName][, features])
```

```js
// winOpen
url: 网址
frameName: 命名
features: 字符串参数，逗号分隔
return BrowserWindowProxy 类的实例

window.open('http://www.baidu.com', 'oauth', 'frame=true, width=700, transparent=')
transparent： 空：false，有值：true
nodeIntegration
```

## 实例

> winOpen.blur() 子窗口的失去焦点

> winOpen.close() 强行关闭子窗口，忽略卸载事件

> winOpen.closed 在子窗口关闭之后恢复正常

> winOpen.eval(code) code String评估子窗口的代码

> winOpen.focus() 子窗口获得焦点(让其显示在最前)

> winOpen.postMessage(message, targetOrigin)

## 通信

> 父到子

```js
postMessage(message, targetOrigin)
message: 消息
targetOrigin: 地址

winOpen.postMessage("The user is 'bob' and the password is 'secret'", 'https://open.weixin.qq.com/')

// 接收
window.addEventListener('message', (event) => {
  alert(event.data)
}, false)
```

1. event.data表示接收到的消息
1. event.origin表示postMessage的发送来源，包括协议，域名和端口
1. event.source表示发送消息的窗口对象的引用; 我们可以用这个引用来建立两个不同来源的窗口之间的双向通信。

> 子到父

```js
window.addEventListener('message', (event) => {
  alert(event.data)
}, false)

winOpen.eval (`window.opener.postMessage('dsdfasdf', 'http://localhost:8081')`);
```

## 监听开启新窗口
```js
// 主窗口 -> 创建窗口
mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'oauth') {
    // open window as modal
    event.preventDefault()
    // 将所有可枚举属性的值从一个或多个源对象分配到目标对象
    Object.assign(options, {
      modal: true,
      // parent: this.win,
      width: 100,
      height: 100
    })
    event.newGuest = new BrowserWindow(options)
    event.newGuest.loadURL(url)
    event.newGuest.webContents.openDevTools({ mode: 'detach' })
    // 监听路由跳转
    event.newGuest.webContents.on('will-navigate', (event, url) => {
      setTimeout(() => {
        win.webContents.send('winoauth')
      }, 1000)
    })
  }
})
```

### 模态窗口

```js
// 主窗口
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nativeWindowOpen: true
  }
})
mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'modal') {
    // open window as modal
    event.preventDefault()
    Object.assign(options, {
      modal: true,
      parent: mainWindow,
      width: 100,
      height: 100
    })
    event.newGuest = new BrowserWindow(options)
    event.newGuest.webContents.on('close', () => {
      console.log('newGuest closed!')
      // 关闭 childId
      if (childId) childId.close()
    })
  }
})
```
### 自定义模态窗口

```js
// 主窗口
const win = appManager.windowManager.mainWindow.win
win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  let childId = ''
  if (frameName === 'login') {
    childId = new BrowserWindow({
      modal: true,
      parent: win,
      width: 1,
      height: 1
    })
  }
  if (frameName === 'oauth') {
    // open window as modal
    event.preventDefault()
    Object.assign(options, {
      modal: true,
      width: 1000,
      height: 1000
    })
    event.newGuest = new BrowserWindow(options)
    event.newGuest.loadURL(url)
    event.newGuest.webContents.openDevTools({ mode: 'detach' })
    event.newGuest.webContents.on('will-navigate', (event, url) => {
      setTimeout(() => {
        win.webContents.send('winoauth')
      }, 1000)
    })
    event.newGuest.webContents.on('close', () => {
      console.log('newGuest closed!')
      if (childId) childId.close()
    })
  }
})
```

### 自定义模态窗口
控制显示，启动窗口需要时间
通过这种方式添加本地页面页面显示 但是效果不好 启动时间过长
[electron程序，如何设置模态窗口（父子窗口）？](https://newsn.net/say/electron-modal.html)

```js
newWindow (appManager) {
  const win = appManager.windowManager.mainWindow.win
  let winOpen = ''
  ipcMain.on('close', () => {
    console.log(winOpen.hide())
  })
  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    event.preventDefault()
    Object.assign(options, {
      modal: true,
      webPreferences: {
        nodeIntegration: frameName === 'Info'
      },
      resizable: false,
      show: false,
      // x: '100',
      // y: '100',
      // maxwidth: options.maxwidth,
      // maxheight: options.maxheight,
      parent: frameName === 'Info' ? win : ''
    })
    event.newGuest = new BrowserWindow(options)
    winOpen = event.newGuest
    console.log(url)
    // if (frameName === 'Info') url = process.env.WEBPACK_DEV_SERVER_URL + url
    event.newGuest.loadURL(url)
    event.newGuest.webContents.openDevTools({ mode: 'detach' })
    event.newGuest.on('ready-to-show', () => {
      event.newGuest.show()
    })
    // event.newGuest.webContents.on('will-navigate', (event, url) => {
    //   // console.log('event', event.sender.history, url)
    //   setTimeout(() => {
    //     win.webContents.send('winoauth')
    //   }, 1000)
    // })
  })
}
```

> event

```js
{
  preventDefault
  sendReply
  sender
  webContents
}
```
> url

> frameName 框架名

> disposition

new-window
> options参数

```js
{
  frame: 'true',
  width: 1000,
  height: 500,
  webPreferences: {
    nodeIntegration: false,
    webSecurity: false,
    webviewTag: true,
    transparent: true,
    nodeIntegrationInSubFrames: false,
    openerId: 1
  },
  transparent: '',
  title: 'oauth',
  show: true
}
```
> additionalFeatures补充特性
[]

