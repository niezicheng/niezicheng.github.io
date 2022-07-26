---
title: Clipboard 剪切板
order: 3
nav:
  title: 组件
  order: 2
---

## Clipboard 剪切板

复制剪切相应文字内容到剪切板上

## 设计思路与实现

### 引用三方库

| 平台 | 第三方库                                                                        | 说明                                                                                                                                                |
| ---- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| RN   | `@react-native-clipboard/clipboard` 目前有些问题，使用 RN 中的 `Clipboard` 组件 | [文档地址](https://www.npmjs.com/package/@react-native-clipboard/clipboard)、[issue](https://github.com/react-native-clipboard/clipboard/issues/71) |
| H5   | `react-copy-to-clipboard`                                                       | [文档地址](https://www.npmjs.com/search?q=react-copy-to-clipboard)                                                                                  |
| MP   | 小程序元素 API： wx： `setClipboardData`、alipay: `setClipboard`                | [文档地址](https://developers.weixin.qq.com/miniprogram/dev/api/device/clipboard/wx.setClipboardData.html)                                          |

### 注意

> `@react-native-clipboard/clipboar` 库中引用 `Clipboard` 调用 `setString` 方法报错，目前还是从 `RN` 中引入
