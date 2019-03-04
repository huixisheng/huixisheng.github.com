title: centos 如何升级 nodejs
date: 2018-07-08 23:53:33
tags:
- centos
- nodejs
---


``` bash
$ curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
$ yum -y install nodejs
$ 记得删除老版本的npm node
$ rm /usr/local/bin/npm
```

``` bash
$ yum remove nodesource-release* nodejs
$ yum clean all
$ rm -rf /var/cache/yum/*
$ rm /etc/yum.repos.d/nodesource-el.repo
$ yum -y remove nodejs
```

