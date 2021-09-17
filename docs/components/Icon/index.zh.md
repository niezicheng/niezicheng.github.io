---
title: Icon 图标
order: 9
nav:
  title: 组件
  order: 0
---

## Icon 图标

加载字体图标或 `svg`

[Iconfont -- 阿里巴巴矢量图标库的使用](https://www.jianshu.com/p/00c786e8727e)

## 基本使用

### Web

#### Iconfont - Web

[web icon-font 的使用方法](https://www.jianshu.com/p/68117e36c473)

1. 加载 `@font-face` 字体资源文件

```css | pure
@font-face {
  font-family: 'iconfont'; /* Project id 2651734 */
  src: url('//at.alicdn.com/t/font_2651734_4pmjwaeilvk.eot?t=1625468471601'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2651734_4pmjwaeilvk.eot?t=1625468471601#iefix')
      format('embedded-opentype'), /* IE6-IE8 */
      url('//at.alicdn.com/t/font_2651734_4pmjwaeilvk.woff2?t=1625468471601')
      format('woff2'),
    url('//at.alicdn.com/t/font_2651734_4pmjwaeilvk.woff?t=1625468471601')
      format('woff'), url('//at.alicdn.com/t/font_2651734_4pmjwaeilvk.ttf?t=1625468471601')
      format('truetype'),
    url('//at.alicdn.com/t/font_2651734_4pmjwaeilvk.svg?t=1625468471601#iconfont')
      format('svg');
}
```

2. 使用 `span` 获取解析字体图标

```jsx | pure
// 默认 style 样式
const style = StyleSheet.flatten({
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontFamily: 'iconfont',
  alignItems: 'center',
  // lineHeight: 1,
});

// &#xe636; 对应图标的 unicode
<span style={style} dangerouslySetInnerHTML={{ __html: `&#xe636;` }}></span>;
```

#### Svg - Web

1. 网站字体库中下载图标 `svg` 代码并保存到对应文件内 `svg.json`

```js | pure
// name: Array<{ d: string, fill: string }>
{
  'delete': [{
    d: 'M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72z', fill: '#333333'
  }, {
    d: 'M864 256H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z', fill: '#333333'
  }],
}

```

2. 通过 `svg` 标签展示

```jsx | pure
import source from 'svg.json';

<svg
  width={22}
  height={22}
  viewBox={'0 0 1024 1024'}
  style={style}
  xmlns="http://www.w3.org/2000/svg"
>
  {source[name].map((path, index) => {
    // 多颜色处理
    const fillColor = Array.isArray(color) ? color[index] : color;

    return <path key={index} d={path.d} fill={fillColor || path.fill} />;
  })}
</svg>;
```

### RN

#### Iconfont - RN

[ReactNative 中 iconfont 使用详解](https://www.jianshu.com/p/c900f6a0797f)

#### Svg - RN

- 基本用法和 `Svg - Web` 相同，主要是组件的引入使用的是第三方库 `react-native-svg`

```jsx | pure
import Svg, { Path } from 'react-native-svg';

import source from 'svg.json';

<Svg width={22} height={22} viewBox={'0 0 1024 1024'} style={style}>
  {source[type].map((path, index) => {
    // 接受外部传递的 color 参数多颜色处理
    const fillColor = Array.isArray(color) ? color[index] : color;

    return <Path key={index} d={path.d} fill={fillColor || path.fill} />;
  })}
</Svg>;
```

### MP 小程序

#### Iconfont - MP

- 使用 `loadFontFace` `API` 加载字体图标

```jsx | pure
// 加载字体资源库
wx.loadFontFace({
  global: true,
  family: 'iconfont',
  source: `url("https://sungd.github.io/Pacifico.ttf")`,
  complete: res => {
    console.log('res:', res);
  },
  fail: error => {
    console.log('error:', error);
  },
});

// &#xe635; 对应图标的 unicode 后的 e635, 将其转化为十进制
let iconText = parseInt('e635', 16) || '';

if (typeof iconText === 'number') {
  iconText = String.formCharCode(iconText);
}

<Text>{iconText}</Text>;
```

#### Svg - MP

[小程序加载 svg 图片](https://www.jianshu.com/p/1160d609eea2)

```jsx | pure
import { Base64 } from 'js-base64';

// 接受外部传递的 color 多颜色处理
type ColorType = string | Array<string>;

// 构建 svg 元素
const svg = `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg
    width="22px"
    height="22px"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    ${paths
      .map(
        (path, index) =>
          `<path d="${path.d}" fill="${
            Array.isArray(color) ? color[index] : color || path.fill
          }" id="${id}" />`,
      )
      .join('')}
  </svg>`;

// 将 SVG 转化成Base64
const url = `data:image/svg+xml;base64,${Base64.encode(svg)}`;

<Image
  style={style}
  source={url}
  mode="aspectFit"
  onError={err => console.log(err)}
/>;
```
