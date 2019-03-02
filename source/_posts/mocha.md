title: mocha
date: 2018-03-27 23:35:12
tags:
- mocha
- 单元测试
---


## 例子 ##

- https://github.com/huixisheng/lab/tree/master/test
- https://github.com/ruanyf/mocha-demos
- https://github.com/mochajs/mocha/tree/master/test
- https://github.com/vuejs/vue-test-utils-mocha-webpack-example
- https://github.com/mochajs/mocha/tree/f24607e6b04d129610613592d19f5a5af9b65d51/docs/example
- https://github.com/airware/webdriver-mocha-async-await-example

## 其他关键词 ##
- SuperTest
- Istanbul
- Magnum CI
- superagent http://visionmedia.github.io/superagent/
- karma
- casperjs

## 碰到的问题 ##

### 如何测试es6的module ###

出现如下报错
```
SyntaxError: Unexpected token import
    at createScript (vm.js:80:10)
    at Object.runInThisContext (vm.js:139:10)
    at Module._compile (module.js:607:28)
```

```
$ ./node_modules/mocha/bin/mocha --require babel-register --require babel-polyfill
```
`mocha --compilers js:babel-register` 已经废弃。具体见[compilers deprecation](https://github.com/mochajs/mocha/wiki/compilers-deprecation)

相关issue [SyntaxError: Unexpected token import #3228](https://github.com/mochajs/mocha/issues/3228)  [ES6 import not working when using babel in Mocha. #2655](https://github.com/mochajs/mocha/issues/2655)  [Babel unexpected token import when running mocha tests
](https://stackoverflow.com/questions/35040978/babel-unexpected-token-import-when-running-mocha-tests)

 Move the invocation into the parens that contain the function  wrap-iife

### 异步的回调没有添加`done()`
```
Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.
```

如果确实耗时过长的的设置`--timeout`，`this.timeout(3000);`

相关issue [timeout of 2000ms exceeded. Ensure the done() callback is being called in this test. #2025](https://github.com/mochajs/mocha/issues/2025)

### 其他 ###

ReferenceError: window is not defined
- https://www.npmjs.com/package/mocha-jsdom


 get request
(node:13054) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 63): [object Object]

- https://objcer.com/2017/12/27/unhandled-promise-rejections-in-node-js/
- https://github.com/mochajs/mocha/issues/2797
- https://github.com/mochajs/mocha/issues/3097
- http://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html

## 推荐阅读 ##
- http://zhouqing86.github.io/2017/03/26/js-test4-mocha/#%E5%BC%95%E5%85%A5babel%E6%B5%8B%E8%AF%95es6
- http://www.dengzhr.com/node-js/1282
- [Vue.js学习系列六 —— Vue单元测试Karma+Mocha学习笔记](https://www.jianshu.com/p/073d25a3bba0)
- [搭建 基于 Mocha + Webpack2 + Chai + ES6 前端单元测试](http://www.jackpu.com/-da-jian-ji-yu-mocha-webpack2-chai-es6-qian-duan-dan-yuan-ce-shi/)
- http://blog.kazaff.me/2016/08/24/casperjs+mocha+chai%E6%90%AD%E5%BB%BAE2E%E6%B5%8B%E8%AF%95%E7%8E%AF%E5%A2%83/
- http://zoucz.com/blog/2016/08/02/nodejs-unittest-mochajs/
- https://github.com/jin5354/404forest/issues/47

## 参考文档 ##
- https://mochajs.org/
- http://www.chaijs.com/guide/styles/
- [Chai.js cheatsheet](https://devhints.io/chai)
- [Mocha中文文档(翻译)](https://github.com/zhaosaisai/mocha-in-chinese)  https://www.jianshu.com/p/9c78548caffa
