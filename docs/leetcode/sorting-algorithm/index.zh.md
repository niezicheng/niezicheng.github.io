---
title: 排序算法
order: 1
nav:
  title: LeetCode
  order: 4
---

## 直接插入排序（稳定）

主要思想：元素前已排序元素与当前元素依次进行比较，如果比当前元素大，则移动到下一位置

时间复杂度：O(N2)

```ts
const insertionSort = arr => {
  for (var i = 1; i < arr.length; i++) {
    var key = arr[i]; // 存储当前元素
    var j = i - 1;
    // 前面元素与当前元素一次比较，反序【前面元素 > 当前元素（升序）】元素后移一位
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    // 将当前元素插入不满足条件 j 位置后
    arr[j + 1] = key;
  }

  return arr;
};
```

## 希尔排序（不稳定）

算法提出：为解决插入排序每次只能将数据移动一位，在**数组较大且基本无序**的情况下性能出现的恶化所以引入此算法

主要思想：将待排序数组按照步长 `gap` 进行分组，然后将每组的元素利用直接插入排序的方法进行排序；每次将 `gap` 折半减小，循环上述操作；当 `gap = 1` 时，利用直接插入排序完成

时间复杂度：O(N\*logN)

代码实现：

```ts
```

## 简单选择排序

## 堆排序

## 冒泡排序

主要思想：当前元素与后面相邻未排序元素依次比较，如果反序则交换位置

时间复杂度：O(N2)

代码实现：

```ts
// 最初冒泡
const bubbleSort = arr => {
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      // 反序交换位置
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

// 改进版【记录每趟最终位置 pos，后面已有序元素下次不再比较】
const bubbleSort2 = arr => {
  let i = arr.length - 1;
  while (i > 0) {
    let pos = 0; // 每趟开始时, 无记录交换
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // 交换
        pos = j; // 记录交换位置
      }
    }
    i = pos; // 下趟循环到 pos 即停止【pos 后元素均为有序】
  }
  return arr;
};
```

## 快速排序

## 归并排序

## 基数排序

[十大经典排序算法基本思想和图解（冒泡、插入、选择、快速、希尔、堆、归并）](https://www.cxymm.net/article/qq_34801169/81459448)
