# 对象表示法
## 概况
> JavaScript Object Notation

JSON 是一种轻量级的数据交换格式，类似 XML。
JSON 比 XML 更小、更快，更易解析。
### 结构
> 对象

> 数组

> 值

1. 字符串（string）
1. 数值(number)
1. true、false
1. null
1. 对象（object）
1. 数组（array）

## 原理

1.使用eval
```js
var parse_json_by_eval = function(str){
  return eval('('+str+')')
}
var value = 1
var jsonstr = '{"name":"jifeng","company":"taobao","value":++value}'
var json1 = parse_json_by_eval(jsonstr)
console.log(json1)
console.log('value: '+ value)
// 執行結果：
// { name: 'jifeng', company: 'taobao', value: 2 }
// value: 2

// 2.使用JSON.parse
var parse_json_by_JSON_parse = function(str){
  return JSON.parse(str)
}
value = 1
var jsonstr = '{"name":"jifeng","company":"taobao"}'
var json2 = parse_json_by_JSON_parse(jsonstr)
console.log(json2)
console.log(value)
```

### parse

```js
JSON.parse = function (text, reviver) {
  var j;

  function walk(holder, key) {
    var k, v, value = holder[key];
    if (value && typeof value === 'object') {
      for (k in value) {
        if (Object.hasOwnProperty.call(value, k)) {
          v = walk(value, k);
          if (v !== undefined) {
            value[k] = v;
          } else {
            delete value[k];
          }
        }
      }
    }
    return reviver.call(holder, key, value);
  }

  cx.lastIndex = 0;
  if (cx.test(text)) {
    text = text.replace(cx, function (a) {
      return '\\u' +
        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    });
  }
  if (/^[\],:{}\s]*$/.
    test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    j = eval('(' + text + ')');
    return typeof reviver === 'function' ?
      walk({ '': j }, '') : j;
  }
  throw new SyntaxError('JSON.parse');
}
```

### stringify
```js
JSON.stringify = function (value, replacer, space) {
  var i;
  gap = '';
  indent = '';
  if (typeof space === 'number') {
    for (i = 0; i < space; i += 1) {
      indent += ' ';
    }
  } else if (typeof space === 'string') {
    indent = space;
  }
  rep = replacer;
  if (replacer && typeof replacer !== 'function' &&
    (typeof replacer !== 'object' ||
      typeof replacer.length !== 'number')) {
    throw new Error('JSON.stringify');
  }
  return str('', { '': value });
};
```