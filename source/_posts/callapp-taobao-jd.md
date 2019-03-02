title: App呼起京东和淘宝指定的页面
date: 2018-04-01 23:45:06
tags:
- schema
- App
---

需求: 需要在自己的App直接打开京东和淘宝指定的页面。
<!-- more -->

对于ios，首先想到的是根据页面的js找到对应的universal link。ios9以下和安卓就用schema跳转。

对于京东的链接 [https://pro.m.jd.com/mall/active/3pR34myNmV7cXiR4DjzUSRuu5hqA/index.html?ad_od=1&utm_source=kong&utm_medium=zssc&utm_campaign=t_1000210271_100854&utm_term=ea62df13-dc13-44c8-ae00-59b5683ec8f2-p_1999-pr_1076-at_100854&jd_pop=ea62df13-dc13-44c8-ae00-59b5683ec8f2&abt=0](https://pro.m.jd.com/mall/active/3pR34myNmV7cXiR4DjzUSRuu5hqA/index.html?ad_od=1&utm_source=kong&utm_medium=zssc&utm_campaign=t_1000210271_100854&utm_term=ea62df13-dc13-44c8-ae00-59b5683ec8f2-p_1999-pr_1076-at_100854&jd_pop=ea62df13-dc13-44c8-ae00-59b5683ec8f2&abt=0) 分析源码[https://st.360buyimg.com/common/commonH_B/js/m_common_merge2.1.js](https://st.360buyimg.com/common/commonH_B/js/m_common_merge2.1.js)  网上还找到这个[版本的js](http://st.360buyimg.com/m/js/2014/module/plugIn/downloadAppPlugIn_imk2.js?v=jd201612271841)

```
aE(e.openAppBtnId, "click", function() {
  aw("0");
  var aU = this.getAttribute("id");
  var aR = aI[aU];
  // 添加断点，跟踪代码
  if (!i) {
    var aT = document.createElement("iframe");
    aT.id = aj;
    document.body.appendChild(aT);
    document.getElementById(aj).style.display = "none";
    document.getElementById(aj).style.width = "0px";
    document.getElementById(aj).style.height = "0px";
    i = true
  }
  if (aR.openAppCallback) {
    var aS = aR.openAppCallbackSource ? aR.openAppCallbackSource : null;
    aR.openAppCallback.call(this, aS)
  }
  f(aR, "appDownOpenIntervalTime");
  aH(aR);
  if (l.isUseUniversalLinks && !aR.noJdApp) {
    az(aR)
  } else {
    af(aR)
  }
})
```

```
function az(aS) {
  var aV = aQ(aS, true);
  var aT = aS.universalLinksUrl + "/ul/ul.action?" + aV;
  // 可以判定aT应该就是universal links
  if (navigator.userAgent.indexOf("baidubrowser") >= 0) {
    window.location.href = aT
  } else {
    var aR = document.createElement("a");
    aR.setAttribute("href", aT);
    aR.style.display = "none";
    document.body.appendChild(aR);
    var aU = document.createEvent("HTMLEvents");
    aU.initEvent("click", !1, !1);
    aR.dispatchEvent(aU)
  }
}
```

测试发现根据代码获得universal link只能打开京东的首页`https://linkst.m.jd.com/ul/ul.action?openApp.jdMobile://virtual?params={"category":"jump","des":"m","sourceValue":"babel-act","sourceType":"babel","url":"https%3A%2F%2Fpro.m.jd.com%2Fmall%2Factive%2F3pR34myNmV7cXiR4DjzUSRuu5hqA%2Findex.html%3Fad_od%3D1%26utm_source%3Dkong%26utm_medium%3Dzssc%26utm_campaign%3Dt_1000210271_100854%26utm_term%3Dea62df13-dc13-44c8-ae00-59b5683ec8f2-p_1999-pr_1076-at_100854%26jd_pop%3Dea62df13-dc13-44c8-ae00-59b5683ec8f2%26abt%3D0","M_sourceFrom":"H5_UL","msf_type":"click","NoJumpDownLoadPage":false,"downAppIos":"https%3A%2F%2Fst.360buyimg.com%2Fcommon%2FdownLoadCommon%2FdownLoadAppIOSMPage.html","locationHref":"https%3A%2F%2Fpro.m.jd.com%2Fmall%2Factive%2F3pR34myNmV7cXiR4DjzUSRuu5hqA%2Findex.html%3Fad_od%3D1%26utm_source%3Dkong%26utm_medium%3Dzssc%26utm_campaign%3Dt_1000210271_100854%26utm_term%3Dea62df13-dc13-44c8-ae00-59b5683ec8f2-p_1999-pr_1076-at_100854%26jd_pop%3Dea62df13-dc13-44c8-ae00-59b5683ec8f2%26abt%3D0","m_param":{"m_source":"0","event_series":{},"jda":"122270672.2074471510.1521534916.1522766295.1522991099.5","usc":"kong","ucp":"t_1000210271_100854","umd":"zssc","utr":"ea62df13-dc13-44c8-ae00-59b5683ec8f2-p_1999-pr_1076-at_100854","jdv":"122270672%7Ckong%7Ct_1000210271_100854%7Czssc%7Cea62df13-dc13-44c8-ae00-59b5683ec8f2-p_1999-pr_1076-at_100854%7C1522991529755","ref":"https%3A%2F%2Fpro.m.jd.com%2Fmall%2Factive%2F3pR34myNmV7cXiR4DjzUSRuu5hqA%2Findex.html%3Fad_od%3D1%26utm_source%3Dkong%26utm_medium%3Dzssc%26utm_campaign%3Dt_1000210271_100854%26utm_term%3Dea62df13-dc13-44c8-ae00-59b5683ec8f2-p_1999-pr_1076-at_100854%26jd_pop%3Dea62df13-dc13-44c8-ae00-59b5683ec8f2%26abt%3D0","psn":"2074471510|5","psq":14,"unpl":"V2_ZzNsbRBVFkAiXE9dZx5dVTUfFwlEUV9FdwFHSClNDgFkURpaF1MXQWlJKFRzEVQZJkB8XUNRRAklTShUehhVAWIzEVxCXl8UdxREVWoaXw5mBRldRGdDJXUJR1V4GV0GYQMibXJXQSV0OEVVfRxZA2cHElxyURNHdV1PBC8FCVJvAw5YRABBCSYIE1JnGQhWbwQRW0FQQ0ImOEBS","pc_source":"","mba_muid":"2074471510","mba_sid":"15229910996761532999810513868","mt_xid":"","mt_subsite":""},"SE":{"mt_subsite":"","__jdv":"122270672%7Ckong%7Ct_1000210271_100854%7Czssc%7Cea62df13-dc13-44c8-ae00-59b5683ec8f2-p_1999-pr_1076-at_100854%7C1522991529755","unpl":"V2_ZzNsbRBVFkAiXE9dZx5dVTUfFwlEUV9FdwFHSClNDgFkURpaF1MXQWlJKFRzEVQZJkB8XUNRRAklTShUehhVAWIzEVxCXl8UdxREVWoaXw5mBRldRGdDJXUJR1V4GV0GYQMibXJXQSV0OEVVfRxZA2cHElxyURNHdV1PBC8FCVJvAw5YRABBCSYIE1JnGQhWbwQRW0FQQ0ImOEBS","__jda":"122270672.2074471510.1521534916.1522766295.1522991099.5"}}`

初步怀疑:
- 是不是参数没有encode
- schema的大小写是不是有问题

猜测的结论

- 京东和微信的关系，京东的schema是白名单，打开App没有限制，而对universal link 的测试不充分，导致相应的链接有问题


通过测试其他的app打开京东的页面，首次有弹框是否打开京东的提示，确认后下次就没有，然而美妆心得的App就是无反应。


> 近期苹果公司iOS 9系统策略更新，限制了http协议的访问，此外应用需要在“Info.plist”中将要使用的URL Schemes列为白名单，才可正常检查其他应用是否安装。 来自 https://www.jianshu.com/p/a8cce94d508e


对于淘宝的链接[https://h5.m.taobao.com/awp/core/detail.htm?id=528294025825&scm=1007.12144.81309.242610_242610&pvid=2f68b234-58a1-47de-aa7b-266c7abe0b48&spm=a217e.7680114.75b100109.d5n0](https://h5.m.taobao.com/awp/core/detail.htm?id=528294025825&scm=1007.12144.81309.242610_242610&pvid=2f68b234-58a1-47de-aa7b-266c7abe0b48&spm=a217e.7680114.75b100109.d5n0)

定位[代码](https://g.alicdn.com/mtb/lib-smb-wake/0.0.37/wake.js)
```
e.exports = function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
if ("TB" != n.aliapp.appname && "TB-PD" != n.aliapp.appname) {
  t.point = t.point || {},
  t.point.callType = t.callType;
  var a = (0,
  r.default)(e, t)
    , s = {
    package: "com.taobao.taobao"
  };
  switch (t.callType) {
  case "universalLink":
    if (n.os.isIPhone && n.os.version.gte("9.0")) {
      var l = (0,
      o.appendParams)(t.universalLink || "//b.mashort.cn/ulk/taobao", {
        smburl: encodeURIComponent(a)
      });
      t.redirectUrl && (l = (0,
      o.appendParams)(l, {
        redirectUrl: encodeURIComponent(t.redirectUrl)
      })),
      (0,
      i.default)(l, "universalLink")
    } else
      (0,
      i.default)(a, "scheme", s);
    break;
```

获得的[universal link](//b.mashort.cn/ulk/taobao?smburl=tbopen%3A%2F%2Fm.taobao.com%2Ftbopen%2Findex.html%3Faction%3Dali.open.nav%26module%3Dh5%26bootImage%3D0%26source%3Dsb%26appkey%3D24585258%26smbSid%3DSCNgEI25%252FmcCAXAKKjvEkBJ5_1522993546044%26rbbt%3Dbc.mainDetail.6.2.7c9ce02c41d449c1b84a71b4eb8c2f63%26params%3D%257B%2522fingerCode%2522%253A%2522273be573e1389f93c81ec4a9a63c9a54%2522%252C%2522fingerCostTime%2522%253A%2522252%2522%252C%2522mtopCostTime%2522%253A%2522251%2522%252C%2522_t%2522%253A%25221522994027375%2522%257D%26point%3D%257B%2522from%2522%253A%2522h5%2522%252C%2522h5_uid%2522%253A%2522SCNgEI25%252FmcCAXAKKjvEkBJ5%2522%252C%2522ap_uri%2522%253A%2522sb_redirect_manual%2522%252C%2522page%2522%253A%2522mainDetail%2522%252C%2522callType%2522%253A%2522universalLink%2522%257D%26h5Url%3Dhttps%253A%252F%252Fh5.m.taobao.com%252Fawp%252Fcore%252Fdetail.htm%253Fid%253D528294025825%2526scm%253D1007.12144.81309.242610_242610%2526pvid%253D2f68b234-58a1-47de-aa7b-266c7abe0b48%2526spm%253Da217e.7680114.75b100109.d5n0%2526point%253D%25257B%252522from%252522%25253A%252522h5%252522%25252C%252522h5_uid%252522%25253A%252522SCNgEI25%25252FmcCAXAKKjvEkBJ5%252522%25252C%252522ap_uri%252522%25253A%252522sb_redirect_manual%252522%25252C%252522page%252522%25253A%252522mainDetail%252522%25252C%252522callType%252522%25253A%252522universalLink%252522%25257D)。测试发现其实[分享的淘宝口令http://m.tb.cn/h.WE82pie](http://m.tb.cn/h.WE82pie)本身就是universal link

## 扩展阅读 ##
- [MobLink网页跳转app指定界面技术简介之 URL Scheme](https://sdk.cn/news/7019)
- [突破微信跳转限制－Universal-Links那些坑](https://github.com/eleme/mobilists/blob/master/source/_posts/%E7%AA%81%E7%A0%B4%E5%BE%AE%E4%BF%A1%E8%B7%B3%E8%BD%AC%E9%99%90%E5%88%B6%EF%BC%8DUniversal-Links%E9%82%A3%E4%BA%9B%E5%9D%91.md)
- [关于通过H5页面唤起Native客户端的介绍](https://futu.im/posts/h5-callup-native/)
- [Universal links 介绍](http://www.magicwindow.cn/doc/universal-link-info.html)

## 参考 ##
- [H5端唤醒移动客户端程序](https://github.com/AlanZhang001/H5CallUpNative)
- [京东在html5页面中打开本地app的解决方案](https://segmentfault.com/a/1190000006929722)