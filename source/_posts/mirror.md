title :     国内镜像源整理
date: 2016-10-22 21:02:45
tags :
- 镜像源
- npm
- ruby
- Composer
- brew
---

本文对国内`ruby`、`npm`、`brew`、`Composer`等镜像源做整理，给前端开发这提供方便。
<!--more-->


## 为何写这个文章

    gem install cdnjs-command
    ERROR:  Could not find a valid gem 'cdnjs-command' (>= 0), here is why:
          Unable to download data from https://rubygems.org/ - Errno::EPIPE: Broken pipe - SSL_connect (https://rubygems.org/latest_specs.4.8.gz)



## RubyGems 镜像

>$ gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
  $ gem sources -l
   *** CURRENT SOURCES ***
https://ruby.taobao.org
# 请确保只有 ruby.taobao.org
$ gem install rails


## NPM 镜像

每次安装都需要指明 `registry`，很麻烦
>$ npm install -g cnpm --registry=https://registry.npm.taobao.org

     vi ~/.npmrc
添加。
> registry = http://registry.npm.taobao.org

或者

>  npm config set registry "http://registry.npm.taobao.org"

通过 `npm config ls` 可以查看相关配置情况


## Yarn 镜像 ##

[yarn](https://yarnpkg.com/zh-Hans/)
> Yarn 对你的代码来说是一个包管理器， 它允许你使用并分享代码给全世界的开发者， Yarn 做这些快捷、安全、可靠，所以你不用担心什么。

设置国内镜像
```
$ yarn config set registry https://registry.npm.taobao.org --global
$ yarn config set disturl https://npm.taobao.org/dist --global
```


## Brew镜像

>$ cd /usr/local && git remote set-url origin https://git.coding.net/homebrew/homebrew.git
$ cd $home && brew update

[Brew Brew Brew !](https://coding.net/u/cocodingding/pp/84498)

## Composer 镜像

方法1：

    composer config -g repositories.packagist composer http://packagist.phpcomposer.com

方法2：
>注意：为了避免安装包的时候都要执行两次查询，切记要添加禁用 packagist 的设置，如下：

    {
        "repositories": [
            {"type": "composer", "url": "http://packagist.phpcomposer.com"},
            {"packagist": false}
        ]
    }

[Packagist / Composer 中国全量镜像](http://pkg.phpcomposer.com/)


全局安装

    $ curl -sS https://getcomposer.org/installer | php
    $ mv composer.phar /usr/local/bin/composer

