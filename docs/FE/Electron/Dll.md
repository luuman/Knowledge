# Electron 原生能力
electron本身就集成了nodejs运行环境，而nodejs又是用C++实现的
C++编写的动态链接共享对象，能被Node.js require使用
.node文件：本质是动态链接库（windows的*.dll、Mac的*.dylib、Linux的*.so）
> Node.js

1. `原生API`：文件读写、操作系统、加解密、Shell等
1. `Node.js扩展`：集成三方C++库

> Electron Native API

1. `客户端GUI`：右键菜单、窗口定制、系统托盘、Dock
1. `桌面环境集成`：系统通知、剪切板、系统快捷键、文件拖拽
1. `设备API`：电源监控、内存、CPU、屏幕

> OS

1. `Applescript(MacOS)`：系统原生应用调用
1. `Windows RT`：USB、蓝牙、预览文件

# Node C++ Addons扩展

## addon-api

## NAN
Native abstractions for Node.js 一次编写、到处编译

## N-API
node.js一部分，独立于runtime v8 同一API、无需重新编译

1. 本身是基于C的API
1. C++封装node-addon-api

# 集成DLL动态链接库
调用DLL动态库，可以在不会C++基础，绑定本地Dll库
1. Dynamic Link Library（动态链接库）
1. DLL是建立在客户/服务器通信的概念上，包含若干函数、类或资源的库文件，函数和数据被存储在一个DLL（服务器）上并由一个或多个客户导出而使用，这些客户可以是应用程序或者是其它的DLL。
1. DLL库不同于静态库，在静态库情况下，函数和数据被编译进一个二进制文件（通常扩展名为*.LIB）
1. Visual C++的编译器在处理程序代码时将从静态库中恢复这些函数和数据并把他们和应用程序中的其他模块组合在一起生成可执行文件。
1. 动态库每次在程序运行的时候去调用，而静态库需打包进exe，如果静态库有变动，则需要重新打包，而动态库不用。

> 优点

1. 不需要开发源代码
1. 不需要重新编译
1. 不需要写C代码

> 缺点

1. 性能会有一定的折算
1. 和其他ffi一样调试会很困难（本质为黑盒调用，排查会很困难）

```js
// 引入FFI
const ffi = require('ffi-napi')
// 绑定ffi动态库
const TestDll = new ffi.Library(testDll, {
  // 定义的方法 还回的数据类型 传入的参数
  'funAdd': [ 'int', ['int', 'int'] ]
})
logger.debug('dll', TestDll.funAdd(1, 2))
```

> 使用场景

1. 使用系统API操作或扩转应用程序（唤起微信）
1. 使用第三方DLL，如硬件设备进行通信

## 环境搭建

> node-gyp

```js
// 使用管理员身份打开cmd终端：
npm install --global --production windows-build-tools
// 需要以管理员身份运行命令
// 配置环境变量path C:\Windows\System32\WindowsPowerShell\v1.0
npm install -g node-gyp
```

> node-ffi(node < 10, Electron < 6)

```js
npm install --save ffi
```

> node-ffi-napi(node > 10, Electron >= 6)

```js
npm install --save ffi-napi
```

使用ffi-napi，ref-array-napi，ref-napi 加载 Windows 动态链接库，并在Vue 渲染进程中使用。使用过程中会遇到一系列的坑，本文将会一一解决，并解释原因。

> webpack配置

```js
//这个模块包含原生 C代码，所以要在运行的时候再获取，而不是被webpack打包到bundle中
externals: ['ffi-napi'],
output: {
  // 入口起点的返回值将分配给 module.exports 对象,若不设，externals的对象无法使用
  libraryTarget: 'commonjs2',
}
```

# AppleScript
一种脚本语言，可以用来控制运行于Mac OS上的程序，也可以写成独立运行的Applet
[AppleScript](/FE/Electron/AppleScript)

## 环境
> applescript

```js
npm install --save applescript
```

## 案例

### 音频控制器

