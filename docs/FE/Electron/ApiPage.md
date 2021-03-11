## 页面API

# 内部命令
## alert
win样式丑陋可以拖拽、mac内嵌页面不可拖拽

# window.open
创建并开启新窗口，多次调用仅有一个同一`frameName`窗口。

## 创建

```JavaScript
window.open(url[, frameName][, features])
```

```JavaScript
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

```JavaScript
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

```JavaScript
window.addEventListener('message', (event) => {
  alert(event.data)
}, false)

winOpen.eval (`window.opener.postMessage('dsdfasdf', 'http://localhost:8081')`);
```

## 监听开启新窗口
```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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


# webview

特点：
1. 与`iframe`不同，不会阻塞页面渲染
1. webview和你的应用运行的是不同的，进程它不拥有渲染进程的权限
1. 并且应用和嵌入内容之间的交互全部都是异步的，这能保证应用的安全性不受嵌入内容的影响

## 属性

### src地址
```JavaScript
<webview src="https://www.github.com/"></webview>
```

### autosize自适应
开启自适应，设置大小区间minwidth, minheight, maxwidth, 和 maxheight
```JavaScript
<webview src="https://www.github.com/" autosize="on" minwidth="576" minheight="432"></webview>
```

### nodeintegration集成node
将整合node，并且拥有可以使用系统底层的资源，例如`require`和`process`
```JavaScript
<webview src="http://www.google.com/" nodeintegration></webview>
```

### plugins插件
可以使用浏览器插件
```JavaScript
<webview src="https://www.github.com/" plugins></webview>
```

### preload脚本
在 guest page 中的其他脚本执行之前预加载一个指定的脚本。规定预加载脚本的url须如 file: 或者 asar:，因为它在是 guest page 中通过通过 require 命令加载的。
如果 guest page 没有整合 node ，这个脚本将试图使用真个 Node APIs ，但是在这个脚本执行完毕时，之前由node插入的全局对象会被删除。
```JavaScript
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

### httpreferrer
为 guest page 设置 referrer URL。
```JavaScript
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

### useragent用户代理
在 guest page 加载之前为其设置用户代理。如果页面已经加载了，可以使用 setUserAgent 方法来改变用户代理。
```JavaScript
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

### disablewebsecurity禁用web安全控制
如果这个属性的值为 "on" ， guest page会禁用web安全控制.
```JavaScript
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

### partition
为page设置session。如果初始值为 partition ,这个 page 将会为app中的所有 page 应用同一个持续有效的 session。如果没有 persist: 前缀, 这个 page 将会使用一个历史 session 。通过分配使用相同的 partition, 所有的page都可以分享相同的session。如果 partition 没有设置，那app将使用默认的session.
这个值只能在在第一个渲染进程之前设置修改，之后修改的话会无效并且抛出一个DOM异常.
```JavaScript
<webview src="https://github.com" partition="persist:github"></webview>

<webview src="http://electron.atom.io" partition="electron"></webview>
```

### allowpopups新窗口
如果这个属性的值为 "on" ，将允许 guest page 打开一个新窗口。
```JavaScript
<webview src="https://www.github.com/" allowpopups></webview>
```

### blinkfeatures特性被启用
这个属性的值为一个用逗号分隔的列表，它的值指定特性被启用。你可以从setFeatureEnabledFromString函数找到完整的支持特性。
```JavaScript
<webview src="https://www.github.com/" blinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

## 方法
元素必须在使用这些方法之前加载完毕

