title: MacOSX下Mysql折腾记
date: 2014-10-24 23:16:46
tags:
- mysql
- MacOSX
---

本文记录在`MacOSX`下捣鼓`Mysql`,Yosemite 10.10 mysql 无法开机启动的解决办法.

<!-- more -->



## 在MacOSX启动和停止MySQL服务的

启动MySQL服务

    sudo /Library/StartupItems/MySQLCOM/MySQLCOM start

停止MySQL服务

    sudo /Library/StartupItems/MySQLCOM/MySQLCOM stop

重启MySQL服务

    sudo /Library/StartupItems/MySQLCOM/MySQLCOM restart

或者可以安装`MySQL.prefPane`。在系统的偏好设置设置。发现在OS X Yosemite，mysql在系统偏好设置了随系统开机启动，结果无效，不怎怎么解决？？大神帮忙

2014-11-16 12:23:52 更新

升级到10.10后，即使勾选了 系统偏好设置->mysql->开机自动启动。mysql还是无法开机启动，不知道为何？需要开机后手动去启动或者命令行启动。

    mysqlstart='sudo /Library/StartupItems/MySQLCOM/MySQLCOM restart'

或者

    mysql='sudo /usr/local/mysql/bin/mysql'

当然可以通过launchctl设置开机启动。可以参考[这里](http://my.oschina.net/huyuaning/blog/334584)。

    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>Label</key>
        <string>com.mysql</string>
        <key>ProgramArguments</key>
        <array>
            <string>/usr/local/mysql/bin/mysqld_safe</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
        <key>KeepAlive</key>
        <false/>
    </dict>
    </plist>

现在还没有弄明白 `/usr/local/mysql/bin/mysqld_safe` 和 `/usr/local/mysql/bin/mysql` 有什么区别？


## MacOSX #1045 无法登录 MySQL 服务器；忘记 root密码

报错：
    ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)

1、先在系统偏好设置中关闭MySQL服务；
2、在终端中输入

    sudo su
    /usr/local/mysql/bin/mysqld_safe --skip-grant-tables --skip-networking &
这时便能越过权限表，直接登陆MySQL了。

3、新建一个终端，输入

    mysql -u root
4、 在MySQL中修改root用户密码即可：


    mysql> UPDATE mysql.user SET password=PASSWORD('新密码') WHERE User='root';
    mysql> FLUSH PRIVILEGES;

出现如下报错:
```
ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.
```

解决: `ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';`

- https://stackoverflow.com/questions/33467337/reset-mysql-root-password-using-alter-user-statement-after-install-on-mac

## 导入数据库

如果是很大的sql的备份文件，用 [phpmyadmin](http://www.phpmyadmin.net/home_page/index.php)导入的话是会有问题。可以使用 mysqldump。

- [MySQL的mysqldump工具的基本用法](http://www.blogjava.net/alpha/archive/2007/08/10/135694.html)

## 导出数据库 ##

```
$ mysqldump -u root -p db >db.bak
```


## 推荐mysql相关的软件
- [phpmyadmin](http://www.phpmyadmin.net/home_page/index.php)
- [Navicat Premium](http://www.navicat.com.cn/products/navicat-premium)

## 参考
- [mysql root密码忘记或权限错误的解决办法](http://blog.afantree.com/sql/the-mysql-root-password-forget-or-permissions-error-solution.html)
- [Mac下新安装的MySQL无法登陆root用户解决方法](http://www.euryugasaki.com/archives/853)
- [MAC下安装与配置MySQL](http://www.cnblogs.com/macro-cheng/archive/2011/10/25/mysql-001.html)
- [~~Mac上MySQL root 密码忘记或权限错误的解决办法~](http://blog.csdn.net/loseleo/article/details/8703408) 找不到用户权限表
- [Download mysql](http://dev.mysql.com/downloads/file.php?id=454017)