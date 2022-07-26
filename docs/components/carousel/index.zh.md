---
title: Carousel 轮播
order: 3
nav:
  title: 组件
  order: 2
---

## Carousel 轮播

滑动或间隔自动轮播显示子元素内容(不限于视频或图片)

## 设计思路与实现

### 引用三方库

| 平台 | 第三方库                                | 说明                                                                                                                     |
| ---- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| RN   | `@react-native-community/viewpage`      | [文档地址](https://www.npmjs.com/package/@reason-react-native/viewpager)                                                 |
| H5   | `react-slick`                           | [文档地址](https://www.npmjs.com/package/react-slick) 、[issue](https://github.com/necolas/react-native-web/issues/1596) |
| MP   | 小程序自定义组件`swiper`、`swiper-item` | [文档地址](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)                                       |

### 描述

主要描述一下各端小程序之间组件化的差异

- 微信小程序 `swiper` 需设置高度, `swiper-item` 仅可放置在 `swiper` 组件中, 宽高自动设置为 100%。
- 阿里系小程序 `swiper` 高度可以通过设置 `swiper-item` 元素高度来控制，`swiper-item` 的高度取决于第一个 `swiper-item` 的高度，​​ 宽高自动设置为 100%
