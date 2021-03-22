# Dexie资料
1. [DEMO](https://codesandbox.io/s/dexiejs-me2d9)
1. [dexie](https://dexie.org/docs/)
1. [缓存 - 数据缓存 - IndexedDB - Dexie.js](https://www.cnblogs.com/qq3279338858/p/10980944.html)

# 库
```html
<!doctype html>
<html>
 <head>
  <script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script>
  <script>
      // 声明数据库
      var db = new Dexie('FriendDatabase')
      db.version(1).stores({
        // 自增主键id和索引名
        friends: '++id,name,age'
      })
      // 操作和查询数据库
      // db.friends.add({name: 'Josephine', age: 21}).then(() => {
      //   return db.friends.where('age').below(25).toArray()
      // }).then((youngFriends) => {
      //   alert ('My young friends: ' + JSON.stringify(youngFriends))
      // }).catch((e) => {
      //   alert ('Error: ' + (e.stack || e))
      // })
      for (let i = 0 i < 500 i++) {
        db.friends.add({name: 'Josephine', age: i})
        db.friends.add({name: 'Josephine' + i, age: i})
      }
      db.friends.where('age').below(25).toArray().then(res => {
        console.log(res)
      })
  </script>
 </head>
</html>
```

实例化

```js
import Dexie from 'dexie'
// 版本
const CURRENT_VERSION = 1

export class Database extends Dexie {
  constructor(DB_NAME) {
    this.version(CURRENT_VERSION).stores({
      // 表 key
      todos: '++id,done',
    })
    this.todos = this.table('todos')
  }
}
```

```js
// 实例化clientId库
DexieStore = new Database('clientId')
```
# 表
## 添加
### add

```js
table.add(item, [key])

db.friends.add({name: 'Josephine', age: 21})
```

### bulkAdd

```js
console.time()
db.friends.bulkAdd([
  {name: 'Foo', age: 31},
  {name: 'Bar', age: 32}
])
```

## 更新

### put

```js
// 替换或新增
await db.friends.put({id: 4, name: 'Foo', age: 33})
```

### bulkPut

```js
await db.friends.bulkPut([
  {id: 4, name: 'Foo2', age: 34},
  {id: 5, name: 'Bar2', age: 44}
])
```

### update

```js
// 根据主键更新（更新？）
await db.friends.update(4, {name: 'Bar'})
```

```js
// 根据搜索结果更新
await db.customers
  .where('age')
  .inAnyRange([ [0, 18], [65, Infinity] ]) // 返回索引在任何给定范围内的集合。
  .modify({discount: 0.5}) // 更新
```

## 删除
### delete

```js
await db.friends.delete(4)

// 根据搜索结果删除
const oneWeekAgo = new Date(Date.now() - 60 * 60 * 1000 * 24 * 7)
await db.logEntries.where('timestamp').below(oneWeekAgo).delete()
```

### bulkDelete

```js
await db.friends.bulkDelete([1, 2, 4])
```

## 查询
尽量不使用传入函数的方法，应该效率会比较低

### 查询方式有两种
1. Table.get() 通过主键获取
1. Table.where() 执行高级搜索

### get
```js
// 默认主键
console.time()
db.friends.get(100).then(res => {
    console.timeEnd()
    console.log(res)
  })

// 对象匹配
console.time()
db.friends.get({ name: 'Josephine99' }).then(res => {
    console.timeEnd()
    console.log(res)
  })
缺点：默认正序查询返回对象
```

```js
console.time()
db.friends
  .where('name')
  // 返回一个对象集合，其中索引以任何给定字符串开头，忽略大小写差异
  .startsWithAnyOfIgnoreCase(['Josephine99', 'Josephine'])
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

db.friends
  .where('name')
  // 返回一个对象集合，其中索引以任何给定字符串开头，忽略大小写差异
  .startsWithAnyOfIgnoreCase(['Josephine']).reverse().and(res => res.id < 7380)
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

### where
```js
console.time()
db.friends
  .where('name')
  // 返回一个对象集合，其中索引以任何给定字符串开头，忽略大小写差异
  .startsWithAnyOfIgnoreCase(['Josephine99', 'Josephine'])
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

# Table
## name
`Table.name`

## schema
`Table.schema()`此对象存储区的表架构

----

## hook钩子函数
`Table.hook('creating')`当对象将要在数据库中创建时调
`Table.hook('deleting')`
`Table.hook('reading')`
`Table.hook('updating')`

----

## toArray对象的数组
`Table.toArray()`获取包含存储区中所有对象的数组
```js
console.time()
db.friends
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## limit限制
`Table.limit()`返回按主键排序的集合，限制为n个项目
```js
console.time()
db.friends
  .where('id')
  .above(10)
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## orderBy排序
`Table.orderBy()`返回按给定索引排序的集合实例
```js
console.time()
db.friends
  .orderBy('name')
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## offset定偏移量
`Table.offset()`返回按主键排序的集合，其中表中的前n个项将被忽略
```js
console.time()
db.friends
  .offset(10)
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## reverse顺序相反
`Table.reverse()`返回主键顺序相反的集合实例
```js
console.time()
db.friends
  .reverse()
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

----

## get获取
`Table.get()`
```js
console.time()
db.friends
  .get(1)
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## bulkGet大量获取
`Table.bulkGet(Array)`
```js
console.time()
db.friends
  .bulkGet([2, 19])
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## where检索对象
`Table.where().WhereClause`使用查询检索对象

## add添加
`Table.add()`
```js
console.time()
db.friends
  .bulkPut({ id: 3, name: 'Number 2', age: 2321 })
  .then(updated => {
    console.timeEnd()
    if (updated)
      console.log('Friend number 2 was renamed to Number 2')
    else
      console.log('Nothing was updated - there were no friend with primary key: 2')
  })
```

## bulkAdd大量添加
`Table.bulkAdd(Array)`与add（）相同，但接受数组参数，并针对添加大量对象进行了优化
```js
console.time()
db.friends
  .bulkAdd([{ id: 3, name: 'Number 23', age: 2321 }, { id: 5, name: 'Number1 32', age: 2321 }])
  .then(updated => {
    console.timeEnd()
    if (updated)
      console.log('Friend number 2 was renamed to Number 2')
    else
      console.log('Nothing was updated - there were no friend with primary key: 2')
  })
```

## bulkDelete大量删除
`Table.bulkDelete(Array)`
```js
console.time()
db.friends
  .bulkDelete([9, 10])
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## delete删除
`Table.delete()`删除集合中的所有对象
```js
console.time()
db.friends
  .delete(7)
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## put插入替换
`Table.put()`替换或插入对象
```js
console.time()
db.friends
  .put({ id: 6, name: 'Number6 2', age: 2321 })
  .then(updated => {
    console.timeEnd()
    if (updated)
      console.log('Friend number 2 was renamed to Number 2')
    else
      console.log('Nothing was updated - there were no friend with primary key: 2')
  })
```

## bulkPut大量插入
`Table.bulkPut(Array)`
```js
console.time()
db.friends
  .bulkPut([{ id: 3, name: 'Number 2', age: 2321 }, { id: 5, name: 'Number1 2', age: 2321 }])
  .then(updated => {
    console.timeEnd()
    if (updated)
      console.log('Friend number 2 was renamed to Number 2')
    else
      console.log('Nothing was updated - there were no friend with primary key: 2')
  })
```

## update更新
`Table.update(key, changes)`将给定的更改应用于现有对象
```js
console.time()
db.friends
  .update(2, { name: 'Number 2' })
  .then(updated => {
    console.timeEnd()
    if (updated)
      console.log('Friend number 2 was renamed to Number 2')
    else
      console.log('Nothing was updated - there were no friend with primary key: 2')
  })
```

## clear
`Table.clear()`

----

## defineClass
`Table.defineClass(structure)`
```js
var Friend = Dexie.defineClass({
  name: String,
  shoeSize: Number
})
Friend.prototype.sayHi = function () {
  alert ('Hi, my name is ' + this.name)
}
var db = new Dexie('FriendsDB')
db.version(1).stores({friends: '++id,name'})
db.friends.mapToClass (Friend)
```

## mapToClass
`Table.mapToClass()`
```js
import Dexie from 'dexie'

var db = new Dexie('FriendsDB')
db.version(1).stores({
    friends: '++id,name,shoeSize,address.city'
})

class Friend {
    log() {
        console.log(JSON.stringify(this))
    }
}
db.friends.mapToClass (Friend)
db.friends.where('name').startsWithIgnoreCase('d').each(function(friend) {
    assert (friend instanceof Friend)
    friend.log()
}).catch(function (e) {
    console.error(e)
})
```

## count
`Table.count()`
```js
console.time()
db.friends
  .count()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 14.06591796875 ms
// 18017
```

## each
`Table.each()`迭代存储区中的所有对象
```js
console.time()
db.friends
  .each(item => console.log(item))
  .limit(5)
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## filter
`Table.filter()`筛选对象
```js
console.time()
db.friends
  .filter(friend => /a/i.test(friend.name))
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 1946.96484375 ms
// 1
```

## toCollection
`Table.toCollection()`获取包含存储区中所有对象的集合

# Collection

## and
`collection.and(filter)`
```js
console.time()
db.friends
  .toCollection()
  .and(item => item.age > 30)
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## delete
`Collection.delete()`删除集合中的所有对象

## distinct
`Collection.distinct()`删除具有相同主键的项的重复项
```js
console.time()
db.friends
  .toCollection()
  .distinct()

db.friends.where('name').startsWith('Josephine').distinct() // 删除具有相同主键的项的重复项？
```

## modify修改集合
`Collection.modify(fn)`使用给定的属性或函数修改集合中的所有对象
```js
console.time()
db.friends
  .toCollection()
  .modify(item => {
    item.firstName = item.name.split(' ')[0]
    item.age = item.id
  })
```

----

## each
`Collection.each()`执行查询并为每个项调用函数

## eachKey
`Collection.eachKey()`对正在使用的索引或主键执行查询，并为每个键调用函数

## eachPrimaryKey
`Collection.eachPrimaryKey()`对索引执行查询，并为对应于索引的每个主键调用函数

## eachUniqueKey
`Collection.eachUniqueKey()`对正在使用的索引或主键执行查询，并为每个唯一键调用函数

## toArray获取数组
`Collection.toArray()`执行查询并获取一个数组，其结果按where（）子句中使用的索引排序
```js
console.time()
db.friends
  .toCollection()
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## desc降序排序
`Collection.desc()`按降序排序
```js
console.time()
db.friends
  .toCollection()
  .desc()
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## reverse顺序相反
`Collection.reverse()`
```js
console.time()
db.friends
  .toCollection()
  .reverse()
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 6.048095703125 ms
// 5
```

## sortBy属性排序
`Collection.sortBy()`执行查询并获取按给定属性排序结果的数组
```js
console.time()
db.friends
  .toCollection()
  .limit(5)
  .sortBy('name')
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 6.048095703125 ms
// 5
```

----

## first第一项
`Collection.first()`获取集合中的第一项

## last最后一项
`Collection.last()`获取集合中的最后一项

## limit项目数
`Collection.limit()`将结果限制为给定的项目数
```js
console.time()
db.friends
  .where('name')
  .startsWithAnyOfIgnoreCase('j')
  .and(item => item.age > 30)
  .limit(5)
  .sortBy()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```
## offset定偏移量
`Collection.offset()`忽略给定偏移量之前的n个项目并返回其余项目
```js
console.time()
db.friends
  .toCollection()
  .offset(10)
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 136.574951171875 ms
// 500
```

## until筛选器
`Collection.until()`忽略给定筛选器返回true之后发生的项
```js
console.time()
db.friends
  .toCollection()
  .until(item => {
    return item.name === 'Josephine'
  })
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 136.574951171875 ms
// 500
```

## filter筛选对象
`Collection.filter()`筛选对象
```js
console.time()
db.friends
  .toCollection()
  .filter(friend => /a/i.test(friend.name))
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 1946.96484375 ms
// 1
```

----

## keys所有键的数组
`Collection.keys()`检索包含集合所有键的数组
```js
console.time()
db.friends
  .toCollection()
  .keys(key => {
    console.log('keys', key)
  })
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 1567.38623046875 m
// 18017

console.time()
db.friends
  .orderBy('name')
  .keys()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 1281.037109375 ms
// 18017
```

## primaryKeys所有键的数组
`Collection.primaryKeys()`
```js
console.time()
db.friends
  .toCollection()
  .primaryKeys(key => {
    console.log('keys', key)
  })
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 30.60693359375 ms
// 18017

console.time()
db.friends
  .orderBy('name')
  .primaryKeys()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
// default: 123.9248046875 ms
// 18017
```

## uniqueKeys唯一键的数组
`Collection.uniqueKeys()`检索包含集合所有唯一键的数组(去重)
```js
console.time()
db.friends
  .toCollection()
  .uniqueKeys(key => {
    console.log('keys', key)
  })
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 1260.21484375 ms
// 18017

console.time()
db.friends
  .orderBy('name')
  .uniqueKeys()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
// default: 165.803955078125 ms
// 18017
```

----

## count统计
`Collection.count()`
```js
console.time()
db.friends
  .toCollection()
  .count()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 51.06591796875 ms
// 18017
```

## or或
`Collection.or()`
```js
console.time()
db.friends
  .toCollection()
  .or('id').below(8)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

// default: 20054.020751953125 ms
// 18017
```

## raw
`Collection.raw()`不要通过阅读挂钩过滤结果

## clone
`Collection.clone()`
```js
const Friend = db.friends
  .where('name')
  .startsWithAnyOfIgnoreCase('j')
  .and(item => item.age > 30)
  .limit(5)
  .toArray()
Friend.clone()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

# WhereClause
## above大于
`WhereClause.above()`返回索引位于给定键上方的对象集合

```js
console.time()
db.friends
  .where('id')
  .above(10)
  .reverse()
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## aboveOrEqual大于等于
`WhereClause.aboveOrEqual()`返回索引高于或等于给定键的对象集合
```js
console.time()
db.friends
  .where('id')
  .aboveOrEqual(10)
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

----

## below小于
`WhereClause.below()`返回索引低于给定键的对象集合
```js
console.time()
db.friends
  .where('id')
  .below(4)
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## belowOrEqual小于等于
`WhereClause.belowOrEqual()`返回索引低于或等于给定键的对象集合
```js
console.time()
db.friends
  .where('id')
  .belowOrEqual(4)
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

----


## between区间
`WhereClause.between()`返回索引位于给定边界之间的对象集合
```js
console.time()
db.friends
  .where('id')
  // id >= 2, 4 < id
  .between(2, 4)
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## inAnyRange多区间
`WhereClause.inAnyRange()`返回索引在任何给定范围内的集合
```js
console.time()
db.friends
  .where('id')
  // id >= 1, 3 < id, 65 =< id
  .inAnyRange([ [1, 3], [65, Infinity] ])
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

----

## noneOf排除
`WhereClause.noneOf()`返回一个集合，其中index等于给定数组中的任何键以外的任何值(区分大小写)
```js
console.time()
db.friends
  .where('name')
  .noneOf('Josephine')
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

db.friends
  .where('name')
  .noneOf(['Josephine', 'Josephine10'])
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## notEqual不等于
`WhereClause.notEqual()`返回一个集合，其中索引等于给定值以外的任何值(区分大小写)
```js
console.time()
db.friends
  .where('name')
  .notEqual('Josephine')
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

----

## equals等于
`WhereClause.equals()`返回索引等于给定键的对象集合
```js
console.time()
db.friends
  .where('age')
  .equals(10)
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## equalsIgnoreCase等于忽略大小写
`WhereClause.equalsIgnoreCase()`返回一个对象集合，其中索引等于给定的字符串键，忽略大小写差异
```js
console.time()
db.friends
  .where('name')
  .equalsIgnoreCase('josephine')
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

----

## anyOf等于集合
`WhereClause.anyOf()`返回一个对象集合，其中索引等于给定数组中的任何键
```js
console.time()
db.friends
  .where('id')
  .anyOf(10)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

db.friends
  .where('id')
  .anyOf([10, 11])
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## anyOfIgnoreCase等于集合忽略大小写
`WhereClause.anyOfIgnoreCase()`返回一个对象集合，其中索引与任何给定字符串匹配，忽略大小写差异。
```js
console.time()
db.friends
  .where('name')
  .anyOfIgnoreCase(['foo', 'bar'])
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

----

## startsWith匹配开头
`WhereClause.startsWith()`返回以给定字符串键开头的对象集合
```js
console.time()
db.friends
  .where('name')
  .startsWith('J')
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## startsWithIgnoreCase匹配开头忽略大小写
`WhereClause.startsWithIgnoreCase()`返回一个对象集合，其中索引以任何给定字符串开头，忽略大小写差异
```js
console.time()
db.friends
  .where('name')
  .startsWithIgnoreCase('j')
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

----

## startsWithAnyOf匹配开头集合
`WhereClause.startsWithAnyOf()`返回以任何给定字符串开头的对象集合
```js
console.time()
db.friends
  .where('name')
  .startsWithAnyOf(['J', 'B'])
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

db.friends
  .where('name')
  .startsWithAnyOf('J', 'B')
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```

## startsWithAnyOfIgnoreCase匹配开头集合忽略大小写
`WhereClause.startsWithAnyOfIgnoreCase()`返回一个对象集合，其中索引以给定的字符串键开头，忽略大小写差异
```js
console.time()
db.friends
  .where('name')
  .startsWithAnyOfIgnoreCase('j')
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })

db.friends
  .where('name')
  .startsWithAnyOfIgnoreCase(['j', 'b'])
  .limit(5)
  .toArray()
  .then(res => {
    console.timeEnd()
    console.log(res)
  })
```


# 功能
## 分页
```js
// 数据偏移分页
function pageSize(pageNum, pageSize = 10) {
  console.time()
  db.friends
    .where('name')
    .equals('Josephine')
    .offset((pageNum - 1) * pageSize)
    .limit(pageSize)
    .reverse()
    .toArray()
    .then(res => {
      console.timeEnd()
      console.log(res)
    })
}
```

```js
// Id判断分页
function pageId(pageId, pageSize = 10) {
  console.time()
  db.friends
    .where('name')
    .equals('Josephine')
    .and(item => pageId ? item.id < pageId : true)
    .limit(pageSize)
    .reverse()
    .toArray()
    .then(res => {
      console.timeEnd()
      console.log(res)
    })
}
```

```js
/**
   * 聊天数据分页
   * id：查询
   * pageId：最后MessageID
   * pageSize: 页大小
   */
async getMsg(id, pageId, pageSize = 20) {
  return await this.msg.where('userid').equals(id).and(item => pageId ? item.sessionId < pageId : true).limit(pageSize).reverse().toArray()
  msg
}
```

## 去重
```js
db.friends.where('name').startsWith('Josephine').distinct() // 删除具有相同主键的项的重复项？
```