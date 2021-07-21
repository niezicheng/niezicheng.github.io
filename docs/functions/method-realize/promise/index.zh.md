---
title: Promise
order: 4
group:
  title: 方法实现
nav:
  title: 工具库
  order: 1
---

## Promise

> 通俗来讲，`Promise` 所做的就是将层层嵌套回调改变为链式调用的形式，增加可读性和可维护性

### Promise A+规范

[Promise A+规范](https://promisesaplus.com/)

> 1. `Promise` 本质是一个状态机，且状态只能为以下三种：`Pending`（等待态）、`Fulfilled`（执行态）、`Rejected`（拒绝态），状态的变更是单向的，只能从`Pending` -> `Fulfilled` 或 `Pending` -> `Rejected`，状态变更不可逆
> 2. `then` 方法接收两个可选参数，分别对应状态改变时触发的回调。`then` 方法返回一个 `promise`。`then` 方法可以被同一个 `promise` 调用多次

### 静态方法

#### Promise.resolve()

- 参数类型

  1. Promise 实例 【返回这个 `Promise` 对象】
  2. thenable 对象 【`thenable` 对象指的是具有 then 方法的对象】
  3. 其他类型或不存在 【返回一个 `fulfilled` 状态的新 `Promise` 对象】

- 参数类型第 2 点说明:
  > `Promise.resolve` 方法会将这个 `thenable` 对象转为 `Promise` 对象,然后就立即执行这个 `thenable` 对象的 `then` 方法

##### Promise.all()

- 函数参数

  参数为多个 `Promise` 实例对象组成的数组

- 参数说明
  1. 将多个 `Promise` 实例,包装成一个新的 `Promise` 实例, 并返回
  2. 若参数数组中的所有 `Promise` 实例状态为 `fulfilled` 时, 返回新的 `Promise` 实例, `then` 中成功回调函数返回结果为数组中各 `Promise` 返回结果组成的数组
  3. 若参数数组中碰到有 `Promise` 实例状态为 `rejected` 时,无需再看数组后面 `Promise` 实例状态, 直接返回新的 `Promise` 实例，`catch` 中失败回调函数返回结果为该中各 `Promise` 返回结果组成的数组

```tsx | preview
import React, { useState, useEffect } from 'react';
import { MyPromise } from 'docs-dumi';
import { Button } from 'antd';

export default () => {
  const [state, setState] = useState('fulfilled');
  const [result, setResult] = useState();

  const handleClick = () => {
    setState(state === 'fulfilled' ? 'rejected' : 'fulfilled');
  };

  useEffect(() => {
    const p1 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve('result1');
      }, 300);
    });

    const p2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve('result2');
        } else {
          reject('error2');
        }
      }, 100);
    });

    const p3 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve('result3');
      }, 200);
    });

    const p = Promise.all([p1, p2, p3]);

    p.then(
      res => setResult(res),
      error => setResult(error),
    );
  }, [state]);

  return (
    <>
      <Button type="primary" onClick={handleClick}>
        {`切换为 ${state === 'fulfilled' ? 'rejected' : 'fulfilled'} 示例`}
      </Button>
      <div>{`结果: ${result}`}</div>
    </>
  );
};
```

##### Promise.race()

- 函数参数

  参数为多个 `Promise` 实例对象组成的数组

- 参数说明
  1. 将多个 `Promise` 实例,包装成一个新的 `Promise` 实例, 并返回
  2. 返回参数 `promise` 实例数组中执行返回结果最快的 `Promise` 对象信息

```tsx | preview
import React, { useState, useCallback } from 'react';
import { MyPromise } from 'docs-dumi';
import { Button } from 'antd';

export default () => {
  const [result, setResult] = useState('');
  const [delay1, setDelay1] = useState(0);
  const [delay2, setDelay2] = useState(0);
  const [delay3, setDelay3] = useState(0);

  const handleClick = useCallback(() => {
    const p1 = new MyPromise((resolve, reject) => {
      const delay = Math.round(Math.random() * 1000);
      setDelay1(delay);

      setTimeout(() => {
        resolve('result1');
      }, delay);
    });

    const p2 = new MyPromise((resolve, reject) => {
      const delay = Math.round(Math.random() * 1000);
      setDelay2(delay);

      setTimeout(() => {
        resolve('result2');
      }, delay);
    });

    const p3 = new MyPromise((resolve, reject) => {
      const delay = Math.round(Math.random() * 1000);
      setDelay3(delay);

      setTimeout(() => {
        resolve('result3');
      }, delay);
    });

    const p = Promise.race([p1, p2, p3]);

    p.then(
      res => setResult(res),
      error => setResult(error),
    );
  }, []);

  return (
    <>
      <Button type="primary" onClick={handleClick}>
        获取结果
      </Button>
      <div>{`结果: ${result}`}</div>
      <ul>
        <li>{`p1返回数据时间 ${delay1} ms`}</li>
        <li>{`p2返回数据时间 ${delay2} ms`}</li>
        <li>{`p3返回数据时间 ${delay3} ms`}</li>
      </ul>
    </>
  );
};
```
