---
title: BROWSER
order: 5
group:
  title: Interview Question
toc: 'menu'
nav:
  title: 知识了解
  order: 0
---

## Q1: 浏览器从输入url到渲染页面，发生了什么？

[细说浏览器输入URL后发生了什么](https://juejin.cn/post/6844904054074654728)

>输入 `url` 后，首先需要找到这个 `url` 域名的服务器 `ip`,为了寻找这个 `ip`，浏览器首先会寻 找缓存，查看缓存中是否有记录，缓存的查找记录为:浏览器缓存-》系统缓存-》路由 器缓存，缓存中没有则查找系统的 `hosts` 文件中是否有记录，如果没有则查询 `DNS` 服务 器，得到服务器的 `ip` 地址后，浏览器根据这个 `ip` 以及相应的端口号，构造一个 `http` 请求，这个请求报文会包括这次请求的信息，主要是请求方法，请求说明和请求附带的数 据，并将这个 `http` 请求封装在一个 `tcp`包中，这个 `tcp` 包会依次经过传输层，网络层， 数据链路层，物理层到达服务器，服务器解析这个请求来作出响应，返回相应的 `html` 给浏览器，因为 `html` 是一个树形结构，浏览器根据这个 `html` 来构建 `DOM` 树，在 `dom` 树的构建过程中如果遇到 `JS` 脚本和外部 `JS` 连接，则会停止构建 `DOM` 树来执行和下载相应的代码，这会造成阻塞，这就是为什么推荐 `JS` 代码应该放在 `html` 代码的后面，之后根据外部央视，内部央视，内联样式构建一个 `CSS` 对象模型树 `CSSOM` 树，构建完成 后和 `DOM` 树合并为渲染树，这里主要做的是排除非视觉节点，比如 `script`，`meta` 标签和 排除 `display` 为 `none` 的节点，之后进行布局，布局主要是确定各个元素的位置和尺寸，之后是渲染页面，因为 `html` 文件中会含有图片，视频，音频等资源，在解析 `DOM` 的过 程中，遇到这些都会进行并行下载，浏览器对每个域的并行下载数量有一定的限制，一 般是 `4-6` 个，当然在这些所有的请求中我们还需要关注的就是缓存，缓存一般通过 `Cache-Control`、`Last-Modify`、`Expires` 等首部字段控制。 `Cache-Control` 和 `Expires` 的区别 在于 `Cache-Control` 使用相对时间，`Expires` 使用的是基于服务器 端的绝对时间，因为存 在时差问题，一般采用 `Cache-Control`，在请求这些有设置了缓存的数据时，会先 查看 是否过期，如果没有过期则直接使用本地缓存，过期则请求并在服务器校验文件是否修 改，如果上一次 响应设置了 `ETag` 值会在这次请求的时候作为 `If-None-Match` 的值交给 服务器校验，如果一致，继续校验 `Last-Modified`，没有设置 `ETag` 则直接验证 `Last-Modified`，再决定是否返回 `304`。

### 浏览器在生成页面的时候，会生成那两颗树?

> 构造两棵树，`DOM` 树和 `CSSOM` 规则树，当浏览器接收到服务器相应来的 `HTML` 文档后，会遍历文档节点，生成 `DOM`树， `CSSOM` 规则树由浏览器解析 `CSS` 文件生成。

## Q2: 如何在不同的端口间共享 cookie

> 根据同源策略，cookie是区分端口的，但是对浏览器来说，cookie是区分区域的，所以在同一ip下的多个端口的cookie是共享的

## Q3: 本地存储的四种方式：cookie，localStorage, sessionStorage, indexDB之间的区别

> 共同点: 都是保存在浏览器端，并且是同源的

## Q4: 讲讲你对cookie的理解？包括SameSite属性

[预测最近面试会考 Cookie 的 SameSite 属性](https://juejin.cn/post/6844904095711494151)

## Q5: offset/scroll/client

- [offset/scroll/client 各类属性详解](https://juejin.cn/post/6940808773564891166#heading-2)
- [client offset clientX offsetX screenX pageX scroll 区别](https://juejin.cn/post/6920410669904822279)

## Q6: fetch 发送 2 次请求的原因

fetch 发送 post 请求的时候，总是发送 2 次，第一次状态码是 204，第二次才成功? 原因很简单，因为你用 fetch 的 post 请求的时候，导致 fetch 第一次发送了一个 Options 请求，询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送真正的请求

## Q7: GET 和 POST 的区别

- get 参数通过 url 传递，post 放在 request body 中。
- get 请求在 url 中传递的参数是有长度限制的，而 post 没有。
- get 比 post 更不安全，因为参数直接暴露在 url 中，所以不能用来传递敏感信息。
- get 请求只能进行 url 编码，而 post 支持多种编码方式
- get 请求会浏览器主动 cache，而 post 支持多种编码方式。
- get 请求参数会被完整保留在浏览历史记录里，而 post 中的参数不会被保留。
- GET 和 POST 本质上就是 TCP 链接，并无差别。但是由于 HTTP 的规定和浏览器/服务器 的限制，导致他们在应用过程中体现出一些不同。
- GET 产生一个 TCP 数据包;POST 产生两个 TCP 数据包。
