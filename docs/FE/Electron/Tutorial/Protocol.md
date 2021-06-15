
## 通过协议唤起Electron应用
采用协议通过浏览器访问，`myapp://startapp/here?a=1&b=2`，系统会去找到已经注册了 myapp 这个协议的应用，然后把 URL 当做参数传过去。

```js
const path = require('path');

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
}

const args = [];
if (!app.isPackaged) {
  args.push(path.resolve(process.argv[1]));
}
args.push('--');
const PROTOCOL = 'myapps';
app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, args);

handleArgv(process.argv);

app.on('second-instance', (event, argv) => {
  if (process.platform === 'win32') {
    // Windows
    handleArgv(argv);
  }
});

// macOS
app.on('open-url', (event, urlStr) => {
  handleUrl(urlStr);
});

function handleArgv(argv) {
  const prefix = `${PROTOCOL}:`;
  const offset = app.isPackaged ? 1 : 2;
  const url = argv.find((arg, i) => i >= offset && arg.startsWith(prefix));
  if (url) handleUrl(url);
}
```
