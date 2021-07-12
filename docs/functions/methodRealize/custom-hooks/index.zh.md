---
title: 自定义 hooks
order: 5
group:
  title: 方法实现
nav:
  title: 工具库
  order: 1
---

## 自定义同步 hooks

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
      };
    }, [proxyState])

    useEffect(() => {
      proxyState.current && callback();
    })

    return Func;
}

export default useSyncCallback;

// 使用
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(9);
  func();
};

const func = useSyncCallback(() => {
  console.log(count); // 9
});
```
