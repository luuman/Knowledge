# Electron 脚手架构建流程详解

Electron是一个基于Chromium和 Node.js，可以使用 HTML、CSS和JavaScript构建跨平台应用的技术框架，兼容 Mac、Windows 和 Linux。虽然B/S是目前开发的主流，但是C/S仍然有很大的市场需求。受限于浏览器的沙盒限制，网页应用无法满足某些场景下的使用需求，而桌面应用可以读写本地文件、调用更多系统资源，再加上Web开发的低成本、高效率的优势，这种方式越来越受到开发者的喜爱。
本文一步一步教你如何使用Electron5和vue-cli3，在完全保留vue开发web应用的习惯下，搭建桌面应用。
涉及技术资料：[Electron](electronjs.org/)、[vue](cn.vuejs.org/)、[vue-cli](cli.vuejs.org/zh/)

## 概况

> 搭建环境
node 12、vueCli

> 注意`SimulatedGREG/electron-vue`已经很久没有更新了，而且其生成的工程结构并不是vue-cli3。所以放弃使用。

> 使用cnpm加速下载

```JavaScript
<!-- npm有时下载速度很慢，可以安装cnpm，从国内淘宝镜像下载，执行以下命令： -->
npm install -g cnpm --registry=https://registry.npm.taobao.org
<!-- 以后npm直接替换成cnpm使用。 -->
```
> 安装/升级vue-cli3

```JavaScript
先执行以下命令，确认下本地安装的vue-cli版本：

vue -V

在写本文时，我使用的是3.8.4版本。

如果本地使用的是vue-cli2.x或者更早版本，可先卸载：

cnpm uninstall vue-cli -g

※注：vue-cli3使用了新的npm包名，与旧版本不一样。

如果还没有安装vue-cli3，先执行以下命令安装：

cnpm install @vue/cli -g

如果你已安装vue-cli3，但不是最新版本，可执行以下命令升级：

（我这里使用cnpm并没有完成升级，所以使用了npm）

npm update @vue/cli -g
```

## 搭建项目
### 创建vue项目

```JavaScript
<!-- 创建electron-vue-demo -->
vue create electron-vue-demo

<!-- 安装流程 -->
Vue CLI v3.8.4
? Please pick a preset: (Use arrow keys)
  default (babel, eslint) 
> Manually select features （自定义安装）

<!-- 这里选择了常用的模块，请根据实际需求进行选择。 -->
? Check the features needed for your project: (Press <space> to select, <a> to t
oggle all, <i> to invert selection)
❯◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
 ◉ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing

<!-- 如果选择了router，这里会询问是否使用history模式。 -->
? Use history mode for router? (Requires proper server setup for index fallback 
in production) (Y/n)  n

<!-- 选择CSS预处理模块，这里我们使用“Stylus”。 -->
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported 
by default): (Use arrow keys)
  Sass/SCSS (with dart-sass) 
❯ Sass/SCSS (with node-sass) 
  Less 
  Stylus 

? Pick a linter / formatter config: (Use arrow keys)
  ESLint with error prevention only 
  ESLint + Airbnb config 
❯ ESLint + Standard config (代码格式检查工具的配置)
  ESLint + Prettier 

<!-- 这里只选择“Lint on save”。 -->
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i
> to invert selection)
❯◉ Lint on save（保存代码的时候，进行格式检查）
 ◯ Lint and fix on commit（git commit的时候自动纠正格式）


<!-- 这里问把 babel, postcss, eslint 这些配置文件放哪？ -->
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? 
  In dedicated config files （表示独立文件）
❯ In package.json （放在package.json）

<!-- 是否为以后的项目保留这些设置？选择“N”。 -->
? Save this as a preset for future projects? (y/N) N

```

### 安装electron

```JavaScript
vue add electron-builder

? Choose Electron Version (Use arrow keys)
  ^7.0.0 
  ^8.0.0 
❯ ^9.0.0
```

### 注意

> win启动可能会等待很久

```JavaScript
INFO  Launching Electron...
Failed to fetch extension, trying 4 more times
Failed to fetch extension, trying 3 more times
Failed to fetch extension, trying 2 more times
...
```

> 启动开发环境 npm run electron:serve

## 配置项目


### 配置electron
```JavaScript
vue.config.js

const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  // 开发环境的服务
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',  
    port: 8080
  },
  // 别名 alias
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  }
};
```

### Vue使用electron


```JavaScript
<!-- 报错：Uncaught ReferenceError: __dirname is not defined -->
module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true <!-- 是否启用node功能 -->
    }
  }
}
```

