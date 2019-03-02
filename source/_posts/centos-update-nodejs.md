title: centos如何升级nodejs
date: 2018-07-08 23:53:33
tags:
---

## 更新日志 ##


curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
yum -y install nodejs
记得删除老版本的npm node
rm /usr/local/bin/npm


yum remove nodesource-release* nodejs
yum clean all
rm -rf /var/cache/yum/*
rm /etc/yum.repos.d/nodesource-el.repo
yum -y remove nodejs


## 参考 ##