```JavaScript
var webview = document.getElementById('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

> .getURL() 地址

> .getTitle() 标题

> .isLoading() 是否仍在加载资源的布尔值

> .isWaitingForResponse() 是否正在等待page的主要资源做出回应的布尔值

> .stop() 停止渲染

> .reload() 重新加载

> .reloadIgnoringCache() 忽视缓存，重新加载

> .canGoBack() 是否能够回退的布尔值

> .canGoForward() 是否能够前进的布尔值

> .canGoToOffset(offset) 是否能够前进到 offset 的布尔值

> .clearHistory() 清除导航历史

> .goBack() 回退

> .goForward() 前进

> .goToIndex(index) 导航到指定的绝对位置

> .goToOffset(offset) 导航到指定的相对位置

> .isCrashed() 返回一个 渲染进程是否崩溃 的布尔值

> .setUserAgent(userAgent) 重新设置用户代理

> .getUserAgent() 返回用户代理名字，返回类型：String

> .insertCSS(css) 插入css

```JavaScript
webview.insertCSS(`
  body {
    background: red !important;
    width: 100%;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  ::-webkit-scrollbar-button:start:increment,
  ::-webkit-scrollbar-button:end:decrement {
    display: none;
  }
  ::-webkit-scrollbar-corner {
    display: block;
  }
`)
```

> .undo() 在page中编辑执行 undo 命令

> .redo() 在page中编辑执行 redo 命令

> .cut() 在page中编辑执行 cut 命令

> .copy() 在page中编辑执行 copy 命令

> .paste() 在page中编辑执行 paste 命令

> .pasteAndMatchStyle() 在page中编辑执行 pasteAndMatchStyle 命令

> .delete() 在page中编辑执行 delete 命令

> .selectAll() 在page中编辑执行 selectAll 命令

> .unselect() 在page中编辑执行 unselect 命令

> .replace(text) 在page中编辑执行 replace 命令

> .replaceMisspelling(text) 在page中编辑执行 replaceMisspelling 命令

> .insertText(text) 插入文本

> .openDevTools() 为 guest page 打开开发工具调试窗口

> .closeDevTools() 为 guest page 关闭开发工具调试窗口

> .isDevToolsOpened() 返回一个 guest page 是否打开了开发工具调试窗口的布尔值

> .isDevToolsFocused() 返回一个 guest page 是否聚焦了开发工具调试窗口的布尔值

> .inspectElement(x, y) 开始检查 guest page 在 (x, y) 位置的元素

> .inspectServiceWorker() 在 guest page 中为服务人员打开开发工具

> .setAudioMuted(muted) muted Boolean 设置 guest page 流畅(muted)

> .isAudioMuted() 返回一个 guest page 是否流畅的布尔值

> .print([options]) 打印输出 webview 的 web page. 类似 webContents.print([options]).

> .printToPDF(options, callback) 以pdf格式打印输出 webview 的 web page. 类似 webContents.printToPDF(options, callback).

> .send(channel[, arg1][, arg2][, ...]) 通过 channel 向渲染进程发出异步消息，你也可以发送任意的参数。 渲染进程通过ipcRenderer 模块监听 channel 事件来控制消息.

> .sendInputEvent(event) 向 page 发送输入事件.

> .getWebContents() 返回和这个 webview 相关的 WebContents.

### loadURL
加载 webview 中的 url，url 必须包含协议前缀，例如 http:// 或 file://.
```JavaScript
<webview>.loadURL(url[, options])
url URL
options Object (可选)
httpReferrer String - 一个http类型的url.
userAgent String -用于发起请求的用户代理.
extraHeaders String - 额外的headers,用 "\n"分隔.
```

### executeJavaScript
评估 code ，如果 userGesture 值为 true ，它将在这个page里面创建用户手势. HTML APIs ，如 requestFullScreen,它需要用户响应，那么将自动通过这个参数优化.
```JavaScript
<webview>.executeJavaScript(code, userGesture, callback)
code String
userGesture Boolean - 默认 false.
callback Function (可选) - 回调函数.
result

