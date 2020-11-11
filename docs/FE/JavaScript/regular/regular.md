## 正则表达式
# 定义
正则表达式（regular expression）是一个描述字符模式的对象，使用正则表达式可以进行强大的模式匹配和文本检索与替换功能。

JavaScript 的正则表达式语法是 Perl5 的正则表达式语法的大型子集，所以对于有 Perl 编程经验的程序员来说，学习 JavaScript 中的正则表达式是小菜一碟。

正则表达式是描述字符模式的对象，用于对字符串模式匹配及检索替换，是对字符串执行模式匹配的强大工具。
JavaScript中的正则表达式用RegExp对象表示，可以使用RegExp()构造函数来创建RegExp对象，不过RegExp对象更多是通过字面量的语法来创建。

## 创建
### 构造函数
``` javascript
<!-- // 不推荐写法 -->
var patt = new RegExp(pattern模式,modifiers修饰符)

<!-- // 匹配所有的a或A -->
var reg = new RegExp("a","gi")
```
注意：当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。

### 字面量
``` javascript
<!-- // 推荐写法 -->
var patt = /pattern/modifiers

<!-- // 匹配所有的a或A -->
var reg = /a/gi
```

``` javascript
var reg = new RegExp("\\w+")
var reg = /\w+/
```

## 版本区别
在ECMAScript5中这种情况有所改变，相同正则表达式字面量的每次计算都会`创建新的实例对象`，目前很多现代浏览器也对此做了纠正。
```
function getRE(){
	var re = /[a-z]/
	re.foo = 'bar'
	return re
}
var reg = getRE()
re2 = getRE()
console.log(reg === re2)
reg.foo = 'baz'
console.log(re2.foo)

ECMAScript3同一对象
<!-- // true -->
<!-- // "baz" -->

ECMAScript5不同对象
<!-- // false -->
<!-- // "bar" -->
```

# 表达式
## 模式修饰词
表达式 | 描述
-------|------
i      | 执行对大小写不敏感的匹配
g      | 执行全局匹配模式（查找所有匹配而非在找到第一个匹配后停止）
m      | 执行多行匹配模式

``` javascript
var str='HwwwwLwello orllld lLll!'
console.log(str.match(/l/))
<!-- // ["l", index: 8, input: "HwwwwLwello orllld lLll!"] -->
console.log(str.match(/l/i))
<!-- // ["L", index: 5, input: "HwwwwLwello orllld lLll!"] -->
console.log(str.match(/l/g))
<!-- // ["l", "l", "l", "l", "l", "l", "l", "l"] -->

var str='Hwwwwl\nwello orllld lLll!'
console.log(str)
<!-- // Hwwwwl -->
<!-- // wello orllld lLll! -->
console.log(str.match(/l$/))
<!-- // null -->
console.log(str.match(/l$/m))
<!-- // ["l", index: 5, input: "Hwwwwl↵wello orllld lLll!"] -->
```

## 元字符
与其他语言中的正则表达式类似，模式中使用的所有元字符都必须转义。正则表达式中的元字符包括：

``` javascript
( [ { \ ^ $ | ) ? * + . ] }
```
这些元字符在正则表达式中都有一或多种特殊用途，因此如果想要匹配字符串中包含的这些字符，就必须对它们进行转义。
下面给出几个例子。

``` javascript
var pattern1 = /[bc]at/i
<!-- // 匹配第一个"bat"或"cat"，不区分大小写 -->

var pattern2 = /\[bc\]at/i
<!-- // 匹配第一个" [bc]at"，不区分大小写 -->
```

## 直接量字符

字符   |   描述
-------|------
字母数字| 自身
\0     | 查找 NUL 字符（\u0000）
\t     | 查找制表符（\u0009）
\v     | 查找垂直制表符（\u000A）
\n     | 查找换行符（\u000B）
\f     | 查找换页符（\u000C）
\r     | 查找回车符（\u000D）
\xdd   | 查找以十六进制数 dd 规定的字符（\x0A => \n）
\uxxxx | 查找以十六进制数 xxxx 规定的 Unicode 字符（\u0009 => \t）
\cX    | 控制字符^X （\cJ => \n）

``` javascript
var str='null \t \n \f \r '
console.log(str.match(/\n/))
// ["↵", index: 7, input: "null 	 ↵   "]
console.log(str.match(/\f/))
// ["", index: 9, input: "null 	 ↵   "]
var str='null'
console.log(str.test(/\0/))
// 
```

## 字符类
字符     |   描述
---------|------
.        | 查找单个字符，除了换行和行结束符
\w       | (word)查找单词字符：[a-zA-Z_0-9]（单词字符包括：a-z、A-Z、0-9，以及下划线）
\W       | 查找非单词字符：[^a-zA-Z_0-9]（单词字符包括：a-z、A-Z、0-9，以及下划线）
\s       | (white space)查找空白字符
\S       | 查找非空白字符
\d       | (digit)查找数字：[0-9]
\D       | 查找非数字字符：[^0-9]
[0-9]    | 查找任何从 0 至 9 的数字
[a-z]    | 查找任何从小写 a 到小写 z 的字符
[A-Z]    | 查找任何从大写 A 到大写 Z 的字符
[A-z]    | 查找任何从大写 A 到小写 z 的字符
[...]    | 查找方括号之间的任何字符（没有顺序同级）
[^...]   | 查找不在方括号之间的任何字符
[adgk]   | 查找给定集合内的任何字符
[^adgk]  | 查找给定集合外的任何字符

如果要匹配任意字符怎么办?可以使用 [\d\D]、[\w\W]、[\s\S] 和 [^] 中任何的一个。

``` javascript
var str='3 o !_..'
console.log(str.match(/\w/g))
<!-- // ["3", "o", "_"] -->

var str='3 o !_..'
console.log(str.match(/\W/g))
<!-- // [" ", " ", "!", ".", "."] -->

var str='3 o !_..'
console.log(str.match(/\s/g))
<!-- // [" ", " "] -->

var str='3 o !_..'
console.log(str.match(/\S/g))
<!-- // ["3", "o", "!", "_", ".", "."] -->

var str='3 o !_..'
console.log(str.match(/\d/g))
<!-- // ["3"] -->

var str='3 o !_..'
console.log(str.match(/\b/g))
<!-- // ["", "", "", "", "", ""] -->
注：单词前后

var str='3 o A!_..'
console.log(str.match(/[A-Z]/g))
<!-- // ["A"] -->

var str='3 o A!_..'
console.log(str.match(/[A-z]/g))
<!-- // ["o", "A", "_"] -->
注：此处出现了"_"，a-z、A-Z，以及下划线

var str='12323 orllbld lLll!'
console.log(str.match(/[abc]/g))
<!-- // ["b"] -->

console.log(str.match(/[ro3]/g))
<!-- // ["3", "3", "o", "r"] -->

console.log(str.match(/[^abc]/g))
<!-- // ["1", "2", "3", "2", "3", " ", "o", "r", "l", "l", "l", "d", " ", "l", "L", "l", "l", "!"] -->
```

## 重复字符
字符     | 描述
---------|----
X{n,m}   | 匹配包含 n 至 m 个 X 的序列的字符串。
X{n,}    | 匹配包含至少 n 个 X 的序列的字符串。
X{n}     | 匹配包含 n 个 X 的序列的字符串。
X?       | (有吗?)匹配任何包含零个或一个 X 的字符串 {0,1}
X+       | (加号是追加的意思)匹配任何包含至少一个 X 的字符串 {1,}
X*       | (任意次)匹配任何包含零个或多个 X 的字符串 {0,}

