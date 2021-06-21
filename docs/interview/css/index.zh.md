---
title: CSS
order: 1
group:
  title: Interview Question
toc: 'menu'
nav:
  title: 知识了解
  order: 0
---

## CSS 基础面试题

[50 道 CSS 基础面试题](https://segmentfault.com/a/1190000013325778)

[剖析一些经典的CSS布局问题，为前端开发+面试保驾护航](https://juejin.cn/post/6844903962529759239)

## CSS 模块化演变历程

[前端模块化演化阶段](https://www.jianshu.com/p/f2cf62c66493)

[前端模块化详解(完整版)](https://juejin.cn/post/6844903744518389768#heading-18)

## CSS3 新特性

[前端面试之 CSS3 新特性](https://juejin.cn/post/6844903486618861575)

## Q1: 盒模型

> 内容的宽高 = `content` 宽/高
> 盒子的宽/高 = `content` 宽/高 + `padding` 水平/垂直边距 + `border` 左右/上下
> 元素所占空间的宽/高 = 盒子的宽/高 + `margin` 水平/垂直边距

- 标准盒模型: 宽高指的是盒子 `content` 的宽高
- IE 盒模型: 宽高指的是盒子的宽高

`box-sizing` 设置盒模型类型:

- box-sizing: content-box; 标准盒模型
- box-sizing: border-box; IE 盒模型
- box-sizing: inherit; 继承父元素的盒模型，

## Q2: 重绘和回流

> 回流必将引起重绘，而重绘不一定会引起回流

- 重绘：改变不会影响页面元素布局
- 回流：改变会影响页面元素布局

减少重绘重排的方法有:

- 不在布局信息改变时做 `DOM` 查询，
- 使用 `css text`,`className` 一次性改变属性
- 使用 `fragment` 对于多次重排的元素，比如说动画。使用绝对定位脱离文档流，使其不影响其他元素

## Q3: 渐进增强和优雅降级

- 渐进增强（progressive enhancement）

> 针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

- 优雅降级（graceful degradation)

> 一开始就构建完整的功能，然后再针对低版本浏览器进行兼容

区别:

- 优雅降级是从复杂的现状开始，并试图减少用户体验的供给
- 渐进增强则是从一个非常基础的、能够起作用的版本开始，并不断扩充，以适应未来环境的需要。

[你能描述一下渐进增强和优雅降级之间的不同吗?](https://www.cnblogs.com/iceflorence/archive/2017/03/27/6625466.html)

## Q4: display、opacity、visibility 的区别

- 结构：
  - display: none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
  - visibility: hidden: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
  - opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击
- 继承：
  - display: none 和 opacity: 0: 是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
  - visibility: hidden: 是继承属性，子孙节点消失由于继承了 `hidden`，通过设置 `visibility: visible` 可以让子孙节点显式。
- 性能：
  - display: none: 修改元素会造成文档回流,读屏器不会读取 `display: none` 元素内容，性能消耗较大
  - visibility: hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取 `visibility: hidden` 元素内容
  - opacity: 0: 修改元素会造成重绘，性能消耗较少
- 联系：
  - 它们都能让元素不可见

## Q5: BFC

> BFC: 块级格式化上下文，可用于清楚浮动，防止 `margin` 重叠等

[10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)
[BFC 应用](https://github.com/qianguyihao/Web/blob/master/14-%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/02-CSS%E7%9B%92%E6%A8%A1%E5%9E%8B%E5%8F%8ABFC.md)

## Q6: 清除浮动的方法，能讲讲吗?

- 使用带 `clear` 属性的空元素
在浮动元素后使用一个空元素如: `<div class="clear"></div>`，并在 `CSS` 中赋予 `.clear{ clear:both; }` 属性即可清理浮动。亦可使用`<br class="clear" />`或`<hr class="clear" />`来进行清理。
- 使用邻接元素处理(和上一种方法原理一样)
什么都不做，给浮动元素后面的元素添加 `clear` 属性。
- 使用 `CSS` 的 `overflow` 属性
给浮动元素的容器添加 `overflow: hidden;`或 `overflow: auto;`可以清除浮动，另外在 `IE6` 中还需要触发 `hasLayout` ，例如为父元素设置容器宽高或设置 `zoom: 1`。在添加 `overflow` 属性后，浮动元素又回到了容器层，把容器高度撑起，达到了清理浮动 的效果。
- 使用 `CSS` 的 `:after` 伪元素
结合 `:after` 伪元素(注意这不是伪类，而是伪元素，代表一个元素之后最近的元素)和 `IEhack` ，可以完美兼容当前主流的各大浏览器，这里的 `IEhack` 指的是触发 `hasLayout`。 给浮动元素的容器添加一个 `clearfix` 的 `class`，然后给这个 `class` 添加一个`:after` 伪元素实现元素末尾添加一个看不见的块元素(Block element)清理浮动。
- 给浮动的元素的容器添加浮动
给浮动元素的容器也添加上浮动属性即可清除内部浮动，但是这样会使其整体浮动，影响布局，不推荐使用。

[清除浮动](https://www.cnblogs.com/ForEvErNoME/p/3383539.html)

## Q7: link 标签和 import 标签的区别

- `link` 属于 `html` 标签，而 `@import` 是 `css` 提供的
- 页面被加载时，`link` 会同时被加载，而 `@import` 引用的 `css` 会等到页面加载结束后加载
- `link` 方式样式的权重高于 @import 的
- `link` 可以使用 js 动态引入，@import不行
- `link` 此没有兼容性要求，而 @import IE低版本浏览器不支持

## Q8: transition 和 animation 的区别

[CSS 动画简介](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)

## Q9: 关于 JS 动画和 css3 动画的差异性

> 渲染线程分为 `main thread` 和 `compositor thread`，如果 `css` 动画只改变 `transform` 和 `opacity`， 这时整个 `CSS` 动画得以在 `compositor thread` 完成(而 `JS` 动画则会在 `main thread` 执行，然后触发 `compositor thread` 进行下一步操作)，特别注意的是如果改变 `transform` 和 `opacity` 是不会 `layout` 或者 `paint` 的

区别:

- 功能涵盖面: `JS` 比 `CSS` 大
- 实现/重构难度不一: `CSS3` 比 `JS` 更加简单，性能跳优方向固定 对帧速表现不好的低版本浏览器，`css3` 可以做到自然降级
- `css` 动画有天然事件支持
- `css3` 有兼容性问题

## Q10: display: table 和本身的 table 有什么区别

Display:table 和本身 table 是相对应的，区别在于，display:table 的 css 声明能够让一个 html 元素和它的子节点像 table 元素一样，使用基于表格的 css 布局，是我们能够轻松定 义一个单元格的边界，背景等样式，而不会产生因为使用了 table 那样的制表标签导致 的语义化问题。
之所以现在逐渐淘汰了 table 系表格元素，是因为用 div+css 编写出来的文件比用 table 边写出来的文件小，而且 table 必须在页面完全加载后才显示，div 则是逐行显示，table 的嵌套性太多，没有 div 简洁

## 实践题

### 文本溢出省略效果

- 单行

```css | pure
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

text-overflow 属性值:

- clip 是修剪文本;
- ellipsis 为显示省略符号来表被修剪的文本;
- string 为使用给定的字符串来代表被修剪的文本。

- 多行(文本一定会溢出的情况下)

```css | pure
div{
  width: 300px;
  position: relative;
  line-height: 1.4em;
  height: 4.2em;
  overflow: hidden;
}
div::after{
  content: "...";
  position: absolute;
  right: 0;
  bottom: 0;
}
```

### Flex 布局

- flex-grow: 定义项目的放大比例，默认为 `0`，即如果存在剩余空间，也不放大
- flex-shrink: 定义了项目的缩小比例，默认为 `1`，即如果空间不足，该项目将缩小
- flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 `auto`，即项目的本来大小

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

### 三栏布局

- float 浮动
  - 左右 `float` 定宽 `width`，中间 `margin: 0 width;`
- position 定位
  - 左右定宽 `width`，中间 `left: width;` `right: width;`
- flex 布局
  - 左右定宽，中间 `flex: 1;`
- table 布局
  - 父级容器 `display: table;` 子容器 `display: table-cell;`，左右定宽，中间自适应
- grid 布局
  - 父级容器 `display: grid;` 并设置一行三列: `grid-template-rows: 100px;` `grid-template-columns: 300px auto 300px;`;

[三栏布局五种实现方式](https://github.com/qianguyihao/Web/blob/master/14-%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/01-%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80.md)

### 左右垂直居中布局

- flex 布局
  - 父级 `flex` 布局, 并设置子元素主、纵轴居中
- position 定位布局
  - 给父级相对定位，子级绝对定位：`left：50%;` `top：50%;` margin-left：-子级元素宽度一半；margin-top：-子级元素高度一半
  - 给父级和子级都加绝对定位，再给子级添加 `top：calc（50% - 子级元素高度一半）`、`left：calc（50% - 子级元素宽度一半）`
  - 给父级相对定位，子级绝对定位 `height` :百分比`x`; `x` 属于 `0~100%`; margin: auto; (定位为上下左右为 0，margin:0 可以实现脱离文档流的居中)
- table-cell
  - 设置父元素的 `display: table-cell`; 并且 `vertical-align: middle`，这样子元素可以实现垂直居中

[元素水平或垂直居中问题](https://www.cnblogs.com/nzcblogs/p/11128625.html)

### 让图片宽度为 300px [仅添加 css 样式]

```html | pure
<img src="1.jpg" style="width:480px!important;”>
```

方案：

- max-width: 300px
- box-sizing: border-box; padding: 0 90px;
- transform: scale(0.625, 1)
- zoom: 0.625

### 媒体查询

[深入浅出篇 — media媒体查询 - 响应式开发必备](https://juejin.cn/post/6844903970226307080)
