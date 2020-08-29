#组件开发

## 封装下拉框
```wxml
<picker-selects type="category_name" pickerList="{{educational_level}}" wx:if="{{educational_level.length}}" text="{{'政治面貌'}}" bind:traCheckedNum="checkNum"></picker-selects>
```

## input实现数据双向绑定
```wxml
<input type="number" bindinput="editInput" data-name="idCode" placeholder="请输入身份证号码" value="{{idCode}}"/>

editInput (e) {
  let {name} = e.currentTarget.dataset
  let value = e.detail.value
  this.data[name] = value
  this.setData({
    name: this.data[name]
  })
},
```

## 图片上传组件
```wxml
<update-img class="uploadPhoto" bind:backImg="backImg"></update-img>

backImg (e) {
  let img = e.detail
}
```

