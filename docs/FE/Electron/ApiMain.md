# app

## 协议唤起
![](https://raw.githubusercontent.com/oikonomopo/electron-deep-linking-mac-win/master/electron-deeplinking-osx-example.gif)
```JavaScript
// 窗口管理器
const windowManager = appManager.windowManager
// 是否启动
const gotTheLock = app.requestSingleInstanceLock()
// 协议地址
let deeplinkingUrl
// 设置协议
if (!app.isDefaultProtocolClient('reworld')) {
  // Define custom protocol handler. Deep linking works on packaged versions of the application!
  app.setAsDefaultProtocolClient('reworld')
}
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
      mainWindow.show()
    }
    if (process.platform === 'win32') {
      deeplinkingUrl = process.argv.slice(1)
    }
    winProtocol(deeplinkingUrl, mainWindow)
  })
}
function winProtocol(s, mainWindow) {
  if (mainWindow && mainWindow.webContents) {
    // 发送JavaScript
    mainWindow.webContents.executeJavaScript(`console.log("${s}")`)
    // 发送
    mainWindow.webContents.send('winProtocol', s)
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('winProtocol', s)
    })
  }
}
```





electron创建无边框窗体的几种特殊方式

## 

### 开启无边框

```JavaScript
new BrowserWindow({
  frame: false,
})
```

### MAC红绿灯
窗口处于焦点，显示红绿灯
> 默认状态

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9195d2ce92d471f90eae582209bb0b3~tplv-k3u1fbpfcp-watermark.image)

> hidden

```JavaScript
new BrowserWindow({
  titleBarStyle: 'hidden',
})
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76923ffc620845a9937cbbe37cfb3fba~tplv-k3u1fbpfcp-watermark.image)

> hiddenInset

```JavaScript
new BrowserWindow({
  titleBarStyle: 'hiddenInset',
})
```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9310149a7db489ca1166ad62046e5f8~tplv-k3u1fbpfcp-watermark.image)

> customButtonsOnHover

```JavaScript
new BrowserWindow({
  titleBarStyle: 'customButtonsOnHover',
})
```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18d9206bfbac4169af091413e23c6649~tplv-k3u1fbpfcp-watermark.image)

> customButtonsOnHover
交通灯按钮是等鼠标移动上去之后，才会出现的

```JavaScript
new BrowserWindow({
  frame: false,
  titleBarStyle: 'customButtonsOnHover',
})
```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18d9206bfbac4169af091413e23c6649~tplv-k3u1fbpfcp-watermark.image)

> fullscreenable

```JavaScript
new BrowserWindow({
  titleBarStyle: 'hiddenInset',
  fullscreenable: false
})
```
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fe640d16d5349c7821f3143629bbe69~tplv-k3u1fbpfcp-watermark.image)

> 红绿灯

```css
.macIcon{
  width: 100px;
  // hiddenInset
  height: 22px;
  margin-left: 4px;
  // hiddenInset
  height: 38px;
  margin-left: 9px;
  display: flex;
  align-items: center;
  opacity: 0.1;
  .app-action-button{
    width: 12px;
    height: 12px;
    background: #FFF;
    border-radius: 20px;
    margin: 0 4px;
  }
}
```

## 路由切换

```JavaScript
// 登录切换
logger.debug('app', 'token is: ', this.store.get('token'))
ipcMain.handle('synchronousMessage', (event, name, token) => {
  this.store.set('token', token || '')
  console.log('synchronousMessage', token)
  if (name === 'login') {
    const { width, height } = Pkg.window
    this.win.setSize(width, height)
  } else {
    const { width, height } = Pkg.minWindow
    this.win.setSize(width, height)
  }
})

// 路由切换
if (process.env.WEBPACK_DEV_SERVER_URL) {
  this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  if (!process.env.IS_TEST) {
    // 开发环境下自启动开发者工具
    this.win.webContents.openDevTools({ mode: 'detach' })
  }
} else {
  createProtocol('app')
  this.win.loadURL('app://./index.html/')
}
// 窗口关闭
this.win.on('closed', () => {
  this.win = null
})
// 初始化后再显示
this.win.on('ready-to-show', () => {
  logger.debug('win', 'ready-to-show')
  this.win.show()
})
```


### 仿WeChat 登录

```JavaScript
// 初始化窗口
initBrowserPage () {
  const isLogin = this.store.get('token') ? '' : '#/login'
  logger.debug('app', 'token is: ', this.store.get('token'))
  ipcMain.handle('synchronousMessage', (event, name, token) => {
    this.store.set('token', token || '')
    console.log('synchronousMessage', token)
    if (name === 'login') {
      const { width, height } = Pkg.window
      this.win.setSize(width, height)
    } else {
      const { width, height } = Pkg.windowOline
      this.win.setSize(width, height)
    }
  })
  ipcMain.handle('winMenu', (event, name) => {
    this.win[name]()
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + isLogin)
    if (!process.env.IS_TEST) {
      // 开发环境下自启动开发者工具
      // start developer tools in the development environment
      this.win.webContents.openDevTools({ mode: 'detach' })
    }
  } else {
    // this.win.webContents.openDevTools({ mode: 'detach' })
    createProtocol('app')
    this.win.loadURL('app://./index.html/' + isLogin)
  }
  // 窗口关闭
  this.win.on('closed', () => {
    this.win = null
  })
  // 初始化后再显示
  this.win.on('ready-to-show', () => {
    logger.debug('win', 'ready-to-show')
    this.win.show()
  })
}

// 创建窗口
createWindow () {
  // console.log(path.basename(__filename, '.js'))
  const token = this.store.get('token')
  const { width, height } = token ? Pkg.windowOline : Pkg.window
  if (!this.win) {
    this.win = new BrowserWindow({
      width: width,
      height: height,
      minWidth: 1080,
      minHeight: 770,
      show: true,
      frame: false,
      transparent: true,
      // titleBarStyle: 'hiddenInset',
      // eslint-disable-next-line no-undef
      // icon: `${__static}/app.png`,
      webPreferences: {
        // 设为false允许跨域
        webSecurity: false,
        nodeIntegration: true,
        webviewTag: true
      }
    })
    // 初始化浏览器页面
    this.initBrowserPage()
    this.clientOpen()
    // 设置窗口菜单
    // this.setWindowMenu()
  }
}
```

```JavaScript
```