
# Notification

# 系统消息提醒
技术点：Nof、图片缓存（fs）

## 不支持随机图片
```js
/**
 * @通知
 * option: { name, messages, icon }
 */
onNotification() {
  // 设置APP Modle ID
  app.setAppUserModelId(Pkg.name)
  // 监听发送请求
  ipcMain.on('ipcNotification', (event, option) => {
    if (!this.appManager.store.get('isMsgInfo')) {
      const { name, messages, icon } = option
      logger.debug('ipc', 'Notification', name, messages, icon)
      let notification = new Notification({
        // 标题
        title: name,
        // 内容
        body: messages.length > 20 ? messages.substr(0, 20) + '...' : messages,
        // 副标题
        subtitle: 'IM',
        // 图片
        icon: `${__static}/516x516.png`,
        silent: false
      })
      notification.show()
      notification.on('click', () => {
        notification.close()
        event.reply('ipcNotification-reply', option)
      })
    }
  })
}
```

> 区别

1. MAC 可以显示subtitle、应用图标、不显示ModelID
1. Win 不显示subtitle、显示ModelID

## 随机图片通知

```js
import cacheImg from '@/main/plugins/cacheImg'

onNotification() {
	app.setAppUserModelId(Pkg.name)
	this.cacheImgIcon = new cacheImg()
	ipcMain.on('ipcNotification', (event, option) => {
		if (!this.appManager.store.get('isMsgInfo')) {
			const { name, messages, icon } = option
			const iconName = this.cacheImgIcon.iconPathName(icon)
			logger.debug('ipc', 'Notification', name, messages, icon)
			// if (iconName.indexOf('.') !== -1) this.doneCacheImg(name, messages, icon)
			// else this.Notifi(name, messages, `${__static}/516x516.png`, event, option)
			this.doneCacheImg(name, messages, icon, event, option)
		}
	})
}

async doneCacheImg(name, messages, icon, event, option) {
	const isIconDone = await this.cacheImgIcon.exists(icon)
	let iconPath = this.cacheImgIcon.PathNames
	if (!isIconDone) {
		this.cacheImgIcon.init(icon).then(() => {
			logger.debug('ipc', 'cacheImg end', 'File succesfully downloaded')
			this.Notifi(name, messages, iconPath, event, option)
		}).catch((error) => {
			logger.debug('ipc', 'cacheImg request error', error)
			this.Notifi(name, messages, `${__static}/516x516.png`, event, option)
		})
	} else {
		this.Notifi(name, messages, iconPath, event, option)
	}
	logger.debug('ipc', 'cacheImg Path:', isIconDone ? '缓存' : '新建')
}

Notifi(name, messages, icon, event, option) {
	let notification = new Notification({
		title: name,
		body: messages.length > 20 ? messages.substr(0, 20) + '...' : messages,
		// subtitle: 'IM',
		icon: icon,
		silent: false
	})
	notification.show()
	notification.on('click', () => {
		notification.close()
		event.reply('ipcNotification-reply', option)
	})
}
```

### 优化版本（mac ok win 不支持待测试 -> win无法删除图片所致）

```js
// 创建监听
onNotification() {
  app.setAppUserModelId(Pkg.name)
  // 实例化
  this.cacheImgIcon = new cacheImg()
  ipcMain.on('ipcNotification', (event, option) => {
    // 是否消息免提
    if (!this.appManager.store.get('isMsgInfo')) {
      logger.debug('ipc', 'Notification', option.icon)
      // 应对图片问题处理
      // if (this.cacheImgIcon.PathNames.indexOf('.') !== -1) this.doneCacheImg(event, option)
      // else {
      //   option.icon = `${__static}/516x516.png`
      //   this.Notifi(event, option)
      // }
      this.doneCacheImg(event, option)
    }
  })
}

async doneCacheImg(event, option) {
  const iconUrl = option.icon
  // 图片是否缓存
  const isIconDone = await this.cacheImgIcon.exists(iconUrl)
  // 图片路径
  option.icon = this.cacheImgIcon.PathNames
  if (!isIconDone) {
    this.cacheImgIcon.init(iconUrl).then(() => {
      logger.debug('ipc', 'cacheImg end', 'File succesfully downloaded')
      this.Notifi(event, option)
    }).catch((error) => {
      // 下载失败
      logger.debug('ipc', 'cacheImg request error', error)
      option.icon = `${__static}/516x516.png`
      this.Notifi(event, option)
    })
  } else {
    this.Notifi(event, option)
  }
  logger.debug('ipc', 'cacheImg Path:', isIconDone ? '缓存' : '新建')
}

Notifi(event, option) {
  const { name, messages, icon } = option
  let notification = new Notification({
    title: name,
    body: messages.length > 20 ? messages.substr(0, 20) + '...' : messages,
    // subtitle: 'IM',
    icon,
    silent: false
  })
  notification.show()
  notification.on('click', () => {
    notification.close()
    event.reply('ipcNotification-reply', option)
  })
}
```

```js
import logger from '@/main/plugins/logger.js'
import Pkg from '@/../package.json'
import { app } from 'electron'
const fs = require('fs')
const fsE = require('fs-extra')
const request = require('request')
const path = require('path')

export default class cacheImg {
  constructor(argement) {
		// 图片地址
    this.PathNames = ''
		// 应用名称
    const updaterCacheDirName = Pkg.name
		// 缓存地址
    this.updatePendingPath = path.join(app.getPath('cache'), updaterCacheDirName, 'cacheImg')
    logger.debug('ipc', 'cacheImg Path:', this.updatePendingPath)
		// 初始化文件夹
    fsE.ensureDir(this.updatePendingPath, () => {})
  }

  // 检测文件是否缓存
  exists(icon) {
    return new Promise((resolve) => {
      this.PathNames = `${this.updatePendingPath}/${this.iconPathName(icon)}`
      fsE.exists(this.PathNames, (exists) => {
        resolve(exists)
      })
    })
  }

  // 生成文件名
  iconPathName(icon) {
    let pathName = ''
    if (icon.indexOf('filename') !== -1) {
      pathName = icon.split('=')[1] + '.png'
      return pathName
    } else {
      if (icon.indexOf('?') !== -1) pathName = icon.split('?')[0].split('/')
      else pathName = icon.split('/')
      return pathName[pathName.length - 1]
    }
  }

  // 删除失败文件
  delete() {
    fs.unlinkSync(this.PathNames)
  }

  // 下载图片
  init(fileUrl) {
    return new Promise((resolve, reject) => {
      logger.debug('ipc', 'cacheImg init', fileUrl)
			// request为异步操作，不会影响文件创建
      const req = request({ method: 'GET', uri: fileUrl }, (error, response, body) => {
        if (error) {
          this.delete()
          reject(error)
          logger.debug('ipc', 'cacheImg  req pipe error')
        }
      })
      logger.debug('ipc', 'cacheImg  req pipe')
      const out = fs.createWriteStream(this.PathNames)
      req.pipe(out)
      req.on('response', function (data) {})
      req.on('data', function (chunk) {})
      req.on('end', function () {
        logger.debug('ipc', 'cacheImg end', 'File succesfully downloaded')
        resolve()
      })
    })
  }
}
```


## 修改init
1. 思考修改成同步任务（失败）
1. 修改名称（失败）最终推测原因是：win文件未下载成功无法修改
1. 拦截报错无效