``` javascript
var str='Hwwwwlllll orlllld lll!'
console.log(str.match(/l{3,5}/))
<!-- // ["lllll", index: 5, input: "Hwwwwlllll orlllld lll!"] -->
console.log(str.match(/l{2,3}/))
<!-- // ["lll", index: 5, input: "Hwwwwlllll orlllld lll!"] -->
注：匹配出去l为3、4、5

console.log(str.match(/l{0,1}/))
<!-- // ["", index: 0, input: "Hwwwwlllll orlllld lll!"] -->
console.log(str.match(/l?/))
<!-- // ["", index: 0, input: "Hwwwwlllll orlllld lll!"] -->

console.log(str.match(/l{1,}/))
<!-- // ["lllll", index: 5, input: "Hwwwwlllll orlllld lll!"] -->
console.log(str.match(/l+/))
<!-- // ["lllll", index: 5, input: "Hwwwwlllll orlllld lll!"] -->

var str='Hwwwwwello orllld llll!'
console.log(str.match(/l{3,5}/))
<!-- // ["lll", index: 13, input: "Hwwwwwello orllld llll!"] -->
console.log(str.match(/l{1,4}/))
<!-- // ["ll", index: 7, input: "Hwwwwwello orllld llll!"] -->
console.log(str.match(/l{2}/))
注：匹配两个l
<!-- // ["ll", index: 7, input: "Hwwwwwello orllld llll!"] -->
console.log(str.match(/l{4,}/))
<!-- // ["llll", index: 18, input: "Hwwwwwello orllld llll!"] -->

var str='01';
console.log(str.match(/0?/));
<!-- // ["0", index: 0, input: "01"] -->
console.log(str.match(/1?/));
<!-- // ["", index: 0, input: "01"] -->
注：尽可能少的匹配{0,1}

console.log(str.match(/0*/));
<!-- // ["0", index: 0, input: "01"] -->
console.log(str.match(/1*/));
<!-- // ["", index: 0, input: "01"] -->
注：{0,}

console.log(str.match(/1+/));
<!-- // ["1", index: 1, input: "01"] -->
注：{1,}
```

## 非贪婪重复
尽可能少的匹配：??、+?、*?、{1,4}?

``` javascript
var str='0111'
console.log(str.match(/00?/))
<!-- ["0", index: 0, input: "011"] -->
console.log(str.match(/01?/))
<!-- ["01", index: 0, input: "011"] -->
console.log(str.match(/11?/))
<!-- ["11", index: 1, input: "011"] -->

console.log(str.match(/01+/))
<!-- ["0111", index: 0, input: "011"] -->
console.log(str.match(/01+?/))
<!-- ["01", index: 0, input: "011"] -->
注：{1}

var str='0111'
console.log(str.match(/11??/))
<!-- ["1", index: 1, input: "011"] -->
console.log(str.match(/01??/))
<!-- ["0", index: 0, input: "011"] -->
console.log(str.match(/01*/))
<!-- ["0111", index: 0, input: "0111"] -->
console.log(str.match(/01*?/))
<!-- ["0", index: 0, input: "0111"] -->
注：?? = *? ==》 {0}

var str='0111'
console.log(str.match(/1{1,4}?/))
<!-- ["1", index: 1, input: "0111"] -->

var regex = /\d{2,5}?/g;
var string = "123 1234 12345 123456";
console.log(string.match(regex));
// => ["12", "12", "34", "12", "34", "12", "34", "56"]
```

## 锚字符
字符     | 描述
---------|----
^        | 匹配字符串开头(用正则表达式处理多行时匹配行的开始)
$        | 匹配字符串结尾(处理多行时匹配行尾)
\b       | 匹配单词边界
\B       | 匹配非单词边界
(?=p)    | 零宽正向先行断言，要求接下来的字符都与p匹配，但不能包括匹配p的那些字符 (?=p) => p
(?!p)    | 零宽正向先行断言，要求接下来的字符不与p匹配 (?!p) => [^p]

``` javascript
var str='orllld'
console.log(str.match(/^o/))
<!-- // ["o", index: 0, input: "orllld"] -->
console.log(str.match(/d$/))
<!-- // ["d", index: 5, input: "orllld"] -->

var str='orllld'
<!-- 0o1r2l3l4l5d6 -->
console.log(str.replace(/(?=d)/, ','))
<!-- // ["", index: 5, input: "orllld"] -->
<!-- // orlll,d -->

var str='orllld '
console.log(str.match(/d$/))
<!-- // null -->
console.log(str.match(/l(?=d)/))
<!-- // ["l", index: 4, input: "orllld "] -->
console.log(str.match(/l(?!d)/))
<!-- // ["l", index: 2, input: "orllld "] -->

var str='JavaScript'
console.log(str.match(/Java(Script)([A-Z]\w*)/))
<!-- // null -->
console.log(str.match(/Java(?=Script)([A-Z]\w*)/))
<!-- // ["JavaScript", "Script", index: 0, input: "JavaScript"] -->
console.log(str.match(/Java(?=Bcript)([A-Z]\w*)/))
<!-- // null -->
console.log(str.match(/Java(?!Script)([A-Z]\w*)/))
<!-- // null -->
console.log(str.match(/Java(?!Bcript)([A-Z]\w*)/))
<!-- // ["JavaScript", "Bcript", index: 0, input: "JavaScript"] -->

var str='JavaScriptS'
console.log(str.match(/Java(Script)([A-Z]\w*)/))
<!-- // null -->
```

``` javascript
var str='JavaScriptS'
console.log(str.replace(/Java(?!Script)([A-Z]\w*)/, function($0, $1, $2) {
		return $0 + ',' + $1 + ',' + $2
	}))
<!-- // JavaScriptS -->

var str='JavaSs'
console.log(str.match(/Java(?!Script)([A-Z]\w*)/))
<!-- // ["JavaSs", "Ss", index: 0, input: "JavaSs"] -->
console.log(str.replace(/Java(?!Script)([A-Z]\w*)/, function($0, $1, $2) {
		return $0 + ',' + $1 + ',' + $2
	}))
<!-- // JavaSs,Ss,0 -->

var str='JavaType'
console.log(str.match(/Java(?!Script)([A-Z]\w*)/))
<!-- // ["JavaType", "Type", index: 0, input: "JavaType"] -->
```

## 选择、分组、引用字符
字符     | 描述
---------|----
(...)       | 组合，将几个项组合为一个单元，这个单元可通过*、+、?、等符号加以修饰，而且可以记住和这个组合相匹配的字符串以供使用的字符。
(?:...)     | 只组合，把项组合到一个单元，但不记住与该组相匹配的字符
\n          | 反向引用。比如 \2，表示引用的是第二个括号里的捕获的数据。

red|blue|green     查找任何指定red、blue、green的选项。

用()表示的就是要提取的分组（Group）^(\d{3})-(\d{3,8})$分别定义了两个组，可以直接从匹配的字符串中提取出区号和本地号码

``` javascript
<!-- 识别合法的时间 -->
var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
console.log(re.exec('19:05:30'))
<!-- // ["19:05:30", "19", "05", "30", index: 0, input: "19:05:30"] -->
console.log(re.exec('25:05:30'))
<!-- // null -->
var str='JavaScript'
console.log(str.match(re))
<!-- // null -->

var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
<!-- \1 分组序号1 -->
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log(regex.test(string1)); // true
console.log(regex.test(string2)); // true
console.log(regex.test(string3)); // true
console.log(regex.test(string4)); // false
```

