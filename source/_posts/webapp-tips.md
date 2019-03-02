title: 项目碰到的问题整理
date: 2016-12-04 09:33:15
tags:
---
- 兼容性
- 项目总结
- webapck
- sticky
- Vue
---

近期做的项目零零散散的问题的总结。主要是使用webpack,vue碰到的问题。

<!-- more -->

## 条件判断优化 ##

当逻辑一复杂，下面的代码就会显得很懊糟，难以维护。
```
<button class="jfbtn jfbtn-disable jfbtn-block" v-show="detail.btn_info.type == 'disable'" v-text="detail.btn_info.text"></button>
<button class="jfbtn jfbtn-disable jfbtn-block" @click="btnAction" v-show="detail.btn_info.type == 'alertable'" v-text="detail.btn_info.text"></button>
<button class="jfbtn jfbtn-primary jfbtn-block" @click="exchangeBtn" v-show="detail.btn_info.type == 'clickable'" v-text="detail.btn_info.text"></button>
<button node-type="countdown-btn" class="jfbtn jfbtn-disable jfbtn-block" v-show="detail.btn_info.type == 'countdown'"></button>
```

```
<button @click="btnClick" :class="btnClass" v-text="btn_info.text"></button>
```

绑定class配合计算属性使得代码逻辑很清新。

```
computed: {
  btnClass () {
    return {
      'jfbtn': true,
      'jfbtn-block': true,
      'jfbtn-disable': this.showBtnDisableClass,
      'jfbtn-primary': this.showBtnPrimaryClass
    };
  },
  showBtnDisableClass () {
    const type = this.btn_info.type;
    if (type === 'disable' || type === 'alertable'
      || type === 'countdown' || type === 'auth_check') {
      return true;
    }
    return false;
  },
  showBtnPrimaryClass () {
    const type = this.btn_info.type;
    return type === 'clickable';
  }
},
```


## .vue组件$mount报错

按如下方式挂载组件
```
import Vue from 'vue';
import Detail from './views/detail';
import './common';
const cDetail = Vue.extend(Detail);
new cDetail().$mount('#app');
```

报错`Cannot read property 'tagName' of null `。跟踪代码进行调试，并没有找到问题所在。挂载组件的方式不对，还是打包配置不对，导致生成的组件有问题？尝试不同版本的`Vue`写简单的组件去挂载并没有什么问题。`cDetail`配合`vue-router`使用也是没有问题的。单独挂载就是会报错。后面发现`.vue`文件多个结构没有容器包含引起的。

```
<template>
<div class="x1">内容1</div>
<div class="x2">内容2</div>
</template>
<script>
  ...
</script>
```

修改如下:
```
<template>
<div>
  <div class="x1">内容1</div>
  <div class="x2">内容2</div>
</div>
</template>
<script>
  ...
</script>
```

- https://github.com/vuejs/vue/issues/3212

## 使用vue-router导致app里面的网页title无法修改
ios微信6.3.31测试通过,但是在美妆心得app中不行
```
route: {
  data () {
    // document.title = '往期秒杀';
  }
},
```


```
const iframeLoad = function (src) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = src;
  document.body.appendChild(iframe);
  iframe.addEventListener('load', function () {
    setTimeout(function () {
      iframe.remove();
    }, 0);
  });
};
router.afterEach(function (transition) {
  document.title = transition.to.title || '积分商城';
  // https://segmentfault.com/a/1190000006712234?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io
  if (F.UA.cosmeapp) {
    iframeLoad('/favicon.ico');
  }
});
```

参考

- https://github.com/miaolz123/vue-helmet/issues/3
- http://silverd.cn/2016/05/14/vue-first-project.html
- https://segmentfault.com/a/1190000006712234?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io
- https://gist.github.com/wszgxa/48eefb02650ea011ab28a116643890a9
- https://segmentfault.com/a/1190000007387556

## express配置post请求接口
```
app.post('/mock/new-task-price.json', function (req, res) {
  res.send('{"status": "1","msg": "成功领取积分奖励, 请在积分明细中查看哦!"}');
});
```

## webpack添加模拟请求
```
proxyTable: {
  '/api/credit/index': {
    target: host + '/mock/api_credit_index.json',
    changeOrigin: true,
    pathRewrite: {
      '^/api/credit/index': ''
    }
  },
}
```

