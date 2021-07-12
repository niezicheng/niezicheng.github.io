---
title: Array 方法实现
order: 3
group:
  title: 方法实现
nav:
  title: 工具库
  order: 1
---

## map

```tsx | pure
/**
 * 遍历对象
 * arr 遍历的数组对象
 * callback 处理执行结果回调函数
 */
function (arr, callback) {
  if (!Array.isArray(arr) || !arr?.length || typeof callback !== 'function') {
    return [];
  }

  let array = [];
  for(let i = 0; i < arr.length; i++) {
    // 将 callback 返回结果放入 array
    array.push(callback(arr[i], i, arr));
  }
  return array;
}
```

## filter

```tsx | pure
/**
 * 遍历对象，获取满足条件的数组项
 * arr 遍历的数组对象
 * callback 处理执行结果回调函数
 */
function (arr, callback) {
  if (!Array.isArray(arr) || !arr?.length || typeof callback !== 'function') {
    return [];
  }

  let array = [];
  for(let i = 0; i < arr.length; i++) {
    // 将 callback 返回结果为 true 时，将对应数组项放入 array
    if (callback(arr[i], i, arr)) {
      array.push(arr[i]);
    }
  }
  return array;
}
```

## reduce

```tsx | pure
/**
 * 遍历对象，遍历执行 callback 返回表达式
 * arr 遍历的数组对象
 * callback 处理执行结果回调函数
 * initValue 初始值
 */
function (arr, callback, initValue) {
  if (!Array.isArray(arr) || !arr?.length || typeof callback !== 'function') {
    return [];
  }

  // 是否传递初始值
  const hasInitValue = initValue !== undefined;
  let value = hasInitValue ? initValue : arr[0];

  // 有初始值需要多循环一次， 所以 i 应从 0 开始
  for(let i = hasInitValue ? 1 : 0; i < arr.length; i++) {
    // value 为每次 callback 的返回值
    value = callback(value, arr[i], i, arr);
  }
  return value;
}
```

## 深拷贝

### 基础版（浅拷贝 + 递归）

```tsx | pure
/**
 * (浅拷贝 + 递归)进行克隆, 只处理对象和数组类型引用
 * target 需要克隆的数据
 * map 存储空对象或空数据信息
 */
function cloneDeep (target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};

    // 后面循环存在空对象或空数组时，直接返回
    if (map.get(target)) {
      return target;
    }
    // 将空对象或空数组存储到 map 中
    map.set(target, cloneTarget);
    // 循环遍历非空对象或数组
    for(const key in target) {
      cloneTarget[key] = cloneDeep(target[key], map);
    }
    return cloneTarget;
  }
  return target;
}
```