``` javascript
var str='JavaScriptS'
console.log(str.replace(/Java(?:Script)([A-Z]\w*)/, function($0, $1) {
		return $0 + ',' + $1
	}))
<!-- // JavaScriptS,S,0 -->

var str='JavaScript'
console.log(str.match(/'a/))
<!-- // null -->
```

### 非捕获性分组
``` javascript
reg = /abc{2}/
<!-- // 将匹配abcc   -->
reg = /(abc){2}/
<!-- // 将匹配abcabc   -->
<!-- // 上面的分组都是捕获性分组   -->

str = "abcabc ###"
console.log(str.match(/(abc){2}/))
<!-- // ["abcabc", "abc", index: 0, input: "abcabc ###"] -->
<!-- // 非捕获性分组 (?:)   -->
console.log(str.match(/(?:abc){2}/))
<!-- // ["abcabc", index: 0, input: "abcabc ###"] -->

console.log(str.match(/(?:abc)/))
<!-- // ["abc", index: 0, input: "abcabc ###"] -->

str = "candy"
console.log(str.match(/^(?:can|candy)$/))
<!-- // ["candy", index: 0, input: "candy"] -->

str = "can"
console.log(str.match(/^(?:can|candy)$/))
<!-- // ["can", index: 0, input: "can"] -->
```

# 方法
## 实例方法
### exec
检索字符串中指定的值。返回找到的值，并确定其位置。
``` javascript
var date = 'Ubuntu 8'
reg = /^[a-z]+\s+\d+$/i
console.log(reg.exec(date))
<!-- // ["Ubuntu 8", index: 0, input: "Ubuntu 8"] -->

reg = /\d+/
console.log(reg.exec(date))
<!-- // ["8", index: 7, input: "Ubuntu 8"] -->

reg = /o/
console.log(reg.exec(date))
<!-- // null -->
```


``` javascript
var text = "mom and dad baby"
var pattern = /mom( and dad( and baby)?)?/gi

var matches = pattern.exec(text)
console.log(text.match(pattern))
console.log(matches)
<!-- // ["mom and dad", " and dad", undefined, index: 0, input: "mom and dad baby"] -->

var text = "mom and dad and baby"
var pattern = /mom( and dad( and baby)?)?/gi
console.log(text.match(pattern))
<!-- // ["mom and dad and baby"] -->
console.log(text.replace(pattern, '($0) ($1) ($2) ($3)'))
<!-- // ($0) ( and dad and baby) ( and baby) ($3) -->
<!-- var text = "mom and dad and baby"; -->
<!-- // ($0) ( and dad) () ($3) baby -->
console.log(text.replace(pattern, function($0, $1, $2, $3) {
		return $0 + ',' + $1 + ',' + $2 + ',' + $3
	}))
<!-- // mom and dad and baby, and dad and baby, and baby,0 -->
```

这个例子中的模式包含两个捕获组。最内部的捕获组匹配 `"and baby"`，而包含它的捕获组匹配 `"and dad"` 或者 `"and dad and baby"`。当把字符串传入 `exec()` 方法中之后，发现了一个匹配项。因为整个字符串本身与模式匹配，所以返回的数组 `matchs` 的 `index` 属性值为 `0`。数组中的第一项是匹配的整个字符串，第二项包含与第一个捕获组匹配的内容，第三项包含与第二个捕获组匹配的内容。

对于 `exec()` 方法而言，即使在模式中设置了全局标志 `g`，它每次也只会返回一个匹配项。在不设置全局标志的情况下，在同一个字符串上多次调用 `exec()` 将始终返回第一个匹配项的信息。
而在设置全局标志的情况下，每次调用 `exec()` 则都会在字符串中继续查找新匹配项，如下面的例子所示。

``` javascript
var text = "cat, bat, sat, fat"

var pattern1 = /.at/

<!-- // 非全局模式，第一次匹配 -->
var matches = pattern1.exec(text)
<!-- ["cat", index: 0, input: "cat, bat, sat, fat"] -->
console.log(matches.index)
<!-- // 0 -->
console.log(matches[0])
<!-- // cat -->
console.log(pattern1.lastIndex)
<!-- // 0 -->

<!-- // 非全局模式，第二次匹配 -->
matches = pattern1.exec(text)
console.log(matches.index)
<!-- // 0 -->
console.log(matches[0])
<!-- // cat -->
console.log(pattern1.lastIndex)
<!-- // 0 -->

var text = "cat, bat, sat, fat"
var pattern2 = /.at/g
<!-- // 全局模式，第一次匹配 -->
var matches = pattern2.exec(text)
console.log(matches.index)
<!-- // 0 -->
console.log(matches[0])
<!-- // cat -->
console.log(pattern2.lastIndex)
<!-- // 0 -->

<!-- // 全局模式，第二次匹配 -->
matches = pattern2.exec(text)
console.log(matches.index)
<!-- // 5 -->
console.log(matches[0])
<!-- // bat -->
console.log(pattern2.lastIndex)
<!-- // 8 -->

var text = "cat, bat, sat, fat"
var pattern2 = /.at/g
console.log(pattern2.exec(text))
<!-- ["cat", index: 0, input: "cat, bat, sat, fat"] -->
console.log(pattern2.exec(text))
<!-- ["bat", index: 5, input: "cat, bat, sat, fat"] -->
```

这个例子中的第一个模式 `pattern1` 不是全局模式，因此每次调用 `exec()` 返回的都是第一个匹配项 `"cat"`。而第二个模式 `pattern2` 是全局模式，因此每次调用 `exec()` 都会返回字符串中的下一个匹配项，直至搜索到字符串末尾为止。此外，还应该注意模式的 `lastIndex` 属性的变化情况。在全局匹配模式下，`lastIndex` 的值在每次调用 `exec()` 后都会增加，而在非全局模式下则始终保持不变。

> IE 的 JavaScript 实现在 `lastIndex` 属性上存在偏差，即使在非全局模式下，`lastIndex` 属性每次也会变化。

正则表达式的第二个方法是 `test()`，它接受一个字符串参数。在模式与该参数匹配的情况下返回 `true`；否则，返回 `false`。在只想知道目标字符串与某个模式是否匹配，但不需要知道其文本内容的情况下，使用这个方法非常方便。因此，`test()` 方法经常被用在 `if` 语句中，如下面的例子所示。

``` javascript
var text = "000-00-0000"
var pattern = /\d{3}-\d{2}-\d{4}/

if (pattern.test(text)){
    console.log("The pattern was matched.")
}
```

在这个例子中，我们使用正则表达式来测试了一个数字序列。如果输入的文本与模式匹配，则显示一条消息。这种用法经常出现在验证用户输入的情况下，因为我们只想知道输入是不是有效，至于它为什么无效就无关紧要了。

`RegExp` 实例继承的 `toLocaleString()` 和 `toString()` 方法都会返回正则表达式的字面量，与创建正则表达式的方式无关。例如：

``` javascript
var pattern = new RegExp("\\[bc\\]at", "gi")
console.log(pattern.toString())
<!-- // /\[bc\]at/gi -->
console.log(pattern.toLocaleString())
<!-- // /\[bc\]at/gi -->
```

