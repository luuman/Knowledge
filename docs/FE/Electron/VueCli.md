# Electron9 + vue-cli3

# 资料：
1. [Electron](electronjs.org/)
1. [vue](cn.vuejs.org/)
1. [vue-cli](cli.vuejs.org/zh/)

# 环境

## 基本环境
node 12、vueCli

> 注意`SimulatedGREG/electron-vue`已经很久没有更新了，而且其生成的工程结构并不是vue-cli3。所以放弃使用。

### 搭建环境

#### 使用cnpm加速下载

```js
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
#### 安装/升级vue-cli3

```js
// vue-cli版本：
vue -V
// 在写本文时，我使用的是v4.5.3版本。
// 如果本地使用的是vue-cli2.x或者更早版本，可先卸载：
cnpm uninstall vue-cli -g
// ※注：vue-cli3使用了新的npm包名，与旧版本不一样。
// 安装vue-cli3
cnpm install @vue/cli -g
// 升级
npm update @vue/cli -g
```

# 初始化项目
## 新建项目

```js
<!-- 创建electron-vue-demo -->
vue create electron-vue-demo

<!-- 安装流程 -->
Vue CLI v4.5.3
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

> 安装electron

```js
vue add electron-builder

? Choose Electron Version (Use arrow keys)
  ^7.0.0 
  ^8.0.0 
❯ ^9.0.0
```

## 启动

> 启动开发环境 npm run electron:serve

> win启动可能会等待很久

```js
INFO  Launching Electron...
Failed to fetch extension, trying 4 more times
Failed to fetch extension, trying 3 more times
Failed to fetch extension, trying 2 more times
...
```

# 项目配置

```js
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
## 配置

```js
// vue.config.js
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('ASSETS', resolve('src/assets'))
      .set('VIEWS', resolve('src/views'))
      .set('SVG', resolve('src/assets/svg'))
      .set('COMPONENTS', resolve('src/components'))
    // svg配置
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('svg-sprite-loader').loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  runtimeCompiler: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      // dll配置
      // externals: ['ffi-napi', 'ref-napi'],
      builderOptions: {
        // 协议
        // customFileProtocol: 'reworld://./',
        appId: 'com.reworld.app',
        // 项目名，也是生成的安装文件名，即aDemo.exe
        productName: 'Reworld',
        // 版权信息
        copyright: 'Copyright © 2019',
        directories: {
          // 输出文件路径
          // output: './dist'
        },
        publish: {
          provider: 'generic',
          url: ''
        },
        dmg: {
          window: {
            width: 540,
            height: 380
          },
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
        icon: './build/icons/icon.ico',
        files: ['**/*', 'static/*'],
        //     files: [
        //       {
        //         'filter': ['**/*']
        //       }
        //     ],
        asar: true,
        mac: {
          icon: './build/icons/icon.icns',
          target: ['zip', 'dmg']
        },
        // win相关配置
        win: {
          // 图标，当前图标在根目录下，注意这里有两个坑
          icon: './build/icons/icon.ico',
          // 利用nsis制作安装程序
          target: ['zip', 'nsis']
        },
        nsis: {
          // 是否一键安装
          oneClick: false,
          // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowElevation: true,
          // 允许修改安装目录
          allowToChangeInstallationDirectory: true,
          // 安装图标
          installerIcon: './build/icons/icon.ico',
          // 卸载图标
          uninstallerIcon: './build/icons/uninstall.ico',
          // 安装时头部图标
          installerHeaderIcon: './build/icons/icon.ico',
          // 创建桌面图标
          createDesktopShortcut: true,
          // 创建开始菜单图标
          createStartMenuShortcut: true
          //   license: './LICENSE.txt'
        }
      },
      extraFiles: ['./extensions/'],
      // 主进程
      mainProcessFile: 'src/main/index.js',
      // 进程监测
      mainProcessWatch: ['src/main'],
      mainProcessArgs: []
    }
  }
}


```

## 配置ESLint代码格式检查工具

```js
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



## git忽略规则

```
.gitignore

.DS_Store
dist/electron/*
dist/web/*
build/*
!build/icons
!build/installer.nsh
```


## 打包APP

```js
npm run electron:build
```

### windows版本

```
/dist_electron
|- /bundled
|- /win-unpacked
|- AppDemo Setup 0.1.0.exe
|- AppDemo Setup 0.1.0.exe.blockmap
|- builder-effective-config.yaml
|- index.js
```
### mac版本
```js
/dist_electron
// 编译
|- /bundled
|- /mac
   |- AppDemo
|- AppDemo-0.1.0-mac.zip
|- AppDemo-0.1.0-mac.dmg
|- AppDemo-0.1.0.dmg.blockmap
|- builder-effective-config.yaml
|- index.js
```

## 报错

```js
// 报错：Uncaught ReferenceError: __dirname is not defined
module.exports = {
  pluginOptions: {
    electronBuilder: {
      // 是否启用node功能
      nodeIntegration: true
    }
  }
}
```

### 从Electron4.x升级到5.x
如果你之前用的是Electron4.x，升级到5.x很简单。

```js
// 修改package.json中electron的版本(写作本文时是5.0.6)：
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
```

```js
npm install
```

# 优化

## 启动白屏优化

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

```js
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

```js
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

## 安装程序优化


### dmg背景图片设置
### dmg图标生成
### win图片设置
### win安装包流程
### win安装包优化


### webview与渲染进程renderer间通信

```js
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


### 换肤功能的实现
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
[Vue + Scss 动态切换主题颜色实现换肤](http://www.zyiz.net/tech/detail-131173.html)
[less实现换肤](https://segmentfault.com/a/1190000022685312?utm_source=tag-newest)
[vue中less实现换肤效果](https://zhuanlan.zhihu.com/p/163368987)
[Vue中如何使用sass实现换肤(更换主题)功能](https://blog.csdn.net/m0_37792354/article/details/82012278)
[换肤方案一: scss换肤](https://www.jianshu.com/p/24d8ad9267f8)
[使用 css/less 动态更换主题色（换肤功能）](https://www.cnblogs.com/leiting/p/11203383.html)
[]()
