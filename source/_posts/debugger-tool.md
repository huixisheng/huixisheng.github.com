title: 调试工具整理
date: 2016-10-22 21:02:45
tags:
- 前端资源
- 前端工具
- 调试
---

## 更新日志 ##

2016-12-22
- [*] 文章结构修改
- [+] 添加远程调试在线工具

本文收集整理了浏览器调试工具介绍，手机调试方案，nodejs调试，无线抓包。

<!--more-->

## 远程真机调试 ##

### [阿里移动质量中心（MQC）-H5测试](https://mqc.aliyun.com/hfive.htm?spm=0.0.0.0.qn7DDr) ###
会提供一个测试报告，包含页面加载时间，节点信息，资源资源类型统计，域名资源统计，优化建议,该设备各浏览器的小视频。


### [testin](http://remote.testin.cn/) ###

### [优测](http://remote.utest.qq.com/deviceSearch?type=remote&brand=Samsung)

## 小程序和微信开发调试 ##

## 实时刷新 ##

### FIS  ###
### webpack ###
### BrowserSync ###
### [weflow](https://weflow.io/) ###

### [puer](https://github.com/leeluolee/puer) ###
### [F5](http://www.getf5.com/)

## 开发者调试 ##

### [spy-debugger](https://github.com/wuchangming/spy-debugger)###

### https://ant-tool.github.io/dora.html



## 浏览器调试

