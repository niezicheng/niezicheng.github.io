---
title: Upload 上传
order: 21
nav:
  title: 组件
  order: 0
---

## Upload 上传

上传图片或视频文件

## 设计思路与实现

### 引用三方库

| 平台 | 第三方库                                                                                        | 说明                                                                                                                                                                                                         |
| ---- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RN   | `react-native-image-picker`                                                                     | [文档地址](https://www.npmjs.com/package/react-native-image-picker)                                                                                                                                          |
| H5   | `input`: `type='file'`                                                                          | [文档地址](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file)                                                                                                                             |
| MP   | 小程序元素选择文件 API: `chooseImage` (微信可以使用: `chooseMedia`)；上传文件 API: `uploadFile` | [选择文档地址](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html)、[上传文档地址](https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html) |

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

[拓展 FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

```tsx | pure
/**
 * 解析上传的 File 文件
 * @param file File 类型数据
 * @param index 处理第几个 File 文件
 */
const parseFile = (file: any, index: number) => {
  return new Promise((resolve, reject) => {
    // 创建一个文件读取对象
    const reader = new FileReader();
    // 读取文件以 URL 格式的 Base64 字符串作为结果返回
    reader.readAsDataURL(file);
    // 文件读取操作完成事件
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
// imageParsePromiseList 所有文件解析完成
Promise.all(imageParsePromiseList)
  .then((imageItems) => {
    console.log(imageItems);
    setImgFiles(imageItems);
  })
  .catch((error) => console.log(error));
}
```

### 小程序端实现

```ts
// 选择图片 API
chooseImage({
  count: 9, // 最多可以选择的图片数量
  sourceType: ['album', 'camera'], // 选择图片来源相册或相机
  sizeType: ['original'] || ['compressed'], // 所选的图片的尺寸【原图/压缩图】【字节小程序 API 没有该属性】
  success: (res) => {
    const {
      tempFilePaths, // 图片的本地临时文件路径列表 (本地路径) 【Array.<string>】
      tempFiles, // 图片的本地临时文件列表 【Array.<Object>】
    } = res;

    const {
      path, // 本地临时文件路径 (本地路径)
      size, // 本地临时文件大小，单位 B
    } = tempFiles;
  }
});

// filesList = tempFiles || tempFilePaths

// 文件上传 API, 并使用 Promise 进行封装
const promiseArr = filesList.map(({ path, size }) => {
  return new Promise(() => {
    uploadFile({
      url: '', // 开发者服务器地址
      filePath: '', // 要上传文件资源的路径 (本地路径)
      header: , // HTTP 请求 Header，Header 中不能设置 Referer
      formData: , // HTTP 请求中其他额外的 form data

      // 微信和字节
      name: '', // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
      timeout: , // 超时时间，单位为毫秒【字节没有选项属性】

      // 阿里系
      fileName: '', // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
      hideLoading: false, // 是否隐藏 loading 图

      success: (res) => {
        const {
          data, // 返回数据信息
          statusCode, // HTTP 状态码
          header, // 服务器返回的 Header 【阿里系返回值内含有该属性】
        } = res;

        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject('upload failed');
        }
        return resolve(res.data);
      }
    })
  })
})

const resArr = Promise.all(promiseArray)
  .then(res => res)
  .catch(error => throw new Error(error));

return resArr;
```
