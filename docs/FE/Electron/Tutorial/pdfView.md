vadsf


# Electron

## view

```js
<template lang="pug">
  .detailBox
    PDFView(v-if="pdfLoad" :url=" loadURL + 'pdf-detail/web/viewer.html?language=' + language + (fileUrl ? '&file=' + fileUrl : '')")
</template>

<script>
  export default {
    data() {
      return {
        fileUrl: '',
        pdfLoad: false
      }
    },
    mounted() {
      this.getFileUrl(this.$route.query)
    },
    methods: {
      getFileUrl(fileObj) {
        // 发送文件路径
        ipcSend('ipcGetFileObj', `${fileObj.pathImage}${fileObj.id}.info/${fileObj.name}.${fileObj.ext}`)
        // 获取字节流数据
        ipcOn('ipcGetFileObj-reply', (event, UintArray) => {
          const files = new File([UintArray], fileObj.name, {
            type: 'application/pdf'
          })
          this.fileUrl = this.getObjectURL(files)
          this.pdfLoad = true
        })
      },
      getObjectURL(file) {
        let url = null
        if (window.createObjectURL !== undefined) {
          // basic
          url = window.createObjectURL(file)
        } else if (window.webkitURL !== undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(file)
        } else if (window.URL !== undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(file)
        }
        return url
      }
    }
  }
</script>

// 获取本地文件信息
ipcMain.on('ipcGetFileObj', (event, files) => {
  // logger.debug('manager', 'ipcGetFileObj', files)
  fs.readFile(files, (err, data) => {
    event.reply('ipcGetFileObj-reply', data)
  })
})
```

## 本地index

```js
<template lang="pug">
  .detailBox
    iframe(v-if="pdfLoad" :src="'pdf-detail/web/viewer.html?language=' + language + (fileUrl ? '&file=' + fileUrl : '')" style="width: 100%;height: 500px;border: none;")
</template>
```

```js
this.pdfDetails.loadURL(`file://${__static}/pdf-detail/web/viewer.html?language=zh-CN&file=/Users/luuman/Downloads/Photoshop/Photoshop.library/images/KQ0B09NAZAVCM.info/算法.pdf`)
```


## 本地图片读取，协议

```js
// 本地图片读取，协议 files://
protocol.interceptFileProtocol('files', (req, callback) => {
  const url = req.url.substr(8)
  callback(decodeURI(url))
}, (error) => {
  if (error) {
    console.error('Failed to register protocol')
  }
})
```