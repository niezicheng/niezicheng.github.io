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

## useSyncCallback

> 自定义 `useSyncCallback`, 支持类似 `class` 组件 `setState` 方法的参数 `callback` 方法

```tsx
import { useEffect, useState, useCallback } from 'react';

const useSyncCallback = (callback: Function) => {
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

## useStateWithCallback

> 自定义的 `useState`，支持类似 `class` 组件 `setState` 含有 `callback`

```tsx
import { useState, useRef, useEffect } from 'react';

const useStateWithCallback = (initState) => {
  const [state, setState] = useState(initState);
  const isUpdate = useRef();

  const setStateWithCallback = (state, callback) => {
    setState(pre => {
      isUpdate.current = callback;
      return (
        typeof state = 'function' ? state(pre) : state;
      )
    })
  }

  useEffect(() => {
    if (isUpdate.current) {
      isUpdate.current();
    }
  })

  return [state, setStateWithCallback];
}

// 使用
const [state, setStateWithCallback] = useStateWithCallback(0);

const handleClick = () => {
  setStateWithCallback(9, () => {
    console.log(count);
  });
};
```

## useDebounce

> 自定义的 `useDebounce`, 实现防抖函数功能

```tsx
import { useRef, useEffect } from 'react';

const useDebounce = (fn, timer = 100, deps = []) => {
  let timeId = useRef();

  // fn 函数接受参数
  return (...args) => {
    useEffect(() => {
      if (timeId.current) clearTimeout(timeout.current);
      timeId.current = setTimeout(() => {
        fn(...args);
      }, ms);
    }, deps);

    const cancel = () => {
      clearTimeout(timeout.current);
      timeout = null;
    };

    return [cancel];
  };
};

// 使用
const handleClick = useDebounce(e => {
  console.log(e); // 点击事件对象
}, 100);

const [cancel] = handleClick(); // 获取销毁定时器方法, 取消防抖功能
```

## useThrottle

> 自定义的 `useThrottle`, 实现节流函数功能

```tsx
import { useEffect, useRef, useState } from 'react';

const useThrottle = (fn, timer = 100, deps = []) => {
  let previous = useRef(0);
  let [time, setTime] = useState(timer);

  // fn 函数接受参数
  return (...args) => {
    useEffect(() => {
      let now = Date.now();
      if (now - previous.current > time) {
        fn(...args);
        previous.current = now;
      }
    }, deps);

    const cancel = () => {
      setTime(0);
    };

    return [cancel];
  };
};

// 使用
const handleClick = useThrottle(e => {
  console.log(e); // 点击事件对象
}, 100);

const [cancel] = handleClick(); // 设置时间为 0, 取消节流功能
```

## useTitle

```tsx
import { useEffect } from 'react';

const useTitle = title => {
  useEffect(() => {
    document.title = title;
  }, []);
};

// 使用
useTitle('文档标题');
```

## useUpdate

> 自定义 `useUpdate`, 实现组件的强制更新

```tsx
import { useState, useReducer } from 'react';

// 方式一（useReducer）
const useUpdate = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  return forceUpdate;
};

// 方式二（useState）
const useUpdate = () => {
  const [, setTime] = useState();

  const forceUpdate = () => {
    setTime(Date.now());
  };

  return forceUpdate;
};

const handleClick = useUpdate();
```

## useScroll

> 自定义 `useScroll`, 实现监听一个元素滚动位置的变化

```tsx
import { useState, useEffect } from 'react';

const useScroll = scrollRef => {
  const [pos, setPos] = useState([0, 0]);

  const handleScroll = useCallback(() => {
    setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollTop]);
  }, []);

  useEffect(() => {
    // 监听滚动事件
    scrollRef.current.addEventLister('scroll', handleScroll, false);

    return () => {
      scrollRef.current.removeEventListener('scroll', handleScroll, false);
    };
  }, []);

  return pos;
};

// 使用
const scrollRef = useRef(); // 元素实例

const [x, y] = useScroll(scrollRef);
```
