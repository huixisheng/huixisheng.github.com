title: 简单介绍cnpmjs安装和碰到的问题
date: 2018-03-27 21:37:18
tags:
- nodejs
- cnpmjs
---

[cnpmjs](https://github.com/cnpm/cnpmjs.org) 可用于企业的前端私有包管理。淘宝`NPM`镜像就是用这个搭建的。

[npmjs](https://www.npmjs.org/)私有包是要收费的，对于公司而言更倾向于自己部署，一是省钱，二是一些含有敏感内容的包放到其他平时总是不放心。

本文将简单记录下实际安装过程中碰到的问题，基本的安装可以移步[官方文档](https://github.com/cnpm/cnpmjs.org/wiki)。

## 安装 ##
```
$ yum install -y nodejs
$ yun install git
$ git clone git://github.com/cnpm/cnpmjs.org.git $HOME/cnpmjs.org

# centos7 安装失败
$ yum install mysql mysql-server

$ yum update
$ yum localinstall mysql-community-release-el7-5.noarch.rpm
$ yum repolist enabled | grep "mysql.*-community.*"
$ yum repolist all | grep mysql
$ yum-config-manager --disable mysql56-community
$ sudo yum search yum-config-manager
$ yum install yum-utils
$ yum-config-manager --disable mysql56-community
$ yum-config-manager --enable mysql57-community-dmr
$ yum repolist all | grep mysql
$ yum repolist enabled | grep mysql
$ yum install mysql-serve

# centos7 相关mysql命令
$ service mysqld status
$ service mysqld stop
$ service mysqld start

# centos7 关闭防火墙 #
$ systemctl stop firewalld.service
$ systemctl disable firewalld.service #禁止firewall开机启动
$ systemctl stop firewall // centos7以下的版本命令
```
以上部分命令来源于网络，时隔太久，找不到相关的出处，😶。

## 发布的模块npm install 报错

```
[npminstall:get] retry GET http://xx.xx.xx.xx:7001xx-debug after 100ms, retry left 4, error: SyntaxError: Unexpected token l in JSON at position 0
...
SyntaxError: Unexpected token l in JSON at position 0
    at JSON.parse (<anonymous>)
    at _get (/usr/local/lib/node_modules/cnpm/node_modules/npminstall/lib/get.js:70:26)
    at _get.next (<anonymous>)
    at onFulfilled (/usr/local/lib/node_modules/cnpm/node_modules/co/index.js:65:19)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
npminstall version: 3.2.1
...

```

发现原因是`npm>=5.6`的时候有这个问题
```
➜  huixisheng.github.com git:(dev) ✗ npm -v
5.4.1
➜  huixisheng.github.com git:(dev) ✗ cnpm -v
cnpm@5.1.1 (/usr/local/lib/node_modules/cnpm/lib/parse_argv.js)
npm@5.6.0 (/usr/local/lib/node_modules/cnpm/node_modules/npm/lib/npm.js)
```

- https://github.com/cnpm/cnpmjs.org/issues/1110

## 配置修改 ##
```
   /**
    * Cluster mode
    */
-  enableCluster: false,
+  enableCluster: true,
   numCPUs: os.cpus().length,

   /*
@@ -27,7 +27,7 @@ var config = {

   registryPort: 7001,
   webPort: 7002,
   // 用于外部ip访问
-  bindingHost: '127.0.0.1', // only binding on 127.0.0.1 for local access
+  //bindingHost: '127.0.0.1', // only binding on 127.0.0.1 for local access

   // debug mode
   // if in debug mode, some middleware like limit wont load
@@ -62,10 +62,14 @@ var config = {

   // default system admins
   admins: {
+    huixisheng: 'huixisheng@gmail.com'
   },

   // email notification for errors
@@ -98,13 +102,13 @@ var config = {
    */

   database: {
-    db: 'cnpmjs_test',
+    db: 'cnpm',
     username: 'root',
-    password: '',
+    password: 'mysqlpassword',

     // the sql dialect of the database
     // - currently supported: 'mysql', 'sqlite', 'postgres', 'mariadb'
-    dialect: 'sqlite',
+    dialect: 'mysql',

     // custom host; default: 127.0.0.1
     host: '127.0.0.1',
@@ -135,7 +139,8 @@ var config = {
   downloadRedirectToNFS: false,

   // registry url name
-  registryHost: 'r.cnpmjs.org',
+  registryHost: 'xx.xx.xx.xx:7001',
+  // registryHost: 'r.cnpmjs.org',

   /**
    * registry mode config
@@ -144,11 +149,11 @@ var config = {
   // enable private mode or not
   // private mode: only admins can publish, other users just can sync package from source npm
   // public mode: all users can publish
-  enablePrivate: false,
   // 注册用户才可以发布模块
+  enablePrivate: true,

   // registry scopes, if don't set, means do not support scopes
-  scopes: [ '@cnpm', '@cnpmtest', '@cnpm-test' ],
-
+  // scopes: [ '@cnpm', '@cnpmtest', '@cnpm-test', '@cosme' ],
+  scopes: [],
   // some registry already have some private packages in global scope
   // but we want to treat them as scoped private packages,
   // so you can use this white list.
@@ -169,6 +174,7 @@ var config = {
   // If you want to directly sync from official npm's registry
   // please drop them an email first
   sourceNpmRegistry: 'https://registry.npm.taobao.org',
+  // sourceNpmRegistry: 'http://xx.xx.xx.xx:7001',

   // upstream registry is base on cnpm/cnpmjs.org or not
   // if your upstream is official npm registry, please turn it off
@@ -197,8 +203,6 @@ var config = {

   // sync devDependencies or not, default is false
   syncDevDependencies: false,
-  // try to remove all deleted versions from original registry
-  syncDeletedVersions: true,

   // changes streaming sync
   syncChangesStream: false,
@@ -215,7 +219,7 @@ var config = {

   // always-auth https://docs.npmjs.com/misc/config#always-auth
   // Force npm to always require authentication when accessing the registry, even for GET requests.
-  alwaysAuth: false,
    // 命令安装的时候也要输入命名
+  alwaysAuth: true,

   // if you're behind firewall, need to request through http proxy, please set this
   // e.g.: `httpProxy: 'http://proxy.mycompany.com:8080'`
diff --git a/cnpmjs.org/servers/registry.js b/cnpmjs.org/servers/registry.js
index d2758e5..2d67184 100644
--- a/cnpmjs.org/servers/registry.js
+++ b/cnpmjs.org/servers/registry.js
@@ -34,7 +34,7 @@ app.use(cors({
   allowMethods: 'GET,HEAD',
 }));
 // 关闭用户注册接口
 app.use(auth());
-app.use(proxyToNpm());
+//app.use(proxyToNpm());
 app.use(notFound);

 if (config.enableCompress) {
diff --git a/cnpmjs.org/view/web/footer.html b/cnpmjs.org/view/web/footer.html
index e7a0f04..d432a6d 100644
--- a/cnpmjs.org/view/web/footer.html
+++ b/cnpmjs.org/view/web/footer.html
@@ -1,5 +1,4 @@
-Copyright 2013 - 2016 &copy; cnpmjs.org
+Copyright 2013 - 2018 &copy; cnpmjs.org
 |
 <a href="/">Home</a>
 |
-<script>var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_5757157'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s17.cnzz.com/stat.php%3Fid%3D5757157%26online%3D1%26show%3Dline' type='text/javascript'%3E%3C/script%3E"));</script>

```


## 相关问题

### 阿里云无法通过ip:端口访问
![](/images/cnpmjs/aliyun.jpeg)

### ssh无法登录阿里云服务器
![](/images/cnpmjs/mac-permission-denied.jpeg)

### cnpm同步文件的存储位置在哪里

默认是在 $HOME/.cnpmjs.org/nfs 下面。具体看config配置
https://github.com/cnpm/cnpmjs.org/issues/635

### 失败 & 如何加入权限验证
https://github.com/cnpm/cnpmjs.org/issues/925

### 如何修改admin的密码？
- https://github.com/cnpm/cnpmjs.org/issues/1050
- https://github.com/cnpm/cnpmjs.org/issues/385

### cnpm添加用户，以及admin用户如何publish
- https://github.com/cnpm/cnpmjs.org/issues/431
