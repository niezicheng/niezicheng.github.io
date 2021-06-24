---
title: ImageView 图片预览
order: 9
nav:
  title: 组件
  order: 0
---

## ImageView 图片预览

全屏预览单张/多张图片，多张预览可支持滑动切换图片预览，头部带有操作项，底部带有描述信息

## 设计思路

### 引用三方库

| 平台 | 第三方库                                                  | 说明                                                         |
| ---- | --------------------------------------------------------- | ------------------------------------------------------------ |
| RN   | `react-native-image-picker`                               | [文档地址](https://www.npmjs.com/package/react-native-image-picker) |
| H5   | `input` :  `type='file'`                                  | [文档地址](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file) |
| MP   | 小程序元素选择文件 API: wx: `chooseMedia`、alipay: `chooseImage`；上传文件 API: wx: `uploadFile`、 alipay: `getImageInfo` | [选择文档地址](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html)、[上传文档地址](https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html) |

### H5 input 标签实现

- 展示样式处理
  - 将 `input` 定位占满父容器并设置 `opacity: 0`, 具体展示以父容器内其它子元素展示
- 属性处理
  - `multiple` 上传单个或多个文件
  - `accept` 接受上传的文件类型
  - `onChange` 上传过程中验证处理文件
    - 验证文件大小限制
    - 验证文件类型限制

解析 `File` 类型方法

```tsx
/**
 * 解析上传的 File 文件
 * @param file File 类型数据
 * @param index 处理第几个 File 文件
 */
const parseFile = (file: any, index: number) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const dataURL = (e.target as any).result;
      if (!dataURL) {
        reject?.(`Fail to get the ${index} image`);
        return;
      }
      resolve({ url: dataURL, file });
    };
  });
};

// 处理 File 数据解析对应的 url 地址数据
const imageParsePromiseList = [];
for (let i = 0; i < data.length; i++) {
  imageParsePromiseList.push(parseFile(data[i], i));
}
Promise.all(imageParsePromiseList)
  .then((imageItems) => {
    console.log(imageItems);
    setImgFiles(imageItems);
  })
  .catch((error) => console.log(error));
}
```
