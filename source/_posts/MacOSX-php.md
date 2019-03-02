title: MacOSX安装多版本php
date: 2017-05-26 21:22:26
tags:
- mysql
- MacOSX
---

由于lavarel的环境homestead升级成了7.x,导致在外面跑`composer update`会报错，很麻烦，于是需要升级系统自带php的版本。
```
➜  bin /usr/bin/php -v
PHP 5.6.30 (cli) (built: Feb  7 2017 16:06:52)
Copyright (c) 1997-2016 The PHP Group
Zend Engine v2.6.0, Copyright (c) 1998-2016 Zend Technologies
```
```
# 添加brew的php源
brew tap homebrew/php
brew tap homebrew/dupes
```

```
# 安装php71
brew install php71
brew link php71
```

```
➜  huixisheng.github.com git:(dev) ✗ php -v
PHP 7.1.5 (cli) (built: May 13 2017 13:30:32) ( NTS )
Copyright (c) 1997-2017 The PHP Group
Zend Engine v3.1.0, Copyright (c) 1998-2017 Zend Technologies
```

## 缺少mongodb的扩展报错 ##
```
  Problem 1
    - jenssegers/mongodb v3.2.2 requires mongodb/mongodb ^1.0.0 -> satisfiable by mongodb/mongodb[1.1.2, 1.0.0, 1.0.1, 1.0.2, 1.0.3, 1.0.4, 1.0.5, 1.1.0, 1.1.1].
    - jenssegers/mongodb v3.2.0 requires mongodb/mongodb ^1.0.0 -> satisfiable by mongodb/mongodb[1.1.2, 1.0.0, 1.0.1, 1.0.2, 1.0.3, 1.0.4, 1.0.5, 1.1.0, 1.1.1].
```

```
brew search mongodb
brew install php71-mongodb
```
居然不用手动配置`php.ini`

## 删除MaxOSX自带的php ##
>Mac默认安装了较低版本的php，删除之，统一使用brew管理
# 查看
$ php -v
PHP 5.6.25 (cli) (built: Sep 19 2016 15:45:41)
Copyright (c) 1997-2016 The PHP Group
Zend Engine v2.6.0, Copyright (c) 1998-2016 Zend Technologies
# 删除之
$ sudo rm -rf /private/etc/php-fpm.conf.default /private/etc/php.ini php.ini.default
$ sudo rm -rf /usr/bin/php /usr/bin/php-config /usr/bin/phpdoc /usr/bin/phpize
$ sudo rm -rf /usr/include/php
$ sudo rm -rf /usr/lib/php
$ sudo rm -rf /usr/sbin/php-fpm
$ sudo rm -rf /usr/share/php
$ sudo rm -rf /usr/share/man/man1/php-config.1 /usr/share/man/man1/php.1 /usr/share/man/man1/phpize.1
$ sudo rm -rf /usr/share/man/man8/php-fpm.8

- 来自http://www.jianshu.com/p/81a6d5253d48

## 其他

```
$ /usr/local/Cellar/nginx/1.10.3/html
```

```
$ sudo php-fpm -c /usr/local/etc/php/7.1/php.ini -y /usr/local/etc/php/7.1/php-fpm.conf
Password:
[27-Mar-2018 16:25:00] ERROR: failed to open error_log (/usr/var/log/php-fpm.log): No such file or directory (2)
[27-Mar-2018 16:25:00] ERROR: failed to post process the configuration
[27-Mar-2018 16:25:00] ERROR: FPM initialization failed
```

修改`php-fpm.conf` 的配置 `error_log`为绝对绝对地址

## 配置nginx解析php ##

记得开启`php-fpm`

```
location ~ \.php$ {
    root           html;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
    # 取消默认的配置无法解析
    # fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    include        fastcgi_params;
}
```


## 参考 ##
- http://www.jianshu.com/p/66d1d4ee172c
- https://github.com/Homebrew/homebrew-php
- http://nodejh.com/post/macos-sierra-apache-multiple-php-versions/