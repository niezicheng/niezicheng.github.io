---
title: ImagePicker 图片选择器
order: 9
nav:
  title: 组件
  order: 2
---

## ImagePicker 图片选择器

对图片进行选择、上传、展示和预览，也可以对上传对图片进行删除操作

## 设计思路与实现

> 内部基于 `ImageViewer` 完成图片预览功能; 基于 `Upload` 完成图片上传功能; 接受外部 `imageUrls` 数组更新展示图片

- 布局实现
  - 单行展示: 依据单行显示数量属性设置图片容器宽度为 `rowNum%`, 并通过设置容器 `padding` 实现之间间隙
  - 删除按钮: 使用 `position` 布局
- 元素显/隐
  - 上传按钮: 显示上传按钮属性；最大上传数量属性`maxLength` 且 `files?.length < maxLength`
  - 预览图片: 可预览图片属性和内部状态 `visible` 值控制，点击图片显示，预览时关闭或删除图片时关闭
- 事件实现
  - onChange: 上传事件内调用。参数为数组时更新内部 `files` ；为函数时传递给外部`onChange` 事件处理并更新外部 `files`
  - onRemove: 通过点击的图片对应索引截取 `files`，内外部控制更新均可以
  - onError: 图片上传失败函数
- 其余图标及一些其他功能也就视情况看以何种类型值开放出去

> 拓展: 上传和预览功能可查看 `Upload` 和 `ImageViewer`
