---
title: HTML
order: 1
group:
  title: Interview Question
toc: 'menu'
nav:
  title: 知识了解
  order: 0
---

### 重绘和回流

> 回流必将引起重绘，而重绘不一定会引起回流

- 重绘：改变不会影响页面元素布局
- 回流：改变会影响页面元素布局

### cookie、localStorage 和 sessionStorage

### web workers

#### 为什么我们要使用web workers

> 因为js是单线程，如果存在大数据运算的时候会影响用户使用体验，出现卡顿的情况。
使用web workers 可以开启一个线程，在运算的同时，不影响用户体验。

web workers的几个使用场景可以参考下：

- 当大图片canvas转base64的时候非常耗时，就可以使用wokers
- 端对端加密的时候，要大量计算，可以使用wokers
- 拼写检查，检索的所有工作可以让wokers来完成，不会阻塞UI
- indexdb ，在网络不稳定情况下,使用indexdb api的时候，可以交给wokers，这样不会阻塞主线UI

### webscoke 协议
