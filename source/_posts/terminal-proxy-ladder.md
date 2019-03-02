title: Mac配置终端梯子
date: 2018-06-23 19:57:53
tags:
- Mac
- 工具
---

最初的起因是由于[https://gist.github.com/](https://gist.github.com/)作为submodule的时候无法更新，于是想到终端配置访问该网站。最初以为`ShadowsocksX-NG`配置全局代理就可以，然后并无软用。

首先你得有相关的ss账号，可以自己部署，也可以购买相关的服务。


## ss服务

```shell
$ sublime ~/.zshrc
```

相关的配置信息可以从这里获取

![](/images/proxy/ShadowsocksX-NG-config.jpeg)

方法1:

```
export http_proxy=http://127.0.0.1:1087
export https_proxy=http://127.0.0.1:1087
```

方法2:

```
export ALL_PROXY=socks5://127.0.0.1:1086
```

```shell
$ source ~/.zshrc
$ curl www.google.com
```

另外推荐[`httpie`](https://httpie.org/)。在终端使用http命令，调试api接口

> HTTPie—aitch-tee-tee-pie—is a command line HTTP client with an intuitive UI, JSON support, syntax highlighting, wget-like downloads, plugins, and more.

```
$ brew install httpie
```

## ss服务推荐 ##
- 吾皇 http://kingfast.club/index.php/index/register/?yqi=6711 可按月按年按流量付费，价格实惠，就光查阅资料够用
- https://www.vultr.com/?ref=7872193-4F 需要自己搭建。参考教程[自建ss服务器教程 · Alvin9999/new-pac Wiki](https://github.com/Alvin9999/new-pac/wiki/%E8%87%AA%E5%BB%BAss%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%95%99%E7%A8%8B)  [轻松在 VPS 搭建 Shadowsocks 翻墙 ($5/月 支付宝) - DiyCode](https://www.diycode.cc/topics/738?from=groupmessage&isappinstalled=0)
- linode
- https://www.yunti.website/
- https://pandafan.im/ 同事用过
- [多态](https://duotai.love/) 体验过一个月，有多终端App
- https://monocloud.me/ 借同事的账号用过，速度还不错
- ~鱼摆摆~

### 相关教程 ###
- https://github.com/Alvin9999/new-pac/wiki/自建ss服务器教程
- https://www.diycode.cc/topics/738?from=groupmessage&isappinstalled=0

## 客户端 ##
- wingy
- GoAgentX
- ShadowsocksX / ShadowsocksX-NG-R8

## 其他相关的软件 ##
> 以下并未实践过，看到关键词做个简单的记录

- Proxifier
- privoxy http://blog.devtang.com/2012/12/08/use-privoxy/
- proxychains-ng