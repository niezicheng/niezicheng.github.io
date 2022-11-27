---
title: 前端工程化
order: 9
# toc: 'menu'
nav:
  title: 知识集锦
  order: 0
---

## 模版引擎

[Vue 模板编译原理 ](https://github.com/berwin/Blog/issues/18)

[实现一个简单的模版引擎](http://www.alloyteam.com/2016/10/implement-a-simple-template-engine/)

## 前端发布

[大公司里怎样开发和部署前端代码？](https://www.zhihu.com/question/20790576)

[前端高级进阶：前端部署的发展历程](https://juejin.cn/post/6844904086823780366)

## 前端监控

[5 分钟撸一个前端性能监控工具](https://juejin.cn/post/6844903662020460552)

[前端监控和前端埋点方案设计](https://juejin.cn/post/6844903650603565063)

[把前端监控做到极致](https://zhuanlan.zhihu.com/p/32262716)

## 代码规范

**Question:**

- 如何进行高效的多人协作？
- 如何保证项目的可维护性？
- 如何提高项目的开发质量？
- 如何降低项目生产的风险？
  ...

**Answer:**

模块化、组件化、规范化、自动化

[凹凸实验室前端代码规范](https://guide.aotu.io/docs/index.html)

[Git Commit 规范（Conventional Commit）](https://juejin.cn/post/6985500205554597918)

## 架构

## MVC 和 MVVM

**MVC:**

所有通信都是**单向**的

![MVC](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020105.png)

- `View` 传送指令到 `Controller`
- `Controller` 完成业务逻辑后，要求 `Model` 改变状态
- `Model` 将新的数据发送到 `View`，用户得到反馈

**MVVM:**

采用双向绑定(data-binding)：`View`的变动，自动反映在 `ViewModel`，反之亦然。

![MVVM](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020110.png)

- 各部分之间的通信，都是双向的。
- `View` 与 `Model` 不发生联系，都通过 `ViewModal` 传递。
- `View` 非常薄，不部署任何业务逻辑，称为**被动视图**（Passive View），即没有任何主动性，而 `ViewModal` 非常厚，所有逻辑都部署在那里。

[MVC，MVP 和 MVVM 的图示(阮)](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

> 不同框架对于 `MVC` 的理解是不同的，不过对于 `MVC` 三大模块却是统一认同的，而著名的 `Rails` `MVC` 框架的实现思想和 `MVVM` 是一样的

[浅谈 MVC、MVP 和 MVVM 架构模式](https://draveness.me/mvx/)

## TS 问题常见解答

[钉钉前端面试题~TypeScript 相关问题的部分解答](https://juejin.cn/post/6988763249982308382)

### interface VS type

- 二者都可以描述一个对象或者函数
- 二者都允许拓展（`extends`）；效果相同，但语法不同【`extends`、`&`】
- `type` 可以声明基本类型别名，联合类型，元组等类型
- `type` 语句中还可以使用 `typeof` 获取实例的类型进行赋值
- `interface` 能够声明合并【同一个类型的多个声明会进行合并】

[Typescript 中的 interface 和 type 到底有什么区别](https://juejin.cn/post/6844903749501059085)

## 拓展

[聊聊 package.json 文件中的 module 字段](https://loveky.github.io/2018/02/26/tree-shaking-and-pkg.module/)
