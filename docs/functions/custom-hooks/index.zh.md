---
title: 自定义 hooks
order: 6
nav:
  title: 方法
  order: 3
---

## a hooks library

[ahooks](https://ahooks.js.org/)

## ahooks-analysis

[ahooks-analysis](https://gpingfeng.github.io/ahooks-analysis/)

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

## usePersistFn

> 一个持久化函数 的 `hooks`，保证函数地址永远不会变化

```tsx
import { useRef } from 'react';

type noop = (...args: any[]) => any;

function usePersistFn<T extends noop>(func: T) {
  const funcRef = useRef<T>(func);
  const persistFunc = useRef<T>();

  // 将传入的 func 存储到 ref 中
  funcRef.current = func;

  if (!persistFunc.current) {
    persistFunc.current = function(...args) {
      return funcRef.current.apply(this, args);
    } as T;
  }

  return persistFunc.current;
}

export default usePersistFn;
```

## usePagination

> 分页数据请求加载封装

```tsx
import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';

type ArgsType = {
  // 分页页数
  pageNo?: number;
  // 分页大小
  pageSize?: number;
  [propName: string]?: any;
}

type Options = {
  // 获取数据方法
  getData: (params: any) => (params) => Promise;
  // 数据总数 key 路径
  totalPath?: string;
  // 数据 key 路径
  dataPath?: string;
  // 初始化参数
  initArgs?: ArgsType;
}

const usePagination = (options: Options) => {
  const { getData, totalPath = 'total', dataPath = 'data' } = options;

  const { current: initArgs } = useRef<ArgsType>(options?.initArgs);
  const [loading, setLoading] = useState(false);
  const [args, setArgs] = useState<ArgsType>(initArgs);
  const [result, setResult] = useState(() => {
    const initRes = {};
    set(initRes, totalPath, 0);
    return set(initRes, dataPath, []);
  });

  const total = useMemo(() => get(result, totalPath, 0), [result, totalPath]);
  const data = useMemo(() => get(result, dataPath, []), [result, dataPath]);

  const getDataPersist = usePersistFn(getData);

  // 获取数据处理函数
  const _getData = useCallback(() => {
    setLoading(true);
    try {
      const res = await getDataPersist(args);
      let dataSource = needJackson ? jacksonConverter.parse(JSON.stringify(res)) : res;
        if (args.pageNo > 1) {
          setResult((prevResult) => {
            const newList = [..._get(prevResult, dataPath, []), ..._get(dataSource, dataPath, [])];
            return _set({ ...dataSource }, dataPath, newList);
          });
        } else {
          setResult(dataSource || _set({}, dataPath, []));
        }
    } catch(err) {
      console.log(err);
       setLoading(false);
    }
  }, []);

  useEffect(_getData, [_getData]);

  // 刷新方法
  const refresh = usePersistFn((type, refreshArgs) => {
    setArgs(type === 'init' ? { ...initArgs } : { ...args, ...refreshArgs });
  });

  // 加载更多方法 pageNo + 1
  const loadMore = usePersistFn(() => {
    // 触发分页加载更多（
    if (!loading && total > data?.length) {
      setArgs((prevArgs) => ({ ...prevArgs, pageNo: prevArgs.pageNo + 1 }));
    }
  });

  // 底部渲染信息
  const renderFooter = useCallback(() => (
    <Footer loading={loading} hasMore={total > data?.length} />
  ), [data?.length, loading, total]);

  return { args, setArgs, loading, result, loadMore, renderFooter, refresh };
};
```

## useMatchMedia

> 媒体查询匹配【通过监听窗口 `resize` 来判断是否匹配对应尺寸屏幕】

```ts
import { useEffect, useState, useCallback } from 'react';
import _throttle from 'lodash/throttle';

// 响应式断点
export const MEDIA_BREAKPOINT_KEY = {
  lg: 'lg',
  md: 'md',
  sm: 'sm',
};

// 响应式断点列表
export const MEDIA_BREAKPOINT_LIST = [
  { name: MEDIA_BREAKPOINT_KEY.lg, rule: '(min-width: 906px)' },
  {
    name: MEDIA_BREAKPOINT_KEY.md,
    rule: '(min-width: 415px) and (max-width: 905px)',
  },
  { name: MEDIA_BREAKPOINT_KEY.sm, rule: '(max-width: 414px)' },
];

function useMatchMedia() {
  const [currentMedia, setCurrentMedia] = useState(MEDIA_BREAKPOINT_KEY.lg); // 当前媒体 lg

  const updateMatchResult = useCallback(() => {
    let result = MEDIA_BREAKPOINT_KEY.lg;
    if (window) {
      // 当前窗口是否匹配对应端点规则 currentBreakpoint: { name: '', rule: '' },
      const currentBreakpoint = MEDIA_BREAKPOINT_LIST.find(
        it => window.matchMedia(it.rule).matches,
      );
      result = currentBreakpoint?.name;
    }
    setCurrentMedia(result);
  }, []);

  useEffect(() => {
    updateMatchResult();
    if (window) {
      const resizeHandler = _throttle(updateMatchResult, 100);
      // 监听窗口 resize 变化，更新相应 currentMedia 值
      window.addEventListener('resize', resizeHandler);
      return () => {
        // 取消监听
        window.removeEventListener('resize', resizeHandler);
      };
    }
    return null;
  }, [updateMatchResult]);

  const mediaMatchResult = { currentBreakpoint: currentMedia };
  // 遍历响应式断点列表，为匹配的媒体尺寸 boolean 映射
  MEDIA_BREAKPOINT_LIST.forEach(it => {
    mediaMatchResult[it.name] = it.name === currentMedia;
  });
  // 数据格式 { lg: true, md: false, ms: false }; 当前匹配的尺寸为 lg 【'(min-width: 906px)'】
  return mediaMatchResult;
}

export default useMatchMedia;
```

## useFooterClass

> 返回不同情况下的底部元素需要的类名信息【是否固定定位】

```ts
/**
 * 通过比较内容和窗口高度，返回对应的底部类名
 * @param {*} contentRef
 * @param {*} fixedClass
 * @param {*} footHeight 底部固定高度
 * @returns 类名
 */
export useFooterClass = (contentRef, fixedClass, footHeight) => {
  const [footerClass, setFooterClass] = useState(''); // 底部元素类名字串

  // 处理函数
  const handler = useCallback(() => {
    // 内容元素存在
    if (contentRef.current) {
      // 获取客户端高度
      const docHeight = document.documentElement.clientHeight;
      // 获取内容底部距离窗口的距离
      const contentBtmToTop = contentRef.current.getBoundingClientRect().bottom;
      // 是否底部固定定位
      const isBottom = docHeight - contentBtmToTop <= footHeight;

      if (isBottom && footerClass !== fixedClass) {
        setFooterClass(fixedClass);
      } else if (!isBottom && footerClass !== '') {
        setFooterClass('');
      }
    }
  }, [fixedClass, footHeight, footerClass, contentRef]);

  useEffect(() => {
    // 首次渲染计算
    handler();
  }, [handler]);

  // 当窗口滚动时出发处理函数进行计算
  useWindowScroll(handler, true);

  return footerClass;
}
```

### 示例

```tsx
import { useRef } from 'react';
import { useFooterClass } from '../useFooterClass';

const FOOTER_HEIGHT = 44;

const Demo = () => {
  const contentRef = useRef();
  const footerClass = useFooterClass(
    contentRef.current,
    'fixed',
    FOOTER_HEIGHT,
  );

  return (
    <>
      {/* 头部元素 */}
      <Header />
      <div ref={contentRef}>内容信息</div>
      {/* 底部元素 */}
      <Footer footerClass={footerClass} />
    </>
  );
};
```
