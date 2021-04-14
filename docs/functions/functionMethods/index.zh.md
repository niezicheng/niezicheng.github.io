---
title: new,call,apply,bind 方法
group:
  title: 方法
---

## bind、call、apply之间的区别

### 相同点

> 三者均是用于改变函数内部 `this` 指向

### 不同点

- `bind` 方法不会立即调用，而是返回一个新的绑定函数
- `call` 方法会立即调用，传递参数为扩展形式
- `apply` 方法会立即调用，传递参数为数组形式

## 示例

<code src="./demo/index.tsx"></code>
