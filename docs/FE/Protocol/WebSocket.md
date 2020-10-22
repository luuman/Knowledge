## 概况
HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议, WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。

> `HTTP`缺陷

通信只能由客户端发起。

> 特点
1. 服务器可以主动向客户端推送信息
1. 客户端也可以主动向服务器发送信息
1. 是真正的双向平等对话，属于服务器推送技术的一种

> 其他特点包括：

1. 建立在 TCP 协议之上，服务器端的实现比较容易。
1. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
1. 数据格式比较轻量，性能开销小，通信高效。
1. 可以发送文本，也可以发送二进制数据。
1. 没有同源限制，客户端可以与任意服务器通信。
1. 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。

HTTP
TCP/HTTP

HTTPS
TCP/TLS/HTTP

WS
TCP/WS

WSS
TCP/TLS/WS

## 示例

```
var ws = new WebSocket("wss://echo.websocket.org")
ws.onopen = function(evt) { 
  console.log("Web Socket 已连接上 ...") 
  <!-- 发送数据 -->
  ws.send("Hello WebSockets!")
}
ws.onmessage = function(evt) {
  <!-- 数据已接收 -->
  console.log( "Received Message: " + evt.data)
  ws.close()
}
ws.onclose = function(evt) {
  <!-- 连接已关闭 -->
  console.log("Connection closed.")
} 
```
   
## API

### 构造函数
WebSocket构造函数，构造实例

```
var ws = new WebSocket('ws://localhost:8080');
<!-- 执行上面语句之后，客户端就会与服务器进行连接。 -->
```

### 属性

#### readyState
返回实例对象的当前状态

CONNECTING：值为0，表示正在连接。
OPEN：值为1，表示连接成功，可以通信了。
CLOSING：值为2，表示连接正在关闭。
CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

```
WebSocket = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
}
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break
  case WebSocket.OPEN:
    // do something
    break
  case WebSocket.CLOSING:
    // do something
    break
  case WebSocket.CLOSED:
    // do something
    break
  default:
    // this never happens
    break
}
```
#### bufferedAmount

### 事件

open	Socket.onopen	连接建立时触发
message	Socket.onmessage	客户端接收服务端数据时触发
error	Socket.onerror	通信发生错误时触发
close	Socket.onclose	连接关闭时触发

```
ws.onerror = function(event) {
  // handle event
};

<!-- 如果要指定多个回调函数，可以使用addEventListener方法 -->
ws.addEventListener("error", function(event) {
  // handle event
});
```


#### onclose

```
ws.onclose = function(event) {
  <!-- 错误码 -->
  var code = event.code
  <!-- 断开原因 -->
  var reason = event.reason
  <!-- 是否正常断开 -->
  var wasClean = event.wasClean
}
```
```
0–999		保留段, 未使用.
1000	CLOSE_NORMAL	正常关闭; 无论为何目的而创建, 该链接都已成功完成任务.
1001	CLOSE_GOING_AWAY	终端离开, 可能因为服务端错误, 也可能因为浏览器正从打开连接的页面跳转离开.
1002	CLOSE_PROTOCOL_ERROR	由于协议错误而中断连接.
1003	CLOSE_UNSUPPORTED	由于接收到不允许的数据类型而断开连接 (如仅接收文本数据的终端接收到了二进制数据).
1004		保留. 其意义可能会在未来定义.
1005	CLOSE_NO_STATUS	保留. 表示没有收到预期的状态码.
1006	CLOSE_ABNORMAL	保留. 用于期望收到状态码时连接非正常关闭 (也就是说, 没有发送关闭帧).
1007	Unsupported Data	由于收到了格式不符的数据而断开连接 (如文本消息中包含了非 UTF-8 数据).
1008	Policy Violation	由于收到不符合约定的数据而断开连接. 这是一个通用状态码, 用于不适合使用 1003 和 1009 状态码的场景.
1009	CLOSE_TOO_LARGE	由于收到过大的数据帧而断开连接.
1010	Missing Extension	客户端期望服务器商定一个或多个拓展, 但服务器没有处理, 因此客户端断开连接.
1011	Internal Error	客户端由于遇到没有预料的情况阻止其完成请求, 因此服务端断开连接.
1012	Service Restart	服务器由于重启而断开连接.
1013	Try Again Later	服务器由于临时原因断开连接, 如服务器过载因此断开一部分客户端连接.
1014		由 WebSocket标准保留以便未来使用.
1015	TLS Handshake	保留. 表示连接由于无法完成 TLS 握手而关闭 (例如无法验证服务器证书).
1016–1999		由 WebSocket标准保留以便未来使用.
2000–2999		由 WebSocket拓展保留使用.
3000–3999		可以由库或框架使用.? 不应由应用使用. 可以在 IANA 注册, 先到先得.
4000–4999		可以由应用使用.
```

