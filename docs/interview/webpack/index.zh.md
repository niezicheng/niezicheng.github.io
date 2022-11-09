---
title: Webpack
order: 10
toc: 'menu'
nav:
  title: 知识集锦
  order: 0
---

## webpack

[官方文档](https://webpack.js.org/)

[关于 webpack 的面试题总结](https://zhuanlan.zhihu.com/p/44438844)

[28 道 Webpack 面试题及答案](https://jishuin.proginn.com/p/763bfbd616df)

[webpack4.0-demo 基础部分](https://github.com/niezicheng/webpack4.0-demo)

## 基础知识

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

## 插件机制

- 读取配置的过程中会先执行 `new HelloPlugin(options)` 初始化一个 `HelloPlugin` 获得其实例。
- 初始化 `compiler` 对象后调用 `HelloPlugin.apply(compiler)` 给插件实例传入 `compiler` 对象。
- 插件实例在获取到 `compiler` 对象后，就可以通过 `compiler.plugin(事件名称, 回调函数)` 监听到 `Webpack` 广播出来的事件。并且可以通过 `compiler` 对象去操作 `Webpack`。

[揭秘 webpack 插件的工作原理](https://segmentfault.com/a/1190000023016347)

## loader

[webpack 中如何自定义 loader](https://juejin.cn/post/6891649726656020493)

[webpack 如何自定义一个 loader？](https://segmentfault.com/a/1190000023921193)

## externals

防止将某些 `import` 的包(`package`)打包到 `bundle` 中，而是在运行时(`runtime`)再去从外部获取这些扩展依赖(`external dependencies`)

[Externals](https://webpack.js.org/configuration/externals/#externals)

## 代码分割

官方说明：

默认情况下，它只会影响到**按需加载**的 `chunks`，因为修改 `initial chunks` 会影响到项目的 `HTML` 文件中的脚本标签。

`webpack` 将根据以下条件自动拆分 `chunks`：

- `node_modules` 资源会命中 `defaultVendors` 规则，并被单独打包
- 只有包体超过 `20kb` 的 `Chunk` 才会被单独打包
- 加载 `Async Chunk` 所需请求数不得超过 `30`
- 加载 `Initial Chunk` 所需请求数不得超过 `30`

**默认配置：**

```ts
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // 有效值为 `all`，`async` 和 `initial`
      minSize: 20000, // 生成 chunk 的最小体积（≈ 20kb)
      minRemainingSize: 0, // 确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
      maxAsyncRequests: 30, // 最大的按需(异步)加载次数
      maxInitialRequests: 30, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // 配置提取模块的方案
        defaultVendors: {
          test: /[\/]node_modules[\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },

        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   minChunks: 2,
        //   minSize: 0
        // }

        //  echarts: {
        //   name: 'chunk-echarts',
        //   priority: 20,
        //   test: /[\\/]node_modules[\\/]_?echarts(.*)/
        // },

        // commons: {
        //   name: 'chunk-commons',
        //   minChunks: 2,
        //   priority: 5,
        //   chunks: 'initial',
        //   reuseExistingChunk: true
        // }
      },
    },
  },
};
```

`SplitChunksPlugin` 基本配置项：

- **minChunks**：用于设置引用阈值，被引用次数超过该阈值的 `Module` 才会进行分包处理
- **maxInitialRequest/maxAsyncRequests**：用于限制 `Initial Chunk`(或 `Async Chunk`) 最大并行请求数，本质上是在限制最终产生的分包数量
- **minSize**：超过这个尺寸的 `Chunk` 才会正式被分包
- **maxAsyncSize**：与 `maxSize` 功能类似，但只对异步引入的模块生效
- **maxInitialSize**：与 `maxSize` 类似，但只对 `entry` 配置的入口模块生效
- **enforceSizeThreshold**：超过这个尺寸的 `Chunk` 会被强制分包，忽略上述其它 `size` 限制
- **cacheGroups**：用于设置缓存组规则，为不同类型的资源设置更有针对性的分包策略

**优先级说明:**

> maxInitialRequest/maxAsyncRequests < maxSize < minSize 而命中 `enforceSizeThreshold` 阈值的 `Chunk` 会直接跳过这些属性判断，强制进行分包

[Webpack Chunk 分包规则详解](https://juejin.cn/post/6961724298243342344)

[Webpack 性能系列四：分包优化](https://www.51cto.com/article/689344.html)

## Tree shaking

开发环境配置 `optimization.usedExports: true`; 生产环境下默认开启。

### Tree shaking 基本原理

- `ES6` 的模块引入是静态分析的，故而可以在编译时正确判断到底加载了什么代码。
- 分析程序流，判断哪些变量未被使用、引用，进而删除此代码

### 注意事项

- 使用 `ES2015` 模块语法（即 `import` 和 `export`）
- 确保没有编译器将您的 ES2015 模块语法转换为 CommonJS（顺带一提，这是现在常用的 @babel/preset-env 的默认行为，详细信息请[参阅文档](https://babeljs.io/docs/en/babel-preset-env#modules)）
- 在项目的 `package.json` 文件中，添加 `sideEffects` 属性，将文件标记为无副作用；支持 `false` 或文件路径数组
- 使用 `mode` 为 `production` 的配置项以启用更多优化项，包括压缩代码与 `tree shaking`

[Webpack Tree shaking 深入探究](https://juejin.cn/post/6844903687412776974#heading-18)

## Source Map

[打破砂锅问到底：详解 Webpack 中的 sourcemap](https://segmentfault.com/a/1190000008315937)

## Hot Module Replacement

[轻松理解 webpack 热更新原理](https://juejin.cn/post/6844904008432222215)

## webpack 如何实现动态加载

require.ensure、import()

### webpack 与 gulp 的差别？(模块化与流的区别)

- `gulp` 强调的是前端开发的工作流程，我们可以通过配置一系列的 `task`，定义 `task` 处理的事务(例如文件压缩合并、雪碧图、启动 server、版本控制等)，然后定义执行顺序， 来让 `gulp` 执行这些 `task`，从而构建项目的整个前端开发流程。
- `webpack` 是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源(图片、js 文件、css 文件等)都看成模块，通过 `loader`(加载器)和 `plugins`(插件)对资源进行处理，打包成符合生产环境部署的前端资源。

## 拓展

[从零搭建 Webpack5-react 脚手架(附源码)](https://segmentfault.com/a/1190000040427502)

[如何搭建一个 REACT 全家桶框架](https://juejin.cn/post/6844903811794862087)

[前端工程化学习笔记](https://www.kancloud.cn/cyyspring/webpack/1835304)

[深入浅出 Webpack](https://webpack.wuhaolin.cn/)