```js
var applescript = require('applescript')

var scripts = {
  state: 'input volume of (get volume settings) & output volume of (get volume settings) & output muted of (get volume settings)',
  volumeState: 'output volume of (get volume settings)',
  inputState: 'input volume of (get volume settings)',
  outputState: 'output volume of (get volume settings)',
  muteState: 'output muted of (get volume settings)',
  setOutput: 'set volume output volume %s --100%',
  setInput: 'set volume input volume %s --100%',
  increase: 'set volume output volume (output volume of (get volume settings) + 10) --100%',
  decrease: 'set volume output volume (output volume of (get volume settings) - 10) --100%',
  mute: 'set volume with output muted',
  unmute: 'set volume without output muted'
}

var exec = function (script, callback) {
  if (!callback) callback = function () { }
  applescript.execString(script, callback)
}

var getScript = function (scriptName, param) {
  var script = scripts[scriptName]
  if (typeof param !== 'undefined') script = script.replace('%s', param)
  return script
}

// 获取系统的音量信息
exports.state = function (callback) {
  return exec(getScript('state'), callback)
}

// 获取音量
exports.volumeState = function (callback) {
  return exec(getScript('volumeState'), callback)
}

// 获取输入音量
exports.inputState = function (callback) {
  return exec(getScript('inputState'), callback)
}

// 设置输出音量
exports.outputState = function (callback) {
  return exec(getScript('outputState'), callback)
}

// 是否禁音
exports.muteState = function (callback) {
  return exec(getScript('muteState'), callback)
}

// 设置输入音量
exports.setOutput = function (volume, callback) {
  return exec(getScript('setOutput', volume), callback)
}

// 设置输入音量
exports.setInput = function (volume, callback) {
  return exec(getScript('setInput', volume), callback)
}

// 增大音量
exports.increase = function (callback) {
  return exec(getScript('increase'), callback)
}

// 减小音量
exports.decrease = function (callback) {
  return exec(getScript('decrease'), callback)
}

// 禁音
exports.mute = function (callback) {
  return exec(getScript('mute'), callback)
}

// 不禁音
exports.unmute = function (callback) {
  return exec(getScript('unmute'), callback)
}
```

```js
import volume from '@/main/plugins/osxVolume.js'
volume.state((err, res) => {
  // 'volume: ' [42, 0, 'true']
  console.log('volume: ', res)
})
volume.volumeState((err, res) => {
  // 'volume: ' 40
  console.log('volume: ', res)
})
volume.inputState((err, res) => {
  // 'volume: ' 42
  console.log('volume: ', res)
})
volume.outputState((err, res) => {
  // 'volume: ' 40
  console.log('volume: ', res)
})
volume.muteState((err, res) => {
  // 'volume: ' false
  console.log('volume: ', res)
})
volume.setOutput('40', (err, res) => {
  // 'volume: ' undefind
  console.log('volume: ', res)
})
volume.setInput('40', (err, res) => {
  // 'volume: ' undefind
  console.log('volume: ', res)
})
volume.increase((err, res) => {
  // 'volume: ' undefined
  console.log('volume: ', res)
})
volume.decrease((err, res) => {
  // 'volume: ' undefined
  console.log('volume: ', res)
})
volume.mute((err, res) => {
  // 'volume: ' undefined
  console.log('volume: ', res)
})
volume.unmute((err, res) => {
  // 'volume: ' undefined
  console.log('volume: ', res)
})
```


# C++动态库

## 搭建myAddDll

```c
// myAddDll.cpp
#include 'stdafx.h'
#include 'myAddDll.h'

int funAdd(int a, int b) {
  return a + b
}

// myAddDll.h
extern 'c' {
  _declspec (dllexport) int funAdd(int a, int b)
}
```

## NodeJS项目

## Electron项目

```js
try {
  const ffi = require('ffi-napi')
  logger.debug('dll', 'init dll myAddDll')
  let myAddDll = path.resolve('resources/myAddDll_ax32')
  if (arch === 'x64') {
    myAddDll = path.resolve('resources/myAddDll_ax64')
  }
  const TestDll = new ffi.Library(myAddDll, {
    'funAdd': [ 'int', ['int', 'int'] ]
  })
  logger.debug('dll', TestDll.funAdd(1, 2))
} catch (error) {
  logger.error('dll', 'myAddDll', error)
}
```

打包处理
```js
const is = require('electron-is')
function resolve(dir) {
  return path.join(__dirname, dir)
}
function isMac() {
  let back = []
  console.log('build is ', is.macOS() ? 'macOS' : 'win')
  if (!is.macOS()) {
    // 拷贝静态文件到指定位置,否则打包之后出现找不到资源的问题.将整个resources目录拷贝到 发布的根目录下
    back = [{
      // dll文件
      from: 'dll/dll/',
      to: './'
    },
    {
      // dll文件依赖的dll
      from: 'dll/dll_package/',
      to: '../'
    }]
  } else {
    back = [{
      // dylib
      from: 'dylib/',
      to: './'
    }]
  }
  return back
}
module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      // 因为这两个模块中包含原生 C代码，所以要在运行的时候再获取，而不是被webpack打包到bundle中(外部扩展)
      externals: ['ffi-napi', 'ref-napi'],
      builderOptions: {
        // 打包过滤
        extraResources: isMac()
      }
    }
  }
}
```

## 案例

### 指纹
### 唤起微信窗口

> 技术点

