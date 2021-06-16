---
title: HTML
order: 0
group:
  title: Interview Question
toc: 'menu'
nav:
  title: 知识了解
  order: 0
---

### Q1: html5 语义化标签

- 易于用户阅读，样式丢失的时候能让页面呈现清晰的结构
- 利于浏览器解析和 `SEO` 搜索引擎优化, 搜索引擎根据标签来确定上下文和各个关键字的权重
- 有利于开发和维护，语义化更具可读性，代码更好维护，与 `CSS3` 关系更和谐
- 方便其他设备解析，如: 盲人阅读器根据语义渲染网页

### Q2: 重绘和回流

> 回流必将引起重绘，而重绘不一定会引起回流

- 重绘：改变不会影响页面元素布局
- 回流：改变会影响页面元素布局

#### Q3: 为什么我们要使用 web workers

[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

> 因为 `js` 是单线程，如果存在大数据运算的时候会影响用户使用体验，出现卡顿的情况。
使用 `web workers` 可以开启一个线程，在运算的同时，不影响用户体验。

web workers 的几个使用场景可以参考下：

- 当大图片 `canvas`转 `base64` 的时候非常耗时，就可以使用 `wokers`
- 端对端加密的时候，要大量计算，可以使用 `workers`
- 拼写检查，检索的所有工作可以让 `workers` 来完成，不会阻塞 `UI`
- 在网络不稳定情况下,使用`indexDb api`的时候，可以交给`workers`，这样不会阻塞主线 `UI`
