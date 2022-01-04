# 加密解密
asar是特殊的代码格式，用于打包加密代码的需求。

## asar

### 用法

```js
// 安装
npm install asar -g
// 详情
asar --help
```

#### 加密
```js
asar pack <被打包的目录> app.asar
```

#### 解密
```js
asar extract app.asar <解压后的目录>
```

```js
asar extract-file app.asar main.js
```

## webpack加密


## JSC文件解密
读取jsc文件，然后 用JS_DecodeScript函数 得到JScript 对象, 然后将JScript转成BytecodeParser parser(cx, script);

```js
```

[NodeJs 通过bytenode加密](https://www.winnerpm.work/system/nodejs-%e9%80%9a%e8%bf%87bytenode%e5%8a%a0%e5%af%86/)