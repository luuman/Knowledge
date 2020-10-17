## Electron 概况

```Mermaid
graph TB
    api2 --> |IPC|api
    api1 --> |IPC|api
    subgraph main [主进程 main.js]
    api(Main NativeAPI)
    node(Node.js)
    end
    subgraph A [渲染进程 A.js]
    api1(Renderer NativeAPI)
    node1(Node.js)
    web1(Webkit)
    webs1(Web页面 A)
    end
    subgraph B [渲染进程 B.js]
    api2(Renderer NativeAPI)
    node2(Node.js)
    web2(Webkit)
    webs2(Web页面 B)
    end
```

> 主进程

`app` 应用的声明周期、属性 Dock 等
`Browserwindow` 管理窗口
`Ipcmain` IPC 通信
`Menu` GUI
`Tray` GUI
`Menuitem`
`dialog`
`Notification` 交互通知
`webContents` 加载具体的页面
`autoupdater` 更新模块
`globalshortcut` 全局快捷键

> 主进程

`Touchbar`
`netLog`
`powermonitor`
`Inapppurchase`
`net`
`powersaveblocker`
`contenttracing`
`Browserview`
`session`
`protocol`
`Screen`

> 主进程

`clipboard` 剪切板
`crashreporter` 监控进程是否有奔溃
`shell`
`nativelmage`

> 渲染进程

`ipcrenderer`
`remote` 调用主进程模块
`desktopCapture` 视频截图、屏幕的视频流
`webframe`

## 进程

Electron 提供了 IPC 通讯模块
主进程 ipcMain 与 渲染进程 ipcRenderer 都是 EventEmitter 对象

### 进程之间通讯

场景：通知事件、数据传输、共享信息

#### 渲染进程到主进程通信

> Callback 方法：

发起 ipcRenderer.send(channel, ...args) 主进程响应 ipcMain.on(channel, handler)

> Promise 方法（Electron7.0 之后，处理请求 + 响应模式）：

ipcRenderer.invoke(channel, ...args) 主进程响应 ipcMain.handle(channel, handler)

#### 主进程到渲染进程通信

> webContent

通过 webContent.send(channel) 渲染进程响应 ipcRenderer.on(channel, handler)
`webContent`窗体内容`BrowserWindow`的 API

#### 渲染进程与渲染进程之间通信

- 通知事件
  - webContent(Electron 5 之前)
  - ipcRenderer.sendTo（Electron 5 之后）
- 数据共享
  - Web 技术（loaclStrage、sessionStorage、indexedDB 等）
  - 使用 remote

> ipcRenderer.sendTo

```
A-->B

Main Id共享：
global.shareObject = {
  winWebIdB: win2.webContents.id
}

A remote模块：
let winWebIdB = remote.getGlobal('shareObject').winWebIdB
ipcRenderer.sendTo(winWebIdB, channel, value)

B：
ipcRenderer.on(channel, handler)
```

注意：

- 使用 remote，使用不好会造成卡顿。
- 少用 remote 模块
- 不要用 sync 模式
- 在请求 + 响应的通信模式下，需要自定义超时限制

## 软件更新

### 难题

> 权限问题：UAC&权限问题

- windows 计划任务
- windows Services
- 不操作管理权限文件、注册表

> 更新体验

- 增量更新
- 自动更新

| 更新方式 |       优点       |                                   缺点 |                   使用场景 |
| -------- | :--------------: | -------------------------------------: | -------------------------: |
| 手动更新 |    简单、稳定    |             繁琐、慢、影响使用、效率低 | 低频更新、降级方案、粘性高 |
| 文件覆盖 |    下载过程块    | 更新慢、实现复杂、稳定性差、写文件失败 |                     打补丁 |
| 自动更新 | 稳定、快、打扰少 |                               实现复杂 |         高频更新、体验要求 |
| 应用商城 |    统一、稳定    |                         受应用商店限制 |           操作系统应用软件 |

### 手动更新

