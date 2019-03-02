title: 清空 git 的 commit 记录
date: 2019-03-03 00:29:23
tags:
- git
---

有时候 git 提交不该提交的内容或者有些 log 过于多余，在我的博客提交记录含有草稿文件，先抹去这些提交记录。本文介绍如何初始化 git commit log。

是不是很干净呢？
![](/images/git/git-commit-init.jpg)

``` bash
$ git checkout --orphan empty-branch
$ git branch
$ git status
$ git rm --cached -rf  themes
$ git diff
$ git add .
$ git commit -n -m 'init git log'
$ git checkout dev
$ git checkout -b dev-bak
$ git checkout empty-branch
$ git status
$ git branch -D dev
# 重命名分支
$ git branch -m dev
$ git log
$ git push -f origin dev
```

## Sublime 的列选择
以上内容来自 history，那么多行进行多行编辑呢？
`Ctrl + Shift + Up`。当然相同内容可以使用 `Command + D`

更多内容可以点击[列选择 - Sublime Text 3 文档](https://feliving.github.io/Sublime-Text-3-Documentation/column_selection.html)

## VSCode 的列选择

option + 鼠标点选

option + shift + 鼠标拖动

同时也可以设置快捷键同 Sublime

更多内容可以点击[怎样在 VSCode 中进行列选择? - 知乎](https://www.zhihu.com/question/36723216)


