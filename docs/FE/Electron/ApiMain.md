
# 主进程

# 相关功能
## 协议唤起
![](https://raw.githubusercontent.com/oikonomopo/electron-deep-linking-mac-win/master/electron-deeplinking-osx-example.gif)
```js
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
## 开启无边框
electron创建无边框窗体的几种特殊方式

```js
new BrowserWindow({
  frame: false,
})
```

### MAC红绿灯
窗口处于焦点，显示红绿灯
> 默认状态

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9195d2ce92d471f90eae582209bb0b3~tplv-k3u1fbpfcp-watermark.image)

> hidden

```js
new BrowserWindow({
  titleBarStyle: 'hidden',
})
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76923ffc620845a9937cbbe37cfb3fba~tplv-k3u1fbpfcp-watermark.image)

> hiddenInset

```js
new BrowserWindow({
  titleBarStyle: 'hiddenInset',
})
```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9310149a7db489ca1166ad62046e5f8~tplv-k3u1fbpfcp-watermark.image)

> customButtonsOnHover

```js
new BrowserWindow({
  titleBarStyle: 'customButtonsOnHover',
})
```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18d9206bfbac4169af091413e23c6649~tplv-k3u1fbpfcp-watermark.image)

> customButtonsOnHover
交通灯按钮是等鼠标移动上去之后，才会出现的

```js
new BrowserWindow({
  frame: false,
  titleBarStyle: 'customButtonsOnHover',
})
```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18d9206bfbac4169af091413e23c6649~tplv-k3u1fbpfcp-watermark.image)

> fullscreenable

```js
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

## 路由切换（登录）

```js
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

