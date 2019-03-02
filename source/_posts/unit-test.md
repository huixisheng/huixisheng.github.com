title: unit-test
date: 2018-03-27 23:36:50
tags:
- 单元测试
- 资源
---

## 测试框架 ##

- [karma](http://karma-runner.github.io/0.12/index.html)
- https://mochajs.org
- Jasmine
- Qunit
- JsTestDriver
- JSUnit
- https://github.com/totorojs/totoro

### 测试框架对比 ###

- [Javascript单元测试框架Qunit和Jasmine的比较](http://www.zuojj.com/archives/440.html)

## 断言库 ##

- [chai](http://chaijs.com)


## 教程 ##

- [ruanyf/mocha-demos](https://github.com/ruanyf/mocha-demos) [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
- http://wiki.jikexueyuan.com/project/node-lessons/mocha-chai-phantomjs.html


##  BDD / TDD区别 ##

```
// TDD
suite('Array', function() {
  setup(function() {
  });

  test('equal -1 when index beyond array length', function() {
    assert.equal(-1, [1,2,3].indexOf(4));
  });
});

// BDD
describe('Array', function() {
  before(function() {
  });

  it('should return -1 when no such index', function() {
    [1,2,3].indexOf(4).should.equal(-1);
  });
});
```
> 来自: http://taobaofed.org/blog/2015/12/10/nodejs-unit-tests/

- [关于TDD、BDD和DDD的一些看法](http://www.cnblogs.com/ustbwuyi/archive/2012/10/26/2741223.html)
- [TDD与BDD的差别](http://ilucas.me/2016/03/07/difference-between-tdd-and-bdd/)

## 覆盖率 ##

- istanbul

## 问题 ##

    -- recursive执行子目录

> Mocha默认运行test子目录里面的测试脚本。所以，一般都会把测试脚本放在test目录里面，然后执行mocha就不需要参数了。


mocha.opts

## api 接口测试 ##
- [接口测试 测试来带个节奏之 API 测试工具篇](https://testerhome.com/topics/5372)
- http://pythonhackers.com/p/tsq/node-autotest
- [让你的 Node.js 应用接口稳如狗：如何使用 Mocha, Chai 和 SuperTest 写测试代码](https://log.zvz.im/2016/06/07/Make-your-Nodejs-API-robust/)
- https://www.npmjs.com/package/moa-api
- [API自动化测试利器——Postman](http://www.bayescafe.com/tools/use-postman-to-test-api-automatically.html)
- [casperjs+mocha+chai搭建E2E测试环境](http://blog.kazaff.me/2016/08/24/casperjs+mocha+chai搭建E2E测试环境/)

## 相关文档 ##

- [Mocha.js官方文档翻译 —— 简单、灵活、有趣](http://www.jianshu.com/p/9c78548caffa)
- [在Node.js上用什么测试框架好？](https://www.zhihu.com/question/20075367)
- [虚拟座谈会：代码测试比率、测试驱动开发及行为驱动开发](http://www.infoq.com/cn/articles/virtual-panel-tdd-bdd)
- [如何进行前端自动化测试？](https://www.zhihu.com/question/29922082)
- [前端单元测试探索](https://gold.xitu.io/entry/57dbc89c7db2a24eb1a99604)
- [前端自动化测试工具总结 ](https://github.com/kuangwk/myblog/issues/1)
- [前端测试工具集锦](https://testerhome.com/topics/5189)

## 其他 ##

- [sinon](http://sinonjs.org/)
- https://github.com/visionmedia/superagent/tree/master/test/node
- supertest


