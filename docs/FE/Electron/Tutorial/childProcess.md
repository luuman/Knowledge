## Win 子进程 

```js
import childProcess from 'child_process'
// 中文解码
import iconv from 'iconv-lite'
// 获取程序地址
import Store from 'electron-store'
```

### 检测软件信息
```js
export function checkPlayer() {
  return new Promise((resolve, reject) => {
    const encoding = 'cp936'
    const binaryEncoding = 'binary'
    // \\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ReworldLauncher   \\Classes\\DMQK
    childProcess.exec('REG QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\ReworldLauncher', { encoding: binaryEncoding }, (error, stdout, stderr) => {
      if (error) return reject(error)
      let result = iconv.decode(Buffer.from(stdout, binaryEncoding), encoding)
      result = result.split(/[(\r\n)\r\n]+/)
      const obj = {}
      result.forEach(item => {
        var kes = item.split('REG_SZ')
        var key = kes[0].replace(/\s+/g, '')
        var value = kes[1]
        if (value) {
          value = value.replace(/\s+/g, '')
          obj[key] = value
        } else if (key) {
          obj.exec = key
        }
      })
      resolve(obj)
    })
  })
}
```

### 是否启动
```js
export function startPlayer() {
  return new Promise((resolve, reject) => {
    const encoding = 'cp936'
    const binaryEncoding = 'binary'
    childProcess.exec('tasklist', { encoding: binaryEncoding }, (error, stdout, stderr) => {
      if (error) reject(error)
      const result = iconv.decode(Buffer.from(stdout, binaryEncoding), encoding)
      if (result.indexOf(process.env.VUE_APP_EXE) !== -1) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}
```

### 启动应用
```js
export function openPlayer(playerDocumention, parems) {
  logger.debug('exec', 'openPlayer 被调用')
  return new Promise((resolve, reject) => {
    logger.debug('exec', 'openPlayer -> playerDocumention: ', `start ${playerDocumention}/${process.env.VUE_APP_FILE}/${process.env.VUE_APP_EXE}.exe ${parems}`)
    console.log('playerDocumention', `start ${playerDocumention}/${process.env.VUE_APP_FILE}/${process.env.VUE_APP_EXE}.exe ${parems}`)
    const startChild = childProcess.exec(`start ${playerDocumention}/${process.env.VUE_APP_FILE}/${process.env.VUE_APP_EXE}.exe ${parems}`, (error, stdout, stderr) => {
      if (error) {
        logger.debug('exec', 'openPlayer childProcess.exec 报错 error： ', error)
        reject(error)
        return
      }
      logger.debug('exec', 'openPlayer childProcess.exec 启动应用成功 stdout： ', stderr, 'stderr: ', stderr)
      resolve(stdout, stderr)
    })
    // startChild.stdout.on('data', () => {
    //   logger.debug('exec', 'openPlayer stdout childProcess.exec 报错 error： ')
    // })
    // startChild.stderr.on('data', () => {
    //   logger.debug('exec', 'openPlayer stderr childProcess.exec 报： ')
    // })
  })
}
```

### 
```js
export function execOpenApp(parems) {
  const Stores = new Store()
  const pathFile = Stores.get('appPath')
  logger.debug('exec', 'execOpenApp 被调用')
	return new Promise((resolve, reject) => {
    if (!parems) {
      logger.debug('exec', 'null execOpenApp done')
      return 'null execOpenApp done'
    }
    startPlayer().then(res => {
      if (!res) {
        // play Player
        openPlayer(pathFile, parems).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      } else {
        // Task Kill Player
        childProcess.exec(`TASKKILL /F /IM ${process.env.VUE_APP_EXE}.exe /T`, (error, stdout, stderr) => {
          if (error) {
            logger.debug('exec', 'TASKKILL childProcess.exec 报错 error： ', error)
            reject(error)
            return
          }
          logger.debug('exec', 'TASKKILL childProcess.exec 启动应用成功 stdout： ', stderr, 'stderr: ', stderr)
          openPlayer(pathFile, parems).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      }
    })
	})
}
```