1. user32.dll --> FindWindowA[寻找窗口句柄](lpClassName[窗口类名], lpWindowName[窗口标题]) Back 句柄
1. user32.dll --> ShowWindow[控制窗口的可见性](hWnd[窗口句柄，要向这个窗口应用由nCmdShow指定的命令。], nCmdShow[为窗口指定可视性方面的一个命令。请用下述任何一个常数：SW_HIDE，SW_SHOWNORMAL]) Back [0：显现] [非零：之前就可见]
1. user32.dll --> GetForegroundWindow[取前台窗口]

```js
try {
  const ffi = require('ffi-napi')
  const User32 = new ffi.Library('user32', {
    // 获取句柄
    'FindWindowA': [ 'int32', ['string', 'string'] ],
    'GetForegroundWindow': [ 'int32', ['int32'] ],
    // 设置窗口名称 字节集误解
    'SetWindowTextW': [ 'int32', ['int32', 'string'] ],
    // 显示动画 无效
    'AnimateWindow': [ 'int32', ['int32', 'int32', 'int32'] ],
    // 改变指定窗口的位置和大小
    'MoveWindow': [ 'int32', ['int32', 'int32', 'int32', 'int32', 'int32', 'int32'] ],
    // 显示窗口 0： 关闭窗口、1：正常大小显示窗口、2：最小化窗口、3：最大化窗口
    'ShowWindow': [ 'int32', ['int32', 'int32'] ]
  })
  function showWeChat(){
    // 微信
    let FindDate = User32.FindWindowA('WeChatMainWndForPC', null)
    // QQ
    let FindDate = User32.FindWindowA('TXGuiFoundation', null)
    // 钉钉
    let FindDate = User32.FindWindowA('StandardFrame_DingTalk', null)
    // 飞书（获取句柄不正常，无法实现效果）
    let FindDate = User32.FindWindowA('Chrome_WidgetWin_0', null)
    logger.debug('dll', 'showWeChat GetForegroundWindow', User32.GetForegroundWindow(FindDate))
    logger.debug('dll', 'showWeChat ShowWindow', User32.ShowWindow(FindDate, 1))
    logger.debug('dll', 'showWeChat MoveWindow', User32.MoveWindow(FindDate, 100, 1, null, null, null))
  }
} catch (error) {
  logger.error('dll', 'myAddDll', error)
}

module.exports = { showWeChat }
```


### 查看应用窗口类名
LookHandles

通过微信PC端获取部分句柄操作
```python
#-*- coding:utf-8 _*-

import win32gui, win32api, win32con
import time
import pyperclip
import pymouse,pykeyboard

m = pymouse.PyMouse()
k = pykeyboard.PyKeyboard()

# todo 聊天窗口1
classname = "WeChatMainWndForPC"
titlename = "微信"
# todo 微信窗口父容器句柄
pHwnd = win32gui.FindWindow(classname, titlename)

print(pHwnd)

# 强行显示界面后才好截图
win32gui.ShowWindow(pHwnd, win32con.SW_RESTORE)
# 将窗口提到最前
win32gui.SetForegroundWindow(pHwnd)

#获取窗口左上角和右下角坐标
left, top, right, bottom = win32gui.GetWindowRect(pHwnd)
print(left, top, right, bottom)

#鼠标移动到坐标(x,y)处
m.move(left + 110,top + 40)
#鼠标点击，x,y是坐标位置 button 1表示左键，2表示点击右键 n是点击次数，默认是1次，2表示双击
m.click(left + 110,top + 40,1)
time.sleep(0.25)
m.click(left + 110,top + 40,1)

#获取当前的鼠标位置
nowP = m.position()
print(nowP)

#复制
pyperclip.copy("法律读库")
# pyperclip.copy("法律读库")
pyperclip.paste()
#模拟键盘点击ctrl+v
k.press_key(k.control_key)
k.tap_key('v')
k.release_key(k.control_key)
time.sleep(3)
#点击第一个公众号，注意要关注
m.click(left + 180,top + 130,1)
time.sleep(3)
#点击历史数据
# 模拟鼠标操作(点击)
win32api.SetCursorPos([right - 30,top + 40])  # 为鼠标焦点设定一个位置
#执行左单键击，若需要双击则延时几毫秒再点击一次即可
win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP | win32con.MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
# win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN | win32con.MOUSEEVENTF_LEFTUP, 0, 0, 0, 0)

time.sleep(1)
# 模拟鼠标操作(点击)
win32api.SetCursorPos([right - 30 + 20,top + 40+20])  # 为鼠标焦点设定一个位置
#执行左单键击，若需要双击则延时几毫秒再点击一次即可
win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP | win32con.MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
# 通过坐标获取窗口句柄
hw = win32gui.WindowFromPoint(win32api.GetCursorPos())
print(hw)
# 获取窗口classname
hwclass = win32gui.GetClassName(hw)
# 获取窗口标题
hwtext = win32gui.GetWindowText(hw)
# 获取窗口坐标
win32gui.GetWindowRect(hw)

# TODO 获取到分享消息列表的窗口句柄 --> 点击读取历史消息
left1, top1, right1, bottom1 = win32gui.GetWindowRect(hw)
#鼠标点击，x,y是坐标位置 button 1表示左键，2表示点击右键 n是点击次数，默认是1次，2表示双击
m.click(left1 + 209,top1 + 248,1)
time.sleep(3)

# TODO 获取到历史消息列表的窗口句柄
hisHwnd = win32gui.FindWindow('CefWebViewWnd', '微信')
#获取窗口左上角和右下角坐标
left2, top2, right2, bottom2 = win32gui.GetWindowRect(hisHwnd)
print(left2, top2, right2, bottom2)

#获取当前的鼠标位置
# nowP = m.position()
```

