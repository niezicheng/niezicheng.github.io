---
title: Accordion 手风琴
order: 1
nav:
  title: 组件
  order: 0
---

## Accordion 手风琴

可以折叠/展开的内容区域

## 规则

- 对内容进行分组和隐藏
- 通常，一次只允许单个内容区域展开；特殊情况，多个内容区域可以同时展开

## 设计思路与实现

### Accordion

设计 `Accordion` 作为包裹所有需要折叠/展开内容的容器

- `activeSections` 属性
  - 展开 `Panel` 索引数组
  - 根据该属性设置 `Accordion.Panel` 的 `active` 值
- `onChange` 属性
  - 折叠/展开事件回调函数，参数为当前展开 `Panel` 索引数组
  - 根据内部 `onChange` 方法参数 `status` 和 `index` 获取该方法参数值
- 内部 `clone` 子元素 `Accordion.Panel` 添加 `active` 和 `onChange` 属性

### Accordion.Panel

`Accordion.Panel` 作为展示折叠/展开的组件容器

- `header` 属性控制折叠时候展示的内容信息
- `active` 属性
  - 控制子元素的展示/折叠和折叠显示图标的类型

```ts
  active: activeSections.includes(index)
```

- `onChange` 属性
  - 折叠/展开事件回调函数，在内部点击方法内调用并将 `active` 取反值作为函数参数返回

```ts
  onChange: (status: boolean) => onChange(index: number, status);
```
