# IndexedDB
`IndexedDB`是一种可以让你在用户的浏览器内持久化存储数据的方法，允许储存大量数据，提供查找接口，还能建立索引。`IndexedDB`的兼容性也还不错，基本上不兼容太老的浏览器，都还是可用的。

`IndexedDB`不属于关系型数据库（不支持`SQL`查询语句），更接近`NoSQL`数据库，可以简单认为是一个基于事务操作的 key-value 型前端数据库。它的`API`大部分都是异步。

[关系型数据库 VS 非关系型数据库](https://zhuanlan.zhihu.com/p/78619241)
[使用 indexedDB [译]](https://juejin.cn/post/6844904111008137229)


## 库
1. [localForage](https://localforage.github.io/localForage/): 一个提供 name:value 的简单语法的客户端数据存储垫片（Polyfill），它基于`IndexedDB`实现，并在不持支`IndexedDB`的浏览器中自动回退只 WebSQL 和 localStorage。
1. [dexie.js](https://dexie.org/): 对`IndexedDB`的封装，通过提供更友好和简单语法以进行快速的编码开发。
1. [ZangoDB](https://github.com/erikolson186/zangodb): 一个类 MongoDB 的`IndexedDB`接口实现，提供了诸如过滤、投影、排序、更新和聚合等大多数 MongoDB 常见的特性。
1. [JsStore](https://jsstore.net/): 一个具备类`SQL`语法的简单和先进的`IndexedDB`封装实现。


### Dexie.js
`Dexie.js`是`indexedDB`封装器。

简洁直观的 API，方便使用

友好的代码完成

适应人类阅读习惯的查询：db.friends.where("lastName").anyOf("Helenius", "Fahlander").each(function(friend){...})

使用事物范围处理错误

当前只支持`indexedDB wrapper`，不区分大小写搜索，设置匹配和逻辑`OR`操作

兼容 Promise/A+

调用程序不会隐藏后端`indexedDB`
高性能
## 兼容性
跨浏览器：
IE10+
Chrome
Firefox
Opera 15+
Android browser
Blackberry browser
Opera mobile 16+
Chrome for Android
Firefox for Android
IE Mobile
Safari 8
IOS Safari 8

扩展关键字范围查询：equalsIgnoreCase(), anyOf([a,b,c,d,...]), startsWith(), startsWithIgnoreCase()

逻辑 "OR"：friends.where("age").below(40).or("length").above(200).toArray(...);

## 特点
1. 支持简单扩展构建和插件构建
1. 简单而强壮的错误处理
1. 简单的升级框架
1. 单元测试