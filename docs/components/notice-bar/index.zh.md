---
title: NoticeBar 通告栏
order: 9
nav:
  title: 组件
  order: 2
---

## NoticeBar 通告栏

在导航栏下方，一般用作系统提醒、活动提醒等通知

## 设计思路与实现

> 主要是如何实现动画循环过程

- 循环动画实现
  - 获取包裹容器 `ScrollView` 宽度 `scrollViewWidth`，并设置 `horizontal` 支持横向滚动
  - 获取展示文本容器 `Animated.Text` 宽度 `textWidth`
  - 将动画属性值 `animatedTransformX` 赋值给 `Animated.Text` 样式 `translateX` 属性
  - 添加循环动画操作（详细见下面说明）

### RN 动画实现

```tsx | pure
const animation =
  // 动画循环
  Animated.loop(
    // 动画执行队列
    Animated.sequence([
      Animated.timing(animatedTransformX, {
        // 从 0 -> -textWidth
        toValue: -textWidth,
        // 动画事件
        duration: (textWidth / 40) * 1000,
        useNativeDriver: true,
        // 动画执行函数
        easing: Easing.linear,
      }),
      Animated.timing(animatedTransformX, {
        toValue: scrollViewWidth,
        duration: 0,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(animatedTransformX, {
        toValue: 0,
        duration: (scrollViewWidth / 40) * 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]),
  );
// 动画开始
animation.start();
```

### 小程序动画实现(不同小程序系列 API 语法不一样)

- 将动画导出值 `animationData` 赋值给元素 `animation` 属性

```js | pure
/**
 * 动画初始化
 */
initAnimation() {
  wx.createSelectorQuery()
    .in(this)
    .select('.content-wrap')
    .boundingClientRect((wrapRect) => {
      wx.createSelectorQuery()
        .in(this)
        .select('.content')
        .boundingClientRect((rect) => {
          const duration = (rect.width / 40) * this.data.speed;
          // 创建动画对象
          const animation = wx.createAnimation({
            duration,
            timingFunction: 'linear',
          });
          this.setData(
            {
              wrapWidth: wrapRect.width, // 容器框度
              width: rect.width, // 内容宽度
              duration, // 动画延迟时间
              animation, // 动画对象
            },
            () => {
              this.startAnimation(); // 开始动画
            }
          );
        })
        .exec();
    })
    .exec();
},

/**
 * 开始动画
 */
startAnimation() {
  const { animation, wrapWidth, duration, width } = this.data;
  animation.option.transition.duration = duration;
  // step1: 0 -> -width
  const animationData = animation.translateX(-width).step();
  setTimeout(() => {
    this.setData({
      // 动画值导出执行
      animationData: animationData.export(),
    });
  }, 100);

  // after duration reset
  const timer = setTimeout(() => {
    if (animation.option.transition.duration !== 0) {
      // 设置动画执行时长为 0
      animation.option.transition.duration = 0;
      // step2: -width -> wrapWidth
      const resetAnimation = animation.translateX(wrapWidth).step();
      this.setData({
        animationData: resetAnimation.export(),
      });
    }

    // 动画循环调用
    this.startAnimation();
  }, duration);

  this.setData({
    timer,
  });
},

/**
 * 清除动画定时器
 */
destroyTimer() {
  const { timer } = this.data;
  if (timer) {
    clearTimeout(timer);
  }
}
```

**说明:**
不同小程序平台之前 Api 使用的差异, `target` 表示相应平台

- [target].createSelectorQuery()

返回值 `SelectorQuery` 中阿里系小程序不含 `in` 方法, 不用更改选择器选取的范围

> `SelectorQuery.in(component: Component)` 将选择器的选取范围更改为自定义组件 component 内。（初始时，选择器仅选取页面范围的节点，不会选取任何自定义组件中的节点）。

- [target].createAnimation(option: { duration })

返回值 `animation` 获取和更改 `option` 对象属性

> - 微信: animation.option.transition.duration
> - 阿里系: animation.config.duration
> - 字节: animation.option.duration

- [target].boundingClientRect([callback])

回调函数 `callback` 阿里系小程序中没有回调函数，回调函数在 `exec` 执行函数中调用。
