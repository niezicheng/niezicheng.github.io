---
title: React
order: 6
group:
  title: Interview Question
toc: 'menu'
nav:
  title: 面试题集锦
  order: 0
---

## React

### React 高频面试题

[2019 年 17 道高频 React 面试题及详解](https://juejin.cn/post/6844903922453200904)

[React 高频面试题梳理，看看面试怎么答？（上）](https://cloud.tencent.com/developer/article/1506220)

[掘金最污的 React16.x 图文视频教程(2 万 5 千字长文-慎入)](https://juejin.cn/post/6844903870213292045)

### Virtual DOM？

[面试官问: 如何理解 Virtual DOM？](https://juejin.cn/post/6844903921442422791)

#### Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的看法？

### React Hooks

- 常用的有哪些？都有什么作用？
- 如何使用 `hook` 在依赖改变的时候重新发送请求？
- 写过自定义 `hook` 吗？解决了哪些问题。
- 讲讲 `React Hooks` 的闭包陷阱，你是怎么解决的？

[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

[React Hook 从入门应用到编写自定义 Hook](https://juejin.cn/post/6887838157874659341#heading-21)

### Context 了解

[Context 基本了解](https://juejin.cn/post/6916844522202726408)

### React 中的组件复用

[【React 深入】从 Mixin 到 HOC 再到 Hook](https://juejin.cn/post/6844903815762673671)

### React 事件系统原理

[React 事件系统工作原理](https://juejin.cn/post/6909271104440205326)

### React 源码解析

[从 React 源码分析渲染更新流程](https://juejin.cn/post/6844904200824946696#heading-10)

### React 技巧使用解析

[React 开发必须知道的 34 个技巧【近 1W 字】](https://juejin.cn/post/6844903993278201870)

## React Router

[英文官网](https://reactrouter.com/)

[React Router 中文文档（v5 ）](https://segmentfault.com/a/1190000020812860)

[中文文档(看起来内容比较旧了)](https://react-guide.github.io/react-router-cn/)

### react-router 里面的 Link 标签和 a 标签的区别？

> 本质渲染到页面上展示的都是 `a` 标签

- `Link` 中禁用了 `a` 标签的默认事件
- `Link` 改用了 `history` 对象提供的方法进行跳转
- `Link` 的 `跳转` 行为只会触发相匹配的 `Route` 对应的页面内容更新，而不会刷新整个页面

## Redux

[英文官网](https://redux.js.org/)、[官网中文翻译](https://react-router.docschina.org/)

[中文文档](https://cn.redux.js.org/)

## 如何零基础搭建一个 `react` 项目框架
