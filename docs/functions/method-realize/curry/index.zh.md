---
title: 函数柯里化
order: 5
group:
  title: 方法实现
nav:
  title: 工具库
  order: 1
---

## 函数柯里化

> 函数柯里化：把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。

## ES5 实现

```ts | pure
function curry(fn, args) {
  // 获取传入函数参数的长度
  let length = fn.length;
  // 循环存储的参数数组，第一次循环的时候 args 为 undefined
  args = args || [];

  return function() {
    // 克隆 args 数组
    let subArgs = args.slice(0);

    console.log(subArgs, 'subArgs===', length);

    // 拼接得到所有的参数
    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i]);
    }

    // 判断参数的长度是否已经满足函数所需参数的长度
    if (subArgs.length >= length) {
      // 执行函数
      return fn.apply(this, subArgs);
    } else {
      // 递归返回柯里化函数，等待参数的传入
      return curry.call(this, fn, subArgs);
    }
  };
}
```

## ES6 实现

```ts | pure
const curry = (fn, ...args) =>
  fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
```

## 示例

```ts | pure
const add = (a, b, c) => {
  return a + b + c;
};

const addCurry = curry(add);

console.log(addCurry(1)(2)(3)); // 6
```

## 柯里化的好处

- 参数复用
- 提前确认
- 延迟执行

> 场景：对同一号码验证后做不同的事情

```ts | pure
const checkFun = (reg, str, callback) {
  reg.test(str) && callback();
}

// 是否符合手机号
const reg = '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$';

// 手机号
const str = '13479540499'

// 函数柯里化
const curryCheck = curry(checkFun)(reg)(str); // 提前判断字符串是否符合校验规则(提前确认)

curryCheck(callback1); // 延迟执行回调函数(延迟执行)
curryCheck(callback2); // 复用前面的两个参数执行不同的回调函数(参数复用)

```
