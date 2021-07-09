---
title: Webpack
order: 9
group:
  title: Interview Question
toc: 'menu'
nav:
  title: 知识了解
  order: 0
---

## webpack

### webpack 的基础知识

[带你深度解锁Webpack系列](https://juejin.cn/post/6844904079219490830)

### webpack 代码分割是怎么做的？

> 路由懒加载和 `webpack` 异步加载模块都是这个 `import()` 语法，值得仔细看看

[webpack的代码分割（路由懒加载同理）](https://juejin.cn/post/6844904101134729229)

### webpack 插件机制

[揭秘webpack插件的工作原理](https://segmentfault.com/a/1190000023016347)

### webpack 与 gulp 的差别？(模块化与流的区别)

- `gulp` 强调的是前端开发的工作流程，我们可以通过配置一系列的 `task`，定义 `task` 处理的事务(例如文件压缩合并、雪碧图、启动 server、版本控制等)，然后定义执行顺序， 来让 `gulp` 执行这些 `task`，从而构建项目的整个前端开发流程。
- `webpack` 是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源(图片、js 文件、css 文件等)都看成模块，通过 `loader`(加载器)和 `plugins`(插件)对资源进行处理，打包成符合生产环境部署的前端资源。

## Babel

## babel 的原理是什么？

[[实践系列]Babel原理](https://juejin.cn/post/6844903760603398151)

## 如何写一个 babel 插件？

[编写一个简单的babel插件](https://juejin.cn/post/6844903582613897223)