即使上例中的模式是通过调用 `RegExp` 构造函数创建的，但 `toLocaleString()` 和 `toString()` 方法仍然会像它是以字面量形式创建的一样显示其字符串表示。

### test
检索字符串中指定的值。返回 true 或 false。可以修改lastIndex从指定位置开始匹配。
``` javascript
var date = 'Ubuntu 8'
var reg = /^[a-z]+\s+\d+$/i
console.log(reg.test(date))
<!-- // true -->

var date = '1buntu 8'
var reg = /^[a-z]+\s+\d+$/i
console.log(reg.test(date))
<!-- // false -->

var regex = /^((\d)(\d(\d)))\1\2\3\4$/;
var string = "1431431433";
console.log(string.match(regex));
<!-- ["1431431433", "143", "1", "43", "3", index: 0, input: "1431431433"] -->
console.log(regex.test(string));
<!-- // true -->
console.log(RegExp.$1);
<!-- // 143 -->
console.log(RegExp.$2);
<!-- // 1 -->
console.log(RegExp.$3);
<!-- // 43 -->
console.log(RegExp.$4);
<!-- // 3 -->
```

## 字符串方法
### search
可在字符串内检索指定的值，或找到一个正则表达式的匹配，得到第一个位置，没有则返回-1
``` javascript
var str='Hello world!'
console.log(str.search(/l/))
<!-- // 2 -->

str='HLelo world!'
console.log(str.search(/l/i))
<!-- // 1 -->

str='Hello world!'
console.log(str.search(/l/gi))
<!-- // 2 -->

str='Hello world!'
console.log(str.search(/g/i))
<!-- // -1 -->
```

### split
方法用于把一个字符串分割成字符串数组。

``` javascript
stringObject.split(separator,howmany)
```

separator: 字符串或正则表达式
separator: 该参数可指定返回的数组的最大长度

参数是字符串转换数组后间隔的参照物，但是有一些复杂的转换就比较麻烦了，这时候我们可以使用正则表达式对字符串进行筛选后再组成

注释：
1. 如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。
1. String.split() 执行的操作与 Array.join 执行的操作是相反的。

``` javascript
str ="some some             \tsome\t\f"
console.log(str.split(/\s+/i))
<!-- // ["some", "some", "some", ""] -->

console.log(str.split(/\s+/g))
<!-- // ["some", "some", "some", ""] -->

console.log(str.split(/\s/g))
<!-- // ["some", "some", "", "", "", "", "", "", "", "", "", "", "", "", "", "some", "", ""] -->

a = 'a1b2c3d4'
console.log(a.split(/[a-z]+/g))
<!-- // ["", "1", "2", "3", "4"] -->

str =".how.show.show"
console.log(str.split(''))
<!-- // [".", "h", "o", "w", ".", "s", "h", "o", "w", ".", "s", "h", "o", "w"] -->

str =".how.show.show"
console.log(str.split(/\./))
<!-- // ["", "how", "show", "show"] -->

console.log(str.match(/\./g))
<!-- // [".", ".", "."] -->

str =".how.sh.show"
console.log(str.split(/\./, 2))
<!-- // ["", "how"] -->
console.log(str.split(/\./, 3))
<!-- ["", "how", "sh"] -->
```

### match
方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。

``` javascript
stringObject.match(searchvalue)
stringObject.match(regexp)
```

``` javascript
检索字母l：
index位数
input字符串
length长度
var str='Hello world!'
console.log(str.match('l'))
<!-- ["l", index: 2, input: "Hello world!"] -->
console.log(str.match(/l/i))
<!-- ["l", index: 2, input: "Hello world!"] -->

正则匹配数字：
var str="1 plus 2 equal 3"
str.match(/\d+/g)
<!-- // ['1','2','3'] -->
length长度

var str="1 plus 2 equal 3"
var reg = /\d+/g
str.match(reg)
<!-- ["1", "2", "3"] -->

var str = "My name is CJ.Hello everyone!"
var re = /[A-Z]/
var arr = str.match(re)
console.log(arr)
<!-- ["M", index: 0, input: "My name is CJ.Hello everyone!"] -->

re = /[A-Z]/g
arr = str.match(re)
console.log(arr)
<!-- ["M", "C", "J", "H"] -->

re = /\b[a-z]*\b/gi
str = "on e two three four"
str.match(re)
<!-- ["on", "", "e", "", "two", "", "three", "", "four", ""] -->
```

### replace
可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配，并将其替换。值对应match所解读的位置

字符     | 描述
---------|----
$n | 匹配第n个匹配正则表达式中的圆括号子表达式文本
$& | 匹配正则表达式的子串
$` | 匹配子串左边的文本
$' | 匹配子串右边的文本
$$ | 匹配美元符号

``` javascript
var date = ' Ubuntu 8 '
var reg = /(^\s+)|(\s+$)/g
<!-- [" ", " "] -->
console.log(date.replace(reg, "($')"))
<!-- (Ubuntu 8 )Ubuntu 8() -->

console.log(date.replace(reg, '($$)'))
<!-- ($)Ubuntu 8($) -->

console.log(date.replace(reg, '($`)'))
<!-- ()Ubuntu 8( Ubuntu 8) -->

console.log(date.replace(reg, '($&)'))
<!-- ( )Ubuntu 8( ) -->

console.log(date.replace(reg, '($0)'))
($0)Ubuntu 8($0)

console.log(date.replace(reg, '($0) ($1) ($2)'))
($0) ( ) ()Ubuntu 8($0) () ( )

var date = ' Ubuntu 8 '
var reg = /(^\s+)|(\s+$)/g
console.log(date.match(reg))
<!-- [" ", " "] -->
console.log(date.replace(reg, function($0, $1, $2){
	console.log('$0' + $0)
	console.log('$1' + $1)
	console.log('$2' + $2)
	return ','
}))
<!-- $0  -->
<!-- $1  -->
<!-- $2undefined -->
<!-- $0  -->
<!-- $1undefined -->
<!-- $2  -->
<!-- ,Ubuntu 8, -->

str ="z d l"
console.log(str.replace('z', 'f'))
<!-- // f d l -->
console.log(str.match(/(\w)\s(\w)\s(\w)/))
<!-- // ["z d l", "z", "d", "l", index: 0, input: "z d l"] -->
console.log(str.replace(/(\w)\s(\w)\s(\w)/, '$0 $3 $2 $1'))
<!-- // $0 l d z -->
console.log(str.replace(/(\w)\s(\w)\s(\w)/, function($0, $1, $2, $3) {
	return $0 + ',' + $1 + ',' + $2 + ',' + $3
}))
<!-- // z d l,z,d,l -->
<!-- console.log(str.replace(/(\w)\s(\w)\s(\w)/, function($0, $1, $2, $3 ,$& ,$` ,$' ,$$) {
	return $0 + ',' + $1 + ',' + $2 + ',' + $3 + ',' + $& + ',' + $` + ',' + $' + ',' + $$
})); -->

let str = '他今年22岁，她今年20岁，他的爸爸今年45岁，她的爸爸今年44岁，一共有4人'
let reg = /(\d+)岁/g
console.log(str.match(reg))
<!-- ["22岁", "20岁", "45岁", "44岁"] -->
console.log(str.replace(reg, function($0, $1) {
	console.log($0 + ',' + $1)
	let gyear = (new Date()).getYear() - parseInt($0) + 1
	return $0 + '(' + gyear + '年出生)'
}))
<!-- 他今年22岁(96年出生)，她今年20岁(98年出生)，他的爸爸今年45岁(73年出生)，她的爸爸今年44岁(74年出生)，一共有4人 -->