```Mermaid
gantt
  title 手动更新
  section 更新服务
    匹配            :a1, 2016-06-22, 3d
    客户端版本       :a1, 2016-06-22, 0d
    用户信息         :a1, 2016-06-22, 0d
    ...             :a1, 2016-06-22, 0d
  section 检查更新器
    返回             :a1, 2016-06-25, 3d
    包地址            :a1, 2016-06-25, 0d
    版本号            :a1, 2016-06-25, 0d
    更新文案           :a1, 2016-06-25, 0d
  section 更新引导
    提示             :a1, 2016-06-28, 3d
    新功能            :a1, 2016-06-28, 0d
    是否升级           :a1, 2016-06-28, 0d
  section 手动更新
    手动操作           :a1, 2016-06-30, 3d
    跳转浏览器          :a1, 2016-06-30, 0d
    打开安装包覆盖        :a1, 2016-06-30, 0d
```

```Mermaid
gantt
  title 文件覆盖
  section 更新服务
    匹配            :a1, 2016-06-22, 3d
    客户端版本       :a1, 2016-06-22, 0d
    用户信息         :a1, 2016-06-22, 0d
    ...             :a1, 2016-06-22, 0d
  section 检查更新器
    返回             :a1, 2016-06-25, 3d
    包地址            :a1, 2016-06-25, 0d
    版本号            :a1, 2016-06-25, 0d
    更新文案           :a1, 2016-06-25, 0d
  section 更新引导
    提示             :a1, 2016-06-28, 3d
    新功能            :a1, 2016-06-28, 0d
    是否升级           :a1, 2016-06-28, 0d
  section 文件覆盖
    程序操作           :a1, 2016-06-30, 3d
    吊起子程序          :a1, 2016-06-30, 0d
    关闭应用        :a1, 2016-06-30, 0d
    将补丁复制到应用目录        :a1, 2016-06-30, 0d
    重新启动        :a1, 2016-06-30, 0d
```

```Mermaid
gantt
  title 自动更新（后台下载、重启即新）
  section 更新服务
    匹配            :a1, 2016-06-22, 3d
    客户端版本       :a1, 2016-06-22, 0d
    用户信息         :a1, 2016-06-22, 0d
    ...             :a1, 2016-06-22, 0d
  section 检查更新器
      返回             :a1, 2016-06-25, 3d
  section 下载新包
      提示             :a1, 2016-06-28, 3d
  section 重启应用加载新包
      重新启动        :a1, 2016-06-30, 3d
```

```Mermaid
graph TB
    boot --> |启动|v1
    boot --> |重启|v2
    subgraph app
    boot
    end
    subgraph version
    v1 --> |后台下载|v2
    end
```

### 更新

> Web 化

- 将渲染进程（业务）放置在远程 HTTPS
- 优点：更新快、体验极好
- 无法离线使用、主进程更新复杂、多版本兼容问题（壳子与业务之间的版本）
- 场景：重业务、壳子更新少（后台管理系统）

> 文件覆盖

