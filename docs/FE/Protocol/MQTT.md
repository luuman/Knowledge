## WebSocket
服务端主动给客户端发送消息的技术。


WebSocket 协议本质上是一个基于 TCP 的协议。为了建立一个 WebSocket 连接，客户端浏览器首先要向服务器发起一个 HTTP 请求，这个请求和通常的 HTTP 请求不同，包含了一些附加头信息，其中附加头信息 ”Upgrade: WebSocket” 表明这是一个申请协议升级的 HTTP 请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。

## MQTT
是基于发布/订阅模式的物联网通信协议，凭借简单易实现、支持 QoS、报文小等特点，占据了物联网协议的半壁江山。

> 身份

1. 发布者（Publish）
1. 代理（MQTT Broker）
1. 订阅者（Subscribe）
发布者、订阅者都是设备，角色可以互换。代理设备为服务器，启着消息转发的工作。

```Mermaid
graph TB
    subgraph 发布者
    s4(发布者)
    end
    subgraph MQTT Broker
    Broker
    end
    subgraph 设备
    Broker --> |订阅推送 Subscribe|s1(订阅者)
    Broker --> |订阅推送 Subscribe|s2(订阅者)
    s3 --> |发布订阅 Publish|Broker
    Broker --> |订阅推送 Subscribe|s3(发布者)
    end
    s4 --> |发布 Publish|Broker(消息代理)
```
### Topics

### 发布服务质量QoS
> 至多一次

消息发布完全依赖底层TCP/IP网络。会发生消息丢失或重复。这一级别可用于如下情况，环境传感器数据，丢失一次读记录无所谓，因为不久后还会有第二次发送。这一种方式主要普通APP的推送，倘若你的智能设备在消息推送时未联网，推送过去没收到，再次联网也就收不到了。

> 至少一次

确保消息到达，但消息重复可能会发生。

> 只有一次

确保消息到达一次。在一些要求比较严格的计费系统中，可以使用此级别。在计费系统中，消息重复或丢失会导致不正确的结果。这种最高质量的消息发布服务还可以用于即时通讯类的APP的推送，确保用户收到且只会收到一次。


### 数据传输
主题（Topic）和负载（payload）

> Topic

可以理解为消息的类型，订阅者订阅（Subscribe）后，就会收到该主题的消息内容（payload）；

> payload

可以理解为消息的内容，是指订阅者具体要使用的内容。




### 如何发布消息后拿到消息


## MQTT

### 使用
```
import mqtt from 'mqtt'
const host = 'mqtt://bj-pt-prd-vpn.reworldgame.com:1883'
const options = {
  <!-- 设置0禁用，缓存 -->
  keepalive: 30,
  clientId: 'app20191009111001380400',
  <!-- 协议ID -->
  protocolId: 'MQTT',
  <!-- 协议版本 -->
  protocolVersion: 4,
  clean: true,
  <!-- 重新连接周期 -->
  reconnectPeriod: 1000,
  <!-- 连接超时 -->
  connectTimeout: 30 * 1000,
  <!-- 登录的用户名 -->
  username: '20191009111001380400',
  password: 'aOFohUK4e3zIT8Hr3Cyu5/D+tMWOk51WgKHLV6Vc3g1S0pm2VINjIfkOZUUXxPo/4f5tMdYFa5499sKO8wMV0he6r3wFQvRsrdPyjJ+Gqti8x0E5TuTOXwsus9flnZQL0KL6oWUGPm4onvkaY2A8fwDkb0C7osxD/1Lp6p6Fsn4w0PGFwBaFFL7HEfTfEmEH',
  <!-- 断开连接，自动发送消息 -->
  will: {
    <!-- 主题 -->
    topic: 'WillMsg',
    <!-- 发送信息 -->
    payload: 'Connection Closed abnormally..!',
    <!-- 服务质量 -->
    qos: 0,
    <!-- 保留标志 -->
    retain: false
  },
  rejectUnauthorized: false
}
```

如果需要mqtts（mqtt over tls），则将options对象传递给tls.连接(). 如果使用的是自签名证书，请传递`rejectUnauthorized:false`选项。请注意，您将自己暴露在中间人攻击中，因此不建议在生产环境中使用这种配置。

#### 建立连接
```
const client = mqtt.connect(host, options)
client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})
```

#### 重新连接
```
client.on('reconnect', () => {
  console.log('Reconnecting...')
})
```

#### 订阅消息
```
client.subscribe('testtopic/electron', {
  qos: 0
})

client.on('message', (topic, message, packet) => {
  <!-- Topic -->
  console.log(topic)
  console.log(message)
  console.log(packet)
})
```
#### 发送消息

```
client.publish(topic, message, options, callback)

client.publish('LRM', JSON.stringify(LRMs), {
  qos: 1,
  retain: false
}, (error, res) => {
  if (error) {
    console.log('Subscribe to topics error', error)
    return
  }
  console.log('Subscribe to topics res', res, res.payload.toString())
})
```
> options

1. qos 
1. retain
1. dup 默认false，
1. properties 属性，MQTT 5.0
  a. payloadFormatIndicator
  a. messageExpiryInterval
  a. topicAlias
  a. responseTopic
  a. correlationData
  a. userProperties
  a. subscriptionIdentifier
  a. contentType
1. cbStorePut 发送完成，如果QoS为1或2，则在将消息放入outgoingStore时激发。

> callback

回调函数（err），在QoS处理完成时激发，如果QoS为0，则在下一次滴答时激发。如果客户端断开连接，则发生错误。

#### 
```
```

### publish原理


```Mermaid
graph TB
    subgraph Main.js
    publish
    end
    subgraph MQTT.js
    publishs(prototype.publish)
    _storePacket(_storePacket)
    _write(writable._write)
    work(work)
    _handlePacket(prototype._handlePacket)
    _handleAck(prototype._handleAck)
    outgoingStore(this.outgoingStore.del)
    end
    publish --> publishs --> |1|_storePacket --> |buf|_write --> |buf|work --> |buf|_handlePacket --> |buf|_handleAck --> |callback|outgoingStore
```

## 扩展资料

[MQTT](https://mcxiaoke.gitbook.io/mqtt/)

[]()

[]()

[]()

[]()

[]()