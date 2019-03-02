title: 兼容性解决方案整理
date: 2016-10-22 21:02:45
tags:
- 兼容性
- 前端库
---

移动互联网的今天，告别了ie6。

以下来自原先项目~~psc~~。~~psc~~已经删除，~~使用issues继续整理~~。相信这是一个更好的开始。整理到博客汇总。

<!--more-->

浏览器的兼容性问题是前端开发人员最头痛的，PCS 收集并整理完美兼容的解决方案。低版本浏览器添加过多的脚本或者更多的代码势必会带来性能，维护成本。其实PCS 并非是完美的解法办法，最完美的是浏览器本身符合[w3c标准](http://baike.baidu.com/view/459077.htm?fr=wordsearch)。当然这不现实，要不要所有浏览器都真的完全表现一样，其实还要视项目而定，或许我们可以选择[优雅降级](http://baike.baidu.com/view/1172014.htm)处理。凡是一切都在权衡。

## CSS/CSS3

### [Respond](https://github.com/scottjehl/Respond)


## [inline-block](http://ued.taobao.org/blog/2012/08/inline-block/)
    .dib-wrap {
        font-size:0;/* 所有浏览器 */
        *word-spacing:-1px;/* IE6、7 */
    }
    .dib-wrap .dib{
        font-size: 12px;
        letter-spacing: normal;
        word-spacing: normal;
        vertical-align:top;
    }
    @media screen and (-webkit-min-device-pixel-ratio:0){
        /* firefox 中 letter-spacing 会导致脱离普通流的元素水平位移 */
        .dib-wrap{
        letter-spacing:-5px;/* Safari 等不支持字体大小为 0 的浏览器, N 根据父级字体调节*/
        }
    }
    .dib {
        display: inline-block;
        *display:inline;
        *zoom:1;
    }

## [css3-gradient](http://www.w3cplus.com/content/css3-gradient)

1. [css3 渐变在线生成工具Ultimate CSS Gradient Generator](http://www.colorzilla.com/gradient-editor/)


## HTML/HTML5

## html5shiv
The [HTML5 Shiv](https://github.com/aFarkas/html5shiv) enables use of HTML5 sectioning elements in legacy Internet Explorer and provides basic HTML5 styling for Internet Explorer 6-9, Safari 4.x (and iPhone 3.x), and Firefox 3.x.

## [html5demos](https://github.com/remy/html5demos)
A collection of HTML5 experiments I've created, now open source and on GitHub, so please go ahead and help me hack this resource in to a wealth of demos that other authors can learn from.

## [HTML5-History-API](https://github.com/remy/html5demos)

## [video.js](https://github.com/videojs/video.js)

## [ jQuery-html5-placeholder](https://github.com/Topener/jQuery-html5-placeholder)

## [HTML5 Desktop Notifications](https://github.com/ttsvetko/HTML5-Desktop-Notifications)

## localstorage
[store.js](https://github.com/marcuswestin/store.js) exposes a simple API for cross browser local storage

## JavaScritp/ECMAScript
## es5-shim
[`es5-shim.js`](https://github.com/es-shims/es5-shim) and `es5-shim.min.js` monkey-patch a JavaScript context to
contain all EcmaScript 5 methods that can be faithfully emulated with a
legacy JavaScript engine.

## IE/IE6/IE7/IE8
### PIE
(PIE)(http://css3pie.com/) makes Internet Explorer 6-9 capable of rendering several of the most useful CSS3 decoration features.

通过脚本可以使得ie6/7/8/9 支持css3 的 border-radius、box-shadow、linear-gradient。


### [DD_belatedPNG](http://www.dillerdesign.com/experiment/DD_belatedPNG/)
This is a Javascript library that sandwiches PNG image support into IE6 without much fuss.



处理ie6不支持png24。


    DD_belatedPNG.fix('.png_bg, .png24'); // argument is a CSS selector
    DD_belatedPNG.fixPng( someNode ); // argument is an HTMLDomElement

#### 更多solution
1. [IE6 PNG透明终极解决方案（打造W3Cfuns-IE6PNG最强帖）](http://www.w3cfuns.com/thread-297-1-1.html)

### IE下 z-index的层级问题

#### 参考

1. [IE下 z-index 的各种坑](http://www.cnblogs.com/Darren_code/archive/2012/03/05/z-index.html)
2. [IE6下z-index犯癫不起作用bug的初步研究](http://www.zhangxinxu.com/wordpress/2009/12/ie6%E4%B8%8Bz-index%E7%8A%AF%E7%99%AB%E4%B8%8D%E8%B5%B7%E4%BD%9C%E7%94%A8bug%E7%9A%84%E5%88%9D%E6%AD%A5%E7%A0%94%E7%A9%B6/)
3. [IE6 IE7 IE8(Q) 中定位元素 'z-index' 为默认值在某些情况下会产生新的层叠上下文](http://www.w3help.org/zh-cn/causes/RM8015)


### ie6 不支持`positon: fixed`

#### 解决方案
1. [RM8013: IE6 IE7(Q) IE8(Q) 不支持固定定位（position:fixed）](http://www.w3help.org/zh-cn/causes/RM8013)
2. [完美解决IE6不支持position:fixed的bug](http://www.cnblogs.com/hooray/archive/2011/05/20/2052269.html)

### 透明度 opacity/rgba

opacity设置的透明度对子元素都有影响。ie可以使用 filter 处理

    .opacity{
        background: rgb(255,255,0);
        opacity: 0.4;
        filter:alpha(opacity=40);
    }


    .rgba{
        filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#7F000000', endColorstr='#7F000000');
    }
    :root  .rgba{
        filter:none;     /*处理IE9浏览器中的滤镜效果*/
        background-color:rgba(0,0,0,0.5);
    }

1. [BT9011: 只有 IE 支持 CSS Filter](http://www.w3help.org/zh-cn/causes/BT9011)
2. [CSS3 RGBA](http://www.w3cplus.com/content/css3-rgba)
3. [css3-rgba ie下可透明的背景颜色转换工具](http://www.linxz.de/css_tool/hex_color.html)

### ie6 max-width/max-height/min-height/min-width

    .maxh{ max-height:300px; _height: expression(this.scrollHeight >= 300? '300px' : 'auto');  }

    .maxw{ max-width: 300px; _width: expression(this.clientWidth >= 300 ? '300px' : 'auto'); }

    .minh{ min-height: 300px; height:auto !important; _height: 300px; }

    .minw{ min-width: 300px; _width: expression(this.clientWidth <= 300 ? '300px' : 'auto'); }

1. [让IE6支持min-width和max-width的方法](http://ziren.org/html-css/ie6-support-min-width-and-max-width.html)

## css3-mediaqueries-js
[css3-mediaqueries-js](http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js)

## ieBetter
[ieBetter.js-让IE6-IE8拥有IE9+,Chrome等浏览器特性](http://www.zhangxinxu.com/wordpress/2013/12/iebetter-js-make-ie6-ie8-like-modern-browser-ie9-chrome/)


