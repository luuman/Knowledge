# [docsify](https://docsify.js.org/#/zh-cn/?id=docsify)
> 一个神奇的文档网站生成工具


## 安装
```
nvm install stable
```

>安装docsify

```
npm i docsify-cli -g
```

>初始化项目

cd /home/wenjinyu/ && docsify init ./notes
这样就在主目录下新建了一个notes文件夹，里面已经存放好必要的文件，运行下列命令就可以直接看到部署出来的效果了：

docsify serve notes

```html
window.$docsify = {
  // 加载侧边栏 _sidebar.md
  loadSidebar: true,
  subMaxLevel: 2,

  // 文档标题，会显示在侧边栏顶部
  name: 'notes',
  // 点击文档标题后跳转的链接地址
  nameLink: '/',

  repo: '',

  // 入口文件，默认为README.md
  homepage: '',

  // 切换页面后是否自动跳转到页面顶部，默认false
  auto2top: '',

  // 封面页，默认加载 _coverpage.md
  //coverpage: 'cover.md',

  // 小屏设备下合并导航栏到侧边栏
  mergeNavbar: true,

  // 在找不到指定页面时加载 _404.md
  //notFoundPage: true

  search: {
    maxAge: 86400000, // 过期时间，单位毫秒，默认一天
    paths: 'auto',
    placeholder: 'Type to search',
    noData: 'No Results!',
    depth: 6          // 搜索标题的最大程级, 1 - 6
  },

  // 点击复制
  copyCode: {
    buttonText : 'Copy',
    errorText  : 'Error',
    successText: 'Copied'
  }
}
```

## 插件安装

### 流程图

```html
<script type="text/javascript" src="//unpkg.com/mermaid/dist/mermaid.min.js"></script>


plugins: [
  function(hook, vm) {
    hook.ready(function () {
      mermaid.initialize({startOnLoad: false});
    });
    hook.doneEach(function () {
      mermaid.init(undefined,'.mermaid');
    });
  }
],
markdown: {
  renderer: {
    code: function(code, lang) {
      console.log(lang)
      var html = '';
      if(code.match(/^sequenceDiagram/) || code.match(/^graph/) || code.match(/^gantt/)){
        html = '<div class="mermaid">' + code + '</div>';
      }
      var hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)
      return html + '<pre v-pre data-lang="' + lang + '"><code class="lang-' + lang + '">' + hl + '</code></pre>'
    }
  }
},
```

### katex

```html
<!-- CDN files for docsify-katex -->
<script src="//cdn.jsdelivr.net/npm/docsify-katex@latest/dist/docsify-katex.js"></script>
<!-- or <script src="//cdn.jsdelivr.net/gh/upupming/docsify-katex@latest/dist/docsify-katex.js"></script> -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css"/>
```

### 代码高亮
```html
<!-- 代码高亮 -->
<script src="//unpkg.com/prismjs/components/prism-bash.js"></script>
<script src="//unpkg.com/prismjs/components/prism-php.js"></script>
<script src="//unpkg.com/docsify-pagination/dist/docsify-pagination.min.js"></script>
```

### 全文搜索
```html

search: {
  maxAge: 86400000, // 过期时间，单位毫秒，默认一天
  // paths: auto, // or 'auto'
  placeholder: '搜索',
  noData: '找不到结果!',
  // 搜索标题的最大程级, 1 - 6
  // depth: 3
},
// 搜索功能相关
search: {
  maxAge: 86400000, // 过期时间，单位毫秒，默认一天
  paths: 'auto',
  placeholder: 'Type to search',
  noData: 'No Results!',
  depth: 6          // 搜索标题的最大程级, 1 - 6
}

<!-- 全文搜索 -->
<script src="//unpkg.com/docsify/lib/plugins/search.js"></script>
<script src="//unpkg.com/docsify/lib/plugins/ga.js"></script>
<script src="//unpkg.com/docsify-copy-code"></script>
```

### 图片缩放
```html
<!-- 图片缩放 -->
<script src="//unpkg.com/docsify/lib/plugins/zoom-image.js"></script>
```



- [x] 流程图
- [x] katex
- [x] 代码高亮
- [x] 全文搜索
- [x] 图片缩放

