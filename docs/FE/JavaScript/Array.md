# Array
# 属性
## Array.prototype[@@unscopables]
## Array.prototype.length
# 方法
## Array.prototype[@@iterator]()
## get Array[@@species]
```js
```

## at
Array.prototype.at() (en-US)
Returns the array item at the given index. Accepts negative integers, which count back from the last item.
```js
```
## concat 多数组合并
Array.prototype.concat()
用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组
```js
```

## copyWithin 拷贝老数据到老数据某个位置
Array.prototype.copyWithin()
浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度
```js
if (!Array.prototype.copyWithin) {
  Array.prototype.copyWithin = function(target, start/*, end*/) {
    // Steps 1-2.
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this);

    // Steps 3-5.
    var len = O.length >>> 0;

    // Steps 6-8.
    var relativeTarget = target >> 0;

    var to = relativeTarget < 0 ?
      Math.max(len + relativeTarget, 0) :
      Math.min(relativeTarget, len);

    // Steps 9-11.
    var relativeStart = start >> 0;

    var from = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    // Steps 12-14.
    var end = arguments[2];
    var relativeEnd = end === undefined ? len : end >> 0;

    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);

    // Step 15.
    var count = Math.min(final - from, len - to);

    // Steps 16-17.
    var direction = 1;

    if (from < to && to < (from + count)) {
      direction = -1;
      from += count - 1;
      to += count - 1;
    }

    // Step 18.
    while (count > 0) {
      if (from in O) {
        O[to] = O[from];
      } else {
        delete O[to];
      }

      from += direction;
      to += direction;
      count--;
    }

    // Step 19.
    return O;
  };
}
```

## entries 返回新的Array Iterator对象
Array.prototype.entries()
返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键/值对
```js
```

## every 判断所有数据是否符合
Array.prototype.every()
测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值
```js
if (!Array.prototype.every) {
  Array.prototype.every = function(callbackfn, thisArg) {
    'use strict';
    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the this
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method
    //    of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
    if (typeof callbackfn !== 'function') {
      throw new TypeError();
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0.
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method
        //    of O with argument Pk.
        kValue = O[k];

        // ii. Let testResult be the result of calling the Call internal method
        //     of callbackfn with T as the this value and argument list
        //     containing kValue, k, and O.
        var testResult = callbackfn.call(T, kValue, k, O);

        // iii. If ToBoolean(testResult) is false, return false.
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}
```

## fill 指定范围替换
Array.prototype.fill()
用一个固定值填充一个数组中从起始索引到终止索引内的全部元素

```js
if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}
```

## filter 数据过滤
Array.prototype.filter()
创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
```js
if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();

    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func(t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }

    res.length = c; // shrink down array to proper size
    return res;
  };
}
```

## find 寻找第一个满足要求
Array.prototype.find()
返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
```js
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}
```

## findIndex 寻找第一个满足要求的索引
Array.prototype.findIndex()
返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1
```js
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    }
  });
}
```

## flat 数组拍平为新数组
Array.prototype.flat()
按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回

### 使用扩展运算符 ...
```js
const flattened = arr => [].concat(...arr);
reduce + concat + isArray + recursivity
// 使用 reduce、concat 和递归展开无限多层嵌套的数组
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];

function flatDeep(arr, d = 1) {
   return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                : arr.slice();
};

flatDeep(arr1, Infinity);
// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

### 扁平化数组
```js
/**
 * Flattens passed array in one dimensional array
 *
 * @params {array} arr
 * @returns {array}
 */
function flatten(arr) {
  const result = [];

  arr.forEach((i) => {
    if (Array.isArray(i))
      result.push(...flatten(i));
    else
      result.push(i);
  })

  return result;
}

// Usage
const problem = [1, 2, 3, [4, 5, [6, 7], 8, 9]];

flatten(problem); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### forEach+isArray+push+recursivity
```js
// forEach 遍历数组会自动跳过空元素
const eachFlat = (arr = [], depth = 1) => {
  const result = []; // 缓存递归结果
  // 开始递归
  (function flat(arr, depth) {
    // forEach 会自动去除数组空位
    arr.forEach((item) => {
      // 控制递归深度
      if (Array.isArray(item) && depth > 0) {
        // 递归数组
        flat(item, depth - 1)
      } else {
        // 缓存元素
        result.push(item)
      }
    })
  })(arr, depth)
  // 返回递归结果
  return result;
}
```

### for of 循环不能去除数组空位，需要手动去除
```js
const forFlat = (arr = [], depth = 1) => {
  const result = [];
  (function flat(arr, depth) {
    for (let item of arr) {
      if (Array.isArray(item) && depth > 0) {
        flat(item, depth - 1)
      } else {
        // 去除空元素，添加非undefined元素
        item !== void 0 && result.push(item);
      }
    }
  })(arr, depth)
  return result;
}
```

