# 浏览器储存机制

> 机制对比

API               | 操作 |   执行            |      容量    | 弃用 
------------------|------| ----------------| -------------|--
Cookies           | 同步 |  会阻塞主线程的执行 |  4KB         |                     
LocalStorage      | 同步 |  会阻塞主线程的执行 |  5MB~10MB    |                               
SessionStorage    | 同步 |  会阻塞主线程的执行 |  5MB~10MB    |                                    
IndexedDB         | 异步 |不会阻塞主线程的执行 |  几百兆以上    |                             
Web SQL           | 异步 |不会阻塞主线程的执行 |              |  已被弃用               
File System API   | 异步 |不会阻塞主线程的执行 |              |                          
Cache Storage API | 异步 |不会阻塞主线程的执行 |              |                 
Application Cache | 异步 |不会阻塞主线程的执行 |              | 已被弃用

### IndexedDB
[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)的操作是异步的，不会阻塞主线程的执行，可以在 window、web workers、service workers 环境中使用。
IndexedDB 是基于文件存储的，API 较为复杂，包含 v1 v2 的差异，建议通过类库来使用，比如：Dexie.js。

### Cache Storage API
[Cache Storage API](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api)为缓存的 Request/Response 对象提供存储机制，常在 ServiceWorker 中应用。
异步，不会阻塞主线程的执行，可以在 window、web workers、service workers 环境中使用。

