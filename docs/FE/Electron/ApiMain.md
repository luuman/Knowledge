
# 主进程
# globalShortcut 全局快捷键

```js
const { app, globalShortcut } = require('electron')
app.whenReady().then(() => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
  if (!ret) {
    console.log('registration failed')
  }
  // 检查快捷键是否注册成功
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // 注销快捷键
  globalShortcut.unregister('CommandOrControl+X')
  // 注销所有快捷键
  globalShortcut.unregisterAll()
})
```

## 方法
如果指定的快捷键已经被其他应用程序注册掉, 调用会默默失败。 该特性由操作系统定义，因为操作系统不希望多个程序的全局快捷键互相冲突。
### register 快捷键注册

```js
const ret = globalShortcut.register('CommandOrControl+X', () => {
  console.log('CommandOrControl+X is pressed')
})
if (!ret) {
  console.log('registration failed')
}
```

> 在 macOS 10.14 Mojave 下面，如果 app 没有被授权为可信任使用的客户端，那么下列快捷键会注册失败：

### registerAll 重复快捷键注册
```js
const ret = globalShortcut.registerAll(['CommandOrControl+X', 'CommandOrControl+X', 'CommandOrControl+X'], () => {
  console.log('CommandOrControl+X is pressed')
})
if (!ret) {
  console.log('registration failed')
}
```

### isRegistered 快捷键是否注册
```js
globalShortcut.isRegistered('CommandOrControl+X')
```
### unregister 注销快捷键
```js
globalShortcut.unregister('CommandOrControl+X')
```
### unregisterAll 清空全局快捷键
```js
globalShortcut.unregisterAll()
```

# process 进程
处理对象的扩展，Electron's process 对象继承 Node.js process object。 它新增了以下事件、属性和方法

