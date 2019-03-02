title: 配置SSH公钥和git多账号配置
date: 2016-10-22 21:02:45
tags:
- git
---


本文介绍如何配置`ssh-key`

<!--more-->

## 生成key ##

ssh-keygen -t rsa -f ~/.ssh/git.oschina.net -C "469184346@qq.com"

>代码参数含义：
-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。  -[来自github设置添加SSH](http://www.cnblogs.com/ayseeing/p/3572582.html)

直接输入回车

    Generating public/private rsa key pair.
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:

如果输入了密码

>设置passphrase后，进行版本控制时，每次与GitHub通信都会要求输入passphrase，以避免某些“失误”

>将SSH 私钥增加到ssh-agent: ssh-add ~/.ssh/xyz_rsa， 这里会提示输入一次私钥的密码; -[来自](http://www.jianshu.com/p/ddd3122cb351#)

## 添加密匙 ##

### 拷贝公钥 ###

    pbcopy <  ~/.ssh/git.oschina.net.pub

其他平台拷贝命令[参考如何生成SSH key](http://www.jianshu.com/p/31cbbbc5f9fa/)

>window
    clip < ~/.ssh/id_rsa.pub

>linux
    sudo apt-get install xclip
    xclip -sel clip < ~/.ssh/id_rsa.pub


### 登录远程git平台添加ssh key  ###

粘贴刚才拷贝的内容
- [oschinaSSH公钥](http://git.oschina.net/profile/sshkeys)
- [github SSH and GPG keys](https://github.com/settings/keys)点击 `New SSH key`

将新生成的key添加到ssh-agent中

    $ eval "$(ssh-agent -s)"
    $ ssh-add ~/.ssh/git.oschina.net



>可以通过 ssh-add -l 来确私钥列表
$ ssh-add -l
>可以通过 ssh-add -D 来清空私钥列表
$ ssh-add -D

## 配置config用于多个git ssh密匙 ##


    Host github.com
        HostName github.com
        PreferredAuthentications publickey
        IdentityFile ~/.ssh/github
        User huixisheng

    Host git.coding.net
        HostName git.coding.net
        PreferredAuthentications publickey
        IdentityFile ~/.ssh/gitcodingnet
        User git

    Host git.oschina.net
        HostName git.oschina.net
        PreferredAuthentications publickey
        IdentityFile ~/.ssh/git.oschina.net
        User git

>Host，SSH 连接名
HostName，如上所示，可以是通配符，可以是 IP，也可以是域名等
User，登录的用户名
IdentifyFile，version 1 协议下默认是 ~/.ssh/identify，version 2 协议下，默认是依次匹配：~/.ssh/id_dsa，~/.ssh/id_ecdsa，~/.ssh/id_rsa，还有 version 2 兼容模式。
LocalForward 端口的内部跳转
Port，端口设置，默认 SSH 的端口是 22
Protocal，协议版本号，1 或者 2
[来自](http://www.barretlee.com/blog/2016/03/09/config-in-ssh-after-troubling-git-connection/)

- [参考生成多个git ssh密钥](http://www.cnblogs.com/ayseeing/p/4445194.html)

## 测试 ##

测试是否配置成功

    $ ssh -T git@git.oschina.net
    Welcome to Git@OSC, huixisheng!

> -v会输出详情的信息 [多SSH Key管理技巧与Git多账户登录问题](http://www.barretlee.com/blog/2016/03/09/config-in-ssh-after-troubling-git-connection/)

## 其他问题 ##

    $ ssh -T git@git.oschina.net
    The authenticity of host 'git.oschina.net (218.60.114.30)' can't be established.
    ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
    Are you sure you want to continue connecting (yes/no)? yes
    Warning: Permanently added 'git.oschina.net,218.60.114.30' (ECDSA) to the list of known hosts.
    Permission denied (publickey).

    $ eval "$(ssh-agent -s)"
    $ ssh-add ~/.ssh/git.oschina.net


>    如果执行ssh-add时提示"Could not open a connection to your authentication agent"，可以现执行命令：
    $ ssh-agent bash [来自](http://my.oschina.net/stefanzhlg/blog/529403)

```
sudo git clone git@git.coding.net:huixisheng/layout.git
Cloning into 'layout'...
Permission denied (publickey).
fatal: Could not read from remote repository.
```

`ssh -vT git@git.coding.net` 是有结果返回的,看了debug信息都是正常的。

执行如下（期间关闭了翻墙软件）
```
ssh-add ~/.ssh/gitcodingnet
source ~/.ssh/config
```
再次clone又可以了。没找到为何不行的根本原因


## 参考 ##
- [git 配置多个SSH-Key](http://my.oschina.net/stefanzhlg/blog/529403)
- https://help.github.com/articles/generating-ssh-keys
- [coding配置SSH公钥](https://coding.net/help/doc/git/ssh-key.html)


