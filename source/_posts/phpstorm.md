title: phpstorm相关配置
date: 2017-05-26 20:39:44
tags:
- 开发工具
- phpstorm
---

值得开心的事: [在最新的2017.1版本中，PhpStorm/WebStorm已经对Vue.js 进行了原生支持](https://www.jetbrains.com/phpstorm/features/html_css_js_editor.html)

## 相关问题 ##

### PhpStorm与WebStorm关系 ###

引用官网说明:

```
PhpStorm = WebStorm + PHP + DB/SQL

All the features of WebStorm are included into PhpStorm, and full-fledged support for PHP and Databases/SQL support are added on top.
```

### .php文件的语法高亮设置 ###

.php 文件不高亮 `Editor->file types` 里面可以设置相同的类的代码高亮。
php类，可以增加：`php4,php5,html,phtml`等


### phpstorm注释的时候的斜线位置不在缩进的位置 ###

phpstorm注释的代码在Sublime中打开，收起代码的时候很不友好，估计有强迫症用户更是受不了吧。

`Preferences->Editor->Code Style->PHP->Other` 里面取消 `Line comment at first column`之前的勾选就行了！

![](/images/tools/phpstorm.jpeg)


### 如何修改phpstorm新建文件默认模版注释 ###

默认注释:
```
<?php
/**
 * Created by PhpStorm.
 * User: huixisheng
 * Date: 2017/5/26
 * Time: 21:00
 */
```

![](/images/tools/phpstorm-header.jpeg)

```
<?php
/**
 *
 * @date 2017-05-26 21:06
 * @author huixisheng <huixisheng@gmail.com>
 */
```

### 配置Laravel代码跳转 ###
安装`Laravel Plugin`。执行`php artisan ide-helper:generate`

- https://github.com/barryvdh/laravel-ide-helper


### 怎么设置tab为4个空格缩进 ###
`Editor -> Code Style -> PHP`，右侧不要勾选 `Use tab character`

### vue的代码缩进由4个空格改为2个空格
`Editor > Code Style > JavaScript`的设置，Indent键值为4


## 常用的快捷键 ##

|    快捷键    | 描述 |
| ---------- | --- |
| shift+command+↑ | 代码行上移  |
| control+g       | 选中相同单词   |
| Commond+d  | 复制行到下一行 |
| Command+delete |  删除当前行 |
| double shift | 搜索文件 |
| ⌘ + E | 历史文件 |
| ⌘⌥O  | 搜索函数。全项目范围
| ⌥ + 回车 | 导入包，自动修正
| ⌘ + n  | 快事为每个成员属性生成 getter 及 setter 方法


苹果键盘修饰键

>Command ⌘
Shift ⇧
Option Alt ⌥
Control ⌃
Caps Lock ⇪
Fn

- [PHPStorm 快捷键大全（Win/Linux/Mac）](https://laravel-china.org/topics/5420/your-keyboard-shortcuts-please)
- [Mac 键盘快捷键](https://support.apple.com/zh-cn/HT201236)
- [认识Mac下的那些符号!](http://newping.cn/457)

## 如何打特殊符号 ##

搜狗输入法->详情表情和符号


## 切换至ES6规范 ##

在项目中开启ES6 `Preferences->Languages & Frameworks->JavaScript->JavaScript language version->ECMAScript 6`。 难找的话直接搜索`JavaScript`

## 主题相关文章介绍 ##

- http://chinagdg.org/2016/02/ttt2-seti-ui/
- https://www.zhihu.com/question/37762479
- https://www.zhihu.com/question/35413120
- https://www.zhihu.com/question/35203203 mac下intellij idea 变得特别卡该如何解决？
- http://www.webstormthemes.com/themes-list?title=&field_tags_tid=All
- http://www.jianshu.com/p/10f5f0055715
- https://blog.fazero.me/2015/07/25/WebStorm%E6%9B%B4%E6%8D%A2%E4%B8%BB%E9%A2%98%E5%92%8C%E4%BF%AE%E6%94%B9%E5%AD%97%E4%BD%93%E6%A0%B7%E5%BC%8F/
- https://www.zhihu.com/question/35413120
- https://plugins.jetbrains.com/plugin/8006-material-theme-ui
- http://color-themes.com/?view=index&layout=Generic&order=popular&search=&page=2


## 相关文章 ##

- 新特性 https://www.jetbrains.com/webstorm/whatsnew/#v2017-1-completion-in-webpackconfigjs
- jsdoc https://www.jetbrains.com/help/webstorm/2017.1/creating-jsdoc-comments.html  http://blog.lxjwlt.com/2016/09/11/jsdoc.html
- http://xwartz.xyz/pupa/2016/05/my-workflow-in-sublime/
- WebStorm 有哪些过人之处？ https://www.zhihu.com/question/20936155
- eslint http://laichuanfeng.com/work/use-eslint-in-webstorm/
- https://plugins.jetbrains.com
- [如何优雅的使用 phpStorm](https://laravel-china.org/topics/1692/how-to-use-phpstorm-gracefully)
- 使用phpstorm对代码做智能重构，适用所有JetBrains IDE工具 https://juejin.im/entry/5a2a6bd45188253d6817802b
- https://juejin.im/post/5a61fe346fb9a01c9b660765
- WebStorm（前端）和 PhpStorm（后端 PHP）IDE 的统一设置。 https://github.com/zhaotoday/ide-settings
- 在 WebStorm/PhpStorm 中开启对 Vue.js 的完美支持 http://lightcss.com/get-vuejs-support-in-webstorm-and-phpstorm/

## 更新日志 ##

2017-05-28 01:02:06
- 添加主题和相关介绍文章
- 添加碰到的问题
- 添加常用的快捷键


## 参考 ##
- http://lightcss.com/get-vuejs-support-in-webstorm-and-phpstorm/


