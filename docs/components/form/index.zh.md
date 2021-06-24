---
title: Form 表单
order: 6
nav:
  title: 组件
  order: 0
---

## Form 表单

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式

## 设计思路

> 本组件主要是基于 [rc-field-form](https://github.com/react-component/field-form) 实现

[demo 示例](https://field-form-react-component.vercel.app/)

基本用法:

- 使用 `Form` 作为最外层容器组件，内部子元素为 `Form.Filed` 组件
- `Form.Filed` 组件(需设置 `name` 属性)子元素类型
  - 子元素为函数类型: 函数参数会包含 `value` 和 `onChange` 属性用于动态控制改变数据，将属性传入到函数返回元素内即可
  - 子元素为元素类型: 元素需带 `value` 和 `onChange` 属性，form 内部会自动管理 `value` 值, 如需手动在 `form` 存储值, 可以调用 `form.setFieldsValue({ [name]: value }` 方法
- `form.validateFields(nameList, options)` 验证对应 `nameList` 数组内字段并返回其 `key: value` 值数组, `nameList` 不存在时检验所有字段并返回 `key: value` 值数组

## 更多了解

[深入了解 rc-field-form](https://juejin.cn/post/6877137890968535054#heading-3)

[模仿 antd4 从零到一实现 rc-field-form](https://juejin.cn/post/6897038502517555207#comment)
