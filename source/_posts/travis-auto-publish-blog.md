title: 利用trivas自动部署hexo的blog
date: 2018-04-06 14:41:16
tags:
- trivas
- hexo
---

是什么原因让你折腾[travis](https://travis-ci.org/)？是懒!懒!懒！每次提交代码后台又要手动输一次`hexo d -g`，真心觉得麻烦，作为程序猿，就应该学会偷懒，可以少输几次相同的命令，心情甚是愉悦。

当然之前也有接触过[travis](https://travis-ci.org/)，比如[x-ci](https://github.com/huixisheng/x-ci)[travis](https://travis-ci.org/)的简单使用，[团队博客的部署](https://github.com/cosmeapp/cosmeapp.github.com/blob/dev/.travis.yml)。

<!-- more -->

## 相关步骤记录 ##

### travis-ci 添加项目 ###

使用github账号登录[travis](https://travis-ci.org/) 并添加相关的项目

### GitHub生成Personal Access Token ###

[settings](https://github.com/settings/profile)->[Developer settings](https://github.com/settings/developers)->[Personal access tokens](https://github.com/settings/tokens)->点击[Generate new token](https://github.com/settings/tokens/new)

生成完后拷贝记录下来，后面`travis`登录需要用到。刷新页面后台`token`将不可见，只能重新生成。

### 配置.travis.yml ###

```
➜  gem install travis --no-rdoc --no-ri
➜  huixisheng.github.com git:(dev) ✗ travis login --github-token [上一步记录的token]
Successfully logged in as huixisheng!
➜  huixisheng.github.com git:(dev) ✗ travis encrypt-file ~/.ssh/github --add
➜  huixisheng.github.com git:(dev) ✗ travis encrypt-file ~/.ssh/github-ci --add
encrypting /Users/huixisheng/.ssh/github-ci for huixisheng/huixisheng.github.com
storing result as github-ci.enc
storing secure env variables for decryption

Make sure to add github-ci.enc to the git repository.
Make sure not to add /Users/huixisheng/.ssh/github-ci to the git repository.
Commit all changes to your .travis.yml.
```

> 如果安装travis无反应，可以更新`gem sources --add https://gems.ruby-china.org/
`国内镜像源

然后看下`.travis.yml`是不是增加了:

```
- openssl aes-256-cbc -K $encrypted_11753ec45e06_key -iv $encrypted_11753ec45e06_iv
  -in github-ci.enc -out ~\/.ssh/github-ci -d
``` 目录下生成`github-ci.enc`。

## 其他方法 ##

主要原理是通过 `https://<token 刚才要记录的>@github.com/owner/repo.git
`去提交构建生成的内容。

相关阅读
- [Authenticate with GitHub using token
](https://stackoverflow.com/questions/18935539/authenticate-with-github-using-token)
- https://developer.github.com/v3/auth/#working-with-two-factor-authentication


## 总结 ##

网上确实有很多的教程，但是如果不去实际操作下，那个教程永远是别人的，还有就是根据相同的教程，别人可以配置成功，而我们不一定可以配置成功，比如存在电脑环境不一样。nodejs版本不一样等等。有可能你会碰到意想不到的问题。只有自己真正折腾过了，才知道坑有多深，城市套路有多少。

## 碰到问题 ##

```
travis No such file or directory:bss_file.c:398:fopen('~/.ssh/id_rsa','w')
```

`-out ~\/.ssh/id_rsa -d` -> `-out ~/.ssh/id_rsa -d`
- https://github.com/travis-ci/travis.rb/issues/555


```
remote: Invalid username or password.
fatal: Authentication failed for 'https://github.com/huixisheng/huixisheng.github.com.git/'
FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html
Error: remote: Invalid username or password.
```

在`.travis.yml`添加`ssh -T git@github.com`测试，发现ssh的配置是没问题的。
```
0.59s$ ssh -T git@github.com
Warning: Permanently added the RSA host key for IP address '192.30.253.112' to the list of known hosts.
Hi cosmeapp/cosmeapp.github.com! You've successfully authenticated, but GitHub does not provide shell access.
The command "ssh -T git@github.com" failed and exited with 1 during .
```
再次添加`travis-ci`居然成功了。

## 参考 ##
- [Hexo 自动部署到 Github](http://lotabout.me/2016/Hexo-Auto-Deploy-to-Github/)
- [使用 Travis 自动部署 Hexo 到 Github 与 自己的服务器](https://segmentfault.com/a/1190000009054888)
- [使用Travis CI自动部署Hexo博客](http://www.itfanr.cc/2017/08/09/using-travis-ci-automatic-deploy-hexo-blogs/)
- [Travis CI 系列：自动化部署博客](https://cosmeapp.github.io/2017/09/18/travis-ci-auto-build/)
