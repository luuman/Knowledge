# applescript

```applescript
# 朗读下面字符串，并使用Fred声音
say "Let's study applescript" using "Fred"
beep 2
```

```applescript
# 调用程序 Finder
tell application "Finder"
  # 清空内容
  empty the trash
# 结束调用
end tell
```
> 执行终端scpt文件

```cmd
osascript PATH-TO-SCRIPT.scpt
```
# 语法



## 基本语法

### 弹窗

```applescript
set stringToBeDispalyed to "hi there"
display dialog "stringToBeDisplayed"
display dialog stringToBeDispalyed
```

### 变量声明

AppleScript也是用变量
```applescript
# let x = 25
set x to 25
```

> 注意

1. 变量名是一个词组成，中间不能有空格
1. 不能使用AppleScript中的保留字来作为变量名
1. 不能以数字开头，但是数字可以出现在变量名中间
1. 下划线也是可以的

### 数据类型
一般常用的有 number、string、list、record，也就是数字类型、字符串类型、列表类型、字典类型。

```applescript
字符串、数字、数组、对象、布尔值
set String to "12电风扇大"
set Number to 12
set Bellon to false
set Array to {1,2,3,"hahah",9}
set Object to {neal:"yang"}
```

### 运算符与赋值
```applescript
# set <変数名> to <値>
set width to 8
set height to 9
# set <変数名> to <値> * <値>
set area to width * height
```

属于叫做运算符，常用的运算符有：+、-、*、/、^、 对的，加减乘除乘方

### 注释
```applescript
-- 注释一行
# 注释一行
(xxx) 注释多行
```
## 语句
### 条件语句

```applescript
if <条件式> then
  <命令>
else if <条件式> then
  <命令>
else
  <命令>
end if
```

```applescript
set ageEntered to 62
set myAge to 24
if ageEntered is myAge then
	display dialog "You are as old as I am "
	beep
else if ageEntered is 65 then
	say "this sentence is spoken anyway"
else
	display dialog "You are as "
	beep
end if


set num to 123
if num = 123 then
  display dialog "等于 123"
else if strToNum &gt; 456 then
  display dialog "大于 456"
else
  display dialog "不等于 123 也不大于 456"
end if

# contains 方法来进行字符串的比较判断
set domainName to "www.exchen.net"
if domainName contains "exchen" then
  display dialog "包含 exchen"
else
  display dialog "不包含 exchen"
end if
```

## 循环
### 重复（循环）
```js
set num to 10
repeat 100 times
  set num to num + 1
end repeat
get num
```

### for
```js
set num to 5
repeat with counter from 0 to num by 1
  display dialog counter
end repeat
```

### while
```js
set num to 0
repeat until num ≥ 10
  display dialog num
  set num to num + 3
end repeat
```

```applescript
# 列出所选文件夹中所有的文件夹名称
set folderSelected to choose folder "Select a folder"
tell application "Finder"
  set listOfFolders to every folder of folderSelected
end tell

set theList to {}
repeat with aFolder in listOfFolders
  set temp to the name of aFolder
  set theList to theList & temp
end repeat
```

## 函数

### 基础
```applescript
# 定义函数
on test(lala)
  display dialog lala
# 函数结束
end tst

test("haha")
```

### 返回值

```applescript
on largest(a, b)
  if a > b then
    return a
  end if
  return b
end largest
set theLargetst to largest(4, 6)
```

## 对话框
### 弹出对话框
> 默认

```applescript
display dialog "这是内容" with title "这是标题"
```

> 按钮个数最多三个

```applescript
display dialog "这是内容" with title "这是标题" buttons {"No", "Yes"}
```

> 默认按钮

```applescript
display dialog "这是内容" with title "这是标题" buttons {"No", "Yes"} default button "Yes"
```

> 按钮ICON

```applescript
display dialog "这是内容" with title "这是标题" buttons {"No", "Yes"} default button "Yes" with icon note
```

```applescript
display dialog "这是内容" with title "这是标题" buttons {"No", "Yes"} default button "Yes"
if button returned of result = "Yes" then
  get "YES"
else if button returned of result = "No" then
  get "NO"
end if
```

### 弹出输入框

```applescript
display dialog "请输入内容：" default answer ""
```

```applescript
display dialog "请输入内容：" default answer ""
if text returned of result = "exchen" then
	get "exchen.net"
end if
```

## 数据操作
### reverse 排序
```applescript
set reversedList to reverse of {2, 3, 4, 6, 7}
# {7, 6, 4, 3, 2}
```

### 拼接

```applescript
set nameOfActress to "Neal is "
set actressRating to " very pretty"
set resultingString to nameOfActress & actressRating
display dialog resultingString
```

### 查看字符串长度

```applescript
set theLength to the length of "Neal"
```

the length of 用来获取字符串的长度。这里顺便说一句，字符串中特殊字符是需要转义的。

### 类型转换

```applescript
set strToNumber to "16" as number
set numToStr to 12 as string
```

### list 弱类型语言中的数组
```applescript
set exampleList to {1,2,3,"hahah",9}
```

### 拼接

```applescript
set addToBegin to {"winter"}
set addToEnd to {"summer", "autumn"}
set currentList to {"spring"}
# 合并
set modifiedList to addToBegin & currentList & addToEnd
```

### 取值
你可以使用元素的序号来取代元素，最左边的index是1，其实是2，以此类推。可以使用这种方式来从列表中取值，也可以修改类表中值。
```applescript
set testList to {"Neal", "haha"}
set item 2 of testList to "yang"
# 赋值
get testList
```

```applescript
set testList to {"Neal", "haha"}
set the second item of testList to "yang1"
set the 1nd item of testList to "yang2"
get testList
```

简直和英语一毛一样有么有。但是注意上面这种一字母拼写的序 数词最多只能使用到“tenth”，
之后，就要使用“item 11”的形式。或者写成 “11th item”的形式。
除了使用序数词，还可以使用“last item”指代列表中最后项目。

所以，当你只操作列表中最后一个值的时候，你不必知道列表具体有多少项目。
AppleScript允许你以相反的方向来指代元素，也就是可以从右向左数。这需要你使用负数，-1 指代最后一个元素，
-2指代倒数第2个元素。例[11]可以获得和例[10]一样的结果

```applescript
set myList to {"neal", "haha"}
# 获取最后一位
set valueOfLastItem to item -1 of myList
```
下面展示下，如何一次去多个值。

```applescript
set myList to {"a", "b", "c", "d", "e", "f"}
set shortList to items 2 through 5 of myList
# 是的，上面就是运行结果为： {"b", "c", "d", "e"}
```

### 获取数组长度