function test($1){   
	return '<font color="red">' + $1 + '</font>'  
}
var s=prompt('请输入在查找的字符','人')
var reg=new RegExp('('+s+')','g')
var str='中华人民共和国，中华人民共和国'
var newstr=str.replace(reg,test)
document.write(newstr + '<br>')
```

``` javascript
str ='some some             \tsome\t\f'
res = /\s+/
console.log(str.match(res))
<!-- // [" ", index: 4, input: "some some             	some	"] -->
console.log(str.replace(res,"#"))
<!-- // some#some             	some	 -->
res = /\s+/g
console.log(str.match(res))
<!-- // [" ", "             	", "	"] -->
console.log(str.replace(res,"@"))
<!-- // some@some@some@ -->
```

# 属性
每个实例都具有下列属性，通过这些属性可以取得有关模式的各种信息。

## 实例属性
1. `global`：布尔值，表示是否设置了 `g` 标志。
1. `ignoreCase`：布尔值，表示是否设置了 `i` 标志。
1. `lastIndex`：整数，表示开始搜索下一个匹配项的字符位置，从0算起。
1. `multiline`：布尔值，表示是否设置了 `m` 标志。
1. `source`：正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回。

``` javascript
var pattern1 = /\[bc\]at/i
console.log(pattern1.global)
<!-- // false -->
console.log(pattern1.ignoreCase)
<!-- // true -->
console.log(pattern1.multiline)
<!-- // false -->
console.log(pattern1.lastIndex)
<!-- // 0 -->
console.log(pattern1.source)
<!-- // "\[bc\]at" -->

var pattern2 = new RegExp("\\[bc\\]at", "i")
console.log(pattern2.global)
<!-- // false -->
console.log(pattern2.ignoreCase)
<!-- // true -->
console.log(pattern2.multiline)
<!-- // false -->
console.log(pattern2.lastIndex)
<!-- // 0 -->
console.log(pattern2.source)
<!-- // "\[bc\]at" -->
```

### source
正则表达式文本
``` javascript
var reg = /[a-z]/i
reg.source
<!-- // "[a-z]" -->
```

### global
只读布尔值，是否有修饰符g
``` javascript
var reg = /[a-z]/i
reg.global
<!-- // false -->
```

### ignoreCase
只读布尔值，是否有修饰符i
``` javascript
var reg = /[a-z]/i
reg.ignoreCase
<!-- // true -->
```

### multiline
只读布尔值，是否有修饰符m
``` javascript
var reg = /[a-z]/i
reg.multiline
<!-- // false -->
```

### lastIndex
下一次检索开始的位置，用于exec() 和 test()
``` javascript
var text = "cat, bat, sat, fat"
var pattern1 = /.at/g
var matches = pattern1.exec(text)
<!-- ["cat", index: 0, input: "cat, bat, sat, fat"] -->
console.log(pattern1.lastIndex)
<!-- // 3 -->

var text = "cat, bat, sat, fat"
var pattern1 = /.at/g
var matches = pattern1.test(text)
console.log(pattern1.lastIndex)
<!-- // 3 -->
```

## 构造函数属性

`RegExp` 构造函数包含一些属性（这些属性在其他语言中被看成是静态属性）。这些属性适用于作用域中的所有正则表达式，并且基于所执行的最近一次正则表达式操作而变化。关于这些属性的另一个独特之处，就是可以通过两种方式访问它们。换句话说，这些属性分别有一个长属性名和一个短属性名（Opera是例外，它不支持短属性名）。下表列出了RegExp构造函数的属性。

|长属性名 | 短属性名 | 说明 |
| --- | --- | --- |
| input | $_ | 最近一次要匹配的字符串。Opera未实现此属性。 |
| lastMatch | $& | 最近一次的匹配项。Opera未实现此属性。 |
| lastParen | $+ | 最近一次匹配的捕获组。Opera未实现此属性。 |
| leftContext | $` | input字符串中lastMatch之前的文本。 |
| multiline | $* | 布尔值，表示是否所有表达式都使用多行模式。IE和Opera未实现此属性。 |
| rightContext | $' | Input字符串中lastMatch之后的文本。 |

使用这些属性可以从 `exec()` 或 `test()` 执行的操作中提取出更具体的信息。请看下面的例子。

``` javascript
var text = "this has been a short summer"
var pattern = /(.)hort/g

/*
 * 注意：Internet Explorer 不支持 multiline 属性
 * Opera 不支持 input、lastMatch、lastParen 和 multiline 属性
 */
if (pattern.test(text)){
    console.log(RegExp.input)
    <!-- // this has been a short summer -->
    console.log(RegExp.leftContext)
    <!-- // this has been a -->
    console.log(RegExp.rightContext)
    <!-- // summer -->
    console.log(RegExp.lastMatch)
    <!-- // short -->
    console.log(RegExp.lastParen)
    <!-- // s -->
    console.log(RegExp.multiline)
    <!-- // false -->
}
```

如前所述，例子使用的长属性名都可以用相应的短属性名来代替。只不过，由于这些短属性名大都不是有效的 JavaScript 标识符，因此必须通过方括号语法来访问它们，如下所示。

``` javascript
var text = "this has been a short summer"
var pattern = /(.)hort/g

/*
 * 注意：Internet Explorer 不支持 multiline 属性
 * Opera 不支持 input、lastMatch、lastParen 和 multiline 属性
 */
if (pattern.test(text)){
    console.log(RegExp.$_)
    <!-- // this has been a short summer -->
    console.log(RegExp["$`"])
    <!-- // this has been a -->
    console.log(RegExp["$'"])
    <!-- // summer -->
    console.log(RegExp["$&"])
    <!-- // short -->
    console.log(RegExp["$+"])
    <!-- // s -->
    console.log(RegExp["$*"])
    <!-- // false -->
}
```

除了上面介绍的几个属性之外，还有多达9个用于存储捕获组的构造函数属性。访问这些属性的语法是 `RegExp.$1`、`RegExp.$2`...`RegExp.$9`，分别用于存储第一、第二...第九个匹配的捕获组。在调用 `exec()` 或 `test()` 方法时，这些属性会被自动填充。然后，我们就可以像下面这样来使用它们。

``` javascript
var text = "this has been a short summer"
var pattern = /(..)or(.)/g

if (pattern.test(text)){
    console.log(RegExp.$1)
    <!-- // sh -->
    console.log(RegExp.$2)
    <!-- // t -->
}
```

这里创建了一个包含两个捕获组的模式，并用该模式测试了一个字符串。即使 `test()` 方法只返回一个布尔值，但 `RegExp` 构造函数的属性 `$1` 和 `$2` 也会被匹配相应捕获组的字符串自动填充。

## 模式的局限性
尽管 JavaScript 中的正则表达式功能还是比较完备的，但仍然缺少某些语言（特别是 Perl）所支持的高级正则表达式特性。下面列出了 JavaScript 正则表达式所不支持的特性。

- 匹配字符串开始和结尾的\A和\Z锚
- 向后查找（lookbehind）
- 并集和交集类
- 原子组（atomic grouping）
- Unicode支持（单个字符除外，如\uFFFF）
- 命名的捕获组
- s（single，单行）和x（free-spacing，无间隔）匹配模式
- 条件匹配
- 正则表达式注释

即使存在这些限制，JavaScript 正则表达式仍然是非常强大的，能够帮我们完成绝大多数模式匹配任务。

# 运行原理
## NFA引擎匹配原理

## 环视(Lookaround)
环视只进行子表达式的匹配，不占有字符，匹配到的内容不保存到最终的匹配结果，是零宽度的。环视匹配的最终结果就是一个位置。

表达式     | 描述
---------|----
(?<=Expression) | 逆序肯定环视，表示所在位置左侧能够匹配Expression
(?<!Expression) | 逆序否定环视，表示所在位置左侧不能匹配Expression

``` javascript
var str = 'aa<p>one</ps>bb<div>two</div>cc'
console.log(str.replace(/<(?!\/?p\b)([^>]+)>/g, function($0, $1) {
		return '(' + $1 + ')'
	}))
