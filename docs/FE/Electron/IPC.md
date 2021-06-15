# Electron 进程通信

# 进程分类
## 主进程(Main Process)
1. 一个应用只有一个主进程。
1. package文件中main的字段，指向了主进程入口。
1. 主进程实例化窗口，来创建界面。

## 渲染进程(Renderer Process)
1. 没有窗口都有他的渲染进程，当窗口销毁相应的渲染进程也会终止。
1. 每个渲染进程都是相互独立的，它们只关心自己所运行的 web 页面。

# 进程通信

## 渲染进程 -> 主进程 -> 渲染进程

```js
// In main process.
const {ipcMain} = require('electron')
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

// In renderer process (web page).
const {ipcRenderer} = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```
> 详解

1. 渲染进程可以通过 ipcRenderer 模块的 send 方法向主进程发送消息。在主进程中，通过 ipcMain 模块设置监听 asynchronous-message 和 synchronous-message 两个事件，当渲染进程发送时就可以针对不同的事件进行处理。
1. 主进程监听事件的回调函数中，会传递 event 对象及 arg 对象。arg 对象中保存渲染进程传递过来的参数。通过 event.sender 对象，主进程可以向渲染进程发送消息。如果主进程执行的是同步方法，还可以通过设置 event.returnValue 来返回信息。
1. 如何`asynchronous-message`内为，循环是发送，要确保窗口未被销毁。

## 主进程 -> 渲染进程

在主进程中，我们会创建一个 BrowserWindow 对象，这个对象有 webContents 属性。webContets 提供了 send 方法来实现向渲染进程发送消息。当然 webContents 对象远不止这两个通信方法，具体可以看 webContents

下面是官方文档提供的使用 webContents 实现通信的例子：
```js
// In the main process.
const {app, BrowserWindow} = require('electron')
let win = null
app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  })
})

// index.html In renderer process (web page).
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message) // Prints 'whoooooooh!'
      event.sender('ping-back', 'whoooooooh')
    })
  </script>
</body>
</html>
```
> 注意

1. webContents.on 监听的是已经定义好的事件，如上面的 did-finish-load。要监听自定义的事件还是通过 ipcMain 和 ipcRenderer。
1. 确保webContents中的监听事件完成

## 渲染进程 -> 渲染进程

> main.js

```js
win = new BrowserWindow({width: 800, height: 600})
win.loadFile('./index.html')

win2 = new BrowserWindow({width: 800, height: 600})
win2.loadFile('./index2.html')
global.sharedObject =  {
  win2WebContentsId: win2.webContents.id
}
```

> render.js

```js
const {ipcRenderer, remote} = require('electron')
let sharedObject = remote.getGlobal('sharedObject') 
let win2WebContentsId = sharedObject.win2WebContentsId
ipcRenderer.sendTo(win2WebContentsId, 'do-some-work', 1)
```

> render.js

```js
const {ipcRenderer} = require('electron')
ipcRenderer.on('do-some-work', (e, a) => {
  alert('renderer2 handle some work' + a)
})
```

> 注意

1. 还可以通过发送给主进程，让主进程进行转发。
1. 通过主进程，对渲染进程`webContents.id`进程缓存，使用`sendTo`发送

## remote模块（谨慎，容易影响性能）
在渲染进程中，可以通过`remote`访问/使用主进程的模块

```js
const {BrowserWindow} = require('electron').remote
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

```js
// main.js 文件：
// In main process
const { app } = require('electron');
const utils = require('./utils');
app.utils = utils; // 将在 Electron 层实现的接口绑定到 app 上

// index.js 文件(被网页引用的脚本文件)：
const { remote } = require('electron');
// In renderer process
function() {
  // remote.app.utils 对象与上述文件中的 utils 对象是一样的。
  remote.app.utils.test();
}
```

## 两种进程通信方法是如何实现的？
1. ipcMain 和 ipcRenderer 都是 EventEmitter 类的一个实例。而 EventEmitter 类由 NodeJS 中的 events 模块导出。

events.EventEmitter
EventEmitter 类是 NodeJS 事件的基础，实现了事件模型需要的接口， 包括 addListener，removeListener, emit 及其它工具方法. 同原生 JavaScript 事件类似， 采用了发布/订阅(观察者)的方式， 使用内部 _events 列表来记录注册的事件处理器。
我们通过 ipcMain和ipcRenderer 的 on、send 进行监听和发送消息都是 EventEmitter 定义的相关接口。

> ipc-renderer.js

```js
const binding = process.atomBinding('ipc')

...

// Created by init.js.
const ipcRenderer = v8Util.getHiddenValue(global, 'ipc')

ipcRenderer.send = function (...args) {
  return binding.send('ipc-message', args)
}

....

module.exports = ipcRenderer
调用了 atomBinding('ipc') 得到的 binding 对象的 send 方法。能力有限，就分析到这。后面 binding.send 应该就是 IPC 相关的实现了：对传送的数据进行序列化和反序列化。

// 主进程
ipcMain.on('test1', (e) => {
    const obj = {};
    obj.toJSON = () => 'call toJSON';
    e.returnValue = obj;
})
ipcMain.on('test2', (e) => {
    const obj = { name: '123' };
    e.returnValue = obj;
})
// 渲染进程
let returnValue = ipcRenderer.sendSync('test1');
console.log(typeof returnValue, returnValue); // 'string call toJSON'
returnValue = ipcRenderer.sendSync('test2');
console.log(typeof returnValue, returnValue); // 'object Object name: "123"__proto__: Object'
从渲染进程输出的消息可以看到，主进程将返回值调用 toJSON 后传递给渲染进程。渲染进程再对传输过来的内容进行反序列化。
```

### remote 远程对象
通过 remote 对象，我们可以不必发送进程间消息来进行通信。但实际上，我们在调用远程对象的方法、函数或者通过远程构造函数创建一个新的对象，实际上都是在发送一个同步的进程间消息（官方文档 上说这类似于 JAVA 中的 RMI）。

也就是说，remote 方法只是不用让我们显式的写发送进程间的消息的方法而已。在上面通过 remote 模块创建 BrowserWindow 的例子里。我们在渲染进程中创建的 BrowserWindow 对象其实并不在我们的渲染进程中，它只是让主进程创建了一个 BrowserWindow 对象，并返回了这个相对应的远程对象给了渲染进程。

## 参考资料

[Electron Document]()
[Electron Application Architecture]()
[Electron初步【01】--主进程VS渲染进程&不同页面间共享数据]()
[Electron remote]()

# 封装IPC 库

为了优化 IPC 通信，我们自己基于Electron 的IPC接口, 封装了自己的一套 RPC 库。主要特征有:

异步的。没有同步的选项。避免干蠢事
消息合并。合并事件推送，批量传递
序列化。直接传递 JSON 字符串，不让 Electron 干涉序列化。Electron 内部序列化稍微有点复杂，比如会处理 Buffer 等特殊类型。
一致化的、简单易用的 API。使用一样在接口支持主进程与渲染进程，以及渲染进程与渲染进程之间双向通信。

```js
import MPC from 'MaxRPC'
// 注册方法
MPC.registerHandler('echo', async data => {
  return data
})
// 事件监听
MPC.on('some-event', (data, source) => {
  // dosomething
})

// 客户端:
import MPC from 'MaxRPC'
MPC.emit(target, 'some-event') // target 为接收的窗口或者主进程。
// 方法调用
const res = await MPC.callHandler(target, 'echo', 'hello-world')
```
