---
title: PickerView 选择器
order: 16
nav:
  title: 组件
  order: 2
---

## PickerView 选择器

`PickerView` 的功能类似于 `Picker` ，但它是直接渲染在区域中，而不是弹出窗口。

## 设计思路与实现

### 引用三方库

| 平台  | 第三方库                           | 说明                                                                                    |
| ----- | ---------------------------------- | --------------------------------------------------------------------------------------- |
| RN/H5 | `rmc-picker`                       | [文档地址](https://www.npmjs.com/package/rmc-picker)                                    |
| MP    | `picker-view` `picker-view-column` | [文档地址](https://developers.weixin.qq.com/miniprogram/dev/component/picker-view.html) |

### 小程序端实现

> **注意**：⚠️ 小程序端 `value` 数组值是各渲染列数组对应 `index` 索引值

**实现兼容过程中的主要方法：**

- dataSourceToLabelData：依据 `value` 值将 `DataSourceType`【类型见下说明】数据源转化为 `LabelData` 二维数组
- valueToIndex: 将传入的 `value` 数组值转化为 `index` 数组值，默认为 `[0, 0, 0]`（数组长度为 dataSource.length）
- indexToValue: 将 `index` 数组值转化为 `value` 数组值

**级联与非级联两种类型：**

> 级联类似于 `地址选择器`，列之间级联影响, 非级联各列之间相互不影响

### 级联实现思路

**数据展示：**

1. 数据源 `dataSource` 为数组对象，基本类型为：`DataSourceType`
2. 依据初始 `value` 数组遍历循环数据源，调用 `dataSourceToLabelData` 转化，【`LabelData` 第一层表示列数，第二层表示对应列展示的 `label` 数据集合】
3. 依据 `LabelData` 和 `valueToIndex` 转化后的数据源和 `value` 数组结合 `picker-view` `picker-view-column` 循环展示数据

**数据更新：**

1. `bingChange` 事件中，比较最新的 `value` 和之前存储的 `value` 数组进行数组更新, 见下更新原则说明
2. 内部更新 `value` 数组。 与此同时，通过 `indexToValue` 方法再结合`数据展示阶段 2` 说明更新数据源，进行组件数据内容更新
3. 将 `value` 值数组传递给 `props.onChange`

> **跟新原则**：遍历查找新数组与前数组不同的值的索引 `index`，前数组中小于该索引值不变，等于改变，大于赋值为 `0`

**级联 DataSourceType：**

```ts
type DataSourceType = Array<DataObj>;

// value 类型视情况需求而定
type DataObj = {
  value: string | number;
  label: string;
  children?: DataObj;
};
```

### 非级联实现思路

- 数据源类型 `DataSourceType`, 【类型见下说明]
- 依据初始 `value`, 调用 `dataSourceToLabelData` 方法，方法内部对于 `数据源子类型` 判断进行相应的处理获取二维数组类型数据源
- 其余一些操作可以参考 `级联类型` 实现思路

**非级联 DataSourceType：**

```ts
type DataSourceType = Array<Data>

type Data = string | DataObj | Array<string | DataObj>

DataObj = {
  label: string;
  value: string | number;
}
```

> **描述说明**：其余组件如 `DatePicker`、`DatePickerView` 和 `Picker` 可以在该组件基础上结合其他组件完成封装实现，如 `Modal` 组件
