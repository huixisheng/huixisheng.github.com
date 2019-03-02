date: 2012-12-31 22:32:38
title :     项目中浏览器兼容性解决方法收集
description : 整理项目中碰到的浏览器兼容性问题，并提供相关解决办法。希望自己不再被浏览器兼容性问题所苦恼，也希望自己处理浏览器兼容问题时不再重复和头痛...
tags :
- 兼容性
---


整理项目中碰到的浏览器兼容性问题，并提供相关解决办法。希望自己不再被浏览器兼容性问题所苦恼，也希望自己处理浏览器兼容问题时不再重复和头痛。

<!-- more -->

## 问题列表 ##

### 1、 个人中心首页小发布框点击弹出发布框，在ie6下导致下面的Tabs上移，就是出现错位，点击旁边的Tabs切换就正常

问题回顾：

![IE下JS交互产生的定位重叠](http://huixisheng.qiniudn.com/ie6-jsclick-bug.jpg)

该问题出现当时完全想不到是为何，难道js交互也会导致CSS出现问题？为何切换了却是正常的。这个问题困恼了我好久。后来在张鑫旭大牛的博客看到一文[利用重绘解决IE下JS交互产生的定位重叠等棘手bug](http://www.zhangxinxu.com/wordpress/2013/01/js-paint-ie6-relative-ie8-inline-block-bug-fix/),受了启发，终于改了这个bug。

### 2、 IE6 inline-block使line-height失效

该问题很常见，解决的办法也很多。主要出现在左边是icon的图片，右边是文字，文字图片垂直居中。ie6解决办法：icon的margin-top  margin-bottom取（外侧容器的高度-icon的高度）/2  其他浏览器：`vertical-align:middle; margin-top:-3px`


### 3、 IE6 z-index失效

问题回顾：

![IE6 z-index失效](http://huixisheng.qiniudn.com/ie67-z-index-disable.png)

出现了好几次，印象最深的是做网站导航的统一的时候。消息的下拉框被设置了pr的下面的元素挡住了。解决办法：在你需要显示在上层的元素的含“position:relative”的父元素上添加“z-index”属性。具体参考[IE6下z-index犯癫不起作用bug的初步研究](http://www.zhangxinxu.com/wordpress/2009/12/ie6%E4%B8%8Bz-index%E7%8A%AF%E7%99%AB%E4%B8%8D%E8%B5%B7%E4%BD%9C%E7%94%A8bug%E7%9A%84%E5%88%9D%E6%AD%A5%E7%A0%94%E7%A9%B6/)

### 4、 IE6下弹出框被Select穿透

解决办法：1、弹出框添加iframe 2、select用js模拟

### 5、 IE6不支持最大高度最小高度最大宽度最小宽度

解决办法：1、CSS表达式 2、js控制

### 6、IE6下背景图片不缓存问题，背景图片会闪烁
    <!--[if IE 6]>
    <script>
        document.execCommand("BackgroundImageCache",false,true);
    </script>
    <![endif]-->

### 7、IE6、7设置了relative同时使用了滤镜会使得子元素绝对定位失效

### 8、FF、OP不支持`backgroud-position-x、backgroud-position-y`

### 9、使用[swfupload](http://demo.swfupload.org/v220/)多图上传插件。如果对按钮使用`hide` 方法。会导致`getStats()`方法失效。

### 10、input[type="submit"]和button[type="submit"]在IE6-7下会出现黑边。[大漠解决办法](http://www.w3cplus.com/css/remove-black-border-around-input-buttons-in-ie.html)。`input { filter:chroma(color=#000000);}`。但是如果给submit用filter设置了渐变，将会导致渐变丢失。一种解决办法：给submit外套个label，label设置边框。 submit border：none。



## 更新历史 ##
2016-10-22
- 文章格式修改
