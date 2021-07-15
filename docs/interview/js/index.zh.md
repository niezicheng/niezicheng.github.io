---
title: JS
order: 3
group:
  title: Interview Question
toc: 'menu'
nav:
  title: 面试题集锦
  order: 0
---

## js 收集

[前端 js 收藏集锦](https://zhuanlan.zhihu.com/p/27198172)

[春招季如何横扫 Javascript 面试核心考点(基础版)？](https://juejin.cn/post/6844903809215365134)

## Q1: 事件冒泡和捕获及事件委托

> 事件委托是利用冒泡阶段的运行机制来实现的，就是把一个元素响应事件的函数委托到另一个元素，一般是把一组元素的事件委托到他的父元素上
>
> 委托的优点:
>
> - 减少内存消耗, 节约效率
> - 动态绑定事件

[DOM 事件了解](https://github.com/qianguyihao/Web/blob/master/14-%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/03-DOM%E4%BA%8B%E4%BB%B6%E7%9A%84%E6%80%BB%E7%BB%93.md)

[你真的理解事件冒泡和事件捕获吗？](https://juejin.cn/post/6844903834075021326)

## Q2: 浅拷贝和深拷贝的区别

[浅拷贝与深拷贝](https://juejin.cn/post/6844904197595332622)

## Q3: 说一下图片的预加载和懒加载

预加载:

- 提前加载图片，当用户需要查看时可直接从本地缓存中渲染
  懒加载:
- 懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数
  两种技术的本质:
- 两者的行为是相反的，一个是提前加载，一个是迟缓甚至不加载
- 懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力

[懒加载和预加载](https://juejin.cn/post/6844903614138286094)

## Q4: 什么是闭包, 闭包的作用？

> 闭包是指有权访问另外一个函数作用域中的变量的函数
>
> 闭包就是函数的局部变量集合，只是这些局部变量在函数返回后会继续存在
>
> 闭包就是函数的“堆栈”在函数返回后并不释放，我们也可以理解为这些函数堆栈并不在栈 上分配而是在堆上分配。当在一个函数内定义另外一个函数就会产生闭包。

作用:

匿名自执行函数:

- 我们知道所有的变量，如果不加上 `var` 关键字，则默认的会添加到全局对象的属性上去，这样的临时变量加入全局对象有很多坏处，比如:
  - 别的函数可能误 用这些变量;
  - 造成全局对象过于庞大，影响访问速度(因为变量的取值是需要从原型链 上遍历的)
- 除了每次使用变量都是用 var 关键字外，我们在实际情况下经常遇到这样一种情况，即有的函数只需要执行一次，其内部变量无需维护，可以用闭包。
  结果缓存:
  我们开发中会碰到很多情况，设想我们有一个处理过程很耗时的函数对象， 每次调用都会花费很长时间，那么我们就需要将计算出来的值存储起来，当调用这个函 数的时候，首先在缓存中查找，如果找不到，则进行计算，然后更新缓存并返回值，如果找到了，直接返回查找到的值即可。闭包正是可以做到这一点，因为它不会释放外部的引用，从而函数内部的值可以得以保留。

[JavaScript 深入之闭包](https://juejin.cn/post/6844903475998900237)

## Q5: js 中函数的 this 指向

[JavaScript 中的 this](https://juejin.cn/post/6844903488304971789)

[7 个关于 this 面试题，你能回答上来吗？](https://juejin.cn/post/6938400016067198989)

## Q6: 原型链

[JavaScript 深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)

### 对象创建的几种方式

- 工厂模式
  - 没有建立对象与类型间的关系，无法识别对象具体类型
  - 对象相同的方法存储在不同的内存空间（内存冗余）
- 构造函数模式
  - 优点：创建的对象与构造函数建立起了联系，可以通过原型来识别对象类型
  - 缺点：对象相同的方法存储在不同的内存空间（内存冗余）
- 原型模式
  - 优点：可以添加创建对象公用的属性和方法，解决了对象方法复用的问题
  - 缺点：无法通过传入参数初始化值，存在引用类型如 `Array` 所有实例均共享该属性数组对象（对象间的隔离性较差）
- 组合模式(构造函数 + 原型)
  - 优点：通过构造函数初始化属性，通过原型实现函数方法的复用
  - 缺点：使用了两种不同的模式，对代码的封装性不够好
- 动态原型模式
  - 将原型方法赋值和创建过程移动到构造函数内部，对属性对判断实现仅仅在第一次调用函数时候执行。
  - 很好对对组合模式进行来封装
- 寄生构造函数模式
  - 基于一个已有类型，在实例化时对实例对象进行扩展（达到既不修改原构造函数也达到扩展对象对目的）
  - 缺点：和工厂模式一样，无法实现对对象的识别，均为 `Object`

**动态原型模式示例：**

```ts
function isProperty(object, property) {
  // hasOwnProperty 判断自身时候有该属性， 判断属性是否在 object 原型（Person.Property）中存在
  return !object.hasOwnProperty(property) && property in object;
}

function Person(name, age) {
  // 初始时候运行, Person 原型中还没有 sayName 属性方法
  if (!isProperty(this, sayName)) {
    Person.Property = {
      constructor: Person,
      sayName: function() {
        console.log(this.name);
      },
    };

    return new Person(name, age);
  }

  this.name = name;
  this.age = age;
}

let p1 = new Person('ming', 19);
let p2 = new Person('chen', 18);

p1.sayName(); // ming
p2.sayName(); // chen
```

**解决对象相同方法的创建冗余问题：**

> 可以在全局范围中声明一个函数，然后将引用传递给对象中的函数属性。但是这样做会导致全局函数过多，体现不了对象的封装性

[创建对象和原型链](https://github.com/qianguyihao/Web/blob/master/14-%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/05-01.%E5%88%9B%E5%BB%BA%E5%AF%B9%E8%B1%A1%E5%92%8C%E5%8E%9F%E5%9E%8B%E9%93%BE.md)

### 继承的几种方式和优缺点？

- 原型链继承
  - 特点:基于原型链，既是父类的实例，也是子类的实例
  - 缺点:无法实现多继承
- 构造继承
  - 特点:可以实现多继承
  - 缺点:只能继承父类实例的属性和方法，不能继承原型上的属性和方法。
- 实例继承和拷贝继承
- 组合继承

[类的定义和继承的几种方式](https://github.com/qianguyihao/Web/blob/master/14-%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/05-02.%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%9A%E7%B1%BB%E7%9A%84%E5%AE%9A%E4%B9%89%E5%92%8C%E7%BB%A7%E6%89%BF%E7%9A%84%E5%87%A0%E7%A7%8D%E6%96%B9%E5%BC%8F.md)

## Q7: JS 垃圾回收机制

[V8 引擎垃圾内存回收原理解析](https://juejin.cn/post/6844903993420840967)

## Q8: 事件循环机制（Event Loop）

[最后一次搞懂 Event Loop](https://juejin.cn/post/6844903827611598862)

## ES6

[ECMAScript 6 入门(阮一峰)](https://es6.ruanyifeng.com/)

### 数据类型

- 基本数据类型

> 五大基本数据类型: `number`、`string`、`boolean`、`null`、`undefined`、`symbol`

- 引用数据类型
  - 对象 `Object`
  - 数组 `Array`
  - 函数 `Function`

### symbol 简单了解

[简单了解 ES6/ES2015 Symbol() 方法](https://juejin.cn/post/6844903591296106510)

### var、let、和 const 关键字

- `let`关键字 【声明变量】
  特性:

1. 块级作用域 【局部作用于声明的代码块中】
2. 变量声明不会提升 【变量未声明前无法使用该变量】
3. 暂时性死区 【该变量声明前面的区域】
4. 不能重复声明 【同一代码块中不能重复声明同一变量】

- `const` 关键字 【声明常量(一般用大写字母表示常量)】
  特性: 【在遵从 `let` 声明变量的特性上再添加如下两条特性】

1. 声明时初始化 【声明的同时必须赋值】
2. 值不可修改

### 箭头函数与普通函数的区别

- 箭头函数 `this 指向`声明上下文决定，普通函数 `this 指向`调用时上下文决定
- 箭头函数没有自己的 `arguments` 对象，但是可以访问外围函数的 `arguments` 对象
- 不能通过 `new` 关键字调用，同样也没有 `new.target` 值和原型

[箭头函数和普通函数的区别](https://www.jianshu.com/p/73cbeb6782a0)

### Map 和 Set 及其区别

> 均可以使用迭代器方法，`forEach` 方法循环遍历

#### Set 类数组结构

- 结构集合中的成员是唯一的，`key` 值与 `value` 值相同
- 可用于数组对象去重处理

```ts | pure
const a = { name: 'chen' };
const set = new Set([1, 'ming', 2, 4, 'ming', 4, 6, a]);

const arr = [...set]; // [1, 'ming', 2, 4, 6, { name: 'chen' }]

set.has('ming'); // true
set.has(4); // true
map.has(a); // true
```

#### Map 类对象结构

- 键值对的集合（`Hash` 结构，die dai qi)。 键的范围不仅局限于字符串，各种类型都可以

```ts | pure
const a = { name: 'ming' };
const map = new Map([
  [a, 'ming'],
  ['chen', 'chen'],
]);

map.get(a); // ming
map.get({ name: 'ming' }); // undefined
map.get('chen'); // chen
```

**WeakMap:**

`WeakMap` 与 `Map` 的区别有两点:

- `WeakMap` 只接受引用类型作为键名（`null` 除外），不接受其他类型的值作为键名。
- `WeakMap` 的键会在不再可用后，会被垃圾回收机制处理销毁。

**注意:**
`Weak Map` 的键才是弱引用，值不是。在 `Weak Map` 的值中存储对象会阻止垃圾回收，即使该对象的其他引用已全都被移除。

#### `Set(Map)` 与 `WeakSet(WeakMap)` 的区别

- WeakSet(WeakMap) 值(键) 需为引用类型
- WeakSet(WeakMap) 没有 `size` 属性并且迭代器对应方法，只有四个方法 get()、set()、has()、delete()
- WeakSet(WeakMap) 确保额外数据在不再可用后被垃圾回收机制回收，从而能优化内存使用并规避内存泄漏。

[Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)

[es6 Map 和 Set](https://segmentfault.com/a/1190000015960005)

#### 拓展

[如何实现 JS 真正意义上的弱引用？](https://www.infoq.cn/article/lksmb2tlgh1ehg0*bbyg)

[理解 Java 的强引用、软引用、弱引用和虚引用](https://juejin.cn/post/6844903665241686029)

### Promise/async/Generator

[9k 字 | Promise/async/Generator 实现原理解析](https://juejin.cn/post/6844904096525189128)

## 功能判断类型

### 数组去重

- `indexOf` 循环去重
- `ES6` `Set` 去重
  - Array.from(new Set(array))
- `Object` 键值对去重;
  - 把数组的值存成 `Object` 的 `key` 值，比如 `Object[value1] = true`， 在判断另一个值的时候，如果 `Object[value2]` 存在的话，就说明该值是重复的

[JS 数组去重!!!一篇不怎么靠谱的"深度"水文](https://juejin.cn/post/6844903477768896520)

### 数组扁平化

> 所有方法总体来说还是使用递归方法调用来实现的

1. 普通递归调用
2. `toString()` 方法
3. `[].concat.apply + some` 方式
4. `reduce` 方法
5. `concat() + ...(扩展运算符)`

```tsx | pure
// 将二维数组转化为一维数组
[].concat(...[1, 2, [3, 4]]); // [1, 2, 3, 4]
```

[JS 数组专题 1️⃣ 数组扁平化](https://juejin.cn/post/6844903651689889805)

### 判断数组的几种方法

- 通过原型链做判断

```js | pure
obj.__proto__ === Array.prototype;
```

- 通过 `instanceof` 做判断

```js | pure
obj instanceof Array;
```

- 通过 ES6 的 `Array.isArray()` 做判断

```js | pure
Array.isArray(obj);
```

- 通过 `Array.prototype.isPrototypeOf`

```js | pure
Array.prototype.isPrototypeOf(obj);
```

- 通过 `Object.prototype.toString.call()` 做判断

```js | pure
Object.prototype.toString.call(obj).slice(8, -1) === 'Array'; // "[object Array]"
```

- `typeof` 只能判断是 `object`, 可以判断一下是否拥有数组的方法

## 拓展

[80% 应聘者都不及格的 JS 面试题](https://juejin.cn/post/6844903470466629640#heading-3)
