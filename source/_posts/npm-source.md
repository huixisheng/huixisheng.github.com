---
title: npm相关资源整理
date: 2017-09-19 19:41:35
author:
  name: 悔惜晟
  link: http://huixisheng.github.io
tags:
- nodejs
- npm
---

> npm（全称Node Package Manager，即node包管理器）是Node.js默认的、以JavaScript编写的软件包管理系统。 - [来自wikipedia](https://zh.wikipedia.org/wiki/Npm)

本文首发在[美妆心得技术博客](https://cosmeapp.github.io/2017/09/19/npm-source/)，同步到前端开发者说博客。

## npm镜像 ##

```
$ npm config set registry "https://registry.npm.taobao.org"
```

其他镜像，用于提高安装速度，比如用`vue-cli`初始化项目。在`~/.npmrc`中添加如下配置

```
registry=https://registry.npm.taobao.org/
// https://registry.npmjs.org=true
// https://blog.niceue.com/front-end-development/using-domestic-npm-images.html=true
// http://www.cnblogs.com/huang0925/archive/2013/05/17/3083207.html=true
electron_mirror=https://npm.taobao.org/dist/electron/
sass_binary_site=https://npm.taobao.org/dist/node-sass
phantomjs_cdnurl=https://npm.taobao.org/dist/phantomjs
// https://gist.github.com/52cik/c1de8926e20971f415dd=true
chromedriver_cdnurl=https://npm.taobao.org/dist/chromedriver
disturl=https://npm.taobao.org/dist
operadriver_cdnurl=https://npm.taobao.org/mirrors/operadriver
selenium_cdnurl=https://npm.taobao.org/mirrors/selenium
node_inspector_cdnurl=https://npm.taobao.org/mirrors/node-inspector
// 自定义的npm scope
@x-scaffold:registry=https://registry.npmjs.org/
```

关于关于更多的镜像资料，可以参考我之前写的文章[国内镜像源整理](https://huixisheng.github.io/%2Fmirror%2F)


## npm包资源搜索 ##

[https://libraries.io/npm](https://libraries.io/npm) 相关资源的各种排行榜

[npms](https://npms.io/) A better and open source search for node packages

[recently updated packages](https://www.npmjs.com/browse/updated)

[npm 资源的cdn](https://unpkg.com/#/)

[整理的Top100](https://github.com/anvaka/npmrank/tree/master/sample)

[most depended-upon packages](https://www.npmjs.com/browse/depended)

[Top 30 NPM Packages for Node.js Developers 2016](https://colorlib.com/wp/npm-packages-node-js/)

[most depended-upon packages](https://www.npmjs.com/browse/depended)

## 包管理工具 ##

[pnpm](https://pnpm.js.org/) Fast, disk space efficient package manager

[cnpm](https://npm.taobao.org/) 淘宝 NPM 镜像

[yarn](https://yarnpkg.com/zh-Hans/)
> Yarn 对你的代码来说是一个包管理器， 它允许你使用并分享代码给全世界的开发者， Yarn 做这些快捷、安全、可靠，所以你不用担心什么。

设置国内镜像
```
$ yarn config set registry https://registry.npm.taobao.org --global
$ yarn config set disturl https://npm.taobao.org/dist --global
```

这个facebook应该不会加类似React的协议吧？

会生成一个`yarn.lock`锁定依赖。

优点(摘自官网)

- 离线模式
- 确定性
- 网络性能
- 相同的软件包
- 网络适应
- 扁平模式

例外有看到社区

[「CYarn」使用 cnpm 源的 Yarn](https://cnodejs.org/topic/57ff0541487e1e4578afb48d)

[smart-npm](https://github.com/qiu8310/smart-npm/) 在各大社区发布后，就没看到更多了。

[npx: npm 5.2.0 内置的包执行器](https://zhuanlan.zhihu.com/p/27832595)

推荐阅读

- [一文看懂npm、yarn、pnpm之间的区别](http://geek.csdn.net/news/detail/197339)
- [Yarn vs npm：你需要知道的一切](https://zhuanlan.zhihu.com/p/23493436)
- [更多npm与yarn的性能对比](https://github.com/pnpm/node-package-manager-benchmark)
- [npm 5.0 新版功能特性解析及与 yarn 评测对比](https://mp.weixin.qq.com/s/9BGiuO-clwe4AAlV9Puqng)
- [npm、bower、jamjs 等包管理器，哪个比较好用？](https://www.zhihu.com/question/24414899)
- [如何评价Facebook推出的JavaScript模块管理器yarn？](https://www.zhihu.com/question/51502849)
- [在中国，安装 & 升级 npm 依赖的正确方法]()

## 文档 ##

- [https://docs.npmjs.com/](https://docs.npmjs.com/)
- [semver语义化版本 2.0.0](http://semver.org/lang/zh-CN/)
- [Npm的配置管理及设置代理](http://www.cnblogs.com/huang0925/archive/2013/05/17/3083207.html)


## 依赖升级 ##

见 [npm update [-g] [<pkg>...]](https://docs.npmjs.com/cli/update)

[npm-check-updates](https://www.npmjs.com/package/npm-check-updates)

[npm-check](https://github.com/dylang/npm-check)
> Check for outdated, incorrect, and unused dependencies.

![](/images/npm/npm-check.jpeg)

相关的介绍可以参考[Node.js开源项目推荐：npm模块升级工具 npm-check](https://cnodejs.org/topic/5705cd70c5f5b4a959e9192a)

### 扩展阅读 ###
- [如何将package.json中的每个依赖关系更新为最新版本？](https://gxnotes.com/article/12726.html)

## Node升级 ##
### [n](https://github.com/tj/n)  ###
> Node.js version management: no subshells, no profile setup, no convoluted API, just simple.

### [nvm](https://github.com/creationix/nvm) ###
> Node Version Manager - Simple bash script to manage multiple active node.js versions

## 其他 ##

[Cost of modules](https://github.com/siddharthkp/cost-of-modules)
>Find out which of your dependencies is slowing you down

![](https://raw.githubusercontent.com/siddharthkp/cost-of-modules/master/screenshot.jpg)

[https://github.com/sindresorhus/awesome-npm](https://github.com/sindresorhus/awesome-npm)

[【译】用8个 npm 技巧打动你的同事](https://juejin.im/post/59256b6f8d6d810058045336)