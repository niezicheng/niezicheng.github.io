---
title: React
order: 6
# toc: 'menu'
nav:
  title: 知识集锦
  order: 0
---

## React

### React 高频面试题

[2019 年 17 道高频 React 面试题及详解](https://juejin.cn/post/6844903922453200904)

[React 高频面试题梳理，看看面试怎么答？（上）](https://cloud.tencent.com/developer/article/1506220)

[掘金最污的 React16.x 图文视频教程(2 万 5 千字长文-慎入)](https://juejin.cn/post/6844903870213292045)

### Virtual DOM？

> `Virtual DOM` 是否真的比操作原生 `DOM` 快？谈谈你的看法？

[面试官问: 如何理解 Virtual DOM？](https://juejin.cn/post/6844903921442422791)

### React Hooks

- 常用的有哪些？都有什么作用？
- 如何使用 `hook` 在依赖改变的时候重新发送请求？
- 写过自定义 `hook` 吗？解决了哪些问题。
- 讲讲 `React Hooks` 的闭包陷阱，你是怎么解决的？

[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

[React Hook 从入门应用到编写自定义 Hook](https://juejin.cn/post/6887838157874659341#heading-21)

### Context 了解

[Context 基本了解](https://juejin.cn/post/6916844522202726408)

### React 事件系统原理

[React 事件系统工作原理](https://juejin.cn/post/6909271104440205326)

[深入 React 合成事件机制原理](https://segmentfault.com/a/1190000039108951)

### React 中的组件复用

[【React 深入】从 Mixin 到 HOC 再到 Hook](https://juejin.cn/post/6844903815762673671)

## React Router

[英文官网](https://reactrouter.com/)

[React-Router4 快速上手](https://juejin.cn/post/6844903609776209927)

[React Router 中文文档（v5 ）](https://segmentfault.com/a/1190000020812860)

[中文文档(看起来内容比较旧了)](https://react-guide.github.io/react-router-cn/)

### Link 标签与 a 标签？

**react-router 里面的 Link 标签和 a 标签的区别？**

> 本质渲染到页面上展示的都是 `a` 标签

- `Link` 中禁用了 `a` 标签的默认事件
- `Link` 改用了 `history` 对象提供的方法进行跳转
- `Link` 的 `跳转` 行为只会触发相匹配的 `Route` 对应的页面内容更新，而不会刷新整个页面

## Redux

[英文官网](https://redux.js.org/)、[官网中文翻译](https://react-router.docschina.org/)

[中文文档](https://cn.redux.js.org/)

## 源码解读

[React 15 与 React 16 架构区别](https://blog.csdn.net/weixin_44135121/article/details/108753231)

[《React 源码解析》系列完结！(v15)](https://juejin.cn/post/6844903568487497741)

[React 源码解析(v16)](https://react.jokcy.me/)

[React Fiber 源码解析](https://juejin.cn/post/6859528127010471949)

[自定义渲染器](http://hcysun.me/vue-design/zh/renderer-advanced.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B8%B2%E6%9F%93%E5%99%A8%E7%9A%84%E5%8E%9F%E7%90%86)

## 拓展

[从 React 源码分析渲染更新流程](https://juejin.cn/post/6844904200824946696#heading-10)

[前端大佬谈 React Fiber 架构](https://zhuanlan.zhihu.com/p/137234573)

[React 技术揭秘](https://react.iamkasong.com/)

[React 开发必须知道的 34 个技巧【近 1W 字】](https://juejin.cn/post/6844903993278201870)

## React 17、18

### React 17

- 渐进式升级: 支持逐步的 `React` 升级，让不同版本的 `React` 相互嵌套变得更加容易【对于一些比较老的项目可以选择：升级整个应用程序、迁移一部分到最新的版本】
- 对事件委派的更改: 由原来在 document 上的附加事件处理程序改为到 `root DOM` 上【这样的话在单个应用中使用多个 react 版本】
- 全新的 `jsx` 转换【无需引入 `React`, 编译器会自动引入 `react/jsx-runtime` 入口处理 `jsx`】
- 其他重大更改【部分事件对标浏览器、去除事件池、副作用清理时间】

[React v17.0](https://reactjs.org/blog/2020/10/20/react-v17.html)

### React 18

- 自动批处理会在 `原生事件处理函数`、`Promise` 链和 `异步代码` 自动完成【之前这些类型中是不会进行批处理的】(批处理：多个 setState 是否一同更新处理)
- 允许组件渲染 `undefined` 【之前只允许渲染 `jsx` 元素或 `null`】
- Suspense & SuspenseList
  - `Suspense` 支持 `SSR`
  - 未捕获的 `Suspense` 处理【没有捕获到相应的 `Suspense` 不会抛出错误，`17` 是会抛出错误的】
  - `null` 或者 `undefined` 的 `Suspense fallback`【仍会使用当前 `Suspense`, `17` 会使用下一个最近的 `Suspense`】
  - `SuspenseList`【`revealOrder` 属性：可以控制内部 `Suspense` 的渲染顺序、`tail` 属性：如何渲染 `fallback`(多个、一个或隐藏)】
- 并发功能特性
- `startTransition` 过渡更新【紧急更新（例如：点击）、过渡更新（例如：搜索查询，功能有点类似于节流操作）】
- `Hydration`（滋润）【Hydration: 页面通过 `SSR` 渲染，将前端 `js` 交互应用逻辑添加到 `html` 的过程】

[[译] React 18 新特性概览](https://juejin.cn/post/7014683796821770247)

[React 18 新特性（二）: Suspense & SuspenseList](https://blog.csdn.net/zgd826237710/article/details/119568026)
