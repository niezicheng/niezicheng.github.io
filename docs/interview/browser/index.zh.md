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

## Q1: 浏览器从输入 url 到渲染页面，发生了什么？

大致分为一下几步进行:

- `DNS` 解析：把域名解析成 `IP` 地址
- `TCP` 建立连接：`TCP`三次握手
- 发送 `HTTP`请求
- 服务器处理并响应报文
- 浏览器解析并渲染页面
- 断开连接：`TCP`结束连接

[简单谈谈浏览器从输入URL到页面渲染的过程](https://juejin.cn/post/6844903878895337485#heading-7)

[细说浏览器输入URL后发生了什么](https://juejin.cn/post/6844904054074654728)

## Q2: 如何在不同的端口间共享 cookie

> 根据同源策略，`cookie` 是区分端口的，但是对浏览器来说，`cookie` 是区分区域的，所以在同一 `ip` 下的多个端口的`cookie` 是共享的

## Q2: JS 实现跨域

> 跨域是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对 `JavaScript` 实施的安全限制，那么只要协议、域名、端口有任何一个不同，都被当作是不同的域
>
> 跨域原理，即是通过各种方式，避开浏览器的安全限制

- 通过 `jsonp` 跨域
- `document.domain + iframe` 跨域
- `location.hash + iframe`
- `window.name + iframe`跨域
- `postMessage` 跨域
- `WebSocket`协议跨域
- 跨域资源共享（CORS）
- `nginx` 代理跨域
- `nodejs` 中间件代理跨域

[前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)

[九种跨域方式实现原理（完整版）](https://juejin.cn/post/6844903767226351623)

## Q3: 本地存储的四种方式：cookie，localStorage, sessionStorage, indexDB之间的区别

[深入了解浏览器存储：对比Cookie、LocalStorage、sessionStorage与IndexedDB](https://juejin.cn/post/6844903814445662221#heading-19)

| **特性**       | **cookies**                                                     | **localStorage**                                          | **sessionStorage**                                       | **indexedDB**                |
| -------------- | :----------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ------------------------ |
| 数据的生命期   | 一般有服务器生成，可设置失效时间。如果在浏览器端生成的`cookie`，默认关闭浏览器后失效 | 除非手动被清除，否则永久保存                        | 仅在当前会话下有效，关闭页面或浏览器后失效            | 永久保存                 |
| 存放数据的大小 | `4K`左右                                                     | PC一般 `5M`,移动端`2.5M`                           | PC一般`5M`,移动端`2.5M                                | 一般没有上限大小         |
| 与服务器通信   | 始终在同源的`http` 请求中携带，如果使用 `cookie`保存过多会带来性能问题 | 仅在浏览器中保存，不参与和服务器通信                  | 仅在浏览器中保存，不参与和服务器通信                  | 不参与                   |
| 易用性         | 原生的接口不太友好，需要封装下                               | 原生接口可以接受，再次封装对`Object`和`Array`有更好的支持 | 原生接口可以接受，再次封装对`Object`和`Array`有更好的支持 | 比较繁琐，异步，支持事务 |
| 同源策略       | 同源                                                         | 同源                                                  | 同源                                                  | 同源                     |

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

## Q4: 讲讲你对 cookie 的理解？包括 SameSite 属性

[预测最近面试会考 Cookie 的 SameSite 属性](https://juejin.cn/post/6844904095711494151)

## Q5: offset/scroll/client

- [offset/scroll/client 各类属性详解](https://juejin.cn/post/6940808773564891166#heading-2)
- [client offset clientX offsetX screenX pageX scroll 区别](https://juejin.cn/post/6920410669904822279)

## Q6: fetch 发送 2 次请求的原因

`fetch` 发送 `post` 请求的时候，总是发送 `2` 次，第一次状态码是 `204`，第二次才成功?
> 原因很简单，因为你用 `fetch` 的 `post` 请求的时候，导致 `fetch` 第一次发送了一个 `Options` 请求，询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送真正的请求

## Q7: GET 和 POST 的区别

- `get` 参数通过 `url` 传递，`post` 放在 `request body`中。
- `get` 请求在 `url` 中传递的参数是有长度限制的，而 `post` 没有。
- `get` 比 `post` 更不安全，因为参数直接暴露在 `url` 中，所以不能用来传递敏感信息。
- `get` 请求只能进行 `url` 编码，而 `post` 支持多种编码方式
- `get` 请求会浏览器主动 `cache`，而 `post` 支持多种编码方式。
- `get` 请求参数会被完整保留在浏览历史记录里，而 `post` 中的参数不会被保留。
- `GET` 和 `POST` 本质上就是 `TCP` 链接，并无差别。但是由于 `HTTP` 的规定和浏览器/服务器 的限制，导致他们在应用过程中体现出一些不同。
- `GET` 产生一个 `TCP` 数据包; `POST` 产生两个 `TCP` 数据包。

### get 请求传参长度的误区

> `get` 请求参数的大小存在限制，而 `post` 请求的参数大小是无限制的

为了明确这个概念，我们必须了解下面几点:

- `HTTP` 协议未规定 `GET` 和 `POST` 的长度限制
- `GET` 的最大长度显示是因为浏览器和 `web` 服务器限制了 `URI` 的长度
- 不同的浏览器和 `WEB` 服务器，限制的最大长度不一样
- 要支持 `IE`，则最大长度为 `2083` byte，若只支持 `Chrome`，则最大长度 `8182` byte
