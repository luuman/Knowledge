
# Menu


## setApplicationMenu 本地菜单 本地快捷键



 







var os = require('os')
console.log("默认临时文件夹：" + os.tmpdir())
console.log("CPU 的字节序：" + os.endianness())
console.log("操作系统的主机名：" + os.hostname())
console.log("操作系统名：" + os.type())
console.log("返回操作系统名：" + os.platform())
console.log("系统 CPU 架构：" + os.arch())
console.log("操作系统的发行版本：" + os.release())
console.log("操作系统运行的时间，以秒为单位：" + os.uptime())
console.log("一个包含 1、5、15 分钟平均负载的数组：" + os.loadavg())
console.log("系统内存总量，单位为字节：" + os.totalmem())
console.log("操作系统空闲内存量，单位是字节：" + os.freemem())
console.log("CPU/内核的信息：")
console.log(os.cpus())
console.log("网络接口列表：")
console.log(os.networkInterfaces())

默认临时文件夹：/var/folders/h9/88jb0z7s79n4wpy2d9gk_93h0000gn/T
CPU 的字节序：LE
操作系统的主机名：luuman.local
操作系统名：Darwin
返回操作系统名：darwin
系统 CPU 架构：x64
操作系统的发行版本：18.2.0
操作系统运行的时间，以秒为单位：1229391
一个包含 1、5、15 分钟平均负载的数组：13.15087890625,8.74609375,5.22314453125
系统内存总量，单位为字节：8589934592
操作系统空闲内存量，单位是字节：43700224
CPU/内核的信息：
[
  {
    model: 'Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz',
    speed: 2700,
    times: { user: 38633230, nice: 0, sys: 37118750, idle: 347621100, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz',
    speed: 2700,
    times: { user: 24201550, nice: 0, sys: 18020050, idle: 381126490, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz',
    speed: 2700,
    times: { user: 38664170, nice: 0, sys: 30081090, idle: 354602880, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz',
    speed: 2700,
    times: { user: 21985600, nice: 0, sys: 15457720, idle: 385904740, irq: 0 }
  }
]
网络接口列表：
{
  lo0: [
    {
      address: '127.0.0.1',
      netmask: '255.0.0.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '127.0.0.1/8'
    },
    {
      address: '::1',
      netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '::1/128',
      scopeid: 0
    },
    {
      address: 'fe80::1',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: 'fe80::1/64',
      scopeid: 1
    }
  ],
  en0: [
    {
      address: 'fe80::14b0:c710:4149:3d66',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: 'f4:5c:89:a4:c0:89',
      internal: false,
      cidr: 'fe80::14b0:c710:4149:3d66/64',
      scopeid: 5
    },
    {
      address: '192.168.6.207',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: 'f4:5c:89:a4:c0:89',
      internal: false,
      cidr: '192.168.6.207/24'
    }
  ],
  awdl0: [
    {
      address: 'fe80::fc75:beff:fe28:3ef3',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: 'fe:75:be:28:3e:f3',
      internal: false,
      cidr: 'fe80::fc75:beff:fe28:3ef3/64',
      scopeid: 7
    }
  ],
  utun0: [
    {
      address: 'fe80::652d:22b7:fc1d:f7dd',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: false,
      cidr: 'fe80::652d:22b7:fc1d:f7dd/64',
      scopeid: 11
    }
  ],
  utun1: [
    {
      address: 'fe80::7b7b:fc20:3436:c744',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: false,
      cidr: 'fe80::7b7b:fc20:3436:c744/64',
      scopeid: 12
    }
  ]
}




## node生成唯一设备id（node-machine-id）

舜岳 2019-12-25 10:10:48  2895  收藏
分类专栏： node.js
版权
npm安装：

npm install node-machine-id

yarn安装:

yarn add node-machine-id

//有 异步，同步 两种生成方式
import {machineId, machineIdSync} from 'node-machine-id';
 
// async await 同步使用方法
async function getMachineId() {
    let id = await machineId();
    ...
}

//也可以直接then执行下面操作id为生成的唯一id
machineId().then((id) => {
    ...
})

let id = machineIdSync()
// id = c24b0fe51856497eebb6a2bfcd120247aac0d6334d670bb92e09a00ce8169365
//original:如果为true，则返回计算机ID的原始值，否则返回哈希值（sha-256）
let id = machineIdSync({original: true})
// id = 98912984-c4e9-5ceb-8000-03882a0485e4
