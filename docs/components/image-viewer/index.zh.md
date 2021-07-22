---
title: ImageViewer 图片预览
order: 9
nav:
  title: 组件
  order: 0
---

## ImageViewer 图片预览

全屏预览单张/多张图片，多张预览可支持滑动切换图片预览，头部带有操作项，底部带有描述信息

## 设计思路与实现

### 引用三方库

| 平台 | 第三方库                         | 说明                                                                                              |
| ---- | -------------------------------- | ------------------------------------------------------------------------------------------------- |
| RN   | `react-native-image-zoom-viewer` | [文档地址](https://www.npmjs.com/package/react-native-image-zoom-viewer)                          |
| H5   | `react-imageview`                | [文档地址](https://www.npmjs.com/package/react-imageview)                                         |
| MP   | 小程序元素 API: `previewImage`   | [文档地址](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewImage.html) |

### 头部和底部内容处理

- 头部处理
  - 操作项暴露对应的点击方法和样式及展示 `iconType`, 如果设计更加宽松的化可以让操作支持自定义元素
- 尾部处理
  - 内容可以放置在 `imageList` 原数组结构中方便内部展示，支持字串或元素类型，不过内部最好限制一下 `maxHeight`
- 布局说明
  - 二者均可以使用定位布局来实现展示的样式需求

### 小程序间 API 差异

`previewImage`

参数 `current` 差异:

- 微信及字节小程序 `current` 为当前预览展示图片的 url 地址（string）
- 阿里系小程序 `current` 为当前展示图片在数据源数组中的索引值（number）