## Error错误采坑

> Error: A dynamic link library (DLL) initialization routine failed.



> Dynamic Linking Error: Win32 error 126

1. 没有引用到dll文件，dll路径的问题或者DLL缺少依赖
1. 通常是传入的DLL路径错误，找不到Dll文件，推荐使用绝对路径。
1. 如果是在x64的node/electron下引用32位的DLL，也会报这个错，反之亦然。要确保DLL要求的CPU架构和你的运行环境相同。
1. DLL还有引用其他DLL文件，但是找不到引用的DLL文件，可能是VC依赖库或者多个DLL之间存在依赖关系。

> Dynamic Linking Error: Win32 error 127

DLL中没有找到对应名称的函数，需要检查头文件定义的函数名是否与DLL调用时写的函数名是否相同。

> Dynamic Linking Error: Win32 error 193

dll 位数不对应，例如electron/nodejs是32位的dll是64位的

> Dynamic Linking Error: Win32 error 1114

dll初始化失败,一般是在打包成exe文件发生,可能是你的dll在打包后的位置不正确,
程序调用不到就会去系统c盘找对应的dll文件

> 闪崩问题

实际node-ffi调试的时候，很容易出现内存错误闪崩，甚至会出现断点导致崩溃的情况。这个是往往是因为非法内存访问造成，可以通过Windows日志看到错误信息，但是相信我，那并没有什么用。C的内存差错是不是一件简单的事情。

> GetLastError

简单说node-ffi通过winapi来调用DLL，这导致GetLastError永远返回0。最简单方法就是自己写个C++ addon来绕开这个问题。
参考Issue[GetLastError() always 0 when using Win32 API](https://github.com/node-ffi/node-ffi/issues/261) [参考PR](https://github.com/node-ffi/node-ffi/pull/275)

> PVOID返回空



> fatail error LNK1127

删除用户目录下.node-gyp 重新安装 npm install node-gyp -g件

> 调用dll中文乱码问题

```js
// 安装iconv-lite
1.cnpm install iconv-lite -D
2.let iconv = require('iconv-lite')
3.iconv.decode(obj, 'GBK') // 解码成utf8.
```

> 打包成exe时出现
The process cannot access the file because it is being used by another process

原因是程序被占用,删掉build李敏啊除icons外的文件,重新执行编译,如果还不是,则关闭编辑工具
比如vscode也会占用,然后在命令行重新编译即可

> error msb4019:未找到导入的项目“C:\Program Files (x86 )\MSBuild\
Microsoft.Cpp\v4.0\V140\Microsoft.Cpp.Default.props”

// 在命令行执行改命令即可,2017 是你当前vs对应的版本,比如你装的是2015版本,就改成2015
npm config set msvs_version 2017  

[记录 electron-vue 通过node ffi调用dll文件踩的坑](https://www.jianshu.com/p/ecd2c578075d?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)
[#调用 c++原生 dll](https://umbrella22.github.io/electron-vue-template-doc/Overview/advanced/FrostedGlassWindow.html)
[C++中dll的生成与使用](https://blog.csdn.net/qq_33414271/article/details/79534763)
[Electron-利用DLL实现不可能](https://juejin.cn/post/6844903774801117192)
[我的electron教程系列](https://www.cnblogs.com/silenzio/p/11606389.html)
[关于ffi-napi结合ref-napi调用dll的经验总结](https://blog.csdn.net/Yoryky/article/details/107352208)
[electron调用DLL库发送windows消息](https://juejin.cn/post/6845166891867045896)
[使用ffi-napi引入C++的dll](https://www.cnblogs.com/silenzio/p/11606389.html)
[]()
[]()
[]()

[]()

### app.asar
app.asar文件是Electron程序的主业务文件，是一种压缩格式的文件。

> 反向解压

```js
// 全局环境安装asar
npm install -g asar
asar -V
// 解压缩.asar文件在./里
asar extract app.asar ./
asar pack app app.asar
```