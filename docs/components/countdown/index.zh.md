---
title: Countdown 倒计时
order: 3
nav:
  title: 组件
  order: 2
---

## Countdown 倒计时

时钟展示，时间倒计时，验证码倒计时

## 设计思路与实现

- 基本思路
  - 倒计时初始时设置一次展示的时间 `value` 值，后面在 setInterval 内部间隔指定时间后再次设置展示时间的 `value` 值
- 类型划分
  - 正常展示时钟类型
    - 正常展示相应时间格式
  - 倒计时类型
    - 内部处理按精确单位(如展示到分或秒)展示相应时间格式
    - 内部通过截止时间与当前时间获取总的时间秒数差后获取相应的其它单位差值用于展示
  - 倒计时验证码类型
    - 根据传入的倒计时总时间值在定时器中进行减值操作即可
    - 内部设置 `flag` 标志值用来控制倒计时过程中展示文本
- 格式自定义
  - 内部处理时间返回时，可以返回函数用来处理展示的时间格式及样式布局，函数参数将内部的时间传递出来
