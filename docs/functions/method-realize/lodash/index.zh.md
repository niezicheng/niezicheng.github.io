---
title: lodash
order: 2
group:
  title: 方法实现
nav:
  title: 工具库
  order: 1
---

## get 方法

```ts
const get = (source, path, defaultValue) => {
  // 处理 path；如：a[1].b => a.1.b
  const pathArr = path?.replace(/\[(\d+)\]/, '.$1')?.split('.'); // [a, 1, b]
  let res = source;

  for (const p of pathArr) {
    res = res?.[p];
    if (res === undefined) {
      res = defaultValue;
    }
  }

  return res;
};
```

[如何实现 lodash.get 函数及可选链操作简化取值](https://segmentfault.com/a/1190000021799343)
