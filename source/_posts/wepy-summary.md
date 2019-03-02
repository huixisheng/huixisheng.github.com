title: 使用wepy开发小程序总结
date: 2018-04-07 10:55:35
tags:
- wepy
- 小程序
---

使用[wepy](https://tencent.github.io/wepy/)开发小程序效率提升了很多，相比使用小程序原生框架开发，开发体验提升了好几个等级。如果是从[Vue](https://github.com/vuejs/vue)过来的，可能会对[wepy](https://tencent.github.io/wepy/)部分语法不熟悉，导致自己掉进想当然(Vue习惯的写法)的坑里，所以还是要熟读[wepy](https://tencent.github.io/wepy/)的[文档](https://tencent.github.io/wepy/document.html#/)，理解一些新的概念。我个人觉得[wepy](https://tencent.github.io/wepy/)是类Vue。[mpvue](https://github.com/Meituan-Dianping/mpvue)跟Vue更加亲一些。当然还是要感谢作者[@Gcaufy](https://github.com/Gcaufy)提供这么好的框架，这也是为何个人项目会收入到公司项目的原因吧。

<!-- more -->

>WePY 是一款让小程序支持组件化开发的框架，通过预编译的手段让开发者可以选择自己喜欢的开发风格去开发小程序。框架的细节优化，Promise，Async Functions的引入都是为了能让开发小程序项目变得更加简单，高效。

## 环境配置 ##
```
$ npm install wepy-cli -g
$ wepy init standard
$ npm install
$ wepy build --watch
```

使用微信开发者工具导入项目，**关闭ES6 转 ES5**


## 问题 ##

微信小程序 button 去除 border
- https://blog.csdn.net/Wu_shuxuan/article/details/78209125
- https://www.cnblogs.com/miu-key/p/7156070.html
- https://www.jianshu.com/p/2e5ce95c213e

wepy-plugin-image

无法转换
  // function createDemoComponents(prefix, component, lenght) {
  //   const components = {}
  //   for (let i = 0; i < lenght; i++) {
  //     const key = prefix + i
  //     components[key] = component
  //   }
  //   return components
  // }

  // const demoComponents = createDemoComponents('btn', DoButton, 10)
  // console.log(demoComponents)


// 组件无效
<view class="{{classes}}"><slot></slot></view>


 1:1   error  Resolve error: plugins.forEach is not a function  import/no-unresolved
  1:1   error  Resolve error: plugins.forEach is not a function  import/no-extraneous-dependencies
  1:1   error  Resolve error: plugins.forEach is not a function  import/no-duplicates
  1:1   error  Resolve error: plugins.forEach is not a function  import/extensions
  1:1   error  Resolve error: plugins.forEach is not a function  import/no-named-as-default
  1:1   error  Resolve error: plugins.forEach is not a function  import/no-named-as-default-member
  1:19  error  Unable to resolve path to module 'utils/service'  import/no-unresolved


  repeat
  不支持添加 @tap

  wepy input 数据绑定
  - https://github.com/Tencent/wepy/issues/321

less import  路径  alias
https://www.google.com/search?q=wepy+less+import&oq=wepy+less+import&aqs=chrome..69i57.628j0j4&sourceid=chrome&ie=UTF-8


1. 小程序 media 支持
2. image mode background-size
3. wepy 图片上传资源服务器
4. base64支持
5. twoWay: true ？双向绑定？

小程序 canvas如何隐藏  display: none; 可行

## 周边工具 ##
- https://github.com/wdfe/weweb
- https://chemzqm.github.io/wept/#/home?id=%E7%AE%80%E4%BB%8B
## 方案对比 ##

### dowe ###

### vue2mina ###

### labrador ###


## 资源 ##
- [awesome-wepy](https://github.com/aben1188/awesome-wepy)
- [mpvue](https://github.com/Meituan-Dianping/mpvue)

## 参考文档 ##
- [小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/MINA.html)
- [微信小程序组件化开发框架WePY官方文档](https://tencent.github.io/wepy/document.html#/)