```applescript
set theListLength to the length of {"ds", 1, 2, 3}
set theListLength to the count of {"ds", 1, 2, 3}
```
the length of 和 the count of 效果是一样的。就是获取列表的长度

### 随机取值
```applescript
# 随机返回列表中的任一元素
set x to some item of {1, 2, 3, 4, 5, 7, 7, 6, 5}
```

### 类型转换
```applescript
set myList to {"a"}
set myString to "b"
--set result to myList & (myString as list)
set result to myList & myString
```
感觉可以对于js学习，弱类型语言都可以自动类型转换的。

除了通过类型转换将一个字符串变成一个列表，你还可以创建一个列表，列表的元素是组成字 符串的每一个字母。

set itemized to every character of "Nealyang"

{"N", "e", "a", "l", "y", "a", "n", "g"}

相比于单词，我们还可以把一个句子按照单词分开。这里我们可以使用苹果脚本的去限器( AppleScript’s text item delimiters)实现

首先定义一个字符作为分割文本的标记，以这个标记 分割出来的元素将被包含在列表里。

优秀的脚本编写要求如果苹果脚本文本去限器的值被更改了，一旦完 成任务还要将它改回原来的值

```applescript
set myString to "neal's personal website is www.nealyang.cn"
set oldDelimiters to AppleScript's text item delimiters
set AppleScript's text item delimiters to " "
set myList to every text item of myString
set AppleScript's text item delimiters to oldDelimiters
get myList
{"neal's", "personal", "website", "is", "www.nealyang.cn"}
```

注意这里设置完 AppleScript's text item delimiters 后，分割用 every text item of 不是every character of

空格 " "我们是可以自定义的。类似js中split

### record 对象

```applescript
set stringToBeDisplayed to "Neal is pretty boy"
set tempVar to display dialog stringToBeDisplayed buttons {"So,so", "Don't know", "yes"}
set theButtonPressed to button returned of tempVar
display dialog "You pressed the following button " & theButtonPressed
```

上面的 button returned of 就是取值的语句。
因为dialog按钮按下后会返回如下格式：{"button returned":"xxxx"}

简单的操作如下：
```applescript
set test to {neal:"yang"}
set lala to neal of test
```



### 错误捕获
意外的终止是我们所不希望的。比如，你的脚本需要打开一个文件夹处理其中的文件， 但是这个文件夹已经被删除了，你会希望脚本允许用户选择其它合适的文件夹，而不是意外退出。
```applescript
try
  set x to 1 / 0
on error the error_message number the error_number
  display dialog "Error: " & the error_number & "." & the error_message buttons {"OK"}
end try

# Error: -2701.1.0 不能被零除
```

如果你在“on error”指令后面放上一个变量名，那么错误描述信息将被赋给这个变量。如果你 在变量名前面加上“number”字样，那么错误代码将被赋给变量。

### 路径、文件夹和应用程序
先是硬盘，硬盘下面包含文件夹、应用程序和文件(上图中没有显示出文件和应用程序)。所有这些元素按照一定的层次组织起来。

```applescript
# 选择文件夹
choose folder
# alias "Macintosh HD:Users:luuman:Downloads:Book:"
# 硬盘:文件夹:子文件夹:子文件夹:
```

```applescript
# 打开文件夹
tell application "Finder"
	open folder "Macintosh HD:Users:luuman:Downloads:Book:"
end tell
```

> 注意：

1. 即使选择的文件夹为替身，alias返回的内容为实际文件地址ID
1. 为了避免因为文件被移动或改名造成的脚本运行中断，我们应当让脚本记录文件的ID而不是 “符号链接”的路径

```applescript
set thePath to alias "Macintosh HD:Users:luuman:Downloads:Book:JavaScript高级程序设计（第4版）.pdf"
```







# 系统操作
## 应用操作
### 应用选择
tell application "Google Chrome"
    <コマンド>
end tell

### 启动程序
tell application "Google Chrome"
    activate
end tell

### 退出申请
quit 退出应用程序

tell application "Google Chrome"
    quit
end tell

### 按键输入
tell application "System Events"您可以使用keystroke或key code命令选择系统事件并控制键输入

如果要输入特殊键（例如空格键），key code请使用该命令。

tell application "System Events"
    -- スペースキー入力
    key code 49
end tell

-- コマンドキーを押しながらc（コピー）
keystroke "c" using command down
-- コントロールキー、シフトキーを押しながらスペース
key code 49 using {control down, shift down}

打开 Finder 并打开新选项卡（输入“command + T”）的脚本如下。

tell application "Finder"
    activate
    tell application "System Events"
        keystroke "t" using command down
    end tell
end tell

