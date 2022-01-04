## JS

### 基本数据类型
Undefined、Null、Boolean、Number、String、symbol

### JavaScript有几种类型的值？，你能画一下他们的内存图吗？

堆：原始数据类型（Undefined，Null，Boolean，Number、String） 
栈：引用数据类型（对象、数组和函数）

两种类型的区别是：存储位置不同；

原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
引用数据类型存储在堆(heap)中的对象,占据空间大、大小不固定,如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其
在栈中的地址，取得地址后从堆中获得实体
### === ==
`===` 严格相等，会比较两个值的类型和值
`==`  抽象相等，比较时，会先进行类型转换，然后再比较值

#### === 类型判断
如果Type(x)和Type(y)不同，返回false
如果Type(x)和Type(y)相同
如果Type(x)是Undefined，返回true
如果Type(x)是Null，返回true
如果Type(x)是String，当且仅当x,y字符序列完全相同（长度相同，每个位置上的字符也相同）时返回true，否则返回false
如果Type(x)是Boolean，如果x,y都是true或x,y都是false返回true，否则返回false
如果Type(x)是Symbol，如果x,y是相同的Symbol值，返回true,否则返回false
如果Type(x)是Number类型
如果x是NaN，返回false
如果y是NaN，返回false
如果x的数字值和y相等，返回true
如果x是+0，y是-0，返回true
如果x是-0，y是+0，返回true
其他返回false

#### ==
如果Type(x)和Type(y)相同，返回x===y的结果
如果Type(x)和Type(y)不同
如果x是null，y是undefined，返回true
如果x是undefined，y是null，返回true
如果Type(x)是Number，Type(y)是String，返回 x==ToNumber(y) 的结果
如果Type(x)是String，Type(y)是Number，返回 ToNumber(x)==y 的结果
如果Type(x)是Boolean，返回 ToNumber(x)==y 的结果
如果Type(y)是Boolean，返回 x==ToNumber(y) 的结果
如果Type(x)是String或Number或Symbol中的一种并且Type(y)是Object，返回 x==ToPrimitive(y) 的结果
如果Type(x)是Object并且Type(y)是String或Number或Symbol中的一种，返回 ToPrimitive(x)==y 的结果
其他返回false

### new
1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
2、属性和方法被加入到 this 引用的对象中。
3、新创建的对象由 this 所引用，并且最后隐式的返回 this 。

var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj);

### JavaScript原型，原型链 ? 有什么特点？

每个对象都会在其内部初始化一个属性，就是prototype(原型)，当我们访问一个对象的属性时，
如果这个对象内部不存在这个属性，那么他就会去prototype里找这个属性，这个prototype又会有自己的prototype，
于是就这样一直找下去，也就是我们平时所说的原型链的概念。

关系：instance.constructor.prototype = instance.__proto__

JavaScript对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。
```
// 实现 instance_of 方法
function instance_of(leftValue, rightValue) {
}
// 使下方 instance_of(a, A) 的结果为 true
function A() {}
var a = new A()

instance_of(a, A) // true

function instance_of(L, R) {
  var O = R.prototype
  L = L.__proto__
  while (true) {
    if (L === null)
      return false
    if (O === L)
      return true
    L = L.__proto__
  }
}
```

### 怎么判断对象类型？
Object.prototype.toString.call(xx)


### 闭包（closure），为什么要用它？
闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域，将函数内部的变量和方法传递到外部。

缺点： 参数和变量不会被垃圾回收机制回收

### This对象的理解
this指向分为： 
1. 全局指向：指向的是window
2. 局部指向：函数调用的谁就指向的谁

### 作用域? 作用链域?
一个函数、变量可以使用的范围，局部、全局、块级作用域

当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，
直至全局函数，这种组织形式就是作用域链。

### 说说箭头函数和函数的区别
1. 语法更加简洁、清晰
1. 箭头函数不会创建自己的this
1. 箭头函数继承而来的this指向永远不变
1. .call()/.apply()/.bind()无法改变箭头函数中this的指向
1. 箭头函数不能作为构造函数使用
1. 箭头函数没有自己的arguments
1. 箭头函数没有原型prototype
1. 箭头函数不能用作Generator函数，不能使用yeild关键字

### 说说箭头函数的特点

