title: node如何设置process.env
date: 2018-07-08 23:40:59
tags:
- nodejs
---

在使用[debug](https://www.npmjs.com/package/debug)需要设置`$env:DEBUG = "*,-not_this"`执行相应的环境。

`echo $DEBUG`输出相应的环境配置。Mac下是可以使用`DEBUG="*" node bin/before-parse.js`。

https://github.com/visionmedia/debug/blob/master/src/node.js

“dev-mac”: " export NODE_ENV=development&& nodemon --harmony --use_strict index.js  -w ",
“dev-win”: " set NODE_ENV=development&& nodemon --harmony --use_strict index.js  -w ",

windows 不太清楚，*NIX 系统下规则如下：
export NODE_ENV=production && node xxx.js  这样在当前命令行下后续的命令中读取 NODE_ENV，都会得到  production 值；
如果直接使用 NODE_ENV=production node xxx.js，则 NODE_ENV 的有效性仅限当前命令，不会对后续命令有影响。

可以使用[`cross-env`](https://www.npmjs.com/package/cross-env)


- http://sorex.cnblogs.com/p/6200940.html
- http://yijiebuyi.com/blog/1bfcf43248a873b39a3471901e764b68.html