webview.executeJavaScript(`
  setTimeout(()=>{
      console.log('粉丝数：');
  }, 2000);
`)
```

### findInPage
发起一个请求来寻找页面中的所有匹配 text 的地方并且返回一个 Integer来表示这个请求用的请求Id. 这个请求结果可以通过订阅found-in-page 事件来取得.
```JavaScript
<webview>.findInPage(text[, options])
text String - 搜索内容,不能为空.
options Object (可选)
forward Boolean - 向前或向后, 默认为 true.
findNext Boolean - 是否查找的第一个结果, 默认为 false.
matchCase Boolean - 是否区分大小写, 默认为 false.
wordStart Boolean - 是否只查找首字母. 默认为 false.
medialCapitalAsWordStart Boolean - 当配合 wordStart的时候,接受一个文字中的匹配项，要求匹配项是以大写字母开头后面跟小写字母或者没有字母。可以接受一些其他单词内部匹配, 默认为 false.
```
### stopFindInPage
使用 action 停止 findInPage 请求.
```JavaScript
<webview>.stopFindInPage(action)
action String - 指定一个行为来接替停止 <webview>.findInPage 请求.
clearSelection - 转变为一个普通的 selection.
keepSelection - 清除 selection.
activateSelection - 聚焦并点击 selection node.
```



## 事件监听
webview 可用下面的 DOM 事件

### 加载完成触发
> load-commit

这个包含当前文档的导航和副框架的文档加载，但是不包含异步资源加载.

url String
isMainFrame Boolean

### 导航加载完成时触发
> did-finish-load
在导航加载完成时触发，也就是tab 的 spinner停止spinning，并且加载事件处理

### 在加载失败或取消是触发
> did-fail-load
Returns

errorCode Integer
errorDescription String
validatedURL String
类似 did-finish-load ，在加载失败或取消是触发，例如提出 window.stop().

> did-frame-finish-load
返回

isMainFrame Boolean
当一个 frame 完成 加载时触发.

### 开始加载时触发
> did-start-loading

### 停止家在时触发
> did-stop-loading

### 当获得返回详情的时候触发
> did-get-response-details

status Boolean
newURL String
originalURL String
httpResponseCode Integer
requestMethod String
referrer String
headers Object

status 指示 socket 连接来下载资源.

### 当重定向请求资源被接收的时候触发
> did-get-redirect-request

oldURL String
newURL String
isMainFrame Boolean

### 当指定的frame文档加载完毕时触发
> dom-ready

### 当导航中的页面title被设置时触发
> page-title-updated

title String
explicitSet Boolean
. 在title通过文档路径异步加载时explicitSet为false.

### 当page收到了图标url时触发
> page-favicon-updated

favicons Array - Array of URLs.

### 当通过HTML API使界面进入全屏时触发
> enter-html-full-screen


### 当通过HTML API使界面退出全屏时触发
> leave-html-full-screen

### 当客户端输出控制台信息的时候触发
> console-message

level Integer
message String
line Integer
sourceId String

下面示例代码将所有信息输出到内置控制台，没有考虑到输出等级和其他属性。
```JavaScript
webview.addEventListener('console-message', function(e) {
  console.log('Guest page logged a message:', e.message);
});
```

### 在请求webview.findInPage结果有效时触发
> found-in-page

result Object
requestId Integer
finalUpdate Boolean - 指明下面是否还有更多的回应.
activeMatchOrdinal Integer (可选) - 活动匹配位置
matches Integer (optional) - 匹配数量.
selectionArea Object (optional) - 整合第一个匹配域.

```JavaScript
webview.addEventListener('found-in-page', function(e) {
  if (e.result.finalUpdate)
    webview.stopFindInPage("keepSelection");
});

