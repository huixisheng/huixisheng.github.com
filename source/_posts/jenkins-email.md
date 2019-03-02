title: jenkins发送自定义内容邮件
date: 2016-11-26 00:43:05
tags:
- 持续集成
- jenkins
- groovy
---

本文介绍了`groovy`脚本自定义构建完成后通知邮件的标题和内容。

<!--more-->

## 安装插件 ##

[Email Extension Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Email-ext+plugin)

## 配置邮件地址 ##

![](/images/jenkins/jenkins-mail-1.jpeg)
![](/images/jenkins/jenkins-mail-2.jpeg)

**注意**管理员的邮件地址要用户名邮件地址一致，不然发不了邮件

![](/images/jenkins/jenkins-mail-3.jpeg)



## 自定义邮件内容 ##

希望邮件的标题是含有`plist`或者`AndroidManifest.xml`的版本信息。下载地址是蒲公英的历史地址，而不是最终的固定地址。

![](/images/jenkins/jenkins-mail-4.jpeg)

**注意设置**`Content Type:HTML(text/html)`

### 变更记录 ###

```
<h2>变更记录</h2>
<ol>
${CHANGES_SINCE_LAST_SUCCESS,reverse=true, format="",showPaths=true,changesFormat="<li><pre>[%a]<br />%m</pre></li>",pathFormat="    %p"}
</ol>
[参考来自](http://m.blog.csdn.net/article/details?id=50595720)
```
通过搜索`CHANGES_SINCE_LAST_SUCCESS`找到
>${CHANGES_SINCE_LAST_SUCCESS} -显示上一次成功构建之后的变化。
 reverse在顶部标示新近的构建。默认false。
 format遍历构建信息，一个包含%X的字符串，其中%c为所有的改变，%n为构建编号。默认”Changes for Build #%n\n%c\n”。
 showPaths,changesFormat,pathFormat分别定义如${CHANGES}的showPaths、format和pathFormat参数。
 来自:http://www.cnblogs.com/zz0412/p/jenkins_jj_01.html

### 项目信息 ###

```
<ul>
    <li>项目名称 ： ${PROJECT_NAME}</li>
    <li>构建编号 ： 第${BUILD_NUMBER}次构建</li>
    <li>SVN 版本： ${SVN_REVISION}</li>
    <li>触发原因： ${CAUSE}</li>
    <li>构建日志： <a href="${BUILD_URL}console">${BUILD_URL}console</a></li>
    <li>构建  Url ： <a href="${BUILD_URL}">${BUILD_URL}</a></li>
    <li>工作目录 ： <a href="${PROJECT_URL}ws">${PROJECT_URL}ws</a></li>
    <li>项目  Url ： <a href="${PROJECT_URL}">${PROJECT_URL}</a></li>
</ul>
```

### 系统变量 ###

- https://wiki.jenkins-ci.org/display/JENKINS/Building+a+software+project
- 查看jenkins相关的变量http://192.168.6.100:9999/env-vars.html/
```
__CF_USER_TEXT_ENCODING:0x1F5:0x19:0x34
ANDROID_HOME:/Users/huixisheng/Library/Android/sdk
BUILD_DISPLAY_NAME:#19
BUILD_ID:19
BUILD_NUMBER:19
BUILD_TAG:jenkins-mail-test-19
BUILD_URL:http://localhost:9999/job/mail-test/19/
CLASSPATH:
com.apple.java.jvmTask:CommandLine
EXECUTOR_NUMBER:1
GIT_BRANCH:origin/master
GIT_COMMIT:869c988fd3b4124d8e7c6accc50d73df225ce4f9
GIT_PREVIOUS_COMMIT:869c988fd3b4124d8e7c6accc50d73df225ce4f9
GIT_PREVIOUS_SUCCESSFUL_COMMIT:869c988fd3b4124d8e7c6accc50d73df225ce4f9
GIT_URL:git@git.coding.net:huixisheng/wapApp.git
HOME:/Users/huixisheng
HUDSON_HOME:/Users/Shared/Jenkins/Home
HUDSON_SERVER_COOKIE:83752ef1802c9c47
HUDSON_URL:http://localhost:9999/
JAVA_ARCH:x86_64
JAVA_MAIN_CLASS_64:Main
JENKINS_HOME:/Users/Shared/Jenkins/Home
JENKINS_SERVER_COOKIE:83752ef1802c9c47
JENKINS_URL:http://localhost:9999/
JOB_BASE_NAME:mail-test
JOB_NAME:mail-test
JOB_URL:http://localhost:9999/job/mail-test/
LOGNAME:huixisheng
NODE_LABELS:master
NODE_NAME:master
PATH:/Users/huixisheng/.rvm/gems/ruby-2.3.0/bin:/Users/huixisheng/.rvm/gems/ruby-2.3.0@global/bin:/Users/huixisheng/.rvm/rubies/ruby-2.3.0/bin:/Users/huixisheng/Library/Android/sdk/tools:/Users/huixisheng/Library/Android/sdk/platform-tools:/Users/huixisheng/.sdkman/candidates/gradle/current/bin:/Users/huixisheng/bin:/usr/local/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/huixisheng/.rvm/bin:/Users/huixisheng/.rvm/bin
PWD:/
SHELL:/bin/zsh
SHLVL:0
TMPDIR:/var/folders/1f/pt5xk8yn1ybgnp9tsjhwtn4h0000gn/T/
USER:huixisheng
WORKSPACE:/Users/Shared/Jenkins/Home/workspace/mail-test
XPC_FLAGS:0x0
XPC_SERVICE_NAME:org.jenkins-ci
----------FF--
```