[electron程序，如何通过process.argv从命令行读取参数？](https://newsn.net/say/electron-process-argv.html)
## Sandbox

在沙盒化的渲染进程中， process 对象只包含了API的一个子集:

### crash()
### hang()
### getCreationTime()
### getHeapStatistics()
### getBlinkMemoryInfo()
### getProcessMemoryInfo()
### getSystemMemoryInfo()
### getSystemVersion()
### getCPUUsage()
### getIOCounters()
### argv
### execPath
### env
### pid
### arch
### platform
### 沙盒化
### type
### version
### versions
### mas
### windowsStore
## 事件
事件: 'loaded'
当Electron加载了它的内部初始化脚本并且是正要开始加载网页或主脚本时触发。

当node集成被关闭时，预加载脚本可以使用它将删除的 Node global symbols 添加回全局范围：

// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
### once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
Copy
## 属性
### defaultApp 【只读】
A Boolean. When app is started by being passed as parameter to the default app, this property is true in the main process, otherwise it is undefined.

### isMainFrame 【只读】
A Boolean, true when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use webFrame.routingId.

### mas 【只读】
A Boolean. For Mac App Store build, this property is true, for other builds it is undefined.

### noAsar
A Boolean that controls ASAR support inside your application. Setting this to true will disable the support for asar archives in Node's built-in modules.

### noDeprecation
Boolean 类型，用于控制弃用警告是否被打印到stderr。 将其设置为true将会禁用弃用警告。 使用此属性代替 -no-deprecation 命令行标志。

### resourcesPath 【只读】
String 类型， 表示资源目录的路径。

### sandboxed 【只读】
A Boolean. When the renderer process is sandboxed, this property is true, otherwise it is undefined.

### throwDeprecation
Boolean类型，用于控制是否将弃用警告当做例外。 设置它为 true 时会抛出错误。 使用此属性代替 --throw-deprecation 命令行标志。

### traceDeprecation
Boolean类型，用于控制打印到 stderr 的弃用中是否包含其堆栈跟踪。 将此设置为 true 将会打印对弃用的堆栈跟踪。 此属性代替 --trace-deprecation 命令行标志。

### traceProcessWarnings
一个 Boolean, 用于控制是否将进程的警告打印到包含堆栈跟踪的 stderr中 。 将此设置为 true 将打印对进程警告的堆栈跟踪（包括弃用）。 此属性代替 --trace-warnings 命令行标志。

### type 【只读】进程类别

```js
// String
browser - The main process
renderer - A renderer process
worker - In a web worker
```

### versions.chrome 【只读】 Chrome 版本
### versions.electron 【只读】 Electron 版本
### windowsStore 【只读】是否为应用商店程序

## 方法
### crash() 进程崩溃
导致当前进程崩溃的主线程。

### getCreationTime()
返回 Number | null -从纪元开始的毫秒数，如果信息不可用则返回null

Indicates the creation time of the application. The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

### getCPUUsage()
返回 CPUUsage

### getIOCounters() WindowsLinux
返回 IOCounters

### getHeapStatistics()
返回 Object:

totalHeapSize Integer
totalHeapSizeExecutable Integer
totalPhysicalSize Integer
totalAvailableSize Integer
usedHeapSize Integer
heapSizeLimit Integer
mallocedMemory Integer
peakMallocedMemory Integer
doesZapGarbage Boolean
Returns an object with V8 heap statistics. 备注：所有数据值以KB为单位

### getBlinkMemoryInfo()
返回 Object:

allocated Integer - Size of all allocated objects in Kilobytes.
marked Integer - Size of all marked objects in Kilobytes.
total Integer - Total allocated space in Kilobytes.
Returns an object with Blink memory information. It can be useful for debugging rendering / DOM related memory issues. Note that all values are reported in Kilobytes.

### getProcessMemoryInfo()
Returns Promise<ProcessMemoryInfo> - Resolves with a ProcessMemoryInfo

Returns an object giving memory usage statistics about the current ###  Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide residentSet value for macOS. This is because macOS performs in-memory compression of pages that haven't been recently used. As a result the resident set size value is not what one would expect. private memory is more representative of the actual pre-compression memory usage of the process on macOS.

### getSystemMemoryInfo()
返回 Object:

total Integer - 系统可用的物理内存总量(Kb)。
free Integer - 应用程序或磁盘缓存未使用的内存总量。
swapTotal Integer Windows Linux - 系统交换内存容量（单位：千字节）。
swapFree Integer Windows Linux - 系统可用交换内存大小（单位：千字节）。
Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### getSystemVersion()
Returns String - The version of the host operating system.

示例:

const version = ### getSystemVersion()
console.log(version)
// On macOS -> '10.13.6'
// On Windows -> '10.0.17763'
// On Linux -> '4.15.0-45-generic'
Copy
Note: It returns the actual operating system version instead of kernel version on macOS unlike os.release().

### takeHeapSnapshot(filePath)
filePath String - Path to the output file.
Returns Boolean - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to filePath.

### hang() 进程挂起
导致当前进程挂起的主线程。

### setFdLimit(maxDescriptors) macOSLinux
maxDescriptors Integer
将文件描述符的软限制设置为 maxDescriptors 或 OS 硬限制, 其中以当前进程较低的值为准。

Sandbox
事件
事件: 'loaded'

# app
控制应用程序的事件生命周期

```js
// 最后一个窗口被关闭时退出应用
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## 事件
![](https://img-blog.csdnimg.cn/img_convert/8b6e5736ef77fabb44c0f19d3fbe336e.png)
### will-finish-launching 完成基础启动
```js
app.on('will-finish-launching', () => {
})
```
当应用程序完成基础的启动的时候被触发。 在 Windows 和 Linux 中, will-finish-launching 事件与 ready 事件是相同的; 在 macOS 中，这个事件相当于 NSApplication 中的 applicationWillFinishLaunching 提示。 

> 通常会在这里为 open-file 和 open-url 设置监听器，并启动崩溃报告和自动更新。

> 绝大部分情况下，你必须在ready事件句柄中处理所有事务。

### ready 完成初始化
```js
app.on('ready', (event, launchInfo) => {
  console.log(event, launchInfo)
})
```

### window-all-closed 当所有的窗口都被关闭时
```js
app.on('window-all-closed', () => {
  console.log(event)
})
```
如果你没有监听此事件并且所有窗口都关闭了，默认的行为是控制退出程序；但如果你监听了此事件，你可以控制是否退出程序。 如果用户按下了 Cmd + Q，或者开发者调用了 app.quit()，Electron 会首先关闭所有的窗口然后触发 will-quit 事件，在这种情况下 window-all-closed 事件不会被触发。

### before-quit 程序关闭窗口前
```js
app.on('before-quit', () => {
  console.log(event)
})
```

注:在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

event Event
在程序关闭窗口前发信号。 Calling event.preventDefault() will prevent the default behavior, which is terminating the application.

注意： 如果由 autoUpdater.quitAndInstal() 退出应用程序 ，那么在所有窗口触发 close 之后 才会触发 before-quit 并关闭所有窗口。


### will-quit
```js
app.on('will-quit', () => {
  console.log(event)
})
```
注:在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

event Event
Emitted when all windows have been closed and the application will quit. Calling event.preventDefault() will prevent the default behavior, which is terminating the application.

关于 window-all-closed 和 will-quit 事件之间的差异, 请参见 window-all-closed 事件的说明。

### quit 应用退出时
```js
app.on('quit', (event, exitCode) => {
  console.log(event)
})
```
注:在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

### open-file 【macOS】打开文件
```js
app.on('open-file', () => {
  console.log(event, path)
})
```

当用户想要在应用中打开一个文件时发出。 open-file 事件通常在应用已经打开，并且系统要再次使用该应用打开文件时发出。 open-file也会在一个文件被拖到 dock 并且还没有运行的时候发出。 请确认在应用启动的时候(甚至在 ready 事件发出前) 就对 open-file 事件进行监听。

如果你想处理这个事件，你应该调用 event.preventDefault() 。

在 Windows 系统中，你需要解析 process.argv (在主进程中) 来获取文件路径

### open-url 【macOS】打开URL
当用户想要在应用中打开一个 URL 时发出，如果你想处理这个事件，你应该调用 event.preventDefault()
```js
app.on('open-url', () => {
  console.log(event, url)
})
```

### activate 【macOS】应用被激活时发出
各种操作都可以触发此事件, 例如首次启动应用程序、尝试在应用程序已运行时或单击应用程序的坞站或任务栏图标时重新激活它
```js
app.on('activate', (event, hasVisibleWindows) => {
  console.log(event, hasVisibleWindows, 'hasVisibleWindows->Boolean')
})
```

### did-groupe-active 【macOS】当应用被激活时发出
当应用被激活时发出。 与 activate 事件的不同是应用，程序激活时都会触发 did-become-active ，而不仅仅在 Dock 图标被点击或应用程序被重新启动的时候。
```js
app.on('did-groupe-active', (event) => {
  console.log(event)
})
```

### continue-activity 【macOS】
当来自不同设备的活动通过`Handoff`想要恢复时触发。如果你想处理这个事件，你应该调用`event.preventDefault()`。
只有具有支持相应的活动类型并且相同的开发团队`ID`作为启动程序时，用户行为才会进行。所支持活动类型已在应用的`Info.plist`中的`NSUserActivityTypes`里明确定义。

```js
app.on('continue-activity', (event, type, userInfo) => {
  console.log(event, type, userInfo)
})
```
typeString-标识活动的字符串。 映射到 NSUserActivity. activityType。
userInfo unknown - Contains app-specific state stored by the activity on another device.

### will-continue-activity 【macOS】
当来自不同设备的活动通过`Handoff`恢复之前触发。 如果你想处理这个事件，你应该调用 event.preventDefault() 。
```js
app.on('will-continue-activity', (event, typeString) => {
  console.log(event, typeString)
})
```
typeString-标识活动的字符串。 映射到 NSUserActivity. activityType。

### continue-activity-error 【macOS】
当来自不同设备的活动通过`Handoff`恢复失败时触发。
```js
app.on('continue-activity-error', (event, typeString, error) => {
  console.log(event, typeString, error)
})
```
typeString-标识活动的字符串。 映射到 NSUserActivity. activityType。
error String - 详细的错误信息

### activity-was-continued 【macOS】
当来自不同设备的活动通过`Handoff`成功恢复后触发。

```js
app.on('before', (event, typeString, userInfo) => {
  console.log(event, typeString, userInfo)
})
```

typeString-标识活动的字符串。 映射到 NSUserActivity. activityType。
userInfo unknown - Contains app-specific state stored by the activity.

### update-activity-state 【macOS】
当`Handoff`即将通过另一个设备恢复时触发。
```js
app.on('update-activity-state', (event, typeString, userInfo) => {
  console.log(event, typeString, userInfo)
})
```
typeString-标识活动的字符串。 映射到 NSUserActivity. activityType。
userInfo unknown - Contains app-specific state stored by the activity.
If you need to update the state to be transferred, you should call event.preventDefault() immediately, construct a new userInfo dictionary and call app.updateCurrentActivity() in a timely manner. 否则，操作会失败，并且触发 continue-activity-error

### new-window-for-tab 【macOS】
```js
app.on('new-window-for-tab ', (event) => {
  console.log(event)
})
```
Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current BrowserWindow has a tabbingIdentifier

### browser-window-blur 失去焦点时
在 browserWindow 失去焦点时发出
```js
app.on('browser-window-blur', (event, window) => {
  console.log(event, window)
})
```
window BrowserWindow
在 browserWindow 失去焦点时发出。

### browser-window-focus 获得焦点时
在 browserWindow 获得焦点时发出。
```js
app.on('browser-window-focus', (event, window) => {
  console.log(event, window)
})
```
window BrowserWindow

### browser-window-created 创建新窗口时
在创建新的 browserWindow 时发出。

```js
app.on('browser-window-created', (event, window) => {
  console.log(event, window)
})
```
window BrowserWindow

### web-contents-created 创建新webContents
在创建新的 webContents 时发出
```js
app.on('web-contents-created', (event, webContents) => {
  console.log(event, webContents)
})
```

### certificate-error 证书验证失败时
当对 url 的 certificate 证书验证失败的时候发出。如果需要信任这个证书，你需要阻止默认行为 event.preventDefault() 并且调用 callback(true)。
```js
app.on('certificate-error', (event, webContents, url, error, certificate, callback, isTrustedBoolean) => {
  console.log(event, webContents, url, error, certificate, callback, isTrustedBoolean)
})
```
webContents WebContents
url String
error String - 错误码
certificate 证书
callback Function
isTrustedBoolean-是否将证书视为可信的

```js
const { app } = require('electron')
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Verification logic
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### select-client-certificate 客户证书被请求时
url 指的是请求客户端认证的网页地址，调用 callback 时需要传入一个证书列表中的证书。 需要通过调用 event.preventDefault() 来防止应用自动使用第一个证书进行验证
```js
app.on('select-client-certificate', (event, webContents, url, certificateList, callback, certificate) => {
  console.log(event, webContents, url, certificateList, callback, certificate)
})
```
webContents WebContents
url URL
certificateList 证书[]
callback Function
certificate 证书 (可选)

```js
const { app } = require('electron')
app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### login


event Event
webContents WebContents
authenticationResponseDetails Object
url URL
authInfo Object
isProxy Boolean
scheme String
host String
port Integer
realm String
callback Function
username String (optional)
password String (optional)
当 webContents 要进行基本身份验证时触发。

默认行为是取消所有身份验证。 默认行为是取消所有的验证行为，如果需要重写这个行为，你需要用 event.preventDefault() 来阻止默认行为，并且使用 callback(username, password) 来验证。

const { app } = require('electron')

app.on('login', (event, webContents, details, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
复制
If callback is called without a username or password, the authentication request will be cancelled and the authentication error will be returned to the page.

Event: 'gpu-info-update
Emitted whenever there is a GPU info update.

### gpu-process-crashed 已废弃
当gpu进程崩溃或关闭（杀死）时触发

killed Boolean

已废弃：这个事件被包含更多子进程退出信息原因的child-process-gone事件取代了。 It isn't always because it crashed. The killed boolean can be replaced by checking reason === 'killed' when you switch to that event.

### renderer-process-crashed 已废弃
当渲染器进程webContents崩溃或关闭（杀死）时触发。

event Event
webContents WebContents
killed Boolean

已废弃： 此事件被包含更多关于渲染过程为何消失的信息的 render-process-gone 事件替代了 It isn't always because it crashed. The killed boolean can be replaced by checking reason === 'killed' when you switch to that event.

Event: 'render-process-gone


event Event
webContents WebContents
details Object
reason String - The reason the render process is gone. 可选值：
clean-exit - Process exited with an exit code of zero
abnormal-exit - Process exited with a non-zero exit code
killed - Process was sent a SIGTERM or otherwise killed externally
crashed - Process crashed
oom - Process ran out of memory
launch-failed - Process never successfully launched
integrity-failure - Windows code integrity checks failed
exitCode Integer - The exit code of the process, unless reason is launch-failed, in which case exitCode will be a platform-specific launch failure error code.
Emitted when the renderer process unexpectedly disappears. This is normally because it was crashed or killed.

Event: 'child-process-gone


event Event
details Object
type String - Process type. One of the following values:
Utility
Zygote
Sandbox helper
GPU
Pepper Plugin
Pepper Plugin Broker
Unknown
reason String - The reason the child process is gone. 可选值：
clean-exit - Process exited with an exit code of zero
abnormal-exit - Process exited with a non-zero exit code
killed - Process was sent a SIGTERM or otherwise killed externally
crashed - Process crashed
oom - Process ran out of memory
launch-failed - Process never successfully launched
integrity-failure - Windows code integrity checks failed
exitCode Number - The exit code for the process (e.g. status from waitpid if on posix, from GetExitCodeProcess on Windows).
serviceName String (optional) - The non-localized name of the process.
name String (optional) - The name of the process. Examples for utility: Audio Service, Content Decryption Module Service, Network Service, Video Capture, etc.
Emitted when the child process unexpectedly disappears. This is normally because it was crashed or killed. It does not include renderer processes.

事件: "accessibility-support-changed" macOS Windows 


event Event
accessibilitySupportEnabled当启用了 Chrome 的辅助功能时为 true, 其他情况为 false。
当 Chrome 的辅助功能状态改变时触发。 当启用或禁用辅助技术时将触发此事件，例如屏幕阅读器 。 查看更多详情 chromium.org/developers/design-documents/accessibility

事件:'session-created


session Session
当 Electron创建了一个新的 session后被触发.

const { app } = require('electron')

app.on('session-created', (session) => {
  console.log(session)
})
复制
### second-instance 启动已运行程序时
当第二个实例被执行并且调用`app.requestSingleInstanceLock()`时，这个事件将在你的应用程序的首个实例中触发

```js
app.on('second-instance', (event, argv, workingDirectory) => {
  console.log(event, argv, workingDirectory)
})
```
argv String[] - 第二个实例的命令行参数数组
workingDirectory String - 第二个实例的工作目录

argv 是第二个实例的命令行参数的数组, workingDirectory 是这个实例当前工作目录。 通常, 应用程序会激活窗口并且取消最小化来响应。

Note: If the second instance is started by a different user than the first, the argv array will not include the arguments.

保证在`app`的`ready`事件发出后发出此事件。

> 注意：

1. 额外命令行参数可能由`Chromium`添加，例如`--original-process-start-time`

> 协议启动
[协议启动](/FE/Electron/ApiMain?id=协议唤起)
### desktop-capturer-get-sources 桌面捕获器源启动时
```js
app.on('desktop-capturer-get-sources', (event, webContents) => {
  console.log(event, webContents)
})
```

## 方法
注意: 某些方法仅在特定的操作系统上可用, 这些方法会被标记出来。
### quit 关闭所有窗口
尝试关闭所有窗口 将首先发出`before-quit`事件。如果所有窗口都已成功关闭, 则将发出`will-quit`事件, 并且默认情况下应用程序将终止。此方法会确保执行所有`beforeunload`和`unload`事件处理程序。可以在退出窗口之前的beforeunload事件处理程序中返回false取消退出。
> app.quit()

### exit 所有窗口立关闭
所有窗口都将立即被关闭，而不询问用户，而且`before-quit`和`will-quit`事件也不会被触发。
> app.exit([exitCode]) exitCode默认为0

### relaunch
> app.relaunch([options])

options Object (可选)
args String[] (可选)
execPath String (可选)
从当前实例退出，重启应用。

默认情况下，新的实例将会使用和当前实例相同的工作目录以及命令行参数。 当设置了 args 参数时， args 将作为命令行参数传递。 当设置了 execPath ，execPath 将被执行以重新启动，而不是当前的应用程序。

请注意, 此方法在执行时不会退出当前的应用程序, 你需要在调用 app.relaunch 方法后再执行 app. quit 或者 app.exit 来让应用重启。

当 app.relaunch 被多次调用时,多个实例将在当前实例退出后启动。

立即重启当前实例并向新的实例添加新的命令行参数的示例：

const { app } = require('electron')
### relaunch 是否已经初始化
> app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })

app.exit(0)> 
复制
app.> isReady()
> 返回值 Boolean 类型 - 如果 Electron 已经完成初始化，则返回 true, 其他情况为 false See also app.whenReady().

### whenReady 初始化完成
> app.whenReady()

> 返回值 Promise<void> - 当Electron 初始化完成。 可用作检查 app.isReady() 的方便选择，假如应用程序尚未就绪，则订阅ready事件。
### focus
> app.focus([options])

options Object (可选)
steal Boolean macOS - Make the receiver the active app even if another app is currently active.
On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

You should seek to use the steal option as sparingly as possible.
### hide
> app.hide() 【macOS】隐藏所有的应用窗口，不是最小化.

### show
> app.show() 【macOS】

Shows application windows after they were hidden. Does not automatically focus them.
### setAppLogsPath
> app.setAppLogsPath([path])

path String (optional) - A custom path for your logs. Must be absolute.
Sets or creates a directory your app's logs which can then be manipulated with app.getPath() or app.setPath(pathName, newPath).

Calling app.setAppLogsPath() without a path parameter will result in this directory being set to ~/Library/Logs/YourAppName on macOS, and inside the userData directory on Linux and Windows.
### getAppPath 应用所在目录
> app.getAppPath()

> 返回值 String 类型 - 当前应用程序所在目录
### getPath
> app.getPath(name)

name String - You can request the following paths by the name:
home 用户的 home 文件夹（主目录）
appData Per-user application data directory, which by default points to:
%APPDATA% Windows 中
$XDG_CONFIG_HOME or ~/.config Linux 中
~/Library/Application Support macOS 中
userData 储存你应用程序设置文件的文件夹，默认是 appData 文件夹附加应用的名称
缓存
temp 临时文件夹
exe当前的可执行文件
module The libchromiumcontent 库
desktop 当前用户的桌面文件夹
documents 用户文档目录的路径
downloads 用户下载目录的路径
music 用户音乐目录的路径
pictures 用户图片目录的路径
videos 用户视频目录的路径
recent Directory for the user's recent files (Windows only).
logs应用程序的日志文件夹
crashDumps Directory where crash dumps are stored.> 返回值 String - A path to a special directory or file associated with name. On failure, an Error is thrown.

If app.getPath('logs') is called without called app.setAppLogsPath() being called first, a default log directory will be created equivalent to calling app.setAppLogsPath() without a path parameter.
### getFileIcon 读取文件的关联图标
> app.getFileIcon(path[, options])

path String
options Object (可选)
size String
small - 16x16
normal - 32x32
large - Linux上是 48x48, Windows 上是 32x32, macOS 中无效
> 返回值 Promise<NativeImage> - 完成后返回当前应用的图标, 类型是 NativeImage.

读取文件的关联图标。

在 Windows 上, 会有两种图标：

与某些文件扩展名相关联的图标, 比如 . mp3 ，. png 等。
文件本身就带图标，像是 .exe, .dll, .ico
在 Linux 和 macOS 系统中，图标取决于和应用程序绑定的 文件 mime 类型
### setPath 
> app.setPath(name, path)

name String
path String
重写 name 的路径为 path，一个特定的文件夹或者文件。 If the path specifies a directory that does not exist, an Error is thrown. In that case, the directory should be created with fs.mkdirSync or similar.

name 参数只能使用 app.getPath 定义过的 name

默认情况下, 网页的 cookie 和缓存将存储在 userData 目录下。 如果要更改这个位置, 你需要在 app 模块中的 ready 事件被触发之前重写 userData 的路径。
### getVersion 应用版本
> app.getVersion()

> 返回值 String-加载的应用程序的版本。 如果应用程序的 package. json 文件中找不到版本号, 则返回当前包或者可执行文件的版本。
### getName 应用名称
> app.getName()

> 返回值 String-当前应用程序的名称, 它是应用程序的 package. json 文件中的名称。

Usually the name field of package.json is a short lowercase name, according to the npm modules spec. 通常还应该指定一个 productName 字段, 是首字母大写的完整名称，用于表示应用程序的名称。Electron 会优先使用这个字段作为应用名。
### setName 设置应用名字
> app.setName(name)

name String
设置当前应用程序的名字

Note: This function overrides the name used internally by Electron; it does not affect the name that the OS uses.
### getLocale 语言环境
> app.getLocale()
> 返回值 String - The current application locale. Possible return values are documented here.

要设置区域，则需要在应用启动时使用命令行时打开开关，你可以在这里找到。

注意: 分发打包的应用程序时, 你必须指定 locales 文件夹。

注意： 在 Windows 上，你必须得等 ready 事件触发之后，才能调用该方法

[本地化](https://www.electronjs.org/docs/api/locales)
### getLocaleCountryCode 语言码
> app.getLocaleCountryCode()
> 返回值 String - User operating system's locale two-letter ISO 3166 country code. The value is taken from native OS APIs.

注意： 当无法检测本地国家代码时，它返回空字符串。
### addRecentDocument 添加最近文档
> app.addRecentDocument(path) macOSWindows

path String
将此 path 添加到最近打开的文件列表中

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.
### clearRecentDocuments 情况最近文档
> app.clearRecentDocuments() macOSWindows

清空最近打开的文档列表
### setAsDefaultProtocolClient
> app.setAsDefaultProtocolClient(protocol[, path, args])

protocol String - 协议的名称, 不包含 ://。 For example, if you want your app to handle electron:// links, call this method with electron as the parameter.
path String (optional) Windows - The path to the Electron executable. Defaults to process.execPath
args String[] (optional) Windows - Arguments passed to the executable. Defaults to an empty array
> 返回值 Boolean-是否成功调用。

Sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with your-protocol:// will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

Note: On macOS, you can only register protocols that have been added to your app's info.plist, which cannot be modified at runtime. However, you can change the file during build time via Electron Forge, Electron Packager, or by editing info.plist with a text editor. 有关详细信息，请参阅 Apple's documentation

Note: In a Windows Store environment (when packaged as an appx) this API will return true for all calls but the registry key it sets won't be accessible by other applications. In order to register your Windows Store application as a default protocol handler you must declare the protocol in your manifest.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.
### removeAsDefaultProtocolClient
> app.removeAsDefaultProtocolClient(protocol[, path, args]) macOSWindows

protocol String - 协议的名称, 不包含 ://。
pathString (可选) Windows -默认为 process.execPath
args String[] (可选) Windows - 默认为空数组
> 返回值 Boolean-是否成功调用。

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.
### isDefaultProtocolClient
> app.isDefaultProtocolClient(protocol[, path, args])

protocol String - 协议的名称, 不包含 ://。
pathString (可选) Windows -默认为 process.execPath
args String[] (可选) Windows - 默认为空数组> 返回值 Boolean - Whether the current executable is the default handler for a protocol (aka URI scheme).

注意: 在macOS上, 您可以使用此方法检查应用程序是否已注册为协议的默认协议处理程序。 同时可以通过查看 ~/Library/Preferences/com.apple.LaunchServices.plist 来确认。 有关详细信息，请参阅 Apple's documentation

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.
### getApplicationNameForProtocol
> app.getApplicationNameForProtocol(url)

url String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including :// at a minimum (e.g. https://).> 返回值 String - Name of the application handling the protocol, or an empty string if there is no handler. For instance, if Electron is the default handler of the URL, this could be Electron on Windows and Mac. However, don't rely on the precise format which is not guaranteed to remain unchanged. Expect a different format on Linux, possibly with a .desktop suffix.

This method returns the application name of the default handler for the protocol (aka URI scheme) of a URL.
### getApplicationInfoForProtocol
> app.getApplicationInfoForProtocol(url) macOSWindows

url String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including :// at a minimum (e.g. https://).> 返回值 Promise<Object> - Resolve with an object containing the following:

icon NativeImage - the display icon of the app handling the protocol.
path String - installation path of the app handling the protocol.
name String - display name of the app handling the protocol.
This method returns a promise that contains the application name, icon and path of the default handler for the protocol (aka URI scheme) of a URL.
### setUserTasks
> app.setUserTasks(tasks) Windows

tasks Task[] - 由 Task 对象组成的数组
Adds tasks to the Tasks category of the Jump List on Windows.

tasks 是 Task 对象组成的数组

> 返回值 Boolean-是否成功调用。

注意: 如果您想自定义跳转列表, 请使用 aapp.setJumpList(categories) 来代替。
### getJumpListSettings
> app.getJumpListSettings() Windows

> 返回值 Object:

minItems Integer - 将在跳转列表中显示项目的最小数量(有关此值的更详细描述，请参阅 MSDN docs).
removedItems JumpListItem[] - Array of JumpListItem objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. 这些项目不能在 next 调用 app.setJumpList() 时重新添加到跳转列表中, Windows不会显示任何包含已删除项目的自定义类别.
app.setJumpList(categories) Windows> 
categories JumpListCategory[] | null - Array of JumpListCategory objects.
设置或删除应用程序的自定义跳转列表，并返回以下字符串之一：

ok - 没有出现错误
error - 发生一个或多个错误，启用运行日志记录找出可能的原因。
invalidSeparatorError - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard Tasks category.
fileTypeRegistrationError -尝试向自定义跳转列表添加一个文件链接，但是该应用未注册处理该应用类型
customCategoryAccessDeniedError - 由于用户隐私或策略组设置，自定义类别无法添加到跳转列表。
如果 categories 的值为 null， 之前设定的自定义跳转列表(如果存在) 将被替换为标准的应用跳转列表(由windows生成)

Note: If a JumpListCategory object has neither the type nor the name property set then its type is assumed to be tasks. 如果设置了 name 属性，省略了 type 属性，那么 type 默认为 custom.

注意: 用户可以从自定义类别中移除项目， after 调用 app.setJumpList(categories) 方法之前， Windows不允许删除的项目添加回自定义类别。 尝试提前将删除的项目重新添加 到自定义类别中，将导致整个自定义类别被隐藏。 删除的项目可以使用 app.getJumpListSettings() 获取。

下面是创建自定义跳转列表的一个非常简单的示例:

const { app } = require('electron')
### setJumpList
> app.setJumpList([
  
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // 已经有一个名字所以 `type` 被认为是 "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B
      }
    ]
  },
  { type: 'frequent' },
  { //这里没有设置名字 所以 `type` 被认为是 "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project
      }
    ]
  }
])
复制
app.> requestSingleInstanceLock()
> 返回值 Boolean

此方法的返回值表示你的应用程序实例是否成功取得了锁。 如果它取得锁失败，你可以假设另一个应用实例已经取得了锁并且仍旧在运行，并立即退出。

例如：如果你的程序是应用的主要实例并且当这个方法返回 true时，你应该继续让你的程序运行。 如果当它返回 false如果你的程序没有取得锁，它应该立刻退出，并且将参数发送给那个已经取到锁的进程。

在 macOS 上, 当用户尝试在 Finder 中打开您的应用程序的第二个实例时, 系统会通过发出 open-file 和 open-url 事件来自动强制执行单个实例,。 但是当用户在命令行中启动应用程序时, 系统的单实例机制将被绕过, 您必须手动调用此方法来确保单实例。

在第二个实例启动时激活主实例窗口的示例:

const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // 创建 myWindow, 加载应用的其余部分, etc...
  app.whenReady().then(() => {
    myWindow = createWindow()
  })
}
复制
app.> hasSingleInstanceLock()
> 返回值 Boolean

此方法返回你的应用实例当前是否持有单例锁。 你可以通过 app.requestSingleInstanceLock()请求锁，并且通过 app.releaseSingleInstanceLock() 释放锁。
### releaseSingleInstanceLock
> app.releaseSingleInstanceLock()

Releases all locks that were created by requestSingleInstanceLock. This will allow multiple instances of the application to once again run side by side.
### setUserActivity
> app.setUserActivity(type, userInfo[, webpageURL]) 【macOS】

type String - 活动的唯一标识。 映射到 NSUserActivity. activityType。
userInfo any - App-specific state to store for use by another device.
webpageURL String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be http or https.
创建一个 NSUserActivity 并将其设置为当前活动。 该活动之后可以Handoff到另一个设备。
### getCurrentActivityType
> app.getCurrentActivityType() 【macOS】

> 返回值 String - 正在运行的 activity 的类型
### invalidateCurrentActivity
> app.invalidateCurrentActivity() 【macOS】

使当前的Handoff用户活动无效。
### resignCurrentActivity
> app.resignCurrentActivity() 【macOS】

Marks the current`Handoff`user activity as inactive without invalidating it.
### updateCurrentActivity
> app.updateCurrentActivity(type, userInfo) 【macOS】

type String - 活动的唯一标识。 映射到 NSUserActivity. activityType。
userInfo any - App-specific state to store for use by another device.
当其类型与 type 匹配时更新当前活动, 将项目从 用户信息 合并到其当前 用户信息 字典中。
### setAppUserModelId
> app.setAppUserModelId(id) Windows

id String
改变当前应用的 Application User Model ID 为 id.
### setActivationPolicy
> app.setActivationPolicy(policy) 【macOS】

policy String - Can be 'regular', 'accessory', or 'prohibited'.
Sets the activation policy for a given app.

Activation policy types:

'regular' - The application is an ordinary app that appears in the Dock and may have a user interface.
'accessory' - The application doesn’t appear in the Dock and doesn’t have a menu bar, but it may be activated programmatically or by clicking on one of its windows.
'prohibited' - The application doesn’t appear in the Dock and may not create windows or be activated.
app.importCertificate(options, callback) Linux> 
选项 对象
certificate String - pkcs12 文件的路径
password String - 证书的密码
callback Function
result Integer - 导入结果
将 pkcs12 格式的证书导入到平台证书库。 使用导入操作的 callback 调用返回 result ，值 0 表示成功，而任何其他值表示失败，根据Chromium net_error_list 。
### disableHardwareAcceleration
> app.disableHardwareAcceleration()

禁用当前应用程序的硬件加速。

这个方法只能在应用程序准备就绪（ready）之前调用。
### disableDomainBlockingFor3DAPIs 启动3DAPI
> app.disableDomainBlockingFor3DAPIs()

> 注意

1. 默认情况下，Chromium会禁用3D API（例如WebGL），直到在GPU进程频繁崩溃的情况下重新启动每个域。此函数禁用该行为。
1. 这个方法只能在应用程序准备就绪（ready）之前调用。
### getAppMetrics 内存和CPU信息
> app.getAppMetrics()

> 返回值 ProcessMetric[] 与应用程序关联的所有进程的内存和CPU使用统计信息相对应的ProcessMetric对象数组。
### getGPUFeatureStatus 图形功能状态
> app.getGPUFeatureStatus()

> 返回值 GPUFeatureStatus chrome://gpu/ 的图形功能状态。

> 注意

此信息仅在发出gpu info update事件后可用。

### getGPUInfo 信息类型
> app.getGPUInfo(infoType)

> 返回值 Promise<unknown>

```js
// chrome://gpu 
{
  auxAttributes:
   {
     amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0
   },
  gpuDevice:
   [{ active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 }],
  machineModelName: 'MacBookPro',
  machineModelVersion: '11.5'
}
```
### setBadgeCount 设置计数器
设置当前应用程序的计数器标记. 将计数设置为 0 将隐藏该标记。
> app.setBadgeCount([count]) LinuxmacOS

> 返回值 Boolean 是否成功调用

> 注意: 

1. 在macOS上，它显示在dock图标上。在Linux上，它只适用于Unity launcher。
1. Unity 启动器依赖于`.desktop`文件, 获取更多信息, 请阅读 [桌面环境集成](https://www.electronjs.org/docs/tutorial/desktop-environment-integration#unity-launcher)。
### getBadgeCount 计数器值
获取计数器提醒(badge) 中显示的当前值
> app.getBadgeCount() LinuxmacOS

> 返回值 Integer
### isUnityRunning 当前桌面环境是否为 Unity 启动器
> app.isUnityRunning() Linux

> 返回值 Boolean
### getLoginItemSettings 是否开机自启
> app.getLoginItemSettings([options]) macOSWindows

> 返回值

```js
// 返回值
return {
  openAtLogin->Boolean
  openAsHidden->Boolean 【macOS】
  wasOpenedAtLogin->Boolean 【macOS】
  wasOpenedAsHidden->Boolean 【macOS】
  restoreState->Boolean 【macOS】
  executableWillLaunchAtLogin->Boolean 【Windows】
  launchItems: {
    name->String 【Windows】
    path->String 【Windows】
    args->String 【Windows】
    scope->String 【Windows】
    enabled->Boolean 【Windows】
  }
}
```
### setLoginItemSettings 设置开机自启
[开机自启](/FE/Electron/ApiMain?id=开机自启)

> app.setLoginItemSettings(Object)

```js
{
  // 默认为 false，true开机自启
  openAtLogin: true,
  // 开机启动文件。默认为 process.execPath
  path: updateExe,
  // macOS - true 表示以隐藏的方式启动应用。 默认为false。 用户可以从系统首选项中编辑此设置, 以便在打开应用程序时检查
  openAsHidden: true,
  // 要传递给可执行文件的命令行参数
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
}
```


> app.isAccessibilitySupportEnabled() macOSWindows
> 返回值 Boolean - 如果开启了Chrome的辅助功能, 则返回 true，其他情况返false。 如果使用了辅助技术（例如屏幕阅读），该 API 将返回 `true</0。 查看更多细节，请查阅 chromium.org/developers/design-documents/accessibility

### setAccessibilitySupportEnabled 启用或禁用访问权限树视图
> app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

enable 逻辑值 - 启用或禁用访问权限树视图。
手动启用 Chrome 的辅助功能的支持, 允许在应用程序中设置是否开启辅助功能。 在Chromium's accessibility docs查看更多的细节 默认为禁用

此 API 必须在 ready 事件触发后调用

注意: 渲染进程树会明显的影响应用的性能。默认情况下不应该启用。
### showAboutPanel 显示应用程序的“关于”面板选项
> app.showAboutPanel()

Show the app's about panel options. These options can be overridden with app.setAboutPanelOptions(options).
### setAboutPanelOptions 设置 "关于" 面板选项
> app.setAboutPanelOptions(options)

选项 对象
applicationName String (可选) - 应用程序的名字
applicationVersion String (可选) - 应用程序版本
copyright String (可选) - 版权信息
version String (optional) macOS - The app's build version number.
credits String (optional) macOS Windows - Credit information.
authors String[] (optional) Linux - List of app authors.
website String (optional) Linux - The app's website.
iconPath String (optional) Linux Windows - Path to the app's icon in a JPEG or PNG file format. On Linux, will be shown as 64x64 pixels while retaining aspect ratio.
设置 "关于" 面板选项。 This will override the values defined in the app's .plist file on macOS. 更多详细信息, 请查阅 Apple 文档 。 在 Linux 上，没有默认值，所以必须设置值才能显示。

If you do not set credits but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple documentation for more information.
### isEmojiPanelSupported
> app.isEmojiPanelSupported()

> 返回值 布尔值 - 当前操作系统版本是否允许使用本机emoji选取器。
### showEmojiPanel 打开系统自身的emjio选取器
> app.showEmojiPanel() macOSWindows

### startAccessingSecurityScopedResource
> app.startAccessingSecurityScopedResource(bookmarkData) mas

bookmarkData String - base64 编码的安全作用域的书签数据(bookmark data) ，通过 dialog.showOpenDialog 或者 dialog.showSaveDialog 方法获取。
> 返回值 Function - 该函数 必须 在你完成访问安全作用域文件后调用一次。 如果你忘记停止访问书签，内核资源将会泄漏，并且你的应用将失去完全到达沙盒之外的能力，直到应用重启。

//开始读取文件
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
复制
开始访问安全范围内的资源。 通过这个方法，Electron 应用被打包为可到达Mac App Store沙箱之外访问用户选择的文件。 关于系统工作原理，请查阅Apple's documentation
### enableSandbox
> app.enableSandbox()

Enables full sandbox mode on the app. This means that all renderers will be launched sandboxed, regardless of the value of the sandbox flag in WebPreferences.

这个方法只能在应用程序准备就绪（ready）之前调用。
### isInApplicationsFolder
> app.isInApplicationsFolder() 【macOS】
> 返回值 Boolean - Whether the application is currently running from the systems Application folder. Use in combination with app.moveToApplicationsFolder()
### moveToApplicationsFolder
> app.moveToApplicationsFolder([options]) 【macOS】

options Object (可选)
conflictHandler Function\ (optional) - A handler for potential conflict in move failure.
conflictType String - The type of move conflict encountered by the handler; can be exists or existsAndRunning, where exists means that an app of the same name is present in the Applications directory and existsAndRunning means both that it exists and that it's presently running.> 返回值 Boolean - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the dialog API.

注意:如果并非是用户造成操作失败，这个方法会抛出错误。 例如，如果用户取消了授权会话，这个方法将返回false。 如果无法执行复制操作, 则此方法将抛出错误。 The message in the error should be informative and tell you exactly what went wrong.

By default, if an app of the same name as the one being moved exists in the Applications directory and is not running, the existing app will be trashed and the active app moved into its place. If it is running, the pre-existing running app will assume focus and the previously active app will quit itself. This behavior can be changed by providing the optional conflict handler, where the boolean returned by the handler determines whether or not the move conflict is resolved with default behavior. i.e. returning false will ensure no further action is taken, returning true will result in the default behavior and the method continuing.

例如：
### moveToApplicationsFolder
> app.moveToApplicationsFolder({
  
  conflictHandler: (conflictType) => {
    if (conflictType === 'exists') {
      return dialog.showMessageBoxSync({
        type: 'question',
        buttons: ['Halt Move', 'Continue Move'],
        defaultId: 0,
        message: 'An app of this name already exists
      }) === 1
    }
  }
})
复制
Would mean that if an app already exists in the user directory, if the user chooses to 'Continue Move' then the function would continue with its default behavior and the existing app will be trashed and the active app moved into its place.
### isSecureKeyboardEntryEnabled
> app.isSecureKeyboardEntryEnabled() 【macOS】
> 返回值 Boolean - whether Secure Keyboard Entry is enabled.

By default this API will return false.
### setSecureKeyboardEntryEnabled
> app.setSecureKeyboardEntryEnabled(enabled) 【macOS】

enabled Boolean - Enable or disable Secure Keyboard Entry
Set the Secure Keyboard Entry is enabled in your application.

By using this API, important information such as password and other sensitive information can be prevented from being intercepted by other processes.

See Apple's documentation for more details.

Note: Enable Secure Keyboard Entry only when it is needed and disable it when it is no longer needed.

属性
app.> accessibilitySupportEnabled macOSWindows
A Boolean property that's true if Chrome's accessibility support is enabled, false otherwise. This property will be true if the use of assistive technologies, such as screen readers, has been detected. Setting this property to true manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See Chromium's accessibility docs for more details. 默认为禁用

此 API 必须在 ready 事件触发后调用

注意: 渲染进程树会明显的影响应用的性能。默认情况下不应该启用。
### applicationMenu
> app.applicationMenu

A Menu | null property that returns Menu if one has been set and null otherwise. Users can pass a Menu to set this property.
### badgeCount
> app.badgeCount LinuxmacOS

An Integer property that returns the badge count for current app. Setting the count to 0 will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

注意: Unity 启动器依赖于 . desktop 文件, 获取更多信息, 请阅读 桌面环境集成 。

Note: On macOS, you need to ensure that your application has the permission to display notifications for this property to take effect.
### commandLine
> app.commandLine Readonly

A CommandLine object that allows you to read and manipulate the command line arguments that Chromium uses.
### dock
> app.dock macOSReadonly

A Dock | undefined object that allows you to perform actions on your app icon in the user's dock on macOS.
### isPackaged
> app.isPackaged Readonly

返回一个Boolean值，如果应用已经打包，返回true ，否则返回false 。 对于大多数应用程序，此属性可用于区分开发和生产环境。
### name
> app.name

A String property that indicates the current application's name, which is the name in the application's package.json file.

Usually the name field of package.json is a short lowercase name, according to the npm modules spec. 通常还应该指定一个 productName 字段, 是首字母大写的完整名称，用于表示应用程序的名称。Electron 会优先使用这个字段作为应用名。
### userAgentFallback
> app.userAgentFallback

A String which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the webContents or session level. It is useful for ensuring that your entire app has the same user agent. Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.
### allowRendererProcessReuse
> app.allowRendererProcessReuse

A Boolean which when true disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation. The current default value for this property is true.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed. This property impacts which native modules you can use in the renderer process. For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this Tracking Issue.
### runningUnderRosettaTranslation
> app.runningUnderRosettaTranslation macOSReadonly

A Boolean which when true indicates that the app is currently running under the Rosetta Translator Environment.

You can use this property to prompt users to download the arm64 version of your application when they are running the x64 version under Rosetta incorrectly.



# inAppPurchase Store购买
## 事件
### transactions-updated
## 方法

### purchaseProduct(productID[, quantity])
### getProducts 检索商品的描述
### canMakePayments 用户是否可以付款
### restoreCompletedTransactions 恢复完成的事务
### getReceiptURL 收据的路径
### finishAllTransactions 完成所有待处理的交易
### finishTransactionByDate 完成与日期对应的待处理事务

# 相关功能
## 菜单
[全局快捷键](/FE/Electron/ApiMain?id=globalShortcut)
[本地快捷键](/FE/Electron/ApiMain?id=setApplicationMenu)
[右键菜单](/FE/Electron/ApiMain?id=buildFromTemplate)

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
