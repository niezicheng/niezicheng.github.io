---
title: 函数柯里化
order: 5
group:
  title: 经典
nav:
  title: 方法
  order: 3
---

## 函数柯里化

> 函数柯里化：把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。

## 说明

**参数：**

- fn: 需要柯里化的函数
- args: 函数递归调用接受的参数

**思路：**

- `curry` 内部获取 `fn` 参数的个数 `fn.length`
- 返回值为执行函数
  - 函数内部克隆递归传递的参数数组 `cloneArgs`
  - 循环将执行函数参数 `arguments` `push` 进入 `cloneArgs`（收集每步骤参数并合并之前的参数）
  - 最后判断 `cloneArgs.length` 与 `fn.length` 大小，如果小于，则递归调用 `curry.call(this, fn, cloneArgs)` 并返回; 否则, 执行函数 `fn.apply(this, subArgs)` 并返回

## 柯里化的好处

- 提前确认
- 延迟执行
- 参数复用

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
