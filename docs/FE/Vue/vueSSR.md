## Vue SSR

# 概念

> Web发展史

传统Web开发技术
asp.net php jsp

前后的分离
单页面应用
服务端渲染

> 优势

与传统`SPA`(单页应用程序 (Single-Page Application))相比，服务器端渲染 (SSR) 的优势主要在于：
1. 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
1. 更快的内容到达时间

> 权衡之处

1. 更多的服务器端负载
1. 涉及构建设置和部署的更多要求
1. 开发条件所限
1. 
1. 

需求
1. 服务端的负载变大，优化任务
1. 需要node相关知识
1. 服务端相关知识

# 原理

vue-server-renderer 渲染器
express 服务器

[Vue.js 服务器端渲染指南](https://ssr.vuejs.org/zh/)