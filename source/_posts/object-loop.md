title: JavaScript如何遍历Object
date: 2017-06-03 21:50:56
tags:
- JavaScript
- Object
---

遍历对象的方法:

1. for ... in
2. Object.getOwnPropertyNames
3. Object.keys
4. for ... of ES6
4. Object.values ES7
6. Object.entries ES7


## [for ... in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)

>for...in 循环只遍历可枚举属性。像 Array 和 Object 使用内置构造函数所创建的对象都会继承自 Object.prototype 和 String.prototype 的不可枚举属性，例如 String 的 indexOf()  方法或者 Object 的 toString 方法。循环将迭代对象的所有可枚举属性和从它的构造函数的 prototype 继承而来的（包括被覆盖的内建属性）。[来自MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in#描述)

```
let  o = {
    'name': 'huixisheng',
    'mail':  'huixisheng@gmial.com'
}

for(let i in o) {
    console.log('%s: %s', i, o[i]);
    // name: huixisheng
    // mail: huixisheng@gmial.com
}
```

>仅迭代自身的属性
如果你只要考虑对象本身的属性，而不是它的原型，那么使用 getOwnPropertyNames() 或执行  hasOwnProperty() 来确定某属性是否是对象本身的属性 (也能使用propertyIsEnumerable)。另外，如果你知道外部不存在任何的干扰代码，你可以扩展内置原型与检查方法。 [来自MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in#仅迭代自身的属性)

```
let  o = {
  'name': 'huixisheng',
  'mail': 'huixisheng@gmial.com'
}


function Person() {
  this.city = 'hangzhou';
}
Person.prototype = o;

const objPerson = new Person();

for (let prop in objPerson) {
  // propertyIsEnumerable 返回一个布尔值，表明指定的属性名是否是当前对象可枚举的自身属性。
  if (objPerson.hasOwnProperty(prop)) {
    // objPerson.city: hangzhou
    // 原型链上的属性不会显示
    console.log('objPerson.%s: %s', prop, objPerson[prop]);
  }
}


for(let prop1 in objPerson){
  console.log('objPerson.%s: %s', prop1, objPerson[prop1]);
}
//objPerson.city: hangzhou
//objPerson.name: huixisheng
//objPerson.mail: huixisheng@gmial.com
```


## [Object.getOwnPropertyNames()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

>object.getOwnPropertyNames 返回一个数组，该数组对元素是 obj 自身拥有的枚举或不可枚举属性名称字符串。 数组中枚举属性的顺序与通过 for...in 循环（或 Object.keys）迭代该对象属性时一致。 数组中不可枚举属性的顺序未定义。

```
//不可枚举属性
var my_obj = Object.create({}, {
  getFoo: {
    value: function() { return this.foo; },
    enumerable: false
  }
});
my_obj.foo = 1;

console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]
console.log(Object.keys(my_obj)); // [ 'foo' ]
for (var i in my_obj) {
  console.log(i, my_obj[i]); // foo 1
}
```


```
let  o = {
  'name': 'huixisheng',
  'mail': 'huixisheng@gmial.com'
}

console.log(Object.getOwnPropertyNames(o)); // [ 'name', 'mail' ]
console.log(Object.getOwnPropertyNames(Object).join(',')); // length,name,arguments,caller,prototype,assign,create,freeze,getOwnPropertyDescriptor,getOwnPropertyNames,getOwnPropertySymbols,is,isExtensible,isFrozen,isSealed,keys,preventExtensions,seal,defineProperty,defineProperties,getPrototypeOf,setPrototypeOf
console.log(Object.getOwnPropertyNames(Array).join(',')); // length,name,arguments,caller,prototype,isArray,from,of
console.log(Object.getOwnPropertyNames(Function).join(',')); // length,name,arguments,caller,prototype
console.log(Object.getOwnPropertyNames(Map).join(',')); // length,name,arguments,caller,prototype
```

## [for ... of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) ##

>for...of语句在[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/iterable)(包括 Array, Map, Set, String, TypedArray，arguments 对象等等)上创建一个迭代循环，对每个不同属性的属性值,调用一个自定义的有执行语句的迭代挂钩.

```
let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);

for (let entry of iterable) {
  console.log(entry);
}
// [a, 1]
// [b, 2]
// [c, 3]

for (let [key, value] of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```


## [Object.values() ES7](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values) ##

>Object.values() 方法返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于for-in循环枚举原型链中的属性 )。[来自MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values#描述)

```
let  o = {
  'name': 'huixisheng',
  'mail': 'huixisheng@gmial.com'
};
Object.values(o); // ['huixisheng', 'huixisheng@gmial.com']
```

兼容性:
- http://node.green/#ES2017-features-Object-static-methods-Object-values
- http://kangax.github.io/compat-table/es2016plus/#test-Object_static_methods
- http://www.webbrowsercompatibility.com/

Polyfill :

- [shims/Object.values  ](https://github.com/es-shims/Object.values/blob/18562676e8aa606a47116753c323dd28619dea50/implementation.js)
- [tc39/proposal-object-values-entries](https://github.com/tc39/proposal-object-values-entries/blob/master/polyfill.js)



## [Object.entries  ES7](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) ##

兼容性

- http://node.green/#ES2017-features-Object-static-methods-Object-entries

```
let  o = {
  'name': 'huixisheng',
  'mail': 'huixisheng@gmial.com'
}

for(let [key, value] of Object.entries(o)) {
  console.log(key, value);
}
// name huixisheng
// mail huixisheng@gmial.com
```

## 扩展阅读 ##
1. [Object.keys()与 for...in 遍历对象，输出的结果为什么是顺序的](https://segmentfault.com/q/1010000004580095)
2. [ES6之6种遍历对象属性的方法](http://www.cnblogs.com/ZSG-DoBestMe/p/5279045.html)
3. [JavaScript学习笔记：对象属性的枚举](https://www.w3cplus.com/javascript/how-do-i-enumerate-the-properties-of-a-javascript-object.html)
4. [JavaScript 学习系列二：Object 对象](http://huangtengfei.com/2015/03/the-standard-library-of-javascript/)
5. [Object 对象和 Array 对象](https://juejin.im/entry/586a418e61ff4b006bc6a0de)
6. [详解forin，Object.keys和Object.getOwnPropertyNames的区别](http://yanhaijing.com/javascript/2015/05/09/diff-between-keys-getOwnPropertyNames-forin/)
7. [ES6 中的 Set、Map 和 WeakMap](https://imququ.com/post/set-map-weakmap-in-es6.html)
8. http://yanhaijing.com/javascript/2015/05/08/member-of-object/