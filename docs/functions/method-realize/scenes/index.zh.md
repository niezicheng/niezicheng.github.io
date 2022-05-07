---
title: Promise
order: 4
group:
  title: 场景实现
nav:
  title: 工具库
  order: 1
---

### 控制 Promise 并发请求数量

```ts
/**
 * @param promiseArr 请求返回的 promise 数组
 * @param maxNum 同时并行处理的最大 promise 数
 * @returns 所有请求结果 promise 对象
 */
const multiRequest = (promiseArr, maxNum) => {
  const total = promiseArr?.length; // 总的请求 promise 数量
  const res = new Array(total).fill(null); // 存储对应请求结果

  let finishNum = 0; // 已完成请求数
  let sendNum = 0; // 已发送请求数

  return new Promise(resolve => {
    // 并行执行规定数目请求
    while (sendNum <= maxNum && sendNum <= total) {
      next();
    }

    function next() {
      // 当前执行的请求，用于存储当前请求结果到 res
      const current = sendNum++;

      // 执行当前请求
      Promise.resolve(promiseArr[current]).then(
        data => {
          finishNum++;
          res[current] = data;
          // 还存在未执行的请求递归调用执行
          if (current < length) {
            next();
          } else {
            // 将结果返回
            resolve(res);
          }
        },
        error => {
          finishNum++;
          res[current] = error;
          if (current < length) {
            next();
          } else {
            resolve(res);
          }
        },
      );
    }
  });
};
```

[怎么在 JavaScript 中使用 Promise 控制并发请求个数](https://www.yisu.com/zixun/454030.html)
