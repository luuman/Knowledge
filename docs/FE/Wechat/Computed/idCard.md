## 身份证上传
https://blog.csdn.net/u011043997/article/details/85251571
imgType: 0 正面；1 反面
submit 成功回调
isCardNo 是否显示

```wxml
<id-card show_condition="{{isCardNo}}" imgType="{{imgType}}" bind:submit="submit"></id-card>
```

cover-view 

```wxml
<!-- 摄像头自定义 -->
<view class="my-camera-box animated {{show_condition ? '' : ' bounceIn'}}" wx:if='{{show_condition}}'>
  <view class='index-hd' id='camera_index'>
    <camera mode="normal" device-position="back" flash="off" frame-size='large' resolution='high' binderror="error" style="width:{{cwidth}}px; height:{{cheight}}px;">
      <cover-view class="controls">
        <cover-image wx:if="{{objectKey == zhengMIAN}}" class="img" src="{{outImg[imgType]}}" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 261px;height: 413px;"  />
      </cover-view>
    </camera>
    <cover-view class="btn-box" style="width: {{cwidth}}px; height: {{cheight}}px;">
    	<button type='dark' size='default' bindtap='back_index' class='upload_btn3'>返回</button>
	  	<button type='dark' size='default' bindtap='take_photo' class='upload_btn'>拍照</button>
    </cover-view>
  </view>
  <!-- 图片裁剪 -->
	<canvas class="no-canvas" style="marginTop:500px;width:{{cwidth}}px; height:{{cheight}}px;background:#ccc" canvas-id="firstCanvas"></canvas>
	<!-- 图片变形 -->
	<canvas class="no-canvas" style="marginTop:500px;width:{{imgH}}px; height:{{imgW}}px;background:#ccc" canvas-id="secondCanvas"></canvas>
</view>
```

```js
Component({
  properties: {
    // 开启
    show_condition: {
      type: Boolean,
      value: true,
    },
    // 身份证类型
    imgType: {
      type: String,
      value: 'one',
    }
  },
  data: {
    outImg: ['./card/front.png', './card/back.png'],
    imgW: 261,
    imgH: 413
  },
  created () {
  },
  ready () {
    this.initCamera()
  },
  methods: {
    // 初始化
    initCamera () {
      this.initHeight(this.data.imgW, this.data.imgH)
      const myCamera = wx.createCameraContext();
      const cameraFirstCanvas = wx.createCanvasContext('firstCanvas', this)
      const cameraSecondCanvas = wx.createCanvasContext('secondCanvas', this)
      this.setData({
        myCamera,
        cameraFirstCanvas,
        cameraSecondCanvas
      })
    },
    // 设置尺寸
    initHeight(imgW = 200, imgH = 400) {
      // 默认传进来的图片 在 屏幕的中间
      // imgW 传进来的图片的宽
      // imgW 传进来的图片的高
      // 图片的尺寸必须在 手机屏幕尺寸的范围内
      let cwidth = wx.getSystemInfoSync().windowWidth
      let cheight = wx.getSystemInfoSync().windowHeight
      if (imgW > cwidth) {
        wx.showModal({
          content: '图片的宽必须小于手机屏幕的宽',
        })
        return
      }
      if (imgH > cheight) {
        wx.showModal({
          content: '图片的高必须小于手机屏幕的高',
        })
      }
      // cwidth 是整个屏幕的宽
      // cheight 是整个屏幕的高
      //  canvasx 截取图片 画布的x轴坐标
      //  canvasy 截取图片 画布的y轴坐标
      let canvasx = parseInt((cwidth - imgW) / 2)
      let canvasy = parseInt((cheight - imgH) / 2)
      this.setData({
        cwidth,
        cheight,
        canvasx,
        canvasy
      })
    },
    // 截屏
    take_photo() {
      let imgW = this.data.imgW
      let imgH = this.data.imgH
      const myCamera = this.data.myCamera
      const cameraSecondCanvas = this.data.cameraSecondCanvas
      var that = this;
      myCamera.takePhoto({
        quality: 'high',
        frameSize: 'large',
        success: function(res) {
          wx.showLoading({
            title: '图片生成中',
          })
          that.setData({
            //返回的是单张
            tempFilePaths: res.tempImagePath,
          });
          that.size_photo(imgW, imgH, res.tempImagePath)
        },
        fail: (res) => {
          console.log('idCard', res)
        }
      })
    },
    // 裁切
    size_photo (imgW, imgH, tempImagePath) {
      var that = this;
      const cameraFirstCanvas = this.data.cameraFirstCanvas
      // 返回拍好的路径
      // canvas画图
      // 拍照的时候 是手机屏幕多大 就可以拍到多少范围
      // 所以是 0，0 点
      // 到 手机屏幕的宽高
      cameraFirstCanvas.drawImage(tempImagePath, 0, 0, that.data.cwidth, that.data.cheight)
      // canvas 开始截取
      // x: 截取区域开始的x轴坐标
      // y:截取区域开始的y轴坐标 
      // width: 截取区域图片的宽
      // height: 截取区域图片的高
      cameraFirstCanvas.draw(false, function() {
        wx.canvasToTempFilePath({
          x: that.data.canvasx,
          y: that.data.canvasy,
          width: imgW,
          height: imgH,
          destWidth: imgW * 2,
          destHeight: imgH * 2,
          fileType: 'jpg',
          quality: 1,
          canvasId: 'firstCanvas',
          success(res) {
            that.scoll_photo(imgW, imgH, res.tempFilePath)
          },
          fail: function (res) {
            console.log('idCard', res)
          }
        }, that)
      })
    },
    // 旋转
    scoll_photo (imgW, imgH, tempFilePath) {
      console.log(imgW, imgH, tempFilePath)
      var that = this;
      const cameraSecondCanvas = wx.createCanvasContext('secondCanvas', this)
      cameraSecondCanvas.rotate(270 * Math.PI / 180)
      cameraSecondCanvas.drawImage(tempFilePath, -imgW, 0, imgW, imgH)
      cameraSecondCanvas.draw(false, function() {
        wx.canvasToTempFilePath({
          fileType: 'jpg',
          quality: 1,
          canvasId: 'secondCanvas',
          success(res) {
            that.triggerEvent('submit', {
              url: res.tempFilePath,
              type: that.data.imgType
            })
            wx.hideLoading()
            that.setData({
              show_condition: false
            })
          },
          fail: function (res) {
            console.log('idCard', res)
          }
        }, that)
      })
      that.setData({
        firstCanvasMiddleImg: tempFilePath
      })
    },
  },
  options: {
  },
})
```

