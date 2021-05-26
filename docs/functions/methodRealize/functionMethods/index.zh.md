---
title: new、 bind、 call、 apply
order: 0
group:
  title: Method Realize
nav:
  title: 工具库
  order: 1
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