[chrome developer tool 调试技巧](http://ued.taobao.com/blog/2012/06/debug-with-chrome-dev-tool/)谷歌浏览器调试比较基础的文章，期待补充和完善。

[Chrome Developer Tools 功能与技巧详解](http://www.ueder.net/html5-Slides/slides.html#slide-1)

[开发者调试工具Chrome Workspace](http://isux.tencent.com/chrome-workspace.html)
开发者工具中调试修改js或者css同时自动保存文件，能够避免开发人员在工具中调试好，再到编辑器中修改一次代码的重复操作，能够提高一定的效率

[~~Opera Dragonfly documentation~~](http://www.opera.com/dragonfly/documentation/)

[Mobile emulation](https://developer.chrome.com/devtools/docs/mobile-emulation) 模拟器

[Browser-Sync：响应式Web开发调试利器](http://www.alloyteam.com/2014/02/browser-sync-responsive-web-development-and-debugging-tool/)

[Chrome也自带抓包功能](chrome://net-internals/#export)

[各种真机远程调试方法汇总——“真机远程调试”](https://github.com/jieyou/remote_inspect_web_on_real_device)

## WebApp调试

- https://github.com/WechatFE/vConsole
- https://github.com/AlloyTeam/AlloyLever/
- Eruda

[无线调试攻略](http://thx.github.io/mobile/debugging-in-mobile/)
少年天才以外的我们，与其说是 coder,不如说是 debugger，都是一路调戏过来的，不好意思，是调试【本人口齿不清，发音不准，再发生类似事故请多多见谅】，因此当你 主动/被动 All in 了无线以后，你发现，知识的储备只是时间的积累和有意识的训练而已，可面对众多的 爱疯，案桌儿，山柴，内核不同，大小不一的设备。尼玛，没有个顺手的调试工具，简直是不能忍受的。

[H5 Mobile 开发调试实践 by 破锣锅](https://speakerdeck.com/paulguo/h5-mobile-kai-fa-diao-shi-shi-jian) 总结的很详细

[手机上怎么抓包调试](http://oceanzhu.com/archives/74)
纳尼，手机也可以抓包，不可思议，赶紧试试吧

[Firebug Lite: doing the Firebug way, anywhere.](https://getfirebug.com/firebuglite)
亲，还在为ie6的调试而苦恼吗？Firebug值得一试。

[远程调试工具-weinre](http://wyqbailey.diandian.com/post/2011-11-09/20511143)Web Inspector Remote（远程 Web 调试工具），功能和 Firebug、Webkit Inspector 类似，可以帮助我们在 PC 端远程调试运行在移动设备浏览器内的 Web 页面或应用，能够即时调试 DOM 元素、 CSS 样式 和 JavaScript 等。

[用Weinre远程调试移动网页](https://www.imququ.com/post/remote-debugging-with-weinre.html)

[使用 Weinre 调试移动网站及 PhoneGap 应用](http://www.cnblogs.com/lhb25/p/debug-mobile-site-and-app-with-weinre.html)`node`版更适合前端。

[在线Weinre](http://debug.build.phonegap.com/)

[浏览器远程调试](https://reader.mx/p/1391)
对比了 Firefox、Chrome、Opera 三大浏览器的远程调试工具

[真机远程调试-remote inspect web on real device](https://github.com/jieyou/remote_inspect_web_on_real_device)

[善用 Web 调试代理工具](http://44ux.com/blog/2013/02/25/using-web-debugging-proxies/)

[Using Web Debugging Proxies](http://code.tutsplus.com/tutorials/using-web-debugging-proxies--net-29828)

[Remote Debugging on Android with Chrome](https://developer.chrome.com/devtools/docs/remote-debugging?hl=zh-CN) 谷歌浏览器实现安装的远程调试

[Chrome开发者工具中文手册](https://github.com/CN-Chrome-DevTools/CN-Chrome-DevTools)

[MIHTool 是前端工程师在iOS设备上调试和优化页面的得力助手](http://www.iunbug.com/mihtool-zh)

[Edge Inspect](https://creative.adobe.com/zh-tw/products/inspect)方便的跨平台同步预览工具

[jsconsole](http://jsconsole.com/)是一个风格和Weinre类似的工具，它更多地关注于控制台输出和代码求值。在访问JSConsole的网站的时候，用户输入“:listen”来获得带有GUID的一段JavaScript代码。这段代码需要被加入到待调试的网页中。于是，在加载网页的时候，代码将会连接到JSConsole服务器，并且根据GUID将此会话和用户的会话关联起来，于是用户浏览器中的控制台现在便已经处于待调试网页的JavaScript运行时环境中了。

[Vorlon.js](http://www.infoq.com/cn/news/2015/07/Vorlon-js-javascript)

[通过 Mac 远程调试 iPhone/iPad 上的网页](http://blog.wpjam.com/m/ios-safari-remote-debugging/)

[整理：手机端网页调试方案](http://blog.segmentfault.com/humphry/1190000000313211?page=1#c-1190000000313211-1050000000349151)

## node.js调试

[node.js调试](http://www.cnblogs.com/dolphinX/p/3485345.html)
你还在一个个`console.log()`，那么你out啦

### [devtool](https://github.com/Jam3/devtool)

Runs Node.js programs inside Chrome DevTools (using Electron).

监测脚步变动自动重启命令
```
devtool scripts/parse.js --watch
```

对应有[`nodemon`](https://github.com/remy/nodemon),目前这个是最符合我需求的。还有    `Superviso` `node-dev`

### iron-node
### node-inspector
### node-debugger
### WebStorm集成的调试器 ###
### Node.js debug模块 ###

 node --inspect index.js

## 抓包工具 ##
- [whistle](http://weibo.com/ttarticle/p/show?id=2309404034831301405232&mod=zwenzhang?comment=1&sudaref=www.google.co.jp&retcode=6102)
- [【开源项目】LivePool：基于 NodeJs 的跨平台 Web 抓包替换工具](http://www.alloyteam.com/2014/07/nodejs-debug-proxy-livepool/)
- [HttpWatch](http://www.httpwatch.com/download/)
- [HttpAnalyzerStd](http://www.ieinspector.com/)
- [tcpdump](http://www.tcpdump.org/)
- [wireshark](http://www.wireshark.org/) 文章推荐：[Wireshark基本介绍和学习TCP三次握手](http://www.cnblogs.com/TankXiao/archive/2012/10/10/2711777.html)
- [NProxy](http://goddyzhao.me/nproxy/) 文章推荐：[NProxy——Mac和Linux平台下的Fiddler](NProxy——Mac和Linux平台下的Fiddler)

### [Fiddler](http://www.telerik.com/fiddler)
- [如何在 Mac 下使用 Fiddler](https://www.imququ.com/post/user-fiddler-on-macos.html)
- [基于Chrome扩展的Fiddler](http://www.welefen.com/fiddler-base-on-chrome-extension.html)

### Mac平台
- [NProxy——Mac和Linux平台下的Fiddler](http://zh.blog.goddyzhao.me/post/35906061908/nproxy-fiddler-in-mac-and-linux)
- [Charles](http://www.charlesproxy.com/) [使用charles proxy for Mac来抓取手机App的网络包](http://www.baidufe.com/item/8a53eea855cb6289993f.html) [Charles(最强大的http调试工具)详细教程（上）](http://www.36ria.com/6278) [Charles(最强大的http调试工具)详细教程（下）](http://www.36ria.com/6303)


## 扩展阅读 ##

- [远程调试(Remote Debugging)](http://tid.tenpay.com/?p=6161)
- [各种 真机远程调试 方法 汇总](https://github.com/jieyou/remote_inspect_web_on_real_device)
- http://wiki.jikexueyuan.com/project/chrome-devtools/remote-debugging-on-android.html
- http://www.jianshu.com/p/82ab631502e1
- http://yujiangshui.com/multidevice-frontend-debug/
- http://div.io/topic/1449
- http://alloyteam.github.io/Spirit/modules/Mobug/
- https://github.com/hongru/horn
- https://github.com/kaiye/kaiye.github.com/issues/4
- https://github.com/riskers/blog/issues/11
- https://gold.xitu.io/entry/5851e77d61ff4b006c8414dd
- https://www.zhihu.com/question/20322475
- [web远程调试方案推荐](https://aliqin.github.io/2014-08-20-remote-debug-of-web/)
- https://futu.im/posts/2018-06-12-how-to-debug-webview/
- [移动端真机调试指南](https://aotu.io/notes/2017/02/24/Mobile-debug/index.html)
