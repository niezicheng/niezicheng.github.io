---
title: Rate 评分
order: 20
nav:
  title: 组件
  order: 2
---

## Rate 评分

评分

## 设计思路与实现

> 主要是构建`值-图`标映射数组以及点击 `handleChange` 事件处理

- 构建`值-图`标映射数组
  - values: ['unSelected', 'halfSelected', 'selected'] <=> iconType: ['未选中图标类型', '半选图标类型', '全选图标类型'] 对应映射
  - 循环图标总数 `total`, 比较 `value` 并结合 `isHalf` 处理半选得出值数组 `values`
- 点击 `handleChange` 事件处理
  - 定位元素覆盖图片左右两部分，处理半选情况，点击左边部分半选 `half: true`，右边部分全选 `half: false`。
  - 点击事件内依据 `isHalf` 和 `half` 判断是否为半选，是半选 `value = ((index + 1) * 2 - 1)`, 不是不做处理，将 `value` 传递给外部 `onChange` 回调函数，内部刷行 `values` 数据

**获取映射数组:**

```tsx
// 是否为整数
function isInteger(value) {
  return /(^[1-9]\d*$)/.test(value.toString());
}

const mapValueArray = value => {
  let arr = [];
  for (let i = 0; i < total; i++) {
    arr.push(i < value ? 'selected' : 'unSelected');
  }

  if (value > 0 && isInteger(value) && isHalf) {
    array[value - 0.5] = 'halfSelected';
  }
};

// 刷行渲染时循环数组数据
function updateValues(value) {
  // ['unSelected', 'unSelected', 'halfSelected', 'selected'] => 2.5
  setValues(mapValueArray(value));
}
```

**handleChange 处理：**

```tsx
const handleChange = (index, half) => {
  const { disabled, isHalf, onChange } = props;

  if (disabled) return;

  if (isHalf && half) {
    value = ((index + 1) * 2 - 1) / 2;
  }

  if (value === props.value) return;

  onChange?.(value);

  updateValues(value);
};
```
