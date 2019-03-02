title: 无密码登录远程服务器
date: 2018-02-09 10:40:35
tags:
- ssh
---

每次`ssh`连接都要输入密码，真的很麻烦。

[ykq@10-10-215-141 .ssh]$ ll
total 8
-rw-r--r-- 1 ykq root  417 Aug 21 21:29 authorized_keys
-rw-r--r-- 1 ykq root 1987 Feb  9 11:25 known_hosts


   20  vi /etc/ssh/ssh_config
   21  vi /etc/ssh/sshd_config
   22  sudo chmod 755 ~/webpack-mhome.json
   23  sudo chmod 777 ~/webpack-mhome.json
   24  vi /etc/ssh/sshd_config
   25  sudo vi /etc/ssh/sshd_config
   26  sudo service ssh restart
   27  which ssh
   28  sudo chown ykq ~/webpack-mhome.json
   29  sudo chown a+x ~/webpack-mhome.json
   30  sudo vi /etc/ssh/sshd_config

   PasswordAuthentication yes

➜ ssh-copy-id -i ~/.ssh/motian-server.pub root@xx.xx
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/Users/huixisheng/.ssh/motian-server.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
root@xx.xx's password:
/etc/profile.d/lang.sh: line 19: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory

Number of key(s) added:        1

Now try logging into the machine, with:   "ssh 'root@xx.com'"
and check to make sure that only the key(s) you wanted were added.


Permission denied (publickey,gssapi-keyex,gssapi-with-mic).

## 更新日志 ##

    ssh-keygen -t rsa -f ~/.ssh/github -C "email

    ssh-add ~/.ssh/github

    http://www.html-js.com/article/2379


sudo vim /etc/ssh/sshd_config
PubkeyAuthentication yes


PasswordAuthentication yes


Redirecting to /bin/systemctl restart ssh.service
Failed to restart ssh.service: Unit not found.

centos7下重启sshd服务的操作方法
在centos7下重启服务不再是 service 服务名称 动作 这样的方式的.而是:

systemctl 动作 服务名.service

1. 查看sshd服务是否启动了.

systemctl status sshd.service

看到的这样的信息就可以确定是启动了.

2. 如果没有启动,则需要启动该服务:

systemctl start sshd.service

3. 如果需要重启sshd服务可使得

systemctl restart sshd.service

4. 设置为开机启动可使用:

systemctl enable sshd.service
- http://www.cnblogs.com/prettyisshit/p/5584558.html
- http://www.cnblogs.com/lovlos/p/6596796.html


## 参考 ##
- http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html
- https://www.w3ctech.com/topic/1602
- https://segmentfault.com/a/1190000008479071
- https://stackoverflow.com/questions/19777357/getting-permission-denied-for-scp-over-ssh-server-to-local
- http://www.worldhello.net/2010/04/08/1026.html
- https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
- https://gist.github.com/jexchan/2351996
- https://help.github.com/articles/using-ssh-over-the-https-port/
- http://blog.csdn.net/u012865381/article/details/78521087
- https://help.aliyun.com/knowledge_detail/41487.html
- http://blog.csdn.net/u013240609/article/details/78540795

用mac终端命令登录阿里云服务器，出现错误提示Permission denied (publickey,gssapi-keyex,gssapi-with-mic).
http://blog.csdn.net/gigijingjing/article/details/76726564
