---
title: 数组
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
  for(let i = hasInitValue ? 0 : 1; i < arr.length; i++) {
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
function cloneDeep(target, map = new WeakMap()) {
  if (!target) return target;
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);

  if (typeof target !== 'object') return target;

  let cloneTarget = Array.isArray(target) ? [] : {};

  // 后面循环存在空对象或空数组时，直接返回
  if (map.get(target)) return map.get(target);

  // 将空对象或空数组存储到 map 中
  map.set(target, cloneTarget);

  // 循环遍历非空对象或数组
  for (let key in target) {
    cloneTarget[key] = cloneDeep(target[key], map);
  }

  return cloneTarget;
}
```

### 数据格式转换

**数据格式**

```ts
[
  {
    name: '一级目录',

    children: [
      {
        name: '二级目录',

        tagList: [
          {
            name: '标签',

            tagValueList: [
              {
                name: '标签值111',
              },
              {
                name: '标签值222',
              },
            ],
          },
        ],
      },
    ],
  },
][
  // 转换后
  (['一级目录', '二级目录', '标签', '标签值111'],
  ['一级目录', '二级目录', '标签', '标签值222'])
];
```

```ts
/**
 * 获取搜索数据信息
 * @param data 原数据
 * @param parent 父节点数据信息
 * @returns 平铺的二维数组
 */
export const fetchSearchData = (data, parent?: any): any[][] => {
  let newData = [];
  data?.forEach(item => {
    // 处理多级分类
    if (Array.isArray(item?.children) && item.children?.length > 0) {
      const temp = fetchSearchData(item?.children, item)?.map(val =>
        parent ? [parent, ...val] : val,
      );
      newData.push(...temp);
      // 处理标签
    } else if (Array.isArray(item?.tagList) && item.tagList?.length > 0) {
      const temp = fetchSearchData(item?.tagList, item)?.map(val =>
        parent ? [parent, ...val] : val,
      );
      newData.push(...temp);
      // 处理标签值
    } else if (
      Array.isArray(item?.tagValueList) &&
      item.tagValueList?.length > 0
    ) {
      const temp = fetchSearchData(item?.tagValueList, item)?.map(val =>
        parent ? [parent, ...val] : val,
      );
      newData.push(...temp);
    } else {
      newData.push([parent, item]);
    }
  });

  return newData;
};
```