### SessionStorage
[SessionStorage](https://developer.mozilla.org/en/docs/Web/API/Window/sessionStorage)
同步，会阻塞主线程的执行。
一般用于储存临时性的少量的数据。
SessionStorage 是标签级别的，跟随者标签的生命周期，并且会随着标签的销毁而清空数据。
无法在 web workers、service workers 环境中使用。
它只能储存字符串，大小限制大约为 5MB。

### LocalStorage
[LocalStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage)
同步，会阻塞主线程的执行。
无法在 web workers、service workers 环境中使用。
它只能储存字符串，大小限制大约为 5MB。

### Cookies
[Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)有它的用途，但不适用于储存数据。
Cookie 会在每次 HTTP 请求的时候携带在请求头中，大体积的 Cookies 会显著增加 HTTP 请求的负担。
Cookies 读写是同步的，只能储存字符串，并且无法在 web workers 环境中使用。

### File System API
[File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API/Introduction)和 FileWriter API 提供读取或写入文件到沙箱中（Sandboxed file system）。
它是异步的，不推荐使用，因为 File System API 只能在 Chromium 内核中使用。

### File System Access API
File System Access API 设计用于便捷得读取和编辑本地文件。
但在读取或写入本地文件的时候，需要获得用户授权，并且授权状态无法持久化记录。

### Application Cache
Application Cache 已被弃用，不建议使用。
建议迁移至 service workers 或 Cache API。
Storage 可以使用多少磁盘空间？

Chrome 允许使用 80% 的硬盘空间，单一的源（域名）可以使用 60% 的硬盘空间，可以通过 StorageManager API 检测最大的硬盘空间限额，其他基于 Chromium 内核的浏览器有不一样的限制，可能会允许使用更多的硬盘空间，查看更多实现 PR #3896
Internet Explorer 10（IE 10）及以上，最多可以储存 250MB，并在超过 10MB 的时候会提示用户
Firefox 允许使用 50% 的空闲硬盘空间，单个一级域名最多可以使用 2GB 硬盘空间，可以通过 StorageManager API 检测最大的硬盘空间限额
Safari 允许使用 1GB，当达到 1GB 的时候会提示用户（该数据可能不准确，没有找到 Safari 官方文档）

现代浏览器大多数已经不会再提示用户以授权更多的储存空间了。
如何检测储存空间是否可用？
在大多数浏览器中，可以通过 StorageManager API 检测储存空间总量与正在使用的量
```JavaScript
if (navigator.storage && navigator.storage.estimate) {
  const quota = await navigator.storage.estimate();
  // quota.usage -> Number of bytes used.
  // quota.quota -> Maximum number of bytes available.
  const percentageUsed = (quota.usage / quota.quota) * 100;
  console.log(`You've used ${percentageUsed}% of the available storage.`);
  const remaining = quota.quota - quota.usage;
  console.log(`You can write up to ${remaining} more bytes.`);
}
```

```JavaScript
// quota data
{
  "quota": 299977904946,
  "usage": 27154039,
  "usageDetails": {
    "caches": 26813093,
    "indexedDB": 305864,
    "serviceWorkerRegistrations": 35082
  }
}
```
注意：

并不是所有浏览器都实现了，因此使用之前需要先判断兼容性
需要捕获并处理超过配额限额的错误

IndexedDB 超限处理
indexedDB 超限将会执行 onabort 回调，并抛出一个 DOMException 错误，需要处理它的 QuotaExceededError 异常。
```JavaScript
const transaction = idb.transaction(['entries'], 'readwrite');
transaction.onabort = function(event) {
  const error = event.target.error; // DOMException
  if (error.name == 'QuotaExceededError') {
    // Fallback code goes here
  }
};
```
Cache API 超限处理
抛出一个 Promise Rejection，QuotaExceededError 错误对象，需要处理它的 QuotaExceededError 异常。
```JavaScript
try {
  const cache = await caches.open('my-cache');
  await cache.add(new Request('/sample1.jpg'));
} catch (err) {
  if (error.name === 'QuotaExceededError') {
    // Fallback code goes here
  }
}
```

### 浏览器什么时候回收存储空间？
Web Storage 分为两种储存模式，分别是：临时存储 Best Effort 和持久存储 Persistent。
默认情况下网站数据（包括 IndexedDB, Cache API, LocalStorage 等）都储存在临时存储 Best Effort 中，会在存储空间不足的时候被浏览器清除掉。
各个浏览器回收存储空间的差异：

Chrome 当浏览器存储空间不足时，会优先清除最近最少使用的数据，逐个清除，直至不再超限
IE 10+ 不会自动清除数据，但会阻止站点继续写入数据
Firefox 当磁盘空间充满时，会优先清除最近最少使用的数据，逐个清除，直至不再超限
Safari（iOS、iPadOS、MacOS） 会自动清除超过 7 天以上的数据，但不会清除“已添加至主屏幕”的网站和“PWA”网站

申请和查看持久存储 Persistent Storage
```JavaScript
// 申请持久存储 Persistent Storage：
// Request persistent storage for site
if (navigator.storage && navigator.storage.persist) {
  const isPersisted = await navigator.storage.persist();
  console.log(`Persisted storage granted: ${isPersisted}`);
}
```
查看持久存储 Persistent Storage 授权状态：
```JavaScript
// Check if site's storage has been marked as persistent
if (navigator.storage && navigator.storage.persist) {
  const isPersisted = await navigator.storage.persisted();
  console.log(`Persisted storage granted: ${isPersisted}`);
}
```
各个浏览器申请持久存储 Persistent Storage 的差异：

在 Chrome 55 以后，申请持久存储只需要满足以下任一条件，即可自动获得持久存储权限，无需用户确认：

该站点已添加书签, 并且用户的书签数小于等于5个
站点有很高的"site engagement"，通过这个命令可以查看: chrome://site-engagement/
站点已添加到主屏幕
站点启用了push通知功能


在 Firefox 中，会提示用户授权

最后测试并验证：

打开 baidu.com，打开控制台输入 await navigator.storage.persist()，返回 true
打开 wy.guahao.com，打开控制台输入 await navigator.storage.persist()，返回 false

## 临时存储
## 持久存储
## 浏览器缓存
## 本地存储数据库
可以看到IE和Firefox并不支持Web SQL Database，基本上可以断定永远也不会支持，规范都不认可，实在没有浪费精力去支持的理由。

https://www.zhangxinxu.com/wordpress/2017/07/html5-indexeddb-js-example/
