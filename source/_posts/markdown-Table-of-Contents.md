title: markdown文件生成目录
date: 2016-10-22 21:02:45
tags:
- markdown
---


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [gh-md-toc](#gh-md-toc)
  - [安装](#%E5%AE%89%E8%A3%85)
  - [生成内容](#%E7%94%9F%E6%88%90%E5%86%85%E5%AE%B9)
- [doctoc](#doctoc)
  - [安装](#%E5%AE%89%E8%A3%85-1)
  - [控制插入的位置](#%E6%8E%A7%E5%88%B6%E6%8F%92%E5%85%A5%E7%9A%84%E4%BD%8D%E7%BD%AE)
  - [支持的平台](#%E6%94%AF%E6%8C%81%E7%9A%84%E5%B9%B3%E5%8F%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--more-->

##  gh-md-toc

[gh-md-toc](https://github.com/ekalinin/github-markdown-toc#installation)

### 安装
```
$ wget https://raw.githubusercontent.com/ekalinin/github-markdown-toc/master/gh-md-toc
$ chmod a+x gh-md-toc
$ ./gh-md-toc ./issue-13.md
```
### 生成内容

```
Table of Contents
=================

    * [gh-md-toc](#gh-md-toc)
      * [安装](#安装)
      * [生成内容](#生成内容)
    * [doctoc](#doctoc)
      * [安装](#安装-1)
      * [控制插入的位置](#控制插入的位置)
      * [支持的平台](#支持的平台)
```

## doctoc

[doctoc](https://github.com/thlorenz/doctoc)

### 安装
```
$ sudo npm install -g doctoc
$ doctoc ./issue-13.md
```
生成内容见顶部

### 控制插入的位置

```
<!-- START doctoc -->
<!-- END doctoc -->
```

### 支持的平台

```
--bitbucket bitbucket.org
--nodejs    nodejs.org
--github    github.com
--gitlab    gitlab.com
--ghost     ghost.org
```


- [Automatic TOC in github-flavoured-markdown](http://stackoverflow.com/questions/9721944/automatic-toc-in-github-flavoured-markdown)

## 其他工具

- [markdown-toc](https://github.com/jonschlinkert/markdown-toc)
- [gitdown](https://github.com/gajus/gitdown)
- https://github.com/isaacs/github/issues/215
- https://github.com/Mottie/GitHub-userscripts#installation
- [在线工具DocToc](http://doctoc.herokuapp.com/)


