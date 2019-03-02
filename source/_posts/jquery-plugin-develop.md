title: jQuery 插件开发
date: 2014-01-12 13:18:03
description: 现在做的很多项目都是基于jQuery，很多时候jQuery插件就是一个模块。本文结合jQuery的源码对jQuery插件的写法做一个简单的介绍。
tags:
- JavaScript
- jQuery
---


# jQuery 插件开发

现在做的很多项目都是基于jQuery，很多时候jQuery插件就是一个模块。本文结合jQuery的源码对jQuery插件的写法做一个简单的介绍。

<!-- more -->

## 插件种类
### 一. 类级别的插件开发
类级别的插件开发最直接的理解就是给jQuery类添加类方法，可以理解为添加静态方法。将函数定义于jQuery的命名空间中。

#### 1.1 添加一个新的全局函数

    jQuery.newMethod = function(){
        console.log('我是新添加到一个方法')；
    }

例如源码： `jQuery.find = Sizzle;`

#### 1.2 添加多个全局函数

    jQuery.newMethod1 = function(){
        console.log('我是新添加到一个方法1')；
    }

    jQuery.newMethod2 = function(){
        console.log('我是新添加到一个方法2')；
    }

例如源码：

    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;


#### 1.3 使用 `jQuery.extend( object )`

扩展jQuery对象本身。用来在jQuery命名空间上增加新函数。例如 `jQuery.isFunction` 就是这样添加的。

当 `1.2` 需要添加很多方法时将会显得有多余。更何况 `javasript` 一切皆对象。实现多个方法的继承将显得很重要。

    jQuery.extend({

        newMethod1 : function(){
            console.log('我是新添加到一个方法1')；
        },

        newMethod2 : function(){
            console.log('我是新添加到一个方法2')；
        }
        // ... 比较多的方法
    });

例如源码：

    jQuery.extend({

        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function( obj ) {
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray || function( obj ) {
            return jQuery.type(obj) === "array";
        },

        isWindow: function( obj ) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        },

        isNumeric: function( obj ) {
            return !isNaN( parseFloat(obj) ) && isFinite( obj );
        }

    });


#### 1.4 使用命名空间

虽然在jQuery命名空间中，我们禁止使用了大量的javaScript函数名和变量。但是仍然不可避免某些函数或变量名将于其他jQuery插件冲突，特别是在团队开发，因此我们习惯将一些方法封装到另一个自定义的命名空间。

    jQuery.myPlugin = {
        newMethod1 : function(){
            console.log('我是新添加到一个方法1。可以通过 jQuery.myPlugin.newMethod1 ')；
        },

        newMethod2 : function(){
            console.log('我是新添加到一个方法2。可以通过 jQuery.myPlugin.newMethod2 ')；
        }
        // ... 比较多的方法
    }

例如源码：

    // 处理动画的
    jQuery.fx.start = function() {
    if ( !timerId ) {
        timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
    }
    };

    jQuery.fx.stop = function() {
        clearInterval( timerId );
        timerId = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
    };

### 二、实例对象方法插件

开发能让所有的 `jQuery` 实例对象都可以调用的方法。也就是说，只要通过 `$()` 工厂获得
的 `jQuery` 实例对象，都可以调用我们开发的方法。很多插件都是这种类型。

实现方法：[自动执行的匿名函数](javascript:; '展开又是一篇很长的文章，请看下回')和类级别的插件开发的组合。

    ;(function($){

        $.fn.extend({
            pluginName: function(options, callback){
                // 自定义的插件
            }
        });

        // 或者
        $.fn.pluginName = function(options, callback){

        }

    })(jQuery);

匿名函数的形参是`$`, `jQuery` 当做实参传入，立即调用执行。目前很多`jQuery`的类库都采用这种方式，例如`jQuery`,`Seajs`等。`jQuery`插件可以放心的使用`$`,不用当心会跟其他库发生冲突，例如 `prototype.js`。

推荐的插件写法：

    // 创建一个闭包
    ;(function($) {
        // 插件的定义
        $.fn.hilight = function(options) {
            debug(this);
            // build main options before element iteration
            var opts = $.extend({}, $.fn.hilight.defaults, options);
            // iterate and reformat each matched element
            return this.each(function() {
                $this = $(this);
                // build element specific options
                var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
                // update element styles
                $this.css({
                    backgroundColor: o.background,
                    color: o.foreground
                });
                var markup = $this.html();
                // call our format function
                markup = $.fn.hilight.format(markup);
                $this.html(markup);
            });
        };
        // 私有函数：debugging

        function debug($obj) {
            if (window.console && window.console.log)
                window.console.log('hilight selection count: ' + $obj.size());
        };
        // 定义暴露format函数
        $.fn.hilight.format = function(txt) {
            return '<strong>' + txt + '</strong>';
        };
        // 插件的defaults
        $.fn.hilight.defaults = {
            foreground: 'red',
            background: 'yellow'
        };
        // 闭包结束
    })(jQuery);
]

## 如何将jQuery plugin 封装成seajs模块

Todo：

## 参考

1. [jQuery插件开发全解析](http://www.iteye.com/topic/545971)
2. [jQuery Plugin 官网](http://plugins.jquery.com/)
3. [jQuery 1.10.3 中文帮助手册](http://hemin.cn/jq/)
4. [jquery插件开发规范—jquery插件开发进阶教程（1）](http://www.36ria.com/2822)
