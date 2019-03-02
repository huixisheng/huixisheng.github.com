title: Object.assign引起的页面显示空白
date: 2018-03-29 21:48:45
tags:
- javascript
- Object
- es6
---

线上的页面在华为的设备出现空白，通过真机调试发现报错如下:

![](/images/es6/object-assign/huawei-P7-L07.jpeg)

```
Uncaught TypeError: Object function Object() { [native code] } has no method 'assign'
```

![](/images/es6/object-assign/compatibility.jpeg)


解决版本
```
import 'core-js/fn/object/assign';
```

## 其他相关问题解决 ##

ant-design [直接使用Object.assign 有兼容性问题（Android5，iOS8.4） #87](https://github.com/ant-design/ant-design-mobile/issues/87)
> 统一使用 object-assign

[How do I get Object.assign to work with 6to5 polyfill?](https://stackoverflow.com/questions/28346115/how-do-i-get-object-assign-to-work-with-6to5-polyfill)


## 兼容性 ##
- https://kangax.github.io/compat-table/es6/#test-Proxy,_internal_'get'_calls_Object.assign
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
- [浏览器es支持检测](http://ruanyf.github.io/es-checker/index.cn.html)
