title: mac相关技巧整理
date: 2017-05-30 20:00:05
tags:
- MacOSX
---

整理工作中容易遗忘的小技巧和碰到的问题。

## 屏幕共享 ##

打开 系统偏好设置 -> 共享 -> 屏幕共享。在另外的电脑打开 Finder -> 前往 -> 连接服务器 -> 输入 `vnc://ip` 访问。或者`⌘+K`

相关的远程控制s软件[splashtop](https://www.splashtop.com/)，[teamviewer](https://www.teamviewer.com/zhCN/?pid=google.tv.teamviewer_exact_tv12.s.cn&gclid=CjwKEAjwsLTJBRCvibaW9bGLtUESJAC4wKw1SIUYoaX5pTKGqwkFSR1I9L_kaccieEqLupNb_WIQ-hoCFp_w_wcB)

## 找回Sierra允许"任何来源"的应用 ##

`sudo spctl --master-disable`

## 屏幕截图 ##

`Command＋shift＋3` 全屏截图，保存截图到桌面
`Command＋shift＋4` 鼠标选定区域截图，保存截图到桌面

相关的扩展阅读:
- [你所不知道的Mac截图的强大](http://irising.me/2011/11/12135/)
- [OS X 系统自带的截图快捷键有哪些？](https://www.zhihu.com/question/19550327)

## 如何重置 Mac 上的 NVRAM ##

Option + Command + P + R + Power

- https://support.apple.com/zh-cn/HT204063
- https://www.zhihu.com/question/20401972

## Apache  ##

查看是否开启`apache`服务 `ps aux | grep httpd` 或者 `apachectl status`

开启Apache`sudo apachectl start`

相关的设置目录 `/etc/apache2/`

扩展阅读
- [Mac OS X Lion 如何删除自带的 apache php？](https://www.zhihu.com/question/20916296)
- [Mac OS X 启用 Web 服务器](http://www.jianshu.com/p/d006a34a343f)

## 如何查看对于窗口的程序 ##

`sudo lsof -iTCP:80 | grep LISTEN`

```
➜  apache2 sudo lsof -iTCP:80 | grep LISTEN
httpd     48016       root    4u  IPv6 0x89923b92a98a82b9      0t0  TCP *:http (LISTEN)
httpd     48040       _www    4u  IPv6 0x89923b92a98a82b9      0t0  TCP *:http (LISTEN)
httpd     48506       _www    4u  IPv6 0x89923b92a98a82b9      0t0  TCP *:http (LISTEN)
httpd     48507       _www    4u  IPv6 0x89923b92a98a82b9      0t0  TCP *:http (LISTEN)
httpd     48508       _www    4u  IPv6 0x89923b92a98a82b9      0t0  TCP *:http (LISTEN)
```

`sudo lsof -n -i4TCP:80 | grep LISTEN`

查看当前所有监听的端口以及对应的Command和PID

```
➜  apache2 sudo  lsof -nP -iTCP -sTCP:LISTEN
COMMAND     PID       USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java         76 huixisheng  160u  IPv6 0x89923b92a98a8d39      0t0  TCP *:9999 (LISTEN)
java         76 huixisheng  431u  IPv6 0x89923b92b82f0d39      0t0  TCP *:49493 (LISTEN)
Dash       5123 huixisheng   18u  IPv4 0x89923b92b1000c41      0t0  TCP *:50621 (LISTEN)
Dash       5123 huixisheng   21u  IPv6 0x89923b92a98a87f9      0t0  TCP *:50621 (LISTEN)
Shadowsoc  7093 huixisheng    4u  IPv4 0x89923b92aa812159      0t0  TCP *:8090 (LISTEN)
Shadowsoc  7093 huixisheng    7u  IPv4 0x89923b92a3c75c41      0t0  TCP 127.0.0.1:1080 (LISTEN)
phpstorm  10310 huixisheng  143u  IPv4 0x89923b92af530159      0t0  TCP 127.0.0.1:6942 (LISTEN)
phpstorm  10310 huixisheng  336u  IPv4 0x89923b92a60cd349      0t0  TCP 127.0.0.1:63342 (LISTEN)
plugin_ho 12471 huixisheng   37u  IPv4 0x89923b92aaa35a51      0t0  TCP 127.0.0.1:54000 (LISTEN)
�\x9c\x89 24465 huixisheng   12u  IPv4 0x89923b92b5a30159      0t0  TCP *:32445 (LISTEN)
httpd     48016       root    4u  IPv6 0x89923b92a98a82b9      0t0  TCP *:80 (LISTEN)
httpd     48040       _www    4u  IPv6 0x89923b92a98a82b9      0t0  TCP *:80 (LISTEN)
httpd     48506       _www    4u  IPv6 0x89923b92a98a82b9      0t0  TCP *:80 (LISTEN)
httpd     48507       _www    4u  IPv6 0x89923b92a98a82b9      0t0  TCP *:80 (LISTEN)
httpd     48508       _www    4u  IPv6 0x89923b92a98a82b9      0t0  TCP *:80 (LISTEN)
```

## 安装nginx ##

```
➜  desktop brew install nginx
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To have launchd start nginx now and restart at login:
  brew services start nginx
Or, if you don't want/need a background service you can just run:
  nginx
==> Summary
🍺  /usr/local/Cellar/nginx/1.12.0_1: 23 files, 1MB
➜  desktop which nginx
/usr/local/bin/nginx
➜  desktop sudo brew services start nginx
```

>不过试了一下，不是超级用户登陆，而是普通用户登陆，并且监听的端口在1024以下的（例如把默认的8080端口改为了80端口），nginx 开机是启动不了。因此，要 nginx 开机启动的话，需要给予它管理员权限：
sudo chown root:wheel /usr/local/Cellar/nginx/1.2.6/sbin/nginx
sudo chmod u+s /usr/local/Cellar/nginx/1.2.6/sbin/nginx

来自: http://dhq.me/mac-install-nginx-mysql-php-fpm

## vagrant up 开启端口报错
==> homestead-7: Checking if box 'laravel/homestead' is up to date...
Vagrant cannot forward the specified ports on this VM, since they
would collide with some other application that is already listening
on these ports. The forwarded port to 27017 is already in use
on the host machine.

To fix this, modify your current project's Vagrantfile to use another
port. Example, where '1234' would be replaced by a unique host port:

  config.vm.network :forwarded_port, guest: 27017, host: 1234

Sometimes, Vagrant will attempt to auto-correct this for you. In this
case, Vagrant was unable to. This is usually because the guest machine
is in a state which doesn't allow modifying port forwarding. You could
try 'vagrant reload' (equivalent of running a halt followed by an up)
so vagrant can attempt to auto-correct this upon booting. Be warned
that any unsaved work might be lost.
➜  Homestead git:(master) ✗ sudo lsof -n -i4TCP:27017 | grep LISTEN
mongod  526 huixisheng   11u  IPv4 0x40824e155718bce3      0t0  TCP 127.0.0.1:27017 (LISTEN)

原因homestead和mongod的端口冲突了

## 相关资源 ##
- [让 Mac 变成神兵利器的软件清单](http://www.ifanr.com/481651)
- [macOS 上的时间跟踪软件](http://frankorz.com/2016/10/21/new-time-tracking-app-on-macOS/)
