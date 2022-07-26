---
title: 防抖和节流
order: 1
group:
  title: 经典
nav:
  title: 方法
  order: 3
---

## 防抖和节流

### 函数防抖（debounce）

> 事件被触发 `n` 秒后再执行回调，如果在这 `n` 秒内又被触发，则重新计时

#### debounce 应用部分场景

- 按钮点击时间过快，导致多次触发点击事件
- 文本编辑多少时间间隔后无任何编辑操作保存文章
- 窗口尺寸改变 `resize` 次数过于频繁，重复计算消耗性能

### 函数节流（throttle）

> 规定在单位时间 `n` 秒内，只触发一次函数。如果这个单位时间内函数触发多次，只有一次生效

#### throttle 应用部分场景

- `input` 输入框根据输入内容实时发送请求获取下拉列表内容信息，间隔性发送请求获取数据信息
- 页面滑动获取对应的位置信息，滑动过程中间隔性获取位置信息
- 浏览器音视频播放，间隔计算相应的播放进度

## 示例 demo

<code src="./demo/index.tsx"></code>

## 源码

```ts
/**
 * 防抖函数
 * 说明：事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
 * @param fun 回调函数
 * @param delay 时间间隔
 */
export const debounce = <F extends (...arg: any[]) => void>(
  fun: F,
  delay: number = 0,
) => {
  let timeId: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeId);
    timeId = setTimeout(() => fun(...args), delay);
  };
};

/**
 * 节流函数
 * 说明：规定在单位时间 n 秒内，只触发一次函数。如果这个单位时间内函数触发多次，只有一次生效
 * @param fun 回调函数
 * @param wait 时间间隔
 */
export const throttle = <F extends (...arg: any[]) => void>(
  fun: F,
  wait: number,
) => {
  let timeId: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    if (timeId) return;
    timeId = setTimeout(() => {
      fun(...args);
      timeId = null as any;
    }, wait);
  };
};
```
