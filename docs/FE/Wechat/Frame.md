# 框架优化

## 引用绝对路径
```js
App({
  // 绝对路径
  require (url) {
    return require(url)
  },
})
```

```js
const {require} = getApp()
const $API = require('utils/api')
```