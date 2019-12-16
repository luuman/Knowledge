# 常规问题

## HTML标签识别
```wxml
<rich-text nodes="{{content}}"></rich-text>
```

## 指定页面不显示导航栏
```json
"navigationStyle": "custom"
```

## 自定义placeholder颜色和样式

```wxml
<input type="text" placeholder="请输入" placeholder-style="color:#e2e2e2;"></input>
<input type="text" placeholder="请输入" placeholder-class="placeholderStyle"></input>
```

## 低版本授权兼容

```wxml
wx.getSetting({
  success(res) {
    console.log(res.authSetting)
  }
})
```



