---
title: 颜色值转换
order: 1
group:
  title: 工具方法
nav:
  title: 工具库
  order: 1
---

## 颜色值网站

[Encycolorpedia](https://encycolorpedia.cn/)

## 随机颜色生成

```ts
function randomColor() {
  var colorStr = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .toUpperCase();
  return '#' + '000000'.substring(0, 6 - colorStr) + colorStr;
}
```

## 16 进制转换 rgb

> 参数说明: 参数形式可以为带“#”号，也可以不带，实际颜色值可以为 3 位，也可以为 6 位，如： "#ffffff"、"#fff"、"ffffff"、"fff"。

```ts
function transferColorToRgb(color) {
  if (typeof color !== 'string' && !(color instanceof String))
    return console.error('请输入16进制字符串形式的颜色值');
  color = color.charAt(0) === '#' ? color.substring(1) : color;
  if (color.length !== 6 && color.length !== 3)
    return console.error('请输入正确的颜色值');
  if (color.length === 3) {
    color = color.replace(/(\w)(\w)(\w)/, '$1$1$2$2$3$3');
  }
  var reg = /\w{2}/g;
  var colors = color.match(reg);
  for (var i = 0; i < colors.length; i++) {
    colors[i] = parseInt(colors[i], 16).toString();
  }
  return 'rgb(' + colors.join() + ')';
}
```

**3 位 16 进制转 6 位 16 进制:**

```ts
color.replace(/(\w)(\w)(\w)/, '$1$1$2$2$3$3'); // '#FFF' => '#FFFFFF'
```

## rgb(a) 转 16 进制颜色值

```ts
function transferRgbToStr(color) {
  if (
    (typeof color !== 'string' && !(color instanceof String)) ||
    !~color.indexOf('rgb')
  )
    return console.error('请输入rgb形式的颜色值');
  color = color.replace(/\s+/g, '');
  var index = color.indexOf('(') + 1;
  //注意： String 的slice方法，slice方法参数为负数时，即为倒数
  // substring 方法参数为负数时，全都认为是0
  var colors = color
    .slice(index, -1)
    .split(',')
    .slice(0, 3);
  for (var i = 0; i < colors.length; i++) {
    if (parseInt(colors[i], 10) > 255 || parseInt(colors[i], 10) < 0)
      return console.error('颜色值范围在0到255之间，请注意输入值！');
    colors[i] = parseInt(colors[i], 10).toString(16);
    if (colors[i].length === 1) {
      colors[i] = '0' + colors[i];
    }
  }
  return colors.join('');
}
```
