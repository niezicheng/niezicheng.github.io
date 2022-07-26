---
title: Tabs 标签页
order: 21
nav:
  title: 组件
  order: 2
---

## Tabs 标签页

可以在不同的视图之间进行切换显示

## 设计思路与实现

### TabBar

- 外层容器使用 `ScrollView` 组件内容水平滚动即可
- 点击激活 tab 动画滚动居中显示
  - 获取 `ScrollView` 容器、和单个 tab 容器元素信息
  - 通过对应信息获取需要滚动的距离：`x = tab.left + tab.width / 2 - scrollView.width / 2`
  - 调用 `scrollTo` 方法移动 `x`: `scrollView.scrollTo(x > 0 ? x : 0, animate: true)`

### TabContent

> 支持内容滑动切换功能

**方案一:**
使用 `ScrollView` 上的 `pagingEnabled` 属性（滑动切换整页）

- 滑动切换后调用对应方法如 `goToTab` 更改 `TabBar` 对应的状态

**方案二:**
通过 `ScrollView` 上的 `Touch` 事件

> `distance` 滑动距离临界值(一般设置为内容项宽度的一半)

- 通过 `onTouchStart` 和 `onTouchEnd` 事件获取滑动的距离并比较 `distance` 值
- 依据正负值判断左滑/右滑动，在 `tab` 数量范围内获取对应的 `index` 在更改对应 `TabBar` 状态
- `tabContent` 内容滑动也可以按 `TabBar` 中类似方法来进行判断从而达到滑动切换的效果

注:

> `RN` 中 `Android` 端 `ScrollView` 上的 `onTouchEnd` 在滑动过程中不会触发。

**方案三:**
通过 `View` 上的 `Touch` 事件

- `Tab` 组件子组件只放置激活 `tab` 对应的单个内容
- 余下操作和方案二是一样的，而且不需要考虑方案二中的注意事项问题

**方案四:**
通过 `Tabs` 的 `onChange` 方法对应的索引展示对应的内容信息。

> 说明： 和方案三类似不过处理逻辑放在业务逻辑代码中，没有封装到组件内部
