# NPM
NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：

## 使用
```node
npm -v
<!-- 旧版本NPM升级MAC -->
sudo npm install npm -g
<!-- 旧版本NPM升级Win -->
npm install npm -g
<!-- 安装模块<Module Name> -->
npm install <Module Name>
<!-- 本地安装不写入 -->
npm install express
<!-- 本地安装指定版本 -->
npm install express@4.3
<!-- 本地安装写入 -->
npm install express --save
<!-- 全局安装 -->
npm install express -g
```
### 简写
```node
npm install <=> npm i
<!-- 项目（运行时、发布到生产环境时）依赖 -->
--save   <=> -S
<!-- 工程构建（开发时、“打包”时）依赖 -->
--save-dev  <=> -D
npm run start <=> npm start
```

### 错误提示
```node
npm err! Error: connect ECONNREFUSED 127.0.0.1:8087 
<!-- 解决办法为 -->
npm config set proxy null
```
### 查看安装信息
```node
<!-- 全局安装 -->
npm list -g
<!-- 某个模块的版本号 -->
npm list grunt
```
### 卸载模块
```node
<!-- 卸载 Node模块 -->
npm uninstall express
<!-- 某个模块的版本号 -->
npm ls
```
### 更新模块
```node
npm update express
```
### 搜索模块
```node
npm search express
```

## 创建模块
```node
npm init
```

## 发布NPM
### 注册
[NPM](https://www.npmjs.com)
### 登录
```node
npm login
<!-- 验证登录是否成功 -->
npm who am i
```
### 发布npm包
```node
<!-- 发布包 -->
npm publish
<!-- 删除要用force强制删除。超过24小时就不能删除了。自己把握好时间。 -->
npm --force unpublish testxxxxx
<!-- 可以通过 .gitignore 或 .npmignore 文件忽略 -->
```
