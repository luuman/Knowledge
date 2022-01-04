Electron DevTools扩展

为了使调试更容易，Electron 原生支持 Chrome DevTools 扩展。对于大多数 DevTools 的扩展，我们可以直接下载源码，然后通过 BrowserWindow.addDevToolsExtension 加载它们。Electron 会记住已经加载了哪些扩展，所以不需要每次创建一个新 window 时都调用 BrowserWindow.addDevToolsExtension。

首先我们需要在 Chrome 中安装 React Developer Tools 。打开 chrome://extensions，找到扩展程序的 ID，形如 fmkadmapgofadopljbjfkapdkoienihi 的 hash 字符串。找到 Chrome 扩展程序的存放目录：

在 Ｗindows 下为 %LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions
在 macOS 下为 ~/Library/Application Support/Google/Chrome/Default/Extensions
在 Linux 下为：
~/.config/google-chrome/Default/Extensions/
~/.config/google-chrome-beta/Default/Extensions/
~/.config/google-chrome-canary/Default/Extensions/
~/.config/chromium/Default/Extensions/

## electron > 9
```js
// 开启 Vue-Devtool
if (process.env.WEBPACK_DEV_SERVER_URL) {
  app.whenReady().then(async () => {
    // const reactDevToolsPath = path.join(
    //   os.homedir(),
    //   '/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.3.4_0'
    // )
    const reactDevToolsPath = path.resolve('devtools/chrome')
    logger.debug('win', 'addDevToolsExtensions', reactDevToolsPath)
    session.defaultSession.loadExtension(reactDevToolsPath, { allowFileAccess: true })
      .then(name => logger.debug('win', 'INSTALLING', name))
      .catch(err => logger.debug('win', 'Install Vue-Devtool err', err))
  })
}
```

## electron < 9
```js
// 开启 Vue-Devtool
if (process.env.WEBPACK_DEV_SERVER_URL) {
  app.whenReady().then(async () => {
    const reactDevToolsPath = path.resolve('devtools/chrome')
    BrowserWindow.addDevToolsExtension(path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0'))
  })
}
```

```js
// 如何移除一个DevTools扩展程序
BrowserWindow.removeDevToolsExtension('React Developer Tools');
```

# chrome.* APIs

[vuejs/devtools](https://github.com/vuejs/devtools#vue-devtools)
Ember Inspector
React Developer Tools
Backbone Debugger
jQuery Debugger
AngularJS Batarang
Vue.js devtools
Cerebral Debugger
Redux DevTools Extension
MobX Developer Tools