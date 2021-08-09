---
title: 自定义 hooks
order: 6
group:
  title: 方法实现
nav:
  title: 工具库
  order: 1
---

## a hooks library

[ahooks](https://ahooks.js.org/)

## 自定义同步 hooks

> 类似于类组件 `this.setData(data, callback)` 中设置值后的回调函数 `callback`。

```tsx | pure
import { useEffect, useState, useCallback } from 'react';

const useSyncCallback = callback => {
  const [proxyState, setProxyState] = useState({ current: false });

  const Func = useCallback(() => {
    setProxyState({ current: true });
  }, [proxyState]);

  useEffect(() => {
    if (proxyState.current === true) {
      setProxyState({ current: false });
    }
  }, [proxyState]);

  useEffect(() => {
    proxyState.current && callback();
  });

  return Func;
};

export default useSyncCallback;

// 使用
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(9);
  func(); // 9
};

const func = useSyncCallback(() => {
  console.log(count);
});
```
