---
title: HTML
order: 1
group:
  title: Interview Question
toc: 'menu'
nav:
  title: 面试题集锦
  order: 0
---

## Q1: html5 语义化标签

- 易于用户阅读，样式丢失的时候能让页面呈现清晰的结构
- 利于浏览器解析和 `SEO` 搜索引擎优化, 搜索引擎根据标签来确定上下文和各个关键字的权重
- 有利于开发和维护，语义化更具可读性，代码更好维护，与 `CSS3` 关系更和谐
- 方便其他设备解析，如: 盲人阅读器根据语义渲染网页

## Q2: 为什么要使用 web workers

[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

> 因为 `js` 是单线程，如果存在大数据运算的时候会影响用户使用体验，出现卡顿的情况。
> 使用 `web workers` 可以开启一个线程，在运算的同时，不影响用户体验。

web workers 的几个使用场景可以参考下：

- 当大图片 `canvas`转 `base64` 的时候非常耗时，就可以使用 `wokers`
- 端对端加密的时候，要大量计算，可以使用 `workers`
- 拼写检查，检索的所有工作可以让 `workers` 来完成，不会阻塞 `UI`
- 在网络不稳定情况下,使用`indexDb api`的时候，可以交给`workers`，这样不会阻塞主线 `UI`

**基本使用:**

> 注意点: `同源限制`、`DOM 限制`、`通信联系`、`脚本限制`、`文件限制`

主线程和 `worker` 线程相同 `api`:

- postMessage(data): 发送消息 data
- onmessage: 指定 `message` 事件的监听函数
- onmessageerror: 指定 `messageerror` 事件的监听函数(发送的数据无法序列化成字符串时, 会触发这个事件)。

主线程:

- Worker.onerror: 指定 `error` 事件的监听函数
- Worker.terminate(): 立即终止 `Worker` 线程

```ts
// 创建一个 Worker 线程实例；参数1: 脚本网址（同源）, 参数2: Worker 线程名称（选填）
let worker = new Worker('worker.js', { name: 'myWorker' });

// 向 Worker 发送消息 data
worker.postMessage(data);

// 监听 Worker 发送过来的消息 data
worker.onmessage = event => {
  const { data } = event;
};

// error 事件的监听函数
worker.onerror(event => {
  console.log(event);
});

// messageerror 事件的监听函数
worker.onmessageerror(event => {
  console.log(event);
});

// 终止 Worker 线程
worker.terminate();
```

Worker 线程:

> `Web Worker` 有自己的全局对象，不是主线程的 `window`，而是一个专门为 `Worker` 定制的全局对象。因此定义在 `window` 上面的对象和方法不是全部都可以使用

- self.importScripts(): 加载 `JS` 脚本
- self.close(): 关闭 `Worker` 线程

```ts
// 向产生这个 Worker 的线程发送消息 data
this.postMessage(data);

// 监听产生这个 Worker 的线程发送过来的消息 data
this.onmessage = event => {
  const { data } = event;
};

// messageerror 事件的监听函数
worker.onmessageerror(event => {
  console.log(event);
});

// 关闭 Worker 线程
this.close();

// 加载一个或多个 JS 脚本
importScripts('script1.js', 'script2.js');
```

## Q3: BOM 和 DOM

### BOM

> `BOM` 是浏览器对象

- location 对象
  - location.href --返回或设置当前文档的 `URL`
  - location.search --返回 URL 中的查询字符串部分。例
    如: `http://www.dreamdu.com/dreamdu.php?id=5&name=nzc` 返回包括(?)后面的内容?id=5&name=nzc
  - location.hash --返回 `URL#`包括(#)后面的内容，如果没有`#`，返回空
  - location.host --返回 `URL` 中的域名部分。例如: `www.baidu.com`
  - location.hostname --返回 `URL` 中的主域名部分。例如: `baidu.com`
  - location.pathname --返回 `URL` 的域名后的部分。例如: `http://www.baidu.com/xhtml/` 返回`/xhtml/`
  - location.port --返回 `URL` 中的端口部分）例如: `http://www.baidu.com:8080/xhtml/` 返回 `8080`
  - location.protocol --返回 `URL` 中的协议部分。例如: `http://www.baidu.com:8080/xhtml/` 返 回(//)前面的内容 http:
  - location.assign --设置当前文档的 `URL`
  - location.replace() --设置当前文档的 `URL`，并且在 `history` 对象的地址列表中移除这个 `URL`, location.replace(url);
  - location.reload() -- 重载当前页面
- history 对象
  - history.go() -- 前进或后退指定的页面数 `history.go(num)`
  - history.back() -- 后退一页
  - history.forward() -- 前进一页
- Navigator 对象
  - navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字 符串)
  - navigator.cookieEnabled -- 返回浏览器是否支持(启用) `cookie`

### DOM

> `DOM` 文档对象模型

[回到基础：什么是 DOM 及 DOM 操作？](https://juejin.cn/post/6844904023003234311)

## Q4: 说一下 HTML5 drag api

- dragstart: 事件主体是被拖放元素，在开始拖放被拖放元素时触发。
- drag: 事件主体是被拖放元素，在正在拖放被拖放元素时触发。
- dragenter: 事件主体是目标元素，在被拖放元素进入某元素时触发。
- dragover: 事件主体是目标元素，在被拖放在某元素内移动时触发。
- dragleave: 事件主体是目标元素，在被拖放元素移出目标元素是触发。
- drop: 事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
- dragend: 事件主体是被拖放元素，在整个拖放操作结束时触发

## Q5: iframe 是什么? 有什么缺点?

> `iframe` 元素会创建包含另一个文档的内联框架
>
> 提示: 可以将提示文字放在 `<iframe></iframe>`之间，来提示某些不支持 iframe 的浏览器
> **缺点**

- 会阻塞主页面的 `onload` 事件
- 搜索引擎无法解读这种页面，不利于 `SEO`
- `iframe` 和主页面共享连接池，而浏览器对相同区域有限制所以会影响性能