## webpack入口页面设置标题

```
<!DOCTYPE html>
<html>
  <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```
```
new HtmlWebpackPlugin({
  filename: 'index.html',
  // 必须是.ejs结尾的文件，.html的文件不会解析。或者模板的loader
  template: 'index.ejs',
  title: '积分商城',
}),
```

- https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md
- [webpack多页应用架构系列（十二）：利用webpack生成HTML普通网页&页面模板](http://www.html-js.com/article/shiyongzhishang-webpackduoyeyingyongjiagouxilieshierliyongwebpackshengchengHTMLputongwangyeyemianmoban%203784)

## webpack多页面入口配置
添加多个enter
```
entry: {
  index: './src/index.js',
  detail: './src/detail.js'
},
```
配置多个`HtmlWebpackPlugin`
```
new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'index.ejs',
  inject: true,
  title: '积分商城',
  minify: {
    removeComments: true,
    collapseWhitespace: true
  },
  chunks: ['index']
}),
new HtmlWebpackPlugin({
  filename: 'detail.html',
  template: 'index.ejs',
  inject: true,
  title: '商品详情',
  minify: {
    removeComments: false,
    collapseWhitespace: false
  },
  chunks: ['detail']
}),
```
入口文件和模板文件可以采用遍历的目录，这样就不要单独一个个配置。

多页面配置扩展阅读

- https://github.com/lpreterite/multiple-page-vue-webpack-example
- https://github.com/yaoyao1987/vue-cli-multipage
- https://github.com/cnu4/Webpack-Vue-MultiplePage
- http://xjinjin.net/2016/08/20/webpack-multiple-page-static/

## `position: sticky`失效
原因是`html, body{ overflow: auto }`

最初是想实现滚动某个位置的时候导航滚定在顶部。给相关的滚动元素绑定`scroll`事件快速滑动的时候存在细微的抖动效果。尝试了`touchmove touchend`等事件、`_.throttle`函数节流，结果还是不顺畅。发现[淘宝的淘金币页面](https://h5.m.taobao.com/app/tjb/www/index3.html?locate=icon-8&spm=a215s.7406091.icons.8&scm=2027.1.2.1004)却是丝般丝般顺滑。导致是用了什么黑科技，看下源码

```
var n = $(window)
  , i = function o(t) {
    var e = $(t.el)
      , i = this;
    i.top = t.top || 0;
    var o = "static";
    if (e.css({
        position: "-webkit-sticky",
        top: i.top + "px",
        zIndex: 1e3
    }),
    "boolean" != typeof t.isStatic || t.isStatic || (o = e.css("position")),
    "string" == typeof t.addStickyClass && (i.addStickyClass = t.addStickyClass),
    e.length > 0 && e.css("position").indexOf("sticky") == -1) {
        var r, a;
        !function() {
            var t = function s() {
                n.scrollTop() > i.ScrollTop ? (r.show(),
                i.addStickyClass && e.addClass(i.addStickyClass),
                e.css("position", "fixed")) : (r.hide(),
                i.addStickyClass && e.removeClass(i.addStickyClass),
                e.css("position", o))
            };
            i.nav = e,
            i.setPlaceHolder(),
            r = i.placeHolder,
            i.ScrollTop = e.offset().top,
            setTimeout(function() {
                i.ScrollTop = e.offset().top - i.top
            }, 10),
            a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(t) {
                setTimeout(t, 1 / 60 * 1e3)
            }
            ,
            n.on("scroll", function() {
                a(t)
            })
        }()
    }
};
```
原来顺滑用的是`sticky`。然而由于项目之前用的是`html,body{overflow: hidden;}`,改成了`html, body{ overflow: auto }`。结果我修改代码用上`sticky`就悲剧了。

>已知的几个问题，外层overflow设置成auto,scroll,hidden会失效。 -http://wenbinzhou.lofter.com/post/65a3d_6f55339

### javascript检测是否支持
- 来自https://segmentfault.com/a/1190000007183209?_ea=1288008
```
if (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky")) {
    // 支持 sticky
}
```
或者
- 来自 http://efe.baidu.com/blog/position-sticky/
```
function isSupportSticky() {
    var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
    var stickyText = '';
    for (var i = 0; i < prefixTestList.length; i++ ) {
        stickyText += 'position:' + prefixTestList[i] + 'sticky;';
    }
    // 创建一个dom来检查
    var div = document.createElement('div');
    var body = document.body;
    div.style.cssText = 'display:none;' + stickyText;
    body.appendChild(div);
    var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
    body.removeChild(div);
    div = null;
    return isSupport;
}
```


### 绑定scroll事件在ios设备不顺畅原因
- 来自 http://feg.netease.com/archives/377.html
>上面这种方法在chrome模拟手机浏览器的表现很好，但是在移动端浏览器上粘顶的效果就没有那么平滑，尤其是在ios设备上，ios下的浏览器会在页面滚动的时候，暂停所有js的执行，直到滚动停止才会继续去执行js（注意暂停了所有js的执行，所以考虑用setTimeout或setInterval也是没有用的）。所以页面滚动时，scroll事件在iOS的浏览器下并不会持续被触发，而是在页面滚动停止后，才会去触发一次scroll事件。

### sticky满足以下条件才能生效
- 来自 http://www.ghugo.com/position-sticky-how-to-use/
>1、具有sticky属性的元素，其父级高度必须大于sticky元素的高度。
2、sticky元素的底部，不能和父级底部重叠。（这条不好表述，文后详细说明）
3、sticky元素的所有父级不能含有overflow:hidden 和 overflow:auto 属性
4、必须具有top，或 bottom 属性。
同时要注意，sticky元素仅在他父级容器内有效，超出容器范围则不再生效了。

### 相关`sticky`插件
- aralejs/sticky
- garand/sticky
- matthewp/position--sticky-
- filamentgroup/fixed-sticky
- http://stickyjs.com/
- http://kissygalleryteam.github.io/sticky/doc/guide/index.html
https://github.com/search?utf8=%E2%9C%93&q=position+sticky&type=Repositories&ref=searchresults


## iphone屏幕录制如何导出gif

用Mac自带的`QuickTime Player`录制视频。用软件`GIF Brewery`导出gif。写了篇简单的[]总结文章](https://huixisheng.github.io/mac-iphone-screen-record/)


## 键盘弹起引起input fixed定位失效

flex方法测试

测试结果:ios10.2 在微信中，safari切换为讯飞输入法有问题，输入框会被键盘遮挡

>在iOS移动设备下当虚拟键盘打开打开上会导致页面内的Fixed元素出现渲染异常。有几种可以绕过这个bug的方法：为Fixed元素设置 position:absolute; 通过设置定时器focus input元素。 -https://www.dragonvally.com/2016/04/09/ios-fixed-input-bug/  -http://getbootstrap.com/getting-started/#virtual-keyboards

目前想到解决办法:

```
setTimeout(function(){
    var $doc = $(document);
    var height = $doc.height();
    $doc.scrollTop(height)
}, 300);
```

[demo地址-flex实现input fixed](https://huixisheng.github.io/lab/demos/fixed-input/flex-fixed-input.html)


## `border:none`在ie7无效

好久没有处理过ie的兼容问题了，在做公司官网的时候发现`border:none`在ie7无效

以下内容引用在[ie6 ie7中input标签隐藏边框(border:none与border：0的异同) ](http://blog.sina.com.cn/s/blog_5ed90bcd0101l4kc.html)
>border:none;与border:0;的区别体现有两点：一是理论上的性能差异二是浏览器兼容性的差异。
 1.性能差异
【border:0;】把border设为“0”像素虽然在页面上看不见，但按border默认值理解，浏览器依然对border-width/border-color进行了渲染，即已经占用了内存值。
【border:none;】把border设为“none”即没有，浏览器解析“none”时将不作出渲染动作，即不会消耗内存值。
 2.兼容性差异
【border:none;】当border为“none”时对IE6/7无效边框依然存在
【border:0;】当border为“0”时，所有浏览器都一致把边框隐藏
 总结：
1. 对比border:0;与border:none;之间的区别在于有渲染和没渲染，感觉他们和display:none;与visibility:hidden;的关系类似，而对于border属性的渲染性能对比暂时没找测试的方法，虽然认为他们存在渲染性能上的差异但也只能说是理论上。
 2. 如何让border:none;实现全兼容？只需要在同一选择符上添加背景属性即可
3.对于border:0;与border:none;个人更向于使用,border:none;，因为border:none;毕竟在性能消耗没有争议，而且兼容性可用背景属性解决不足以成为障碍。
