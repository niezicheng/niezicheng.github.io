---
title: Webpack
order: 10
group:
  title: Interview Question
toc: 'menu'
nav:
  title: 面试题集锦
  order: 0
---

## webpack

[官方文档](https://webpack.js.org/)

[关于 webpack 的面试题总结](https://zhuanlan.zhihu.com/p/44438844)

[28 道 Webpack 面试题及答案](https://jishuin.proginn.com/p/763bfbd616df)

[webpack4.0-demo 基础部分](https://github.com/niezicheng/webpack4.0-demo)

### webpack 的基础知识

[带你深度解锁 Webpack 系列](https://juejin.cn/post/6844904079219490830)

### webpack 的构建流程是什么?从读取配置到输出文件这个过程尽量说全

1. **初始化参数**：从配置文件和 `Shell` 语句中读取与合并参数，得出最终的参数
2. **开始编译**：使用步骤 `1` 中得出的最终参数初始化 `Compiler` 对象（编译器实例），加载所有配置的插件，执行对象的 `run` 方法开始执行编译
3. **确定入口**：根据配置的 `enter` 找出所有的入口文件
4. **编译模块**：从入口文件出发，调用所有的配置 `loader` 对文件进行翻译；再找出该模块依赖的模块，再递归本步骤直到所有的入口文件都经过处理
5. **完成模块编译**：在使用 `loader` 翻译所有模块后，得到每个模块被翻译后的最终内容及他们之间的依赖关系
6. **输出资源**：根据入口及模块之间的依赖关系，组装成一个个包含多个模块的 `chunk`，再把每个 `chunk` 转换为单独的文件加入到输出列表，这里是可以修改输出内容的最后机会。
7. **输出完成**：确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入文件系统

**PS**：在以上过程中，`Webpack` 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑并且插件可以调用 `Webpack` 提供的 `API` 改变 `Webpack` 的运行结果。

### webpack 插件机制

- 读取配置的过程中会先执行 `new HelloPlugin(options)` 初始化一个 `HelloPlugin` 获得其实例。
- 初始化 `compiler` 对象后调用 `HelloPlugin.apply(compiler)` 给插件实例传入 `compiler` 对象。
- 插件实例在获取到 `compiler` 对象后，就可以通过 `compiler.plugin(事件名称, 回调函数)` 监听到 `Webpack` 广播出来的事件。并且可以通过 `compiler` 对象去操作 `Webpack`。

[揭秘 webpack 插件的工作原理](https://segmentfault.com/a/1190000023016347)

### Source Map

[打破砂锅问到底：详解 Webpack 中的 sourcemap](https://segmentfault.com/a/1190000008315937)

### webpack 代码分割是怎么做的？

> 路由懒加载和 `webpack` 异步加载模块都是这个 `import()` 语法，值得仔细看看

[webpack 的代码分割（路由懒加载同理）](https://juejin.cn/post/6844904101134729229)

### webpack 与 gulp 的差别？(模块化与流的区别)

- `gulp` 强调的是前端开发的工作流程，我们可以通过配置一系列的 `task`，定义 `task` 处理的事务(例如文件压缩合并、雪碧图、启动 server、版本控制等)，然后定义执行顺序， 来让 `gulp` 执行这些 `task`，从而构建项目的整个前端开发流程。
- `webpack` 是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源(图片、js 文件、css 文件等)都看成模块，通过 `loader`(加载器)和 `plugins`(插件)对资源进行处理，打包成符合生产环境部署的前端资源。

## Babel

[中文文档](https://www.babeljs.cn/)

[英文文档](https://babeljs.io/)

## babel 的原理是什么？

[[实践系列]Babel 原理](https://juejin.cn/post/6844903760603398151)

## 如何写一个 babel 插件？

[编写一个简单的 babel 插件](https://juejin.cn/post/6844903582613897223)

## 拓展

[从零搭建 Webpack5-react 脚手架(附源码)](https://segmentfault.com/a/1190000040427502)

[如何搭建一个 REACT 全家桶框架](https://juejin.cn/post/6844903811794862087)