```js
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

# API

## autoUpdater
## BrowserWindow
类让你有创建一个浏览器窗口的权力

## contentTracing
## dialog
## globalShortcut
## ipcMain
## Menu
## MenuItem
## powerMonitor
## powerSaveBlocker
## protocol
## session
## webContents

## process
## getLocale
## Tray
添加图标和上下文菜单到系统通知区

### 创建图标

```js
appIcon = new Tray(__dirname + '/path/to/my/icon')
```

> 路径

[如何理解常量__dirname和__static的区别？](https://newsn.net/say/electron-dirname-static.html)

> 格式

支持.png/.jpg，不支持.bmp/.gif
win10支持.ico，mac支持.icns

> 尺寸

1. win系统

16x16 (100% DPI scale)
20x20 (125% DPI scale)
24x24 (150% DPI scale)
32x32 (200% DPI scale)
32x32 (100% DPI scale)
40x40 (125% DPI scale)
48x48 (150% DPI scale)
64x64 (200% DPI scale)
256x256

1. mac系统不会进行图标缩放

1x 16*16
2x 32*32

[tray托盘图标文件需要什么格式尺寸及位置？](https://newsn.net/say/electron-tray-ico.html)

### API
#### 事件
> click 当该图标被点击时触发

event KeyboardEvent
bounds Rectangle - 系统托盘图标的边界。
position Point - 事件的位置信息。
```js
tray.on('click', (event, bounds, position) => {
  console.log(event, bounds, position)
})
```

> right-click 【macOSWindows】当该图标被右击时触发

event KeyboardEvent
bounds Rectangle - 系统托盘图标的边界。


> double-click 【macOSWindows】当该图标被双击时触发

event KeyboardEvent
bounds Rectangle - 系统托盘图标的边界。

> balloon-show 【Windows】当系统托盘图标气泡显示时，触发该事件

> balloon-click 【Windows】当系统托盘气泡被点击时，触发该事件

> balloon-closed 【Windows】当系统托盘气泡因为超时被关闭或者用户手动关闭时，触发该事件

> drop 【macOS】当有任何拖动项拖到该任务栏图标上时，触发该事件

> drop-files 【macOS】当有任何文件被拖到该任务栏图标上时，触发该事件

event Event
files String[] - 拖至任务栏图标上的文件的路径。

> drop-text 【macOS】当有任何文字被拖到该任务栏图标上时，触发该事件

event Event
text String - 拖至任务栏图标上的文字内容。

> drag-enter 【macOS】当有任何拖动操作进入（拖动未结束）该任务栏图标时，触发该事件

> drag-leave 【macOS】当有任何拖动操作离开该任务栏图标时，触发该事件

> drag-end 【macOS】当有任何拖动操作在托盘或其他地方结束时，触发该事件

> mouse-up 【macOS】

event KeyboardEvent
position Point - 事件的位置信息。
Emitted when the mouse is released from clicking the tray icon.

Note: This will not be emitted if you have set a context menu for your Tray using tray.setContextMenu, as a result of macOS-level constraints.

> mouse-down 【macOS】

event KeyboardEvent
position Point - 事件的位置信息。
Emitted when the mouse clicks the tray icon.

> mouse-enter 【macOS】当鼠标进入该任务栏图标时，触发该事件

event KeyboardEvent
position Point - 事件的位置信息。

> mouse-leave 【macOS】当鼠标离开该任务栏图标时，触发该事件

event KeyboardEvent
position Point - 事件的位置信息。

> mouse-move 【macOSWindows】当鼠标在该任务栏图标上移动时，触发该事件

event KeyboardEvent
position Point - 事件的位置信息。

#### 实例

> tray.destroy()立即销毁该任务栏图标

> tray.setImage(image->[NativeImage](/FE/Electron/ApiMain?id=nativeImage) | String)设置image作为托盘中显示的图标

> tray.setPressedImage(image->[NativeImage](/FE/Electron/ApiMain?id=nativeImage) | String) 在 macOS 中，设置image作为托盘图标被按下时显示的图标

> tray.setToolTip(toolTip->String)设置鼠标指针在托盘图标上悬停时显示的文本

> tray.setTitle(title->String[, options->Object]) [macOS]设置状态栏中托盘图标旁边显示的标题

fontType字符串（可选）-要显示的字体系列变量，可以是等距或等距数字。macOS 10.15+中提供了monospaced，macOS 10.11+中提供了monospacedDigit。留空时，标题使用默认的系统字体。设置状态栏中托盘图标旁边显示的标题（支持ANSI颜色）

> tray.getTitle() [macOS]返回字符串-状态栏中托盘图标旁边显示的标题

> tray.setIgnoreDoubleClickEvents(ignore->Boolean) [macOS]将选项设置为忽略双击事件。忽略这些事件允许您检测托盘图标的每次单击。默认情况下，此值设置为false。

> tray.getIgnoreDoubleClickEvents() [macOS]返回布尔值-是否忽略双击事件

> tray.displayBalloon(options) [Windows] 显示一个托盘气球通知

选项 对象
icon (NativeImage | String) (optional) - Icon to use when iconType is custom.
iconType String (optional) - Can be none, info, warning, error or custom. Default is custom.
title String
content String
largeIcon Boolean (optional) - The large version of the icon should be used. 默认值为 true。 Maps to NIIF_LARGE_ICON.
noSound Boolean (optional) - Do not play the associated sound. 默认值为 false. Maps to NIIF_NOSOUND.
respectQuietTime Boolean (optional) - Do not display the balloon notification if the current user is in "quiet time". 默认值为 false. Maps to NIIF_RESPECT_QUIET_TIME.

> tray.removeBalloon() [Windows] 移除托盘气球

> tray.focus() [Windows]  将焦点返回到任务栏通知区域。

> tray.popUpContextMenu([menu, position位置]) [macOSWindows]弹出托盘图标的上下文菜单

> tray.closeContextMenu() [macOSWindows]关闭打开的上下文菜单

> tray.setContextMenu(menu->Menu | null)设置这个图标的内容菜单

> tray.getBounds() [macOSWindows]以Object类型返回托盘图标的bounds, 返回 Rectangle

> tray.isDestroyed()返回 Boolean -判断托盘图标是否被销毁

### 相关功能

#### 仿QQ实现托盘图标闪动







# 多进程 MR
## nativeImage

```js
```
