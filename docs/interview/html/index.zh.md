---
title: HTML
order: 1
toc: 'menu'
nav:
  title: 知识集锦
  order: 0
---

![图解](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/5/171467924210a82d~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

## html5 语义化

- 易于用户阅读，样式丢失的时候能让页面呈现清晰的结构
- 利于浏览器解析和 `SEO` 搜索引擎优化, 搜索引擎根据标签来确定上下文和各个关键字的权重
- 有利于开发和维护，语义化更具可读性，代码更好维护，与 `CSS3` 关系更和谐
- 方便其他设备解析，如: 盲人阅读器根据语义渲染网页

## BOM 和 DOM

### BOM

> `BOM` 是浏览器对象模型

- location 对象
  - location.href --返回或设置当前文档的 `URL`
  - location.search --返回 `URL` 中的查询字符串部分。例
    如: `http://www.dreamdu.com/dreamdu.php?id=5&name=nzc` 返回包括(?)后面的内容 `?id=5&name=nzc`
  - location.hash --返回 `URL#`包括(#)后面的内容，如果没有`#`，返回空
  - location.host --返回 `URL` 中的域名部分。例如: `www.baidu.com`
  - location.hostname --返回 `URL` 中的主域名部分。例如: `baidu.com`
  - location.pathname --返回 `URL` 的域名后的部分。例如: `http://www.baidu.com/xhtml/` 返回`/xhtml/`
  - location.port --返回 `URL` 中的端口部分。例如: `http://www.baidu.com:8080/xhtml/` 返回 `8080`
  - location.protocol --返回 `URL` 中的协议部分。例如: `http://www.baidu.com:8080/xhtml/` 返回(//)前面的内容 `http:`
  - location.assign --设置当前文档的 `URL`
  - location.replace() --设置当前文档的 `URL`，并且在 `history` 对象的地址列表中移除这个 `URL`。**location.replace(url)**
  - location.reload() -- 重载当前页面
- history 对象
  - history.go() -- 前进或后退指定的页面数 `history.go(num)`
  - history.back() -- 后退一页
  - history.forward() -- 前进一页
- navigator 对象
  - navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
  - navigator.cookieEnabled -- 返回浏览器是否支持(启用) `cookie`

### DOM

> `DOM`(文档对象模型)是针对于 `xml` 但是扩展用于 `HTML` 的应用程序编程接口，定义了访问和操作 `HTML` 的文档的标准。
> 代表文本节点， 代表文档节点等。

#### DOM 节点与元素的区别

**Node 的节点类型:**

- `Node.DOCUMENT_NODE` 文档节点
- `Node.ELEMENT_NODE` 元素节点
- `Node.TEXT_NODE` 文本节点
- `Node.COMMENT_NODE` 注释节点
  ......

- 元素是节点的子类型, 元素是特定类型的节点 `Node.ELEMENT_NODE`
- 节点的构造函数是 `Node`，`HTMLElement` 是 `JavaScript DOM` 中元素的构造函数。

[回到基础：什么是 DOM 及 DOM 操作？](https://juejin.cn/post/6844904023003234311)

## HTML5 Drag API

- dragstart: 当用户开始拖拽元素或选中的文本时触发，事件主体是`被拖拽元素`
- drag: 当拖拽元素或选中的文本时触发，事件主体是`被拖拽元素`
- dragenter: 当拖拽元素或选中的文本到一个可释放目标时触发，事件主体是`目标元素`
- dragover: 当元素或选中的文本被拖到一个可释放目标上时触发（每 100 毫秒触发一次），事件主体是`目标元素`
- dragleave: 当拖拽元素或选中的文本离开一个可释放目标时触发，事件主体是`目标元素`
- drop: 当元素或选中的文本在可释放目标上被释放时触发，事件主体是`目标元素`
- dragend: 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键），事件主体是`被拖拽元素`

## defer 和 async

### defer

异步加载，延迟执行；多个异步脚本顺序执行

### async

异步加载，加载完后立即执行；多个异步脚本不一定顺序执行

![图解](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/2/7/1616fd1a181ab854~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

[浅谈 script 标签的 defer 和 async](https://juejin.cn/post/6844903560879013896)

## meta 属性及作用

`meta` 标签用于描述网页的元信息，如网站作者、描述、关键词。`meta` 通过 `name=xxx` 和 `content=xxx` 的形式来定义信息，常用设置如下：

- charset：定义 `HTML` 文档的字符集

```html
<meta charset="UTF-8" />
```

- http-equiv：可用于模拟 `http` 请求头，可设置过期时间、缓存、刷新

```html
<meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT" /＞
```

- viewport：视口，用于控制页面宽高及缩放比例

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1"
/>
```

- http-equiv 属性的作用和参数

  - `expires`，指定过期时间
  - `pragma`，设置 `no-cache` 可以禁止缓存
  - `refresh`，定时刷新
  - `set-cookie`，可以设置 `cookie`
  - `X-UA-Compatible`，使用浏览器版本
  - `apple-mobile-web-app-status-bar-style`，针对 `WebApp` 全屏模式，隐藏状态栏/设置状态栏颜色

- viewport 参数及作用
  - `width/height`，宽高，默认宽度 `980px`
  - `initial-scale`，初始缩放比例，`1~10`
  - `maximum-scale/minimum-scale`，允许用户缩放的最大/小比例
  - `user-scalable`，用户是否可以缩放 (yes/no)

## 本地存储的四种方式

> 根据同源策略，`cookie` 是区分协议和端口的，但是对浏览器来说，`cookie` 只区分域，不区分端口和协议，所以在同一 `ip` 下的不同协议或多个端口的 `cookie` 是共享的

| **特性**       | **cookies**                                                                        | **localStorage**                                          | **sessionStorage**                                        | **indexedDB**            |
| -------------- | :--------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | ------------------------ |
| 数据的生命期   | 一般由服务器生成，可设置失效时间。如果在浏览器端生成的`cookie`，默认会话结束后失效 | 除非手动被清除，否则永久保存                              | 仅在当前会话下有效，关闭页面或浏览器后失效                | 永久保存                 |
| 存放数据的大小 | `4K`左右                                                                           | PC 一般 `5M`,移动端`2.5M`                                 | PC 一般`5M`,移动端`2.5M`                                  | 一般没有上限大小         |
| 与服务器通信   | 始终在同源的`http` 请求中携带，如果使用 `cookie`保存过多会带来性能问题             | 仅在浏览器中保存，不参与和服务器通信                      | 仅在浏览器中保存，不参与和服务器通信                      | 不参与                   |
| 易用性         | 原生的接口不太友好，需要封装下                                                     | 原生接口可以接受，再次封装对`Object`和`Array`有更好的支持 | 原生接口可以接受，再次封装对`Object`和`Array`有更好的支持 | 比较繁琐，异步，支持事务 |
| 同源策略       | 同源                                                                               | 同源                                                      | 同源                                                      | 同源                     |

共同点:

> 都是保存在浏览器端，并且是同源的

不同点:

- 与服务器通信:
  - `cookie` 数据始终在同源的 `http` 请求中携带
  - `webStorage` 不会在请求中携带，仅仅在本地存储
- 存储大小区别:
  - `cookie` 是最大长度`4K`
  - `webStorage`可以达到 `5M` 甚至更大
  - `indexedDB` 无限制
- 数据有效时间区别:
  - `sessionStorage` 仅仅是会话级别的存储，它只在当前浏览器关闭前有效，不能持久保持;
  - `localStorage` 始终有效，即使窗口或浏览器关闭也一直有效，除非用户手动删除才会失效;
  - `cookie` 只在设置的 `cookie` 过期时间之前一直有效，
  - `indexedDB` 持久存储；
- 作用域区别:
  - `sessionStorage` 不能在不同的浏览器窗口中共享，即使是同一个页面;
  - `localStorage`、`cookie`和`indexedDB` 在所有同源窗口都是共享的;
- `webStorage` 支持事件通知机制，可以将数据更新的通知发送给监听者。`api` 的接口使用更方便。
- `indexedDB` 支持事务

[深入了解浏览器存储：对比 Cookie、LocalStorage、sessionStorage 与 IndexedDB](https://juejin.cn/post/6844903814445662221#heading-19)

## web workers

> 因为 `js` 是单线程，如果存在大数据运算的时候会影响用户使用体验，出现卡顿的情况。
> 使用 `web workers` 可以开启一个线程，在运算的同时，不影响用户体验。

web workers 的几个使用场景可以参考下：

- 当大图片 `canvas`转 `base64` 的时候非常耗时，就可以使用 `wokers`
- 端对端加密的时候，要大量计算，可以使用 `workers`
- 拼写检查，检索的所有工作可以让 `workers` 来完成，不会阻塞 `UI`
- 在网络不稳定情况下,使用`indexDb api`的时候，可以交给`workers`，这样不会阻塞主线 `UI`

[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

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

## iframe

> `iframe` 元素会创建包含另一个文档的内联框架
>
> 提示: 可以将提示文字放在 `<iframe></iframe>`之间，来提示某些不支持 `iframe` 的浏览器

**缺点:**

- 会阻塞主页面的 `onload` 事件
- 搜索引擎无法解读这种页面，不利于 `SEO`
- `iframe` 和主页面共享连接池，而浏览器对相同区域有限制所以会影响性能

[iframe,我们来谈一谈](https://segmentfault.com/a/1190000004502619)

## WebSocket

**最大特点**：服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于[服务器推送技术](https://en.wikipedia.org/wiki/Push_technology)的一种

**特点：**

- 与 `HTTP` 协议有着良好的兼容性。默认端口也是 `80` 和 `443`，并且握手阶段采用 `HTTP` 协议，因此握手时不容易屏蔽，能通过各种 `HTTP` 代理服务器
- 数据格式比较轻量，性能开销小，通信高效
- 建立在 `TCP` 协议之上，服务器端的实现比较容易
- 可以发送文本，也可以发送二进制数据
- 没有同源限制，客户端可以与任意服务器通信
- 协议标识符是 `ws`（如果加密，则为 wss），服务器网址就是 `URL`

[WebSocket 教程](https://www.ruanyifeng.com/blog/2017/05/websocket.html)

## canvas vs SVG

### SVG 矢量图

- 不依赖分辨率【不失真】，放大缩小图像都很清晰
- 基于图形元素，矢量、`XML`、`CSS`、元素操作
- 适合大面积、小数量应用场景【如：富文本中去实现一些动画】

### Canvas 像素图（在元素特别多的情况 1000+）

- 性能高，可以自己控制绘制过程，还能使用 `WebGL`
- 基于像素，可控性高，像素级控制，只能脚本驱动
- 适合小面积、大数量应用场景【如：复杂丰富的数据可视化展示（图表）等】

[SVG 与 HTML5 的 canvas 各有什么优点，哪个更有前途？](https://www.zhihu.com/question/19690014)
