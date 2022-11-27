---
title: 性能优化
order: 9
# toc: 'menu'
nav:
  title: 知识集锦
  order: 0
---

## web 各个阶段的性能优化

[React 16 加载性能优化指南](https://mp.weixin.qq.com/s/XSvhOF_N0VbuOKStwi0IYw)

## 网页基本性能优化

- 减少 `HTTP` 请求
- 使用内容发布网络(CDN)
- 添加本地缓存
- 压缩资源文件
- 将 `CSS` 样式表放在顶部，把 `javascript` 放在底部(浏览器的运行机制决定) 避免使用 `CSS` 表达式
- 减少 `DNS` 查询
- 使用外部 `javascript` 和 `CSS`
- 避免重定向
- 图片懒加载 `lazyLoad` [链接](https://q.shanyue.tech/fe/html/1.html)

[聊一聊前端性能优化](https://juejin.cn/post/6911472693405548557)

[写给中高级前端关于性能优化的 9 大策略和 6 大指标 | 网易四年实践](https://juejin.cn/post/6981673766178783262)

## 图片的预加载和懒加载

**预加载:**

- 提前加载图片，当用户需要查看时可直接从本地缓存中渲染

**懒加载:**

- 懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数

**两种技术的本质:**

- 两者的行为是相反的，一个是提前加载，一个是迟缓甚至不加载
- 懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力

**懒加载优化：**
监听列表向上滚动事件，只对**上一次最后进入可视窗口加载的图片**后的所有图片进行循环监听判断是否加载【去除对已加载的图片再循环处理】

[懒加载和预加载](https://juejin.cn/post/6844903614138286094)

### 实现图片懒加载

1. clientHeight、scrollTop 和 offsetTop

- clientHeight = CSS height + CSS padding - 水平滚动条高度 (如果存在)
- scrollTop = 滚动元素顶部距离容器顶部的高度【无法滚动元素 scrollTop 为 0】
- offsetTop = 元素顶部距离容器顶部的高度

给图片一个占位资源:

```html
<img src="default.jpg" data-src="http://www.xxx.com/target.jpg" />
```

监听 `scroll` 事件来判断图片是否到达视口:

```js
let img = document.getElementsByTagName('img');
let num = img.length;
let count = 0; //计数器，从第一张图片开始计

lazyload(); //首次加载别忘了显示图片

window.addEventListener('scroll', lazyload);

function lazyload() {
  let viewHeight = document.documentElement.clientHeight; //视口高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条卷去的高度
  for (let i = count; i < num; i++) {
    // 元素现在已经出现在视口中【图片距离滚动父元素顶部距离 < 滚动超出窗口高度 + 窗口高度】
    if (img[i].offsetTop < scrollHeight + viewHeight) {
      if (img[i].getAttribute('src') !== 'default.jpg') continue;
      img[i].src = img[i].getAttribute('data-src');
      count++;
    }
  }
}
```

对 scroll 事件做节流处理，以免频繁触发:

```js
// throttle函数我们上节已经实现
window.addEventListener('scroll', throttle(lazyload, 200));
```

2. getBoundingClientRect

`DOM` 元素的 [getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) API; 获取元素相对于**视口**的位置

```js
function lazyload() {
  for (let i = count; i < num; i++) {
    // 元素现在已经出现在视口中
    if (
      img[i].getBoundingClientRect().top < document.documentElement.clientHeight
    ) {
      if (img[i].getAttribute('src') !== 'default.jpg') continue;
      img[i].src = img[i].getAttribute('data-src');
      count++;
    }
  }
}
```

3. IntersectionObserver

浏览器内置的 API [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)，实现了监听 `window` 的 `scroll` 事件、判断是否在视口中以及节流三大功能；`IntersectionObserver` 也可以用作其他资源的预加载

```js
let img = document.getElementsByTagName('img');

const observer = new IntersectionObserver(changes => {
  //changes 是被观察的元素集合
  for (let i = 0, len = changes.length; i < len; i++) {
    let change = changes[i];
    // 通过这个属性判断是否在视口中
    if (change.isIntersecting) {
      const imgElement = change.target;
      imgElement.src = imgElement.getAttribute('data-src');
      observer.unobserve(imgElement);
    }
  }
});

Array.from(img).forEach(item => observer.observe(item));
```
