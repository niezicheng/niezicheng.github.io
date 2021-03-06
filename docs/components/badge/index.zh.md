---
title: Badge 徽标签
order: 2
nav:
  title: 组件
  order: 2
---

## Badge 徽标签

内容右上角的红点、数字或者文字。用于告知用户，该区域的状态变化或者待处理任务的数量。

## 规则

- 当用户只需知道大致有内容更新时，应该使用红点型，如：社交中的群消息通知。
- 当用户有必要知晓每条更新时，应该使用数字型。如：社交中的一对一的消息通知。

## 设计思路与实现

- 优先级: 以是否为 `dot` 点类型展示对应元素`优先级`更高
- 类型处理: 根据传递的 `text` 文本类型（number、string）处理相应的逻辑
  - `number` 类型与最大展示数值 `overflowCount` 比较获取相应文本内容，eg: 99+
  - `string` 类型正常样式展示即可
- 布局处理: 可以通过 `position` 定位布局并结合 `transform` 偏移 `translate` 达到预期样式效果

> 注意: `rn` 端 `translate` 值只能为具体数值不能为百分比, 样式写法也有差别
