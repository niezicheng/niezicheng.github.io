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

### css 基础面试题

[50道CSS基础面试题](https://segmentfault.com/a/1190000013325778)

### Q1: 盒模型

> 内容的宽高 = `content` 宽/高
> 盒子的宽/高 = `content` 宽/高 + `padding` 水平/垂直边距 + `border` 左右/上下
> 元素所占空间的宽/高 = 盒子的宽/高 + `margin` 水平/垂直边距

- 标准盒模型: 宽高指的是盒子 `content` 的宽高
- IE 盒模型: 宽高指的是盒子的宽高

### Q2: BFC

[10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)
[BFC 应用](https://github.com/qianguyihao/Web/blob/master/14-%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/02-CSS%E7%9B%92%E6%A8%A1%E5%9E%8B%E5%8F%8ABFC.md)

### Q3: display、opacity、visibility 的区别

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

### Q4: 文本溢出省略效果

- 单行

```css | pure
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

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

### Q5: 实践题

#### 三栏布局

[三栏布局五种实现方式](https://github.com/qianguyihao/Web/blob/master/14-%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/01-%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80.md)

#### 让图片宽度为 300px [仅添加 css 样式]

```html | pure
<img src="1.jpg" style="width:480px!important;”>
```

方案：

- max-width: 300px
- box-sizing: border-box; padding: 0 90px;
- transform: scale(0.625, 1)
- zoom: 0.625
