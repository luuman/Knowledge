# 在线/离线事件探测
使用标准 HTML5 APIs 可以实现在线和离线事件的探测，是通过标准 HTML5 API 中 navigator.onLine 属性来实现的。

> navigator.onLine 属性返回值

false: 如果所有网络请求都失败(例如，断开网络)
true: 在其他情况下都返回 true

> main.js

```js
var app = require('app')
var BrowserWindow = require('browser-window')
var onlineStatusWindow
app.on('ready', function() {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL('file://' + __dirname + '/online-status.html')
})
```
> online-status.html

```js
<!DOCTYPE html>
<html>
  <body>
    <script>
      var alertOnlineStatus = function() {
        window.alert(navigator.onLine ? 'online' : 'offline')
      }
      window.addEventListener('online',  alertOnlineStatus)
      window.addEventListener('offline',  alertOnlineStatus)
      alertOnlineStatus()
    </script>
  </body>
</html>
```

> main.js

也会有人想要在主进程也有回应这些事件的实例。然后主进程没有 navigator 对象因此不能直接探测在线还是离线。使用 Electron 的进程间通讯工具，事件就可以在主进程被使，就像下面的例子：
```js
var app = require('app')
var ipc = require('ipc')
var BrowserWindow = require('browser-window')
var onlineStatusWindow
app.on('ready', function() {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL('file://' + __dirname + '/online-status.html')
})
ipc.on('online-status-changed', function(event, status) {
  console.log(status)
})
```
> online-status.html

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      var ipc = require('ipc')
      var updateOnlineStatus = function() {
        ipc.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
      }
      window.addEventListener('online',  updateOnlineStatus)
      window.addEventListener('offline',  updateOnlineStatus)
      updateOnlineStatus()
    </script>
  </body>
</html>
```
