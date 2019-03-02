title: MacOSX 开机启动
date: 2014-10-25 08:53:16
tags:
- MacOSX
---

相比较`Windows`和`linux`，MacOSX的开机启动下略显麻烦，可是要经常捣鼓本地服务器的开发者而言，本地开发环境有`php-fpm`、`nginx`、`mysql`、`Mongodb`、`nodejs`、`Memcache`等，如果每次开机都要重启这些服务，会不会是要疯掉。只是不知服务开多了会不会影响系统的系能。本文简单介绍Yosemite 10.10开机启动`Mysql`，[`Tengine`](http://tengine.taobao.org/)。

<!-- more -->

## MacOSX 开机启动

### Unix系统级别的启动脚本

    /etc/mach_init.d/
    /etc/mach_init_per_user.d/
    /etc/mach_init_per_login_session.d/

在这3个目录下面的启动脚本将在系统初始化阶段执行。

## OSX级别启动脚本

    /System/Library/StartupItems/  Yosemite 10.10没内容
    ~/Library/StartupItems/

## OSX级别启动后台进程

    ~/Library/LaunchAgents         Per-user agents provided by the user.
     /Library/LaunchAgents          Per-user agents provided by the administrator.
     /Library/LaunchDaemons         System-wide daemons provided by the administrator.
     /System/Library/LaunchAgents   Per-user agents provided by Mac OS X.
     /System/Library/LaunchDaemons  System-wide daemons provided by Mac OS X.

例如用`brew`安装的`nginx`:

    mkdir -p ~/Library/LaunchAgents
    cp /usr/local/Cellar/nginx/1.4.1/homebrew.mxcl.nginx.plist ~/Library/LaunchAgents/
    launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist

### 添加开机启动项
#### sudo vi com.tengine.plist

    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>Label</key>
        <string>com.tengine</string>
        <key>Program</key>
        <string>/usr/local/tengine/sbin/nginx</string>
        <key>RunAtLoad</key>
        <true/>
        <key>KeepAlive</key>
        <true/>
    </dict>
    </plist>


不知为何设置了`<key>ProgramArguments</key>`就是无法开机启动。写好的`.plist`可以通过以下命令查看格式是否正确。

    sudo plutil -lint com.tengine.plist

[plist相关的参数配置](https://developer.apple.com/library/Mac/documentation/Darwin/Reference/ManPages/man5/launchd.plist.5.html#//apple_ref/doc/man/5/launchd.plist)

>不过试了一下，不是超级用户登陆，而是普通用户登陆，并且监听的端口在1024以下的（例如把默认的8080端口改为了80端口），nginx 开机是启动不了。因此，要 nginx 开机启动的话，需要给予它管理员权限：

    sudo chown root:wheel /usr/local/Cellar/nginx/1.2.6/sbin/nginx
    sudo chmod u+s /usr/local/Cellar/nginx/1.2.6/sbin/nginx


#### 最后调用一下launchctl命令，加载这个plist,

开机启动

    launchctl load -w com.tengine.plist

可以通过查看下命令是否生效。这些命令都是用到才去查下，什么时候要好好恶补下。

     ps aux | grep tengine

开机不启动

    launchctl unload -w com.tengine.plist

例如让Adobe的更新程序开机不启动

    sudo launchctl unload -w /Library/LaunchDaemons/com.adobe.fpsaud.plist

## 用户级别启动程序

系统偏好设置 -> 帐户 -> 登录项


## Linux的开机启动

    /etc/rc.local

[Linux 中 rc.local、init.d、rc.x、init 这几个文件（夹）各有什么作用？启动执行的脚本应该均放在 rc.local 中吗？](http://www.zhihu.com/question/20126189)



## 参考
- [OSX开机自动启动程序的控制脚本](http://apple.group.iteye.com/group/wiki/1394-osx-boot-automatically-activated-control-procedures-script)
- [OSX launchd](http://wiki.nginx.org/OSX_launchd)
- [Creating Launch Daemons and Agents](https://developer.apple.com/library/Mac/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html)
- [Mac OSX的开机启动配置](http://www.tanhao.me/talk/1287.html)
- [Mac 下 Nginx、MySQL、PHP-FPM 的安装配置](http://dhq.me/mac-install-nginx-mysql-php-fpm)



