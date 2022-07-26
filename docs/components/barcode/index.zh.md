---
title: Barcode 条形码/二维码
order: 2
nav:
  title: 组件
  order: 2
---

## Barcode 条形码/二维码

条形码/二维码，通过扫码可以获取对应的内容

## 设计思路与实现

### 引用三方库

| 平台 | 第三方库                                                   | 说明                                                                                                     |
| ---- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| RN   | `react-native-qrcode-svg` 、`react-native-barcode-builder` | [qrcode](https://www.npmjs.com/package/qrcode.react)、[barcode](https://www.npmjs.com/package/jsbarcode) |
| H5   | `qrcode.react`、`jsbarcode`                                | [qrcode](https://www.npmjs.com/package/qrcode.react)、[barcode](https://www.npmjs.com/package/jsbarcode) |
| MP   | `canvas` 实现                                              | -                                                                                                        |

### 二维码中间 logo 图片处理

- `h5` 或 `MP` 可以使用 `position` 设置中间 `logo` 图片展示的位置
  - 使用 `calc` 根据不同 `logoSize` 计算达到居中效果
  - 使用 `transform` 达到居中效果
