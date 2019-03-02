title: spawn和exec简单介绍
date: 2016-10-22 21:02:45
tags:
- nodejs
---


谷歌搜了下网上介绍spawn和exec区别的文章还是很详细的，引用相关主要的提到的点。同时结合项目中使用过的脚步了解相关的使用方法。

<!--more-->

## spawn
>spawn方法创建一个子进程来执行特定命令，用法与execFile方法类似，但是没有回调函数，只能通过监听事件，来获取运行结果。它属于异步执行，适用于子进程长时间运行的情况。[来自Child Process模块](http://javascript.ruanyifeng.com/nodejs/child-process.html#toc3)

在`node v0.11.12`相应的同步方法。记得不支持同步方法`node`版本中有对应的模块[spawn-sync](https://www.npmjs.com/package/spawn-sync)

```
child_process.spawnSync(command[, args][, options])
Added in: v0.11.12
```
早期简单实现了同步读取数据

```js
    var cp = require('child_process');
    var assert = require('assert');
    var path = require('path');
    var input = {
        "prid" : productId
    };
    input = JSON.stringify(input);
    args = args || {};
    var requestPath = path.join(__dirname, 'queryProduct.js');
    var cmd = process.execPath;
    var _args = [requestPath, input];
    var res = cp.spawnSync(cmd, _args, {
        timeout: (args.timeout || 3000) + 1000
    });
    // console.log(res.stdout.toString('utf8'));
    return JSON.parse(res.stdout.toString('utf8'));
```
queryProduct.js
```

async.series([
    function(cb){
        conn.query(sql, function(err, res){
            var row = res[0];
            cb(null, row);
        });
    }
], function(err, result){
    if( err ){
        console.error(err.message);
        process.exit(1);
    } else {
        console.log(JSON.stringify(result[0]));
    }
    conn.end();
    process.exit(0);
});
```

## exec

有对于的同步方法
```
child_process.execSync(command[, options])#
Added in: v0.11.12
```

`child_process.execSync`
使用实例，合并当前的操作分支到test,并推送到远程的test分支

```
#!/usr/bin/env node

// chmod +x
var child = require('child_process');
var execSync = require('child_process').execSync;

// @todo
var gstOutput = spawnSync('git branch', []);
var currentBranch = getCurrentBranch();
console.log('切换到test分支:');
var gcOutput = execSync('git checkout test');
console.log('合并分支' + currentBranch);
var megerOutPut = execSync('git merge ' + currentBranch);
console.log('推送test分支');
execSync('git pull origin test && git push origin test && npm run sync');
console.log('切换到' + currentBranch);
execSync('git checkout ' + currentBranch);

// git branch | grep "*"  简写
function getCurrentBranch(){
  var execOutput = execSync('git branch', {});
  var outputContent = execOutput.toString();
  var arr = outputContent.split('\n');
  for(var i = arr.length - 1; i >= 0; i--){
    if( arr[i].indexOf('*') >= 0 ){
      return arr[i].replace('*', '').trim();
    }
  }
  return '';
}
```

>exec方法用于执行bash命令，它的参数是一个命令字符串。
>如果用户输入恶意代码，将会带来安全风险。因此，在有用户输入的情况下，最好不使用exec方法，而是使用execFile方法。

## 区别

> 虽然在上面的文档用法中，spwan和exec的最终回调方式有区别，但是在node的实现中，其实两者的实现方式是一致的，exec也可以像spawn一样使用，只不过exec在触发stderr和stdout的data事件的时候，会把数据写到字符串中，到执行结束或者错误退出的时候通过回调函数传递出来，实现了exec这种便捷用法。[来自exec与spawn方法的区别与陷阱](http://deadhorse.me/nodejs/2011/12/18/nodejs%E4%B8%ADchild_process%E6%A8%A1%E5%9D%97%E7%9A%84exec%E6%96%B9%E6%B3%95%E5%92%8Cspawn%E6%96%B9%E6%B3%95.html)


>使用exec默认最大是200k。
超出时会报一个错误： "Error: maxBuffer exceeded"

[使用node子进程spawn,exec踩过的坑](http://div.io/topic/1516) 提到exec和spawn的源码区分
> 断点进去看后，豁然开朗，exec是对execFile的封装，execFile又是对spawn的封装。



### exec和spawn的使用区分[来自使用node子进程spawn,exec踩过的坑](http://div.io/topic/1516)

不过exec确实比spawn在使用上面要好很多

例如我们执行一个命令

使用exec

```
require('child_process').exec('edp webserver start');
```

使用spawn

linux下这么搞

```
var child = require('child_process').spawn(
'/bin/sh', ['-c','edp webserver start'], { cwd: null, env: null, windowsVerbatimArguments: false } );
```

win下

```
 var child = require('child_process').spawn(
'cmd.exe', ['/s', '/c', 'edp webserver start'], { cwd: null, env: null, windowsVerbatimArguments: true } );
```
可见spawn还是比较麻烦的。