### groovy自定义邮件标题 ###

`Pre-send Script`添加`groovy`脚本可以设置自定义邮件标题

```
import java.util.regex.Matcher
import java.util.regex.Pattern

def var = build.getEnvVars()

def plist = var.get("JENKINS_HOME") + '/workspace/app-ios/Other Sources/Info.plist'
def text = new File(plist).text

def pattern = ~/CFBundleShortVersionString.*\n.*<string>(.*)<\/string>/
assert pattern instanceof Pattern

def matcher = pattern.matcher(text)
def subject = msg.getSubject()

// 修改邮件标题
subject = "#" + var.get("BUILD_NUMBER") + " IOS-" + matcher[0][1] + '测试包构建于' + new Date().format('MM月dd日 HH:mm:ss')

msg.setSubject(subject)

// 修改邮件内容
def qrfile = var.get("WORKSPACE") + '/appQRCodeURL.html'
def qrtext = new File(qrfile).text

def downurlfile = var.get("WORKSPACE") + '/appDownloadPageURL.html'
def downurl= new File(downurlfile).text

def emailContent = msg.getContent().getBodyPart(0).getContent()
emailContent = emailContent.replaceAll('固定的蒲公英二维码下载地址', qrtext)
emailContent = emailContent.replaceAll('固定的蒲公英下载地址', downurl)
msg.setContent(emailContent, "text/html; charset=utf-8");

```
起初想着是通过`groovy`去解析`plist`文件，结果没驾驭好这个脚本语言，实现不了。想到的办法只能通过正则去匹配，这个语言的正则跟我接触最多的`javascript`稍稍有点不一样。折腾了好久，主要的问题应该是对`java`不熟悉。


以下是`groovy`相关的一些资料:
```
解析plist文件相关参考文章
- https://gist.github.com/vgrichina/1604592
- http://stackoverflow.com/questions/7484163/how-to-parse-plist-file-in-java
- https://codegists.com/code/groovy-xml-parser-slurper/

开启GUI命令`groovyConsole`

groovy文档
- http://groovy.zeroleaf.com/
- one-tab地址集合: http://www.one-tab.com/page/DI5TcLLgQJOKapjvx0FOHQ
```
后期会专门的文章去介绍`groovy`,先给自己挖个坑。


### groovy自定义邮件内容 ###

上传蒲公英是用`python`写的，上传完成接口返回的地址信息怎么给`groovy`。最初以为是设置`os.environ`，然后`groory`通过`build.getEnvVars()`去获取就可以。结果是不行的。想了折中的方法，地址写入文件然后读取。


## 总结 ##

勉强实现了按自己的要求去自定义了`jenkins`的邮件内容。从问题的提出，找资料，苦恼，问题解决等过程中学到了很多，对`groovy`有了个简单的认识，后期的总结回顾很重要，最好的产物是输出。

## 参考 ##
1. http://m.blog.csdn.net/article/details?id=50595720
2. http://www.jianshu.com/p/e4e8ec2d8504
3. [配置jenkins发送邮件](http://liuhongjiang.github.io/hexotech/2015/12/04/jenkins-send-email-after-build/) 这篇文章对我的启发很大
4. http://www.cnblogs.com/zz0412/p/jenkins_jj_01.html
5. http://www.cnblogs.com/GGHHLL/p/jenkins.html
6. http://wenku.baidu.com/view/a71a9281b9d528ea81c77953.html
8. http://www.lai18.com/content/4985104.html?from=cancel

感谢互联网的创造作们
