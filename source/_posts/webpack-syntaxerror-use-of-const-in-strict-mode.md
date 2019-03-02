title: "Uncaught SyntaxError: Use of const in strict mode. 报错解决方法记录"
date: 2018-02-07 13:37:51
tags:
- webpack
---

项目中用`vue`，`vue-router`实现的页面在该设备下`"Mozilla/5.0 (Linux; Android 5.1.1; YQ601 Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36,Cosmeapp/9.1.0"`空白。其他现有设备是正常的。想到可以连接真机设备进行调试，根据报错定位到相关的代码有问题，还是资源加载异常（比如cdn的资源在某些环境下异常）。然而连接`usb`无发审查元素。于是跑源码在本地环境下进行局域调试，结果页面也是空白。在页面注入`weinre`。有报错，但是不要定位，只是显示了报错。这里不得不吐槽下`weinre`确实不怎么好用。有看到过资料安卓的真机调试是需要客户端支持的。

`Uncaught SyntaxError: Use of const in strict mode.`

node_modules/_strip-ansi@4.0.0@strip-ansi/index.js

// 'use strict';
// var ansiRegex = require('ansi-regex');

// module.exports = input => typeof input === 'string' ? input.replace(ansiRegex(), '') : input;

'use strict';
var ansiRegex = require('ansi-regex')();

module.exports = function (str) {
  return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};

// node_modules/_ansi-regex@3.0.0@ansi-regex/index.js

'use strict';

module.exports = function() {
    // const -> var
    var pattern = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
    ].join('|');

    return new RegExp(pattern, 'g');
};




## 参考 ##
- https://github.com/mrdulin/blog/issues/35
- https://stackoverflow.com/questions/36789889/syntaxerror-use-of-const-in-strict-mode
- http://www.mind-geek.net/javascript/syntaxerror-use-of-const-in-strict-mode/
- https://segmentfault.com/q/1010000007415253
- 移动端真机调试指南 https://aotu.io/notes/2017/02/24/Mobile-debug/index.html