## 运算符
[JavaScript 浮点数运算的精度问题](https://www.html.cn/archives/7340)

## 判断

基本类型：String、Number、Boolean、Symbol、Undefined、Null 
引用类型：Object

### typeof
返回右侧一元表达式的数据类型：number、boolean、symbol、string、object、undefined、function
```javascript
function typeof () {}
```

```javascript
const toString = Object.prototype.toString;

export function type(x, strict = false) {
  strict = !!strict;
  // fix typeof null = object
  if (x === null) return 'null';
  const t = typeof x;
  // 严格模式 区分NaN和number
  if (strict && t === 'number' && isNaN(x)) return 'nan';
  // number string boolean undefined symbol
  if (t !== 'object') return t;
  let cls;
  let clsLow;
  try {
    cls = toString.call(x).slice(8, -1);
    clsLow = cls.toLowerCase();
  } catch(e) {
    // ie下的 activex对象
    return 'object';
  }
  if (clsLow !== 'object') {
    if (strict) {
      // 区分NaN和new Number
      if (clsLow === 'number' && isNaN(x)) {
        return 'NaN';
      }
      // 区分 String() 和 new String()
      if ((clsLow === 'number' || clsLow === 'boolean' || clsLow === 'string')) {
        return cls;
      }
    }
    return clsLow;
  }
  if (x.constructor == Object) return clsLow;
  // Object.create(null)
  try {
    // __proto__ 部分早期firefox浏览器
    if (Object.getPrototypeOf(x) === null || x.__proto__ === null) {
      return 'object';
    }
  } catch(e) {
    // ie下无Object.getPrototypeOf会报错
  }
  // function A() {}; new A
  try {
    const cname = x.constructor.name;
    if (typeof cname === 'string') {
      return cname;
    }
  } catch(e) {
    // 无constructor
  }
  // function A() {}; A.prototype.constructor = null; new A
  return 'unknown';
}
```

### instanceof
返回 A 是否为 B 的实例

```javascript
function instanceofs (A, B) {
	var L = A.__proto__
	var R = B.prototype
	if (L === R) return true
	return false
}

function Dog(name, breed, color) {
	this.name = name
	this.breed = breed
	this.color = color
	this.bark = function() {
		return 'weoof'
	}
}
```

### constructor
### toString
利用toString方法基本上可以解决所有内置对象类型的判断, 但是这种方法对于自定义的构造函数仍然无效。

```javascript
function typeName (obj) {
  return Reflect.apply(Object.prototype.toString, obj, []).replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase()
}
```

> 注意：

```javascript
因为{}被解析为代码语句了，所以跟{}不构成关系，而.toString()不是完整的一行代码语句了。
括号里不能包含语句，所以被解释成表达式。
只要能让{}不产生歧义地认为是表达式，就不会报错了，例如：

{}.toString() // 报错了 {} .toString()代码被分割解析导致
({}).toString() // [object Object]
({}.toString()) // [object Object]
1 * {}.toString() // NaN
+{}.toString() // NaN
~{}.toString() // -1
-{}.toString() // NaN
1 / {}.toString() // NaN

function(){}(); // function(){}被解析为语句，()内不能为空，所以报错
(function(){})(); // 通常写法，可读性好。后面两行写法不推荐
```

## Array
### forEach

### isArray

### map

## 异步
### serTimeout

### setInterval

使用setTimeout 实现 setInterval

```javascript
function say(fn, time){
	let i = 3
	function A () {
    let clear = null
		if (i > 0) {
			clear = setTimeout(() => {A();fn()}, time)
			i--
		}
		return clear
	}
	return A()
}

say(() => console.log(1), 1000)
```
