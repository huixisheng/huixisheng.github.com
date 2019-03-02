title: 前端静态资源CDN公共库整理
date: 2017-12-02 17:06:42
tags:
- 前端工具
- cdn
- 前端资源
---

开放的CDN最好是速度快，库全，支持快速检索。本文将列举国内外常用的前端静态资源CDN公共库。用开发的CDN写写demo，体验新框架的语法，但是用到生成环境，还需谨慎。虽然方便，但是万一库挂了，被人恶意注意代码，用多了影响还是很大。


<!-- more -->

## jsDelivr
>Open Source CDN free, fast, and reliable

官方网址: [https://www.jsdelivr.com/](https://www.jsdelivr.com/)
GitHub仓库：https://github.com/jsdelivr/jsdelivr

支持`npm`仓库资源同步, `github` 资源同步，还支持`WordPress.org plugins`。就目前体验而言，速度还不错。提供相关的[CDN分析工具](https://www.cdnperf.com/)，支持combo合并，自动压缩资源，支持SRI。还有[DNS分析工具](https://www.dnsperf.com/) 功能不要太强大，如果访问速度不会因为xx被阻拦在门口，绝对是最佳选择。五星好评推荐。

## BootCDN ##
> 稳定、快速、免费的前端开源项目 CDN 加速服务。截止写这个文章共收录了 3245 个前端开源项目

官方网址: http://www.bootcdn.cn/

支持检索，速度还不错，但是就是相比[unpkg.com](https://unpkg.com/#/)资源欠缺。

## unpkg.com

官方网址: https://unpkg.com/#/

资源绝对丰富，同步npmjs.com。但是速度不行，可惜。同时不支持检索，当然检索可以用[https://www.npmjs.com/](https://www.npmjs.com/) 搜索替代。

## css.net ##
> 常用前端公共库 CDN 服务
常用前端公共库 & 和谐使用 Google 公共库、字体库的方法

官方网址: https://css.net/

## cdnjs.com ##

官网网址: http://cdnjs.com/


>静态资源`CDN`公共库是指一些服务商将我们常用的前端资源`JavaScript`,`CSS` 等前端静态资源存放在网上，方便直接引用，并且提供`CDN`加速服务，这样一来可以让用户加速访问这些资源，二来还可节约自己服务器的流量。本文介绍常用的前端静态资源CDN公共库。


## 什么是cdn ##

CDN的全称是`Content Delivery Network`，即内容分发网络。其基本思路是尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。通过在网络各处放置节点服务器所构成的在现有的互联网基础之上的一层智能虚拟网络，CDN系统能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。其目的是使用户可就近取得所需内容，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度。



## 其他 ##


- [又拍云JS库加速服务](http://jscdn.upai.com/)资源比较少
- [开放静态文件 CDN staticfile](http://staticfile.org/ )，[七牛云存储提供支持 GitHub](https://github.com/staticfile/static)
- [百度开发者中心CDN公共库](http://developer.baidu.com/wiki/index.php?title=docs/cplat/libs)
- [百度静态资源公共库](http://cdn.code.baidu.com/),[github地址](https://github.com/Clouda-team/baiducdnstatic)
- [新浪](http://lib.sinaapp.com/)
- [360网站卫士常用前端公共库CDN服务资源丰富](http://libs.useso.com/) 提供[Google公共库](http://ajax.googleapis.com)、[Google字体库](http://fonts.googleapis.com)替换服务有时在国外无法加载，导致网页加载被阻塞。推荐一个插件[gooreplacer](https://github.com/jiacai2050/gooreplacer#diy)一个用于替换网页中Google Fonts,API,themes
- [Google CDN](https://developers.google.com/speed/libraries/devguide?csw=1)
- [微软CDN](http://www.asp.net/ajaxlibrary/cdn.ashx)

## 2017-12-02 补充

知乎做的[https://unpkg.com/#/](https://unpkg.com/#/)的镜像 unpkg.zhimg.com。

饿了么做的[https://unpkg.com/#/](https://unpkg.com/#/)的镜像
npm.elemecdn.com。例 `https://npm.elemecdn.com/jquery@3.2.1/dist/jquery.min.js`

饿了么做的[https://unpkg.com/#/](https://unpkg.com/#/)的镜像

例外还有github.elemecdn.com。例如 https://github.elemecdn.com/eleme/ubt-web/1.3.4/ubt.min.js。规则没有琢磨透。

以上并没有开源，没有开发访问。不建议使用。

## 参考 ##


- [cdn 百度百科](http://baike.baidu.com/view/8689800.htm?fromId=21895&redirected=seachword)
- [国内有哪些靠谱的 Javascript 库 CDN可用？](http://www.zhihu.com/question/20227463)
- [程序员福利：常用的 JavaScript 库 CDN 加速服务](https://segmentfault.com/a/1190000000311560)
- https://zhanqi.net/post/170425/
- https://www.zhihu.com/question/20227463
- http://dyhdyh.com/archives/22.html

## 更新历史 ##

2016-10-21
- 合并[issue](https://github.com/huixisheng/lab/issues/1)整理的内容

