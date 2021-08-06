---
title: HTTP
order: 4
group:
  title: Interview Question
toc: 'menu'
nav:
  title: 面试题集锦
  order: 0
---

## HTTP

[HTTP 协议](http://47.98.159.95/my_blog/blogs/net/http/001.html#%E8%B5%B7%E5%A7%8B%E8%A1%8C)

[HTTP 协议内容相关](https://github.com/qianguyihao/Web/blob/master/15-%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/04-HTTP%E5%8D%8F%E8%AE%AE.md)

### Q1: http 常见状态码

[http 状态码](http://47.98.159.95/my_blog/blogs/net/http/004.html)

#### 301 和 302 的区别

- 301 Moved Permanently 被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 `URI` 之一。如果可能，拥有链接编辑功能的客户端应 当自动把请求的地址修改为从服务器反馈回来的地址。除非额外指定，否则这个响应也是可缓存的。
- 302 Found 请求的资源现在临时从不同的 `URI` 响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在 `Cache-Control` 或 `Expires` 中进行了指定的情况下，这个响应才是可缓存的。

> 字面上的区别就是 `301` 是永久重定向，而 `302` 是临时重定向。
> `301`比较常用的场景是使用域名跳转。`302` 用来做临时跳转 比如未登陆的用户访问用户 中心重定向到登录页面。

### Q2: http 与 https 的区别

- `http` 是一种广泛使用的网络协议，是一个客户端和服务器请求和应答的标准。
- `http` 工作在 `TCP` 协议的 `80` 端口，`https` 工作在 `TCP` 协议的 `443` 端口
- `http` 协议运行在 `TCP` 协议之上，所有的传输内容都是明文，`https` 运行在 `SSL/TLS` 之上，`SSL/TLS` 运行在`TCP` 之上，所有的传输内容都是经过加密的。
- `https` 是以安全为目标的 `http` 通道，是 `http` 的安全版; 是 `http` 加上 `SSL` 层对传输的信息和 `url` 做了一些加密处理，更加安全。

[详细解析 HTTP 与 HTTPS 的区别](https://juejin.cn/post/6844903471565504526)

### Q3: 谈谈 https 的原理？为什么 https 能保证安全？

[谈谈 HTTPS](https://juejin.cn/post/6844903504046211079)

### Q4: 讲讲 http 的缓存机制吧，强缓存，协商缓存？

#### 强缓存

> **强缓存**: 不会向服务器发送请求，直接从缓存中读取资源

1. **Expires**
2. **Cache-Control**

**二者的区别:**

- `Expires` 是 `http1.0` 的产物，`Cache-Control` 是 `http1.1` 的产物，两者同时存在的话，`Cache-Control` 优先级高于 `Expires`。
- 在某些不支持 `HTTP1.1` 的环境下，`Expires` 就会发挥用处。现阶段它的存在只是一种兼容性的写法。

#### 协商缓存

> **协商缓存**：在强制缓存失效（eg: Cache-Control: no-cache）后，浏览器携带`缓存标识`向服务器发起请求，由服务器根据缓存标识(对比最新缓存标识)决定是否使用缓存的过程

1. **Last-Modified** 和 **If-Modified-Since**
2. **ETag** 和 **If-None-Match**

**二者的区别:**

- 精确度，`ETag` 要优于 `Last-Modified`。
  - `Last-Modified` 的时间单位是秒，如果某个文件在 `1` 秒内改变了多次，那么他们的 `Last-Modified` 其实并没有体现出来修改，但是 `ETag` 每次都会改变确保了精度
  - 如果是负载均衡的服务器，各个服务器生成的 `Last-Modified` 也有可能不一致。
- 性能，`ETag` 要逊于 `Last-Modified`，毕竟 `Last-Modified` 只需要记录时间，而 `ETag` 需要服务器通过算法来计算出一个 `hash` 值。
- 优先级，服务器校验优先考虑 `ETag`。

[深入理解浏览器的缓存机制](https://www.jianshu.com/p/54cc04190252)

### Q5: SSL/TLS

#### RSA 算法

1. 浏览器发送 `client_random`（客户端生成的随机数）、`TLS` 版本、以及客户端支持的加密方法
2. 服务器确认 `TLS` 版本和双方使用的加密方法，并给出数字证书和 `server random`（服务器生成的随机数）
3. 浏览器确认数字证书有效，然后生成使用加密算法生产 `Premaster secret` (随机数)，并使用数字证书中的公钥加密发给服务器
4. 服务器使用私钥解密这个被加密的 `Premaster secret` (随机数)
5. 此刻浏览器和服务器都可以有 `client_random`、`server_random` 和 `Premaster secret` 三个随机数，通过这三个随机数计算最终的 `secret`

**图解：**
![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a28591c41cd64dfe8ceac856a9d40fa3~tplv-k3u1fbpfcp-watermark.image)

#### DH 算法

1. 浏览器发送 `client_random`（客户端生成的随机数）、`TLS` 版本、以及客户端支持的加密方法
2. 服务器确认 `TLS` 版本和双方使用的加密方法，并给出数字证书，同时服务器利用私钥将 `client_random`，`server_random`，`server_params` 签名, 然后将`签名`和 `server_params` 参数也发送给客户端
3. 浏览器确认数字证书和签名有效，并将 `client params` 参数发送给服务器
4. 此刻浏览器和服务器都可以有 `client_random`、`server_random` 和 `pre_random` ( `server_params` 和 `client_params`) 三个随机数，通过这三个随机数计算最终的 `secret` 。

**说明：**

> - **pre_random** 通过 `ECDHE` 算法计算出 `pre_random` ，其中传入两个参数 `server_params` 和 `client_params`。(`ECDHE`基于`椭圆曲线离散对数`，这两个参数也称作`椭圆曲线的公钥`)
> - **secret** 通过 `client_random`、`server_random` 和 `pre_random` 这个三个数通过一个伪随机数函数来计算出最终的`secret`

**图解：**
![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a6eee0152d64fa693667e9e40d96d0b~tplv-k3u1fbpfcp-watermark.image)

[TLS 详解握手流程](https://juejin.cn/post/6895624327896432654)

[图解 SSL/TLS 协议(阮)](http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html)

## TCP

[TCP 协议](http://47.98.159.95/my_blog/blogs/net/tcp/001.html)

[(建议收藏)TCP 协议灵魂之问，巩固你的网路底层基础](https://juejin.cn/post/6844904070889603085)

### Q1: TCP 和 UDP 的区别概述

> `TCP` 是一个面向连接的、可靠的、基于字节流的传输层协议。
> `UDP` 是一个面向无连接的传输层协议。

**TCP 三大核心特性:**

- **面向连接:** 通信之前，需要握手建立连接
- **可靠性:** 连接的可靠（有状态、可控制）
  - 有状态: `TCP` 会精准记录哪些数据发送了，被对方接收了和没有被接收到，而且保证数据包按序到达，不允许半点差错
  - 可控制: 当意识到丢包了或者网络环境不佳，`TCP` 会根据具体情况调整自己的行为，控制自己的发送速度或者重发
- **面向字节流:** `TCP` 为了维护状态，将一个个 `IP` 包变成了字节流。而 `UDP` 的数据传输是基于数据报的，这是因为仅仅只是继承了 `IP` 层的特性

[TCP 和 UDP 的区别概述](http://47.98.159.95/my_blog/blogs/net/tcp/001.html)

### Q2: 三次握手

> 目的: 确认双方的`接收能力`和`发送能力`都正常

- 第一次握手：客户端向服务端发送连接请求（向服务器发送连接请求）
- 第二次握手：服务器向客户端发送连接请求，并告诉客户端我已经收到了你的连接请求
- 第三次握手：客户端收到服务器连接请求后，告诉服务器我已经收到了你的连接请求, 信息到达服务器后, 二者建立连接

两次握手情况:

> - 客户端发送连接请求, 但因连接请求报文丢失而未收到确认(可能是网络结点长时间滞留了), 客户端再重传一次连接请求
> - 服务器收到第二次的连接请求后向客服端发送确认信息, 同意建立连接
> - 第一次滞留的客户端请求连接可能在双方断开连接后某个时间段到达服务器, 由于是两次握手, 服务端只要接收到, 然后发送相应的数据
>   包，就默认建立连接，但是现在客户端已经断开了

### Q3: 四次挥手

- 第一次挥手: 客户端向服务端断开连接请求
- 第二次挥手: 服务端接收后告诉客户端已收到, 客户端接收到了服务端的确认
- 第三次挥手: 服务器向客户端发送断开连接请求 (必须等到服务端所有的报文都发送完毕了, 才告诉客户端我要断开连接)
- 第四次挥手: 客户端接收服务端断开连接消息后发送确认消息给服务端，服务端断开连接

> 客户端需要等待 2 个`MSL`(`Maximum Segment Lifetime`，报文最大生存时间)时间,
> 没有收到服务端的重发请求，表示确认消息已送达, 挥手结束; 否则, 客服端重新向服务端发送确认收到消息

#### 等待 2MSL 的意义

> 如果不等待，客户端直接跑路，当服务端还有很多数据包要给客户端发（回到第三次挥手，服务端的重发断开连接请求）

- `1 个 MSL` 确保四次挥手中主动关闭方最后的 `ACK`(响应) 报文最终能达到对端
- `1 个 MSL` 确保对端没有收到 `ACK`(响应) (结束连线) 报文可以到达

**报文标识字段：**

1. SYN：同步连接序号，`TCP SYN` 报文就是把这个标志设置为 `1`，来请求建立连接；
2. ACK：请求/应答状态。`0` 为请求，`1` 为应答；
3. FIN：结束连线。如果 `FIN` 为 `0` 是结束连线请求，FIN 为 1 表示结束连线；
4. RST：连线复位，首先断开连接，然后重建；
5. PSH：通知协议栈尽快把 `TCP` 数据提交给上层程序处理。
