## EventLoop

[2分钟了解 JavaScript Event Loop | 面试必备](https://www.bilibili.com/video/BV1kf4y1U7Ln/?spm_id_from=333.788.videocard.2)

  console.log('5')                

//s6
setTimeout(function () {       
  console.log('6')                
});
//s4
setTimeout(function () {       
  console.log('4')                
});
// s789
  console.log('7')                
  new Promise(function (resolve) {
    setTimeout(function () {   
      console.log('8')            
    });
    resolve()
  }).then(function () {        
    setTimeout(function () {      
      console.log('9')
    });
  });

JavaScript Event Loop 原理？

JS是单线程，由调用栈（Call Stack）、微任务队列（Message Queue）、消息队列（Microtask Queue）组成。

1. 首先