#### onmessage
服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）

```
ws.onmessage = function(event){
  if(typeof event.data === String) {
    console.log("Received data string");
  }
  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}
```
除了动态判断收到的数据类型，也可以使用binaryType属性，显式指定收到的二进制数据类型。

```
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};

// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};
4.6 webSocket.send()
实例对象的send()方法用于向服务器发送数据。

发送文本的例子。


ws.send('your message');
发送 Blob 对象的例子。


var file = document
  .querySelector('input[type="file"]')
  .files[0];
ws.send(file);
发送 ArrayBuffer 对象的例子。


// Sending canvas ImageData as ArrayBuffer
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);
4.7 webSocket.bufferedAmount
实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。


var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```

## IE问题
[websocket-demos](https://wdd.js.org/websocket-demos/)

> 如何在老上使用原生WebSocket？

web-socket-js是基于flash的技术，只需要引入两个js文件和一个swf文件，就可以让浏览器用于几乎原生的WebSocket接口。另外，web-socket-js还是需要在ws服务端843端口做一个flash安全策略文件的服务。

我自己曾经基于stompjs和web-socket-js，做WebSocket兼容到IE5, 当然了stompjs在低版本的IE上有兼容性问题, 而且stompjs已经不再维护了，你可以使用我fork的一个版本，地址是：https://github.com/wangduandu...[](https://github.com/wangduanduan/stomp-websocket/blob/master/lib/stomp.js)
主要是老版本IE在正则表达式行为方面有点异常。

```
// fix ie8, ie9, RegExp not normal problem
// in chrome the frames length will be 2, but in ie8, ie9, it well be 1
// by wdd 20180321
if (frames.length === 1) {
  frames.push('')
}
```

## 服务端的实现
常用的 Node 实现有以下三种。

[µWebSockets](https://github.com/uNetworking/uWebSockets)
[Socket.IO](https://socket.io/)
[WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)
[WebSocketd](http://websocketd.com/)

pywebsocket

安装 pywebsocket
在执行以上程序前，我们需要创建一个支持 WebSocket 的服务。从 pywebsocket 下载 mod_pywebsocket ,或者使用 git 命令下载：

git clone https://github.com/google/pywebsocket.git
mod_pywebsocket 需要 python 环境支持

mod_pywebsocket 是一个 Apache HTTP 的 Web Socket扩展，安装步骤如下：
解压下载的文件。

进入 pywebsocket 目录。

执行命令：

$ python setup.py build
$ sudo python setup.py install
查看文档说明:

$ pydoc mod_pywebsocket
开启服务
在 pywebsocket/mod_pywebsocket 目录下执行以下命令：

$ sudo python standalone.py -p 9998 -w ../example/
以上命令会开启一个端口号为 9998 的服务，使用 -w 来设置处理程序 echo_wsh.py 所在的目录。

现在我们可以在 Chrome 浏览器打开前面创建的 runoob_websocket.html 文件。如果你的浏览器支持 WebSocket(), 点击"运行 WebSocket"，你就可以看到整个流程各个步骤弹出的窗口，流程 Gif 演示：