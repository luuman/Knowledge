# Electron 自定义边框
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82ad5d1529144df1bcd3fc8d35abbdab~tplv-k3u1fbpfcp-zoom-1.image)
electron默认的顶栏边框设计，如果想要去掉很简单`frame:false`

## frame
```JavaScript
mainWindow = new BrowserWindow({frame:false})
```

### 弊端
1. 导致菜单按钮隐藏
1. 应用无法拖拽

## 拖拽问题

```JavaScript
.titlebar {
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
```

### 菜单按钮

#### 系统titleBarStyle

> hidden

```JavaScript
mainWindow = new BrowserWindow({titleBarStyle: 'hidden'})
```
位置偏上 不使用是置灰
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/857b5d8c296640868bc521acec3c7761~tplv-k3u1fbpfcp-zoom-1.image)

> hiddenInset

```JavaScript
mainWindow = new BrowserWindow({titleBarStyle: 'hiddenInset'})
```
位置偏下 不使用是置灰
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1e69f2708de49989b0d5afe672f1176~tplv-k3u1fbpfcp-zoom-1.image)
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78e0c3998ccd454f8798a2a2331100cf~tplv-k3u1fbpfcp-zoom-1.image)

> customButtonsOnHover

```JavaScript
mainWindow = new BrowserWindow({titleBarStyle: 'customButtonsOnHover'})
```
鼠标移动上去之后，才会出现的
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e00bcceaa6604a01a3650393b671b786~tplv-k3u1fbpfcp-zoom-1.image)

##### 弊端
1. windows需要自定义

#### 自定义

> 渲染进程

```JavaScript
let ipcRenderer = require('electron').ipcRenderer;
var max = document.getElementById('max');
if (max) {
    max.addEventListener('click', () => {
        //发送最大化命令
        ipcRenderer.send('window-max');
        //最大化图形切换
        if (max.getAttribute('src') == 'images/max.png') {
            max.setAttribute('src', 'images/maxed.png');
        } else {
            max.setAttribute('src', 'images/max.png');
        }
    })
}

var min = document.getElementById('min');
if (min) {
    min.addEventListener('click', () => {
        //发送最小化命令
        ipcRenderer.send('window-min');
    })
}

var close = document.getElementById('close');
if (close) {
    close.addEventListener('click', () => {
        //发送关闭命令
        ipcRenderer.send('window-close');
    })
}
```
> 主进程


```JavaScript
let ipcMain = require('electron').ipcMain;
//接收最小化命令
ipcMain.on('window-min', function() {
    mainWindow.minimize();
})
//接收最大化命令
ipcMain.on('window-max', function() {
    if (mainWindow.isMaximized()) {
        mainWindow.restore();
    } else {
        mainWindow.maximize();
    }
})
//接收关闭命令
ipcMain.on('window-close', function() {
    mainWindow.close();
})
```

[Electron无边框窗口（最小化、最大化、关闭、拖动）以及动态改变窗口大小
](https://blog.csdn.net/fukaiit/article/details/91351448)