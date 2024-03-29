---
title: Browser
order: 4
toc: 'menu'
nav:
  title: 知识集锦
  order: 0
---

## 浏览器从输入 url 到渲染页面，发生了什么？

**DNS 的域名查找：**
从浏览器缓存中查找 -> 本地的 `hosts` 文件查找 -> 找本地 `DNS` 解析器缓存查找 -> 本地 `DNS` 服务器查找

大致分为一下几步进行:

- `DNS` 解析：把域名解析成 `IP` 地址
- `TCP` 建立连接：`TCP`三次握手
- 发送 `HTTP`请求
- 服务器处理并响应报文
- 浏览器解析并渲染页面
  - 构建 `DOM` 树
  - 构建 `CSSOM`
  - 计算元素位置信息，构建布局树
  - 渲染引擎为特定的节点生成专用的图层，构建图层树
  - 合成线程会按照视口附近的图块来优先生成位图【可视区域内容】
  - 合成线程发送绘制图块命令给浏览器进程进行渲染
- `TCP` 断开连接：`TCP`四次挥手

[必须明白的浏览器渲染机制](https://juejin.cn/post/6844903846834094094)

[简单谈谈浏览器从输入 URL 到页面渲染的过程](https://juejin.cn/post/6844903878895337485#heading-7)

[细说浏览器输入 URL 后发生了什么](https://juejin.cn/post/6844904054074654728)

## 浏览器的缓存机制（强缓存，协商缓存）

### 强缓存

> **强缓存**: 不会向服务器发送请求，直接从缓存中读取资源

1. **Expires**

缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点, **Expires = max-age + 请求时间**，需要和`Last-modified` 结合使用

2. **Cache-Control**

`Cache-Control` 可以在请求头或者响应头中设置，并且可以组合使用多种指令

**二者的区别:**

- `Expires` 是 `http1.0` 的产物，`Cache-Control` 是 `http1.1` 的产物，两者同时存在的话，`Cache-Control` 优先级高于 `Expires`。
- 在某些不支持 `HTTP1.1` 的环境下，`Expires` 就会发挥用处。现阶段它的存在只是一种兼容性的写法。

![强缓存](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e2572dfb1ee4923a0d3e183c63380b2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 协商缓存

**协商缓存**：在强制缓存失效（eg: Cache-Control: no-cache）后，浏览器携带`缓存标识`向服务器发起请求，由服务器根据 `缓存标识` (对比最新缓存标识)决定是否使用缓存的过程

**Last-Modified** 和 **If-Modified-Since**

浏览器请求，服务器返回`Last-Modified` 这个 `header`，浏览器下一次请求这个资源，浏览器检测到有 `Last-Modified` 这个 `header`，于是添加 `If-Modified-Since` 这个`header`, 值就是 `Last-Modified` 中的值, 服务器通过 `If-Modified-Since` 中的值与服务器中这个资源的最后修改时间对比, 判断是否返回新的资源文件。

**Last-Modified 存在的一些弊端：**

- 如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 `Last-Modified` 被修改，服务端不能命中缓存导致发送相同的资源
- 因为 `Last-Modified` 只能以`秒`计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源

**ETag** 和 **If-None-Match**

`Etag` 是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，`Etag` 就会重新生成。浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的 `Etag` 值放到 `request header` 里的 `If-None-Match` 里，服务器只需要比较客户端传来的 `If-None-Match` 跟自己服务器上该资源的 `ETag` 是否一致，就能很好地判断资源相对客户端而言是否被修改过了。

**二者的区别:**

- 精确度，`ETag` 要优于 `Last-Modified`。
  - `Last-Modified` 的时间单位是秒，如果某个文件在 `1` 秒内改变了多次，那么他们的 `Last-Modified` 其实并没有体现出来修改，但是 `ETag` 每次都会改变确保了精度
  - 如果是负载均衡的服务器，各个服务器生成的 `Last-Modified` 也有可能不一致。
- 性能，`ETag` 要逊于 `Last-Modified`，毕竟 `Last-Modified` 只需要记录时间，而 `ETag` 需要服务器通过算法来计算出一个 `hash` 值。
- 优先级，服务器校验优先考虑 `ETag`。

![协商缓存](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc66368a78e947058b8d816f92b00607~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

[实践这一次,彻底搞懂浏览器缓存机制](https://juejin.cn/post/6844903764566999054)

[深入理解浏览器的缓存机制](https://www.jianshu.com/p/54cc04190252)

## cookie 的理解（包括 SameSite 属性）

> Name 和 value、Domain、Expires/Max-Age、HttpOnly、Secure、SameSite、Path

> `SameSite` 属性可以让 `Cookie` 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。

**SameSite 可以有下面三种值：**

1. `Strict` 仅允许一方请求携带 `Cookie`，即浏览器将只发送相同站点请求的 `Cookie`，即当前网页 `URL` 与请求目标 `URL` 完全一致。
2. `Lax` 允许部分第三方请求携带 `Cookie`
3. `None` 无论是否跨站都会发送 `Cookie`

**说明：**

> 之前默认是 `None` 的，`Chrome80` 后默认是 `Lax`

[Cookie 属性详解](https://juejin.cn/post/6863377752939036679)

[预测最近面试会考 Cookie 的 SameSite 属性](https://juejin.cn/post/6844904095711494151)

## 跨域

> 跨域是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对 `JavaScript` 实施的安全限制，那么只要`协议`、`域名`、`端口`有任何一个不同，都被当作是不同的域
>
> 跨域原理，即是通过各种方式，避开浏览器的安全限制

- `jsonp` 跨域 【`callback` 方法】
- `cors` 跨域资源共享（CORS）【后端设置允许源头部信息 `Access-Control-Allow-Origin`】
- `postMessage` 跨域 【允许跨域操作的 `window` 属性方法】
- `nginx` 代理跨域 【同源策略对服务器不加限制，反向代理】
- `nodejs` 中间件代理跨域 【同源策略对服务器不加限制，反向代理】
- `WebSocket`协议跨域 【允许跨域】
- `document.domain + iframe` 跨域 【主域相同，子域不同的跨域】
- `location.hash + iframe` 跨域 【`iframe` 的 `location.hash` 可以在不同域**单向**通信】
- `window.name + iframe`跨域 【`name` 属性可跨域存在，大小可达 2M】

**跨域请求发出去了吗？**
跨域请求发送出去了，服务器也会响应，但是浏览器做了相应的拦截，不会接受响应数据

**说明：**

1. `CORS` 支持所有类型的 `HTTP` 请求，是跨域 `HTTP` 请求的根本解决方案
2. `JSONP` 只支持 `GET` 请求，`JSONP` 的优势在于支持老式浏览器，以及可以向不支持 `CORS` 的网站请求数据。
3. 不管是 `Node` 中间件代理还是 `nginx` 反向代理，主要是通过同源策略对服务器不加限制。
4. 日常工作中，用得比较多的跨域方案是 `cors` 和 `nginx` 反向代理

[前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)

[九种跨域方式实现原理（完整版）](https://juejin.cn/post/6844903767226351623)

## 前端安全知识(XSS、 CSRF)

### XSS（Cross Site Scripting）- 跨域脚本攻击

**XSS 攻击方式：**

- 反射型

> 发出请求时，`XSS` 代码出现在 `url` 中，作为输入提交到服务器端，服务器端解析后未过滤就进行响应，`XSS` 代码随响应内容一起传回给浏览器，最后浏览器解析执行 `XSS` 代码。这个过程像一次反射，所以叫反射型 `XSS`。

- 存储型

> 存储型 `XSS` 和反射型 `XSS` 的差别在于:
> 提交的代码会存储在服务器端（数据库、内存、文件系统等），下次请求目标页面时不用再提交 `XSS` 代码。

- DOM 型

> `DOM` 型 `XSS` 攻击，实际上就是前端 `JS` 代码不够严谨，把不可信的内容插入到了页面

#### XSS 的防范措施

- 进行一系列[编码处理](https://www.jianshu.com/p/599fcd03fd3b)，使注入的脚本代码以编码后的格式输出而不会执行。
- 内容安全策略（Content Security Policy）,严格的 `CSP` 在 `XSS` 的防范中起以下作用
  - 禁止加载外域代码，防止复杂的攻击逻辑。
  - 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域。
  - 禁止内联脚本执行（规则较严格，目前发现 GitHub 使用）。
  - 禁止未授权的脚本执行（新特性，Google Map 移动版在使用）。
  - 合理使用上报可以及时发现 `XSS`，利于尽快修复问题。
- 输入内容长度控制【不可有效的避免】
- 输入内容限制
- 其他安全措施
  - `HTTP-only: true`: 禁止 `JS` 读取某些敏感 `Cookie`(document.cookie)，攻击者完成 `XSS` 注入后也无法窃取此 `Cookie`。
  - 验证码：防止脚本冒充用户提交危险操作。

[前端安全系列（一）：如何防止 XSS 攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)

### CSRF（Cross-site request forgery）- 跨站请求伪造

**要完成一次 `CSRF` 攻击, 须满足以下两点:**

- 用户登录信任网站 `A`, 并在本地生成 `Cookie`。
- 不登出信任网站 `A` 情况下访问另一网站 `B`。（利用网站 A 的漏洞将 B 嵌入进去）

#### CSRF 的防范措施

- `Token` 验证
- `Referer` 验证【判断请求的来源是否是安全的】(该方法并不安全，`Referer` 本身是可以被更改)
- `Cookie Samesite` 属性
- 添加验证码

[前端安全系列（二）：如何防止 CSRF 攻击？](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)

### CSRF 和 XSS 的区别

- `CSRF` 需要用户先登录网站 `A`，获取 `cookie`; `XSS` 不需要登录
- `CSRF` 是利用网站 `A` 本身的漏洞，去请求网站 `A` 的 `api`; `XSS` 是向网站 `A` 注入 `JS` 代码，然后执行 `JS` 里的代码，篡改网站 `A` 的内容

[前端如何给 JavaScript 加密（不是混淆）？](https://www.zhihu.com/question/47047191)

[前端也需要了解的 JSONP 安全](https://juejin.cn/post/6844903660678299661)

[寒冬求职之你必须要懂的 Web 安全](https://juejin.cn/post/6844903842635579405)

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

[深入了解浏览器存储：对比 Cookie、LocalStorage、sessionStorage 与 IndexedDB](https://segmentfault.com/a/1190000018748168)

## SPA and MPA

**SPA 和 MPA 之间的比较：**
| | 多页面应用模式 MPA | 单页面应用模式 SPA |
| ------------------------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| **应用构成** | 由多个完整页面构成 | 一个页面容器和多个页面片段构成 |
| **跳转方式** | 页面之间的跳转是从一个页面到另一个页面 | 一个页面片段删除或隐藏，加载另一个页面片段并显示，片段间的模拟跳转。 |
| **跳转后公共资源是否重新加载** | 是 | 否 |
| **URL 模式** | `http://xxx/page1.html`和`http://xxx/page2.html` | `http://xxx/shell.html#page1`和`http://xxx/shell.html#page2` |
| **优/缺点** | 返回 HTML，首屏时间快，SEO 效果好，页面切换慢 | js 渲染，页面切换快，首屏时间稍慢，SEO 差 |
| **用户体验** | 页面间切换加载慢，不流畅，用户体验差，尤其在移动端 | 页面片段间切换快，用户体验好，包括移动设备 |
| **能否实现转场动画** | 否 | 容易实现（手机 APP 动效） |
| **页面间传递数据** | 依赖 `URL`、`cookie` 或者 `localstorage`，实现麻烦 | 页面传递数据容易（`Context` 或 `React` 中的父子组件通讯 `props` 对象） |
| **搜索引擎优化（SEO）** | 可以直接做 | 需要单独方案（SSR） |
| **特别适用的范围** | 需要对搜索引擎友好的网站 | 对体验要求高，特别是移动应用 |
| **开发难度** | 较低，框架选择容易 | 较高，需要专门的框架来降低这种模式的开发难度 |

[SPA（单页面应用）和 MPA（多页面应用）](https://www.jianshu.com/p/a02eb15d2d70)

## 浅谈 SSR

[浅谈服务端渲染(SSR)](https://www.jianshu.com/p/10b6074d772c)

[服务端渲染(SSR)](https://zhuanlan.zhihu.com/p/90746589)

[1w 字 | 从零开始的 React 服务端渲染](https://juejin.cn/post/6844904000387563533)

## Axios

### 示例

```ts
// import axios from "axios";
const axios = require('axios');

(async () => {
  // 方式一
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const data = await axios.get('', {
    cancelToken: source.token,
  });

  console.log('data--------', data);
})();

// source.cancel('Operation canceled by the user.'); // 取消请求

// 方式二
let cancel;

axios.get('', {
  cancelToken: new CancelToken(c => {
    cancel = c;
  }),
});

cancel(); // 取消请求
```

[Axios 如何取消重复请求](https://juejin.cn/post/6955610207036801031)

### 拦截器

```ts
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

// 移除拦截器 eject
let myInterceptor = axios.interceptors.request.use(function() {
  /*...*/
});
axios.interceptors.request.eject(myInterceptor);

// 为自定义 axios 实例添加拦截器
let instance = axios.create();
instance.interceptors.request.use(function() {
  /*...*/
});
```

**Q**：发现当前页面移除拦截器后，其他页面的拦截器也会同时移除

**A**：`vue` 中应该是单页面的原因，可以将 `axios` 的实例挂在到最外层的 `vue` 实例上

**需求**：某一页面不需要拦截器，其它页面还是需要的

**思路**：通过在拦截器内判断页面路由来进行内容拦截，而不是移除拦截器

## 实践

### URL 编码

```ts
// 编码
encodeURI('https://google.com/search?q=你好吗'); // https://google.com/search?q=%E4%BD%A0%E5%A5%BD%E5%90%97

// 解码
decodeURI('https://google.com/search?q=%E4%BD%A0%E5%A5%BD%E5%90%97');
// https://google.com/search?q=你好吗
```

**encodeURI VS encodeURIComponent:**

- encodeURI: 只对查询字符串即 `?` 后面的值进行编码
- encodeURIComponent: 对整个参数字符窜进行编码

### 解析 URL 查询字符窜

#### 用 URL 对象来解析

```ts
let urlStr = 'https://google.com/search?q=hello&name=leo';

let url = new URL(urlStr);

console.log(url.protocol); // "https:"
console.log(url.host); // "google.com"
console.log(url.pathname); // "/search"

console.log(url.search); // "?q=hello&name=leo"

url.search
  .slice(1)
  .split('&')
  .map(item => item.split('=')); // [['q', 'hello'], ['name', 'leo']]
```

#### URL searchParams 参数

**searchParams 方法:**

```ts
get(name); // 按照 name 获取参数
set(name, value); // set/replace 参数
delete name; // 按照 name 移除参数
has(name); // 按照 name 检查参数是否存在
append(name, value); // 按照 name 添加参数
getAll(name); // 获取相同 name 的所有参数（这是可行的，例如 ?name=Leo&name=Lucy）
```

```ts
let urlStr = 'https://google.com/search?q=hello&name=leo';
let url = new URL(urlStr);

url.searchParams.get('q'); // hello

// url.searchParams 为迭代器对象
for (let [key, value] of url.searchParams) {
  console.log(key, value);
}

// 数组方式
url.searchParams.forEach((v, k) => {
  console.log(k, v);
}); //注意这里的参数的key和value的顺序
```

[(1.6w 字)浏览器灵魂之问，请问你能接得住几个？](https://juejin.cn/post/6844904021308735502)