<!-- // aa<p>one(/ps)bb(div)two(/div)cc -->
```



## 回溯法原理
正则表达式匹配字符串的这种方式，有个学名，叫回溯法也称试探法

``` javascript
没有回溯
str = "abbbc"
console.log(str.match(/ab{1,3}c/))
<!-- // ["abbbc", index: 0, input: "abbc"] -->

有回溯
str = "abbc"
console.log(str.match(/ab{1,3}c/))
<!-- // ["abbc", index: 0, input: "abbc"] -->
```

``` javascript
分支结构
str = "abbbc"
console.log(str.match(/ab{1,3}c/))
<!-- // ["abbbc", index: 0, input: "abbc"] -->

有回溯
str = "abbc"
console.log(str.match(/ab{1,3}c/))
<!-- // ["abbc", index: 0, input: "abbc"] -->
```

## 万能的‘正则’
比如匹配这样的字符串:1010010001...。 虽然很有规律，但是只靠正则就是无能为力。
要认识到正则的局限，不要去研究根本无法完成的任务。同时，也不能走入另一个极端：无所不用正则。能用字符串 API 解决的简单问题，就不该正则出马。

### 日期选取
``` javascript
var string = "2017-07-01";
var regex = /^(\d{4})-(\d{2})-(\d{2})/;
console.log(string.match(regex));
// => ["2017-07-01", "2017", "07", "01", index: 0, input: "2017-07-01"]

var string = "2017-07-01";
var result = string.split("-");
console.log(result);
// => ["2017", "07", "01"]
```

### 字符串判断

``` javascript
var string = "?id=xx&act=search";
console.log(string.search(/\?/));
// => 0

var string = "?id=xx&act=search";
console.log(string.indexOf("?"));
// => 0
```

### 获取子串

``` javascript
var string = "JavaScript";
console.log(string.match(/.{4}(.+)/)[1]);
// => Script

var string = "JavaScript";
console.log(string.substring(4));
// => Script
```

### 提取数据
提取出年、月、日，可以这么做:

``` javascript
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
console.log(string.match(regex));
<!-- // => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"] -->

var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
console.log(regex.exec(string));
<!-- // => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"] -->

var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
regex.test(string);
<!-- // 正则操作即可，例如 //regex.exec(string); //string.match(regex); -->
console.log(RegExp.$1);
<!-- // "2017" -->
console.log(RegExp.$2);
<!-- // "06" -->
console.log(RegExp.$3);
<!-- // "12" -->
```

### 替换
想把 yyyy-mm-dd 格式，替换成 mm/dd/yyyy 怎么做

``` javascript
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, "$2/$3/$1");
console.log(result);
<!-- // => "06/12/2017" -->

var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
<!-- // => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"] -->
var result = string.replace(regex, function () {
return RegExp.$2 + "/" + RegExp.$3 + "/" + RegExp.$1;
});
console.log(result);
// => "06/12/2017"

var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, function (match, year, month, day) {
  return month + "/" + day + "/" + year;
});
console.log(result);
// => "06/12/2017"
```

# 案例分析

## 正则表达式

``` javascript
<!-- // 挑战一：数字 -->
var pattern1 = null
<!-- // 补全该正则表达式 -->
console.log(pattern1.test('123'))
<!-- // true -->
console.log(pattern1.test('abc'))
<!-- // false -->
```

``` javascript
<!-- // 挑战二：3位的数字 -->
var pattern2 = null
<!-- // 补全该正则表达式 -->
console.log(pattern2.test('123'))
<!-- // true -->
console.log(pattern2.test('1234'))
<!-- // false -->
```

``` javascript
<!-- // 挑战三：至少3位的数字 -->
var pattern3 = null
<!-- // 补全该正则表达式 -->
console.log(pattern3.test('1234'))
<!-- // true -->
console.log(pattern3.test('12'))
<!-- // false -->
```

``` javascript
<!-- // 挑战四：3-5位的数字 -->
var pattern4 = null
<!-- // 补全该正则表达式 -->
console.log(pattern4.test('1234'))
<!-- // true -->
console.log(pattern4.test('1'))
<!-- // false -->
```

``` javascript
<!-- // 挑战五：由26个英文字母组成的字符串 -->
var pattern5 = null
<!-- // 补全该正则表达式 -->
console.log(pattern5.test('abc'))
<!-- // true -->
console.log(pattern5.test('1abc'))
<!-- // false -->
```

``` javascript
<!-- // 挑战六：由数字和26个英文字母组成的字符串 -->
var pattern6 = null
<!-- // 补全该正则表达式 -->
console.log(pattern6.test('1abc'))
<!-- // true -->
console.log(pattern6.test('_abc'))
<!-- // false -->
```

``` javascript
<!-- // 挑战七：日期格式：年-月-日 -->
var pattern7 = null
<!-- // 补全该正则表达式 -->
console.log(pattern7.test('2016-08-20'))
<!-- // true -->
console.log(pattern7.test('2016/08/20'))
<!-- // false -->
```

``` javascript
<!-- // 挑战八：时间格式：小时:分钟, 24小时制 -->
var pattern8 = null
<!-- // 补全该正则表达式 -->
console.log(pattern8.test('13:45'))
<!-- // true -->
console.log(pattern8.test('13点45'))
<!-- // false -->
```

``` javascript
<!-- // 挑战九：中国大陆身份证号，15位或18位 -->
var pattern9 = null
<!-- // 补全该正则表达式 -->
console.log(pattern9.test('4223222199901090033'))
<!-- // true -->
console.log(pattern9.test('asdfasdfasfasdf1234'))
<!-- // false -->
```

## 判断
### 匹配整数
注：就是像-3,-2,-1,0,1,2,3,10等这样的数。
-: 0-1
[1-9]: 0-
[0-9]: 1

``` javascript
var reg = /^-?[1-9]*\d$/

var date = 'Ubuntu 8'
console.log(reg.test(date))
<!-- false -->
date = '213'
console.log(reg.test(date))
<!-- true -->
date = '-213'
console.log(reg.test(date))
<!-- true -->
date = '0'
console.log(reg.test(date))
<!-- true -->
date = '01'
console.log(reg.test(date))
<!-- false -->
date = 0
console.log(reg.test(date))
<!-- true -->
```

### 匹配负浮点数
注：必须负数，第一位1-9，点后面位随机数字，第一位为0，点后面要有个不为零的数字。
``` javascript
var reg = /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/

