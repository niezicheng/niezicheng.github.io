---
title: SwipeAction 侧滑块
order: 21
nav:
  title: 组件
  order: 2
---

## SwipeAction 侧滑块

左/右滑动内容展示对应的操作按钮，进行相应的交互操作

## 设计思路与实现

### 引用三方库

| 平台 | 第三方库                                  | 说明                                                                                     |
| ---- | ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| RN   | `rn-swipeout`                             | [文档地址](https://www.npmjs.com/package/rn-swipeout)                                    |
| H5   | `rc-swipeout`                             | [文档地址](https://www.npmjs.com/package/rc-swipeout)                                    |
| MP   | 小程序组件：`movable-area` `movable-view` | [文档地址](https://developers.weixin.qq.com/miniprogram/dev/component/movable-area.html) |

### 小程序端实现

**微信官方说明:**

> tip: `movable-area` 必须设置 `width` 和 `height` 属性，不设置默认为 `10px`

- `movable-area` 作为`外层容器`宽度默认为屏幕宽度，可接受外部传入【内容超出区域隐藏】
- `moveable-view` 作为`内容容器`【内容包含有: 左右两边操作按钮，中间内容（宽度与外层容器相同）】
- `moveable-view` 上通过 `touch` 事件来进行滑动操作控制

**以下描述变量说明：**

- moveViewX： `moveable-view` 组件 `x` 属性值对应变量
- btnWrapWidth： 按钮容器宽度(leftBtnWrapWidth、rightBtnWrapWidth)
- diffDist：`startX - endX` 两触摸点差值。 大于 `0` 左滑动，展示右按钮；小于 `0` 右滑动，展示左按钮。

**`touch` 事件:**

- touchstart: 获取开始触摸点横坐标 `startX`
- touchmove: 获取移动触摸点横坐标 `moveX`
- touchend: 获取结束触摸点横坐标 `endX`

**逻辑思路处理：**

> 组件首次渲染的时候获取 `btnWrapWidth`；结合使用 `translateX(-leftBtnWrapWidth)` 使得内容区域展示完全；后面在 `touchend` 事件中进行相应逻辑的处理
>
> - 通过 `diffDist` 值正/负判断左/右移动，`Math.abs(diffDist)` 与 `btnWrapWidth / 2` 比较判断是否移动
> - 向左滑动展示右边按钮【设置 `moveViewX` 为 `-(leftBtnWrapWidth + rightBtnWrapWidth)`】
> - 向右滑动展示右边按钮【设置 `moveViewX` 为 `0`】
> - 滑动关闭按钮时【设置 `moveViewX` 为 `-leftBtnWrapWidth`】

#### 字节小程序

> 注意：⚠️ 字节小程序没有 `movable-area` `movable-view` 组件

**实现思路：**

> 可以使用 `View` 来代替这两个组件，其余不变，只是将赋值给 `moveViewX` 的变为 `translateX(moveDist)` 样式属性，滑动偏移过程中也可以添加动画持续时间。

### H5 端实现

**思路描述:**

> - 组件最外层容器使用绝对定位，展示层级在按钮之上，内容超出部分隐藏，宽度默认为屏幕宽度。
> - 左/右按钮使用绝对定位，两者开始时均隐藏。
> - 内容区域使用相对定位，通过 `touch` 事件判断，显示相应的按钮，设置内容区域定位左偏移属性 `left` 使得内容区域移动
> - 具体 `touch` 事件等部分处理逻辑类似上面小程序端实现处理
