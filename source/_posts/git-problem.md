title: git操作常见问题汇总
date: 2016-10-22 21:02:45
tags:
- git
---

平常工作中常用的`git`操作命令。

<!--more-->

## git添加空目录
在空目录下建` .gitignore`
内容：
```
# 忽略所有文件
*
# 除了这个文件
!.gitignore
```

## git忽略已经被提交的文件

直接`rm` 然后 `git  add .`本地磁盘也会被删除。我们要的是删除版本库的文件，并忽略。使用如下方法处理:

忽略文件夹 `git rm -r --cached cache/*` 然后在 ` .gitignore`忽略删除的文件。注意`git rm --cached` 删除的是追踪状态

## git 忽略已经提交的文件的修改

`git update-index --assume-unchanged .env`
重置之前添加的忽略
`git update-index --no-assume-unchanged .env`

## 同步`github` fork原作者分支的修改

假设当前在fork `hexo-theme-amazeui`并`clone` `fork`后的分支的终端上：
```
git remote add remote-hexo https://github.com/huixisheng/hexo-theme-amazeui.git
git fetch remote-hexo
git merge remote-hexo/master
```

参考
- [如何同步 Github fork 出来的分支](http://jinlong.github.io/2015/10/12/syncing-a-fork/)
- [如何在github上fork一个项目来贡献代码以及同步原作者的修改](http://www.cnblogs.com/rubylouvre/archive/2013/01/24/2874694.html)

## 同步远程删除的分支
执行`git push origin :test-branch`, 远程`test-branch`已经删除了，但本地还在，`git branch -a`还可以看到
```
error: unable to delete ‘test-branch’: remote ref does not exist
error: failed to push some refs to ‘git@github.com:huixisheng/huixisheng.github.com.git’
```
```
git remote update --prune
```

## git 恢复单个文件的历史版本

>首先查看该文件的历史版本信息：git log Default@2x.png
记录下需要恢复的commit版本号：如 9aa51d89799716aa68cff3f30c26f8815408e926
恢复该文件：git reset 9aa51d89799716aa68cff3f30c26f8815408e926 Default@2x.png
还需要执行git checkout Default@2x.png
提交git:git commit -m "回滚Default@2x.png的历史版本"

[git 如何还原某个文件](https://segmentfault.com/q/1010000002464973)一文提到更加简单的方法
>直接用 git-checkout 即可。理解起来稍微有点奇怪就是了。
`$ git checkout ${commit} /path/to/file`

## 撤销git add的文件的修改 ##

`git reset HEAD README.md`

通过`git status`可以查看相关的操作

参考
- [git的reset和checkout的区别](https://segmentfault.com/a/1190000006185954)
- [Git 中 Reset、Revert、Checkout的区别](https://yhhwpp.github.io/2016/10/31/Git-%E4%B8%AD-Reset%E3%80%81Revert%E3%80%81Checkout%E7%9A%84%E5%8C%BA%E5%88%AB/)

结论:

1. `git reset`是会修改版本历史的，丢弃掉一些版本历史。
2. `git revert`是根据那个commit逆向生成一个新的commit，版本历史是不会被破坏的。
3. `git checkout`用于切换分支



