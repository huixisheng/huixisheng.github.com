title: 项目中碰到的问题随笔
date: 2013-04-03 22:32:38
description: 很随便的记录项目中碰到的疑难杂症
tags:
- css
- JavaScript
- 总结
---


记录项目中的碰到的问题。有些问题来的太诡异。

<!-- more -->

## 同事的一段代码直接导致浏览器奔溃，找我解决。

    var arr1 = [0, 1, 2, 3];
    var arr2 = arr1;
    for(var i = 0; i < arr1.length; i++ ){
        if( arr1[i] != 1 ){
            arr2 = arr1.splice(i, 0, arr1[i]);
        }
    }

一开始觉得不可思议，断定代码有死循环。数组、对象、函数都是引用。[参考-javascript 变量两种类型——基本类型和引用类型](http://www.xiaoxiaozi.com/2009/05/22/588/)

## 自定义的Grunt插件调用异步的方法报错
解决办法：1. 报错的信息在谷歌中查找。PS:google 被墙，真是悲剧 2. 看grunt官网的说明文档 3. github 上找类似的插件怎么写。[插件地址](https://github.com/huixisheng/grunt-iAuto-upload)


## 论股堂项目碰到好几个重排一样的页面显示错位的bug

这种问题出现时是让人很头痛的，页面开始显示正常的，js操作某些dom后引起本来布局正常的结构出现错位。

## 对前端的文件添加了md5的时间戳如何保证后期的前端构建上传资源服务器是最新的文件
想到的解决办法：1. 通过同生成的文件对于MD5值的map文件对比，相同的文件不更新 2. 每次构建上传根据文件的生成的最新的文件 3. 通朱鹏讨论

方法1是最理想的，但是当时就是担心怕实现起来很困难。其实后来才发现很简单。方法2 明显是有缺陷的。最终方法1的确定肯定是归功于方法3.

碰到问题时，首先思路一定要清晰，对想到的问题的解决方法一定要去衡量它的可行性。


## 后台返回的ajax接口多一个空行，导致ie下ajax执行了error

1. 前端定位问题慢，对ajax接口的异常的欠考虑
2. 是否可以通过设置实现客户端的Debug调试

原因是： 接口的php文件最前面加了一个空行，伤不起的前端


## [百度编辑器](http://ueditor.baidu.com/)的展示慢
经排查是百度分享的js对页面会阻塞；同时百度编辑器的需要的静态资源下载很慢。

目前解决方案：
1. 对百度分享的js后移动[参考这里](http://share.baidu.com/help/optimization)
2. 添加编辑器的伪展示，使得编辑器的展示不会有抖动的效果

未来的方案：
使用[UMeditor](http://ueditor.baidu.com/website/umeditor.html)


## 使用了带 `bom` 的 `utf-8` 的编码文件在 nginx服务器 `doctype` 声明失效。
[参考「带 BOM 的 UTF-8」和「无 BOM 的 UTF-8」有什么区别？网页代码一般使用哪个？](http://www.zhihu.com/question/20167122)




## 内网缺少脚本生成的问题导致报错
很多时候一碰到问题不想马上问别人，希望尝试自己去解决先。现在后台的观念是问相关的开发人员来的快。通过解决报错，可以发现后台不少后台代码问题。比如一个函数明明返回的是`int`类型的，但却返回 `Array`。前端多懂点后台绝对是好事。


## 资讯评论的无法加载

原因分析：
资讯对获取pid做了缓存，导致根据seq jsonp 获取pid 永远为0。
现在的方案：
如果第一次获取pid为0，第二获取添加时间戳。
教训：

1. 浏览器上如果功能可以实现，客户端里面的网页不行的话，多半是缓存的问题。公司客户端浏览器的内核好换了
2. 要敢于定位问题的所在
3. 学习更多的知识，开阔视野，跟容易定位问题


## 使用了 `setInterval` 在ajax的回调中导致火狐浏览器http请求并发数量达到最大值，页面不再发轮训请求

本问题是同事碰到的，去排查这个问题的时候觉得不可以思议

## UC浏览器在文本框聚焦的时候修改了`hash`，导致弹出的键盘有收回去

同王海波一直研究了搜狐的直播，同样的实现思路，为何他的就是在uc下有问题，后来他排查到问题是修改了hash引起的。[朱鹏提供了一个修改方案](http://testm.10jqka.com.cn/mobile/info/gsrd/ask_v2.html)，webapp的`fixed`有好多的坑

## 360安全卫士浏览器屏蔽了`background-image`的url中含有 ad、gg路径的背景图片。也太任性化了吧。

[/images/article/360-ad-block.jpg]

## JSON2.js 同jquery冲突

[bug还原请在ie7下运行](http://huixisheng.github.io/lab/bug/json2-jquery-conflict.html)

    // json2.js 对原型进行重写
    String.prototype.toJSON =
    Number.prototype.toJSON =
    Boolean.prototype.toJSON = function (key) {
        return this.valueOf();
    };
    // 对boolean 进行for in会让 data[i] 获取原型上 toJSON的方法
    function test(){
        return true;
    }
    // 这样的写法虽然不太可能，但是 http://github.com/davgothic/AjaxFileUpload 就是出现
    var data = test();
    for(var i in data){
        $('input').attr('name', i).val(data[i]);
    }
原因周六查了一天，基本找到问题所在，由于js的功底不扎实，无法更详细的解释问题

## ie6下jsonp的callback不执行的bug

jsonp解决跨域问题是常用的方法。但是给a标签加了`href="javascript:;"`和     `href="javascript:void(0);"` 会不执行回调的神奇bug。

我的解决思路：
1. alert ajax的 success的返回的参数， ie6 不执行
2. alert ajax的 error的参数
3. 通过 fiddler 抓包，看回调函数有没有返回。有返回，但是不回调。我了个去
4. google ie6 jsonp 不执行回调
5. 去除a 标签的href，会执行回调
6. 但是有时候需要a的手型，在给绑定的事件上加`return false`。完美解决。

## ajax服务器端接收数据时"+"会丢失

jQuery的ajax通过get的方法传参数，如果参数含有`+、&`等，会导致内容丢失。
"+"号：JavaScript解析为字符串连接符，所以服务器端接收数据时"+"会丢失。
"&"：JavaScript解析为变量连接符，所以服务器端接收数据时&符号以后的数据都会丢失。
解决办法：ajax的data改为Object。以下是网上的方法：在传到服务端之前先将参数中的"+"和"&"符号都编码一下

    function filter(str){
        str = str.replace(/\+/g,"%2B");
        str = str.replace(/\&/g,"%26");
        return str;
    }


## JavaScript编码转换
常用的函数:使用`unescape()`对`escape()`编码的字符串进行解码`decodeURIComponent() `函数可对`encodeURIComponent()`函数编码的 URI 进行解码。`decodeURI()`函数可对 `encodeURI()`函数编码过的URI 进行解码。`encodeURIComponent`会对/也进行十六进制转义，而`encodeURI`不会。

`escape`的一个应用就是将中文转成`unicode`编码
    escape("悔惜晟").replace(/%/g, '\\')


## CSS强制英文、中文换行与不换行
`white-space:nowrap;` 强制不换行，都起作用
`white-space:pre-wrap;` 只对中文起作用，强制换行
项目中用来打散成串的英文

** 参考 **
[CSS强制英文、中文换行与不换行](http://zmingcx.com/css-compulsory-english-chinese-and-non-wrapping-line.html#)


## jQuery ajaxFileUpload.js 插件 ie9 下bug

    if(window.ActiveXObject) {
        if(jQuery.browser.version=="9.0"){
            var io = document.createElement('iframe');
            io.id = frameId;
            io.name = frameId;
        }else if(jQuery.browser.version=="6.0" || jQuery.browser.version=="7.0" ||
                jQuery.browser.version=="8.0"){
             var io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');
             if(typeof uri== 'boolean'){
                 io.src = 'javascript:false';
             }
             else if(typeof uri== 'string'){
                 io.src = uri;
             }
        }
    }

## textarea用jQ的html方法取不到值
使用val();但是百度之后又发现另一个问题，只是我在项目还没有碰到。[JQuery TextArea的取值与赋值问题](http://www.cnblogs.com/long_/archive/2010/07/28/1787124.html)

