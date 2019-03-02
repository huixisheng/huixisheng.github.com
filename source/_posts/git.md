title: git命令简单介绍
date: 2015-01-21 16:38:23
tags:
- git
---

开发过程中常用`git`操作很碰到的问题进行总结。



<!--more-->

## git简介

[git](http://baike.baidu.com/link?url=UYMd9W0XHTgdJBxme3gqKo2ClfetB3Gs80jxnQYlutmdsCzpgxH93YiWn5UpKoyEOF_celoV1XiyTG5iy0mlLYibww4uSPmlXemtoBJdODy)是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。是目前最流行的版本管理系统，学会git几乎成了开发者的必备技能。[git](http://baike.baidu.com/link?url=UYMd9W0XHTgdJBxme3gqKo2ClfetB3Gs80jxnQYlutmdsCzpgxH93YiWn5UpKoyEOF_celoV1XiyTG5iy0mlLYibww4uSPmlXemtoBJdODy)是 `Linus Torvalds` 为了帮助管理 `Linux`内核开发而开发的一个开放源码的版本控制软件。




## git常用命令 ##

对于这方面的介绍网上都有很全很详细。我就不班门弄斧了。介绍一个比较有用的命令 ``git help 命令例如:pull`。这么多的命令如果都要全部记住，怎么可能。还是学会查手册来的靠谱。


以下几篇文章都对git常用的命令做了详细说明：

- [git使用说明](http://www.cnblogs.com/welfear/archive/2010/05/24/1742614.html)
- [Git远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
- [git命令详解](http://www.samirchen.com/git-commands/)
- [学习git过程中做的xmin](https://gitcafe.com/restkuan/git/blob/master/Git%E5%B0%8F%E7%BB%93.xmind)


## git超级实用命令 ##


    git help branch // 查看详细的参数
    git config -l 查看配置信息
    git clone git@github.com:huixisheng/huixisheng.github.com.git
    git commit -C head -a --amend //不会产生新的提交历史记录，复用HEAD留言，增补提交，而不增加提交记录
    git branch -d feature_x // 删除feature_x分支
    git checkout -b master2 // 切换并新建master2分支

`git stash`  本地修改暂时存储起来，用于改到一半暂时不想`commit`和`pull`有冲突。更多[参考解决Git stash冲突问题](http://wongyouth.com/blog/2014/03/28/solve-conflict-caused-by-git-stash/)

使用Sublime Text 可以安装 [sublime-text-git](https://github.com/kemayo/sublime-text-git)，超级赞

[如何创建 ssh key](https://help.github.com/articles/generating-ssh-keys/)。配置好后 'ssh -T git@github.com' 测试配置是否成功。多个ssh key怎要么办？`vi ~/.ssh/config`。配置以下信息

    Host github.com
        HostName github.com
        PreferredAuthentications publickey
        IdentityFile ~/.ssh/github_rsa
        User git

    Host coding.net
        HostName coding.net
        PreferredAuthentications publickey
        IdentityFile ~/.ssh/codingnet_rsa
        User git


[安装zsh](http://macshuo.com/?p=676)。就可以使用以下缩写命令，通过 `alias`查看命令别名。

    // 添加自定义的命令
    vi ~/.zshrc
    source ~/.zshrc

    ggpull
    ggpush


## git常见问题解决方案


### 显示提交log tree ###

    git log --pretty=format:"%h %s" --graph

### 使用git pull文件时和本地文件冲突怎么办

    git stash // 本地修改暂时存储起来
    git pull
    git stash pop

[参考解决Git stash冲突问题](http://wongyouth.com/blog/2014/03/28/solve-conflict-caused-by-git-stash/)

## git 恢复单个文件的历史版本

> 首先查看该文件的历史版本信息：git log Default@2x.png
记录下需要恢复的commit版本号：如 9aa51d89799716aa68cff3f30c26f8815408e926
> 恢复该文件：git reset 9aa51d89799716aa68cff3f30c26f8815408e926 Default@2x.png
>
还需要执行git checkout xxxxx(文件名)

>提交git:git commit -m "revert old file"


直接用 git-checkout 即可。理解起来稍微有点奇怪就是了。

    $ git checkout ${commit} /path/to/file

[git 如何还原某个文件](http://segmentfault.com/q/1010000002464973)

### 如何更新自己Fork的代码

[iModule](https://github.com/iModule)Fork了开源代码。`clone`到本地了，如何保证代码同最初的源码保持一致呢？

    git clone git@github.com:iModule/zepto.git
    cd zepto
    git remote add zepto  git@github.com:madrobby/zepto.git
    git remote -v 查看是否多出了zepto分支
    git fetch zepto   git pull zepto master
    git merge zepto/master
    git push origin master


### 提交github不用输入用户名和密码

>　　在用git提交时代码至github上时每次都要输入用户名和密码，当提交操作较为频繁时非常不方便，可以按下文中的介绍，设置成提交时不用输入用户名和密码：
> 1、在当前库下，已经运行过 git remote add origin https://github.com/***/***.git 命令，则先运行如下命令：　
>    git remote rm origin　　
>    若以前没有运行过  git remote add origin https://github.com/***/***.git命令，直接跳到2步骤；
> 2、运行如下命令：
>    git remote add origin git@github.com:username/test.git


### 无法删除远程分支
error: unable to delete 'test-branch': remote ref does not exist
error: failed to push some refs to 'git@github.com:huixisheng/huixisheng.github.com.git'


    git push origin :test-branch
    git remote update --prune



## 超级丰富的git教程列表 ##

- [廖雪峰-Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
- [Git速成班: git rebase](http://www.html-js.com/article/2021)
- [Git 命令整理](http://photo.weibo.com/1621464661/wbphotos/large/mid/3801446388375272/pid/60a59655jw1eoh3732h52j21cv2fu4qp)
- [git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)
- [在线Git命令行学习](http://pcottle.github.io/learnGitBranching/)
- [GotGitHub](http://www.worldhello.net/gotgithub/)
- [git-scm](http://git-scm.com/book/zh/v1/%E8%B5%B7%E6%AD%A5)
- [学习，使用 git 过程中做的思维导图](https://ruby-china.org/topics/17590)
- [Git Community Book 中文版](http://gitbook.liuhui998.com/index.html)



## 在线git代码托管平台 ##

- [github](https://github.com/)
- [coding](https://coding.net/)
- [GitCafe](https://gitcafe.com/)
- [csdn-code](https://code.csdn.net/)
- [开源中国](http://git.oschina.net/)


## git rebase ##
- [Git速成班: git rebase](http://www.html-js.com/article/Week-end-column-Git-crash-course-git-rebase)
- [构造干净的 Git 历史线索](http://codecampo.com/topics/379?comment_id=1354#comment-1354)
- [团队开发里频繁使用 git rebase 来保持树的整洁好吗?](http://segmentfault.com/q/1010000000430041)
- [git pull 和 git fetch 有什么区别？](https://ruby-china.org/topics/15729)


## 备忘清单 ##

修改远程参考地址

    方法1：
     git remote set-url origin 新地址

    方法2：
    git remote rm origin
    git remote add origin [url]


## 添加submole ##

    git submodule add git@github.com:fex-team/umeditor.git lib/umeditor
    git remote -v
    git submodule init
    git submodule update

    // 会生成
    .gitmodule

    // 更新每个submodule
    git submodule foreach git pull

## 删除submodule ##

    git rm —cached lib/umeditor
    rm -rf lib/umeditor
    vi .git/config  删除submodule 配置
    rm .gitmodules // 如果是多个可以选择删除


## 添加subtree ##

    //添加subtree

    git remote add umeditor git@github.com:fex-team/umeditor.git lib/umeditor
    git subtree add —prefix=app/umeditor umeditor dev
    git pull origin master

- [Git Submodule使用完整教程](http://www.kafeitu.me/git/2012/03/27/git-submodule.html)
- [git submoudle vs git subtree](http://efe.baidu.com/blog/git-submodule-vs-git-subtree/)
- [Git submodule 还是 Git Subtree](http://blog.zlxstar.me/blog/2014/07/18/git-submodule-vs-git-subtree/)
- [subtree split](https://gist.github.com/kvnsmth/4688345)
- [用 Git Subtree 在多个 Git 项目间双向同步子项目，附简明使用手册](https://segmentfault.com/a/1190000003969060)

## github提示 `You have no permission to access this repo`

每次出现都是很sb，添加`ssh-add ~/.ssh/github`

解决方法看[多 SSH Key 管理技巧与 Git 多账户登录问题](http://www.barretlee.com/blog/2016/03/09/config-in-ssh-after-troubling-git-connection/)

## git客户端 ##

- [sublime-text-git](https://github.com/kemayo/sublime-text-git)
- [Sublime Text 插件 GitGutter 更好的帮助开发者查看文件之前的改动和差异，提升开发效率](https://github.com/jisaacks/GitGutter)
- [GitHub](https://mac.github.com/)
- [GitX](http://gitx.frim.nl/)
- [SourceTree](http://www.sourcetreeapp.com/)

## git如何强制使用远程分支 ##
```
git fetch --all
git reset --hard origin/master
```
或者
```
git fetch origin
git reset --hard origin/master
```

## git在提交之前撤销add操作 ##

```
git rm -r --cached .
```

[扩展阅读-Git常用的撤销操作](http://www.netpi.me/uncategorized/gitrevoke/)

## 参考 ##

- [Git 每次提交时的用户名和密码设置](http://diao.it/blog/2012/10/13/why-is-git-always-asking-for-my-password/)
- [git创建与管理远程分支](http://blog.csdn.net/fyh2003/article/details/7528157)
- [如何更新自己Fork的代码](https://github.com/ysc/APDPlat/wiki/%E5%A6%82%E4%BD%95%E6%9B%B4%E6%96%B0%E8%87%AA%E5%B7%B1Fork%E7%9A%84%E4%BB%A3%E7%A0%81)
- [Git远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)


最后欢迎补充


## Todo ##

git fetch  没有效果研究

https://ruby-china.org/topics/4768

[5.4 Git钩子：自定义你的工作流](https://segmentfault.com/q/1010000000464600)
[2.6 回滚错误的修改](https://github.com/geeeeeeeeek/git-recipes/wiki/2.6-%E5%9B%9E%E6%BB%9A%E9%94%99%E8%AF%AF%E7%9A%84%E4%BF%AE%E6%94%B9)
[   git revert 和reset的区别](http://my.oschina.net/MinGKai/blog/144932)