var date = '-0.00000'
console.log(reg.test(date))
date = '-0.1231231'
console.log(reg.test(date))
date = '-1231213.1231231'
console.log(reg.test(date))
date = '-.1231231'
console.log(reg.test(date))
date = '-1.0001'
console.log(reg.test(date))
date = '-1.000'
console.log(reg.test(date))
date = '-1'
console.log(reg.test(date))
```

### 匹配浮点数
注：为了表示更大范围的数据，数学上通常采用科学计数法，把数据表示成一个小数乘以一个以10为底的指数。
``` javascript
var reg = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/

var date = '0'
console.log(reg.test(date))
<!-- true -->
date = '0.0'
console.log(reg.test(date))
<!-- true -->
```

``` javascript
var reg = /\<(.*?)\>/

var date = '<ps>jdfjdsl</ps>'
console.log(date.replace(reg, function($0, $1) {
	return <span>$1</span>
}))
```

### 匹配非负浮点数
注：正浮点数 + 0
(0.0是浮点数吗？浮点数是什么)
``` javascript
var reg = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/

var date = '0'
console.log(reg.test(date))
<!-- true -->
date = '0.0'
console.log(reg.test(date))
<!-- true -->
date = '.0'
console.log(reg.test(date))
<!-- true -->
```

### 匹配非正浮点数
注：负浮点数 + 0
``` javascript
var reg = /^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$/

var date = '0'
console.log(reg.test(date))
<!-- true -->
date = '0.0'
console.log(reg.test(date))
<!-- true -->
date = '.0'
console.log(reg.test(date))
<!-- true -->
```

### 匹配HTML元素
```
var reg = /\<(.*?)\>/g

var date = '<ps>jdfjdsl</ps>dsfds'
console.log(date.replace(reg, function ($0, $1) {
	return '(' + $1 + ')'
}))
<!-- (ps)jdfjdsl(/ps)dsfds -->
```

### 验证密码问题
密码长度 6-12 位，由数字、小写字符和大写字母组成，但必须至少包括 2 种字符。
```
var reg = /^[0-9A-Za-z]{6,12}$/

判断是否包含有某一种字符
/(?=.*[0-9])^[0-9A-Za-z]{6,12}$/

同时包含具体两种字符
/(?=.*[0-9])(?=.*[a-z])^[0-9A-Za-z]{6,12}$/


同时包含数字和小写字母
同时包含数字和大写字母
同时包含小写字母和大写字母
同时包含数字、小写字母和大写字母

var regex = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A- Z]))^[0-9A-Za-z]{6,12}$/
console.log(regex.test("1234567") ) // false 全是数字
console.log(regex.test("abcdef") ) // false 全是小写字母
console.log(regex.test("ABCDEFGH") ) // false 全是大写字母
console.log(regex.test("ab23C") ) // false 不足6位
console.log(regex.test("ABCDEF234") ) // true 大写字母和数字
console.log(regex.test("abcdEF234") ) // true 三者都有

“至少包含两种字符”的意思就是说，不能全部都是数字，也不能全部都是小写字母，也不能全部都是大写字母。
var regex = /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/
console.log(regex.test("1234567") ) // false 全是数字
console.log(regex.test("abcdef") ) // false 全是小写字母
console.log(regex.test("ABCDEFGH") ) // false 全是大写字母
console.log(regex.test("ab23C") ) // false 不足6位
console.log(regex.test("ABCDEF234") ) // true 大写字母和数字
console.log(regex.test("abcdEF234") ) // true 三者都有
```

### 判断PDF后缀
``` javascript
var reg = /^.+\.pdf$/i

var date = 'Ubuntu.pdf'
console.log(reg.test(date))
<!-- true -->
```

### 匹配中文字符
``` javascript
var reg = /^[\u4e00-\u9fa5]+$/

var date = '京东方s'
console.log(reg.test(date))
<!-- false -->
var date = '京东方'
console.log(reg.test(date))
<!-- true -->
var date = ''
console.log(reg.test(date))
<!-- false -->
```

### 两位小数
``` javascript
<!-- var reg = /^((?:-?0)|(?:-?[1-9]\d*))(?:\.\d{1,2})?$/ -->
var reg = /^-?([1-9]\d*\.\d{2}|0\.[1-9]\d)$/
var date = '8.12'
console.log(reg.test(date))
<!-- true -->
date = '0.12'
console.log(reg.test(date))
<!-- true -->
date = '-100.12'
console.log(reg.test(date))
<!-- true -->
date = '00.120'
console.log(reg.test(date))
<!-- false -->
date = '1.00'
console.log(reg.test(date))
<!-- true -->
date = '-12.0'
console.log(reg.test(date))
<!-- false -->
```

### 至少3位的数字
``` javascript
var reg = /^\d{3,}$/
var date = '888'
console.log(reg.test(date))
<!-- // true -->

date = '88'
console.log(reg.test(date))
<!-- // false -->
```

### 中国邮政编码
注：中国邮政编码为6位数字，前两位数字表示省（直辖市，自治区）；前三位数字表示邮区；前四位数字表示县（市）；最后两位数字表示投递局（所）。
``` javascript
var reg = /^[1-9]\d{5}$/
var date = '223805'
console.log(reg.test(date))
<!-- // true -->
```

### 验证帐号是否合法
注：字母、数字、下划线组成，字母开头，4-16位。
``` javascript
var reg = /^[a-zA-z]\w{3,15}$/
var date = 'Ubuntu8'
console.log(reg.test(date))
<!-- // true -->
```

## 匹配

## 常用正则表达式
### 更复杂的用法,使用子匹配 
```
<!-- // exec返回的数组第1到n元素中包含的是匹配中出现的任意一个子匹配   -->
re=/^[a-z]+\s+(\d+)$/i
<!-- // 用()来创建子匹配   -->

arr =re.exec(date)
console.log(arr[0])
<!-- // 整个date,也就是正则表达式的完整匹配   -->

console.log(arr[1])
<!-- // 8,第一个子匹配,事实也可以这样取出主版本号   -->

console.log(arr.length)
<!-- // 2   -->

date = "Ubuntu 8.10"
<!-- // 取出主版本号和次版本号   -->

re = /^[a-z]+\s+(\d+)\.(\d+)$/i
<!-- // .是正则表达式元字符之一,若要用它的字面意义须转义   -->

arr = re.exec(date)
console.log(arr[0])
<!-- // 完整的date   -->

console.log(arr[1])
<!-- // 8   -->

console.log(arr[2])
<!-- // 10   -->
```

### 匹配空行
注：匹配空白字符
``` javascript
<!-- var 空格 = /[ ]+/g -->

var reg = /[\s| ]+/g

var date = ' \r Ubuntu 8 \n '
console.log(date.replace(reg, ','))
<!-- ,Ubuntu,8, -->
```

### 匹配首尾空格
注：匹配首空格和尾空格，空格有一个以上，肯能同时存在
``` javascript
var reg = /(^\s+)|(\s+$)/g

var date = ' Ubuntu 8 '
console.log(date.match(reg))
<!-- ["", "", undefined, index: 0, input: "Ubuntu 8 "] -->