const rquestId = webview.findInPage("test");
```

### 打开一个新的浏览器窗口时触发
> new-window

url String
frameName String
disposition String - 可以为 default, foreground-tab, background-tab, new-window 和 other.
options Object - 参数应该被用作创建新的 BrowserWindow.

下面示例代码在系统默认浏览器中打开了一个新的url.
```JavaScript
webview.addEventListener('new-window', function(e) {
  require('electron').shell.openExternal(e.url);
});
```

### 开始导航时触发
> will-navigate

url String
当用户或page尝试开始导航时触发. 它能在 window.location 变化或者用户点击连接的时候触发.

这个事件在以 APIS 编程方式开始导航时不会触发，例如 <webview>.loadURL 和 <webview>.back.

在页面内部导航跳转也将不回触发这个事件，例如点击锚链接或更新 window.location.hash.使用 did-navigate-in-page 来实现页内跳转事件.

使用 event.preventDefault() 并不会起什么用.

> did-navigate
当在界面中使用  来创建一个新的窗口时候，将会创建一个 BrowserWindow 的实例，并且将返回一个标识，这个界面通过标识来对这个新的窗口进行有限的控制.

url String
当导航结束时触发.

在页面内部导航跳转也将不回触发这个事件，例如点击锚链接或更新 window.location.hash.使用 did-navigate-in-page 来实现页内跳转事件.

> did-navigate-in-page
当在界面中使用  来创建一个新的窗口时候，将会创建一个 BrowserWindow 的实例，并且将返回一个标识，这个界面通过标识来对这个新的窗口进行有限的控制.

url String
当页内导航发生时触发. 当业内导航发生时，page url改变了，但是不会跳出 page . 例如在锚链接被电击或DOM hashchange 事件发生时触发.

> close
在 guest page试图关闭自己的时候触发

下面的示例代码指示了在客户端试图关闭自己的时候将改变导航连接为about:blank.

```JavaScript
webview.addEventListener('close', function() {
  webview.src = 'about:blank';
});
```

> ipc-message
当在界面中使用  来创建一个新的窗口时候，将会创建一个 BrowserWindow 的实例，并且将返回一个标识，这个界面通过标识来对这个新的窗口进行有限的控制.

channel String
args Array
在 guest page 向嵌入页发送一个异步消息的时候触发.

你可以很简单的使用 sendToHost 方法和 ipc-message 事件在 guest page 和 嵌入页(embedder page)之间通信:
```JavaScript
// In embedder page.
webview.addEventListener('ipc-message', function(event) {
  console.log(event.channel);
  // Prints "pong"
});
webview.send('ping');
// In guest page.
var ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('ping', function() {
  ipcRenderer.sendToHost('pong');
});
```

### 在渲染进程崩溃的时候触发
> crashed

### 在GPU进程崩溃的时候触发
> gpu-crashed

### dfd
> plugin-crashed
当在界面中使用  来创建一个新的窗口时候，将会创建一个 BrowserWindow 的实例，并且将返回一个标识，这个界面通过标识来对这个新的窗口进行有限的控制.

name String
version String
在插件进程崩溃的时候触发.

### 在界面内容销毁的时候触发
> destroyed

### 在媒体准备播放的时候触发
> media-started-playing

### 在媒体暂停播放或播放放毕的时候触发
> media-paused

### 在页面的主体色改变的时候触发. 在使用 meta 标签的时候这就很常见了
> did-change-theme-color

<meta name='theme-color' content='#ff0000'>

### 在开发者工具打开的时候触发
> devtools-opened

### 在开发者工具关闭的时候触发
> devtools-closed

### 在开发者工具获取焦点的时候触发
> devtools-focused

## 案例

### Loading

```JavaScript
<webview id="foo" src="https://www.github.com/" style="display:inline-block; width:640px; height:480px"></webview>
<div class="indicator"></div>

var webview = document.getElementById('foo')
var indicator = document.querySelector('.indicator')

