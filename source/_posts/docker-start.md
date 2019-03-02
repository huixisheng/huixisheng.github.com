title: docker-start
date: 2018-06-24 12:30:28
tags:
- docker
---

给一个正在运行的Docker容器动态添加Volume http://dockone.io/article/149
https://blog.csdn.net/dream_broken/article/details/52314993
https://deepzz.com/post/the-docker-volumes-basic.html

docker machine 静态ip
- https://github.com/fivestars/docker-machine-ipconfig

docke固定ip https://github.com/johnnian/Blog/issues/16


docker run -itd  --network bridge --ip 192.168.3.88 springjk/webdev /bin/bash


docker run -itd  --network host --ip 192.168.3.88 springjk/webdev /bin/bash

docker: Error response from daemon: user specified IP address is supported on user defined networks only.

larvel 环境

ssh登录 `docker exec -it de1aeb89e0f5 /bin/bash`
https://blog.csdn.net/qq_34021712/article/details/73379851


docker镜像位置：



For someone who is using Docker toolbox (that uses docker-machine), the answers concerning boot2docker on Mac OS X is not valid. The docker-machine VM is called "default" and it exists in the /Users/<username>/.docker/machine/machines/default/ directory.


docker image是什么，存储在什么位置

ps -u $USER | grep Docker
docker镜像地址 /Users/{YourUserName}/Library/Containers/com.docker.docker/Data

下载地址: https://www.docker.com/community-edition#/download
https://github.com/docker/kitematic/releases


rsync

[常见问题](https://github.com/yeasy/docker_practice/blob/master/appendix/faq/README.md)

## 更新日志 ##


## 参考 ##