### 使用堆栈stack
```js
// 无递归数组扁平化，使用堆栈
// 注意：深度的控制比较低效，因为需要检查每一个值的深度
// 也可能在 shift / unshift 上进行 w/o 反转，但是末端的数组 OPs 更快
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
function flatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // 使用 pop 从 stack 中取出并移除值
    const next = stack.pop();
    if (Array.isArray(next)) {
      // 使用 push 送回内层数组中的元素，不会改动原始输入
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // 反转恢复原数组的顺序
  return res.reverse();
}
flatten(arr1);// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

### 递归版本的反嵌套
```js
function flatten(array) {
  var flattend = [];
  (function flat(array) {
    array.forEach(function(el) {
      if (Array.isArray(el)) flat(el);
      else flattend.push(el);
    });
  })(array);
  return flattend;
}
```

### Generator
```js
function* flatten(array) {
    for (const item of array) {
        if (Array.isArray(item)) {
            yield* flatten(item);
        } else {
            yield item;
        }
    }
}

var arr = [1, 2, [3, 4, [5, 6]]];
const flattened = [...flatten(arr)];
// [1, 2, 3, 4, 5, 6]
```

## flatMap 映射数组中值到新数组
Array.prototype.flatMap()
使用映射函数映射每个元素，然后将结果压缩成一个新数组
```js

```
## map 映射值到新数组
Array.prototype.map()
返回一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值
```js
```
## forEach 循环执行函数
Array.prototype.forEach()
对数组的每个元素执行一次给定的函数
```js
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}
```

## includes
Array.prototype.includes()
判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回 false
```js
```
## indexOf
Array.prototype.indexOf()
返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回 -1
```js
```
## join
Array.prototype.join()
将一个数组的所有元素连接成一个字符串并返回这个字符串
```js
```
## keys
Array.prototype.keys()
返回一个包含数组中每个索引键的 Array Iterator 对象
```js
```
## lastIndexOf
Array.prototype.lastIndexOf()
返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1
```js
```

```
## pop
Array.prototype.pop()
从数组中删除最后一个元素，并返回该元素的值
```js
```
## push
Array.prototype.push()
将一个或多个元素添加到数组的末尾，并返回该数组的新长度
```js
```
## reduce
Array.prototype.reduce()
对数组中的每个元素执行一个由您提供的reducer函数（升序执行），将其结果汇总为单个返回值
```js
```
## reduceRight
Array.prototype.reduceRight()
接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值
```js
```
## reverse
Array.prototype.reverse()
将数组中元素的位置颠倒，并返回该数组。该方法会改变原数组
```js
```
## shift
Array.prototype.shift()
从数组中删除第一个元素，并返回该元素的值
```js
```
## slice
Array.prototype.slice()
提取源数组的一部分并返回一个新数组
```js
```
## some
Array.prototype.some()
测试数组中是不是至少有一个元素通过了被提供的函数测试
```js
```
## sort
Array.prototype.sort()
对数组元素进行原地排序并返回此数组
```js
```
## splice
Array.prototype.splice()
通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容
```js
```
## toLocaleString
Array.prototype.toLocaleString()
返回一个字符串表示数组中的元素。数组中的元素将使用各自的 Object.prototype.toLocaleString() 方法转成字符串
```js
```
## toString
Array.prototype.toString()
返回一个字符串表示指定的数组及其元素。数组中的元素将使用各自的 Object.prototype.toString() 方法转成字符串
```js
```
## unshift
Array.prototype.unshift()
将一个或多个元素添加到数组的头部，并返回该数组的新长度
```js
```
## values
Array.prototype.values()
返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
```js
```
## [@@iterator]()
Array.prototype[@@iterator]()
返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值

# 继承
## Function
# 属性
## Function.arguments
## Function.caller
## Function.displayName
## Function.length
## Function.name
# 方法
## Function.prototype.apply()
## Function.prototype.bind()
## Function.prototype.call()
## Function.prototype.toSource()
## Function.prototype.toString()
## Object
# 属性
## Object.prototype.constructor
## Object.prototype.__proto__
# 方法
## Object.prototype.__defineGetter__()
## Object.prototype.__defineSetter__()
## Object.prototype.__lookupGetter__()
## Object.prototype.__lookupSetter__()
## Object.prototype.hasOwnProperty()
## Object.prototype.isPrototypeOf()
## Object.prototype.propertyIsEnumerable()
## Object.setPrototypeOf()
## Object.prototype.toLocaleString()
## Object.prototype.toSource()
## Object.prototype.toString()
## Object.prototype.valueOf()