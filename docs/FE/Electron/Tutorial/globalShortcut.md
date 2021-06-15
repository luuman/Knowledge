### 注册快捷键打开devTools
在Electron中打开devTools是通过主线程中调用win.webContents.openDevTools()实现的。以上教程仅在开发环境初始启动的时候打开devTools，但是一旦关闭就不能再打开了。下面讲一下怎么通过快捷键打开devTools。

```js
// background.js
import { app, protocol, BrowserWindow, Menu, globalShortcut } from 'electron'
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  // 在开发环境和生产环境均可通过快捷键打开devTools
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    win.webContents.openDevTools()
  })
  createWindow()
})
```