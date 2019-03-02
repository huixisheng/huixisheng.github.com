title: SublimeText插件介绍
date: 2013-08-10 22:32:38
tags:
- SublimeText
---



记录Sublime Text使用过程中的点点滴滴，虽然网上关于Sublime Text介绍的文章很多，但是使用过程多少有点自己的看法或者想法。在使用IDE的路上还有漫长的故事，VS2020 - Eclipse － Dreamware - Aptana - EditPlus - Notepad++ - Sublime Text - ...。中间的过程中体验过webstorm，用下来感觉最棒的还是Sublime，高亮、缩进、插件、智能提示、代码片段等，Sublime顶呱呱，哗啦啦的。

<!-- more -->

目前[Sublime Text3](http://www.sublimetext.com/3)还是beta版本，打开的速度相对2有了很大的提升，但是不足的就是插件方面有很多不兼容。[查看Subliem Text3兼容的插件](https://sublime.wbond.net/)。感觉主要的那些插件ST3还是可以使用的。

还有一点就是从win系统过渡到mac系统，有很多的操作习惯和快捷键不一样，稍微有点小不适应。

# 我在使用的插件
## Package Control(不解释，神器)
Sublime Text2安装Package Control
使用`ctrl＋～ `调出控制台

    import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print 'Please restart Sublime Text to finish installation'

Sublime Text3如何安装Package Control
1、先下载[https://github.com/wbond/sublime_package_control](https://github.com/wbond/sublime_package_control)中的zip文件，解压后将文件夹名更改为 Package Control **PS:注意大小写**。

2、下载插件分支[https://github.com/wbond/sublime_package_control/tree/python3](https://github.com/wbond/sublime_package_control/tree/python3)中的zip文件，解压后覆盖到 Package Control 文件中，完成此插件API函数的更新。

3、将Package Control文件夹放入Sublime Text 3\Packages中，重启sublime text 3即可生效。

2013/08/22
今天有同事说Sublime Text3也是可以用命令的。[猛戳这里](https://sublime.wbond.net/installation)

    import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())


## Emment
[Emment书写规则](http://docs.emmet.io/)。ZenCoding的升级版，提高开发效率。写HTML特别爽。
## jsFormat
格式化JavaScript
## Alignment
可以根据 : 和 = 对齐，满足有代码洁癖同学的需求，快捷键是 `Command + Control + A`
## BracketHighlighter
括号高亮
## DocBlockr
提供 JSDoc 和 PHPDoc 的自动生成功能
## SidebarEnhancements
侧边栏增强
## HtmlTidy
清理与排版你的HTML代码
## ConvertToUTF8
ST2只支持utf8编码，该插件可以显示与编辑 GBK, BIG5, EUC-KR, EUC-JP, Shift_JIS 等编码的文件
## HTML-CSS-JS Prettify
格式化HTML、CSS、JS文件。这是我目前找到的最好的一个插件。推荐给同事，他们也说这个很不粗。
## [MarkdownEditing](https://github.com/SublimeText-Markdown/MarkdownEditing)
mardown 实时预览。
## [Git](https://github.com/kemayo/sublime-text-git)

# 快捷键(CMD相当Win的Ctrl键)
1. 同时编辑多行 CMD+Shift+L
2. 向下同时选中下一个相同的文本 反复按 CMD+D
3. 跳到指定行 CMD+G 或者 CMD+P后输入字符":"
4. 快速列出/跳转函数就是 CMD+R
5. 可以快速跳转到当前项目中的任意文件，可进行关键词匹配 CMD+P
6. 补充中

# Sublime 配置
## 创建可复用的代码片段
菜单上点击Tools -> New Snippet，会新建一个xml文件页
    content 里面就是代码模版：${序号：默认值} ，序号相同的地方光标会同时停在那可以多处同时编辑。序号大小就是tabindex。在实际使用代码的时候，可以使用tab切换光标位置。
    tabTrigger是指输入该字符串后tab就是在光标插入content中的内容。
    scope是指在何种文件类型中使用
## 鼠标双击选择－、$开头的变量名
添加用户自定义配置
    `"word_separators": "./\\()\"':,.;<>~!@#%^&*|+=[]{}`~?"`
## 怎样从直接Github的repository安装Sublime Text插件

>首先，我们假设你在用Sublime Text和Package Control插件。 按Ctrl + Shift + P（Mac下是Shift + CMD + P）进命令选择窗口，搜索"repository",选择"add repository" 直接输入一个Sublime Text的Github地址，如 https://github.com/ttscoff/MarkdownEditing 载入完成后就可以安装了，再按Ctrl + Shift + P（Mac下是Shift + CMD + P）进命令选择窗口，选择"Install Package",现在就可以安装刚刚添加的repository里面的插件了，按本文的例子是"MarkdownEditing"。[http://www.macdrifter.com/2012/08/install-sublime-packages-from-github.html](http://www.macdrifter.com/2012/08/install-sublime-packages-from-github.html)

2014-11-16 12:33:46 更新

sublime.wbond.net无法访问

[Sublime Text package manager](https://sublime.wbond.net/)被强了。[详见](http://weibo.com/1219344334/BuJwqBH1H?type=comment)

    50.116.34.243 sublime.wbond.net



# 感谢
## 感谢以下网站
- [Sublime常用插件收集贴](http://www.veryued.org/2012/11/sublime%E5%B8%B8%E7%94%A8%E6%8F%92%E4%BB%B6%E6%94%B6%E9%9B%86%E8%B4%B4/)
- [@大城小胖](http://weibo.com/finscn)[sublime text2 简介](http://v.youku.com/v_show/id_XMzU5NzQ5ODgw.html)
- [Sublime Text 2 - 性感无比的代码编辑器！程序员必备神器！跨平台支持Win/Mac/Linux](http://www.iplaysoft.com/sublimetext.html/comment-page-1)
- [sublime text 2学习(二):创建可复用的代码片段](http://www.blogjava.net/Hafeyang/archive/2012/08/17/how_to_create_code_snippet_in_subline_text_2.html)
- [Preferences.sublime-settings设置](http://hi.baidu.com/l245319872/item/afbb9734304981f5de222197)
- [sublime插件开发](http://ux.etao.com/posts/541)
- [Sublime Text](http://www.sublimetext.com/)
- [怎样从直接Github的repository安装Sublime Text插件](http://timewilltell.me/post/manually-add-sublime-package-repository)
- [Sublime text 3如何安装package control办法](http://dengo.org/archives/594)
- [很全面和实用的Sublime 插件列表](http://ipestov.com/the-best-plugins-for-sublime-text/)




