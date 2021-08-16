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
