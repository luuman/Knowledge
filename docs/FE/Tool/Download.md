## 原理
使用`window.URL.createObjectURL` 和`window.URL.revokeObjectURL method`和`blob`对象实现文件下载

精简版封装
```js
/**
 * 创建并下载文件
 * @param  {String} fileName 文件名
 * @param  {String} content  文件内容
 */
function saveAs(content, filename) {
    var link = document.createElement('a');
    var blob = new Blob([content]);
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(blob);
}
```

更好的封装

```js
var URL = window.URL || window.webkitURL;
function saveAs(blob, filename) {
	var type = blob.type;
	var force_saveable_type = 'application/octet-stream';
	if (type && type != force_saveable_type) { // 强制下载，而非在浏览器中打开
		var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
		blob = slice.call(blob, 0, blob.size, force_saveable_type);
	}
	var url = URL.createObjectURL(blob);
	var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	save_link.href = url;
	save_link.download = filename;

	var event = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
			view: window
		});
	save_link.dispatchEvent(event);
	URL.revokeObjectURL(url);
}
```
## 最佳方案
直接使用[FileSaver](https://github.com/eligrey/FileSaver.js/)库。也许在某些浏览器需要实现Blob对象可以使用Blob.js。（ps:IE10以下不支持注意兼容性）

```js
var oReq = new XMLHttpRequest();
// The Endpoint of your server 
var URLToPDF = "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";
// Configure XMLHttpRequest
oReq.open("GET", URLToPDF, true);
// Important to use the blob response type
oReq.responseType = "blob";
// When the file request finishes
// Is up to you, the configuration for error events etc.
oReq.onload = function() {
    // Once the file is downloaded, open a new window with the PDF
    // Remember to allow the POP-UPS in your browser
    var file = new Blob([oReq.response], { 
        type: 'application/pdf' 
    });
    
    // Generate file download directly in the browser !
    saveAs(file, "mypdffilename.pdf");
};
oReq.send();
```

```js
var URL = window.URL || window.webkitURL;
function saveAs(blob, filename) {
	var type = blob.type;
	var force_saveable_type = 'application/octet-stream';
	if (type && type != force_saveable_type) { // 强制下载，而非在浏览器中打开
		var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
		blob = slice.call(blob, 0, blob.size, force_saveable_type);
	}
	var url = URL.createObjectURL(blob);
	var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	save_link.href = url;
	save_link.download = filename;

	var event = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
			view: window
		});
	save_link.dispatchEvent(event);
	URL.revokeObjectURL(url);
}


var oReq = new XMLHttpRequest();
// The Endpoint of your server 
var URLToPDF = "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

// Configure XMLHttpRequest
oReq.open("GET", URLToPDF, true);

// Important to use the blob response type
oReq.responseType = "blob";
// When the file request finishes
// Is up to you, the configuration for error events etc.
oReq.onload = function() {
    // Once the file is downloaded, open a new window with the PDF
    // Remember to allow the POP-UPS in your browser
    var file = new Blob([oReq.response], { 
        type: 'application/pdf' 
    });
    
    // Generate file download directly in the browser !
    saveAs(file,'mypdffilename.pdf');
};

oReq.send();
```

# Git分支管理规范

## 分支概况

1. 主分支（保留分支）：master、release
1. 辅助分支（临时分支）： dev-*、bugfix-*、release-*

## 分支使用

 
### master 主分支

对应线上（正式环境）的代码，一旦版本上线由测试人员发送合并matser邮件，开发人员将对应上线tag版本合并至master分支。

 

### release 主分支

同 master 分支，预发环境通过之后，上线之前，合并 release 分支。

 

### dev-* 辅助分支

从 master 拉取，用于新需求（版本）开发

*号为版本号+期次号

 

### bugfix-* 辅助分支

从 master 拉取，用于快速修复线上Bug

*号为bug英文简称+期次号

 

### release-* 辅助分支

从 master 拉取，用于确保当前版本是基于线上最新版本迭代，可处理与线上代码存在的冲突。

任务辅助分支在测试环境通过之后，上预发环境之前，务必拉取一个 release-* 分支。

*号为对应的 dev-*  或 bugfix-* 的*