console.log(date.replace(reg, function($0, $1, $2){
	console.log('$0' + $0 + ',')
	console.log('$1' + $1 + ',')
	console.log('$2' + $2 + ',')
	return ','
}))
console.log(date.replace(reg, ','))
```

### m~n位的数字
``` javascript
var date = '8888'
var reg = /^\d{3,5}$/
console.log(reg.test(date))
<!-- // true -->
```

### 匹配非负整数
注：正确格式为：0 1 9 100
``` javascript
var date = '011'
var reg = /^(0|[1-9][0-9]*)$/
console.log(reg.test(date))
<!-- // false -->
```

### 验证一年的12个月
注：正确格式为："01"～"09"和"1"～"12"
``` javascript
var date = '01'
var reg = /^(0?[1-9]|1[0-2])$/
console.log(reg.test(date))
```

### IPV4 地址
注：提取ip地址时有用
``` javascript
var date = '192.168.0.1'
var reg = /^([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}$/
console.log(reg.test(date))
```

### Email
注：
``` javascript
Email : /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/
isEmail1 : /^\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w+$/
isEmail2 : /^.*@[^_]*$/
var date = 'luuman@qq.com'
var reg = /^\w+@\w+(\.(com|cn|net|org|edu)){1,2}$/g
console.log(reg.test(date))

var date = 'luuman@qq.com'
var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
console.log(reg.test(date))
```

### 验证身份证号
[第二代身份证号码编排规则](https://jingyan.baidu.com/article/72ee561abd962fe16038df48.html "")
注：15位或18位数字（第二代身份证最后一位可能为X）

``` javascript
var reg = /^(\d{15}|\d{17}[\dxX])$/
var date = '32082519640706573X'
console.log(reg.test(date))
<!-- // true -->
```

### Phone手机号码
注：只有13、15和18开头的11位手机号码
``` javascript
var date = '18961856168'
var reg = /^((13|18)(\d{9}))$|^(14[57]\d{8})$|^(17[07]\d{8})$|(^15[0-35-9]\d{8}$)/
<!-- // var reg = /^[1][358]\d{9}$/; -->

console.log(reg.test(date))
<!-- // true -->
```

### 网址
注：https、http
``` javascript
var date = 'https://zhidao.baidu.com/'
var reg = /^(http|https):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
var reg = /^http:// ([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$/
console.log(reg.test(date))
```
### 顶级域名

``` javascript
var date = 'http://zhidao.baidu.com/jdslfjdsf'
var reg = /https?:\/\/[^\/]+\/?/
console.log(date.match(reg))
```

### 驼峰化
``` javascript
function camelize (str) {
  return str.replace(/[-_\s]+(.)?/g, function ($0, $1) {
  	console.log($0)
    return $1 ? $1.toUpperCase() : ''
  })
}
console.log(camelize('-moz-transform'))
<!-- MozTransform -->

console.log(camelize('font-size'))
<!-- fontSize -->

console.log(camelize('font-'))
<!-- font -->
```

### 中划线化
``` javascript
function dasherize (str) {
  return str.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}
console.log( dasherize('MozTransform') );
<!-- // => "-moz-transform" -->

console.log( dasherize('Moz_Transform') );
<!-- // => "-moz-transform" -->

console.log( dasherize('Moz Transform') );
<!-- // => "-moz-transform" -->
```

<!-- ### HTML 转义和反转义

// 将HTML特殊字符转换成等值的实体
function escapeHTML (str) {
	var escapeChars = {
	  '<' : 'lt',
	  '>' : 'gt',
	  '"' : 'quot',
		'&' : 'amp',
	  '\'' : '#39'
	}
  return str.replace(new RegExp('[' + Object.keys(escapeChars).join('') +']', 'g'), function (match) {
	  return '&' + escapeChars[match] + ';'
  })
}
console.log( escapeHTML('<div>Blah blah blah</div>') )
// => "&lt;div&gt;Blah blah blah&lt;/div&gt"

function unescapeHTML (str) {
      var htmlEntities = {
        nbsp: ' ',
        lt: '<',
        gt: '>',
        quot: '"',
        amp: '&',
        apos: '\''
      };
      return str.replace(/\&([^;]+);/g, function (match, key) {
          if (key in htmlEntities) {
              return htmlEntities[key];
          }
          return match;
      });
  }
  console.log( unescapeHTML('&lt;div&gt;Blah blah blah&lt;/div&gt;') );
  // => "<div>Blah blah blah</div>"

--> 

### 匹配成对标签
``` javascript
var regex = /<([^>]+)>[\d\D]*<\/\1>/;
var string1 = "<title>regular expression</title>";
var string2 = "<p>laoyao bye bye</p>";
var string3 = "<title>wrong!</p>";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // false
```

## 千位分隔符(js 实现)

### 方法一
匹配内容进行替换
``` javascript
function thousandBitSeparator(num) {
  return num && Number(num)
    .toString()
    .replace(/(\d)(?=(\d{3})+(\.|$))/g, function($0, $1) {
      return $1 + ","
    })
}

console.log(thousandBitSeparator(-1234567.901))
<!-- // -1,234,567.901 -->
console.log(thousandBitSeparator(-1234567))
<!-- // -1,234,567 -->
console.log(thousandBitSeparator(0))
<!-- // 0 -->
console.log(thousandBitSeparator(100000000000))
<!-- // 100,000,000,000 -->
console.log(thousandBitSeparator(.111))
<!-- 0.111 -->
console.log(thousandBitSeparator('...'))
<!-- NaN -->
```

### 方法二

通过匹配位置来判断
``` javascript
<!-- 弄出最后一个逗号 -->
/(?=\d{3}$)/g
// => 12345,678

<!-- 弄出所有的逗号 -->
/(?=(\d{3})+$)/g
// => 12,345,678
// => ,123,456,789

var string = '12345678 123456789',
regex = /(?!\b)(?=(\d{3})+\b)/g
var result = string.replace(regex, ',')
console.log(result)
// => 12,345,678 123,456,789

条件：两位小数的数字 => 
function format (num) {
  return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ',').replace(/^/, '$$ ')
}
console.log(format(1888))
// => $ 1,888.00
```

## 支持2-10位的汉字或数字的正则表达式（还包含汉字和数字混合哦）
数字 0-9
汉子 \u4e00-\u9fa5：这两个unicode值正好是Unicode表中的汉字的头和尾。
``` javascript
var regex = /^([0-9\u4e00-\u9fa5]{2,10})$/;
var string1 = "210位的汉字";
var string2 = "210";
var string3 = "210位的汉字eff";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // false
```

# 拓展

- [正则基础之——NFA引擎匹配原理](http://blog.csdn.net/lxcnn/article/details/4304651 "讲解不错的正则匹配原理，匹配原则")
- [正则基础之——环视](http://blog.csdn.net/lxcnn/article/details/4304754 "")
- [javascript正则表达式](http://www.cnblogs.com/rubylouvre/archive/2010/03/09/1681222.html "")
- [什么是正则表达式?](https://github.com/zeeshanu/learn-regex/blob/master/README-cn.md "")
- [正则表达式的图形工具](https://regexper.com/ "")
- [精通JS正则表达式](http:// www.cnblogs.com/aaronjs/archive/2012/06/30/2570970.html "newraina")
- [JAVASCRIPT学习笔记之正则表达式](https://smohan.im/blog/3g3lh0 "")
- [正则表达式30分钟入门教程](http://deerchao.net/tutorials/regex/regex-1.htm "")
- [廖雪峰官网学习](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499503920bb7b42ff6627420da2ceae4babf6c4f2000 "")
- [可视化图片](https://jex.im/regulex/#!embed=false&flags=&re=%3C(%3F!%5C%2F%3Fp%5Cb)(%5B%5E%3E%5D%2B)%3E "")