```
/*相机*/
.my-camera-box{
  background: #FFF;
}
.index-hd {
  text-align: center;
  position: relative;
}
.controls {
  position: relative;
  display: flex;
  height: 100%;
}
.controls cover-image{
  border: none;
}
.btn-box {
  position: absolute;
  margin-top: -200rpx;
  z-index: 9999;
}
.no-canvas {
  /*opacity: 0;*/
  /* display: none; */
}
.red-btn {
  background-color: red;
  color: #fff;
  width: 368rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  margin: 0 auto;
}
.my-camera-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.photo{
  position: fixed;
  bottom: 3%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120rpx;
  height: 120rpx;
  border-radius: 120rpx;
  background: #f1a03c;
  z-index: 9999;
}
.photo .long{
  position: absolute;
  left: -19rpx;
  top: -17rpx;
  width: 156rpx;
  height: 156rpx;
  border-radius: 156rpx;
  margin-bottom: -19rpx;
  border: 6px solid #9e743a;
  opacity: 0.5;
}
.photo :before{
  content: '轻触拍照';
  position: absolute;
  left: 10rpx;
  top: -80rpx;
  color: #FFF;
}
.upload_btn{
  /*position: fixed;
  bottom: 3%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200rpx;
  height: 200rpx;
  border-radius: 200rpx;
  background: #f1a03c;*/
  /*opacity: 0;*/
}
.btn-box button{
  width: 40%;
  margin: 0 5%;
  float: left;
}
.btn-box .upload_btn{
  background: #444;
  color: #FFF;
}
.back{
  position: fixed;
  bottom: 3%;
  left: 25%;
  margin-bottom: 60rpx;
  transform: translate(-50%, -50%);
  width: 60rpx;
  height: 60rpx;
  border-radius: 120rpx;
  background: #f1a03c;
  z-index: 9999;
}
```
