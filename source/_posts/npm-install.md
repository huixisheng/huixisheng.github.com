title: npm直接安装github仓库代码
date: 2016-10-23 14:35:01
tags:
- nodejs
- npm
---

npm是nodejs的官方包管理，有成千上万的包，方便了前端模块化开发。但有些前端库并没有发布到npm,但有时候项目又需要它。本文介绍通过npm如何安装github仓库代码。从而达到模块化开发的目的。

<!--more-->

## 初始化`npm init`##

```
$ npm init
name: (tmp2016)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/huixisheng/Desktop/tmp2016/package.json:

{
  "name": "tmp2016",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this ok? (yes) yes
```

## 安装依赖 npm install ##

### `npm install <git remote url>` ###


```
<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish>]
<protocol> is one of git, git+ssh, git+http, git+https, or git+file. If no <commit-ish> is specified, then master is used.
```

示例:
```
$ npm install git://git@github.com:huixisheng/zepto-lazyload.git
$ npm install https://github.com/huixisheng/zepto-lazyload.git
```

`package.json`配置

```
"dependencies": {
  "zepto-lazyload": "git://git@github.com:huixisheng/zepto-lazyload.git"
},
```

定义包的版本

>```
"dependencies": {
  "package1": "1.0.0",         // 只接受1.0.0的版本
  "package2": "1.0.x",         // 接受1.0版本的bug修复或小更新
  "package3": "*",             // 最新的版本，不推荐
  "package4": ">=1.0.0",       // 接受任何1.0.0版本后的更新
  "package5": "<1.9.0",        // 接受不超过1.9.0版本的更新
  "package6": "~1.8.0",        // 接受 >= 1.8.0 并 < 1.9.0 的版本
  "package7": "^1.1.0",        // 接受 >=1.1.0 并 < 2.0.0 的版本
  "package8": "latest",        // tag name for latest version
  "package9": "",              // 同 * 即最新版本。
  "packageX": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
}
```
> [来自](http://huangbingbing.com/2015/06/24/NPM-node-js%E7%9A%84%E5%8C%85%E7%AE%A1%E7%90%86/)

具体配置可以看官方[npm语义化文档](https://docs.npmjs.com/misc/semver)


## 命令说明 ##

```
npm install gitlab:<gitlabname>/<gitlabrepo>[#<commit-ish>]
npm install bitbucket:<bitbucketname>/<bitbucketrepo>[#<commit-ish>]
npm install gist:[<githubname>/]<gistID>[#<commit-ish>]
npm install github:<githubname>/<githubrepo>[#<commit-ish>]
npm install <githubname>/<githubrepo>[#<commit-ish>]
npm install <git remote url>
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <tarball file>
npm install <tarball url>
npm install <folder>
```

## 问题 ##

### npm install github仓库报错 ###

执行如下命令:
```
sudo npm install git://github.com/theicebear/npm-basic-usage.git
```

报错:
```
npm ERR! eisdir EISDIR: illegal operation on a directory, read
npm ERR! eisdir This is most likely not a problem with npm itself
npm ERR! eisdir and is related to npm not being able to find a package.json in
npm ERR! eisdir a package you are trying to install.
```

为了解决这个报错执行了命令[`npm config set -g cafile` ](https://github.com/npm/npm/issues/9856)就悲剧了。`npm`的命令全部不行了。解放办法：

```
vi /usr/local/etc/npmrc
delete cafile = '' it works
```

解决思路

1. 直接通过报错`google`。尝试无果，还发生悲剧
2. 在github搜索，看了npm的相关issue
3. 期间重装过`nodejs`，删除了npm相关的缓存
4. 最后想到的办法是重置npm的配置。

>```
[npm获取配置有6种方式，优先级由高到底。](http://www.cnblogs.com/huang0925/archive/2013/05/17/3083207.html)
命令行参数。 --proxy http://server:port即将proxy的值设为http://server:port。
环境变量。 以npm_config_为前缀的环境变量将会被认为是npm的配置属性。如设置proxy可以加入这样的环境变量npm_config_proxy=http://server:port。
用户配置文件。可以通过npm config get userconfig查看文件路径。如果是mac系统的话默认路径就是$HOME/.npmrc。
全局配置文件。可以通过npm config get globalconfig查看文件路径。mac系统的默认路径是/usr/local/etc/npmrc。
内置配置文件。安装npm的目录下的npmrc文件。
默认配置。 npm本身有默认配置参数，如果以上5条都没设置，则npm会使用默认配置参数。
```
[npm配置的官方说明](https://docs.npmjs.com/files/npmrc)


报错原因:
github参考不包含`package.json`文件


## 参考 ##
- http://www.cnblogs.com/huang0925/archive/2013/05/17/3083207.html
- http://huangbingbing.com/2015/06/24/NPM-node-js%E7%9A%84%E5%8C%85%E7%AE%A1%E7%90%86/
- https://github.com/ericdum/mujiang.info/issues/6
- https://docs.npmjs.com/files/npmrc