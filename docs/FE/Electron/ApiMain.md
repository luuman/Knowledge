
# 主进程

# 相关功能

## 开机自启

```js
// 是否开机自启
export function getAutoStart(isAutoStart) {
  const { openAtLogin } = app.getLoginItemSettings()
  return openAtLogin
}

// 设置开机自启
export function setAutoStart(isAutoStart) {
  if (!app.isPackaged) {
    // 开发环境
    app.setLoginItemSettings({
      openAtLogin: isAutoStart,
      openAsHidden: false,
      path: process.execPath,
      args: [path.resolve(process.argv[1])]
    })
  } else {
    // 打包环境
    app.setLoginItemSettings({
      openAtLogin: isAutoStart
    })
  }
}
```

> 注意

1. Windows调用相关功能会被杀毒软件监测，但之后出现一次
1. Mac系统则不会出现这样的问题

[如何加入开机启动项？auto-launch](https://newsn.net/say/node-auto-launch.html)

[electron 写入注册表 实现开机自启动](https://blog.csdn.net/weixin_30563917/article/details/96177798?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control)
使用这种方式，依然会出现Window的问题，windows软件运行`HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`就会出现提示问题

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
```js
16x16 (100% DPI scale)
20x20 (125% DPI scale)
24x24 (150% DPI scale)
32x32 (200% DPI scale)
32x32 (100% DPI scale)
40x40 (125% DPI scale)
48x48 (150% DPI scale)
64x64 (200% DPI scale)
256x256
```
1. mac系统不会进行图标缩放
```js
1x 16*16
2x 32*32
```

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

```js
tray.on('right-click', (event, bounds, position) => {
  console.log(event, bounds, position)
})
```

> double-click 【macOSWindows】当该图标被双击时触发

```js
tray.on('double-click', (event, bounds) => {
  console.log(event, bounds)
})
```

> balloon-show 【Windows】当系统托盘图标气泡显示时，触发该事件

```js
tray.on('balloon-show', (event, bounds, position) => {
  console.log(event, bounds, position)
})
```
> balloon-click 【Windows】当系统托盘气泡被点击时，触发该事件

```js
tray.on('balloon-click', (event, bounds, position) => {
  console.log(event, bounds, position)
})
```
> balloon-closed 【Windows】当系统托盘气泡因为超时被关闭或者用户手动关闭时，触发该事件

```js
tray.on('balloon-closed', (event, bounds, position) => {
  console.log(event, bounds, position)
})
```
> drop 【macOS】当有任何拖动项拖到该任务栏图标上时，触发该事件

```js
tray.on('drop', (event, bounds, position) => {
  console.log(event, bounds, position)
})
```
> drop-files 【macOS】当有任何文件被拖到该任务栏图标上时，触发该事件

```js
tray.on('drop-files', (event, files) => {
  console.log(event, files)
})
```
files String[] - 拖至任务栏图标上的文件的路径。

> drop-text 【macOS】当有任何文字被拖到该任务栏图标上时，触发该事件

```js
tray.on('drop-text', (event, text) => {
  console.log(event, text)
})
```
text String - 拖至任务栏图标上的文字内容。

> drag-enter 【macOS】当有任何拖动操作进入（拖动未结束）该任务栏图标时，触发该事件

```js
tray.on('drag-enter', (event, bounds, position) => {
  console.log(event, bounds, position)
})
```
> drag-leave 【macOS】当有任何拖动操作离开该任务栏图标时，触发该事件

```js
tray.on('drag-leave', (event, bounds, position) => {
  console.log(event, bounds, position)
})
```
> drag-end 【macOS】当有任何拖动操作在托盘或其他地方结束时，触发该事件

```js
tray.on('drag-end', (event, bounds, position) => {
  console.log(event, bounds, position)
})
```
> mouse-up 【macOS】释放鼠标单击托盘图标时发出

```js
tray.on('mouse-up', (event, position) => {
  console.log(event, bounds, position)
})
```
注意：如果您已使用设置托盘的上下文菜单，则不会发出此消息tray.setContext菜单，由于macOS级别的限制
> mouse-down 【macOS】当鼠标单击托盘图标时发出

```js
tray.on('mouse-down', (event, position) => {
  console.log(event, bounds, position)
})
```

> mouse-enter 【macOS】当鼠标进入该任务栏图标时，触发该事件

```js
tray.on('mouse-enter', (event, position) => {
  console.log(event, bounds, position)
})
```

> mouse-leave 【macOS】当鼠标离开该任务栏图标时，触发该事件

```js
tray.on('mouse-leave', (event, position) => {
  console.log(event, bounds, position)
})
```

> mouse-move 【macOSWindows】当鼠标在该任务栏图标上移动时，触发该事件

```js
tray.on('mouse-move', (event, position) => {
  console.log(event, bounds, position)
})
```

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

### 平台限制：

1. 在Linux上，如果支持，就使用应用程序指示器，否则将使用GtkStatusIcon。
1. 在仅支持应用程序指标的Linux发行版中，必须安装libappindicator1才能使任务栏图标正常工作。
1. 应用程序指标只有当它有一个上下文菜单时才会显示。
1. 当在Linux上使用应用程序指标时，它的 click事件将被忽略
1. On Linux in order for changes made to individual MenuItems to take effect, you have to call setContextMenu again. 例如：

### 相关功能

#### 仿QQ实现托盘图标闪动

```js
tray = new Tray(`${__static}/trayTemplate.png`)
// 启动闪烁
ipcMain.on('startBlink', (sys, param) => {
  var count = 0
  var _switch_ = setInterval(() => {
    if (count++ % 2 === 0) {
      tray.setImage(`${__static}/trayTemplate.png`)
    } else {
      tray.setImage(`${__static}/icon_16x16.png`)
    }
  }, 500)
})
// 关闭闪烁
ipcMain.on('doneBlink', (sys, param) => {
  clearInterval(_switch_)
  tray.setImage(`${__static}/trayTemplate.png`)
})
```





# 多进程 MR
## nativeImage
使用 PNG 或 JPG 文件创建托盘、dock和应用程序图标

### 创建

> String

```js
const { BrowserWindow, Tray } = require('electron')
const appIcon = new Tray('/Users/somebody/images/icon.png')
const win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

> NativeImage

```js
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

### 高分辨率

```js
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png

const { Tray } = require('electron')
const appIcon = new Tray('/Users/somebody/images/icon.png')
console.log(appIcon)

@1x
@1.25x
@1.33x
@1.4x
@1.5x
@1.8x
@2x
@2.5x
@3x
@4x
@5x
```

### 方法

> nativeImage.createEmpty() 创建一个空的`NativeImage`实例。

> nativeImage.createThumbnailFromPath(path, maxSize) macOSWindows
path String - path to a file that we intend to construct a thumbnail out of.
maxSize Size - the maximum width and height (positive numbers) the thumbnail returned can be. The Windows implementation will ignore maxSize.height and scale the height according to maxSize.width.
Returns Promise<NativeImage> - fulfilled with the file's thumbnail preview image, which is a NativeImage.

> nativeImage.createFromPath(path->String) 从位于 path 的文件创建新的 NativeImage 实例。 如果 path 不存在，，无法读取或不是有效图像，方法将返回空图像, 。

```js
const nativeImage = require('electron').nativeImage
const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

> nativeImage.createFromBitmap(buffer, options) 返回的原始位图像素数据的缓冲区创建新的NativeImage实例。具体格式取决于平台。

buffer Buffer
选项 对象
width Integer
height Integer
scaleFactor Double (optional) - Defaults to 1.0.
返回 NativeImage

> nativeImage.createFromBuffer(buffer[, options])

buffer Buffer
options Object (可选)
width Integer (optional) - Required for bitmap buffers.
height Integer (optional) - Required for bitmap buffers.
scaleFactor Double (optional) - Defaults to 1.0.
返回 NativeImage

从 buffer 创建新的 NativeImage 实例。 Tries to decode as PNG or JPEG first.

> nativeImage.createFromDataURL(dataURL)

dataURL String
返回 NativeImage

从 dataURL 创建新的 NativeImage 实例。

> nativeImage.createFromNamedImage(imageName[, hslShift]) macOS

imageName String
hslShift Number[] (optional)
返回 NativeImage

从映射到给定图像名称的 NSImage 创建一个 NativeImage 实例。 See System Icons for a list of possible values.

使用以下规则将hslShift应用于图像:

hsl_shift[0] (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
hsl_shift[1] (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = 保持不变。 1 = fully saturate the image.
hsl_shift[2] (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = 保持不变。 1 = 全亮 (所有像素点设置为白色)。
这意味着 [-1, 0, 1] 将使图像完全变白，[-1, 1, 0]将使图像完全变黑.

In some cases, the NSImageName doesn't match its string representation; one example of this is NSFolderImageName, whose string representation would actually be NSFolder. Therefore, you'll need to determine the correct string representation for your image before passing it in. This can be done with the following:

echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test

where SYSTEM_IMAGE_NAME should be replaced with any value from this list.

类: NativeImage
本机图像，如托盘、dock栏和应用图标。

进程： Main, Renderer

实例方法
以下方法可用于 NativeImage 类的实例:

> image.toPNG([options])

options Object (可选)
scaleFactor Double (optional) - Defaults to 1.0.
返回 Buffer-一个包含图像 PNG 编码数据的 Buffer 。

> image.toJPEG(quality)

quality Integer - Between 0 - 100.
返回 Buffer-一个包含图像 JPEG 编码数据的 Buffer 。

> image.toBitmap([options])

options Object (可选)
scaleFactor Double (optional) - Defaults to 1.0.
返回 Buffer-一个包含图像的原始位图像素数据副本的 Buffer 。

> image.toDataURL([options])

options Object (可选)
scaleFactor Double (optional) - Defaults to 1.0.
返回 String-图像的数据 URL。

> image.getBitmap([options])

options Object (可选)
scaleFactor Double (optional) - Defaults to 1.0.
返回 Buffer-一个包含图像原始位图像素数据的 Buffer 。

The difference between getBitmap() and toBitmap() is that getBitmap() does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick; otherwise the data might be changed or destroyed.

> image.getNativeHandle() macOS

返回 Buffer-一个 Buffer , 它将 C 指针存储在图像的基础本机句柄上。 在 macOS 上, 将返回指向 NSImage 实例的指针。

请注意, 返回的指针是指向基础本机映像而不是副本的弱指针, 因此 必须 确保关联的 nativeImage 实例保留在周围。

> image.isEmpty()

返回 Boolean-图像是否为空。

> image.getSize([scaleFactor])

scaleFactor Double (optional) - Defaults to 1.0.
Returns Size.

If scaleFactor is passed, this will return the size corresponding to the image representation most closely matching the passed value.

> image.setTemplateImage(option)

option Boolean
将图像标记为模板图像。

> image.isTemplateImage()

返回 Boolean-图像是否为模板图像。

> image.crop(rect)

rect Rectangle -要裁剪的图像区域.
返回 NativeImage-裁剪的图像。

> image.resize(options)

选项 对象
width Integer (optional) - Defaults to the image's width.
height Integer (可选) - 默认值为图片高度.
quality String (optional) - The desired quality of the resize image. Possible values are good, better, or best. 默认值为best. 这些值表示期望的 质量/速度 的权衡。 They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.
返回 NativeImage-裁剪的图像。

如果只指定height或width，那么当前的长宽比将保留在缩放图像中。

> image.getAspectRatio([scaleFactor])

scaleFactor Double (optional) - Defaults to 1.0.
返回 Float - 图像的长宽比.

If scaleFactor is passed, this will return the aspect ratio corresponding to the image representation most closely matching the passed value.

> image.getScaleFactors()

Returns Float[] - An array of all scale factors corresponding to representations for a given nativeImage.

> image.addRepresentation(options)

选项 对象
scaleFactor Double - The scale factor to add the image representation for.
width Integer (可选) - 默认值为 0. Required if a bitmap buffer is specified as buffer.
height Integer (可选) - 默认值为 0. Required if a bitmap buffer is specified as buffer.
buffer Buffer (可选) - 包含原始图像数据的缓冲区.
dataURL String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.
Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.

实例属性
nativeImage.isMacTemplateImage macOS
A Boolean property that determines whether the image is considered a template image.

Please note that this property only has an effect on macOS.


```js
```
