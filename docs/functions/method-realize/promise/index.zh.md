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

### Promise 流程调用

- `Promise` 的构造方法接收一个 `executor()`(执行器)，在 `new Promise()` 时就立刻执行这个 `executor` 回调
- `executor()` 内部的异步任务被放入宏/微任务队列，等待执行
- `then()` 被执行，收集成功/失败回调，放入成功/失败队列
- `executor()` 的异步任务被执行，触发 `resolve/reject`，从成功/失败队列中取出回调依次执行

> 异步触发 `_resolve` -> `then` 收集回调执行函数 -> 执行 `_resolve` -> 取出队列收集回调函数依次执行

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

### 源码

```ts
//Promise/A+规范的三种状态
// 等待态
const PENDING = 'pending';

// 执行态
const FULFILLED = 'fulfilled';

// 拒绝态
const REJECTED = 'rejected';

class MyPromise {
  // Promise 状态
  _status: string;

  // 储存 then 方法回调返回值
  _value: any;

  // then 方法收集的执行成功的回调队列
  _resolveQueue: any[];

  // then 方法收集的执行失败的回调队列
  _rejectQueue: any[];

  // 构造方法接受一个回调执行函数
  constructor(executor: any) {
    this._status = PENDING;
    this._value = undefined;
    this._resolveQueue = [];
    this._rejectQueue = [];

    let _resolve = (val: any) => {
      // 使用 setTimeout 包裹，兼容 executor 同步代码情况, 需保证 callback() 在 then 中收集
      setTimeout(() => {
        if (this._status !== PENDING) {
          return;
        }

        this._status = FULFILLED;
        this._value = val;

        // 实现规范要求中 then 方法的可以链式调用
        while (this._resolveQueue?.length) {
          const callback = this._resolveQueue.shift();
          callback(val);
        }
      });
    };

    let _reject = (val: any) => {
      setTimeout(() => {
        if (this._status !== PENDING) {
          return;
        }

        this._status = REJECTED;
        this._value = val;

        while (this._rejectQueue?.length) {
          const callback = this._rejectQueue.shift();
          callback(val);
        }
      });
    };

    // new Promise()时立即执行 executor,并传入 resolve 和 reject
    executor(_resolve, _reject);
  }

  /**
   * Promise 链式调用函数
   * @param resolveFn 成功回调函数
   * @param rejectFn 失败回调函数
   */
  then(resolveFn: any, rejectFn: any) {
    // 忽略 then 不为函数类型，保证 then 方法链式调用的执行
    typeof resolveFn !== 'function'
      ? (resolveFn = (value: any) => value)
      : null;
    typeof rejectFn !== 'function'
      ? (rejectFn = (reason: Error) => {
          throw new Error(reason instanceof Error ? reason.message : reason);
        })
      : null;

    // 返回一个新的 Promise 对象
    return new MyPromise((resolve: any, reject: any) => {
      // 封装 resolveFn 方法，便于对回调不同类型返回值进行处理
      const fulfilledFn = (value: any) => {
        try {
          // 获取当前 resolveFn 回调函数返回值
          let x = resolveFn(value);
          // 根据返回值类型执行对应函数回调
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };

      const rejectedFn = (error: any) => {
        try {
          let x = rejectFn(error);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };

      switch (this._status) {
        case PENDING:
          // 收集 then 执行成功的回调，保证链式调用的顺序执行
          this._resolveQueue.push(fulfilledFn);
          this._rejectQueue.push(rejectedFn);
          break;
        // 当状态已经变为 resolve/reject 时,直接执行then回调
        case FULFILLED:
          fulfilledFn(this._value);
          break;
        case REJECTED:
          rejectedFn(this._value);
          break;
      }
    });
  }

  /**
   * 失败调用函数
   * @param rejectFn 失败回调函数
   */
  catch(rejectFn: any) {
    return this.then(undefined, rejectFn);
  }

  /**
   * finally
   * @param callback 回调函数
   */
  finally(callback: any) {
    return this.then(
      (value: any) => MyPromise.resolve(callback).then(() => value, undefined),
      (reason: any) =>
        MyPromise.resolve(callback).then(() => {
          throw reason;
        }, undefined),
    );
  }

  /**
   * 静态的resolve方法
   * @param value
   */
  static resolve(value: any) {
    // 根据规范, 如果参数是 Promise 实例, 直接返回这个实例
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve: any) => resolve(value));
  }

  /**
   * 静态的reject方法
   * @param reason
   */
  static reject(reason: any) {
    return new MyPromise((resolve: any, reject: any) => reject(reason));
  }

  /**
   * all
   * @param promiseArray promise 实例数组
   */
  static all(promiseArray: any) {
    let index = 0;
    let result: any[] = [];
    return new MyPromise((resolve: any, reject: any) => {
      promiseArray.forEach((p: any, i: number) => {
        MyPromise.resolve(p).then(
          (val: any) => {
            index++;
            result[i] = val;
            // 所有 then 执行后 resolve 结果
            if (index === promiseArray.length) {
              resolve(result);
            }
          },
          (error: any) => {
            // 有一个Promise被reject时，MyPromise的状态变为reject
            reject(error);
          },
        );
      });
    });
  }

  /**
   * race
   * @param promiseArray promise 实例数组
   */
  static race(promiseArray: any) {
    return new MyPromise((resolve: any, reject: any) => {
      for (let p of promiseArray) {
        MyPromise.resolve(p).then(
          (value: any) => {
            resolve(value);
          },
          (error: any) => {
            reject(error);
          },
        );
      }
    });
  }
}

export default MyPromise;
```
