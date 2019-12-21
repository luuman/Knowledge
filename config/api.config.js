/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * imgBaseUrl: 图片所在域名地址
 * development: 本地开发
 * release: 预发布版本
 * production: 线上版本
 */

let baseUrl = ''
let urlHttp = ''
const imgBaseUrl = ''
const json = require('~/package.json');
const port = json.config.nuxt.port;
if (process.env.PATH_TYPE === 'development') {
	urlHttp = `http://dev.m.yktour.com.cn:${port}`
  baseUrl = `${urlHttp}/development`
} else if (process.env.PATH_TYPE === 'release') {
	urlHttp = 'http://testnewm.yktour.com.cn'
	baseUrl = `/release`
} else if (process.env.PATH_TYPE === 'production') {
	urlHttp = 'https://newm.yktour.com.cn'
	baseUrl = `/api`
}

export {
	urlHttp,
  baseUrl,
  imgBaseUrl
}
