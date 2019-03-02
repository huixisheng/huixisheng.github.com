title: vue @input事件
date: 2017-05-27 23:30:32
tags:
- Vue
- Event
- input
---

今天有同事过来问我，给`el-input` 加了`@input`参数`$event`变成了`input`变化后的值(v-model)。大致伪代码如下:

{% jsfiddle k5uf5fa0  %}

对于`@input`的印象是:

Vue2.x去除了`.sync`,需要双向绑定就用到了`@input` `.sync`在[2.3.0又回来了](https://github.com/vuejs/vue/releases/tag/v2.3.0)

>所以要让组件的 v-model 生效，它必须：
接受一个 value 属性
在有新的 value 时触发 input 事件

于是去看下`el-input`[源码](https://github.com/ElemeFE/element/blob/d3bf30b48c66649e659c29df80844daa7992f1d9/packages/input/src/input.vue#L35-L49)，截取的伪代码:

```
<input ref="input" @input="handleInput">

methods: {
  handleInput(event) {
    const value = event.target.value;
    this.$emit('input', value);
    this.setCurrentValue(value);
    this.$emit('change', value);
  },
}
```

可以理解`$event`为`v-model`没有问题，可是`handlerInput($event, index) {` 第一反应index的值应该没有才对。于是去[Vue的源码](https://github.com/vuejs/vue/blob/dev/dist/vue.js)找答案，Vue的源码并不是晦涩难懂，相反而是通俗易懂，当然精髓的代码还没有完全参透。接下来要抽段时间好好品味一番。@TODO

打了断点，大致明白了点，不会像一开始那么迷茫。

![](/images/vue/@input1.jpeg)

## input事件 ##

参阅了下资料:

>当 `<input>` 或 `<textarea>` 元素的值更改时，DOM input 事件会同步触发。(对于 type = checkbox 或 type = radio 的输入元素，当用户单击控件时，输入事件不会触发，因为value属性不会更改。) 此外，当内容更改时，它会在 contenteditable 的编辑器上触发。在这种情况下，事件目标是编辑主机元素。如果有两个或多个具有 contenteditable 的元素为真，“编辑主机”是其父级不可编辑的最近的祖先元素。同样，它也会在  designMode 编辑器的根元素上触发。

来自: https://developer.mozilla.org/zh-CN/docs/Web/Events/input

> 最后需要注意的是：oninput 和 onpropertychange 这两个事件在 IE9 中都有个小BUG，那就是通过右键菜单菜单中的剪切和删除命令删除内容的时候不会触发，而 IE 其他版本都是正常的，目前还没有很好的解决方案。不过 oninput & onpropertychange 仍然是监听输入框值变化的最佳方案，如果大家有更好的方法，欢迎参与讨论。

来自: http://www.cnblogs.com/lhb25/archive/2012/11/30/oninput-and-onpropertychange-event-for-input.html

## 参考 ##
- https://github.com/ElemeFE/element/blob/d3bf30b48c66649e659c29df80844daa7992f1d9/packages/input/src/input.vue
- https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#%E6%95%B4%E8%A1%8C%E9%AB%98%E4%BA%AE
- https://developer.mozilla.org/zh-CN/docs/Web/Events/input
