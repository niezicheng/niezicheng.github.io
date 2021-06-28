---
title: Progress 进度条
order: 16
nav:
  title: 组件
  order: 0
---

## Progress 进度条

表明某个任务的当前进度

## 设计思路

- 未填充的轨道
  - 获取未填充的轨道宽度 `wrapWidth`
- 填充的轨道
  - 根据百分比参数值 `percent` 设置宽度 `width: wrapWidth * (percent / 100)`

### 宽度添加动画

```tsx
// 初始动画值 0
const [animatedWidth] = useState(new Animated.Value(0));

// 依据动画参数更新动画
Animated.timing(animatedWidth, {
  // animatedWidth: 0 -> wrapWidth * (percent / 100)
  toValue: wrapWidth * (percent / 100),
  // 动画持续时间 ms
  duration: 1000,
  useNativeDriver: true,
  // 动画函数
  easing: Easing.linear,
  // 执行动画
}).start();

// 在动画元素上使用动画 value 值
<Animated.View style={{ width: animatedWidth }} />
```
