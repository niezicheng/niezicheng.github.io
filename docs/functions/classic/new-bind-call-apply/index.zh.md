---
title: new、 bind、 call、 apply
order: 2
group:
  title: 经典
nav:
  title: 方法
  order: 3
---

## new 方法实现思路

`new` 实例化构造函数，生成对应的实例对象，主要分为以下几步

1. 获取构造函数
2. 创建一个新的对象
3. 将函数作用域赋给新对象，即新对象 `__proto__` 指向构造函数的 `prototype`(原型对象)
4. 执行函数中的代码（为新对象添加属性、方法）
5. 执行函数返回对象时，将该对象作为返回值；否则，返回创建的新对象

## bind、call、apply 方法

### 相同点

> 三者均是用于改变函数内部 `this` 指向

### 不同点

- `bind` 方法不会立即调用，而是返回一个新的绑定函数
- `call` 方法会立即调用，传递参数为扩展形式
- `apply` 方法会立即调用，传递参数为数组形式

### 基本实现思路

> `Function` 表示调用方法的函数，`target` 表示指向的目标对象

1. 方法内部将 `Function` 的 `this` 赋值给 `target` 目标对象的方法 `fn`;
2. 内部调用 `target.fn` 并传递对应的`参数`, 即执行的是 `Function`, 但内部的 `this` 指向为 `target`
3. 删除方法内部 `target` 的函数属性 `fn`, 避免污染
4. 返回 `target.fn` 的执行结果

## 示例

<code src="./demo/index.tsx"></code>

## 源码

```ts
/**
 * new 的实现
 * 1. 获取构造函数
 * 2. 创建一个新的空对象实例。
 * 3. 将函数作用域赋给新对象, (将此空对象的隐式原型指向其构造函数的显示原型, 生产一个新的上下文)
 * 4. 执行构造函数(为新对象添加属性方法), 同时执行构造函数内的 this 指向这个新对象
 * 5. 如果返回值是一个新对象，那么直接返回该对象；如果无返回值或者返回一个非对象值，那么就将步骤（1）创建的对象返回
 */

export function MyNew() {
  let ConStructor = Array.prototype.shift.call(arguments); // 取出构造函数
  let obj: any = {}; // 创建一个新对象

  obj.__proto__ = ConStructor.prototype; // 对象原型指向构造函数的 prototype

  let result = ConStructor.apply(obj, arguments); // 执行构造函数中的代码

  return typeof result === 'object' ? result : obj; // 返回值须为对象
}

/**
 * bind 方法
 * 改变函数内部 this 指向，接受为扩展变量作为函数参数
 * @param context 函数内部 this 指向对象
 */
export default function(context: any = global) {
  if (typeof this !== 'function') {
    throw new TypeError('type error');
  }

  context.fn = this;
  return function() {
    let result = context.fn(...arguments); // 执行函数
    delete context.fn; // 删除属性，避免污染
    return result;
  };
}

/**
 * call 方法
 * 改变函数内部 this 指向，接受数组作为函数参数
 * @param context 函数内部 this 指向对象
 * @param args 传递给函数的参数
 */
export default function(context: any = global, ...args: any) {
  if (typeof this !== 'function') {
    throw new TypeError('type error');
  }

  // 将调用该方法的 function 的 this 指向赋给 context 的 fn 属性
  context.fn = this;
  let result = context.fn(...args); // 执行函数
  delete context.fn; // 删除属性，避免污染
  return result;
}

/**
 * apply 方法
 * 改变函数内部 this 指向，接受数组作为函数参数
 * @param context 函数内部 this 指向对象
 * @param args 传递给函数的参数数组
 */
export default function(context: any = global, args: Array<any>) {
  if (typeof this !== 'function') {
    throw new TypeError('type error');
  }

  // this 为调用该方法的 function，将其赋给 context 的 fn 属性
  context.fn = this;

  let result;
  if (!args) {
    result = context.fn();
  } else {
    result = context.fn(...args); // 执行函数
  }

  delete context.fn; // 删除属性，避免污染
  return result;
}
```
