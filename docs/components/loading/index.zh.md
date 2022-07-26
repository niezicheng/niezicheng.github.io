---
title: Loading 加载
order: 7
nav:
  title: 组件
  order: 2
---

## Loading 加载

内容加载过程中展示的等待交互界面

## 设计思路与实现

> 主要是对于 `icon` 动画旋转的设计

### RN 动画实现

```tsx
const [rotate, setRotate] = useState(new Animated.Value(0)).current; // 旋转（动画）值初始值

// 循环动画
Animated.loop(
  Animated.sequence([
    Animated.timing(rotate, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }),
  ]),
).start();

// 动画 value 值映射
const rotateValue = rotate.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});

// 设置动画样式值
<Animated.View style={{ transform: [{ rotate: rotateValue }] }}>
  <Icon />
</Animated.View>;
```

### CSS 动画

```scss
// 添加动画
image {
  animation: rotateAnimated;
}

// 创建动画
@keyframes rotateAnimated {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
```

### 小程序动画

[Animation](https://developers.weixin.qq.com/miniprogram/dev/api/ui/animation/Animation.html)