## Code
### key codes
<svg id="s" viewBox="0 0 800 498"><g fill="#222"><rect x="132.9" y="339.3" width="40.1" height="40.1" rx="2.5" fill="#222"></rect><rect x="186.8" y="339.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="240.6" y="339.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="294.5" y="339.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="348.4" y="339.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="402.3" y="339.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="456.2" y="339.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="510" y="339.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="563.9" y="339.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="617.8" y="339.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="3.8" y="339.4" width="115.3" height="40.1" rx="2.5"></rect><rect x="671.7" y="339.4" width="115.3" height="40.1" rx="2.5"></rect><rect x="313.4" y="39.9" width="40.3" height="35.2" rx="2.5"></rect><rect x="375.3" y="39.9" width="40.3" height="35.2" rx="2.5"></rect><rect x="437.2" y="39.9" width="40.3" height="35.2" rx="2.5"></rect><rect x="499.1" y="39.9" width="40.3" height="35.2" rx="2.5"></rect><rect x="561" y="39.9" width="40.3" height="35.2" rx="2.5"></rect><rect x="623" y="39.9" width="40.3" height="35.2" rx="2.5"></rect><rect x="684.9" y="39.9" width="40.3" height="35.2" rx="2.5"></rect><rect x="746.8" y="39.9" width="40.3" height="35.2" rx="2.5"></rect><rect x="65.7" y="39.9" width="40.3" height="35.2" rx="2.5"></rect></g><g fill="#222"><rect x="127.6" y="39.9" width="40.3" height="35.2" rx="2.5" fill="#222"></rect><rect x="189.5" y="39.9" width="40.3" height="35.2" rx="2.5"></rect><rect x="202.4" y="46.6" width="6.5" height="5.2" rx="0" stroke="#fff" stroke-width=".5"></rect><rect x="211" y="45.3" width="5.9" height="6.4" rx="0" stroke="#fff" stroke-width=".5"></rect></g><g fill="#222"><rect x="251.4" y="39.9" width="40.3" height="35.2" rx="2.5"></rect><g stroke="#fff" stroke-linecap="square" stroke-width=".5"><rect x="263.8" y="44.7" width="2.8" height="2.8"></rect><rect x="268" y="44.7" width="2.8" height="2.8"></rect><rect x="272.3" y="44.7" width="2.8" height="2.8"></rect><rect x="276.5" y="44.7" width="2.8" height="2.8"></rect><rect x="263.8" y="49" width="2.8" height="2.8"></rect><rect x="268" y="49" width="2.8" height="2.8"></rect><rect x="272.3" y="49" width="2.8" height="2.8"></rect><rect x="276.5" y="49" width="2.8" height="2.8"></rect></g></g><g fill="none" stroke="#222" stroke-width=".5"><rect x="63.2" y="4.7" width="45.3" height="73" rx="2.5"></rect><g stroke="#fff"><circle cx="85.8" cy="48.8" r="1.7"></circle><path d="m85.8 46.1v-.5"></path><path d="m85.8 51.95v-.5"></path><path d="m88.97 48.8h-.5"></path><path d="m83.16 48.78h-.5"></path><path d="m83.9 46.9-.37-.4"></path><path d="m88 51-.37-.37"></path><path d="m88 46.5-.374.4"></path><path d="m83.9 50.65-.374.37"></path><path d="m147.7 54.4v-1.4"></path><circle cx="147.7" cy="50" r="2.3"></circle><path d="m147.7 46.86v-1.4"></path><path d="m152.2 49.96h-1.4"></path><path d="m144.6 49.96h-1.4"></path><path d="m145.5 47.77-.98-1"></path><path d="m150.88 53.1-1-1"></path><path d="m150.88 46.8-.98.98"></path><path d="m145.5 52.1-.98.98"></path></g><rect x="125" y="4.7" width="45.3" height="73" rx="2.5"></rect><rect x="187" y="4.7" width="45.3" height="73" rx="2.5"></rect><rect x="248.9" y="4.7" width="45.3" height="73" rx="2.5"></rect><rect x="130.4" y="316.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="184.2" y="316.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="238.1" y="316.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="292" y="316.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="345.9" y="316.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="399.8" y="316.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="453.7" y="316.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="507.6" y="316.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="561.4" y="316.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="615.3" y="316.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="1.3" y="316.8" width="120.4" height="65.2" rx="2.5"></rect><rect x="669.2" y="316.8" width="120.4" height="65.2" rx="2.5"></rect><rect x="310.8" y="17.3" width="45.3" height="60.4" rx="2.5"></rect><rect x="372.8" y="17.3" width="45.3" height="60.4" rx="2.5"></rect><rect x="434.7" y="17.3" width="45.3" height="60.4" rx="2.5"></rect><rect x="496.6" y="17.3" width="45.3" height="60.4" rx="2.5"></rect><rect x="558.5" y="17.3" width="45.3" height="60.4" rx="2.5"></rect><rect x="620.4" y="17.3" width="45.3" height="60.4" rx="2.5"></rect><rect x="682.4" y="17.3" width="45.3" height="60.4" rx="2.5"></rect><rect x="744.3" y="17.3" width="45.3" height="60.4" rx="2.5"></rect><rect x="1.3" y="17.3" width="45.3" height="60.4" rx="2.5"></rect><rect x="1.3" y="88.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="55.3" y="88.6" width="45.1" height="65.2" rx="2.5"></rect><rect x="109.4" y="88.6" width="45.1" height="65.2" rx="2.5"></rect><rect x="163.5" y="88.6" width="45.1" height="65.2" rx="2.5"></rect><rect x="217.5" y="88.6" width="45.1" height="65.2" rx="2.5"></rect><rect x="271.6" y="88.6" width="45.1" height="65.2" rx="2.5"></rect><rect x="325.7" y="88.4" width="45.2" height="65.3" rx="2.5"></rect><rect x="379.9" y="88.6" width="45.1" height="65.2" rx="2.5"></rect><rect x="433.9" y="88.6" width="45.1" height="65.2" rx="2.5"></rect><rect x="488" y="88.6" width="45.1" height="65.2" rx="2.5"></rect><rect x="542" y="88.6" width="45.1" height="65.2" rx="2.5"></rect><rect x="596.2" y="88.9" width="45.1" height="65.2" rx="2.5"></rect><rect x="650.2" y="88.9" width="45.1" height="65.2" rx="2.5"></rect><rect x="704.3" y="88.9" width="85.3" height="65.2" rx="2.5"></rect><rect x="95.5" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="149.5" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="203.6" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="257.7" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="311.8" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="365.9" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="419.9" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="474" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="528.1" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="582.2" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="636.3" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="690.3" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="744.4" y="164.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="1.3" y="164.8" width="85.3" height="65.2" rx="2.5"></rect><rect x="1.2" y="392.8" width="41.8" height="60.4" rx="2.3"></rect><rect x="51" y="392.8" width="65.2" height="65.2" rx="2.5"></rect><rect x="124.3" y="392.8" width="65.2" height="65.2" rx="2.5"></rect><rect x="197.6" y="392.8" width="85.3" height="65.2" rx="2.5"></rect><rect x="587.8" y="392.8" width="65.2" height="65.2" rx="2.5"></rect><rect x="494.5" y="392.8" width="85.3" height="65.2" rx="2.5"></rect><rect x="290.9" y="392.8" width="195.6" height="65.2" rx="2.5"></rect><rect x="107.1" y="240.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="160.4" y="240.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="213.6" y="240.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="266.9" y="240.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="320" y="240.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="373.3" y="240.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="426.6" y="240.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="479.8" y="240.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="533" y="240.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="586.3" y="240.8" width="45.1" height="65.2" rx="2.5"></rect><rect x="639.5" y="240.8" width="45.1" height="65.2" rx="2.5"></rect><path d="m3.758 240.8h92.773c1.389 0 2.5 1.1 2.5 2.5v60.177c0 1.389-1.1 2.5-2.5 2.5h-92.773c-1.389 0-2.5-1.1-2.5-2.5v-60.177c0-1.389 1.1-2.5 2.5-2.5z"></path><rect x="692.7" y="240.8" width="96.8" height="65" rx="2.5"></rect><rect x="707.8" y="386.7" width="44.3" height="54" rx="2.5"></rect><rect x="707.8" y="443.2" width="44.3" height="54" rx="2.5"></rect><rect x="661" y="403.9" width="44.3" height="54" rx="2.5"></rect><rect x="754.5" y="403.9" width="44.3" height="54" rx="2.5"></rect></g><g fill="#222"><rect x="696" y="263.5" width="89.4" height="38.9" rx="2.4"></rect><rect x="709.7" y="409" width="39.3" height="29.5" rx="2.6"></rect><rect x="709.7" y="446.2" width="39.3" height="29.5" rx="2.4"></rect><rect x="756.4" y="426.5" width="39.3" height="29.5" rx="2.4"></rect><rect x="663" y="426.5" width="39.3" height="29.5" rx="2.4"></rect><rect x="3.8" y="39.9" width="40.1" height="35.2" rx="2.4"></rect><rect x="3.8" y="111.3" width="40.1" height="40.1" rx="2.5"></rect><rect x="57.8" y="111.2" width="40.1" height="40.1" rx="2.5"></rect><rect x="111.9" y="111.2" width="40.1" height="40.1" rx="2.5"></rect><rect x="166" y="111.2" width="40.1" height="40.1" rx="2.5"></rect><rect x="220" y="111.2" width="40.1" height="40.1" rx="2.5"></rect><rect x="274.1" y="111.2" width="40.1" height="40.1" rx="2.5"></rect><rect x="328.2" y="111.5" width="40.2" height="40.2" rx="2.5"></rect><rect x="382.4" y="111.2" width="40.1" height="40.1" rx="2.5"></rect><rect x="436.5" y="111.2" width="40.1" height="40.1" rx="2.5"></rect><rect x="490.5" y="111.2" width="40.1" height="40.1" rx="2.5"></rect><rect x="544.6" y="111.2" width="40.1" height="40.1" rx="2.5"></rect><rect x="598.7" y="111.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="652.7" y="111.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="706.8" y="111.4" width="80.2" height="40.1" rx="2.5"></rect><rect x="98" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="152" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="206.1" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="260.2" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="314.3" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="368.4" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="422.4" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="476.5" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="530.6" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="584.7" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="638.8" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="692.9" y="187.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="746.9" y="187.4" width="40" height="40" rx="2.4"></rect><rect x="3.8" y="187.4" width="80.2" height="40.1" rx="2.5"></rect><rect x="3.6" y="413.7" width="37.2" height="37.2" rx="2.3"></rect><rect x="53.6" y="415.3" width="60.2" height="40.1" rx="2.5"></rect><rect x="126.8" y="415.3" width="60.2" height="40.1" rx="2.5"></rect><rect x="200" y="415.3" width="80.2" height="40.1" rx="2.5"></rect><rect x="590.3" y="415.3" width="60.2" height="40.1" rx="2.5"></rect><rect x="497" y="415.3" width="80.2" height="40.1" rx="2.5"></rect><rect x="293.4" y="415.3" width="190.6" height="40.1" rx="2.5"></rect><rect x="109.7" y="263.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="162.9" y="263.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="216.1" y="263.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="269.4" y="263.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="322.6" y="263.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="375.8" y="263.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="429" y="263.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="482.3" y="263.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="535.5" y="263.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="588.8" y="263.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="642" y="263.4" width="40.1" height="40.1" rx="2.5"></rect><rect x="3.8" y="263.4" width="92.3" height="40.1" rx="2.5"></rect><rect x="696.8" y="262.8" width="89.4" height="38.9" rx="2.4"></rect><rect x="710.2" y="408.5" width="39.3" height="29.5" rx="2.6"></rect><rect x="710.2" y="445.6" width="39.3" height="29.5" rx="2.4"></rect><rect x="756.95" y="425.99" width="39.3" height="29.5" rx="2.4"></rect><rect x="663.5" y="426" width="39.3" height="29.5" rx="2.4"></rect></g><g fill="#fff"><path d="m734.15 427.9-4.2-9.2948-4.2 9.3"></path><path d="m734.15 455.7-4.2 9.2948-4.2-9.3"></path><path d="m771.66 436.76 9.9 3.98-9.9 3.98"></path><path d="m688.1 444.7-9.9-3.98 9.9-3.98"></path></g><g font-size="3.6px"><text x="3.9" y="26.5"><tspan x="3.9" y="26.5">key code</tspan></text><text x="65.9" y="14.5"><tspan x="65.9" y="14.5">key code</tspan></text><text x="65.8" y="26.8"><tspan x="65.8" y="26.8">key code</tspan></text><text x="127.8" y="26.5"><tspan x="127.8" y="26.5">key code</tspan></text><text x="127.8" y="14.5"><tspan x="127.8" y="14.5">key code</tspan></text><text x="189.7" y="14.5"><tspan x="189.7" y="14.5">key code</tspan></text><text x="189.7" y="26.5"><tspan x="189.7" y="26.5">key code</tspan></text><text x="251.6" y="26.5"><tspan x="251.6" y="26.5">key code</tspan></text><text x="252.5" y="14.5"><tspan x="252.5" y="14.5">key code</tspan></text><text x="313.5" y="26.5"><tspan x="313.5" y="26.5">key code</tspan></text><text x="375.4" y="26.5"><tspan x="375.4" y="26.5">key code</tspan></text><text x="437.4" y="26.5"><tspan x="437.4" y="26.5">key code</tspan></text><text x="499.3" y="26.5"><tspan x="499.3" y="26.5">key code</tspan></text><text x="562.1" y="26.5"><tspan x="562.1" y="26.5">key code</tspan></text><text x="623.2" y="26.5"><tspan x="623.2" y="26.5">key code</tspan></text><text x="685" y="26.5"><tspan x="685" y="26.5">key code</tspan></text><text x="747.9" y="26.7"><tspan x="747.9" y="26.7">key code</tspan></text><text x="727.9" y="98.1"><tspan x="727.9" y="98.1">key code</tspan></text><text x="652.9" y="98.3"><tspan x="652.9" y="98.3">key code</tspan></text><text x="598.8" y="98.3"><tspan x="598.8" y="98.3">key code</tspan></text><text x="544.8" y="97.8"><tspan x="544.8" y="97.8">key code</tspan></text><text x="490.7" y="97.8"><tspan x="490.7" y="97.8">key code</tspan></text><text x="436.6" y="97.8"><tspan x="436.6" y="97.8">key code</tspan></text><text x="382.5" y="97.8"><tspan x="382.5" y="97.8">key code</tspan></text><text x="328.4" y="97.9"><tspan x="328.4" y="97.9">key code</tspan></text><text x="274.3" y="97.8"><tspan x="274.3" y="97.8">key code</tspan></text><text x="221.1" y="98"><tspan x="221.1" y="98">key code</tspan></text><text x="166.2" y="97.8"><tspan x="166.2" y="97.8">key code</tspan></text><text x="112.1" y="97.8"><tspan x="112.1" y="97.8">key code</tspan></text><text x="58" y="97.8"><tspan x="58" y="97.8">key code</tspan></text><text x="3.9" y="98"><tspan x="3.9" y="98">key code</tspan></text><text x="24" y="174"><tspan x="24" y="174">key code</tspan></text><text x="98.1" y="174.3"><tspan x="98.1" y="174.3">key code</tspan></text><text x="152.2" y="174"><tspan x="152.2" y="174">key code</tspan></text><text x="206.3" y="174.3"><tspan x="206.3" y="174.3">key code</tspan></text><text x="260.4" y="174"><tspan x="260.5" y="174">key code</tspan></text><text x="314.4" y="174.3"><tspan x="314.4" y="174.3">key code</tspan></text><text x="368.5" y="174"><tspan x="368.5" y="174">key code</tspan></text><text x="422.6" y="174"><tspan x="422.6" y="174">key code</tspan></text><text x="476.7" y="174"><tspan x="476.7" y="174">key code</tspan></text><text x="531.7" y="174"><tspan x="531.7" y="174">key code</tspan></text><text x="584.9" y="174"><tspan x="584.9" y="174">key code</tspan></text><text x="639" y="174"><tspan x="639" y="174">key code</tspan></text><text x="693" y="174"><tspan x="693" y="174">key code</tspan></text><text x="747" y="174.3"><tspan x="747" y="174.3">key code</tspan></text><text x="747.7" y="250.2"><tspan x="747.7" y="250.2">key code</tspan></text><text x="698.7" y="250.2"><tspan x="698.7" y="250.2">key code</tspan></text><text x="642.2" y="250"><tspan x="642.2" y="250">key code</tspan></text><text x="589.9" y="250.2"><tspan x="589.9" y="250.2">key code</tspan></text><text x="535.7" y="250"><tspan x="535.7" y="250">key code</tspan></text><text x="482.5" y="250"><tspan x="482.5" y="250">key code</tspan></text><text x="429.3" y="250"><tspan x="429.3" y="250">key code</tspan></text><text x="376" y="250.2"><tspan x="376" y="250.2">key code</tspan></text><text x="322.8" y="250"><tspan x="322.8" y="250">key code</tspan></text><text x="269.6" y="250"><tspan x="269.6" y="250">key code</tspan></text><text x="216.3" y="250.2"><tspan x="216.3" y="250.2">key code</tspan></text><text x="164" y="250.2"><tspan x="164" y="250.2">key code</tspan></text><text x="109.8" y="250"><tspan x="109.8" y="250">key code</tspan></text><text x="30" y="250"><tspan x="30" y="250">key code</tspan></text><text x="41.5" y="326"><tspan x="41.5" y="326">key code</tspan></text><text x="133" y="326"><tspan x="133" y="326">key code</tspan></text><text x="186.9" y="326.2"><tspan x="186.9" y="326.2">key code</tspan></text><text x="240.8" y="326"><tspan x="240.8" y="326">key code</tspan></text><text x="294.7" y="326"><tspan x="294.7" y="326">key code</tspan></text><text x="349.5" y="326.2"><tspan x="349.5" y="326.2">key code</tspan></text><text x="402.5" y="326"><tspan x="402.5" y="326">key code</tspan></text><text x="456.3" y="326"><tspan x="456.3" y="326">key code</tspan></text><text x="510.2" y="326"><tspan x="510.2" y="326">key code</tspan></text><text x="564" y="326.2"><tspan x="564" y="326.2">key code</tspan></text><text x="618" y="326.2"><tspan x="618" y="326.2">key code</tspan></text><text x="709.5" y="326"><tspan x="709.5" y="326">key code</tspan></text><text x="710.4" y="395.8"><tspan x="710.4" y="395.8">key code</tspan></text><text x="663.7" y="413"><tspan x="663.7" y="413">key code</tspan></text><text x="757" y="413"><tspan x="757" y="413">key code</tspan></text><text x="710.4" y="489.2"><tspan x="710.4" y="489.2">key codes</tspan></text><text x="601.4" y="402"><tspan x="601.4" y="402">key code</tspan></text><text x="517.3" y="402"><tspan x="517.3" y="402">key code</tspan></text><text x="368.8" y="402"><tspan x="368.8" y="402">key code</tspan></text><text x="220.3" y="402"><tspan x="220.3" y="402">key code</tspan></text><text x="137" y="402"><tspan x="137" y="402">key code</tspan></text><text x="63.8" y="402"><tspan x="63.8" y="402">key code</tspan></text><text x="3.7" y="401.5"><tspan x="3.7" y="401.5">key code</tspan></text></g><g fill="#fff" font-family="sans-serif"><g font-size="14.6px" text-anchor="middle"><text x="23.9" y="66.9"><tspan x="23.9" y="66.9" font-size="13.2px" text-align="center">esc</tspan></text><text x="85.8" y="69.1"><tspan x="85.8" y="69.1" text-align="center">F1</tspan></text><text x="147.7" y="69.1"><tspan x="147.7" y="69.1" text-align="center">F2</tspan></text><text x="209.5" y="69.1"><tspan x="209.5" y="69.1" text-align="center">F3</tspan></text><text x="271.3" y="69.1"><tspan x="271.3" y="69.1" text-align="center">F4</tspan></text><text x="333.4" y="69.1"><tspan x="333.4" y="69.1" text-align="center">F5</tspan></text><text x="395.1" y="69.1"><tspan x="395.1" y="69.1" text-align="center">F6</tspan></text><text x="457.2" y="69.1"><tspan x="457.2" y="69.1" text-align="center">F7</tspan></text><text x="519" y="69.1"><tspan x="519" y="69.1" text-align="center">F8</tspan></text><text x="581" y="69.1"><tspan x="581" y="69.1" text-align="center">F9</tspan></text><text x="642.8" y="69.1"><tspan x="642.8" y="69.1" text-align="center">F10</tspan></text><text x="705" y="69.1"><tspan x="705" y="69.1" text-align="center">F11</tspan></text><text x="766.9" y="69.1"><tspan x="766.9" y="69.1" text-align="center">F12</tspan></text><text x="23.8" y="128.7"><tspan x="23.8" y="128.7" text-align="center">~</tspan><tspan x="23.8" y="147" text-align="center">`</tspan></text><text x="77.8" y="127.6"><tspan x="77.8" y="127.6" text-align="center">!</tspan><tspan x="77.8" y="145.9" text-align="center">1</tspan></text><text x="132" y="127.6"><tspan x="132" y="127.6" text-align="center">@</tspan><tspan x="132" y="145.9" text-align="center">2</tspan></text><text x="186" y="127.6"><tspan x="186" y="127.6" text-align="center">#</tspan><tspan x="186" y="145.9" text-align="center">3</tspan></text><text x="240.2" y="127.6"><tspan x="240.2" y="127.6" text-align="center">$</tspan><tspan x="240.2" y="145.9" text-align="center">4</tspan></text><text x="294.2" y="127.6"><tspan x="294.2" y="127.6" text-align="center">%</tspan><tspan x="294.2" y="145.9" text-align="center">5</tspan></text><text x="348.3" y="127.6"><tspan x="348.3" y="127.6" text-align="center">^</tspan><tspan x="348.3" y="145.9" text-align="center">6</tspan></text><text x="402.2" y="127.6"><tspan x="402.2" y="127.6" text-align="center">&amp;</tspan><tspan x="402.2" y="145.9" text-align="center">7</tspan></text><text x="456.5" y="127.6"><tspan x="456.5" y="127.6" text-align="center">*</tspan><tspan x="456.5" y="145.9" text-align="center">8</tspan></text><text x="510.6" y="127.6"><tspan x="510.6" y="127.6" text-align="center">(</tspan><tspan x="510.6" y="145.9" text-align="center">9</tspan></text><text x="564.7" y="127.6"><tspan x="564.7" y="127.6" text-align="center">)</tspan><tspan x="564.7" y="145.9" text-align="center">0</tspan></text><text x="618.7" y="123.2"><tspan x="618.7" y="123.2" text-align="center">_</tspan><tspan x="618.7" y="141.6" text-align="center">-</tspan></text><text x="672.8" y="127"><tspan x="672.8" y="127" text-align="center">+</tspan><tspan x="672.8" y="145.3" text-align="center">=</tspan></text></g><text x="777" y="144" font-size="3.6px"><tspan x="777" y="144" fill="#fff" font-size="13.2px" text-align="end" text-anchor="end">delete</tspan></text><g text-anchor="middle"><text x="766.9" y="202.3" font-size="14.6px"><tspan x="766.9" y="202.3" text-align="center">|</tspan><tspan x="766.9" y="220.6" text-align="center">\</tspan></text><text x="712.9" y="202.9" font-size="13.2px"><tspan x="712.9" y="202.9" text-align="center">}</tspan><tspan x="712.9" y="219.6" text-align="center">]</tspan></text><text x="658.8" y="202.9" font-size="13.2px"><tspan x="658.8" y="202.9" text-align="center">{</tspan><tspan x="658.8" y="219.6" text-align="center">[</tspan></text></g><g font-size="3.6px" fill="#fff"><text x="604.2" y="213.5"><tspan x="604.2" y="213.5" font-size="16.7px" text-align="center" text-anchor="middle">P</tspan></text><text x="550.7" y="213.5"><tspan x="550.7" y="213.5" font-size="16.7px" text-align="center" text-anchor="middle">O</tspan></text><text x="496.6" y="213.5"><tspan x="496.6" y="213.5" font-size="16.7px" text-align="center" text-anchor="middle">I</tspan></text><text x="442.5" y="213.4"><tspan x="442.5" y="213.4" font-size="16.7px" text-align="center" text-anchor="middle">U</tspan></text><text x="388.4" y="213.5"><tspan x="388.4" y="213.5" font-size="16.7px" text-align="center" text-anchor="middle">Y</tspan></text><text x="334.3" y="213.5"><tspan x="334.3" y="213.5" font-size="16.7px" text-align="center" text-anchor="middle">T</tspan></text><text x="279.7" y="213.5"><tspan x="279.7" y="213.5" font-size="16.7px" text-align="center" text-anchor="middle">R</tspan></text><text x="225.9" y="213.5"><tspan x="225.9" y="213.5" font-size="16.7px" text-align="center" text-anchor="middle">E</tspan></text><text x="172" y="213.5"><tspan x="172" y="213.5" font-size="16.7px" text-align="center" text-anchor="middle">W</tspan></text><text x="118" y="212.6"><tspan x="118" y="212.6" font-size="16.7px" text-align="center" text-anchor="middle">Q</tspan></text><text x="11.9" y="297.4"><tspan x="11.9" y="297.4" font-size="13.2px">caps lock</tspan></text><text x="12.7" y="220"><tspan x="12.7" y="220" font-size="13.2px">tab</tspan></text><text x="13.8" y="371.7"><tspan x="13.8" y="371.7" font-size="13.2px">shift</tspan></text><text x="10.1" y="445.3"><tspan x="10.1" y="445.3" font-size="13.2px">fn</tspan></text><text x="83.9" y="449.1"><tspan x="83.9" y="449.1" font-size="13.2px" text-align="center" text-anchor="middle">control</tspan></text><text x="157.1" y="449.1"><tspan x="157.1" y="449.1" font-size="13.2px" text-align="center" text-anchor="middle">option</tspan></text><text x="240.4" y="449.1"><tspan x="240.4" y="449.1" font-size="13.2px" text-align="center" text-anchor="middle">command</tspan></text><text x="537.4" y="449.1"><tspan x="537.4" y="449.1" font-size="13.2px" text-align="center" text-anchor="middle">command</tspan></text><text x="620.6" y="449.1"><tspan x="620.6" y="449.1" font-size="13.2px" text-align="center" text-anchor="middle">option</tspan></text></g></g><text x="44.2" y="29.7" fill="#000" font-size="3.6px"><tspan x="44.2" y="29.7" font-size="10.7px" stroke-width=".2" text-align="end" text-anchor="end">53</tspan></text><g fill="#fff" font-family="sans-serif"><text x="776.5" y="275.5" font-size="3.6px"><tspan x="776.5" y="275.5" font-size="10.7px" text-align="end" text-anchor="end">enter</tspan></text><text x="776.5" y="294.1" font-size="12px"><tspan x="776.5" y="294.1" font-size="12px" text-align="end" text-anchor="end">return</tspan></text><text x="777" y="371.6" font-size="12px"><tspan x="777" y="371.6" font-size="13.2px" text-align="end" text-anchor="end">shift</tspan></text><g font-size="3.6px"><text x="129.7" y="289.5"><tspan x="129.7" y="289.5" font-size="16.7px" text-align="center" text-anchor="middle">A</tspan></text><text x="182.9" y="289.5"><tspan x="182.9" y="289.5" font-size="16.7px" text-align="center" text-anchor="middle">S</tspan></text><text x="235.9" y="289.5"><tspan x="235.9" y="289.5" font-size="16.7px" text-align="center" text-anchor="middle">D</tspan></text><text x="289" y="289.5"><tspan x="289" y="289.5" font-size="16.7px" text-align="center" text-anchor="middle">F</tspan></text><text x="342.9" y="289.5"><tspan x="342.9" y="289.5" font-size="16.7px" text-align="center" text-anchor="middle">G</tspan></text><text x="395.9" y="289.5"><tspan x="395.9" y="289.5" font-size="16.7px" text-align="center" text-anchor="middle">H</tspan></text><text x="450.4" y="287.8"><tspan x="450.4" y="287.8" font-size="16.7px" text-align="center" text-anchor="middle">J</tspan></text><text x="501.4" y="289.5"><tspan x="501.4" y="289.5" font-size="16.7px" text-align="center" text-anchor="middle">K</tspan></text><text x="554.8" y="289.5"><tspan x="554.8" y="289.5" font-size="16.7px" text-align="center" text-anchor="middle">L</tspan></text></g><g font-size="13.2px" text-anchor="middle"><text x="609" y="277.8"><tspan x="609" y="277.8" text-align="center">:</tspan><tspan x="609" y="294.4" text-align="center">;</tspan></text><text x="662" y="283"><tspan x="662" y="283" text-align="center">"</tspan><tspan x="662" y="299.7" text-align="center">'</tspan></text><text x="637.9" y="355.4"><tspan x="637.9" y="355.4" text-align="center">?</tspan><tspan x="637.9" y="372" text-align="center">/</tspan></text><text x="584" y="354.95"><tspan x="584" y="354.95" text-align="center">&gt;</tspan><tspan x="584" y="371.6" text-align="center">.</tspan></text><text x="530.1" y="354.2"><tspan x="530.1" y="354.2" text-align="center">&lt;</tspan><tspan x="530.1" y="370.8" text-align="center">,</tspan></text></g><g font-size="3.6px" fill="#fff"><text x="476.2" y="365.5"><tspan x="476.2" y="365.5" font-size="16.7px" text-align="center" text-anchor="middle">M</tspan></text><text x="422.4" y="365.5"><tspan x="422.4" y="365.5" font-size="16.7px" text-align="center" text-anchor="middle">N</tspan></text><text x="368.2" y="365.5"><tspan x="368.2" y="365.5" font-size="16.7px" text-align="center" text-anchor="middle">B</tspan></text><text x="314.6" y="365.5"><tspan x="314.6" y="365.5" font-size="16.7px" text-align="center" text-anchor="middle">V</tspan></text><text x="260.7" y="365.5"><tspan x="260.7" y="365.5" font-size="16.7px" text-align="center" text-anchor="middle">C</tspan></text><text x="206.8" y="365.5"><tspan x="206.8" y="365.5" font-size="16.7px" text-align="center" text-anchor="middle">X</tspan></text><text x="152.9" y="365.5"><tspan x="152.9" y="365.5" font-size="16.7px" text-align="center" text-anchor="middle">Z</tspan></text></g></g><g font-size="10.7px" stroke-width=".2"><text x="106.3" y="17.6"><tspan x="106.3" y="17.6" text-align="end" text-anchor="end">107</tspan></text><text x="106.3" y="29.9"><tspan x="106.3" y="29.9" text-align="end" text-anchor="end">122</tspan></text><text x="168.1" y="17.6"><tspan x="168.1" y="17.6" text-align="end" text-anchor="end">113</tspan></text><text x="168" y="29.7"><tspan x="168" y="29.7" text-align="end" text-anchor="end">120</tspan></text><text x="230" y="17.6"><tspan x="230" y="17.7" text-align="end" text-anchor="end">160</tspan></text><text x="230" y="29.7"><tspan x="230" y="29.7" text-align="end" text-anchor="end">99</tspan></text><text x="292.2" y="17.6"><tspan x="292.2" y="17.6" text-align="end" text-anchor="end">131</tspan></text><text x="291.9" y="29.7"><tspan x="291.9" y="29.7" text-align="end" text-anchor="end">118</tspan></text><text x="353.8" y="29.7"><tspan x="353.8" y="29.7" text-align="end" text-anchor="end">96</tspan></text><text x="415.9" y="29.7"><tspan x="415.9" y="29.7" text-align="end" text-anchor="end">97</tspan></text><text x="477.8" y="29.7"><tspan x="477.8" y="29.7" text-align="end" text-anchor="end">98</tspan></text><text x="539.6" y="29.7"><tspan x="539.6" y="29.7" text-align="end" text-anchor="end">100</tspan></text><text x="602.6" y="29.7"><tspan x="602.6" y="29.7" text-align="end" text-anchor="end">101</tspan></text><text x="663.4" y="29.7"><tspan x="663.4" y="29.7" text-align="end" text-anchor="end">109</tspan></text><text x="725.4" y="29.7"><tspan x="725.4" y="29.7" text-align="end" text-anchor="end">103</tspan></text><text x="788.6" y="29.7"><tspan x="788.6" y="29.7" text-align="end" text-anchor="end">111</tspan></text><text x="775.5" y="101.4"><tspan x="775.5" y="101.4" text-align="end" text-anchor="end">51</tspan></text><text x="693.2" y="101.5"><tspan x="693.2" y="101.5" text-align="end" text-anchor="end">24</tspan></text><text x="639" y="101.5"><tspan x="639" y="101.5" text-align="end" text-anchor="end">27</tspan></text><text x="585" y="101.4"><tspan x="585" y="101.4" text-align="end" text-anchor="end">29</tspan></text><text x="531" y="101.4"><tspan x="531" y="101.4" text-align="end" text-anchor="end">25</tspan></text><text x="476.8" y="101.4"><tspan x="476.8" y="101.4" text-align="end" text-anchor="end">28</tspan></text><text x="422.6" y="101.4"><tspan x="422.6" y="101.4" text-align="end" text-anchor="end">26</tspan></text><text x="368.8" y="101.4"><tspan x="368.8" y="101.4" text-align="end" text-anchor="end">22</tspan></text><text x="314.6" y="101.4"><tspan x="314.6" y="101.4" text-align="end" text-anchor="end">23</tspan></text><text x="260.4" y="101.4"><tspan x="260.4" y="101.4" text-align="end" text-anchor="end">21</tspan></text><text x="206.4" y="101.4"><tspan x="206.4" y="101.4" text-align="end" text-anchor="end">20</tspan></text><text x="152.4" y="101.4"><tspan x="152.4" y="101.4" text-align="end" text-anchor="end">19</tspan></text><text x="98.2" y="101.4"><tspan x="98.2" y="101.4" text-align="end" text-anchor="end">18</tspan></text><text x="44" y="101.4"><tspan x="44" y="101.4" text-align="end" text-anchor="end">50</tspan></text><text x="51.2" y="177.2"><tspan x="51.2" y="177.2">48</tspan></text><text x="149.7" y="177.2"><tspan x="138.4" y="177.2" text-align="end" text-anchor="end">12</tspan></text><text x="203.6" y="177.2"><tspan x="192.2" y="177.2" text-align="end" text-anchor="end">13</tspan></text><text x="257.9" y="177.2"><tspan x="246.5" y="177.2" text-align="end" text-anchor="end">14</tspan></text><text x="311.9" y="177.2"><tspan x="300.6" y="177.2" text-align="end" text-anchor="end">15</tspan></text><text x="366" y="177.2"><tspan x="354.8" y="177.2" text-align="end" text-anchor="end">17</tspan></text><text x="420" y="177.2"><tspan x="408.7" y="177.2" text-align="end" text-anchor="end">16</tspan></text><text x="474.4" y="177.2"><tspan x="463" y="177.2" text-align="end" text-anchor="end">32</tspan></text><text x="528.4" y="177.2"><tspan x="517" y="177.2" text-align="end" text-anchor="end">34</tspan></text><text x="581.5" y="177.2"><tspan x="570.2" y="177.2" text-align="end" text-anchor="end">31</tspan></text><text x="636.5" y="177.2"><tspan x="625.2" y="177.2" text-align="end" text-anchor="end">35</tspan></text><text x="690.5" y="177.2"><tspan x="679.2" y="177.2" text-align="end" text-anchor="end">33</tspan></text><text x="744.5" y="177.2"><tspan x="733.2" y="177.2" text-align="end" text-anchor="end">30</tspan></text><text x="798.9" y="177.2"><tspan x="787.5" y="177.2" text-align="end" text-anchor="end">42</tspan></text><text x="795.4" y="253.3"><tspan x="784" y="253.3" text-align="end" text-anchor="end">36</tspan></text><text x="746.3" y="253.3"><tspan x="735" y="253.3" text-align="end" text-anchor="end">76</tspan></text><text x="693.7" y="253.3"><tspan x="682.4" y="253.3" text-align="end" text-anchor="end">39</tspan></text><text x="639.7" y="253.3"><tspan x="628.3" y="253.3" text-align="end" text-anchor="end">41</tspan></text><text x="587.4" y="253.3"><tspan x="576" y="253.3" text-align="end" text-anchor="end">37</tspan></text><text x="534" y="253.3"><tspan x="522.6" y="253.3" text-align="end" text-anchor="end">40</tspan></text><text x="480.8" y="253.3"><tspan x="469.4" y="253.3" text-align="end" text-anchor="end">38</tspan></text><text x="427.7" y="253.3"><tspan x="416.3" y="253.3" text-align="end" text-anchor="end">4</tspan></text><text x="374.4" y="253.3"><tspan x="363" y="253.3" text-align="end" text-anchor="end">5</tspan></text><text x="321" y="253.3"><tspan x="309.7" y="253.3" text-align="end" text-anchor="end">3</tspan></text><text x="268" y="253.3"><tspan x="256.8" y="253.3" text-align="end" text-anchor="end">2</tspan></text><text x="213.8" y="253.3"><tspan x="202.5" y="253.3" text-align="end" text-anchor="end">1</tspan></text><text x="161.3" y="253.3"><tspan x="150" y="253.3" text-align="end" text-anchor="end">0</tspan></text><text x="68.3" y="253.3"><tspan x="57" y="253.3">57</tspan></text><text x="79.9" y="329.2"><tspan x="68.5" y="329.2">57</tspan></text><text x="184.5" y="329.2"><tspan x="173.2" y="329.2" text-align="end" text-anchor="end">6</tspan></text><text x="238.6" y="329.2"><tspan x="227.2" y="329.2" text-align="end" text-anchor="end">7</tspan></text><text x="292.3" y="329.2"><tspan x="281" y="329.2" text-align="end" text-anchor="end">8</tspan></text><text x="346.2" y="329.2"><tspan x="334.9" y="329.2" text-align="end" text-anchor="end">9</tspan></text><text x="399.3" y="329.2"><tspan x="388" y="329.2" text-align="end" text-anchor="end">11</tspan></text><text x="454" y="329.2"><tspan x="442.8" y="329.2" text-align="end" text-anchor="end">45</tspan></text><text x="507.8" y="329.2"><tspan x="496.5" y="329.2" text-align="end" text-anchor="end">46</tspan></text><text x="561.8" y="329.2"><tspan x="550.4" y="329.2" text-align="end" text-anchor="end">43</tspan></text><text x="615.8" y="329.2"><tspan x="604.4" y="329.2" text-align="end" text-anchor="end">47</tspan></text><text x="669.7" y="329.2"><tspan x="658.3" y="329.2" text-align="end" text-anchor="end">44</tspan></text><text x="747.8" y="329.2"><tspan x="736.5" y="329.2">60</tspan></text><text x="779.6" y="398.9"><tspan x="749.8" y="398.9" text-align="end" text-anchor="end">126</tspan></text><text x="826.6" y="416.1"><tspan x="796.7" y="416.1" text-align="end" text-anchor="end">124</tspan></text><text x="733" y="416"><tspan x="703.1" y="416" text-align="end" text-anchor="end">123</tspan></text><text x="779.8" y="492.4"><tspan x="750" y="492.4" text-align="end" text-anchor="end">125</tspan></text><text x="658.3" y="405.2"><tspan x="628.4" y="405.2">61</tspan></text><text x="574.2" y="405.2"><tspan x="544.3" y="405.2">55</tspan></text><text x="425.5" y="405.2"><tspan x="395.6" y="405.2">49</tspan></text><text x="277.2" y="405.2"><tspan x="247.3" y="405.2">55</tspan></text><text x="193.9" y="405.2"><tspan x="164" y="405.2">58</tspan></text><text x="120.7" y="405.2"><tspan x="90.8" y="405.2">59</tspan></text><text x="82.9" y="404.5"><tspan x="41" y="404.5" text-align="end" text-anchor="end">63</tspan></text></g></svg>


# 案例

## 自动登录WIFI
```applescript
tell application "Safari"
	activate
	make new document with properties {URL:"http://baidu.com"} --打开校园网
	delay 1 -- 暂停 1 秒
	tell document 1
		do JavaScript "
		document.getElementById('username').value=188xxxxxxxx;--学号
		var s = document.getElementById('domain');
		s.options[1].selected = true;//刷新页面
		s.options[2].selected = true;
		document.getElementById('password').value=xxxxxx;--密码
		document.getElementById('login').click();
		"
	end tell
	delay 1
	close document 1
end tell
say "Wi-Fi连接成功"
```





```applescript
```
