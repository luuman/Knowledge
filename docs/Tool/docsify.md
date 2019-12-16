# [docsify](https://docsify.js.org/#/zh-cn/?id=docsify)
> 一个神奇的文档网站生成工具








- [ ] foo
- bar
- [x] baz
- [] bam <~ not working
  - [ ] bim
  - [ ] lim















docsify 是一个github上的开源项目：docsifyjs/docsify: 🃏 A magical documentation site generator.，可以用来编排文档，实际显示效果可以查看的官网：https://docsify.js.org/#/zh-cn/quickstart ，不过对于我来说，使用 docsify 最大的目的就是用来自建笔记本，本篇就以linux平台下以docsify自检笔记本应用为内容。

相比较于为知笔记、有道云笔记、印象笔记之类的专门笔记工具，docsify 的优势在于：

数据由自己掌控，甚至可以只部署在本地
样式任选，且界面美观
生成的网页简洁，而且可以离线缓存，可用chrome做成一个笔记本应用，linux下的“客户端”也就不成问题了
缺点：

没有独立客户端，毕竟docsify本来就是用来做网站文档的
没有2了
docsify使用markdown语法，最好是有已经写好而.md文件，这样便可以一开始就看到效果。

安装
本文以linux平台安装为例，先安装node.js，以下两行命令二选一：

1
2
3
curl https://raw.github.com/creationix/nvm/v0.33.11/install.sh | sh
# or
wget -qO- https://raw.github.com/creationix/nvm/v0.33.11/install.sh | sh
然后重启终端，再依次执行：

1
2
3
4
5
6
7
8
# 安装node.js
nvm install stable

# 安装docsify
npm i docsify-cli -g

# 初始化项目
cd /home/wenjinyu/ && docsify init ./notes
这样就在主目录下新建了一个notes文件夹，里面已经存放好必要的文件，运行下列命令就可以直接看到部署出来的效果了：

1
docsify serve notes
关于文件相互关系的说明
这个部分其实很重要，但在文档和网上的教程都没有系统说明，以下将踩过的坑整理出来，不保证一定正确，这只是我的理解。

README.md
按照上面的方法初次配置之后，在notes文件夹下只有两个文件：

1
2
3
notes/
├── index.html
└── README.md
index.html有两个作用：一是作为网站入口，也就是一开始打开网站时显示的loading页面，二是作为配置文件。
README.md即是网站根目录网页，也就是普通概念里网站的index.html
稍微有点绕，但不难理解。

网址
网址也是和目录层级一一对应的，路径就是网址：

1
2
3
notes/
├── index.html
└── README.md      =>  http://domain.com
需要注意的是，README.md文件应该视为index.html，如果要新建页面，那么直接新建一个.md文件，网址对应如下：

1
2
3
4
5
notes/
├── index.html
├── README.md      =>  http://domain.com
├── test.md        =>  http://domain.com/test
└── abc.md         =>  http://domain.com/abc
如果新建了文件夹，那么文件对应如下：

1
2
3
4
5
6
notes/
├── index.html
├── README.md       =>  http://domain.com
└── wenjinyu
    ├── README.md   =>  http://domain.com/wenjinyu
    └── test.md     =>  http://domain.com/wenjinyu/test
说白了，可以直接将已经写好的.md文件夹整个都放进notes文件夹里，网址就是域名加上文件路径，不过有一点需要注意：

http://domain.com/wenjinyu/test打开的是wenjinyu/test.md文件
http://domain.com/wenjinyu打开的是wenjinyu/READMD.md，所以放入已经写好的.md文件夹后，还要记得新建一个README.md文件作为文件夹的主网页，READMD.md的内容即是网页的显示内容。
添加功能
因为安装的是最简单的 docsify，所以安装完后有不少东西需要自己加。

加这些功能的方法需要引入对应的css或js文件，然后再在index.html文件中进行配置。以下是官方所提供的功能，在官方文档配置项 - docsify里已经说的很清楚，将需要的部分添加到index.html内即可，以下是我添加的内容，相关部分已经做了注释，没注释的基本是看一眼就能明白意思了：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
<script>
  window.$docsify = {
    // 加载侧边栏 _sidebar.md
    loadSidebar: true,
    subMaxLevel: 2,

    // 文档标题，会显示在侧边栏顶部
    name: '温锦瑜的笔记',
    // 点击文档标题后跳转的链接地址
    nameLink: '/',

    // 小屏设备下合并导航栏到侧边栏
    mergeNavbar: true,
  }
