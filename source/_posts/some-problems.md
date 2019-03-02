title: 碰到的问题简单记录
date: 2018-03-14 09:39:47
tags:
- git
- Nodejs
---

对碰到的问题做个简单的记录，方便后期汇总整理。大部分答案来源于互联网，感谢默默奉献的人，有些没有及时注明出处，后期就找不到相关的文章了，😓😓

## git 如何推送tag

```
# 推送全部tag
$ git push origin --tags
# 推送指定tag
$ git push tag 0.0.1
```

- http://yijiebuyi.com/blog/007269d04d5096d9397ce3daf9d84c48.html
- http://blog.csdn.net/shines/article/details/8558293
- http://80x86.io/post/how-to-push-and-delete-a-remote-git-tag


## git设置远程origin ##

```
# 修改已有的origin
$ git remote set-url --delete https://github.com/CocoaPods/Specs.git
$ git remote set-url --add origin  https://github.com/CocoaPods/Specs.git

# 空项目添加origin #
$ git remote add origin https://github.com/CocoaPods/Specs.git
$ git push -u origin master
```

## tar压缩忽略指定目录
> Mac下`--exclude`需要写在前面

```
$ tar -czvf /Users/huixisheng/Desktop/j-excel.tar.gz --exclude j-excel/node_modules j-excel/
```

## Nodejs守护进程 ##

```
nohup node index.js > error.log 2>&1 &
```

```
nohup: redirecting stderr to stdout

$  > error.log 2>&1 &
```

- http://blog.csdn.net/iechenyb/article/details/76270595

## centos7安装nodejs8.x
直接安装过Node6.x，需要在机器上部署yapi。需要升级Node。

```
# 这个是否需要不确定
$ yum clean all
$ curl -sL https://rpm.nodesource.com/setup_8.x | bash -
# 安装不了，需要卸载重新安装
$ yum install -y nodejs
$ yum erase nodejs npm -y
$ yum install -y nodejs
```


## 更新日志 ##


## 参考 ##