[少年，不要滥用箭头函数啊](http://jingsam.github.io/2016/12/08/things-you-should-know-about-arrow-functions.html)
1. 箭头函数是匿名函数，不能作为构造函数，不能使用new
```js
let foo=()=>{
}
var newFoo=new foo()//foo is not a construcotr
```

1. 不能使用argumetns,取而代之用rest参数...解决
```js
let C = (...c) => {
  console.log(c);
}
C(1,2,3,3)
```

1. 不绑定this，会捕获其定义时所在的this指向作为自己的this。由于在vue中自动绑定 this 上下文到实例中，因此不能使用箭头函数来定义一个周期方法。箭头函数的this永远指向上下文的this，call、apply、bind也无法改变

1. 箭头函数没有原型对象

### 如何实现一个 apply 函数？
```js
// 思路：根据 this 的查找策略，我们将要执行的函数挂载到 context 上执行
//函数内的 this 就是当前的调用者context 了
Function.prototype.myapply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }
  context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn;//删除挂载的方法
  return result
}
```

### 请实现一个 call 函数
// 思路：根据 this 查找策略，我们将方法挂在到context 上，然后调用此方法即可。

```js
Function.prototype.mycall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }
  context = context || window
  context.fn = this
  let arg = [...arguments].slice(1)
  let result = context.fn(...arg)
  delete context.fn
  return result
} 
```

### 如何实现一个 bind 函数？
// 思路：根据 this 查找策略，我们将方法挂在到context 上，然后调用此方法即可。

```js
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```

### 说说bind、call、apply的 区别？[区别](https://juejin.im/post/59bfe84351882531b730bac2)
1. call 和 apply 都用于改变函数内 this 的指向。能力是相同的，只是传参的方式不同。
1. 除了第一个参数外，call 可以接收一个参数列表，apply 只接受一个参数数组。
1. bind 和上面两个方法作用是一致的，只是该方法会返回一个函数。

### call 和 apply 的区别是什么，哪个性能更好一些
其实无所谓哪个更好，只是适用的场景决定的，两者都有改变this指向的作用，如果你是参数是个数组的话就得用apply最好

### 谈谈变量提升？
在生成执行环境时，会有两个阶段。第一个阶段是创建的阶段，JS 解释器会找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间，函数的话会将整个函数存入内存中，变量只声明并且赋值为 undefined，所以在第二个阶段，也就是代码执行阶段，我们可以直接提前使用。
解释器会提取需要提升的变量和函数，开辟空间，

### 实现继承？
[JavaScript常用八种继承方案](https://juejin.im/post/6844903696111763470)

1. 原型链继承
1. 借用构造函数继承
1. 组合继承
1. 原型式继承
1. 寄生式继承
1. 寄生组合式继承
1. 混入方式继承多个对象
1. ES6类继承extends

原型prototype机制或apply和call方法去实现较简单，建议使用构造函数与原型混合方式。
```
 function Parent(){
        this.name = 'wang';
    }

    function Child(){
        this.age = 28;
    }
    Child.prototype = new Parent();//继承了Parent，通过原型

    var demo = new Child();
    alert(demo.age);
    alert(demo.name);//得到被继承的属性
  }
 ```
  
### 创建对象的几种方式
#### 对象字面量的方式   
```
person={firstname:"Mark",lastname:"Yun",age:25,eyecolor:"black"};
```
#### 用function来模拟无参的构造函数
```
function Person(){}
var person=new Person();//定义一个function，如果使用new"实例化",该function可以看作是一个Class
person.name="Mark";
person.age="25";
person.work=function(){
alert(person.name+" hello...");
}
person.work();
```
#### 用function来模拟参构造函数来实现（用this关键字定义构造的上下文属性）
```
function Pet(name,age,hobby){
   this.name=name;//this作用域：当前对象
   this.age=age;
   this.hobby=hobby;
   this.eat=function(){
      alert("我叫"+this.name+",我喜欢"+this.hobby+",是个程序员");
   }
}
var maidou =new Pet("麦兜",25,"coding");//实例化、创建对象
maidou.eat();//调用eat方法
```

#### 用工厂方式来创建（内置对象）
```
 var wcDog =new Object();
 wcDog.name="旺财";
 wcDog.age=3;
 wcDog.work=function(){
   alert("我是"+wcDog.name+",汪汪汪......");
 }
 wcDog.work();
```

#### 用原型方式来创建
```
function Dog(){

 }
 Dog.prototype.name="旺财";
 Dog.prototype.eat=function(){
 alert(this.name+"是个吃货");
 }
 var wangcai =new Dog();
 wangcai.eat();
```

#### 用混合方式来创建
```
function Car(name,price){
  this.name=name;
  this.price=price; 
}
 Car.prototype.sell=function(){
   alert("我是"+this.name+"，我现在卖"+this.price+"万元");
  }
var camry =new Car("凯美瑞",27);
camry.sell(); 
```
### 那些操作会造成内存泄漏？


### JS事件循环
js为单线程，遇到同步任务直接执行，遇到异步任务分为，宏任务、微任务，如果有微任务执行完毕才会执行宏任务。

Event Loop 事件循环
宏任务(macrotask)：：
script(整体代码)、setTimeout、setInterval、UI 渲染、 I/O、postMessage、 MessageChannel、setImmediate(Node.js 环境)

微任务(microtask)：
Promise、 MutaionObserver、process.nextTick(Node.js环境）

### map,foreach
map & forEach 都是用来更方便地遍历数组的
forEach 接收的参数和 map 相同，但是它没有返回值，即它返回的是 undefined。
map 的返回不等于原数组
因为 map & forEach 的主要区别是有无返回，所以，当你想基于一个原数组返回一个新数组，可以选择 map，当你只是想遍历数据不需要考虑返回时可以选择 forEach


### js数组中filter、map、reduce、find等方法实现的原理
```js
Array.prototype.filter1 = function (fn) {
  if (typeof fn !== "function") {
  throw new TypeError(`${fn} is not a function`);
  }
  let newArr = [];
  for(let i=0; i< this.length; i++) {
    fn(this[i]) && newArr.push(this[i]);
  }
  return newArr;
}
let arr=[2,4,6,8];
let arr1=arr.filter1(function(item){
    return item>5
})
console.log(arr1) //[6,8]

Array.prototype.map = function(fn) {
   if (typeof fn !== "function") {
      throw new TypeError(`${fn} is not a function`);
   }
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        newArr.push(fn(this[i]))
    };
    return newArr;
}


Array.prototype.reduces = function (reducer,initVal) {
    for(let i=0;i<this.length;i++){
        initVal =reducer(initVal,this[i],i,this);
        console.log(initVal)
    }
    return initVal
};

let arr=[2,4,6,8];
let result=arr.reduces(function (val,item,index,origin) {
    return val+item
},0);
console.log(result) //20
```

### foreach()能够中断吗 
 return true 、false

### js for等循环 跳出多层循环
 可见 return 会直接跳出多层循环,返回调用的方法外部

### 说说你对闭包的理解
闭包的定义很简单：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。
比普通函数占用更多的内存。
 　　解决：闭包不在使用时，要及时释放。

 　　将引用内层函数对象的变量赋值为null。





### 两个升序数组合并为一个有序数组
Array.from(new Set([...a, ...b])).sort((a, b) => a - b)
[...new Set([...a, ...b])].sort((a, b) => a - b)

### 去重
Array.from(new Set(a))
[...new Set(a)]

### 合并
[...a, ...b]
c = a.concat(b)
a.push.apply(a,b)
Array.prototype.push.apply(a,b)
a.push(...b)

### URL中提取参数
decodeURIComponent
```js
/* 获取URL中的数据*/
const getURLParameters = url =>
  url.match(/([^?=&]+)(=([^&]*))/g)
    .reduce((a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  );

const parseQueryString = url=>{
  var json = {};
  var arr = url.substr(url.indexOf('?') + 1).split('&');
  arr.forEach(item=>{
      var tmp = item.split('=');
               json[tmp[0]] = tmp[1];
  });
  return json;
}
```

### 节流与防抖
节流 如果一个函数持续的，频繁地触发，那么让它在一定的时间间隔后再触发。由于执行速度过快，并携带相邻数据相差不大，节流可以高效的优化执行效果。

```js
function throttles(fn, wait = 100){
  let last = 0;
  console.log('节流函数 启动')
  return function(){
    let curr = +new Date();
    // 强制转换为数字Number
    if(curr - last > wait){
      fn.apply(this, arguments);
      last = curr;
    }
  }
}

function throttle (fn, wait = 250, options) {
  let lastTime, timerId
  return function () {
    let context = options || this
    let currentTime = +new Date
    let args = arguments
    if (lastTime && currentTime < lastTime + wait) {
      clearTimeout(timeId)
      timeId = setTimeout(function() {
        lastTime = currentTime
        fn.apply(context, args)
      }, wait);
    } else {
      lastTime = currentTime
      fn.apply(context, args)
    }
  }
}
function handle() {
    console.log(Math.random());
}
window.addEventListener('scroll', throttle(handle, 1000));

```

防抖 如果一个函数在一段时间间隔中，持续地触发，那么只在它结束后过一段时间只执行一次。

```js
function debounce(fn, wait) {
    var timeout = null;      //定义一个定时器
    return function() {
        if(timeout !== null) clearTimeout(timeout);  //清除这个定时器
        timeout = setTimeout(fn, wait);  
    }
}
// 处理函数
function handle() {
    console.log(Math.random()); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));
```

### 深拷贝 浅拷贝
浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

```js
JSON.parse(JSON.stringify(obj))

arrb = [...arrA]
let obj1 = {a:{b:1},b:22};
let obj2 = Object.assign({b:11},obj1);
```

### 递归拷贝

```js
function getType(obj) {
  //tostring会返回对应不同的标签的构造函数
  let toString = Object.prototype.toString
  let map = {
    '[object Boolean]'  : 'boolean', 
    '[object Number]'   : 'number', 
    '[object String]'   : 'string', 
    '[object Function]' : 'function', 
    '[object Array]'    : 'array', 
    '[object Date]'     : 'date', 
    '[object RegExp]'   : 'regExp', 
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null', 
    '[object Object]'   : 'object'
  }
  if (obj instanceof Element) return 'element'
  return map[toString.call(obj)]
}
function deepClone(data){
  let Type = getType(data)
  let obj
  if (Type === 'object') {
    obj = {}
  } else if (Type === 'array') {
    obj = []
  } else {
    return data
  }
  if (Type === 'array') {
    data.forEach(item => {
      obj.push(deepClone(item))
    })
  } else if (Type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}
let obj = [{
  name:'melin1',
  job:'111'
}]
let objs = [{
  name:'melin1',
  job:'111'
}]
var copy = obj.slice(0)
console.log(deepClone(obj), copy)
// [ { name:'melin1', job:'111' } ]
// [ { name:'tom', job:'111' } ]

obj[0].name = 'tom'
let arrA = [1, 2, 3, 4]
console.log(deepClone(arrA), copy)
// [1, 2, 3, 4]
// [ { name:'tom', job:'111' } ]

let obj = {         
    reg : /^asd$/,
    fun: function(){},
    syb:Symbol('foo'),
    asd:'asd'
}; 
let cp1 = deepClone(obj)
console.log(cp);
// {reg: /^asd$/, fun: ƒ, syb: Symbol(foo), asd: "asd"}
```

## ES6

### 对Promise的理解
用来解决异步处理的代码规范，异步回调函数。三种状态：成功fulfilled、失败rejected、初始pending。参数为密名函数，resolve/reject函数，用于处理成功、失败的回调函数。异常捕获then捕获promise中的异常，catch可以捕获then中的异常：all参数中的所有promise都完成 race参数中的一个promise执行完


调用then方法，将想要在Promise异步操作成功时执行的回调放入callbacks队列，其实也就是注册回调函数，可以向观察者模式方向思考；
创建Promise实例时传入的函数会被赋予一个函数类型的参数，即resolve，它接收一个参数value，代表异步操作返回的结果，当一步操作执行成功后，用户会调用resolve方法，这时候其实真正执行的操作是将callbacks队列中的回调一一执行；

### 浅谈Promise怎么取消或中断
利用这一特性，当新对象保持“pending”状态时，原Promise链将会中止执行。
return new Promise(()=>{})


### async、await 的优缺点
async 和await 相比直接使用 Promise 来说,优势在于处理 then 的调用链,能够更清晰准确的写出代码。缺点在于滥用 await 可能会导致性能问题,因为 await 会阻塞代码,也许之后的异步代码并不依赖于前者,但仍然需要等待前者完成,导致代码失去了并发性

async/await是在Promise之后产生的，它和Promise诞生的目的都是为了解决“回调地狱”，至于什么是回调地狱：

### ES6常用
Set、Promise、async await、reFlect、解构函数、箭头函数、proxy、const、let、forin forof、class、export、import、

### 理解和使用ES6中的Symbol
是由ES6规范引入的一项新特性，它的功能类似于一种标识唯一性的ID。通常情况下，我们可以通过调用Symbol()函数来创建一个Symbol实例：

### Object新增方法

#### Object.is()
Object.is()它用来比较两个值是否严格相等，与严格比较运算符（ === ）的行为基本一致，是在三等号判断的基础上新增了两个不同之处。
Object.is()不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

### Object.assign()
[Object.assign 原理及其实现](https://www.cnblogs.com/zhaobao1830/p/10242455.html)
[【ES6学习笔记之】Object.assign()](https://www.jianshu.com/p/d5f572dd3776)

Object.assign(target, a1, a2)方法用于对象的合并，将源对象（ source ）的所有可枚举属性，复制到目标对象target 

Object.keys()方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键名数组。

Object.values()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值数组。

Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值对数组。


### generator 原理






















## CSS

### CSS Reset与CSS Reboot
reset通常是为了处理跨浏览器间的样式一致性问题 重置默认样式
基于Normalize.css的，仅使用元素选择器来设置自用样式，额外的样式使用类选择器设置。

Normalize.css保护了有价值的默认值
Normalize.css修复了浏览器的bug
Normalize.css不会让你的调试工具变得杂乱
Normalize.css是模块化的
Normalize.css拥有详细的文档

### postion
absolute
生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。

fixed （老IE不支持）
生成绝对定位的元素，相对于浏览器窗口进行定位。

relative
生成相对定位的元素，相对于其正常位置进行定位。

static
默认值。没有定位，元素出现在正常的流中
（忽略 top, bottom, left, right z-index 声明）。

inherit
规定从父元素继承 position 属性的值。

### 清除浮动的方法
利用clear样
2. 父元素结束标签之前插入清除浮动的块级元素
3. 利用伪元素（clearfix）
4. 利用overflow清除浮动

### flex容器属性
flex-direction 决定主轴方向=项目排列方向
flex-wrap 定义如何换行
flex-flow 它是flex-direction和flex-wrap的简写形式，语法糖
justify-content 定义项目在主轴上的对齐方式
align-items 定义项目在交叉轴上的对齐方式
align-content 定义多根轴线的对齐方式。若项目只有一根轴线则不生效。

### 什么是BFC、可以解决哪些问题
BFC（Block Formatting Context，块级格式化上下文）

1.（BFC与margin）同一个父级块框下，兄弟元素和父子元素的margin会发生重叠问题
2.（BFC与float）父元素高度塌陷问题、兄弟元素覆盖问题

BFC与margin
margin重叠的解决方法：让元素处于不同的BFC属性环境下。

### css选择器权重
样式的优先级，有两条或多条样式作用于一个元素，权重高的那条样式对元素起作用，权重相同的，后写的样式会覆盖前面写的样式。

1. !important，加在样式属性值后，权重值为 10000
1. 内联样式，如：style=””，权重值为1000
1. ID选择器，如：#content，权重值为100
1. 类，伪类和属性选择器，如： content、:hover 权重值为10
1. 标签选择器和伪元素选择器，如：div、p、:before 权重值为1
1. 通用选择器（`*`）、子选择器（>）、相邻选择器（+）、同胞选择器（~）、权重值为0


### css选择器

!important > 内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器 > 通配符选择器 > 继承 > 浏览器默认属性

### CSS3新增伪类举例：

p:first-of-type    选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
p:last-of-type    选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
p:only-of-type    选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
p:only-child    选择属于其父元素的唯一子元素的每个 <p> 元素。
p:nth-child(2)    选择属于其父元素的第二个子元素的每个 <p> 元素。
:enabled          :disabled 控制表单控件的禁用状态。
:checked        单选框或复选框被选中。


### 水平垂直居中的方案
[10种水平垂直居中的方法](https://www.jianshu.com/p/0ee2b49dd9d6)

方法  居中元素定宽高固定
absolute + 负margin  是
absolute + margin auto  是
absolute + calc 是
absolute + transform  no
writing-mode  no
lineheight  no
table no
css-table no
flex  no
grid  no


PC端有兼容性要求，宽高固定，推荐absolute + 负margin
PC端有兼容要求，宽高不固定，推荐css-table
PC端无兼容性要求，推荐flex
移动端推荐使用flex

#### 水平居中

1. 对于行内元素: text-align: center;
1. 对于确定宽度的块级元素：
1. width和margin实现。margin: 0 auto;
1. 绝对定位和margin-left: -width/2, 前提是父元素position: relative
1. 对于宽度未知的块级元素
1. table标签配合margin左右auto实现水平居中。使用table标签（或直接将块级元素设值为display:table），再通过给该标签添加左右margin为auto。
1. inline-block实现水平居中方法。display：inline-block和text-align:center实现水平居中。
1. 绝对定位+transform，translateX可以移动本身元素的50%。
1. flex布局使用justify-content:center

#### 垂直居中

1. 利用line-height实现居中，这种方法适合纯文字类
1. 通过设置父容器相对定位，子级设置绝对定位，标签通过margin实现自适应居中
1. 弹性布局flex:父级设置display: flex; 子级设置margin为auto实现自适应居中
1. 父级设置相对定位，子级设置绝对定位，并且通过位移transform实现
1. table布局，父级通过转换成表格形式，然后子级设置vertical-align实现。（需要注意的是：vertical-align: middle使用的前提条件是内联元素以及display值为table-cell的元素）。
### li标签间有空白是怎么回事
浏览器的默认行为是把inline元素间的空白字符（空格换行tab）渲染成一个空格，也就是我们上面的代码<li>换行后会产生换行字符，而它会变成一个空格，当然空格就占用一个字符的宽度，所以你懂的...

解决：
1. 既然是因为<li>换行导致的，那就可以将<li>代码全部写在一排
1. .wrap ul{font-size:0px;}
1. .wrap ul{letter-spacing: -4px;}之后记得设置li内字符间隔.wrap ul li{letter-spacing: normal;}

### 介绍一下CSS的盒子模型
1. IE 盒子模型, IE的content部分包含了 border 和 pading; box-sizing: border-box;
1. 标准 W3C 盒子模型 box-sizing: content-box;


### css隐藏内容
1. visibility 设为 hidden
1. opacity 设为 0
1. display 设为 none
1. position 设为 absolute

display visibility 前者隐藏不占位、后者占位
visibility opacity 隐藏占位、前者不会触发、后者可以触发

### CSS优化、提高性能的方法有哪些？

1，首推的是合并css文件，如果页面加载10个css文件，每个文件1k，那么也要比只加载一个100k的css文件慢。

2，减少css嵌套，最好不要套三层以上。

3，不要在ID选择器前面进行嵌套，ID本来就是唯一的而且人家权值那么大，嵌套完全是浪费性能。

4，建立公共样式类，把相同样式提取出来作为公共类使用，比如我们常用的清除浮动等。

5，减少通配符*或者类似[hidden="true"]这类选择器的使用，挨个查找所有...这性能能好吗？当然重置样式这些必须 的东西是不能少的。

6，巧妙运用css的继承机制，如果父节点定义了，子节点就无需定义。

7，拆分出公共css文件，对于比较大的项目我们可以将大部分页面的公共结构的样式提取出来放到单独css文件里， 这样一次下载后就放到缓存里，当然这种做法会增加请求，具体做法应以实际情况而定。

8，不用css表达式，表达式只是让你的代码显得更加炫酷，但是他对性能的浪费可能是超乎你的想象的。

9，少用css rest，可能你会觉得重置样式是规范，但是其实其中有很多的操作是不必要不友好的，有需求有兴趣的 朋友可以选择normolize.css

10，cssSprite，合成所有icon图片，用宽高加上bacgroud-position的背景图方式显现出我们要的icon图，这是一种 十分实用的技巧，极大减少了http请求。

11，当然我们还需要一些善后工作，CSS压缩(这里提供一个在线压缩 YUI Compressor ，当然你会用其他工具来压缩是十 分好的)，

12，GZIP压缩，Gzip是一种流行的文件压缩算法，详细做法可以谷歌或者百度。

[前端性能优化-gzip压缩](https://zhuanlan.zhihu.com/p/37429159)

### 动画的6种方式
javascript直接实现；
SVG（可伸缩矢量图形）；
CSS3 transition；
CSS3 animation；
Canvas动画；
requestAnimationFrame；
requestAnimationFrame是另一种Web API，原理与setTimeout和setInterval类似，都是通过javascript持续循环的方法调用来触发动画动作。但是requestAnimationFrame是浏览器针对动画专门优化形成的APi，在性能上比另两者要好。

### 常见兼容性问题？

1. png24位的图片在iE6浏览器上出现背景，解决方案是做成PNG8.
1. 浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一。
1. IE6双边距bug:块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大。
1. 浮动ie产生的双倍距离 #box{ float:left; width:10px; margin:0 0 0 100px;}
1. 这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入 ——_display:inline;将其转化为行内属性。(_这个符号只有ie6会识别)
1. 渐进识别的方式，从总体中逐渐排除局部。
1. 首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
```
  css
      .bb{
          background-color:#f1ee18;/*所有识别*/
          .background-color:#00deff\9; /*IE6、7、8识别*/
          +background-color:#a200ff;/*IE6、7识别*/
          _background-color:#1e0bd1;/*IE6识别*/
      }
```
1. IE下,可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性;Firefox下,只能使用getAttribute()获取自定义属性。解决方法:统一通过getAttribute()获取自定义属性。
1. IE下,even对象有x,y属性,但是没有pageX,pageY属性;Firefox下,event对象有pageX,pageY属性,但是没有x,y属性。
1. 解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。
1. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。
1. 超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:L-V-H-A :  a:link {未被点击} a:visited {已被点击} a:hover {悬浮} a:active {点击变化}

### png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？
1.png:无损压缩，尺寸比jpg/jpeg大，只适合做小图标。

可细分为png-8/png-24:1个小格子(像素)使用的二进制位数越多，色彩越丰富;8位有256种颜色，24位有1600万颜色。

2.jpg/jpeg:采用了压缩算法，有一点失真，比png小很多

3.gif:一般只做动图，正在被google的webm格式取代中

4.webm:google提出的一种新的文件格式,在youtube、flash支持都不错,移动设备的流畅度

### 有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度。

1. 绝对布局， top100px其他为0；
2. flex，display: flex; flex-flow: column wrap; 填满剩下的高度为flex： 1；

### 移动端1px细线解决方案

















## Vue
### 请解释下你对EventEmitter的理解

### 使用ES6语法封装一个事件对象(EventEmitter)
```
class EventEmitter{
    constructor(){
        this._events={}
        是一个对象，用来存储事件名以及对应的回调函数
    }
    添加事件
    on (event, cb) {
        (this.events[event] || this.events[event] = []).push(cb)
        return this
    }

    清除指定事件
    off (event, cb) {
        if (!cb) { 
            this.events[event] = null 
        } else {
            this.events[event].some((fn, i) => {
                if (cb === fn) {
                    this.events[event].splice(i, 1)
                    return true
                }
            })
        }

        return this
    }

    首先判断是否注册该事件，未注册则报错，如果注册了则执行该函数
    emit (event, ...args) {
        const cbs = this.events[event]

        if (!cbs) {
            throw new Error(`${event} event is not registered.`)
        }

        cbs.forEach(cb => cb.apply(this, args))

        return this
    }
    执行完毕一次清除，执行了off
    once (event, cb) {
        const func = (...args) => {
            this.off(event, func)
            cb.apply(this, args)
        }
        this.on(event, func)

        return this
    }
}

// 测试
let ee = new EventEmitter();
function a() {
    console.log('a')
}
function b() {
    console.log('b')
}
function c() {
    console.log('c')
}
function d(...a) {
    console.log('d',...a)
}
ee.on('TEST1', a).on('TEST2', b).once('TEST2', c).on('TEST2',d);

ee.emit('TEST1');
console.log('....')
ee.emit('TEST2');
// In test2
// In test2 again
console.log('....')
ee.emit('TEST2');

class EventEmitter {
    constructor() {
        this.eventMap = {}
        this.onceEventMap = {}
        //存储事件监听函数
        this.event = new Proxy({}, {
            set: (target, property, fn) => {
                this.eventMap[property] || (this.eventMap[property] = [])
                this.eventMap[property].push(fn)
                return true
            }
        })  
        this.onceEvent = new Proxy({}, {
            set: (target, property, fn) => {
                this.onceEventMap[property] || (this.onceEventMap[property] = [])
                this.onceEventMap[property].push(fn)
                return true
            }
        })
    }
    添加事件
    on(name, fn) {
        this.event[name] = fn
        delete this.onceEventMap[name]
    }
    off(name) {
        delete this.eventMap[name]
        delete this.onceEventMap[name]
    }
    触发事件
    emit(name, ...val) {
        this.eventMap[name] && this.eventMap[name].forEach(fn => {
            fn(...val)
        })
        this.onceEventMap[name] && (this.onceEventMap[name].forEach(fn => {
            fn(...val)
        }), this.off(name))
    }
    //执行后立即销毁
    once(name, fn) {
        this.onceEvent[name] = fn
        delete this.eventMap[name]
    }
```

### 为什么使用key?
答：需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点。
作用主要是为了高效的更新虚拟DOM。

### 组件间的通信
[vue组件间通信六种方式（完整版）](https://www.cnblogs.com/shaozhu520/p/10926647.html)
父子 $emit props/event children ref provide/inject
兄弟 eventBus vuex
跨级 eventBus vuex provide.inject

### v-show 与 v-if 区别
1. v-show通过CSS控制显示，v-if需要重绘。

### 计算属性和 watch 的区别
1. 两者都是监听值的变化，进行处理
1. 前置初始化时会执行，用来对数据进行处理，后者不会，且用来处理变化后的逻辑问题。

### 组件 data 为什么必须是函数
每个组件都是 Vue 的实例。
组件共享 data 属性，当 data 的值是同一个引用类型的值时，改变其中一个会影响其他。

### Vue 应用性能优化

### 对于MVVM的理解
MVVM 是 Model-View-ViewModel 的缩写

Model 代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。
View 代表UI 组件，它负责将数据模型转化成UI 展现出来。
ViewModel 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步View 和 Model的对象，连接Model和View桥梁


### 怎么快速定位哪个组件出现性能问题
用 timeline 工具。 大意是通过 timeline 来查看每个函数的调用时常，定位出哪个函数的问题，从而能判断哪个组件出了问题

### vue项目代码拆分
require.ensure() 方法来实现代码打包分离

const notFound = r => require.ensure([], () => r(require('@views/common/404')), 'index')
require.ensure() 是 webpack 特有的，已经被 import() 取代。
const notFound = () => import(/* webpackChunkName: "index" */ '@views/common/404')

### 动态修改Vue项目中的页面title
```
main.js
// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

v-title data-title="的页面"
```

### router钩子函数
router.beforeEach((to, from, next) => {
router.afterEach（全局后置守卫）

beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

动态添加路由 router.addRoutes(DynamicRoutes)

[详解基于vue，vue-router, vuex以及addRoutes进行权限控制](https://www.cnblogs.com/zhengrunlin/p/8981017.html)


### 绑定 class 的数组用法
对象方法 v-bind:class="{'orange': isRipe, 'green': isNotRipe}"
数组方法v-bind:class="[class1, class2]"
行内 v-bind:style="{color: color, fontSize: fontSize+'px' }"


watch 是一个对象时，它有哪些选项？
watch 配置 handler，deep 是否深度，immeditate 是否立即执行

### 事件修饰符
绑定一个原生的click事件， 加native，其他事件修饰符
stop prevent self

### 组合键
click.ctrl.exact 只有ctrl被按下的时候才触发

组件中 data 为什么是函数
为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？
因为组件是用来复用的，JS 里对象是引用关系，这样作用域没有隔离，而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。


### 生命周期
创建前后、载入前后、更新前后、销毁前后 beforeCreate/created beforeMount/mounted beforeUpdate/updated beforeDestory/destoryed

在beforeCreate 阶段，vue实例的挂载元素el和数据对象data都为undefined
在created阶段，vue实例的数据对象有了，el还没有。
在mounted阶段，vue实例挂载完成，data成功渲染。
在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前未虚拟的DOM节点，data尚未替换。
当data变化时，会触发beforeUpdate和updated方法。这两个不常用，不推荐使用。
beforeDestory是在vue实例销毁前触发，一般在这里要通过removeEventListener解除手动绑定的事件。实例销毁后，触发的destroyed。

### 父子组件的生命周期
beforeCreate/created beforeMount/
  beforeCreate/created beforeMount/mounted 
mounted

### 父子组件 props
数组变化是触发beforeUpdate/updated

### nextTick
$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调

Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM，
Vue.js在默认情况下，每次触发某个数据的setter方法后，对应的 Watcher 对象会被 push 进一个队列中，它会在下一次tick的时候将这些watcher拿出来，执行一遍对应的patch操作。

### Vue 组件 data 为什么必须是函数？
在创建或注册模板的时候，传入一个data属性作为用来绑定的数据。但是在组件中，data必须是一个函数，而不能直接把一个对象赋值给它。这样每一个实例的data属性都是独立的，不会相互影响了。

它首先需要创建一个组件构造器，然后注册组件。注册组件的本质其实就是建立一个组件构造器的引用。使用组件才是真正创建一个组件实例。所以，注册组件其实并不产生新的组件类，但会产生一个可以用来实例化的新方式。这样每一个实例的data属性都是独立的，不会相互影响了。



### props
type 类型检查 default 默认值 required 必传 validator 自定义验证函数

### 路由的跳转方式
一般有两种

<router-link to='home'> router-link标签会渲染为<a>标签，咋填template中的跳转都是这种；
另一种是编程是导航 也就是通过js跳转 比如 router.push('/home')
Vue.js 2.x 双向绑定原理
这个问题几乎是面试必问的，回答也是有深有浅。基本上要知道核心的 API 是通过 Object.defineProperty() 来劫持各个属性的 setter / getter，在数据变动时发布消息给订阅者，触发相应的监听回调，这也是为什么 Vue.js 2.x 不支持 IE8 的原因（IE 8 不支持此 API，且无法通过 polyfill 实现）。
https://cn.vuejs.org/v2/guide...

什么是 MVVM，与 MVC 有什么区别
http://www.ruanyifeng.com/blo...

```
nextTick()
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后，立即使用这个回调函数，获取更新后的 DOM。

// 修改数据
vm.msg = 'Hello'
// DOM 还未更新
Vue.nextTick(function () {
  // DOM 更新
})
```
### Vue Complier 实现
compile阶段主要分为parse、optimize、和genarate阶段，最后生成render function

parse: parse的作用是通过正则匹配整个template,来生成一个叫抽象语法树(AST，简单来说就是一个json对象)的东西。
optimize:主要是用来标记静态节点。所谓静态节点简单理解就是页面中写死的部分(不涉及vue的内容)。标记静态节点的作用是再更新视图时，会有一个patch过程来对比新旧虚拟DOM,若是静态节点则可以直接跳过，这是vue中关于性能的一处优化。
genarate:主要是将AST,转换为render function字符串。

### 理解Vue中的Render渲染函数
https://www.cnblogs.com/tugen...
```
VUE一般使用template来创建HTML，然后在有的时候，我们需要使用javascript来创建html，这时候我们需要使用render函数。

render函数return一个createElement组件中的子元素存储在组件实列中 $slots.default 中。

return createElement('h1', this.title); createElement返回的是包含的信息会告诉VUE页面上需要渲染什么样的节点及其子节点。我们称这样的节点为虚拟DOM，可以简写为VNode。

createElement 参数
{String | Object | Function}
一个HTML标签字符串，组件选项对象，或者一个返回值类型为String/Object的函数。该参数是 必须的

子节点
子节点，可选，String 或 Array

Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 由子节点构成的数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

对于Vue自带的响应式系统，并不是咱们今天要聊的东西。我们还是回到Vue的虚拟DOM中来。对于虚拟DOM，咱们来看一个简单的实例，就是下图所示的这个，详细的阐述了模板 → 渲染函数 → 虚拟DOM树 → 真实DOM的一个过程

### 


### keep-alive
https://cn.vuejs.org/v2/guide

### 自定义组件的语法糖 v-model 是怎样实现的
1. v-model本质上就是语法糖
怎样理解单向数据流
这个概念出现在组件通信。父组件是通过 prop 把数据传递到子组件的，但是这个 prop 只能由父组件修改，子组件不能修改，否则会报错。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。
一般来说，对于子组件想要更改父组件状态的场景，可以有两种方案：
在子组件的 data 中拷贝一份 prop，data 是可以修改的，但 prop 不能：

```js
export default {
  props: {
    value: String
  },
  data () {
    return {
      currentValue: this.value
    }
  }
}
如果是对 prop 值的转换，可以使用计算属性：

export default {
  props: ['size'],
  computed: {
    normalizedSize: function () {
      return this.size.trim().toLowerCase();
    }
  }
}
```

### 自定义指令


```
directives: {
  dir1: {
            inserted(el) {



Vue.directive('dir2', {
    inserted(el) {
        console.log(el);
    }
})
```

### 切换到新路由时，页面要滚动到顶部或保持原先的滚动位置怎么做呢

滚动到顶部：在new Router()的时候，配置
scrollBehavior(to, from, savedPosition) {
return { x: 0, y: 0 }
}

### 怎么实现路由懒加载呢
1.vue的异步组件：resolve=>require(['需要异步加载的组件']，resolve)
2.es6的import方法：（）=>import(需要异步加载的组件)
3.webpack的 require.ensure： r => require.ensure([],()=>r( require(需要异步加载的组件))，chunkName)

### SPA首屏加载速度慢的怎么解决

1.通过Gzip压缩
2.使用路由懒加载
3.利用webpack中的externals这个属性把打包后不需要打包的库文件都分离出去，减小项目打包后的大小
4.使用SSR渲染


### 发布订阅模式主要包含哪些内容呢?
发布函数，发布的时候执行相应的回调
订阅函数，添加订阅者,传入发布时要执行的函数,可能会携额外参数
一个缓存订阅者以及订阅者的回调函数的列表

用于存储订阅的事件名称以及回调函数列表的键值对

observer每个对象的属性，添加到订阅者容器Dependency(Dep)中，当数据发生变化的时候发出notice通知。
Watcher：某个属性数据的监听者/订阅者，一旦数据有变化，它会通知指令(directive)重新编译模板并渲染UI

### diff算法

传统的diff算法，是需要跨级对比两个树之间的不同，时间复杂度为O(n^3)，这样的对比是无法接受的，所以react提出了一个简单粗暴的diff算法，只对比同级元素，这样算法复杂度就变成了O(n)了，虽然不能做到最优的更新，但是时间复杂度大大减少，是一种平衡的算法，下面会提到。


基于diff算法的同级对比，我们先讲下对比的过程中，它主要分为四种类型的对比，分别为:
1、新建create： 新的vd中有这个节点，旧的没有
2、删除remove： 新的vd中没有这个节点，旧的有
3、替换replace： 新的vd的tagName和旧的tagName不同
4、更新update： 除了上面三点外的不同，具体是比较attributes先，然后再比较children


### addEventListener

### 双向绑定原理
采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty（）来劫持各个属性，需要深度遍历整个对象进行劫持。缺点不能劫持新增属性和数组。vue 3.0 采用ES6 proxy对数据进行劫持。缺点是兼容问题。

利用watcher搭起observer和Compile之间的通信桥梁，达到数据变化 —>视图更新；视图交互变化（input）—>数据model变更双向绑定效果。

1. vue是通过Object.defineProperty()来实现数据Object.defineProperty（）来劫持各个属性的
劫持的，以及发布者-订阅模式来实现的
1. 3.0采用ES6代理Proxy实现

```js
Object.defineProperty(obj, prop, descriptor)
let p = new Proxy(target, handler);

let obj = {};
let handler = {
  get(target, property) {
   console.log(property, '被读取');
   return property in target ? target[property] : 3;
  },
  set(target, property, value) {
   console.log(property, '被设置为', value);
   target[property] = value;
  }
}
let p = new Proxy(obj, handler);
p.name = 'tom' //name 被设置为 tom
p.age; //age 被读取 3

target: 是用Proxy包装的被代理对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
handler: 是一个对象，其声明了代理target 的一些操作，其属性是当执行一个操作时定义代理的行为的函数。
p是Proxy对象，当其他操作对p进行更改的时候，会执行handler对象的方法。Proxy有13种数据劫持的操作，常用的handler处理方法：

get: 读取值，
set: 设置值，
has: 判断对象是否拥有该属性，
construct: 构造函数
```

### Proxy 与 Object.defineProperty 对比
1. 只能对属性进行数据劫持，所以需要深度遍历整个对象
1. 对于数组不能监听到数据的变化

proxy劣势就是兼容性问题,而且无法用polyfill磨平,因此Vue的作者才声明需要等到下个大版本(3.0)才能用Proxy重写

[实现双向绑定Proxy比defineproperty优劣如何](https://www.jianshu.com/p/2df6dcddb0d7)

### 如何实现双向绑定原理 Proxy 函数？
```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value);
      return Reflect.set(target, property, value);
    }
  };
  return new Proxy(obj, handler);
};

let obj = { a: 1 }
let value
let p = onWatch(obj, (v) => {
  value = v
}, (target, property) => {
  console.log(`Get '${property}' = ${target[property]}`);
})
p.a = 2 // bind `value` to `2`
p.a // -> Get 'a' = 2



let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get (tag, prop, res) {
      getLogger(tag, prop)
      return Reflect.get(tag, prop, res)
    },
    set (tag, prop, value, res) {
      setBind(value)
      return Reflect.set(tag, prop, value)
    }
  }
  return new Proxy(obj, handler)
}
let obj = {a: 11, b: 2}
let p = onWatch(obj, () => {}, () => {})
p.a = 1
p.b = 4
```

### vue双向数据绑定不能监听情况？
如何data里面定义了没有键值的对象，getter和setter函数无法监听到数据变化。
vue双向数据绑定对于数组和新增对象属性不能监听的[解决办法](https://www.cnblogs.com/sweeeper/p/11903927.html)
1. 运用this.$forceUpdate()强制刷新。
2. 使用vm.$set(vm.items, indexOfItem, newValue)

### Vue的data数据更新是异步的
[怎么实现](https://github.com/berwin/Blog/issues/22)
使用异步更新队列，进行异步DOM更新。$nextTick回调

### vue-router的两种模式
hash模式：即地址栏 URL 中的 # 符号；
history模式：window.history对象打印出来可以看到里边提供的方法和记录长度。利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。（需要特定浏览器支持）。
服务端需要对路径进行处理，因为文件是不存在的，需要重定向到index.html

### Route和Router的区别

$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
而$router是“路由实例”对象包括了路由的跳转方法，钩子函数等

### 如何让Css只在当前组件中起作用
将当前组件的style修改为style scoped

### virtual DOM

diff算法

### Vuex
核心是State变量 Getter基于state的映射数据 通过Mutation同步修改vuex的store中状态 Action异步分发处理Mutation 通过Module实现模块化管理
通过辅助函数处理：...mapActions处理 ...mapGetters映射

### vuex页面刷新问题
[vuex页面刷新问题](https://www.cnblogs.com/mrzhu/p/11005712.html)
1：设置state为null,然后在对应的getters里面添加sessionStorage控制,在mutations里面添加对应sessionStorage控制
缺点:必须为state设置为null,并且必须为每一个getters添加sessionStorage控制,比较繁琐
2：在页面初始化的时候,取出所有的保存在sessionStorage里面的值,同时在页面刷新前,将所有的state保存在sessionStorage里面
缺点:beforeunload在移动端有兼容性问题

### Vue.js中ajax请求代码应该写在组件的methods中还是vuex的actions中？
答：如果请求来的数据是不是要被其他组件公用，仅仅在请求的组件内使用，就不需要放入vuex 的state里。
如果被其他地方复用，这个很大几率上是需要的，如果需要，请将请求放入action里，方便复用。

### Vuex与localStorage
[vue组件间通信六种方式](https://www.cnblogs.com/hpx2020/p/10936279.html)

vuex 是 vue 的状态管理器，存储的数据是响应式的。但是并不会保存起来，刷新之后就回到了初始状态，具体做法应该在vuex里数据改变的时候把数据拷贝一份保存到localStorage里面，刷新之后，如果localStorage里有保存的数据，取出来再替换store里的state。

### slot插槽
[插槽 slot](https://www.jianshu.com/p/31674b727954)
[scoped-slots](https://vue.docschina.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD-scoped-slots)
```
单个插槽
当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身。
`<slot>`内的为备用内容，父组件为空时，才会显示备用内容。

命名插槽
solt元素可以用一个特殊的特性name来进一步配置如何分发内容。多个插槽可以有不同的名字。
这样可以将父组件模板中 slot 位置，和子组件 slot 元素产生关联，便于插槽内容对应传递

作用域插槽scoped slots
可以访问组件内部数据的可复用插槽(reusable slot)
在父级中，具有特殊特性 slot-scope 的<template> 元素必须存在，表示它是作用域插槽的模板。slot-scope 的值将被用作一个临时变量名，此变量接收从子组件传递过来的 prop 对象。
```

























## nuxt
其基本实现原理

app.js 作为客户端与服务端的公用入口，导出 Vue 根实例，供客户端 entry 与服务端 entry 使用。客户端 entry 主要作用挂载到 DOM 上，服务端 entry 除了创建和返回实例，还进行路由匹配与数据预获取。
webpack 为客服端打包一个 Client Bundle ，为服务端打包一个 Server Bundle 。
服务器接收请求时，会根据 url，加载相应组件，获取和解析异步数据，创建一个读取 Server Bundle 的 BundleRenderer，然后生成 html 发送给客户端。
客户端混合，客户端收到从服务端传来的 DOM 与自己的生成的 DOM 进行对比，把不相同的 DOM 激活，使其可以能够响应后续变化，这个过程称为客户端激活 。为确保混合成功，客户端与服务器端需要共享同一套数据。在服务端，可以在渲染之前获取数据，填充到 stroe 里，这样，在客户端挂载到 DOM 之前，可以直接从 store 里取数据。首屏的动态数据通过 window.__INITIAL_STATE__ 发送到客户端
Vue SSR 的实现，主要就是把 Vue 的组件输出成一个完整 HTML, vue-server-renderer 就是干这事的

Vue SSR 需要做的事多点（输出完整 HTML），除了 complier -> vnode，还需如数据获取填充至 HTML、客户端混合（hydration）、缓存等等。 相比于其他模板引擎（ejs, jade 等），最终要实现的目的是一样的，性能上可能要差点

[VUE（nuxt）项目性能监测统计](https://www.jianshu.com/p/2bbce858ef0f)

相比于next，性能最差。

基于 Vue.js 自动代码分层 服务端渲染 强大的路由功能，支持异步数据 静态文件服务 ES6/ES7 语法支持 打包和压缩 JS 和 CSS HTML头部标签管理 本地开发支持热加载 集成ESLint 支持各种样式预处理器： SASS、LESS、 Stylus等等

### 优化思路
[Vue项目SSR改造实战](https://segmentfault.com/a/1190000012440041)

通过nginx进行请求转发，实现静态资源/static，SSR Server，data Server

### 原理
![](https://img-blog.csdnimg.cn/20190702173158457.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlYmpoaA==,size_16,color_FFFFFF,t_70)
```
服务端：
nuxt生命周期
Incoming Request 发送请求
nuxtServerInit 服务端初始化
middleware 中间件运行
validata() 校验参数
asyncDate 异步数据处理
asyncData 既可以充应用的状态树（store）数据，也可以设置组件的数据。
fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。
Render 开始客户端渲染


服务端与客户端：
beforeCreate和created
只有beforeCreate和created会在服务的渲染时会被调用

客户端：
其他
```

当我们从浏览器的地址栏中键入一条请求时，请求被交给了 nuxt 服务器（或者 nginx→nuxt）。
nuxt 服务器解析 vue 组件（中的 asyncData 方法），并将数据绑定到 html。然后再返回给浏览器。
当我们通过点击 router-link 跳转时整个应用依旧是无刷新的单页应用。且会在 window.history 中键入记录。
因此对于任意一个 vue 组件其被访问的情况分为两种，浏览器端渲染和 nuxt 服务器端渲染。
了解 nuxt 最快的方式就是了解 nuxt 的生命周期，了解 nuxt 生命周期最快的方式自然是 conlose.log () 了。

### Nuxt.js项目如何在asyncData ()生命周期中获取vuex实例
虽然无法直接使用this来调用vuex实例，但是我们可以使用asyncData方法中的第一个参数：ctx（上下文对象），该参数包含了当前环境所有信息。通过ctx.store就可以获取到vuex 实例

async asyncData(ctx) {
  console.log('username：'+ctx.store.state.user.userName)
}

### 与vue的区别
Vue 的渲染过程，首先每个组件都会被编译生成一个渲染函数（这部分基本 webpack 打包已经做掉），然后渲染函数生成虚拟 dom，最后虚拟 dom 通过 patch 方法将真实 dom 渲染到页面上

Nuxt 其实就是将这部分放到了服务端去做，在服务端拿到渲染页面所需要的 html，从而使得 html 能够直出

### 性能优化思考

1. 项目没做缓存，所以每次访问都会经历所有 Nuxt 生命周期，消耗 cpu，这点是最致命的
1. 项目打包默认 gzip。Nuxt 项目打包会默认在服务端开启 gzip，因为我们网关层已经做了 gzip，所以这里是不必要的，测试了下关掉 gzip 吞吐量和响应时间都能提高 20% 左右
1. API 请求比较乱。很多请求并没有很好地区分客户端和服务端，而是都由服务端去做了，造成服务端压力过大，其实多数和用户有关的请求理应放到客户端。有的接口为了方便，一次性返回了所有内容，也没有做客户端/服务端区分。另外，服务端的接口请求可以并发，用类似 Promise.all 的形式去控制
1. SEO。有的内容页面，很长，有五个部分，除了内容外，还有猜你喜欢等其他部分，询问了 SEO 同事，说这几部分都是需要 SEO 的，我不是很懂 SEO，但是在我看来，ssr 只应该渲染首屏内容，而 UI 在设计的时候应该把主要内容设计到首屏，从而满足 SEO


```
const LRU = require('lru-cache')  
let cachePage = new LRU({ 
 max: 100, // 缓存队列长度  
 maxAge: 1000 * 60 // 缓存1分钟 
})  
export default function(req, res, next){  
  let url = req._parsedOriginalUrl  
  let pathname = url.pathname 
  // 通过路由判断，只有首页才进行缓存 
  if (['/home'].indexOf(pathname) &gt; -1) {  
    const existsHtml = cachePage.get('homeData')  
    if (existsHtml) { 
      return res.end(existsHtml.html, 'utf-8')  
    } else {  
      res.original_end = res.end  
      // 重写res.end  
      res.end = function (data) { 
        if (res.statusCode === 200) { 
         // 设置缓存  
         cachePage.set('homeData', { html: data}) 
        } 
        // 最终返回结果 
        res.original_end(data, 'utf-8') 
      } 
    } 
  } 
  next()  
}
```

1. nginx负载均衡处理
1. nuxt 缓存处理
1. nuxt 静态资源打包

### pm2
pm2 是 nodejs 的一个带有负载均衡功能的应用进程管理器的模块，类似有 Supervisor，forever，用来进行进程管理。

```
pm2 start npm --name nuxt -- start
pm2 简单介绍
pm2 是 nodejs 的一个带有负载均衡功能的应用进程管理器的模块，类似有 Supervisor，forever，用来进行进程管理。

一、安装：
npm install pm2 -g

二、启动：
pm2 start app.js

pm2 start app.js --name my-api #my-api 为 PM2 进程名称

pm2 start app.js -i 0 #根据 CPU 核数启动进程个数

pm2 start app.js --watch #实时监控 app.js 的方式启动，当 app.js 文件有变动时，pm2 会自动 reload

三、查看进程：
pm2 list

pm2 show 0 或者 # pm2 info 0 #查看进程详细信息，0 为 PM2 进程 id

四、监控：
pm2 monit

五、停止：
pm2 stop all #停止 PM2 列表中所有的进程

pm2 stop 0 #停止 PM2 列表中进程为 0 的进程

六、重载：
pm2 reload all #重载 PM2 列表中所有的进程

pm2 reload 0 #重载 PM2 列表中进程为 0 的进程

七、重启：
pm2 restart all #重启 PM2 列表中所有的进程

pm2 restart 0 #重启 PM2 列表中进程为 0 的进程

八、删除 PM2 进程：
pm2 delete 0 #删除 PM2 列表中进程为 0 的进程

pm2 delete all #删除 PM2 列表中所有的进程

九、日志操作：
pm2 logs [--raw] #Display all processes logs in streaming

pm2 flush #Empty all log file

pm2 reloadLogs #Reload all logs

十、升级 PM2：
npm install pm2@lastest -g #安装最新的 PM2 版本

pm2 updatePM2 #升级 pm2

十一、更多命令参数请查看帮助：
pm2 --help

```


















## 浏览器API
### 浏览器内核
Trident内核(IE-ms)：
IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]

Gecko内核(Firefox-moz)：
Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等

Presto内核(Opera-o)：
Opera7及以上。      [Opera内核原为：Presto，现为：Blink;]

Webkit内核(Chrome/Safari-webkit)：
Safari,Chrome等。   [ Chrome的：Blink（WebKit的分支）]

详细文章：[浏览器内核的解析和对比](http://www.cnblogs.com/fullhouse/archive/2011/12/19/2293455.html)

### 浏览器API本地存储区别
Cookie、sessionStorage、localStorage

> 相同点：
都是存储数据，存储在web端，并且都是同源

> 不同点：
- cookie 只有4K 小 并且每一次请求都会带上cookie 体验不好，浪费带宽
cookie还可以设置过期时间，当超过时间期限后，cookie就会自动消失。
- session和local直接存储在本地，请求不会携带，并且容量比cookie要大的多
- session 是临时会话，当窗口被关闭的时候就清除掉 ，而 local永久存在，cookie有过期时间
- cookie 和local都可以支持多窗口共享，而session不支持多窗口共享 但是都支持a链接跳转的新窗口

适用场景：

### 本地存储图片

### 内存泄露

- 意外的全局变量: 无法被回收
- 定时器: 未被正确关闭，导致所引用的外部变量无法被释放
- 事件监听: 没有正确销毁 (低版本浏览器可能出现)
- 闭包: 会导致父级中的变量无法被释放
- dom 引用: dom 元素被删除时，内存中的引用未被正确清空

### 浏览器缓存
[浏览器缓存](https://juejin.im/entry/5a5450dff265da3e5033a066)
强制缓存优先于协商缓存进行，若强制缓存`(Expires和Cache-Control)`生效则直接使用缓存，若不生效则进行协商缓存(`Last-Modified` / `If-Modified-Since`和`Etag` / `If-None-Match`)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回200，重新返回资源和缓存标识，再存
入浏览器缓存中；生效则返回304，继续使用缓存。
> 强缓存

- Expires 缓存过期时间点 http1
- Cache-Control http1.1 缓存过期时间内 优先级更高

> 协商缓存

- Last-Modified和If-Modified-Since 判断服务的修改时间
- ETag和If-None-Match  hashID进行唯一值判断

```
graph TD;
  User(用户请求资源) --> isCache(是否存在缓存);
  isCache --> |Yes|isTime(判断缓存是否过期);
  isCache --> |No|noTime(向服务器请求);
  isTime --> |Yes|isTime1(判断ETag);
  isTime --> |No|noTime1(直接使用缓存内容);
  noTime1 --> noTime6
  isTime1 --> |Yes|isTime2(向服务器请求If-none-match);
  isTime1 --> |No|noTime2(判断Last-modified);
  isTime2 --> isTime3(服务器返回200或304);
  noTime2 --> |Yes|isTime4(向服务器请求If-none-match);
  noTime2 --> |No|noTime4(判断Last-modified);
  isTime4 --> isTime3;
  isTime3 --> |304|isTime5(服务器304使用缓存);
  isTime3 --> |200|noTime5(请求响应缓存协商);
  noTime --> noTime5
  isTime5 --> noTime6(返回展示资源);
  noTime5 --> noTime6
  A-->C;
  B-->D;
  C-->D;
```

> Expires
> Cache-Control
```
Cache-Control包括：max-age / s-maxage/public/private/no-cache/no-store/must-revalidate等
```

- max-age：指定设置缓存最大的有效时间，定义的是时间长短
- s-maxage：同max-age，只用于共享缓存（比如CDN缓存）
- public：指定响应会被缓存，并且在多用户间共享。
- private：响应只作为私有的缓存（见下图），不能在用户间共享
- no-cache：指定不缓存响应，表明资源不进行缓存
- no-store：绝对禁止缓存
- must-revalidate：指定如果页面是过期的，则去服务器进行获取

> Last-Modified和If-Modified-Since

当浏览器再次进行请求时，会向服务器传送If-Modified-Since报头，询问Last-Modified时间点之后资源是否被修改过。如果没有修改，则返回码为304，使用缓存；如果修改过，则再次去服务器请求资源，返回码和首次请求相同为200，资源为服务器最新资源。

> ETag和If-None-Match

使用ETag可以解决Last-modified存在的一些问题：
a、某些服务器不能精确得到资源的最后修改时间，这样就无法通过最后修改时间判断资源是否更新 
b、如果资源修改非常频繁，在秒以下的时间内进行修改，而Last-modified只能精确到秒 
c、一些资源的最后修改时间改变了，但是内容没改变，使用ETag就认为资源还是没有修改的。

## 性能优化

### 页面重构怎么操作
网站重构：在不改变外部行为的前提下，简化结构、添加可读性，而在网站前端保持一致的行为。
也就是说是在不改变UI的情况下，对网站进行优化，在扩展的同时保持一致的UI。

对于传统的网站来说重构通常是：

表格(table)布局改为DIV+CSS
使网站前端兼容于现代浏览器(针对于不合规范的CSS、如对IE6有效的)
对于移动平台的优化
针对于SEO进行优化
深层次的网站重构应该考虑的方面

减少代码间的耦合
让代码保持弹性
严格按规范编写代码
设计可扩展的API
代替旧有的框架、语言(如VB)
增强用户体验
通常来说对于速度的优化也包含在重构中

压缩JS、CSS、image等前端资源(通常是由服务器来解决)
程序的性能优化(如数据读写)
采用CDN来加速资源加载
对于JS DOM的优化
HTTP服务器的文件缓存

### web性能优化

降低请求量：合并资源，减少HTTP 请求数，minify / gzip 压缩，webP，lazyLoad。
加快请求速度：预解析DNS，减少域名数，并行加载，CDN 分发。

缓存：HTTP 协议缓存请求，离线缓存 manifest，离线数据缓存localStorage。

渲染：JS/CSS优化，加载顺序，服务端渲染，pipeline。

### 你有用过哪些前端性能优化的方法？

1. 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。

2. 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数

3. 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。

4. 当需要设置的样式很多时设置className而不是直接操作style。

5. 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。

6. 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。

7. 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。

8. 避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。

对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘IO。向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如join查询），减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。程序优化永远要优化慢的部分，换语言是无法“优化”的。


### 负载均衡
系统均衡指的是前端请求要均匀地分配给后端机器，同时，同一用户要尽可能分配给同一机器。

负载算法: 既然要解决后端系统的承载能力，那我们就有很多方式
静态配置
动态调整

均衡算法: 均衡算法主要解决将请求如何发送给后端服务。

随机算法: 随机算法就是通过一个随机函数将所有请求分散到各个节点上

轮询算法: 轮询算法就是将所有节点以同样的概率向外提供服务
但是它没有考虑各个节点之间的性能差别，对于同样数目的请求，性能好的节点能够轻松完成，而性能差的节点完成的比较费力。因此，我们提出了加权轮询算法，为不同性能的节点赋予不同权重。

哈希算法: 通常将用户 id 或 ip 作为key，计算出对应的hash值，然后再对节点数量取模，即hash(key) mode n，其中n为节点数，得到该用户请求落到哪个节点上。

该方法可以做到让同一个请求落到同一个节点中，但是当节点数量发生动态变化时，该方法就不太适应了。此时，就应该使用一致性hash算法。一致性hash算法就是把每台server分成v个虚拟节点，再把所有虚拟节点（n*v）随机分配到一致性哈希的圆环上，这样所有的用户从自己圆环上的位置顺时针往下取到第一个vnode就是自己所属的节点。当此节点存在故障时，再顺时针取下一个作为替代节点。

Nginx异步框架的网页服器, 可以用作反向代理、负载平衡器和HTTP缓存。

- 软件成熟，2002年诞生到2019年，经过多年的沉淀和各大互联网公司的实践改进，Nginx 已经非常成熟，网上教程丰富，易于开发者维护。
- 高性能Web服务器，单机能够支持高达 50,000 个并发连接数的响应。
- 异步的、非阻塞，使用了epoll和kqueue模型，压缩请求和相应数据大小，节省宽带。
- 优秀的反向代理服务器，隐藏 Server 地址，提高安全性。
- 支持 Http 缓存

## HTTP
### GET和POST区别
> GET - 从指定的资源请求数据。

> POST - 向指定的资源提交要被处理的数据。

> 不同点：
- GET：不同的浏览器和服务器不同，一般限制在2~8K之间，更加常见的是1k以内。
- GET和POST的底层也是TCP/IP，GET/POST都是TCP链接。
- GET产生一个TCP数据包；POST产生两个TCP数据包。
- 对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
- 而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

### HTTP请求有哪些方式
- GET方法 用于使用给定的URI从给定服务器中检索信息
- POST方法 用于将数据发送到服务器以创建或更新资源
- HEAD方法 HEAD方法与GET方法相同，但没有响应体，仅传输状态行和标题部分。
- PUT方法 用于将数据发送到服务器以创建或更新资源
- DELETE方法用来删除指定的资源，它会删除URI给出的目标资源的所有当前内容。
- CONNECT方法 建立到给定URI标识的服务器的隧道
- OPTIONS方法 描述了目标资源的通信选项，会返回服务器支持预定义URL的HTTP策略
- TRACE方法 沿着目标资源的路径执行消息环回测试

### http状态码有那些？分别代表是什么意思？
- 100  Continue 继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
- 200  OK     正常返回信息
- 201  Created    请求成功并且服务器创建了新的资源
- 202  Accepted   服务器已接受请求，但尚未处理
- 301  Moved Permanently  请求的网页已永久移动到新位置。
- 302 Found     临时性重定向。
- 303 See Other   临时性重定向，且总是使用 GET 请求新的 URI。
- 304  Not Modified 自从上次请求后，请求的网页未修改过。
- 400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
- 401 Unauthorized 请求未授权。
- 403 Forbidden   禁止访问。
- 404 Not Found   找不到如何与 URI 相匹配的资源。
- 500 Internal Server Error  最常见的服务器端错误。
- 503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
- 504 服务端请求超时

### http头文件User-Agent
服务器能够识别客户使用的操作系统及版本、CPU 类型、浏览器及版本、浏览器渲染引擎、浏览器语言、浏览器插件等

###  如何解决跨域问题?
[前端常见跨域解决方案](https://segmentfault.com/a/1190000011145364)
```
jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面

jsonp 类似往页面添加一个script标签，通过src属性去触发对指定地址的请求,故只能是Get请求

window.name在页面的生命周期里共享一个window.name size是2M

利用nginx反向代理，将请求分发到部署到相应项目的tomcat服务器，当然也不存在跨域问题。

跨域资源共享（CORS）
普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求：前后端都需要设置。

七、nginx反向代理中设置proxy_cookie_domain
八、NodeJs中间件代理中cookieDomainRewrite参数的设置
```

### 一个图片url访问后直接下载怎样实现？

请求的返回头里面，用于浏览器解析的重要参数就是OSS的API文档里面的返回http头，决定用户下载行为的参数。
下载的情况下：

- x-oss-object-type:

Normal

2. x-oss-request-id:

598D5ED34F29D01FE2925F41

3. x-oss-storage-class:

Standard



### HTTP https
- 超文本传输协议HTTP两者区别一个明文传输、加密传输
- https需要申请证书
- http 80端口 https端口443
- https不可以访问http的连接

### HTTP的工作原理：一次HTTP操作称为一个事物，其工作过程可分为四步
1、Client与Server建立连接，单击某个超链接，HTTP的工作开始。
2、连接建立后，Client发送一个请求给Server，请求方式的格式为：统一资源标识符（URL）、协议版本号，后边是MIME信息包括请求修饰符，Client信息和可能的内容。
3、Server接到请求后，给予相应的响应信息，其格式为一个状态行，包括信息的协议版本号、一个成功或错误的代码，后边是MIME信息包括Server信息、实体信息和可能的内容。
4、Client接收Server返回的信息通过浏览器显示在用户的显示屏上，然后Client和Server断开连接。

### HTTPS的工作原理：
1、Client使用HTTPS的URL访问Web服务器，要求与Web服务器建立SSL连接。
2、Web服务器收到客户端请求后，会将网站的证书信息（证书中包含公钥）传送一份给客户端。 　　
3、客户端的浏览器与Web服务器开始协商SSL连接的安全等级，也就是信息加密的等级。 　　
4、客户端的浏览器根据双方同意的安全等级，建立会话密钥，然后利用网站的公钥将会话密钥加密，并传送给网站。 　　
5、Web服务器利用自己的私钥解密出会话密钥。 　　
6、Web服务器利用会话密钥加密与客户端之间的通信。

### 介绍SSL和TLS（寺库）
SSL: 一般情况下，网站使用的都是明文方式传输数据，但是在涉及到一些隐私信息时（如银行交易），这个时候网站就会跳转到 SSL，SSl的功能就是提供加密数据。这样的话，TCP/IP协议只要做好的自己的事情，数据加密就全权委托给SSL协议完成

TLS: 客户端证书解析，TLS是对SSL的扩展和优化，他可以提供数据安全的同时，确保数据的完整性

[HTTPS](https://www.jianshu.com/p/dc31bb2e51f1): 超文本传输安全协议。就是http+ssl/tls,可以理解为安全版http

客户端请求服务端443端口，返回证书，可以的进行非对称加密，服务端进行对称加密，发给客户端。

### 说说网络的五层模型（寺库）
应用层
表示层
会话层
传输层
网络层
数据链路层
物理层



### 从输入 URL 到显示页面发生了什么
```js
注：这题胜在区分度高，知识点覆盖广，再不懂的人，也能答出几句，
而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、
到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；

详细版：
1、浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
2、调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;
3、通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;
4、进行HTTP协议会话，客户端发送报头(请求报头);
5、进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
6、进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理;
7、处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;
8、浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;
9、文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
10、页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。

简洁版：
浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求；
服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；
浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）；
载入解析到的资源文件，渲染页面，完成。
```

### 爬虫引擎是怎样抓取页面的
通过从URL队列中获取URL，进行DNS解析IP地址，并将URL对应的网页下载储存，并提取新的URL加入队列进行循环。

预处理：搜索引擎将爬虫抓取回来的页面，进行各种步骤的预处理。
- 提取文字
- 中文分词
- 消除噪音（比如版权声明文字、导航条、广告等……）
- 索引处理
- 链接关系计算
- 特殊文件处理

### http请求内容

请求行: 请求行由请求方法字段、URL字段和HTTP协议版本字段3个字段组成，它们用空格分隔。比如 GET /data/info.html HTTP/1.1
请求头部: Host：If-Modified-Since User-Agent Cookie
HTTP响应报文： 状态码： Expires Set-Cookie

### CSS放头部，JS放底部
CSS放头部 css是异步
在加载html生成DOM tree的时候，就可以同时对DOM tree进行渲染。
这样可以防止闪跳，白屏或者布局混乱。

javascript放在后面 js是单线程的，javascript可能会改变DOM tree的结构，所以需要一个稳定的DOM tree。
javascript加载后会立即执行，同时会阻塞后面的资源加载。（javascript加载和执行的特点）
浏览器的单线程导致解析渲染和js的执行不能并存

css放在head中，为了在dom渲染前下载完css，这样渲染时css已经可用了。
css加载不会阻塞DOM树的解析
css加载会阻塞DOM树的渲染
css加载会阻塞后面js语句的执行











## 安全

### XSS
XSS攻击: 代码注入
cookie 设置 httpOnly
转义页面上的输入内容和输出内容

### CSRF
CSRF: 跨站请求伪造，防护:
get 不修改数据
不被第三方网站访问到用户的 cookie
设置白名单，不被第三方网站请求
请求校验

### WebSocket
WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。

### Require
### Fetch
### Axios


## MVVM

### AMD 和 CMD 的区别有哪些？
一个模块化实现特定功能，组织JS中的业务逻辑，都可以称为模块化。
commonJS运行于服务器端，node.js的模块系统，就是参照CommonJS规范实现的，每个模块都是一个单独的作用域。
AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块 
CMD推崇就近依赖，只有在用到某个模块的时候再去require 

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
1. CMD 推崇依赖就近，AMD 推崇依赖前置。

import语法声明用于从已导出的模块、脚本中导入函数、对象、指定文件（或模块）的原始值。
import和export命令只能在模块的顶层


### ES6 模块与 CommonJS 模块的差异
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

## Webpack
Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。

初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
确定入口：根据配置中的 entry 找出所有的入口文件；
编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

### 优化SVG
svg-sprite-loader

### loader
webpack如何转化处理某一类型的文件，并且引入到打包出的文件中

### pluge
自定义webpack打包过程中的方式，一个插件是含有apply方法的一个对象，通过这个方法可以参与到整个webpack打包的各个流程（plugin的生命周期）

### webpack-dev-server和http服务器如nginx有什么不同：

webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，他比传统的http服务器对开发更加简单高效

### 打包文件添加注释
plugins: [
    new webpack.BannerPlugin('lzijian编写的组件代码'),
]

### 优化指南
增量编译 webpack watch 默认就是增量编译
缓存 开启webpack缓存module.exports = {  cache: true, 开启loader缓存 使用模块缓存
减少需要编译的模块 webpack.DllPlugin + webpack.DllRefrencePlugin webpack.DllPlugin可以把依赖打包成dll库，供其它模块使用。


## 设计模式
### 设计模式：单例，工厂，发布订阅

单例模式：在它的核心结构中值包含一个被称为单例的特殊类。一个类只有一个实例，即一个类只有一个对象实例。
工厂模式：在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象。

发布订阅模式：在软件架构中，发布订阅是一种消息范式，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在。同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者（如果有的话）存在。

### 看过一些设计模式的书？你觉得设计模式怎么样？

JS中常用的设计模式中，我最常用的是装饰者模式，在不改变元对象的基础上，对这个对象进行包装和拓展（包括添加属性和方法），从而使这个对象可以有更复杂的功能。

## 存储结构

### 二叉树
二叉树是一种典型的树树状结构。如它名字所描述的那样，二叉树是每个节点最多有两个子树的树结构，通常子树被称作“左子树”和“右子树”。

### 链表
用一组任意存储的单元来存储线性表的数据元素。一个对象存储着本身的值和下一个元素的地址。

### 栈和队列

### 链表和队列的区别： （其实这个问题我有点蒙，反问了一句是队列和栈的区别吗？结果还是说链表和队列的区别）
（1）链表是一种数据的存储方式，保存的数据在内存中不连续的,用指针对数据进行访问；
（2）队列是一种数据结构，其特点是先进先出，后进后出；
（3）队列的存储方式可以使用线性表进行存储，也可以使用链表进行存储。

### 堆
堆在处理某些特殊场景时可以大大降低代码的时间复杂度，例如在庞大的数据中找到最大的几个数或者最小的几个数，可以借助堆来完成这个过程。

## 算法

### 快速排序
选择一个目标值，比目标值小的放左边，比目标值大的放右边，目标值的位置已排好，将左右两侧再进行快排。


### 归并排序
将大序列二分成小序列，将小序列排序后再将排序后的小序列归并成大序列。


### 选择排序
每次排序取一个最大或最小的数字放到前面的有序序列中。


### 插入排序
将左侧序列看成一个有序序列，每次将一个数字插入该有序序列。插入时，从有序序列最右侧开始比较，若比较的数较大，后移一位。


### 冒泡排序
循环数组，比较当前元素和下一个元素，如果当前元素比下一个元素大，向上冒泡。下一次循环继续上面的操作，不循环已经排序好的数。


### 堆排序
创建一个大顶堆(降堆)，大顶堆的堆顶一定是最大的元素。交换第一个元素和最后一个元素，让剩余的元素继续调整为大顶堆。从后往前以此和第一个元素交换并重新构建，排序完成。

### 二分查找
一种从有序数组中搜索元素的算法，维护查找空间的左、右和中间指示符，并比较查找目标或将查找条件应用于集合的中间值；如果条件不满足或值不相等，则清除目标不可能存在的那一半，并在剩下的一半上继续查找，直到成功为止。如果查以空的一半结束，则无法满足条件，并且无法找到目标。

### 递归

### 递归和非递归的区别
递归好处：代码更简洁清晰，可读性更好  

由于递归需要系统堆栈，所以空间消耗要比非递归代码要大很多。而且，如果递归深度太大，可能系统撑不住。

### 重复计算
一些问题使用递归考虑，思路是非常清晰的，但是却不推荐使用递归，例如下面的几个问题：
### 动态规划

## 算法题

### 全排列算法
```
输入："abc"
输出：["abc","acb","bac","bca","cab","cba"]
```

```
var permute = (nums) => {
  let res = []
  dfs([])
  function dfs(path) {
    if (path.length===nums.length) {
      res.push(path.slice())
    }
    for (const num of nums) {
      if (path.includes(num)) continue
      path.push(num)
      dfs(path)
      path.pop()
    }
  }
  return res
}
```


### 走台阶问题，一次可以走两步也可以走一步，求出走 N 步时的方法总数；
```js
斐波那契数列的应用
function fibonacci(n) {
    if (n <= 2) {
        return n
    };
    return fibonacci(n - 2) + fibonacci(n - 1);
}
```

### 实现一个 bind 方法。
```js

Function.prototype.mybind = function (context) {
  if (typeof this !== "function") {
      throw new Error(this + "is not a function");
  }
  var self = this;
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
      args.push(arguments[i]);
  }
 
  var fbound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      self.apply(this instanceof self ? this : context, args.concat(bindArgs));
  }
  fbound.prototype = Object.create(self.prototype);
  //返回的函数不仅要和 被调函数的函数体相同，也要继承人家的原型链
  return fbound;
```


```js
setTimeout(()=>console.log(0),0)

new Promise(res=>{
    console.log(1);
    res();    
}).then(()=>{
    console.log(2);
    Promise.resolve().then(()=>console.log(3))
    console.log(4)
})

console.log(5);
```


## 小程序

### 请谈谈微信小程序主要目录和文件的作用？
project.config.json 项目配置文件，用得最多的就是配置是否开启https校验；
App.js 设置一些全局的基础数据等；
App.json 底部tab, 标题栏和路由等设置；
App.wxss 公共样式，引入iconfont等；
pages 里面包含一个个具体的页面；
index.json (配置当前页面标题和引入组件等)；
index.wxml (页面结构)；
index.wxss (页面样式表)；
index.js (页面的逻辑，请求和数据处理等)；

### 请谈谈wxml与标准的html的异同？
都是用来描述页面的结构；
都由标签、属性等构成；
标签名字不一样，且小程序标签更少，单一标签更多；
多了一些 wx:if 这样的属性以及 {{ }} 这样的表达式
WXML仅能在微信小程序开发者工具中预览，而HTML可以在浏览器内预览
组件封装不同， WXML对组件进行了重新封装，
小程序运行在JS Core内，没有DOM树和window对象，小程序中无法使用window对象和document对象。

### 请谈谈WXSS和CSS的异同？
都是用来描述页面的样子；
WXSS 具有 CSS 大部分的特性，也做了一些扩充和修改；
WXSS新增了尺寸单位，WXSS 在底层支持新的尺寸单位 rpx；
WXSS 仅支持部分 CSS 选择器；
WXSS 提供全局样式与局部样式

### 你是怎么封装微信小程序的数据请求的？
在根目录下创建utils目录及api.js文件和apiConfig.js文件；
在apiConfig.js 通过对wx.request封装基础的get, post 和 put， upload等请求方法，设置请求体，带上token和异常处理等；
在api中引入apiConfig.js封装好的请求方法，根据页面数据请求的urls, 设置对应的方法并导出；
在具体的页面中导入；

### 小程序页面间有哪些传递数据的方法？
使用全局变量实现数据传递
页面跳转或重定向时，使用url带参数传递数据
使用组件模板 template传递参数
使用缓存传递参数
使用数据库传递数据

### 请谈谈小程序的双向绑定和vue的异同？
大体相同，但小程序直接this.data的属性是不可以同步到视图的，必须调用this.setData()方法！

### 请谈谈小程序的生命周期函数？
onLoad() 页面加载时触发，只会调用一次，可获取当前页面路径中的参数。
onShow() 页面显示/切入前台时触发，一般用来发送数据请求；
onReady() 页面初次渲染完成时触发, 只会调用一次，代表页面已可和视图层进行交互。
onHide() 页面隐藏/切入后台时触发, 如底部 tab 切换到其他页面或小程序切入后台等。
onUnload() 页面卸载时触发，如redirectTo或navigateBack到其他页面时。

### 简述微信小程序原理？
小程序本质就是一个单页面应用，所有的页面渲染和事件处理，都在一个页面内进行，但又可以通过微信客户端调用原生的各种接口；
它的架构，是数据驱动的架构模式，它的UI和数据是分离的，所有的页面更新，都需要通过对数据的更改来实现；
它从技术讲和现有的前端开发差不多，采用JavaScript、WXML、WXSS三种技术进行开发；
功能可分为webview和appService两个部分；
webview用来展现UI，appService有来处理业务逻辑、数据及接口调用；
两个部分在两个进程中运行，通过系统层JSBridge实现通信，实现UI的渲染、事件的处理等。

### 请谈谈原生开发小程序、wepy、mpvue 的对比？
个人认为，如果是新项目，且没有旧的 h5 项目迁移，则考虑用小程序原生开发，好处是相比于第三方框架，坑少。
而如果有 老的 h5 项目是 vue 开发 或者 也有 h5 项目也需要小程序开发，则比较适合 wepy 或者 mpvue 来做迁移或者开发，近期看wepy几乎不更新了，所以推荐美团的mpvue。
而如果如果团队前端强大，自己做一套框架也没问题。
B类问题
一.简单描述下微信小程序的相关文件类型？
wxml 模板文件，是框架设计的一套标签语言，结合基础组件、事件系统、可以构建出页面的结构
wxss 样式文件，是一套样式语言，用于描述WXML的组件样式
js 脚本逻辑文件，逻辑处理网络请求
json 配置文件，小程序设置，如页面注册，页面标题及tabBar
app.json 整个小程序的全局配置，包括： 
pages:[所有页面路径]
网络设置（网络超时时间）
界面表现（页面注册）
window:{背景色、导航样式、默认标题}
底部tab等
app.js 监听并处理小程序的生命周期函数、声明全局变量
app.wxss 全局配置的样式文件

### 怎么封装微信小程序的数据请求？
将所有的接口放在统一的js文件中并导出
在app.js中创建封装请求数据的方法
在子页面中调用封装的请求数据
或

在根目录下创建utils目录及api.js文件和apiConfig.js文件；
在appConfig.js封装基础的get\post\put\upload等请求方法，设置请求体，带上token和异常处理等；
在api.js中引入apiConfig.js封装好的请求方法，根据页面数据请求的urls，设置对应的方法并导出；
在具体页面导入；

### 微信小程序有哪些传值(传递数据)方法？
给html元素添加data-*属性来传递值，然后通过e.currentTarget.dataset或onload的param参数获取。注：data-名称不能有大写字母、不可以存放对象
设置id的方法标识来传值，通过e.currentTarget.id获取设置的id的值，然后通过设置全局对象的方式来传递数值
在navigator中添加参数数值
或

### 使用全局变量实现数据传递
页面跳转或重定向时，使用url带参数传递数据
使用组件模板template传递参数
使用缓存传递参数
使用数据库传递参数

### 哪些方法来提高微信小程序的应用速度？
提高页面的加载速度
用户行为预测
减少默认data的大小
组件化方案

### 微信小程序的原理？
微信小程序采用JavaScript、wxml、wxss三种技术进行开发，与现有前端开发的区别： 
JavaScript的代码是运行在微信APP中的，因此一些h5技术的应用需要微信APP提供对应的API支持；
wxml微信自己基于xml语法开发的，因此在开发时只能使用微信提供的现有标签，html的标签是无法使用的；
wxss具有css的大部分特性，但并不是所有都支持没有详细文档（wxss的图片引入需使用外链地址，没有body，样式可直接使用import导入）。
微信的架构，是数据驱动的架构模式，它的UI和数据是分离的，所有的页面更新，都需要通过对数据的更改来实现。
小程序功能分为webview和APPservice，webview主要用来展示UI，appservice用来处理业务逻辑、数据及接口调用。它们在两个进程中进行，通过系统层JSBridge实现通信，实现UI的渲染、事件处理。

### 分析微信小程序的优劣势？
优势： 
容易上手，基础组件库比较全，基本上不需要考虑兼容问题；
开发文档比较完善，开发社区比较活跃，支持插件式开发；
良好的用户体验：无需下载，通过搜索和扫一扫就可以打开，打开速度快，安卓上可以添加到桌面，与原生APP差不多；
开发成本比APP要低；
为用户提供良好的安全保障（小程序发布 严格的审查流程）
劣势： 
限制较多，页面大小不能超过1M，不能打开超过5个层级的页面；
样式单一，部分组件已经是成型了的，样式不可修改，例如：幻灯片、导航
推广面窄，不能分享朋友圈，只能通过分享给朋友，附近小程序推广
依托于微信，无法开发后台管理功能
后台调试麻烦，因为api接口必须https请求且公网地址
真机测试，个别功能安卓和苹果表现迥异，例如安卓的定位功能加载很慢

### 怎么解决微信小程序的异步请求问题？
在回调函数中调用下一个组件的函数：

**app.js**

success:function(info){
    that.apirtnCallback(info)
}

**index.js**
onLoad:function(){
    app.apirtnCallback = res =>{
        console.log(res)
    }
}
八.小程序关联微信公众号如何确定用户的唯一性？
使用wx.getUserInfo方法 withCredentials为true时，可获取encryptedData，里面有union_id.后端需要进行对称解密。

### 使用webview直接加载要注意哪些事项？
必须要在小程序后台使用管理员添加业务域名；
h5页面跳转至小程序的脚步必须是1.3.1以上；
微信分享只可以是小程序的主名称，如要自定义分享内容，需小程序版本在1.7.1以上；
h5的支付不可以是微信公众号的appid，必须是小程序的appid，而且用户的openid也必须是用户和小程序的

### 小程序调用后台接口遇到哪些问题？
数据的大小限制，超过范围会直接导致整个小程序崩溃，除非重启小程序；
小程序不可以直接渲染文章内容这类型的html文本，显示需借助插件
注：插件渲染会导致页面加载变慢，建议在后台对文章内容的html进行过滤，后台直接处理批量替换p标签div标签为view标签。然后其他的标签让插件来做。

### 微信小程序如何实现下拉刷新？
用view代替scroll-view，设置onPullDownRefresh函数实现

### webview中的页面怎么跳转回小程序？
wx.miniProgram.navigateTo({
    url:’pages/login/login’+’$params’
})

**//跳转到小程序导航页面**

wx.miniProgram.switchTab({
    url:’/pages/index/index’
})

### bindtap和catchtap的区别？
bind事件绑定不会阻止冒泡事件向上冒泡
catch事件绑定可以阻止冒泡事件向上冒泡

### 简述wx.navigateTo(),wx.redirectTo(),wx.switchTab(),wx.navigateBack(),wx.reLaunch()的区别？
在wxml页面中： 
跳转新页面
在当前页打开
切换到首页Tab
在js页面中：分为‘应用内的页面’和‘tabBar页面’；
如果上述跳转遇到跳转失败或者无效的问题，请访问：wx.navigateTo/wx.redirectTo无效

### 小程序的生命周期函数？
onLoad()页面加载时触发，只会调用一次，可获取当前页面路径中的参数
onShow()页面显示/切换前台时触发，一般用来发送数据请求
onReady()页面初次渲染完成时触发，只会调用一次，代表页面已可和视图层进行交互
onHide()页面隐藏/切入后台时触发，如底部tab切换到其他页面或小程序切入后台等
onUnload()页面卸载时触发，如redirectTo或navigateBack到其他页面时。

### 微信小程序与H5的区别？
运行环境不同（小程序在微信运行，h5在浏览器运行）；
开发成本不同（h5需要兼容不同的浏览器）；
获取系统权限不同（系统级权限可以和小程序无缝衔接）；
应用在生产环境的运行流畅度（h5需不断对项目优化来提高用户体验）；

### 小程序和Vue写法的区别？
遍历的时候： 
小程序 wx:for = "lists"
Vue是 v-for = "item in lists"
调用data模型（赋值）的时候： 
小程序：this.data.item //调用 this.setData({item:1}) //赋值
vue: this.item //调用 this.item =1 //赋值
常见问题
rpx:小程序的尺寸单位，规定屏幕为750rpx，可适配不同分辨率的屏幕。
本地资源无法通过wxss获取 
RE：
background-image：可以使用网络图片，或者base64，或者使用标签
wx.navigateTo无法打开页面 
RE：
一个应用同时只能打开5个页面，请避免多层级的交互方式，或使用wx.redirectTo
tabBar设置不显示 
RE：
tabBar的数量少于2项或超过5项都不会显示；
tabBar写法错误导致不显示；
tabBar没有写pagePath字段（程序启动后显示的第一个页面）


## 职业发展
### 前端开发过程中遇到过什么困难？
接手负责Nuxt来做服务端渲染的，遇到的性能上的问题。由于框架本身存在的缺点导致性能方面不是很理性。压测显示，之后通过Google搜索，了解服务端的知识，性能优化的方案思考，采用了Nginx进行负责均衡的方案，在对node服务端进行缓存处理，从而将新能从100提示的500。

### 介绍一下前端的学习经历
### 为什么选择前端
### 作为一个专业的前端，你觉得应该掌握哪些知识
### 什么时候接触前端 
### 大学学过哪些编程的课
### 选择前端的原因
### 对未来三年职业的规划

成为一个全栈工程师
### 你一般是通过什么方式学习前端的？


自学，W3school等网站，阮一峰、冴羽等大神的博客，GitHub，掘金，segmentfault等交流平台，
### 怎么学的前端？
### 看到你简历上有创客空间前端培训，是怎么样的形式？
### 你还有什么我没问到的优势吗
### 看过什么书
### 简单的介绍一下你自己，你知道哪些技术
### 为什么要选择web前端
### 比较厉害的技术
### 你为什么学前端，以及你学前端怎么坚持下来的
### 你认为一名前端工程师应该具备什么特点？一般是和产品，ui沟通做页面还是直接把图
### 如果直接按照图来做，有没有遇到过页面上实现不了的功能？遇到这样的问题怎么进行处理？
### 你一般是怎么学习前端的
### 看书的话，你是怎么判断书上的知识一定是对的？
### 也问了怎么学习前端的？看哪些书？ 
### 高程上面你觉得有什么地方是比较难理解的？ 
### 学过哪些框架？
### 我看见你写了一个js库，说一下有什么？
### 看过什么书？ 
### 有没有一页一页看？
### 你理解的框架

## HR面试
### 自我介绍
### 为什么要学习前端
### 一个前端工程师要做什么？
### 到现在为止接触过几个项目，有在哪里实习过？
### 让你收获最多的项目，你做了什么？
### 这个系统在代码方面有哪些不合理的地方？
### 个人的优缺点
### 读不读研
### 说说你最荣耀的事

## 自我介绍

我是来自宿迁的李忠成，在BOSS直聘事业部，主要负责微信小程序、官网、electron后台管理系统的开发工作。

刚到公司，培训前端，规范GIT提交、代码规范、公共样式、组件化开发、配置自动化打包等。使用 docsify 进行项目md文档维护工作，后期尝试使用nightwatch编写自动化测试脚本。

端对端e2e测试方案，语法简洁，容易扩展，可以持续集成。减少开发、测试的测试时间。系统模块化测试。本质模拟用户。


技术方面，做过多终端交互活动页面性能优化。响应式、服务端预渲染、node爬虫，业余时间，喜欢写写技术分享、造轮子，喜欢逛产品交互的设计网站。关于职业规划，未来希望自己能够成为一个独当一面的全栈工程师。
性格方面不算外向，喜欢运动和结交朋友，业余时间喜欢玩滑板和朋友骑死飞去长安街。
谢谢，以上是我的自我介绍。

1. 图片懒加载，图片压缩、动态图片尺寸请求、图片转Base64缓存本地canvas.toDataURL。资源CDN、
[js 将图片转换为base64编码](https://www.jianshu.com/p/dad014ab40ee)

我的上家公司是做灵活用工服务平台，开发了小程序、官网、三套桌面应用，，
技术方面我一直从事前端开发的工作，写过多终端活动、服务端预渲染、响应式等 

离职原因：个人发展角度考虑，3月份有个项目组解散了，我做出来产品被人使用会有成就感。刚到公司接手新的框架，查阅资料，解决框架里问题、每天加班到10点，感觉还OK，每周会有几次集体健身。想走出舒适区，迎接更大的挑战，不断提高自己的能力，我了解到贵公司技术丰富。如果我加入团队，提升自己能力的同时，可以为不同的技术贡献自己的力量。





















### 说一下你比较感兴趣的知识？
css动画 交互 移动端 node


### 设计模式

#### 设计模式目的
设计模式是为了更好的代码重用性，可读性，可靠性，可维护性。

设计六大原则
1)单一职责原则
2)里氏替换原则
3)依赖倒转原则
4)接口隔离原则
5)最少知识原则(迪米特法则)
6)开放封闭原则

#### 设计模式分类
总体来说设计模式分为三大类：

创建型模式，共五种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。

结构型模式，共七种：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。

行为型模式，共十一种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。

其实还有两类：并发型模式和线程池模式。

不过，对于前端来说，有的设计模式在平时工作中几乎用不到或者很少用到，来来来，来了解下前端常见的设计模式

#### JS中的设计模式
常见设计模式：

1、工厂模式

常见的实例化对象模式，工厂模式就相当于创建实例对象的new，提供一个创建对象的接口
```
    // 某个需要创建的具体对象
    class Product {
        constructor (name) {
            this.name = name;
        }
        init () {}
    }
    // 工厂对象
    class Creator {
        create (name) {
            return new Product(name);
        }
    }
    const creator = new Creator();
    const p = creator.create(); // 通过工厂对象创建出来的具体对象
复制代码
应用场景：JQuery中的$、Vue.component异步组件、React.createElement等
```

2、单例模式

保证一个类仅有一个实例，并提供一个访问它的全局访问点，一般登录、购物车等都是一个单例。
```
    // 单例对象
    class SingleObject {
        login () {}
    }
    // 访问方法
    SingleObject.getInstance = (function () {
        let instance;
        return function () {
            if (!instance) {
                instance = new SingleObject();
            }
            return instance;
        }
    })()
    const obj1 = SingleObject.getInstance();
    const obj2 = SingleObject.getInstance();
    console.log(obj1 === obj2); // true
复制代码
应用场景：JQuery中的$、Vuex中的Store、Redux中的Store等
```
3、适配器模式

用来解决两个接口不兼容问题，由一个对象来包装不兼容的对象，比如参数转换，允许直接访问
```
    class Adapter {
        specificRequest () {
            return '德国标准插头';
        }
    }
    // 适配器对象，对原来不兼容对象进行包装处理
    class Target {
        constructor () {
            this.adapter = new Adapter();
        }
        request () {
            const info = this.adapter.specificRequest();
            console.log(`${info} - 转换器 - 中国标准插头`)
        }
    }
    const target = new Target();
    console.log(target.request()); // 德国标准插头 - 转换器 - 中国标准插头
复制代码
应用场景：Vue的computed、旧的JSON格式转换成新的格式等
```
4、装饰器模式

在不改变对象自身的基础上，动态的给某个对象添加新的功能，同时又不改变其接口
```
    class Plane {
        fire () {
            console.log('发送普通子弹');
        }
    }
    // 装饰过的对象
    class Missile {
        constructor (plane) {
            this.plane = plane;
        }
        fire () {
            this.plane.fire();
            console.log('发射导弹');
        }
    }
    let plane = new Plane();
    plane = new Missile(plane);
    console.log(plane.fire()); // 依次打印 发送普通子弹 发射导弹
复制代码
利用AOP给函数动态添加功能，即Function的after或者before

Function.prototype.before = function (beforeFn) {
  const _self = this;
  return function () {
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  }
}

Function.prototype.after = function (afterFn) {
  const _self = this;
  return function () {
    const ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
}

let func = function () {
  console.log('2');
}

func = func.before(function() {
  console.log('1');
}).after(function() {
  console.log('3');
})

func();
console.log(func()); // 依次打印 1 2 3
复制代码
应用场景：ES7装饰器、Vuex中1.0版本混入Vue时，重写init方法、Vue中数组变异方法实现等
```
5、代理模式

为其他对象提供一种代理，便以控制对这个对象的访问，不能直接访问目标对象
```
class Flower {}
// 源对象
class Jack {
    constructor (target) {
        this.target = target;
    }
    sendFlower (target) {
        const flower = new Flower();
        this.target.receiveFlower(flower)
    }
}
// 目标对象
class Rose {
    receiveFlower (flower) {
        console.log('收到花: ' + flower)
    }
}
// 代理对象
class ProxyObj {
    constructor () {
        this.target = new Rose();
    }
    receiveFlower (flower) {
        this.sendFlower(flower)
    }
    sendFlower (flower) {
        this.target.receiveFlower(flower)
    }
}
const proxyObj = new ProxyObj();
const jack = new Jack(proxyObj);
jack.sendFlower(proxyObj); // 收到花：[object Object]
复制代码
应用场景：ES6 Proxy、Vuex中对于getters访问、图片预加载等
```
6、外观模式

为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更容易，不符合单一职责原则和开放封闭原则
```
 class A {
    eat () {}
}
class  B {
    eat () {}
}
class C {
    eat () {
        const a = new A();
        const b = new B();
        a.eat();
        b.eat();
    }
}
// 跨浏览器事件侦听器
function addEvent(el, type, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    } else if (window.attachEvent) {
        el.attachEvent('on' + type, fn);
    } else {
        el['on' + type] = fn;
    }
}
复制代码
应用场景：JS事件不同浏览器兼容处理、同一方法可以传入不同参数兼容处理等
```
7、观察者模式
定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知

```
   class Subject {
  constructor () {
    this.state = 0;
    this.observers = [];
  }
  getState () {
    return this.state;
  }
  setState (state) {
    this.state = state;
    this.notify();
  }
  notify () {
    this.observers.forEach(observer => {
      observer.update();
    })
  }
  attach (observer) {
    this.observers.push(observer);
  }
}


class Observer {
  constructor (name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
  }
  update () {
    console.log(`${this.name} update, state: ${this.subject.getState()}`);
  }
}

let sub = new Subject();
let observer1 = new Observer('o1', sub);
let observer2 = new Observer('o2', sub);

sub.setState(1);
复制代码
观察者模式与发布/订阅模式区别: 本质上的区别是调度的地方不同
```
虽然两种模式都存在订阅者和发布者（具体观察者可认为是订阅者、具体目标可认为是发布者），但是观察者模式是由具体目标调度的，而发布/订阅模式是统一由调度中心调的，所以观察者模式的订阅者与发布者之间是存在依赖的，而发布/订阅模式则不会。

---观察者模式：目标和观察者是基类，目标提供维护观察者的一系列方法，观察者提供更新接口。具体观察者和具体目标继承各自的基类，然后具体观察者把自己注册到具体目标里，在具体目标发生变化时候，调度观察者的更新方法。
比如有个“天气中心”的具体目标A，专门监听天气变化，而有个显示天气的界面的观察者B，B就把自己注册到A里，当A触发天气变化，就调度B的更新方法，并带上自己的上下文。

---发布/订阅模式：订阅者把自己想订阅的事件注册到调度中心，当该事件触发时候，发布者发布该事件到调度中心（顺带上下文），由调度中心统一调度订阅者注册到调度中心的处理代码。
比如有个界面是实时显示天气，它就订阅天气事件（注册到调度中心，包括处理程序），当天气变化时（定时获取数据），就作为发布者发布天气信息到调度中心，调度中心就调度订阅者的天气处理程序。

应用场景：JS事件、JS Promise、JQuery.$CallBack、Vue watch、NodeJS自定义事件，文件流等

8、迭代器模式

提供一种方法顺序访问一个聚合对象中各个元素, 而又无须暴露该对象的内部表示

可分为：内部迭代器和外部迭代器

内部迭代器： 内部已经定义好迭代规则，外部只需要调用一次即可。
```
const each = (args, fn) => {
  for (let i = 0, len = args.length; i < len; i++) {
    const value = fn(args[i], i, args);

    if (value === false) break;
  }
}
复制代码
应用场景： JQuery.each方法
```

外部迭代器：必须显示的请求迭代下一个元素。
```
// 迭代器
class Iterator {
  constructor (list) {
    this.list = list;
    this.index = 0;
  }
  next () {
    if (this.hasNext()) {
      return this.list[this.index++]
    }
    return null;
  }
  hasNext () {
    if (this.index === this.list.length) {
      return false;
    }
    return true;
  }
}
const arr = [1, 2, 3, 4, 5, 6];
const ite = new Iterator();

while(ite.hasNext()) {
  console.log(ite.next()); // 依次打印 1 2 3 4 5 6
}
复制代码
应用场景：JS Iterator、JS Generator
```
9、状态模式

关键是区分事物内部的状态，事物内部状态往往会带来事物的行为改变，即允许对象在内部状态发生改变时改变它的行为
```
// 红灯
class RedLight {
    constructor (state) {
        this.state = state;
    }
    light () {
        console.log('turn to red light');
        this.state.setState(this.state.greenLight)
    }
}
// 绿灯
class greenLight {
    constructor (state) {
        this.state = state;
    }
    light () {
        console.log('turn to green light');
        this.state.setState(this.state.yellowLight)
    }
}
// 黄灯
class yellowLight {
    constructor (state) {
        this.state = state;
    }
    light () {
        console.log('turn to yellow light');
        this.state.setState(this.state.redLight)
    }
}
class State {
    constructor () {
        this.redLight = new RedLight(this)
        this.greenLight = new greenLight(this)
        this.yellowLight = new yellowLight(this)
        this.setState(this.redLight) // 初始化为红灯
    }
    setState (state) {
        this.currState = state;
    }
}
const state = new State();
state.currState.light() // turn to red light
setInterval(() => {
    state.currState.light() // 每隔3秒依次打印红灯、绿灯、黄灯
}, 3000)
复制代码
应用场景：灯泡状态、红绿灯切换等
```
其他设计模式：

10、命令模式
11、组合模式
12、享元模式
13、策略模式
14、职责链模式
15、模板方法模式
16、中介者模式
17、备忘录模式
18、访问者模式
19、解释器模式
20、桥接模式



## electron

### 知识点
electron、客户端、node、C++、Rust

electron = Chromium（高效：使用Web技术写UI ） + Node.js（底层的能力） + Native API（跨平台 & 原生能力）

最小单元
app.js main.js package.json

### electron与NW
electron 包体积大 及时最小50M

### 原理

## 进程
Electron提供了IPC通讯模块
主进程ipcMain 与 渲染进程ipcRenderer都是EventEmitter对象

### 进程之间通讯
场景：通知事件、数据传输、共享信息

#### 渲染进程到主进程通信

> Callback方法：

发起ipcRenderer.send(channel, ...args) 主进程响应ipcMain.on(channel, handler)

> Promise方法（Electron7.0之后，处理请求 + 响应模式）：

ipcRenderer.invoke(channel, ...args) 主进程响应ipcMain.handle(channel, handler)

#### 主进程到渲染进程通信

> webContent

通过webContent.send(channel) 渲染进程响应ipcRenderer.on(channel, handler)
`webContent`窗体内容`BrowserWindow`的API

#### 渲染进程与渲染进程之间通信

- 通知事件
  - webContent(Electron 5之前)
  - ipcRenderer.sendTo（Electron 5之后）
- 数据共享
  - Web技术（loaclStrage、sessionStorage、indexedDB等）
  - 使用remote

> ipcRenderer.sendTo

```
A-->B

Main Id共享：
global.shareObject = {
  winWebIdB: win2.webContents.id
}

A remote模块：
let winWebIdB = remote.getGlobal('shareObject').winWebIdB
ipcRenderer.sendTo(winWebIdB, channel, value)

B：
ipcRenderer.on(channel, handler)
```

注意：
- 使用remote，使用不好会造成卡顿。
- 少用remote模块
- 不要用sync模式
- 在请求 + 响应的通信模式下，需要自定义超时限制


### 更新

### 崩溃治理

### 异常监控

### 开发环境
NVM安装 node管理工具

安装Electron

```
npm install electron --save-dev
npm install --arch=ia32 --platform=win32 electron
```


考虑到 Vue 是数据驱动的，所以每次数据变化都会重新 render，那么 vm._render() 方法又会再次执行，并再次触发数据的 getters，所以 Wathcer 在构造函数中会初始化 2 个 Dep 实例数组，newDeps 表示新添加的 Dep 实例数组，而 deps 表示上一次添加的 Dep 实例数组。

在执行 cleanupDeps 函数的时候，会首先遍历 deps，移除对 dep.subs 数组中 Wathcer 的订阅，然后把 newDepIds 和 depIds 交换，newDeps 和 deps 交换，并把 newDepIds 和 newDeps 清空。

### Electron性能优化
[如何提升 electron 应用的启动速度](http://quickapp.vivo.com.cn/how-to-improve-electron-app-startup-speed/)
性能分析
1. 主进程 v8-inspect-profiler 进行性能监测
1. 渲染进程 Vue项目性能优化
1. 性能钩子计时(perf_hook)，new date（performance-now）
1. 拆分代码，先加载渲染进程的入口文件，再同时渲染 IDE 和加载插件进程（加载插件的文件）
任务配置
1. 任务分配优先级
1. 可以调用 window.requestIdleCallback() 方法，在浏览器的空闲时段内执行。
1. 延迟加载模块`require('xxx')`, `import`必须放于文件顶部，提前加载。
1. 骨架屏、窗口池（提高窗口创建速度）、
代码优化
1. 减少不必要的依赖模块，v8-compile-cache 模块缓存
1. 减少磁盘 IO
1. 减少同步 ipc 和 remote（对象泄露）
1. 


## http

### 说一下http和https

https的SSL加密是在传输层实现的。
> http和https的基本概念

http: 超文本传输协议，是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。

https: 是以安全为目标的HTTP通道，简单讲是HTTP的安全版，即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。

https协议的主要作用是：建立一个信息安全通道，来确保数组的传输，确保网站的真实性。

> http和https的区别？

http传输的数据都是未加密的，也就是明文的，网景公司设置了SSL协议来对http协议传输的数据进行加密处理，简单来说https协议是由http和ssl协议构建的可进行加密传输和身份认证的网络协议，比http协议的安全性更高。
主要的区别如下：

Https协议需要ca证书，费用较高。

http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。

使用不同的链接方式，端口也不同，一般而言，http协议的端口为80，https的端口为443

http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

> https协议的工作原理

客户端在使用HTTPS方式与Web服务器通信时有以下几个步骤，如图所示。

客户使用https url访问服务器，则要求web 服务器建立ssl链接。

web服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），返回或者说传输给客户端。

客户端和web服务器端开始协商SSL链接的安全等级，也就是加密等级。

客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥，并传送给网站。

web服务器通过自己的私钥解密出会话密钥。

web服务器通过会话密钥加密与客户端之间的通信。

> https协议的优点

使用HTTPS协议可认证用户和服务器，确保数据发送到正确的客户机和服务器；

HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全，可防止数据在传输过程中不被窃取、改变，确保数据的完整性。

HTTPS是现行架构下最安全的解决方案，虽然不是绝对安全，但它大幅增加了中间人攻击的成本。

谷歌曾在2014年8月份调整搜索引擎算法，并称“比起同等HTTP网站，采用HTTPS加密的网站在搜索结果中的排名将会更高”。

> https协议的缺点

https握手阶段比较费时，会使页面加载时间延长50%，增加10%~20%的耗电。

https缓存不如http高效，会增加数据开销。

SSL证书也需要钱，功能越强大的证书费用越高。

SSL证书需要绑定IP，不能再同一个ip上绑定多个域名，ipv4资源支持不了这种消耗。

### tcp三次握手，一句话概括

客户端和服务端都需要直到各自可收发，因此需要三次握手。
简化三次握手：

<img width="487" alt="2018-07-10 3 42 11" src="https://user-images.githubusercontent.com/17233651/42496289-1c6d668a-8458-11e8-98b3-65db50f64d48.png">

从图片可以得到三次握手可以简化为：C发起请求连接S确认，也发起连接C确认我们再看看每次握手的作用：第一次握手：S只可以确认 自己可以接受C发送的报文段第二次握手：C可以确认 S收到了自己发送的报文段，并且可以确认 自己可以接受S发送的报文段第三次握手：S可以确认 C收到了自己发送的报文段

### TCP和UDP的区别

（1）TCP是面向连接的，udp是无连接的即发送数据前不需要先建立链接。
（2）TCP提供可靠的服务。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP尽最大努力交付，即不保证可靠交付。 并且因为tcp可靠，面向连接，不会丢失数据因此适合大数据量的交换。

（3）TCP是面向字节流，UDP面向报文，并且网络出现拥塞不会使得发送速率降低（因此会出现丢包，对实时的应用比如IP电话和视频会议等）。

（4）TCP只能是1对1的，UDP支持1对1,1对多。

（5）TCP的首部较大为20字节，而UDP只有8字节。

（6）TCP是面向连接的可靠性传输，而UDP是不可靠的。

### WebSocket的实现和应用

> 什么是WebSocket?

WebSocket是HTML5中的协议，支持持久连续，http协议不支持持久性连接。Http1.0和HTTP1.1都不支持持久性的链接，HTTP1.1中的keep-alive，将多个http请求合并为1个

> WebSocket是什么样的协议，具体有什么优点？


HTTP的生命周期通过Request来界定，也就是Request一个Response，那么在Http1.0协议中，这次Http请求就结束了。在Http1.1中进行了改进，是的有一个connection：Keep-alive，也就是说，在一个Http连接中，可以发送多个Request，接收多个Response。但是必须记住，在Http中一个Request只能对应有一个Response，而且这个Response是被动的，不能主动发起。

WebSocket是基于Http协议的，或者说借用了Http协议来完成一部分握手，在握手阶段与Http是相同的。我们来看一个websocket握手协议的实现，基本是2个属性，upgrade，connection。

基本请求如下：

GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
多了下面2个属性：

1
2
Upgrade:webSocket
Connection:Upgrade
告诉服务器发送的是websocket

1
2
3
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13

### HTTP请求的方式，HEAD方式

head：类似于get请求，只不过返回的响应中没有具体的内容，用户获取报头
options：允许客户端查看服务器的性能，比如说服务器支持的请求方式等等。


### 说一下web Quality（无障碍）

能够被残障人士使用的网站才能称得上一个易用的（易访问的）网站。

残障人士指的是那些带有残疾或者身体不健康的用户。
使用alt属性：

<img src="person.jpg"  alt="this is a person"/>

有时候浏览器会无法显示图像。具体的原因有：

用户关闭了图像显示

浏览器是不支持图形显示的迷你浏览器

浏览器是语音浏览器（供盲人和弱视人群使用）
如果您使用了alt 属性，那么浏览器至少可以显示或读出有关图像的描述。

### 几个很实用的BOM属性对象方法?

什么是Bom? Bom是浏览器对象。有哪些常用的Bom属性呢？
> location对象


location.href-- 返回或设置当前文档的URL
location.search -- 返回URL中的查询字符串部分。例如 http://www.dreamdu.com/dreamdu.php?id=5&name=dreamdu 返回包括(?)后面的内容?id=5&name=dreamdu
location.hash -- 返回URL#后面的内容，如果没有#，返回空
location.host -- 返回URL中的域名部分，例如www.dreamdu.com
location.hostname -- 返回URL中的主域名部分，例如dreamdu.com
location.pathname -- 返回URL的域名后的部分。例如 http://www.dreamdu.com/xhtml/ 返回/xhtml/
location.port -- 返回URL中的端口部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回8080
location.protocol -- 返回URL中的协议部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回(//)前面的内容http:
location.assign -- 设置当前文档的URL
location.replace() -- 设置当前文档的URL，并且在history对象的地址列表中移除这个URL location.replace(url);
location.reload() -- 重载当前页面

> history对象


history.go() -- 前进或后退指定的页面数 history.go(num);
history.back() -- 后退一页
history.forward() -- 前进一页

> Navigator对象


navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie

### 说一下HTML5 drag api

dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发，。
darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。

dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。

dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。

dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。

drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。

dragend：事件主体是被拖放元素，在整个拖放操作结束时触发

### 说一下http2.0

首先补充一下，http和https的区别，相比于http,https是基于ssl加密的http协议
简要概括：http2.0是基于1999年发布的http1.0之后的首次更新。
提升访问速度（可以对于，请求资源所需时间更少，访问速度更快，相比http1.0）

允许多路复用：多路复用允许同时通过单一的HTTP/2连接发送多重请求-响应信息。改善了：在http1.1中，浏览器客户端在同一时间，针对同一域名下的请求有一定数量限制（连接数量），超过限制会被阻塞。

二进制分帧：HTTP2.0会将所有的传输信息分割为更小的信息或者帧，并对他们进行二进制编码

首部压缩

服务器端推送

### 补充400和401、403状态码

> 400状态码：请求无效

产生原因：

前端提交数据的字段名称和字段类型与后台的实体没有保持一致

前端提交到后台的数据应该是json字符串类型，但是前端没有将对象JSON.stringify转化成字符串。

解决方法：

对照字段的名称，保持一致性

将obj对象通过JSON.stringify实现序列化

> 401状态码：当前请求需要用户验证


> 403状态码：服务器已经得到请求，但是拒绝执行


### fetch发送2次请求的原因

fetch发送post请求的时候，总是发送2次，第一次状态码是204，第二次才成功？
原因很简单，因为你用fetch的post请求的时候，导致fetch 第一次发送了一个Options请求，询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送真正的请求。

### 说一下web worker

在HTML页面中，如果在执行脚本时，页面的状态是不可相应的，直到脚本执行完成后，页面才变成可相应。web worker是运行在后台的js，独立于其他脚本，不会影响页面你的性能。并且通过postMessage将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。
如何创建web worker：

检测浏览器对于web worker的支持性

创建web worker文件（js，回传函数等）

创建web worker对象

### 对HTML语义化标签的理解

HTML5语义化标签是指正确的标签包含了正确的内容，结构良好，便于阅读，比如nav表示导航条，类似的还有article、header、footer等等标签。
### iframe是什么？有什么缺点？

定义：iframe元素会创建包含另一个文档的内联框架
提示：可以将提示文字放在<iframe></iframe>之间，来提示某些不支持iframe的浏览器
缺点：

会阻塞主页面的onload事件

搜索引擎无法解读这种页面，不利于SEO

iframe和主页面共享连接池，而浏览器对相同区域有限制所以会影响性能。

### Doctype作用?严格模式与混杂模式如何区分？它们有何意义?

Doctype声明于文档最前面，告诉浏览器以何种方式来渲染页面，这里有两种模式，严格模式和混杂模式。
严格模式的排版和JS 运作模式是 以该浏览器支持的最高标准运行。

混杂模式，向后兼容，模拟老式浏览器，防止浏览器无法兼容页面。

### Cookie如何防范XSS攻击

XSS（跨站脚本攻击）是指攻击者在返回的HTML中嵌入javascript脚本，为了减轻这些攻击，需要在HTTP头部配上，set-cookie：
httponly-这个属性可以防止XSS,它会禁止javascript脚本来访问cookie。

secure - 这个属性告诉浏览器仅在请求为https的时候发送cookie。

结果应该是这样的：Set-Cookie=<cookie-value>.....

### Cookie和session的区别

HTTP是一个无状态协议，因此Cookie的最大的作用就是存储sessionId用来唯一标识用户
### 一句话概括RESTFUL

就是用URL定位资源，用HTTP描述操作
### 讲讲viewport和移动端布局

可以参考我的这篇文章：
响应式布局的常用解决方案对比(媒体查询、百分比、rem和vw/vh）

### click在ios上有300ms延迟，原因及如何解决？

> 粗暴型，禁用缩放

<meta name="viewport" content="width=device-width, user-scalable=no">

> 利用FastClick，其原理是：


检测到touchend事件后，立刻出发模拟click事件，并且把浏览器300毫秒之后真正出发的事件给阻断掉

### addEventListener参数

addEventListener(event, function, useCapture)
其中，event指定事件名；function指定要事件触发时执行的函数；useCapture指定事件是否在捕获或冒泡阶段执行。

### csrf和xss的网络攻击及防范
参考回答：
CSRF：跨站请求伪造，可以理解为攻击者盗用了用户的身份，以用户的名义发送了恶意请求，比如用户登录了一个网站后，立刻在另一个ｔａｂ页面访问量攻击者用来制造攻击的网站，这个网站要求访问刚刚登陆的网站，并发送了一个恶意请求，这时候CSRF就产生了，比如这个制造攻击的网站使用一张图片，但是这种图片的链接却是可以修改数据库的，这时候攻击者就可以以用户的名义操作这个数据库，防御方式的话：使用验证码，检查https头部的refer，使用token
XSS：跨站脚本攻击，是说攻击者通过注入恶意的脚本，在用户浏览网页的时候进行攻击，比如获取cookie，或者其他用户身份信息，可以分为存储型和反射型，存储型是攻击者输入一些数据并且存储到了数据库中，其他浏览者看到的时候进行攻击，反射型的话不存储在数据库中，往往表现为将攻击代码放在url地址的请求参数中，防御的话为cookie设置httpOnly属性，对用户的输入进行检查，进行特殊字符过滤

### 怎么看网站的性能如何
参考回答：
检测页面加载时间一般有两种方式，一种是被动去测：就是在被检测的页面置入脚本或探针，当用户访问网页时，探针自动采集数据并传回数据库进行分析，另一种主动监测的方式，即主动的搭建分布式受控环境，模拟用户发起页面访问请求，主动采集性能数据并分析，在检测的精准度上，专业的第三方工具效果更佳，比如说性能极客
### 介绍HTTP协议(特征)
参考回答：
HTTP是一个基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）HTTP是一个属于应用层的面向对象的协议，由于其简捷、快速的方式，适用于分布式超媒体信息系统。它于1990年提出，经过几年的使用与发展，得到不断地完善和扩展。目前在WWW中使用的是HTTP/1.0的第六版，HTTP/1.1的规范化工作正在进行之中，而且HTTP-NG(Next Generation of HTTP)的建议已经提出。HTTP协议工作于客户端-服务端架构为上。浏览器作为HTTP客户端通过URL向HTTP服务端即WEB服务器发送所有请求。Web服务器根据接收到的请求后，向客户端发送响应信息。
### 输入URL到页面加载显示完成发生了什么?
参考回答：
DNS解析
TCP连接

发送HTTP请求

服务器处理请求并返回HTTP报文

浏览器解析渲染页面

连接结束

### 说一下对Cookie和Session的认知，Cookie有哪些限制？
参考回答：
-    cookie数据存放在客户的浏览器上，session数据放在服务器上。
2.    cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗
考虑到安全应当使用session。

3.    session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
考虑到减轻服务器性能方面，应当使用COOKIE。

4.    单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。

### 描述一下XSS和CRSF攻击？防御方法？
参考回答：
XSS, 即为（Cross Site Scripting）, 中文名为跨站脚本, 是发生在目标用户的浏览器层面上的，当渲染DOM树的过程成发生了不在预期内执行的JS代码时，就发生了XSS攻击。大多数XSS攻击的主要方式是嵌入一段远程或者第三方域上的JS代码。实际上是在目标网站的作用域下执行了这段js代码。
CSRF（Cross Site Request Forgery，跨站请求伪造），字面理解意思就是在别的站点伪造了一个请求。专业术语来说就是在受害者访问一个网站时，其 Cookie 还没有过期的情况下，攻击者伪造一个链接地址发送受害者并欺骗让其点击，从而形成 CSRF 攻击。

XSS防御的总体思路是：对输入(和URL参数)进行过滤，对输出进行编码。也就是对提交的所有内容进行过滤，对url中的参数进行过滤，过滤掉会导致脚本执行的相关内容；然后对动态输出到页面的内容进行html编码，使脚本无法在浏览器中执行。虽然对输入过滤可以被绕过，但是也还是会拦截很大一部分的XSS攻击。

防御CSRF 攻击主要有三种策略：验证 HTTP Referer 字段；在请求地址中添加 token 并验证；在 HTTP 头中自定义属性并验证。

### 知道304吗，什么时候用304？
参考回答：
304：如果客户端发送了一个带条件的GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个304状态码。

### 具体有哪些请求头是跟缓存相关的
参考回答：
缓存分为两种：强缓存和协商缓存，根据响应的header内容来决定。
强缓存相关字段有expires，cache-control。如果cache-control与expires同时存在的话，cache-control的优先级高于expires。

协商缓存相关字段有Last-Modified/If-Modified-Since，Etag/If-None-Match
### cookie和session的区别
参考回答：
-    cookie数据存放在客户的浏览器上，session数据放在服务器上。
2.    cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗
考虑到安全应当使用session。

3.    session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
考虑到减轻服务器性能方面，应当使用COOKIE。

4.    单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。

### cookie有哪些字段可以设置
参考回答：
name字段为一个cookie的名称。
value字段为一个cookie的值。

domain字段为可以访问此cookie的域名。

非顶级域名，如二级域名或者三级域名，设置的cookie的domain只能为顶级域名或者二级域名或者三级域名本身，不能设置其他二级域名的cookie，否则cookie无法生成。

顶级域名只能设置domain为顶级域名，不能设置为二级域名或者三级域名，否则cookie无法生成。

二级域名能读取设置了domain为顶级域名或者自身的cookie，不能读取其他二级域名domain的cookie。所以要想cookie在多个二级域名中共享，需要设置domain为顶级域名，这样就可以在所有二级域名里面或者到这个cookie的值了。
顶级域名只能获取到domain设置为顶级域名的cookie，其他domain设置为二级域名的无法获取。

path字段为可以访问此cookie的页面路径。 比如domain是abc.com,path是/test，那么只有/test路径下的页面可以读取此cookie。

expires/Max-Age 字段为此cookie超时时间。若设置其值为一个时间，那么当到达此时间后，此cookie失效。不设置的话默认值是Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此cookie失效。

Size字段 此cookie大小。

http字段  cookie的httponly属性。若此属性为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie。

secure 字段 设置是否只能通过https来传递此条cookie

### cookie有哪些编码方式？
参考回答：
encodeURI（）
### 前端优化策略

### 既然你看过图解http，那你回答下200和304的区别
参考回答：
200    OK    请求成功。一般用于GET与POST请求
304    Not Modified    未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源


### 浏览器输入网址到页面渲染全过程
参考回答：
DNS解析
TCP连接

发送HTTP请求

服务器处理请求并返回HTTP报文

浏览器解析渲染页面

连接结束

### HTML5和CSS3用的多吗？你了解它们的新属性吗？有在项目中用过吗？
参考回答：
html5：
1）标签增删

8个语义元素 header section footer aside nav main article figure

内容元素mark高亮 progress进度

新的表单控件calander date time email url search

新的input类型 color date datetime datetime-local email

移除过时标签big font frame frameset

2）canvas绘图，支持内联SVG。支持MathML

3）多媒体audio video source embed track

4）本地离线存储，把需要离线存储在本地的文件列在一个manifest配置文件

5）web存储。localStorage、SessionStorage


css3：

CSS3边框如border-radius，box-shadow等；CSS3背景如background-size，background-origin等；CSS3 2D，3D转换如transform等；CSS3动画如animation等。 参考https://www.cnblogs.com/xkweb/p/5862612.html

### HTTP状态码
参考回答：
200    OK    请求成功。一般用于GET与POST请求
201    Created    已创建。成功请求并创建了新的资源

202    Accepted    已接受。已经接受请求，但未处理完成

203    Non-Authoritative Information    非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本

204    No Content    无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档

205    Reset Content    重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域

206    Partial Content    部分内容。服务器成功处理了部分GET请求

300    Multiple Choices    多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择

301    Moved Permanently    永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替

302    Found    临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI

303    See Other    查看其它地址。与301类似。使用GET和POST请求查看

304    Not Modified    未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源

305    Use Proxy    使用代理。所请求的资源必须通过代理访问

306    Unused    已经被废弃的HTTP状态码

307    Temporary Redirect    临时重定向。与302类似。使用GET请求重定向

400    Bad Request    客户端请求的语法错误，服务器无法理解

401    Unauthorized    请求要求用户的身份认证

402    Payment Required    保留，将来使用

403    Forbidden    服务器理解请求客户端的请求，但是拒绝执行此请求

404    Not Found    服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面

500    Internal Server Error    服务器内部错误，无法完成请求

501    Not Implemented    服务器不支持请求的功能，无法完成请求

502    Bad Gateway    作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应

503    Service Unavailable    由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中

504    Gateway Time-out    充当网关或代理的服务器，未及时从远端服务器获取请求

505    HTTP Version not supported    服务器不支持请求的HTTP协议的版本，无法完成处理



### 说说302，301，304的状态码
参考回答：
301    Moved Permanently    永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替
302    Found    临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI

304    Not Modified    未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源



### 3. HTTP 2.0 和 1.1 相比有哪些新特性；
HTTP1.x的header带有大量信息，而且每次都要重复发送，HTTP2.0使用encoder来减少需要传输的header大小，通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小


### HTTP请求参数

Accept: 允许哪些媒体类型。
Accept-Charset: 允许哪些字符集。
Accept-Encoding: 允许哪些编码。
Accept-Language: 允许哪些语言。
Cache-Control: 缓存策略，如no-cache，详见官方文档。
Connection: 连接选项，例如是否允许代理。 
Host: 请求的主机。
If-None-Match: 判断请求实体的Etag是否包含在If-None-Match中，如果包含，则返回304，使用缓存，见Etag。
If-Modified-Since: 判断修改时间是否一致，如果一致，则使用缓存，。 、
If-Match: 与If-None-Match相反。
If-Unmodified-Since: 与If-Modified-Since相反。
Referer: 表明这个请求发起的源头。
User-Agent: 这个大家相信应该很熟悉了，就是经常用来做浏览器检测的userAgent。 
Cache-Control: 缓存策略，如max-age:100，详见官方文档。
Connection: 连接选项，例如是否允许代理。
Content-Encoding: 返回内容的编码，如gzip。
Content-Language: 返回内容的语言。
Content-Length: 返回内容的字节长度。
Content-Type: 返回内容的媒体类型，如text/html。
Data: 返回时间。
Etag: entity tag，实体标签，给每个实体生成一个单独的值，用于客户端缓存，与If-None-Match配合使用。
Expires: 设置缓存过期时间，Cache-Control也会相应变化。
Last-Modified: 最近修改时间，用于客户端缓存，与If-Modified-Since配合使用。
Pragma: 似乎和Cache-Control差不多，用于旧的浏览器。
Server: 服务器信息。 
Vary: WEB服务器用该头部的内容告诉 Cache 服务器，在什么条件下才能用本响应所返回的对象响应后续的请求。假如源WEB服务器在接到第一个请求消息时，其响应消息的头部为：Content-Encoding: gzip; Vary: Content-Encoding那么 Cache 服务器会分析后续请求消息的头部，检查其 Accept-Encoding，是否跟先前响应的 Vary 头部值一致，即是否使用相同的内容编码方法，这样就可以防止 Cache 服务器用自己 Cache 里面压缩后的实体响应给不具备解压能力的浏览器。

## Ajax

### ajax
XMLHttpRequest（XHR
```
const xhr = new XMLHttpRequest();
xhr.open('GET', '/foo');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
xhr.addEventListener('progress', (event) => {
    const { lengthComputable, loaded, total } = event;
    if (lengthComputable) {
        console.log(`Downloaded ${loaded} of ${total} (${(loaded / total * 100).toFixed(2)}%)`);
    } else {
        console.log(`Downloaded ${loaded}`);
    }
});
xhr.send();
```

#### 暂停
xhr.abort
### axios
axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范，它本身具有以下特征

1.从浏览器中创建 XMLHttpRequest
2.支持 Promise API
3.客户端支持防止CSRF
4.提供了一些并发请求的接口（重要，方便了很多的操作）
5.从 node.js 创建 http 请求
6.拦截请求和响应
7.转换请求和响应数据
8.取消请求
9.自动转换JSON数据
#### 暂停


[项目中如何使用axios](https://www.jianshu.com/p/1b316b414390)

new cancelToken 取消请求cancel()
[axios取消接口请求](https://www.cnblogs.com/ysk123/p/11544634.html)

### fetch
fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象,它的API是基于Promise设计的，旧版本的浏览器不支持Promise

1. fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
2. fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
3. fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
4. fetch没有办法原生监测请求的进度，而XHR可以
#### 暂停
```
const controller = new AbortController();
const { signal } = controller;
fetch('/foo', { signal }).then(...);
signal.onabort = () => { ... };
controller.abort();
```

### ajax、axios、fetch之间优缺点重点对比
[ajax、axios、fetch之间优缺点重点对比](https://zhuanlan.zhihu.com/p/58062212)
[ajax和axios、fetch的区别](https://www.jianshu.com/p/8bc48f8fde75)

总结：axios既提供了并发的封装，也没有fetch的各种问题，而且体积也较小，当之无愧现在最应该选用的请求的方式。
## typescript




## node
### require(一个路径)
require会先去找index2.js文件，没有就去找.json文件，再没有就找node文件，如果这些都没有，它会认为index2是一个文件夹，如果找到了这个文件夹，require还会去找这个文件夹里面是否有package.json，如果没有就加载失败，如果有，就找package.json里的main(),就加载里面的index.js/index.json/index.node,如果没有，也是失败。

### require模块名称
如：require('http')
现在核心模块中查找，是否有名字一样的模块，如果有，则直接加载该核心模块
2)如果核心模块中没有该模块，就很认为是一个第三方模块（自定义模块）, 先会去当前js文件所在的目录下找node_modules文件夹,当前目录没有，会去当前执行的文件的父目录里面寻找
### Node.js 与 JavaScript 有什么不同?

### 什么时候用 Node.js？
Node.js 是异步的、事件驱动的、非阻塞的和单线程的，使得它成为开发下面应用程序的完美候选：

1. 实时应用程序，如聊天和提供实时更新的应用程序
1. 将视频或其他多媒体内容流式传输给大量观众的流式应用程序
1. 其他 I/O 密集型应用程序，如协作平台
1. 遵循微服务架构的网络后端
然而，Node.js 的特性使得它对于其他类型的应用程序来说不是一个理想的选择。执行 CPU 密集型任务的应用程序（如复杂的数学计算）在使用 CPU 时表现不佳，因为 Node.js 是单线程的。

### EventEmitter 做了什么？
Node.js 中任何对象发出的事件都是 EventEmitter 类的实例，就像 http 模块。
所有 EventEmitter 类都可以使用 eventEmitter.on() 函数将事件侦听器附加到事件。然后一旦捕捉到这样的事件，就会同步地逐个调用它的侦听器。

const events = require("events");const eventEmitter = new events.EventEmitter();const eventListener = function(){  console.log("event triggered");}eventEmitter.on("emitted", eventListener);eventEmitter.emit("emitted");

### 事件循环是什么?
node启动会初始化事件队列（event loop），先加入先执行，执行完一次队列，再次循环遍历看有没有新事件加入队列。
执行中的事件叫IO事件， setlmmediate在当前队列中立即执行，setTimout/setInterval把执行定时到下一个队列， process. nextTick在当前队列执行完，下次遍历前执行。所以总体顺序是：IO事件→ setImmediate→ setTimeout/setInterval→ process. nextTick。
单线程的 Node.js 必须是非阻塞的，以防止线程阻塞在需要很长时间才能完成的任务上，事件循环负责实现这种非阻塞行为，它使用应用程序线程调度挂起的任务。
Node.js 在任务完成时通过回调来处理异步函数返回的响应。与创建任务的事件类似，任务完成后也会发出一个事件。Node.js 将需要处理的事件添加到事件队列。
事件循环对事件队列中的事件进行迭代，并安排何时执行其关联的回调函数。

1. 定时器：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
1. 待定回调：执行延迟到下一个循环迭代的 I/O 回调。
1. idle, prepare：仅系统内部使用。
1. 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
1. 检测：setImmediate() 回调函数在这里执行。
1. 关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)

### 说说线程与进程的区别。
1. 一个程序至少有一个进程，一个进程至少有一个线程
1. 线程的划分尺度小于进程，使得多线程程序的并发性高。
1. 进程在执行过程中拥有独立的内存单元，而多个线程共享内存，极大地提高了程序的运行效率。
1. 线程在执行过程中与进程有区别。每个独立的线程都有程序运行的入口、顺序执行序列和程序的出口。但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制。
1. 从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看作多个独立的应用来实现进程的调度、管理和资源分配。这是进程和线程的主要区别。

### 流是什么?
Stream 流是从源读取或写入数据并将其传输到连续流目标的管道。有四种类型：
1. 可读
1. 可写的
1. 可读写
1. 先写入，再读出来
每个流也是一个 EventEmitter。这意味着流对象可以在流上没有数据、流上有可用数据或流中的数据在程序刷新时发出事件。

const fs = require("fs");const readableStream = fs.createReadStream("test.txt");let content = "";readableStream.on("data", (chunk) => {  content += chunk;});readableStream.on("end", () => {  console.log(content);});

### readFile 和 createReadStream 函数有什么区别？
1. readFile 函数异步读取文件的全部内容，并存储在内存中，然后再传递给用户。
1. createReadStream 使用一个可读的流，逐块读取文件，而不是全部存储在内存中。
1. 与 readFile 相比，createReadStream 使用更少的内存和更快的速度来优化文件读取操作。如果文件相当大，用户不必等待很长时间直到读取整个内容，因为读取时会先向用户发送小块内容。
1. const fs = require("fs");fs.readFile("test.txt", (err, content) => {  console.log(content);});

### 如何处理 Node.js 中未捕获的异常？
我们可以在进程级别捕获应用程序中未捕获的异常。为此将侦听器附加到 process 全局对象：
process.on("uncaughtException", (err) => {  console.log("exception caught: ", err);});

### Node.js 能否充分利用多核处理器？
（默认的）Node.js 应用程序总是单线程的，即使在多核处理器上运行，应用程序也能只使用一个处理器。
但是 Node.js 的核心模块之一 Cluster 支持 Node.js 应用程序开启多核，允许我们创建多个工作进程，这些进程可以在多个内核上并行运行，并共享一个端口来侦听事件。
每个进程使用 IPC 与主线程通信，并根据需要将服务器句柄传递给其他进程。主进程可以侦听端口本身并以循环方式将每个新连接传递给子进程，也可以将端口分配给子进程以便子进程侦听请求。
### 反应堆设计模式是什么？
反应堆设计模式是，Node.js 将回调函数（处理程序）附加到每个 I/O 操作，然后创建请求时将处理程序提交给解复用器。
解复用器收集应用程序中发出的每个 I/O 请求，并将它们作为队列中的事件进行排队。这个队列就是我们所说的事件队列。将事件排队后，解复用器返回应用程序线程的控制。
同时，事件循环遍历事件队列中的每个事件，并调用附加的回调来处理事件响应。
这就是 Node.js 中所使用的反应堆模式。

### 单线程与多线程网络后端相比有哪些好处？
尽管 Node.js 是单线程的，但是大多数用于后端开发的编程语言都提供多线程来处理应用程序操作。
为什么单线程有利于后端开发？
开发人员更容易实现应用程序。我们的应用程序在生产过程中不会突然遇到意外的竞争条件。
单线程应用程序易于扩展。
它们可以毫不延迟地在一个时刻收到的大量用户请求提供服务。相比之下，当流量较大时，多线程后端必须等待线程池中的线程释放，才能为用户请求提供服务。利用 Node.js 的非阻塞特性，用户请求不会在单个线程上挂起太长时间（只有在操作不是 CPU 密集型时）。

### REPL 是什么？
REPL 代表 Read Eval Print Loop，是一个虚拟环境，可以在其中轻松地运行编程语言。Node.js 带有一个内置的 REPL 来运行 JavaScript 代码，类似于我们在浏览器中用来运行 JavaScript 代码的控制台。
要启动 Node.js REPL，只需在命令行上运行 node，然后写一行 JavaScript 代码，就可以在下一行看到它的输出。

### process.nextTick 和 setImmediate 有什么区别？
传递给 setImmediate 函数的回调将在事件队列上的下一次迭代中执行。
另一方面，回调传递给 process.nextTick 在下一次迭代之前以及程序中当前运行的操作完成之后执行。在应用程序启动时，开始遍历事件队列之前调用它的回调。
因此，回调 process.nextTick 总是在 setImmediate 之前调用。
下面代码段：
setImmediate(() => {  console.log("first");})process.nextTick(() => {  console.log("second");})console.log("third");
将按顺序输出：
thirdsecondfirst
### stub 是什么?
测试应用程序时使用 stub，模拟给定组件或模块的行为，你可以将精力集中在要测试的代码部分。通过使用 stub 代替与测试无关的组件，不必担心外部组件会影响结果。
例如，如果正在测试的组件在预期测试的部分之前有一个文件读取操作，则可以使用 stub 来模拟该行为并返回模拟内容，而不用实际读取文件。
在 Node.js 中，我们使用像 Sinon 这样的库来实现（译者注，Sinon 在测试中替换某部分代码，减少测试项编写的复杂度 https://sinonjs.org）。

### 为什么在 express 中分离“应用程序”和“服务器”是一种好的做法？
通过在 Express 中分离应用程序和服务器，可以将 API 实现与网络相关配置分开。在不执行网络调用的情况下执行 API 测试，保证了更快的测试执行和更好的代码覆盖度量。
要实现这种分离，应该在单独的文件中声明 API 和 server，对应 app.js 和 server.js：
// app.jsconst express = require("express");const app = express();app.use("/", index);app.use("/contact", contact);app.use("/user", user);module.exports = app;// server.jsconst http = require("http");const app = require("/app");app.set('port', process.env.PORT);const http = http.createServer(app);

### 什么是 yarn 和 npm？为什么要用 yarn 代替 npm 呢？
npm 是与 Node.js 自带的默认包管理器，它有一个大型的公共库和私有库，存储在 npm registry 的数据库中（译者注，官方默认中心库 http://registry.npmjs.org/，国内淘宝镜像 http://registry.npm.taobao.org/），用户可以通过 npm 命令行访问该数据库。在 npm 的帮助下，用户可以轻松管理项目中的依赖项。

yarn 也是一个包管理器，为了解决 npm 的一些缺点。yarn 依赖 npm 注册中心为用户提供对包访问。yarn 底层结构基于 npm，如果从 npm 迁移到 yarn，项目结构和工作流不需要大改。
就像之前提到的，在某些情况下，yarn 提供了比 npm 更好的功能。与 npm 不同的是，它会缓存下载的每个包，不必重新下载。

### 你了解 Node. js吗？
Node. js是一个基于 Chrome v8引擎的服务器端 JavaScript运行环境；Node. js是一个事件驱动、非阻塞式I/O的模型，轻量而又高效；Node. js的包管理器npm是全球最大的开源库生态系统。
### Node. js的使用场景是什么？
高并发、实时聊天、实时消息推送、客户端逻辑强大的SPA（单页面应用程序）。
### 为什么要用 Node. js？
原因如下。
（1）简单， Node. js用 JavaScript、JSON进行编码，简单好学。
（2）功能强大，非阻塞式I/O，在较慢的网络环境中，可以分块传输数据，事件驱动，擅长高并发访问。
（3）轻量级， Node. js本身既是代码又是服务器，前后端使用同一语言。
（4）可扩展，可以轻松应对多实例、多服务器架构，同时有海量的第三方应用组件。
### Node. js有哪些全局对象？
global、 process, console、 module和 exports。
### process有哪些常用方法？
process.stdin、 process.stdout、 process.stderr、process.on、 process.env、 process.argv、 process.arch、process.platform、 process.exit
### console有哪些常用方法？
console.log/console. info、console.error/console.warning、console.time/console.timeEnd 、console.trace、console .table。
### Node.js有哪些定时功能？
setTimeout/clearTimeout, setInterval/clearInterval、 setImmediate/clearImmediate、 process. nextTick。

### 如何应用 Node. js中的 Buffer？
Buffer是用来处理二进制数据的，比如图片、MP3、数据库文件等。Buffer支持各种编码解码、二进制字符串互转。
### Node. js中的异步和同步如何理解？
Node.js是单线程的，异步是通过一次次的循环事件队列来实现的。同步则是阻塞式的IO，这在高并发环境中会是一个很大的性能问题，所以同步一般只在基础框架启动时使用，用来加载配置文件、初始化程序等。
### 通过哪些方法可以进行异步流程的控制？
通过以下方法可以进行异步流程的控制。
（1）多层嵌套回调。
（2）为每一个回调写单独的函数，函数里边再回调。
（3）用第三方框架，如 async、q、 promise等。
### 通过哪些常用方法可以防止程序崩溃？
通过以下方法可以防止程序崩溃。
（1） try-catch-finally。
（2） EventEmitter/Stream error事件处理。
（3） domain统一控制。
（4） jshint静态检查。
（5） jasmine/mocha单元测试。
### 怎样调试 Node. js程序？
用node-- debug app. js和 node-inspector。
### Node .js的网络模块都有哪些？
Node. js全面支持各种网络服务器和客户端，包括TCP、HTP/ HTTPS、TCP 、UDP、DNS、tls/ssl等。
### Noe.js是怎样支持 HTTPS、tls的？
主要通过以下几个步骤支持。
（1）使用 openssl生成公钥、私钥。
（2）服务器或客户端使用HTTPS替代HTTP。
（3）服务器或客户端加载公钥、私钥证书。
16、什么是 Node. js？
Node. js是一个 JavaScript的运行环境，是一个服务器端的“ JavaScript解释器”，用于方便高效地搭建一些响应速度快、易于扩展的网络应用。它采用事件驱动、异步编程方式，为网络服务而设计。
### Node. js的优缺点是什么？
优点如下：
（1） Node. js是基于事件驱动和无阻塞的，非常适合处理并发请求，因此构建在 Node. js的代理服务器相比其他技术实现的服务器要好一点。
（2）与 Node. js代理服务器交互的客户端代码由 JavaScript语言编写，客户端与服务端都采用一种语言编写。
缺点如下：
（1） Node .js是一个相对新的开源项目，不太稳定，变化速度快。
（2）不适合CPU密集型应用，如果有长时间运行的计算（比如大循环），将会导致CPU时间片不能释放，使得后续I/O无法发起。
### npm是什么？
npm是 Node. js中管理和分发包的工具，可用于安装、卸载、发布、查看包等。
### npm的好处是什么？
通过ηpm，可以安装和管理项目的依赖，还可以指明依赖项的具体版本号。
### Node. js中导入模块和导入 JavaScript文件在写法上有什么区别？
在 Node. js中要导入模块，直接使用名字导入即可，如下所示：
var express = require（"express"）；
要导入 JavaScript文件，需要使用文件的路径，如下所示：

var demo = require（"./demo.js"）；
### npm的作用是什么？

npm是同 Node .js一起安装的包管理工具，能解决 Node. js代码部署上的很多问题。常见的使用场景有以下几种。

（1）允许用户从npm服务器下载别人编写的第三方包到本地。

（2）允许用户从npm服务器下载并安装别人编写的命令行程序到本地。

（3）允许用户将自己编写的包或命令行程序上传到npm服务器供别人使用。

### 什么是 EventEmitter？

EventEmitter是 Node. js中一个实现观察者模式的类，主要功能是订阅和发布消息，用于解决多模块交互而产生的模块之间的耦合问题.

### 如何实现一个 EventEmitter？

可通过3步实现 EventEmitter定义一个子类，通过寄生组合式继承，继承 EventEmitter

父类，代码如下。

var Util= require('util' ); var EventEmitter= require ('events' ) .EventEmitter；function  IcktEmitter () {    EventEmitter .apply(this, arguments)}Util.inherits(IcktEmitter, EventEmitter);

var ie = new IcktEmitter ( ) ;   ie.on('icketang'， function（data）{       console.log('接收到消息'，data )})ie.emit（' icketang'，'来自有课网的消息'）；
### EventEmitter有哪些典型应用？

有以下应用。

（1）在模块间传递消息。

（2）在回调函数内外传递消息。

（3）处理流数据，因为流是在 EventEmitter的基础上实现的。

（4）运用观察者模式收发消息的相关应用。

### 如何捕获 EventEmitter的错误事件？

当发布error消息的时候，如果没有注册该事件，应用程序会抛出错误并中断执行。所以要监听error事件，代码如下。

var ie= new IcktEmitter ( ); ie .on（'error '， function（err）{ conso1e.1og ( '接收到错误的信息'，err )})ie.emit（' error'，'来自ie1的错误消息'）；
### Node. js中的流是什么？

流(Stream)是基于 EventEmitter的数据管理模式，由各种不同的抽象接口组成，主要包括可写、可读、可读写、可转换等类型。

### 使用流有什么好处？

流是非阻塞式数据处理模式，可以提升效率，节省内存，有助于处理管道且可扩展等。

28、流有哪些典型应用？

流在文件读写、网络请求、数据转换、音频、视频等方面有很广泛的应用。

### 如何捕获流的错误事件？

监听error事件，方法与订阅 EventEmitter的error事件相似。

### 有哪些常用 Stream流？分别什么时候使用？

Readable流为可读流，在作为输入数据源时使用；Writable流为可写流，在作为输岀源时使用；Duplex流为可读写流，它作为输岀源被写入，同时又作为输入源被后面的流读出。

Transform流和 Duplex流一样，都是双向流，区别是 Transfrom流只需要实现一个函数 _transfrom( chunk, encoding, callback)；而 Duplex流需要分别实现_read(size )函数和_write( chunk, encoding, callback ）函数。

### 如何实现一个 Writable流？

实现 Writable流分成3步

（1）引入 Writable模块。

（2）继承 Writable模块。

（3）实现 _write(chunk, encoding, callback )写入函数。

代码如下。

//引入 Writable模块var Writable= require（'stream'）.Writable；var Util = require（'util'）；//继承 Writable模块function IcktWritable( ) {  Writable. apply(this, arguments ) ;}Util.inherits ( IcktWritable, Writable ) ;//实现 write函数IcktWritable. prototype. _write = function ( data, encoding, callback ) {      console.log ('被写入的数据是：' ，data. toString ( ) )callback ( )}var iw= new IcktWritable ( ) ；for (var i=0；i< 5 ；i++ ) {iw. write（'有课网'+i，'utf8"）}iw,end('学技能就上有课网' )；
### 内置的fs模块架构由哪几部分组成？

fs模块主要由下面几部分组成。
1. POSIX文件 Wrapper，对应操作系统的原生文件操作。
1. 文件流，fs. createReadStream和 fs.createWriteStrean。
1. 同步文件读写， fs.readFileSync和fs.writeFileSync。
1. 异步文件读写， fs.readFile和fs.writeFile。

### 读写一个文件有多少种方法？
1. POSIX式底层读写。
1. 流式读写。
1. 同步文件读写。
1. 异步文件读写。

### 如何读取JSON配置文件？

主要有两种方式。第一种是利用 Node. js内置的 require（ data.json！）机制，直接得到 Javascript对象；

第二种是读入文件内容，然后用JSON. parse（ content）转换成 JavaScript对象。

二者的区别是，对于第一种方式，如果多个模块都加载了同一个JSON文件，那么其中一个改变了 JavaScript对象，其他也跟着改变，这是由 Node.js模块的缓存机制造成的，缓存中只有一个 JavaScript模块对象；

第二种方式则可以随意改变加载后的JavaScript变量，而且各模块互不影响，因为它们都是独立的，存储的是多个 JavaScript对象。

### fs.watch和 fs.watchFile有什么区别？
二者主要用来监听文件变动，fs.watch利用操作系统原生机制来监听，可能不适用网络文件系统；fs. watchFile则定期检查文件状态变更，适用于网络文件系统，但是与fs.watch相比有些慢，因为它不采用实时机制。

### 为什么需要子进程？

Node. js是异步非阻塞的，这对高并发非常有效。可是我们还有其他一些常用的需求，比如和操作系统 shell命令交互，调用可执行文件，创建子进程，进行阻塞式访问或高CPU计算等，子进程就是为满足这些需求而产生的。顾名思义，子进程就是把 Node. js阻塞的工作交给子进程去做。

### exec、 execFile、 spawn和fork都是做什么用的？
1. 它们的作用分别如下。
1. exec可以用操作系统原生的方式执行各种命令，如管道 cat ab. txt |  grep hello。
1. execFile用于执行一个文件。
1. spawn负责在流式和操作系统之间进行交互。
1. fork负责在两个 Node. js程序（ JavaScript）之间进行交互。

### 如何实现一个简单的命令行交互程序？

var cp = require (' child process )；//执行指令var child= cp .spawn（'echo', ['hello, ''] )；// child.stdout是输入流， process. stdout是输出流//子进程的输出流作为当前程序的输入流，然后重定向到当前程序的控制器输出child. stdout. pipe（process. stdout）

### 两个 Node. js程序之间如何交互？

通过fork实现父子程序之间的交互。子程序用 process.on、 process. send访问父程序，父程序用 child.on、 child.send访问子程序。

关于 parent. JS的示例代码如下。

var cp = require (' child_process' ) ; var child= cp.fork ('./child. js' );child .on（'message'， function（msg）{ console.1og（'子程序发送的数据：'，msg )})child.send ( '来自父程序发送的数据' )
关于 child .js的示例代码如下。

process .on ( 'message' , function（msg）{conso1e.1og ( '父程序发送的数据: ' , msg )process.send ( '来自子程序发送的数据' )
### 如何让一个 JavaScript文件变得像 Linux命令一样可执行？

具体步骤如下。

（1）在文件头部加入#！/ bin/sh

如 icketang40.js#！/bin/shecho'有课网— 技能学习就上有课网；
（2）用 chmod命令把名为 icketang40的 JavaScript文件改为可执行文件。

chmod + x  icketang40.js
（3）进入文件目录，在命令行输入 icketang40.js就相当于执行 node icketang40.js

$ ./icketang40.js
执行结果。

### 子进程和进程的 stdin、 stdout、 stderror是样的吗？

概念都是一样的。stdin、 stdout、 stderror分别是输入、输出、错误。三者都是流。区别是在父进程里，子进程的 stdout是输入流， stdin是输出流。

### async都有哪些常用方法？分别怎么用？

async是一个 JavaScript类库，它的目的是解决 JavaScript中异常流程难以控制的问题。async不仅在 Node. js里适用，还可以用在浏览器中。其常用方法和用法如下。

具体代码如下所示。

var async = require（'async '）；var date = Date .now ( )；
（1） async. parallel：并行执行完多个函数后，调用结束函数。不用等到前一个函数。执行完再执行下一个函数。

async .parallel ( [     function ( callback ) {        setTimeout (function () {console. log（'process one'， Date. now ( ) - date)callback（null, 'msg one'）}，2000)}，function ( callback ){setTimeout ( function () {console. log（'process tow'， Date .now ( ) - date )callback ( null, 'msg tow' )}，1000)}]， function（err, result）{  console. log（err, result, 'done ')})
（2） async.series：串行执行完多个函数后，调用结束函数。前面一个函数执行完之后，就会立即执行下一个函数。

async .series ( [function ( callback ) {setTimeout ( function () {console. log ( 'process one ', Date. now ( ) - date )callback ( null, ' msg one'  )}，2000 )},function ( callback )  {setTimeout ( function () {console. log ( 'process tow'， Date. now ( ) - date )callback ( null, 'msg tow ' )}，1000 )   }] ， function (err, result ) {console. log（err, result, 'done'）})
（3） async. waterfall：依次执行多个函数，前一个函数的执行结果作为后一个函数执行时的参数。

async .waterfall ( [function ( callback ) {setTimeout ( function () {console. log（'process one, Date. now（）- date）callback（null, 'msg one'）}，2000）},function（argl, callback）{ setTimeout （function（）{console. log（'process tow, Date. now  ( ) - date, argl )callback（null, 'msg tow'）}，1000)}] , function（err, result）{console. log（err, result, 'done '）})
### express项目的目录大致是什么结构的？

首先，执行安装 express的指令：npm install express-generator-g。

然后，通过 express指令创建项目：express icketang。

创建的项目目录结构如下。

./app.js  应用核心配置文件（入口文件）

./bin  存放启动项目的脚本文件

./ package.json  存储项目的信息及模块依赖

./public 静态文件（css、js、img等）

./routes 路由文件（MVC中的 contro1ler）

./views 页面文件（jade模板）

### express常用函数有哪些？
1. express .Router—路由组件
1. app.get—路由定向。
1. app. configure——配置。
1. app.set一设定参数。
1. app.use——使用中间件。

### express中如何获取路由的参数？
/users/：name
使用 req.params.name来获取；使用req.body.username来获得表单传入参数 username；express的路由支持常用通配符有？、+、*、( )。

### express  response有哪些常用方法？
1. res.download( )，弹出文件下载。
1. res.end ( )，结束响应。
1. res.json( )，返回json。
1. res.jsonp( )，返回 jsonp。
1. res.redirect ( )，重定向请求。
1. res.render ( )，渲染模板。
1. res.send ( )，返回多种形式数据。
1. res.sendFile  ( )，返回文件。
1. res.sendStatus( )，返回状态。

### mongodb有哪些常用优化措施？
1. 优化预读。
1. 禁用NUMA。
1. 不要记录访问时间等。
### Redis的主要特点是什么？
1. Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载和使用。
1. Redis不仅支持简单的键-值类型的数据，同时还提供list、set、zset、hash等数据结构的存储。
1. Redis支持数据的备份，即主-从模式的数据备份。
### Nginx和 Apache有什么区别？

1. Nginx是轻量级的，同样的Web服务在 nginx中会占用更少的内存和资源。Nginx抗并发，处理请求的方式是异步非阻塞的，负载能力比 Apache高很多，而 Apache则是阻塞型的。
1. 在高并发下 Nginx能保持低资源、低消耗、高性能，并且处理静态文件比 Apache好。 
1. Nginx的设计高度模块化，编写模块相对简单，配置简洁。作为负載均衡服务器，支持7层负载均衡，是一个反向代理服务器。
1. 社区活跃，各种高性能模块出品迅速。Apache的 rewrite比 Nginx强大，模块丰富。Apache发展得更为成熟，Bug很少,更加稳定。
1. Apache对PHP的支持比较简单， Nginx需要配合其他后端使用。Apache处理动态请求有优势，拥有丰富的特性、成熟的技术和开发社区。


### 你知道哪些 Node.js核心模块？
EventEmitter 、Stream、FS、Net和全局对象等。

### 说说 MySQL和 MongoDB的区别。
1.  MySQL是传统的关系型数据库， MongoDB则是非关系型数据库。
1. MongoDB以BSON结构进行存储，在存储海量数据方面有着很明显的优势。
1. 与传统关系型数据库相比， NoSQL有着非常显著的性能和扩展性优势。
1. 与传统的关系型数据库（如与 MySQL）相比， MongoDB的优点如下。
1. 弱一致性（最终一致），更能保证用户的访问速度。
1. 使用文档结构的存储方式，能够更便捷地获取数据。

### 谈谈栈和堆的区别。
1. 栈（ stack）区由编译器自动分配和释放，存放函数的参数值、局部变量的值等。
1. 堆（heap）区一般由程序员分配和释放，若程序员不释放，程序结束时可能由OS回收。
1. 堆（数据结构）可以被看成一棵树，如堆排序。栈（数据结构）是一种先进后出的数据结构。

