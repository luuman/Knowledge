## app
控制应用程序的事件生命周期

```js
// 最后一个窗口被关闭时退出应用
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

### 事件
![](https://img-blog.csdnimg.cn/img_convert/8b6e5736ef77fabb44c0f19d3fbe336e.png)
#### will-finish-launching 完成基础启动
```js
app.on('will-finish-launching', () => {
})
```
当应用程序完成基础的启动的时候被触发。 在 Windows 和 Linux 中, will-finish-launching 事件与 ready 事件是相同的; 在 macOS 中，这个事件相当于 NSApplication 中的 applicationWillFinishLaunching 提示。 

> 通常会在这里为 open-file 和 open-url 设置监听器，并启动崩溃报告和自动更新。

> 绝大部分情况下，你必须在ready事件句柄中处理所有事务。

#### ready 完成初始化
```js
app.on('ready', (event, launchInfo) => {
  console.log(event, launchInfo)
})
```

#### window-all-closed 当所有的窗口都被关闭时
```js
app.on('window-all-closed', () => {
  console.log(event)
})
```
如果你没有监听此事件并且所有窗口都关闭了，默认的行为是控制退出程序；但如果你监听了此事件，你可以控制是否退出程序。 如果用户按下了 Cmd + Q，或者开发者调用了 app.quit()，Electron 会首先关闭所有的窗口然后触发 will-quit 事件，在这种情况下 window-all-closed 事件不会被触发。

#### before-quit 程序关闭窗口前
```js
app.on('before-quit', () => {
  console.log(event)
})
```

注:在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

event Event
在程序关闭窗口前发信号。 Calling event.preventDefault() will prevent the default behavior, which is terminating the application.

注意： 如果由 autoUpdater.quitAndInstal() 退出应用程序 ，那么在所有窗口触发 close 之后 才会触发 before-quit 并关闭所有窗口。


#### will-quit
```js
app.on('will-quit', () => {
  console.log(event)
})
```
注:在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

event Event
Emitted when all windows have been closed and the application will quit. Calling event.preventDefault() will prevent the default behavior, which is terminating the application.

关于 window-all-closed 和 will-quit 事件之间的差异, 请参见 window-all-closed 事件的说明。

#### quit 应用退出时
```js
app.on('quit', (event, exitCode) => {
  console.log(event)
})
```
注:在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

#### open-file 【macOS】打开文件
```js
app.on('open-file', () => {
  console.log(event, path)
})
```

当用户想要在应用中打开一个文件时发出。 open-file 事件通常在应用已经打开，并且系统要再次使用该应用打开文件时发出。 open-file也会在一个文件被拖到 dock 并且还没有运行的时候发出。 请确认在应用启动的时候(甚至在 ready 事件发出前) 就对 open-file 事件进行监听。

如果你想处理这个事件，你应该调用 event.preventDefault() 。

在 Windows 系统中，你需要解析 process.argv (在主进程中) 来获取文件路径

#### open-url 【macOS】打开URL
当用户想要在应用中打开一个 URL 时发出，如果你想处理这个事件，你应该调用 event.preventDefault()
```js
app.on('open-url', () => {
  console.log(event, url)
})
```

#### activate 【macOS】应用被激活时发出
各种操作都可以触发此事件, 例如首次启动应用程序、尝试在应用程序已运行时或单击应用程序的坞站或任务栏图标时重新激活它
```js
app.on('activate', (event, hasVisibleWindows) => {
  console.log(event, hasVisibleWindows, 'hasVisibleWindows->Boolean')
})
```

#### did-groupe-active 【macOS】当应用被激活时发出
当应用被激活时发出。 与 activate 事件的不同是应用，程序激活时都会触发 did-become-active ，而不仅仅在 Dock 图标被点击或应用程序被重新启动的时候。
```js
app.on('did-groupe-active', (event) => {
  console.log(event)
})
```

#### continue-activity 【macOS】
当来自不同设备的活动通过`Handoff`想要恢复时触发。如果你想处理这个事件，你应该调用`event.preventDefault()`。
只有具有支持相应的活动类型并且相同的开发团队`ID`作为启动程序时，用户行为才会进行。所支持活动类型已在应用的`Info.plist`中的`NSUserActivityTypes`里明确定义。

```js
app.on('continue-activity', (event, type, userInfo) => {
  console.log(event, type, userInfo)
})
```
typeString-标识活动的字符串。 映射到 NSUserActivity. activityType。
userInfo unknown - Contains app-specific state stored by the activity on another device.

#### will-continue-activity 【macOS】
当来自不同设备的活动通过`Handoff`恢复之前触发。 如果你想处理这个事件，你应该调用 event.preventDefault() 。
```js
app.on('will-continue-activity', (event, typeString) => {
  console.log(event, typeString)
})
```
typeString-标识活动的字符串。 映射到 NSUserActivity. activityType。

#### continue-activity-error 【macOS】
当来自不同设备的活动通过`Handoff`恢复失败时触发。
```js
app.on('continue-activity-error', (event, typeString, error) => {
  console.log(event, typeString, error)
})
```
typeString-标识活动的字符串。 映射到 NSUserActivity. activityType。
error String - 详细的错误信息

#### activity-was-continued 【macOS】
当来自不同设备的活动通过`Handoff`成功恢复后触发。

```js
app.on('before', (event, typeString, userInfo) => {
  console.log(event, typeString, userInfo)
})
```

typeString-标识活动的字符串。 映射到 NSUserActivity. activityType。
userInfo unknown - Contains app-specific state stored by the activity.

#### update-activity-state 【macOS】
当`Handoff`即将通过另一个设备恢复时触发。
```js
app.on('update-activity-state', (event, typeString, userInfo) => {
  console.log(event, typeString, userInfo)
})
```
typeString-标识活动的字符串。 映射到 NSUserActivity. activityType。
userInfo unknown - Contains app-specific state stored by the activity.
If you need to update the state to be transferred, you should call event.preventDefault() immediately, construct a new userInfo dictionary and call app.updateCurrentActivity() in a timely manner. 否则，操作会失败，并且触发 continue-activity-error

#### new-window-for-tab 【macOS】
```js
app.on('new-window-for-tab ', (event) => {
  console.log(event)
})
```
Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current BrowserWindow has a tabbingIdentifier

#### browser-window-blur 失去焦点时
在 browserWindow 失去焦点时发出
```js
app.on('browser-window-blur', (event, window) => {
  console.log(event, window)
})
```
window BrowserWindow
在 browserWindow 失去焦点时发出。

#### browser-window-focus 获得焦点时
在 browserWindow 获得焦点时发出。
```js
app.on('browser-window-focus', (event, window) => {
  console.log(event, window)
})
```
window BrowserWindow

#### browser-window-created 创建新窗口时
在创建新的 browserWindow 时发出。

```js
app.on('browser-window-created', (event, window) => {
  console.log(event, window)
})
```
window BrowserWindow

#### web-contents-created 创建新webContents
在创建新的 webContents 时发出
```js
app.on('web-contents-created', (event, webContents) => {
  console.log(event, webContents)
})
```

#### certificate-error 证书验证失败时
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

#### select-client-certificate 客户证书被请求时
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

#### login


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

#### gpu-process-crashed 已废弃
当gpu进程崩溃或关闭（杀死）时触发

killed Boolean

已废弃：这个事件被包含更多子进程退出信息原因的child-process-gone事件取代了。 It isn't always because it crashed. The killed boolean can be replaced by checking reason === 'killed' when you switch to that event.

#### renderer-process-crashed 已废弃
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
#### second-instance 启动已运行程序时
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
#### desktop-capturer-get-sources 桌面捕获器源启动时
```js
app.on('desktop-capturer-get-sources', (event, webContents) => {
  console.log(event, webContents)
})
```

### 方法
注意: 某些方法仅在特定的操作系统上可用, 这些方法会被标记出来。
#### quit 关闭所有窗口
尝试关闭所有窗口 将首先发出`before-quit`事件。如果所有窗口都已成功关闭, 则将发出`will-quit`事件, 并且默认情况下应用程序将终止。此方法会确保执行所有`beforeunload`和`unload`事件处理程序。可以在退出窗口之前的beforeunload事件处理程序中返回false取消退出。
> app.quit()

#### exit 所有窗口立关闭
所有窗口都将立即被关闭，而不询问用户，而且`before-quit`和`will-quit`事件也不会被触发。
> app.exit([exitCode]) exitCode默认为0

#### relaunch
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
#### relaunch
> app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })

app.exit(0)> 
复制
app.> isReady()
> 返回值 Boolean 类型 - 如果 Electron 已经完成初始化，则返回 true, 其他情况为 false See also app.whenReady().
#### whenReady
> app.whenReady()

> 返回值 Promise<void> - 当Electron 初始化完成。 可用作检查 app.isReady() 的方便选择，假如应用程序尚未就绪，则订阅ready事件。
#### focus
> app.focus([options])

options Object (可选)
steal Boolean macOS - Make the receiver the active app even if another app is currently active.
On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

You should seek to use the steal option as sparingly as possible.
#### hide
> app.hide() 【macOS】隐藏所有的应用窗口，不是最小化.

#### show
> app.show() 【macOS】

Shows application windows after they were hidden. Does not automatically focus them.
#### setAppLogsPath
> app.setAppLogsPath([path])

path String (optional) - A custom path for your logs. Must be absolute.
Sets or creates a directory your app's logs which can then be manipulated with app.getPath() or app.setPath(pathName, newPath).

Calling app.setAppLogsPath() without a path parameter will result in this directory being set to ~/Library/Logs/YourAppName on macOS, and inside the userData directory on Linux and Windows.
#### getAppPath
> app.getAppPath()

> 返回值 String 类型 - 当前应用程序所在目录
#### getPath
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
#### getFileIcon
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
#### setPath
> app.setPath(name, path)

name String
path String
重写 name 的路径为 path，一个特定的文件夹或者文件。 If the path specifies a directory that does not exist, an Error is thrown. In that case, the directory should be created with fs.mkdirSync or similar.

name 参数只能使用 app.getPath 定义过的 name

默认情况下, 网页的 cookie 和缓存将存储在 userData 目录下。 如果要更改这个位置, 你需要在 app 模块中的 ready 事件被触发之前重写 userData 的路径。
#### getVersion
> app.getVersion()

> 返回值 String-加载的应用程序的版本。 如果应用程序的 package. json 文件中找不到版本号, 则返回当前包或者可执行文件的版本。
#### getName
> app.getName()

> 返回值 String-当前应用程序的名称, 它是应用程序的 package. json 文件中的名称。

Usually the name field of package.json is a short lowercase name, according to the npm modules spec. 通常还应该指定一个 productName 字段, 是首字母大写的完整名称，用于表示应用程序的名称。Electron 会优先使用这个字段作为应用名。
#### setName
> app.setName(name)

name String
设置当前应用程序的名字

Note: This function overrides the name used internally by Electron; it does not affect the name that the OS uses.
#### getLocale
> app.getLocale()
> 返回值 String - The current application locale. Possible return values are documented here.

要设置区域，则需要在应用启动时使用命令行时打开开关，你可以在这里找到。

注意: 分发打包的应用程序时, 你必须指定 locales 文件夹。

注意： 在 Windows 上，你必须得等 ready 事件触发之后，才能调用该方法
#### getLocaleCountryCode
> app.getLocaleCountryCode()
> 返回值 String - User operating system's locale two-letter ISO 3166 country code. The value is taken from native OS APIs.

注意： 当无法检测本地国家代码时，它返回空字符串。
#### addRecentDocument
> app.addRecentDocument(path) macOSWindows

path String
将此 path 添加到最近打开的文件列表中

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.
#### clearRecentDocuments
> app.clearRecentDocuments() macOSWindows

清空最近打开的文档列表
#### setAsDefaultProtocolClient
> app.setAsDefaultProtocolClient(protocol[, path, args])

protocol String - 协议的名称, 不包含 ://。 For example, if you want your app to handle electron:// links, call this method with electron as the parameter.
path String (optional) Windows - The path to the Electron executable. Defaults to process.execPath
args String[] (optional) Windows - Arguments passed to the executable. Defaults to an empty array
> 返回值 Boolean-是否成功调用。

Sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with your-protocol:// will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

Note: On macOS, you can only register protocols that have been added to your app's info.plist, which cannot be modified at runtime. However, you can change the file during build time via Electron Forge, Electron Packager, or by editing info.plist with a text editor. 有关详细信息，请参阅 Apple's documentation

Note: In a Windows Store environment (when packaged as an appx) this API will return true for all calls but the registry key it sets won't be accessible by other applications. In order to register your Windows Store application as a default protocol handler you must declare the protocol in your manifest.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.
#### removeAsDefaultProtocolClient
> app.removeAsDefaultProtocolClient(protocol[, path, args]) macOSWindows

protocol String - 协议的名称, 不包含 ://。
pathString (可选) Windows -默认为 process.execPath
args String[] (可选) Windows - 默认为空数组
> 返回值 Boolean-是否成功调用。

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.
#### isDefaultProtocolClient
> app.isDefaultProtocolClient(protocol[, path, args])

protocol String - 协议的名称, 不包含 ://。
pathString (可选) Windows -默认为 process.execPath
args String[] (可选) Windows - 默认为空数组> 返回值 Boolean - Whether the current executable is the default handler for a protocol (aka URI scheme).

注意: 在macOS上, 您可以使用此方法检查应用程序是否已注册为协议的默认协议处理程序。 同时可以通过查看 ~/Library/Preferences/com.apple.LaunchServices.plist 来确认。 有关详细信息，请参阅 Apple's documentation

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.
#### getApplicationNameForProtocol
> app.getApplicationNameForProtocol(url)

url String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including :// at a minimum (e.g. https://).> 返回值 String - Name of the application handling the protocol, or an empty string if there is no handler. For instance, if Electron is the default handler of the URL, this could be Electron on Windows and Mac. However, don't rely on the precise format which is not guaranteed to remain unchanged. Expect a different format on Linux, possibly with a .desktop suffix.

This method returns the application name of the default handler for the protocol (aka URI scheme) of a URL.
#### getApplicationInfoForProtocol
> app.getApplicationInfoForProtocol(url) macOSWindows

url String - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including :// at a minimum (e.g. https://).> 返回值 Promise<Object> - Resolve with an object containing the following:

icon NativeImage - the display icon of the app handling the protocol.
path String - installation path of the app handling the protocol.
name String - display name of the app handling the protocol.
This method returns a promise that contains the application name, icon and path of the default handler for the protocol (aka URI scheme) of a URL.
#### setUserTasks
> app.setUserTasks(tasks) Windows

tasks Task[] - 由 Task 对象组成的数组
Adds tasks to the Tasks category of the Jump List on Windows.

tasks 是 Task 对象组成的数组

> 返回值 Boolean-是否成功调用。

注意: 如果您想自定义跳转列表, 请使用 aapp.setJumpList(categories) 来代替。
#### getJumpListSettings
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
#### setJumpList
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
#### releaseSingleInstanceLock
> app.releaseSingleInstanceLock()

Releases all locks that were created by requestSingleInstanceLock. This will allow multiple instances of the application to once again run side by side.
#### setUserActivity
> app.setUserActivity(type, userInfo[, webpageURL]) 【macOS】

type String - 活动的唯一标识。 映射到 NSUserActivity. activityType。
userInfo any - App-specific state to store for use by another device.
webpageURL String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be http or https.
创建一个 NSUserActivity 并将其设置为当前活动。 该活动之后可以Handoff到另一个设备。
#### getCurrentActivityType
> app.getCurrentActivityType() 【macOS】

> 返回值 String - 正在运行的 activity 的类型
#### invalidateCurrentActivity
> app.invalidateCurrentActivity() 【macOS】

使当前的Handoff用户活动无效。
#### resignCurrentActivity
> app.resignCurrentActivity() 【macOS】

Marks the current`Handoff`user activity as inactive without invalidating it.
#### updateCurrentActivity
> app.updateCurrentActivity(type, userInfo) 【macOS】

type String - 活动的唯一标识。 映射到 NSUserActivity. activityType。
userInfo any - App-specific state to store for use by another device.
当其类型与 type 匹配时更新当前活动, 将项目从 用户信息 合并到其当前 用户信息 字典中。
#### setAppUserModelId
> app.setAppUserModelId(id) Windows

id String
改变当前应用的 Application User Model ID 为 id.
#### setActivationPolicy
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
#### disableHardwareAcceleration
> app.disableHardwareAcceleration()

禁用当前应用程序的硬件加速。

这个方法只能在应用程序准备就绪（ready）之前调用。
#### disableDomainBlockingFor3DAPIs 启动3DAPI
> app.disableDomainBlockingFor3DAPIs()

> 注意

1. 默认情况下，Chromium会禁用3D API（例如WebGL），直到在GPU进程频繁崩溃的情况下重新启动每个域。此函数禁用该行为。
1. 这个方法只能在应用程序准备就绪（ready）之前调用。
#### getAppMetrics 内存和CPU信息
> app.getAppMetrics()

> 返回值 ProcessMetric[] 与应用程序关联的所有进程的内存和CPU使用统计信息相对应的ProcessMetric对象数组。
#### getGPUFeatureStatus 图形功能状态
> app.getGPUFeatureStatus()

> 返回值 GPUFeatureStatus chrome://gpu/ 的图形功能状态。

> 注意

此信息仅在发出gpu info update事件后可用。

#### getGPUInfo 信息类型
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
#### setBadgeCount 设置计数器
设置当前应用程序的计数器标记. 将计数设置为 0 将隐藏该标记。
> app.setBadgeCount([count]) LinuxmacOS

> 返回值 Boolean 是否成功调用

> 注意: 

1. 在macOS上，它显示在dock图标上。在Linux上，它只适用于Unity launcher。
1. Unity 启动器依赖于`.desktop`文件, 获取更多信息, 请阅读 [桌面环境集成](https://www.electronjs.org/docs/tutorial/desktop-environment-integration#unity-launcher)。
#### getBadgeCount 计数器值
获取计数器提醒(badge) 中显示的当前值
> app.getBadgeCount() LinuxmacOS

> 返回值 Integer
#### isUnityRunning 当前桌面环境是否为 Unity 启动器
> app.isUnityRunning() Linux

> 返回值 Boolean
#### getLoginItemSettings 是否开机自启
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
#### setLoginItemSettings 设置开机自启
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

#### setAccessibilitySupportEnabled 启用或禁用访问权限树视图
> app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

enable 逻辑值 - 启用或禁用访问权限树视图。
手动启用 Chrome 的辅助功能的支持, 允许在应用程序中设置是否开启辅助功能。 在Chromium's accessibility docs查看更多的细节 默认为禁用

此 API 必须在 ready 事件触发后调用

注意: 渲染进程树会明显的影响应用的性能。默认情况下不应该启用。
#### showAboutPanel 显示应用程序的“关于”面板选项
> app.showAboutPanel()

Show the app's about panel options. These options can be overridden with app.setAboutPanelOptions(options).
#### setAboutPanelOptions 设置 "关于" 面板选项
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
#### isEmojiPanelSupported
> app.isEmojiPanelSupported()

> 返回值 布尔值 - 当前操作系统版本是否允许使用本机emoji选取器。
#### showEmojiPanel 打开系统自身的emjio选取器
> app.showEmojiPanel() macOSWindows

#### startAccessingSecurityScopedResource
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
#### enableSandbox
> app.enableSandbox()

Enables full sandbox mode on the app. This means that all renderers will be launched sandboxed, regardless of the value of the sandbox flag in WebPreferences.

这个方法只能在应用程序准备就绪（ready）之前调用。
#### isInApplicationsFolder
> app.isInApplicationsFolder() 【macOS】
> 返回值 Boolean - Whether the application is currently running from the systems Application folder. Use in combination with app.moveToApplicationsFolder()
#### moveToApplicationsFolder
> app.moveToApplicationsFolder([options]) 【macOS】

options Object (可选)
conflictHandler Function\ (optional) - A handler for potential conflict in move failure.
conflictType String - The type of move conflict encountered by the handler; can be exists or existsAndRunning, where exists means that an app of the same name is present in the Applications directory and existsAndRunning means both that it exists and that it's presently running.> 返回值 Boolean - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the dialog API.

注意:如果并非是用户造成操作失败，这个方法会抛出错误。 例如，如果用户取消了授权会话，这个方法将返回false。 如果无法执行复制操作, 则此方法将抛出错误。 The message in the error should be informative and tell you exactly what went wrong.

By default, if an app of the same name as the one being moved exists in the Applications directory and is not running, the existing app will be trashed and the active app moved into its place. If it is running, the pre-existing running app will assume focus and the previously active app will quit itself. This behavior can be changed by providing the optional conflict handler, where the boolean returned by the handler determines whether or not the move conflict is resolved with default behavior. i.e. returning false will ensure no further action is taken, returning true will result in the default behavior and the method continuing.

例如：
#### moveToApplicationsFolder
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
#### isSecureKeyboardEntryEnabled
> app.isSecureKeyboardEntryEnabled() 【macOS】
> 返回值 Boolean - whether Secure Keyboard Entry is enabled.

By default this API will return false.
#### setSecureKeyboardEntryEnabled
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
#### applicationMenu
> app.applicationMenu

A Menu | null property that returns Menu if one has been set and null otherwise. Users can pass a Menu to set this property.
#### badgeCount
> app.badgeCount LinuxmacOS

An Integer property that returns the badge count for current app. Setting the count to 0 will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

注意: Unity 启动器依赖于 . desktop 文件, 获取更多信息, 请阅读 桌面环境集成 。

Note: On macOS, you need to ensure that your application has the permission to display notifications for this property to take effect.
#### commandLine
> app.commandLine Readonly

A CommandLine object that allows you to read and manipulate the command line arguments that Chromium uses.
#### dock
> app.dock macOSReadonly

A Dock | undefined object that allows you to perform actions on your app icon in the user's dock on macOS.
#### isPackaged
> app.isPackaged Readonly

返回一个Boolean值，如果应用已经打包，返回true ，否则返回false 。 对于大多数应用程序，此属性可用于区分开发和生产环境。
#### name
> app.name

A String property that indicates the current application's name, which is the name in the application's package.json file.

Usually the name field of package.json is a short lowercase name, according to the npm modules spec. 通常还应该指定一个 productName 字段, 是首字母大写的完整名称，用于表示应用程序的名称。Electron 会优先使用这个字段作为应用名。
#### userAgentFallback
> app.userAgentFallback

A String which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the webContents or session level. It is useful for ensuring that your entire app has the same user agent. Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.
#### allowRendererProcessReuse
> app.allowRendererProcessReuse

A Boolean which when true disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation. The current default value for this property is true.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed. This property impacts which native modules you can use in the renderer process. For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this Tracking Issue.
#### runningUnderRosettaTranslation
> app.runningUnderRosettaTranslation macOSReadonly

A Boolean which when true indicates that the app is currently running under the Rosetta Translator Environment.

You can use this property to prompt users to download the arm64 version of your application when they are running the x64 version under Rosetta incorrectly.