### git忽略规则

```
.gitignore

.DS_Store
dist/electron/*
dist/web/*
build/*
!build/icons
!build/installer.nsh
coverage
node_modules/
npm-debug.log
npm-debug.log.*
thumbs.db
!.gitkeep
yarn-error.log
docs/dist/
# local env files
.env.local
.env.*.local
dist_electron/
test.js
```

### webview与渲染进程renderer间通信

```JavaScript
与渲染进程之间的通信不同，渲染进程与webview之间的通信，在webview层通过调用sendToHost方法来向渲染进程通信；而在渲染进程测通过webview提供的ipc-message事件来向webview通信。具体如下面代码所示：

// renderer环境，获取webview，然后注册事件
webview.addEventListener('ipc-message', (event) => {
  // 通过event.channel的值来判断webview发送的事件名
  if (event.channel === 'webview_event_name') {
    console.log(event.args[0]) // 123
  }
})
webview.send('renderer_event_name', '456')

// webview环境
const {ipcRenderer} = require('electron')
ipcRenderer.on('renderer_event_name', (e, message) => {
  console.log(message); // 456
  ipcRenderer.sendToHost('webview_event_name', '123')
})
```

## 资料

[手把手教你使用Electron5+vue-cli3开发跨平台桌面应用](https://juejin.im/post/6844903878429769742#heading-26)
[vue-electron案例](https://github.com/Howie126313/vue-electron)


## 通过协议唤起Electron应用
采用协议通过浏览器访问，`myapp://startapp/here?a=1&b=2`，系统会去找到已经注册了 myapp 这个协议的应用，然后把 URL 当做参数传过去。

```JavaScript
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


## 通信原理

### 主进程和渲染进程
在开始下面的步骤之前，很有必要简单了解下Electron的应用架构。

主进程
Electron 运行 package.json 的 main 脚本（background.js）的进程被称为主进程。 在主进程中运行的脚本通过创建web页面来展示用户界面。 一个 Electron 应用总是有且只有一个主进程。

渲染进程
由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它自己的渲染进程中。

在普通的浏览器中，web页面通常在一个沙盒环境中运行，不被允许去接触原生的资源。 然而 Electron 的用户在 Node.js 的 API 支持下可以在页面中和操作系统进行一些底层交互。

主进程与渲染进程的关系
主进程使用 BrowserWindow 实例创建页面。 每个 BrowserWindow 实例都在自己的渲染进程里运行页面。 当一个 BrowserWindow 实例被销毁后，相应的渲染进程也会被终止。

主进程管理所有的web页面和它们对应的渲染进程。 每个渲染进程都是独立的，它只关心它所运行的 web 页面。

具体可参阅官方文档： electronjs.org/docs/tutori…

### 创建窗口

```
function createWindow () {
  // 创建窗口
  win = new BrowserWindow({
    width: 1200,
    height: 620,
    webPreferences: {
      // 取消跨域限制
      webSecurity: false,
      <!-- 启用node功能 -->
      nodeIntegration: true
    }
  })
}
```


3.4 取消菜单栏
在我们生成的桌面APP中，我们可以看到默认的菜单栏。

在windows中，菜单栏在APP窗口内的顶部；在macOS中，菜单栏位于电脑屏幕顶部。

为了方便项目将来也能直接生成纯web应用，尽量把APP的全部功能都做到渲染进程里，这里我们取消菜单栏。

由于macOS的特殊性，顶部菜单栏无法删除，所以我们针对macOS特殊处理，把菜单栏只保留“关于”和“退出”。

修改background.js：

M   import { app, protocol, BrowserWindow, Menu } from 'electron'
    ...
    function createWindow () {
        ...
        win.on('closed', () => {
            win = null
        })
        
+       createMenu()
    }
    
+   // 设置菜单栏
+   function createMenu() {
+       // darwin表示macOS，针对macOS的设置
+       if (process.platform === 'darwin') {
+           const template = [
+           {
+               label: 'App Demo',
+               submenu: [
+                   {
+                       role: 'about'
+                   },
+                   {
+                       role: 'quit'
+                   }]
+           }]
+           let menu = Menu.buildFromTemplate(template)
+           Menu.setApplicationMenu(menu)
+       } else {
+           // windows及linux系统
+           Menu.setApplicationMenu(null)
+       }
+   }


( ↑ windows界面菜单栏已消失 ↑)

( ↑ macOS界面菜单栏已简化” ↑)
macOS菜单栏名称label的“App Demo”会在build版本生效，dev版本会显示“Electron”

更多关于菜单栏设置，请参阅：electronjs.org/docs/api/me…

3.5 设置APP窗口图标
准备windows和macOS两版图标。

windows: app.ico 最小尺寸：256x256
macOS: app.png或app.icns 最小尺寸：512x512 （后续4.1章节用到）

把图标文件放到public/目录下，项目结构如下：

|- /dist_electron
  （略）
|- /public
   |- app.icns  <-- 本教程暂时未使用icns
   |- app.ico
   |- app.png
   |- favicon.ico
   |- index.html
|- /src
  （略）
|- .editorconfig    
|- .eslintrc.js
|- .gitignore
|- babel.config.js
|- package.json
|- package-lock.json
|- README.md

可以顺便把favicon.ico也修改一下，但是在桌面版APP上是用不到的。如果以后生成纯web项目才会用到。

修改background.js，让APP窗口应用图标：

    function createWindow () {
      // Create the browser window.
      win = new BrowserWindow({
        width: 1200,
        height: 620,
        webPreferences: {
          nodeIntegration: true
        },
+       // eslint-disable-next-line no-undef
+       icon: `${__static}/app.ico`
      })

这里的${__static}对应的是public目录

现在，Windows系统上可以看到开发环境的APP窗口图标已经生效了。

macOS图标请参照4.1章节，并且需要在build后才能生效。


( ↑ windows APP窗口及任务栏图标 ↑)

3.6 设置APP窗口标题栏名称
修改public/index.html:

我们把electron-vue-demo改为App Demo。

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link rel="icon" href="<%= BASE_URL %>favicon.ico">
M       <title>App Demo</title>
  </head>

4 build最终产品
这里我们已经集成了electron-builder工具，官方文档可以参阅：www.electron.build/

4.1 设置APP及安装包图标
在3.5章节，我们的图标生效于运行APP的窗口。本小节将生效于最终生成的可执行文件和安装包图标。需要准备的图标文件请回看3.5章节。

修改vue.config.js

    chainWebpack: config => {...},
+   pluginOptions: {
+       electronBuilder: {
+           builderOptions: {
+               win: {
+                   icon: './public/app.ico'
+               },
+               mac: {
+                   icon: './public/app.png'
+               }
+           }
+       }
+   }
    ...

运行build后的mac版本，可以看到图标都已生效了。


(↑ macOS APP Dock图标 ↑)
安装包和可执行文件的截图就不再放出了。

更多详细介绍，可参阅： www.electron.build/icons.html

4.2 设置APP名称
APP名称包括安装包中APP的名称、可执行文件的文件名。

修改vue.config.js:

    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                win: {
                    icon: './public/app.ico'
                },
                mac: {
                    icon: './public/app.png'
                },
+               productName: 'AppDemo'
            }
        }
    }

4.3 打包APP
执行以下命令，可以build工程：

```
npm run electron:build
```
最终在dist_electron目录下生成build后的产品。

windows版本
目录如下：
```
/dist_electron
|- /bundled
  （略）
|- /win-unpacked  <-- 绿色版
  （略）
|- AppDemo Setup 0.1.0.exe  <-- 安装文件
|- AppDemo Setup 0.1.0.exe.blockmap
|- builder-effective-config.yaml
|- index.js
```
这里其实就win-unpacked和AppDemo Setup 0.1.0.exe有用。

※注：在32位环境下打包生成的是32位APP，在64位环境下打包生成的是64位APP。

mac版本
```
/dist_electron
|- /bundled
  （略）
|- /mac
   |- AppDemo   <-- 绿色版
|- AppDemo-0.1.0-mac.zip  <-- 绿色版压缩包
|- AppDemo-0.1.0-mac.dmg  <-- 安装包
|- AppDemo-0.1.0.dmg.blockmap
|- builder-effective-config.yaml
|- index.js
```

4.4 可能出现的错误
我曾经在Win10 64bit 1809版本上build失败，保存信息中提示：

Error output:
Can't open output file
Error - aborting creation process

与此同时，在win7和win10 1803版本build正常。经研究，无果。后来把windows升级到1903版本，问题解决了。应该是vue-cli-plugin-electron-builder插件与系统之间的问题导致。

5 关于项目开发的一些经验
在完成以上章节后，后面基本可以完全按照web方式开发了。这里简单分享下一些小经验。

5.1 src目录结构参考
/src
|- /common
   |- /fonts
   |- /images
   |- /js
      |- api
      |- libs
   |- /stylus
   |- /components
   |- /base
   |- /modules
      |- /moduleA
      |- /moduleB
      ...
   |- /views
   |- App.vue
   |- background.js
   |- main.js
   |- router.js
   |- store.js

下面对部分重要目录简要说明：

common/ - 项目公用库
common/fonts/ - 字体文件
common/images/ - 公用图片
common/js/ - 公用js目录
common/js/api/ - 把api按类别封装成函数，并export出去，减少业务逻辑中的重复代码
common/js/lib/ - 存放一些公用函数库、定义的常量库等
common/stylus/ - Stylus样式文件
components/ - vue组件目录
component/base/ - vue基础组件，例如自定义的CheckBox、日期选择器、Dialog、Toaster、分页组件等
component/modules/ - vue模块
views/ - vue页面

5.2 换肤功能的实现
很多项目都有实时换肤的需求，在实际开发中，虽然我们使用了Sass、Less、Stylus等高端样式工具，但最终经过编译还是要回归到最原始的CSS。换肤的本质还是实时替换皮肤样式文件。

失败案例
以Stylus为例，抽象出皮肤文件skin.styl:

$color-bg = #fff
$color-text = #333

在业务样式中引用：

@import 'skin.styl'

body
 background: $color-bg
 color: $color-text

当经过编译后，生成的css为：

body {background: #fff; color: #333;}

样式已经写死了，无法换肤。

那么应该怎么做呢？

成功案例
项目根目录下的public目录是静态目录，也就是说在build最终产品的时候，它里面的文件将原封不动保留。所以，可以将皮肤文件放在这里。

|- /public
+  |- /skin
+     |- /skin01
+        |- skin.css
+     |- /skin02
+        |- skin.css     
   |- app.icns
   |- app.ico
   |- app.png
   |- favicon.ico
   |- index.html


由于Electron的是基于chromium内核，所以不用担心代码的浏览器兼容问题。接下来就是发挥CSS3变量var(--*)的时候了。

public/skin/skin01/skin.css：

:root {
    --color-bg: #fff;
    --color-text: #333;
}

public/skin/skin02/skin.css：

:root {
    --color-bg: #263238;
    --color-text: #b2ccd6;
}

修改src/App.vue：

    ...
    <style lang="stylus">
+   body
+     background: var(--color-bg)
+     color: var(--color-text)
    #app
      font-family 'Avenir', Helvetica, Arial, sans-serif
      -webkit-font-smoothing antialiased
      -moz-osx-font-smoothing grayscale
      text-align center
M     color: var(--color-text)
    
    #nav
      padding 30px
      a
        font-weight bold
M       color: var(--color-text)
        &.router-link-exact-active
          color #42b983
    </style>

在public/index.html引入皮肤样式，注意加上id="app-skin"：

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link rel="icon" href="<%= BASE_URL %>favicon.ico">
+       <link rel="stylesheet" href="<%= BASE_URL %>skin/skin01/skin.css" id="app-skin">
        <title>App Demo</title>
  </head>

篇幅有限，这里就不写通过js修改皮肤的代码了。通过调试工具手动修改skin的css路径，可看到换肤效果：


( ↑ skin01浅色皮肤 ↑)

( ↑ skin02深色皮肤 ↑)
5.3 从Electron4.x升级到5.x
如果你之前用的是Electron4.x，升级到5.x很简单。

修改package.json中electron的版本(写作本文时是5.0.6)：

    ...
M   "electron": "^5.0.6",
    ...

修改background.js中的这部分：

// Scheme must be registered before the app is ready
// Electron 4.x代码
// protocol.registerStandardSchemes(['app'], {secure: true})
// Electron 5.x代码
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

然后执行，等待升级安装完成：

cnpm install

以上就是 Electron5 + vue-cli3 的构建跨平台应用的全部分享内容。如果有其他问题，欢迎一起交流。

### 注册快捷键打开devTools
在Electron中打开devTools是通过主线程中调用win.webContents.openDevTools()实现的。以上教程仅在开发环境初始启动的时候打开devTools，但是一旦关闭就不能再打开了。下面讲一下怎么通过快捷键打开devTools。


```
background.js:

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

### 配置

```
// vue.config.js

// 路径获取
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  // 开发环境的服务
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',  
    port: 8080
  },
  // 别名 alias
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src/renderer'))
      .set('~', resolve('src'))
      .set('root', resolve('./'))
      .set('#', resolve('src/universal'))
  },
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: 'picgo://./',
      externals: ['picgo'],
      chainWebpackMainProcess: config => {
        config.resolve.alias
          .set('@', resolve('src/renderer'))
          .set('~', resolve('src'))
          .set('root', resolve('./'))
          .set('#', resolve('src/universal'))
          .set('apis', resolve('src/main/apis'))
          .set('@core', resolve('src/main/apis/core'))
      },
      builderOptions: {
        productName: 'PicGo',
        appId: 'com.molunerfinn.picgo',
        publish: [
          {
            provider: 'github',
            owner: 'Molunerfinn',
            repo: 'PicGo',
            releaseType: 'draft'
          }
        ],
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ]
        },
        mac: {
          icon: 'build/icons/icon.icns',
          extendInfo: {
            LSUIElement: 1
          }
        },
        win: {
          icon: 'build/icons/icon.ico',
          target: 'nsis'
        },
        nsis: {
          shortcutName: 'PicGo',
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        linux: {
          icon: 'build/icons/'
        },
        snap: {
          publish: ['github']
        }
      }
    }
  }
}

```

### 配置ESLint代码格式检查工具

```
.eslintrc.js 用于ESlint检测

module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // deBug开关
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 不检测语句末尾的分号
    'semi': ['off', 'always'],
    // 强制缩进为2个空格
    'indent': ['error', 2],
    // 关闭函数名称跟括号之间的空格检测
    'space-before-function-paren': 0,
    // 忽略大括号内的空格
    'object-curly-spacing': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
```

```
.editorconfig 用于IDE自动格式化代码

[*.{js,jsx,ts,tsx,vue}]
indent_style = space   <--这里定义缩进类型是空格还是tab
indent_size = 2        <--这里需要与.eslintrc.js的indent对应
trim_trailing_whitespace = true
insert_final_newline = true
```

[配置需求](https://cloud.tencent.com/developer/doc/1078)




## 扩展

### 启动白屏优化

> 白屏原因

窗口显示到页面渲染完成的时间差
```Mermaid
graph TB
    subgraph A1 [应用启动]
    api1( app.on < will-finish-launching )
    end
    subgraph A2 [初始化完成]
    api2(app.on < ready )
    end
    subgraph A3 [窗口建立]
    api3(app.on < browser-window-created )
    end
    subgraph A4 [窗口显示]
    api4(app.on < show )
    end
    subgraph A5 [页面渲染]
    api5(app.on < web-contents-created )
    end
    api1 --> api2
    api2 --> |创建窗口|api3
    api3 --> |白屏问题所在|api4
    api4 --> |白屏问题所在|api5
```

> 隐藏窗口

在加载页面时，渲染进程第一次完成绘制时，会发出`ready-to-show`事件 。 在此事件后显示窗口将没有视觉闪烁

```javascript
mainWindow = new BrowserWindow({
  ...
  // 先隐藏
  show: false
})
mainWindow.on('ready-to-show', function () {
  // 初始化后再显示
  mainWindow.show()
})
```

> 初始化骨架图

采用新建view去遮罩内容的显示，等待显示完成加载出来

```Mermaid
graph TB
  subgraph A1[页面渲染]
  api1(窗口创建)
  api2(窗口显示)
  api1 --> |白屏问题|B3(BrowserWindow) --> api2
  api1 --> |静态页面 < 1s|show(B1加载完成) --> |窗口显示|B1(BrowserWindow) --> api2
  api1 --> |vue渲染时间|show1(view加载完成) --> |优化|BrowserView --> B2(BrowserWindow) --> api2
  end
```

```javascript
function createWindow() {
  win = new BrowserWindow({
    // 隐藏窗口
    show: false,
    // 背景透明
    transparent: true,
    // mac标题栏
    titleBarStyle: 'hiddenInset',
    // 隐藏标题栏
    frame: false,
  })
  // 创建View遮罩
  const view = new BrowserView({})
  win.setBrowserView(view)
  view.setBounds({ x: 0, y: 0, width: 1050, height: 700 })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    view.webContents.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/loading.html')
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    view.webContents.loadURL('app://./loading.html')
    win.loadURL('app://./index.html')
  }
  // 显示窗口
  view.webContents.on('dom-ready', () => {
    console.log('dom-ready', new Date())
    win.show()
  })
  // 关闭遮罩
  ipcMain.on('stop-loading-main', () => {
    win.removeBrowserView(view)
  })
}
```

view.webContents.on('dom-ready' > win.on('ready-to-show' 优先级大只会执行前者



### 安装程序优化

#### dmg背景图片设置
#### dmg图标生成
#### win图片设置
#### win安装包流程
#### win安装包优化