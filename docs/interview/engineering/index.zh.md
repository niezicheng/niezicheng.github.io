---
title: 前端工程化
order: 8
group:
  title: Interview Question
toc: 'menu'
nav:
  title: 面试题集锦
  order: 0
---

## web 各个阶段的性能优化

[React 16 加载性能优化指南](https://mp.weixin.qq.com/s/XSvhOF_N0VbuOKStwi0IYw)

## Q1: 网页基本性能优化

- 减少 `HTTP` 请求
- 使用内容发布网络(CDN)
- 添加本地缓存
- 压缩资源文件
- 将 `CSS` 样式表放在顶部，把 `javascript` 放在底部(浏览器的运行机制决定) 避免使用 `CSS` 表达式
- 减少 `DNS` 查询
- 使用外部 `javascript` 和 `CSS`
- 避免重定向
- 图片懒加载 `lazyLoad`

## Q2: MVC 和 MVVM

[MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

> 不同框架对于 `MVC` 的理解是不同的，不过对于 `MVC` 三大模块确实统一认同的，而著名的 `Rails` `MVC` 框架的实现思想和 `MVVM` 是一样的

[浅谈 MVC、MVP 和 MVVM 架构模式](https://draveness.me/mvx/)

## Q3: 如何规范代码提交并自动生成 CHANGELOG

[Git Commit 规范（Conventional Commit）](https://juejin.cn/post/6985500205554597918)

## Q4: TS 问题常见解答

[钉钉前端面试题~TypeScript 相关问题的部分解答](https://juejin.cn/post/6988763249982308382)
