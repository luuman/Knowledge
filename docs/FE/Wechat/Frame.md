# 框架优化

## 引用绝对路径
```javascript
App({
  // 绝对路径
  require (url) {
    return require(url)
  },
})
```

```javascript
const {require} = getApp()
const $API = require('utils/api')
```