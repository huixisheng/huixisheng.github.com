title: 变量的解构赋值和展开运算符
date: 2017-09-20 22:13:09
tags:
- ES6
---

本文对[变量的解构赋值(destructing)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)和[展开运算符(spread operator ...)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)做个简单的介绍。

本文首发在[前端开发说](https://huixisheng.github.io/es6-destructuring-and-spread-operator/)

<!--more-->

## 变量的解构赋值 ##

以下例子通过`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3216.0 Safari/537.36`测试。

### 数组赋值 ###

```
let [a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

let [a, b, ...rest] = [1, 2, 3, 4, 5];
console.log(a); // 1
console.log(b); // 2
console.log(rest); // [3, 4, 5]

// 不完全解构
let [a, b] = [1, 2, 3]
console.log(a); // 1
console.log(b); // 2

// 设置默认值
let [a = 1] = []
console.log(a); // 1
```

### 对象赋值 ###

```
// 用于提取数据
const {a, b, ...rest} = {a:1, b:2, c:3, d:4}
console.log(a); // 1
console.log(b); // 2
console.log(rest); // {c: 3, d: 4}
```

### 函数参数 ###

```
// 默认值设置
function fun([a, b = 3]) {
    return a + b;
}
fun([1]) // 4

[[1, 2], [3, 4]].map(([a, b]) => a + b) // [3, 7]
```


## 对象展开运算符 ##

扩展运算符（spread operator ...）将一个数组、类数组、字符串转为用逗号分隔的序列。

最早是在[Vuex](https://vuex.vuejs.org/zh-cn/state.html)文档看到

```
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
// 来自: https://vuex.vuejs.org/zh-cn/state.html
```
得知是[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread)。查阅资料发现属于ES6变量的解构赋值的内容。说来也惭愧[《ES6 标准入门》](http://es6.ruanyifeng.com/)第1版，第2版都看过，当初看的不深入，很多知识点都有漏洞。而今天在封装`Vue组件`的时候，如下代码看的甚是变扭，ES6模块和CommonJS规范糅杂在一起。

```
import components from './components';

const install = function (Vue) {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = Object.assign(components, { install });  // eslint-disable-line no-undef
```
于是做了如下调整

```
export default {
  install,
  ...packages,
};

```

Vuex的文档中有介绍对象展开运算符（现处于 ECMASCript 提案 stage-3 阶段）。

```
The TC39 categorizes proposals into the following stages:

Stage 0 - Strawman: just an idea, possible Babel plugin.
Stage 1 - Proposal: this is worth working on.
Stage 2 - Draft: initial spec.
Stage 3 - Candidate: complete spec and initial browser implementations.
Stage 4 - Finished: will be added to the next yearly release.

摘自文档 https://babeljs.io/docs/plugins/
```

大致翻译如下:
```
Stage 0 - Strawman（展示阶段）
Stage 1 - Proposal（征求意见阶段）
Stage 2 - Draft（草案阶段）
Stage 3 - Candidate（候选人阶段）
Stage 4 - Finished（定案阶段）
进入 2 阶段，基本上都已经确定要发布了。

在 2015 年进入 stage4 的叫做 es2015
在 2016 年进入 stage4 的叫做 es2016
以此类推

作者：Yugo
链接：http://www.jianshu.com/p/41d3f7768095
```

### 对象合并 ###
```
const a = [1, 2];
const b = [3, 4];
console.log(a.concat(b));
const c = [...a, ...b]; // [1, 2, 3, 4]

const a1 = { a: 1};
const b2 = { b: 2};
console.log(Object.assign(a1, b2));
console.log({ ...a1, ...b2}); // {a: 1, b: 2}
```

### 函数传参 ###
```
function fun(...args) {
    console.log(args) //  [1, 2]
}
fun(1, 2);


function func2(a, b, c) {
    console.log(a, b, c) // {a: 1} 3 "cc"
}
let rest = [3];
func2({a: 1}, ...rest, 'cc');
```

### 扩展阅读 ###
- [展开运算符的 6 种绝妙用法](http://www.zcfy.cc/article/6-great-uses-of-the-spread-operator-3268.html)
- http://blog.csdn.net/qq_30100043/article/details/53424750
- [ES6之Spread Operater拷贝对象](https://blog.fundebug.com/2017/07/19/master_object_spread_operator/)
- [es6 扩展运算符 三个点（...）](http://blog.csdn.net/qq_30100043/article/details/53391308)
- [第四章 扩展的对象功能](https://sagittarius-rev.gitbooks.io/understanding-ecmascript-6-zh-ver/chapter_4.html)

## 总结 ##

知识点的理解结合具体的项目代码，能快速掌握。不清楚不懂的查漏补缺，just-do-it，对!就是立刻做，这是你知识体系的短板，深挖进去发现会收获很多。

## 参考 ##
- http://es6.ruanyifeng.com/#docs/destructuring
- https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md
- https://excaliburhan.com/post/babel-preset-and-plugins.html
- https://segmentfault.com/a/1190000010468759
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment