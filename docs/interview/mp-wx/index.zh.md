---
title: MP 小程序
order: 11
# toc: 'menu'
nav:
  title: 面试题集锦
  order: 0
---

## 微信小程序

[前端小程序笔试面试题](https://juejin.cn/post/6844903966342381581)

## 为什么小程序没有 DOM 的增删改操作？

- `web` 开发渲染线程和脚本线程是互斥的，这也是为什么长时间的脚本运行可能会导致页面失去响应。开发者可以使用到各种浏览器暴露出来的 `DOM API`，进行 `DOM` 选中和操作。
- 小程序中二者是分开的，分别运行在不同的线程中，逻辑层运行在 `JSCore` 中，并没有一个完整浏览器对象，因而缺少相关的 `DOM API` 和 `BOM API`。

[从小程序不支持 DOM 操作开始深入分析小程序运行机制](https://juejin.cn/post/6844904152137482247)

## 生命周期

### APP 生命周期

- onLaunch 小程序初始化完成后触发
- onShow 初始化完成后展示时触发，以及从后台切回前台后触发
- onHide 从前台切回后台后触发

### Page 生命周期

- onLoad 监听页面加载
- onShow 监听页面显示(从后台切换回前台也会调用)
- onReady 监听页面初次渲染完成
- onHide 监听页面隐藏(从前台切换到后台也会调用, 如 wx.navigateTo 或底部 tab 切换到其他页面，小程序切入后台等)
- onUnload 监听页面卸载(如 wx.redirectTo 或 wx.navigateBack 到其他页面时)

![page](https://res.wx.qq.com/wxdoc/dist/assets/img/page-lifecycle.2e646c86.png)

### Component

- **created** 在组件实例刚刚被创建时执行，注意此时不能调用 `setData`
- **attached** 在组件实例进入页面节点树时执行
- ready 在组件布局完成后执行
- moved 在组件实例被移动到节点树另一个位置时执行
- **detached** 在组件实例被从页面节点树移除时执行

### 生命周期顺序

**进入某个页面：**

onHide(即将离开的页面) - cerated - attached - onLoad - onShow - ready - onReady

![coming page](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/30/16a6dc51e451d202~tplv-t2oaga2asx-watermark.awebp)

**离开某个页面：**

onUnload - detached - onShow(即将进入的页面)

![leave page](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/30/16a6dc8bb6e33965~tplv-t2oaga2asx-watermark.awebp)

**打开 APP：**

onLaunch - onShow - cerated - attached - onLoad - onShow - ready - onReady

![open app](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/30/16a6dc92b70169b5~tplv-t2oaga2asx-watermark.awebp)

[微信小程序生命周期与性能指标](https://juejin.cn/post/6844903833852706823)

## 页面路由

### 路由方式

| 路由方式   | 触发时机                                                                                                                                                                                                                                                  | 路由前页面 | 路由后页面         |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------ |
| 初始化     | 小程序打开的第一个页面                                                                                                                                                                                                                                    |            | onLoad, onShow     |
| 打开新页面 | 调用 API [wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html) 使用组件 [<navigator open-type="navigateTo"](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)                           | onHide     | onLoad, onShow     |
| 页面重定向 | 调用 API [wx.redirectTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html) 使用组件 [<navigator open-type="reditectTo"](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)                           | onUnload   | onLoad, onShow     |
| 页面返回   | 调用 API [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 使用组件[<navigator open-type="navigateBack"](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) 用户按左上角返回按钮 | onUnload   | onShow             |
| Tab 切换   | 调用 API [wx.switchTab](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html) 使用组件 [<navigator open-type="switchTab"](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) 用户切换 Tab                 |            | 各种情况请参考下表 |
| 重启动     | 调用 API [wx.reLaunch](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.reLaunch.html) 使用组件 [<navigator open-type="reLaunch"](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)                                 | onUnload   | onLoad, onShow     |

### 注意事项

- `navigateTo`, `redirectTo` 只能打开非 tabBar 页面。
- `switchTab` 只能打开 tabBar 页面。
- `reLaunch` 可以打开任意页面。
- 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
- 调用页面路由带的参数可以在目标页面的`onLoad`中获取。