</script>
其中的侧边栏需要说明一下，_sidebar.md这个文件需要手动创建，内容也需要自己写，格式如下：

1
2
* 项目
* 项目
不过为了美观，可以在加个加粗的标题：

1
2
3
**标题**
* 项目
* 项目
自动隐藏侧边栏
如果需要自动隐藏侧边栏，需要添加：

1
<body class="close">
LaTeX
docsify的markdown本身并不支持LaTeX，不过github上已经有项目支持了：upupming/docsify-katex: KaTeX support for docsify，把下面一行加入</body>的前面：

1
<script src="//cdn.jsdelivr.net/npm/docsify-katex@latest/dist/docsify-katex.js"></script>
再把下面一行加入</head>的前面：

1
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css"/>
后文中凡是提到加入js文件的，都是加到</body>的前面，凡是加入css文件的，都是加入到</head前面，就不再赘述了。

代码高亮
docsify的代码块支持代码高亮，使用的工具是Prism，不过并没有保存高亮的支持文件，需要自行到Prims 仓库找到js文件，然后添加引用，格式如下：

1
2
<script src="//unpkg.com/prismjs/components/prism-bash.js"></script>
<script src="//unpkg.com/prismjs/components/prism-php.js"></script>
上面两行就是支持bash和php语法高亮，其他语法也是同理。

需要说明的一点是，CPP比较特殊，语法高亮需要额外添加两个文件：prism-c和prism-clike，之后要使用其他 CPP 语法高亮再另行添加，也就是说，任何 CPP 语法高亮都需要添加三行，以 CPP 为例：

1
2
3
<script src="//unpkg.com/prismjs/components/prism-c.js"></script>
<script src="//unpkg.com/prismjs/components/prism-clike.js"></script>
<script src="//unpkg.com/prismjs/components/prism-cpp.js"></script>
插件
全文搜索
docsify有不少插件支持，必不可少的全文搜索就是其中之一，加入这一功能也很简单：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
<script>
  window.$docsify = {
    // 搜索功能相关
    search: {
      maxAge: 86400000, // 过期时间，单位毫秒，默认一天
      paths: 'auto',
      placeholder: 'Type to search',
      noData: 'No Results!',
      depth: 6          // 搜索标题的最大程级, 1 - 6
    }
  }
</script>
...
<script src="//unpkg.com/docsify/lib/plugins/search.js"></script>
注意最后需要引用一个js文件。

点击复制
代码块右上角可以加入复制按钮，显示的提示也是可以自定义的：

1
2
3
4
5
6
7
8
9
10
<script>
  window.$docsify = {
    // 代码块点击复制
    copyCode: {
      buttonText : 'Copy',
      errorText  : 'Error',
      successText: 'Copied'
    }
  }
<script src="//unpkg.com/docsify-copy-code"></script>
分页导航
每页下方都可以显示一个上一章、下一章按钮，引入一个js文件即可：

1
<script src="//unpkg.com/docsify-pagination/dist/docsify-pagination.min.js"></script>
其他插件
docsify还有不少有用的插件，可以参考官方文档：https://docsify.js.org/#/zh-cn/plugins

总结
docsify不少功能都是直接引用一个js文件就能实现，如果只是作为本地使用，十分建议将js和css文件下载到本地后进行引用，这样就能完全脱离网络使用了，下面就是我正在用的配置：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>温锦瑜的笔记</title>
  <link rel="icon" href="favicon.ico">
  ...
  <link rel="stylesheet" href="./css/vue.css">
  <link rel="stylesheet" href="./css/katex.min.css"/>
</body>
</head>

<body class="close">
  <div id="app"></div>
  <script>
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

  </script>
  <script src="./js/docsify.min.js"></script>
  <script src="./js/search.js"></script>
  <script src="./js/docsify-copy-code.min.js"></script>
  <script src="./js/docsify-pagination.min.js"></script>
  <script src="./js/prism-c.js"></script>
  <script src="./js/prism-cpp.js"></script>
  <script src="./js/prism-clike.js"></script>
  <script src="./js/docsify-katex.js"></script>
</html>