var loadstart = function() {
  indicator.innerText = 'loading...'
}
var loadstop = function() {
  indicator.innerText = ''
}
webview.addEventListener('did-start-loading', loadstart)
webview.addEventListener('did-stop-loading', loadstop)
```

### 缓存
默认memory cache

```JavaScript
// 已禁用
webview.getWebContents().session.clearCache(() => {
  webview.reload()
)
// 缓存刷新
webview.reload()
// 禁用缓存刷新
webview.reloadIgnoringCache()
```

### 代码注入

```JavaScript
// openWeb
const webview = this.$refs.webview
let preloadFile
if (process.env.NODE_ENV === 'production') {
  // 生产环境获取本地js
  preloadFile = `file://\${global.__static}/preload.js`
} else {
  // 可以获取本地js
  preloadFile = 'file://' + require('path').resolve('static/preload.js')
}
webview.setAttribute('preload', preloadFile)
webview.send('ping', message)

// MS 接收消息
webview.addEventListener('ipc-message', (event) => {
  // message
  console.log(event.channel)
})

// webviews.js
console.log('webviews')
const { ipcRenderer } = require('electron')
// 监听ping 发送pong
ipcRenderer.on('ping', (event, msg) => {
  console.log(msg)
  ipcRenderer.sendToHost('pong')
})
```

> 思路

通过区分开发环境，直接获取本地文件，打包环境使用fs本地缓存来实现file资源获取。

```JavaScript
ipcMain.on('webviewFile', (event, callback) => {
  console.log('webviewFile is open')
  const updaterCacheDirName = Pkg.name
  const updatePendingPath = path.join(autoUpdater.app.baseCachePath, updaterCacheDirName, 'webView')
  const webviews = `
    console.log('webviews')
    const { ipcRenderer } = require('electron')
    ipcRenderer.on('ping', (event, msg) => {
      console.log(msg)
      ipcRenderer.sendToHost('pong')
    })
  `
  // 重新创建文件夹
  fs.emptyDir(updatePendingPath, err => {
    console.log(err)
    fs.writeFile(`${updatePendingPath}/webviews.js`, webviews, 'utf-8', (err) => {
      if (!err) {
        console.log('write success!')
        event.sender.send('webviewFile-reply', `file://${updatePendingPath}/webviews.js`)
      }
    })
  })
})
```

> 加载远程preload方法

```JavaScript
const {remote} = require('electron');
const path = require('path');
const fs = require('fs');

// preload的本地缓存路径
// 注意，这里必须是remote.app.getPath的路径，不能为__dirname路径，__dirname打包后的路径不可读写了
const preloadCachePath = path.join(remote.app.getPath('appData'), './preload/remote.webview.preload.js');

function fetchPreload() {
    return fetch('./preload/webview.preload.js').then(res => res.text()).then(content => {
        if (!fs.existsSync(path.dirname(preloadCachePath))) {
            fs.mkdirSync(path.dirname(preloadCachePath))
        }
        fs.writeFileSync(preloadCachePath, content);
        console.log('fetch remote webview.preload ready', preloadCachePath);
    })
}

function createWebview() {
    var webview = document.createElement('webview');
    webview.src = url;
    webview.preload = `file://${preloadCachePath}`;
    return webview;
}

// init内开始渲染，并可调用createWebview创建webview
fetchPreload().then(init)
```
> 通过execute

```JavaScript
通过executeJavaScript()方法，在webview页面中执行js代码，并且向electron渲染进程返回Promise
<webview>.executeJavaScript(code[, userGesture])
-code String
-userGesture Boolean (可选) - 默认为 false

Returns Promise<any> - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

这个方法更多的意思是：执行某段JavaScript代码，并且返回Promise，preload属性注入js代码，executeJavaScript()更多的是执行某一段代码，例如执行在webview代码执行前通过preload注入的js方法，并且可以对返回做一定的操作

this.$refs.webview.executeJavaScript(`__webViewFunction.getPhoneNumberList()`).then(result => {
  this.phoneNumberList = result || []
  // 查询缓存
  if (this.checkAllInCache(this.phoneNumberList)) {
    // 所有需要查询电话号码都在缓存
    console.log('allCache' + this.phoneNumberList)
  }
})
```

### 注入css

```JavaScript
mounted() {
  const webview = this.$refs.webview
  webview.addEventListener('dom-ready', (e) => {
    this.mInsertCSS()
  })
}
mInsertCSS() {
  webview.insertCSS(`
    .customer-panel {
      display: relative;
    }
  `)
},
```

```JavaScript
```

[Electron webview完全指南](http://www.ayqy.net/blog/electron-webview%E5%AE%8C%E5%85%A8%E6%8C%87%E5%8D%97/)

# File对象
为了让用户能够通过HTML5的file API直接操作本地文件，DOM的File接口提供了对本地文件的抽象。Electron在File接口中增加了一个path属性，它是文件在系统中的真实路径。

## 获取拖动到APP中文件的真实路径的例子：

```JavaScript
<div id="holder">
  Drag your file here
</div>

<script>
  var holder = document.getElementById('holder')
  holder.ondragover = function () {
    return false
  }
  holder.ondragleave = holder.ondragend = function () {
    return false
  }
  holder.ondrop = function (e) {
    e.preventDefault()
    var file = e.dataTransfer.files[0]
    console.log('File you dragged here is', file.path)
    return false
  }
</script>
```

# 截图

```JavaScript
remote
  .getCurrentWindow()
  .capturePage({ x: 0, y: 0, width: window.innerWidth, height: window.innerHeight })
  .then((res: NativeImage) => {
    const image = new Image()
    // base64
    image.src = res.toDataURL()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      // 不加这两句图片会被放大
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      canvas.style.width = `${canvas.width / window.devicePixelRatio}px`
      canvas.style.height = `${canvas.height / window.devicePixelRatio}px`
      // canvas正常可用
      canvas.getContext('2d')!.drawImage(image, 0, 0)
    };
  })
  .catch((err) => console.log(err));
```

####
```JavaScript
```

### Loading
```JavaScript
```