[如何实现 electron 的在线升级热更新功能](https://www.zhangxinxu.com/wordpress/2017/06/how-electron-online-update-hot-fix/)

> 自动更新（官方）

- 基于 Squirrel 框架完成自动更新

> Electron-builder

[与官网对比](https://www.electron.build/auto-update.htmlhttps://www.electron.build/auto-update.html)

优点：接入简单、windows 支持签名验证、支持进度条、

缺点： windows 更新体验没有内置的好、存在权限问题

### 增量更新

增量更新：只更新需要更新的地方，增量包（差分包、补丁包）：新旧包的差异包。

增量技术：

- bsdiff/bspatch：使用二进制文件、开源、免费、广泛使用（尤其移动端）
- Xdelta3：适用二进制
- Courgette：谷歌提出，bspatch 优化版本
- RTpatch：商业付费

[对比参考](https://www.shangyexin.com/2018/09/28/delta_algorithm/)

### 灰度发布

根据一定规则发布：用户特征、客户端特征、

## API

### 无边框窗口的拖动

[Electron 无边框窗口的拖动](https://www.jianshu.com/p/96327b044e85)

### 去掉标题栏

```
new BrowserWindow({
	frame: false // 隐藏去掉边框(标题栏)并设定可拖动
})
```

#### 拖拽问题

> CssDrag

```
style="-webkit-app-region: drag"
```

注意：

1. 不仅右键菜单，设置了这个样式的元素几乎无法响应所有的鼠标事件，包括点击、拖拽等。如果需要拖拽整个窗口，就相当尴尬了。

## app

### setAboutPanelOptions 关于我们

```
if (isOsx) {
  // App about
  app.setAboutPanelOptions({
  	// 应用程序的名字
    applicationName: 'ieaseMusic',
  	// 应用程序版本
    applicationVersion: pkg.version,
  	// 版权信息
    copyright: 'Made with 💖 by trazyn. \n https://github.com/trazyn/ieaseMusic',
  	// 信用信息.
    credits: `With the invaluable help of: \n github.com/Binaryify/NeteaseCloudMusicApi`,
  	// 应用程序版本号
    version: pkg.version + 'djfldjf'
  });
  // 设置应用程序的Dock 菜单
  app.dock.setMenu(Menu.buildFromTemplate(dockMenu));
}
```

## app, BrowserWindow, Menu, Tray, globalShortcut, ipcMain, shell, powerMonitor

### 菜单

创建原生应用菜单和上下文菜单。
[学透 Electron 自定义菜单](https://segmentfault.com/a/1190000020521879)

mainMenu
trayMenu
dockMenu

### Menu

#### Mac 状态栏

> Menu

```
const { Menu } = require('electron')

const isMac = process.platform === 'darwin'
// 实例化模板
Menu.buildFromTemplate([
	// 一级菜单
  {
  	// 标题名称
    label: 'File',
    // 二级菜单
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' },
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  },
])

// 载入
Menu.setApplicationMenu(mainMenu)
```

> shell.openExternal

> type

| type      |  名称  |
| --------- | :----: |
| checkbox  |  多选  |
| radio     |  单选  |
| separator | 下拉框 |
| 应用商城  |        |

### Tray

上下文菜单
上下文菜单(context menu)就是我们通常说的右键菜单，文章开头有展示效果。需要注意的是：上下文菜单，需要在渲染进程中进行实现。在渲染进程中是需要通过 remote 模块调用主进程中的模块。

实现上下文菜单很简单，只需要监听到 contextmenu 事件，然后将菜单展示出来即可。

//renderer.js
const { remote } = require('electron');
const { Menu } = remote;

const createContextMenu = () => {
const contextTemplate = [
{
label: 'Cut',
role: 'cut'
},
{
label: 'Copy',
role: 'copy'
}
];
const contextMenu = Menu.buildFromTemplate(contextTemplate);
return contextMenu;
}

window.addEventListener('contextmenu', (event) => {
event.preventDefault();
const contextMenu = createContextMenu();
contextMenu.popup({
window: remote.getCurrentWindow()
});
}, false);

### Dock 菜单

```
// main.js
const createDockMenu = () => {
  const dockTempalte = [
    {
      label: 'New Window',
      click () {
        console.log('New Window');
      }
    }, {
      label: 'New Window with Settings',
      submenu: [
        { label: 'Basic' },
        { label: 'Pro' }
      ]
    },
    {
      label: 'New Command...'
    }
  ];
  app.dock.setMenu(Menu.buildFromTemplate(dockTempalte));
}

app.on('ready', function() {
    createDockMenu();
});
```

## 快捷键

### globalShortcut

```
const { app, globalShortcut } = require('electron')

function registerGlobalShortcut () {}

app.on('ready', () => {
  // 注册“CommandOrControl+Y” 快捷键监听器
  globalShortcut.register('CommandOrControl+Y', () => {
    // 按下Y 和 任意键时，执行操作
  })
})
```

Super 键是指 Windows 和 Linux 系统上的 Windows 键，但在 macOS 里为 Cmd 键.

> 可用的功能键

Command (缩写为 Cmd)
Control (缩写为 Ctrl)
CommandOrControl (缩写为 CmdOrCtrl)
Alt
Option
AltGr
Shift
Super

> 可用的普通按键

0 to 9
A to Z
F1 to F24
类似~, !, @, #, \$的标点符号
Plus
Space
Tab
Backspace
Delete
Insert
Return (等同于 Enter)
Up, Down, Left and Right
Home 和 End
PageUp 和 PageDown
Escape (缩写为 Esc)
VolumeUp, VolumeDown 和 VolumeMute
MediaNextTrack、MediaPreviousTrack、MediaStop 和 MediaPlayPause
PrintScreen

## 查阅资料

### 案例

[ieaseMusic](https://github.com/trazyn/ieaseMusic)
[网易云音乐 API](https://github.com/Binaryify/NeteaseCloudMusicApi)

### 调试

[调试 Electron 程序](https://www.jianshu.com/p/98237341a08e)


## i18next

npm install --save @panter/vue-i18next
npm install --save i18next