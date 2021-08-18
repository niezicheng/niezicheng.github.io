---
title: Radio 单选框
order: 20
nav:
  title: 组件
  order: 0
---

## Radio 单选框

单选框

## 设计思路与实现

> 明确一点：单选框选中后是**无法反选**（取消选中）

### Radio

- defaultSelected: 默认是否选中
- selected: 是否选中, 可以通过该属性改变是否选中状态
- onChange: 选中与否状态变更函数（单个 Radio 点击必定返回 true）
  - 因为无法反选，组件内部点击事件中，`disabled` 直接返回，如果外部没有传递 `selected` 属性，则将 `内部selected` 置为 `true` 并调用外部传递的 `onChange` 方法参数值为 `true`。

### RadioItem

基于 `Radio` 和 `List` 组件封装。

### RadioGroup

- defaultValue: 默认选中值
- selectedValue: 选中值
- onChange: 选中与否状态变更函数（单个 Radio 点击必定返回 true）

#### 传递源数据数组 data

内部循环 `data` 数组，根据 `data` 数据项值是否和 `selectedValue` 来展示 `Radio` 选中与否

**PS：** 也可以在外部将 Radio 或 RadioItem 直接作为子元素进行处理展示。
