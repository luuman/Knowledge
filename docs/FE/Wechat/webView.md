## 概况
web-view 组件是一个可以用来承载网页的容器，会自动铺满整个小程序页面。个人类型与海外类型的小程序暂不支持使用。
属性：src 是String类型，是一个网站的url，默认值是none，webview 指向网页的链接。需登录小程序管理后台配置域名白名单。

[webView文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)

### 固定指向
```wx
<!--微信小程序index.wxml-->
<web-view src="https://www.google.com/"></web-view>
```

## 创建view壳
  ├── view.wxml
  └── view.js

### view.wxml
```wx
<!--pages/view/view.wxml-->
<web-view src="{{src}}#wechat_redirect" id="view" bindload="fnViewLoad" bindmessage="viewMessage"></web-view>
<!-- bindload 首次加载 -->
```

### view.js

```javascript
wx.navigateTo({
  url:`/pages/view/view?url=${encodeURIComponent(`personal/vips`)}`
})
// pages/view/view.js

// 动态修改不同环境URL
const { baseUrl } = require('../../env')

Page({
  data: {
    baseUrl,
  },
  onLoad: function(options){
    // 地址过滤
    options.url ? this._getViewSrc(options.url) : wx.navigateBack({delta: 2});
  },
})
```

### 动态设置顶栏

```javascript
// url 通常为转码后的地址
setBarTitle (url) {
  let weChatSet = {
    farmers: {
      title: 'title',
      color: '#FFF'
    }
  }
  wx.setNavigationBarTitle({title: weChatSet[url].title})
  wx.setNavigationBarColor({backgroundColor: '#ffffff', frontColor: weChatSet[url].color})
}
```

### 地址过滤
地址参数必须encodeURIComponent加密才可以传输
```javascript
_getViewSrc (url) {
  let src = `${this.data.baseUrl}/${decodeURIComponent(url)}`
  src += decodeURIComponent(url).includes("?") ? `&isMiniProgram=true` : `?isMiniProgram=true`
  if (wx.getStorageSync("token")) src += `&token=${wx.getStorageSync("token")}`
  src = src.replace(/([\u4e00-\u9fa5]+)/g, dest => encodeURIComponent(dest))
  this.setData({src})
}
```

### 分享页面配置
onShareAppMessage

```javascript
onShareAppMessage (e) {
  let url = e.webViewUrl.split(this.data.baseUrl + '/')[1].split('&').filter(item => !item.includes('token')).join('&');
  let url = e.webViewUrl.split(this.data.baseUrl + '/')[1].replace(/$/g, '&').replace(/token=[^]+?[$|&]/g, '').replace(/&$/g, '')
  let shareId = getApp().globalData.shareId ? getApp().globalData.shareId : '';
  return {
    path: `/pages/view/view?url=${encodeURIComponent(url)}&shareId=${shareId}`
  }
}
```

### 页面消息透传

```javascript
viewMessage (e) {}
```

### 空白的页面
从webview页面返回小程序页面（导航栏返回），会先出现一个空白页面，然后再次点击返回才能到小程序页面。（两次点击）

1. 这个问题大概就是，默认过来`src`的值是空，导致页面第一页为空页面，然后进入到正确的页面。
1. 请升级微信客户端到 6.5.16

### web-view采坑

1. 打开的域名没有在小程序管理后台设置业务域名（注意是业务域名，不是服务器域名）
1. 打开的页面必须为https服务
1. 打开的页面302过去的地址也必须设置过业务域名
1. web-view空白问题，请升级微信客户端到 6.5.16
1. 页面可以包含iframe，但是iframe的地址必须为业务域名
1. web-view不支持支付能力，web-view的API能力见web-view的文档说明
1. 开发者自己检查自己的https服务是否正常，测试方法：普通浏览器打开对应的地址
1. 如果web-view使用了公众号授权的服务，开发者工具提示网页开发者的问题，请见：公众号开发
1. 关于小程序和web-view的通信，`<web-view/>` → 小程序只能通过JSSDK 1.3.0提供的接口返回小程序页面，设置参数来传值，反之，小程序到webview也是一样的，只能是src的路径带上参数


## H5回调小程序

### 如何从H5回到小程序
wx.miniProgram.navigateTo
```javascript
import wx from '~/utils/sdk-wechat.js'

wx.miniProgram.navigateTo({
  url: `/pages/login/login?url=${encodeURIComponent(url)}`
})
wx.miniProgram.navigateBack({
  url: `/pages/login/login?url=${encodeURIComponent(url)}`
})
wx.miniProgram.switchTab({
  url: `/pages/login/login?url=${encodeURIComponent(url)}`
})
wx.miniProgram.reLaunch({
  url: `/pages/login/login?url=${encodeURIComponent(url)}`
})
wx.miniProgram.redirectTo({
  url: `/pages/login/login?url=${encodeURIComponent(url)}`
})
```

### 环境检测

```javascript
wx.miniProgram.getEnv(res => {
  if (res.miniprogram) console.log('miniProgram')
})
```

### 向小程序发送消息
对消息组件进行封装，添加支付，弹窗，提示，分享等原生接口。
```javascript
share () {
  // 向小程序发送消息
  let postData = {
    url: window.location.href,
    title: Response.username + ":" + Response.title,
    image: Response.image
  };
  wx.miniProgram.postMessage({ data: JSON.stringify(postData) });
},
```
`postMessage`需要配合`bindmessage`使用

### 信息传递Token

```javascript
```
