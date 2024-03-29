---
title: JavaScript
order: 3
toc: 'menu'
nav:
  title: 知识集锦
  order: 0
---

## DOM 事件流

### 事件委托

事件委托是利用冒泡阶段的运行机制来实现的，就是把一个元素响应事件的函数委托到另一个元素，一般是把一组元素的事件委托到他的父元素上

- event.currentTarget: 当前所绑定的事件对象。在事件委托中，指的是【父元素】
- event.target: 当前被点击的元素。在事件委托中，指的是【子元素】

**委托的优点:**

- 减少内存消耗, 节约效率
- 动态绑定事件

### 自定义事件

**基本使用:**

```ts
// 创建事件对象
const myEvent = new Event('click');

// 监听事件
element.addEventListener('click', function() {
  console.log('');
});

// 结合其他事件使用。【延迟 1s 注册元素 element 的点击事件】
setTimeout(function() {
  // 元素注册事件【注册事件后，元素的事件监听才有用】
  element.dispatchEvent(myEvent);
}, 1000);
```

[理解 DOM 事件流的三个阶段](https://segmentfault.com/a/1190000004463384)

[你真的理解事件冒泡和事件捕获吗？](https://juejin.cn/post/6844903834075021326)

## 模块化演变历程

### CommonJS 规范

**优点：**

- 解决了依赖、全局变量污染的问题，是 `js` 运行在服务器端的必要条件

**缺点：**

- `CommonJS` 是`同步加载模块`的(在服务器端，文件都是保存在硬盘上，所以同步加载没有问题)
- `CommonJS` 是不适用于浏览器端的(在浏览器端，需要将文件从服务器端请求过来，那么同步加载就不适用了)

### AMD 规范(require.js)

**优点：**

- 适合在浏览器环境中`异步加载模块`，可以`并行加载`多个模块。

**缺点：**

- 提高了开发成本，必须提前加载所有的依赖，不能`按需加载`

### CMD 规范(sea.js)

**优点：**

- 同样实现了浏览器端的模块化加载。可以`按需加载`，依赖就近。

**缺点：**

- 依赖 [SPM](https://www.jianshu.com/p/a4ecf762f1be) 打包，模块的加载逻辑偏重

### ES6 模块化

`ES6` 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 `CommonJS` 和 `AMD` 规范，成为浏览器和服务器通用的模块解决方案

**ES6 模块与 CommonJS 模块的差异:**

- `CommonJS` 模块输出的是一个值的拷贝（类深拷贝），`ES6` 模块输出的是值的引用。
- `CommonJS` 模块是运行时加载，`ES6` 模块是编译时输出接口。

**说明:**

> 第二个差异是因为 `CommonJS` 加载的是一个对象（即 `module.exports` 属性），该对象只有在脚本运行完才会生成。而 `ES6` 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
> `ES6` 模块的运行机制与 `CommonJS` 不一样。`ES6` 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块

[ES6 的模块加载，你们真的完全懂了吗？](https://juejin.cn/post/7001671927836180487)

[前端模块化详解(完整版)](https://juejin.cn/post/6844903744518389768)

### 动态模块加载 import()

动态异步加载，返回 `promise` 对象

- es6 动态加载方式： `import()`
- webpack 动态加载方式： `require.ensure`

[深入理解 ES6 模块机制](https://juejin.cn/post/6844903565236895758)

## 浅拷贝和深拷贝

### 浅拷贝方式

- Object.assign()
- lodash 的 \_.clone()
- ... 扩展运算符
- Array.prototype.concat()
- Array.prototype.slice()

### 深拷贝方式

- JSON.Stringify()
- lodash 的 \_.cloneDeep()
- jQuery 的 extend()

**JSON.Stringify() 说明:**

- `JSON.Stringify()` 虽然可以实现数组或对象深拷贝，但不能处理函数和正则
- `JSON.parse()` 解析后；函数 => null、正则 => {}

**jQuery 的 extend() 使用:**

```js
$.extend(deepCopy, target, obj, [objectN]); // 第一个参数为 true, 就是深拷贝

const obj = { a: 1 };
const cloneObj = $.extend(true, {}, obj);
```

#### 自定义深拷贝

```ts
const cloneDeep = (obj, map = new WeekMap()) => {
  // 基本数据类型、function
  if (!obj || typeof obj !== 'object') return obj;
  // Date
  if (obj instanceof Date) return new Date(obj);
  // RegExp
  if (obj instanceof RegExp) return new RegExp(obj);

  // 判断该对象是否存在 map 中，用于处理对象循环调用（存在的话直接从 map 中获取哦）
  if (map.get(obj)) return map.get(obj);

  // 与 obj 对象同一构造函数创建的实例对象
  const cloneObj = new obj.constructor();

  // 存储克隆的对象到 map 中
  map.set(obj, cloneObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归调用拷贝
      cloneObj[key] = cloneDeep(obj[key], map);
    }
  }

  return cloneObj;
};
```

[浅拷贝与深拷贝](https://juejin.cn/post/6844904197595332622)

[深拷贝的终极探索（90%的人都不知道）](https://juejin.cn/post/6844903692756336653)

[深入剖析 JavaScript 的深复制](https://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)

## 执行上下文和执行栈

[[译] 理解 JavaScript 中的执行上下文和执行栈](https://juejin.cn/post/6844903682283143181)

## 闭包及其作用

> 闭包是指有权访问另外一个函数作用域中的变量的函数
>
> 闭包就是函数的局部变量集合，只是这些局部变量在函数返回后会继续存在
>
> 闭包就是函数的“堆栈”在函数返回后并不释放，我们也可以理解为这些函数堆栈并不在栈上分配而是在堆上分配。当在一个函数内定义另外一个函数就会产生闭包

**作用:**

**匿名自执行函数:**

- 我们知道所有的变量，如果不加上 `var` 关键字，则默认的会添加到全局对象的属性上去，这样的临时变量加入全局对象有很多坏处，比如:
  - 别的函数可能误用这些变量
  - 造成全局对象过于庞大，影响访问速度(因为变量的取值是需要从原型链上遍历的)
- 除了每次使用变量都是用 `var` 关键字外，我们在实际情况下经常遇到这样一种情况，即有的函数只需要执行一次，其内部变量无需维护，可以用闭包。

**结果缓存:**

我们开发中会碰到很多情况，设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间，那么我们就需要将计算出来的值存储起来，当调用这个函数的时候，首先在缓存中查找，如果找不到，则进行计算，然后更新缓存并返回值，如果找到了，直接返回查找到的值即可。闭包正是可以做到这一点，因为它不会释放外部的引用，从而函数内部的值可以得以保留。

[破解前端面试（80% 应聘者不及格系列）：从闭包说起](https://juejin.cn/post/6844903474212143117)

[JavaScript 深入之闭包](https://juejin.cn/post/6844903475998900237)

[JavaScript 闭包的底层运行机制](http://blog.leapoahead.com/2015/09/15/js-closure/)

## js 中函数的 this

- 普通函数 `this` 指向执行(运行)时决定（`window` 或调用该函数对象等）
- 箭头函数 `this` 指向声明时决定（创建时上下文 `this` 指向）

  ...

[JavaScript 中的 this](https://juejin.cn/post/6844903488304971789)

## 原型链

![图解](https://img-blog.csdnimg.cn/img_convert/b7dca39f0ccd1c880c6356f809ae0ee7.png)

**instance of：**

son instance of Person 原理：son.\_\_proto\_\_ = Mother.prototype

son instance of Object 原理：Mother.prototype.\_\_proto\_\_ = Object.prototype

**Construct：**

son.\_\_proto\_\_.constructor === Mother 为 `true`，但是 Mother.\_\_proto\_\_.constructor === Object 的为 `false`。
所以，用 `consturctor` 判断就比用 `instance of` 判断，更为严谨。

[JavaScript 深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)

[深入理解 JavaScript 原型](https://mp.weixin.qq.com/s/1UDILezroK5wrcK-Z5bHOg)

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
  - 将原型方法赋值和创建过程移动到构造函数内部，对属性的判断实现仅仅在第一次调用函数时候执行。
  - 很好的对组合模式进行来封装
- 寄生构造函数模式
  - 基于一个已有类型，在实例化时对实例对象进行扩展（达到既不修改原构造函数也达到扩展对象目的）
  - 缺点：和工厂模式一样，无法实现对对象的识别，均为 `Object`

**动态原型模式示例：**

```ts
function isProperty(object, property) {
  // hasOwnProperty 判断自身是否有该属性， 判断属性是否在 object 原型（Person.Property）中存在
  return !object.hasOwnProperty(property) && property in object;
}

function Person(name, age) {
  // 初始时候运行, Person 原型中还没有 sayName 属性方法
  if (!isProperty(this, sayName)) {
    Person.prototype = {
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

[js 对象的深入理解(六)](https://www.cnblogs.com/nzcblogs/p/11197289.html)

### 继承的几种方式和优缺点？

- 原型链继承
  - 子类构造函数的原型（`prototype`）等于父类的实例（`new Parent()`）【重要: `Child.prototype === new Parent()`】, 即：`new Child.\_\_proto\_\_ = new Parent()`
  - 特点: 基于原型链，可以继承父类原型上的属性和方法
  - 缺点: 不能继承父类实例的属性和方法；所有子类共用父类原型上的属性（注：引用类型属性 `Array` 等）
- 构造（伪）继承
  - 子类构造函数中调用父类构造函数改变并父类构造函数中 `this` 指向
  - 特点: 可以实现多继承，可以继承父类实例的属性和方法，
  - 缺点: 不能继承原型上的属性和方法。
- 组合继承（原型 + 伪继承）
  - 特点: 可以继承父类实例的属性和方法，也可以继承原型上的属性和方法；属性使用构造函数继承，方法使用原型链继承。
  - 缺点: 子类实例化时会调用多次父类构造函数
- 寄生组合继承（原型 + 伪继承）
  - 可以继承父类实例的属性和方法，也可以继承原型上的属性和方法；子类实例化时只调用一次父类构造函数

#### 寄生组合继承示例

```ts
function Parent(name) {
  this.name = name;
  this.arr = [1, 2, 3];
}

function Child(name, age) {
  // 继承父类实例属性【构造函数中的属性】
  Parent.call(this, name); // 改变父类构造函数内的 this 指向
  this.age = age;
}

// 父类原型属性
Parent.prototype.sayName = function() {
  console.log(this.name);
};

// 继承父类原型【属性、方法】
// Child.prototype = new Parent(); // 子类构造函数的原型指向父类的实例
Child.prototype = Object.create(Parent.prototype); // 子类原型指向父类原型的拷贝
Child.prototype.constructor = Child; // 父类的实例构造函数指向子类构造函数

let child = new Child('orange', 18); // { name: 'orange', arr: [1, 2, 3], age: 18 }
child.sayName(); // 'orange'
```

#### instanceof 实现

```ts
// 实现思想【实例的 __proto__ 是否递归指向函数的 prototype 属性】
function myInstanceof(instance, fun) {
  let funPrototype = fun.prototype; // 取右表达式的 prototype 值
  instance = instance.__proto__; // 取左表达式的__proto__值
  while (true) {
    if (instance === null) {
      return false;
    }
    if (instance === funPrototype) {
      return true;
    }
    // 递归赋值实例原型
    instance = instance.__proto__;
  }
}
```

[详解 JS 原型链与继承](https://louiszhai.github.io/2015/12/15/prototypeChain/)

### 原型链与作用域区别

**区别：**

- 作用域链是相对于**变量**而言，原型是相对于**属性**而言【依次向原型中寻找】
- 作用域链最顶层是 `window`，原型链最顶层是 `Object`(null)【依次向上级作用中寻找】

[JavaScript 深入之作用域链](https://github.com/mqyqingfeng/Blog/issues/6)

## JS 垃圾回收机制

> V8 把堆内存分为两部分处理 `新生代` 和 `老生代`
>
> - 新生代: 临时分配的内存，存活时间短(新建的对象或只经历过一次垃圾回收的对象)
> - 老生代: 常驻内存，存活时间长(经历过多次垃圾回收的对象)

**新生代:**

> 新生代被分为 `From` 和 `To` 两个空间
>
> - From: 正在使用的内存
> - To: 目前闲置的内存

当 `From` 空间满了, `V8` 将会执行 `Scavenge` 算法进行垃圾回收, 执行垃圾回收算法时应用逻辑将会停止执行（js 单线程机制）

**Scavenge 垃圾回收算法:**

> 主要解决 `内存碎片` 问题，`From` 空间中存活的对象空间可能不连续, `按顺序` 移动到 `To` 空间, 对象在 `To` 空间的存储是连续的

- 首先检查 `From` 空间存活的对象
  - 对象存活: 是否满足晋升到老生代的条件。满足，晋升老生代；不满足，移动到 `To` 空间。
  - 对象不存活: 释放对象空间
- 将 `From` 空间和 `To` 空间`角色`进行交换

**新生代晋升老生代条件:**

- 已经经历过一次 `Scavenge` 算法回收
- 对象从 `From` 空间 复制到 `To` 空间时，`To` 空间内存占用超过限制（25%）

> 设置限制 `25%` 占比原因: 算法结束后，两空间角色进行交换，如果 `To` 空间内存过小的话，会影响后续的内存分配。

**老生代:**

> 垃圾回收策略
>
> - 标记清除: 遍历堆空间所有对象，对它们做上标记，然后对代码中使用的变量及被[强引用](https://www.infoq.cn/article/lksmb2tlgh1ehg0*bbyg)的变量【存活变量】取消标记，随后在 `清除阶段` 对标记变量【不存活变量】进行空间回收。
> - 内存碎片整理: 在清除阶段结束后，将存活的对象向一端靠拢（移动对象使存活对象在堆内存储是连续的【减少空间占用】，比较耗时）

**增量标记:**

> 增量标记
>
> - 引入原因: 由于 `js` 单线程机制，在进行垃圾回收的时候会暂停应用逻辑的执行。新生代方法内存较小，每次停顿时间不会太长；但对于老生代来说每次回收时间比较长，停顿可能会造成影响。
> - 增量标记: 将一次停顿进行的过程分为多步，每次执行完一小步就让逻辑执行一会，这样交替进行直到标记阶段完成才进入内存碎片的整理。

[V8 引擎垃圾内存回收原理解析](https://juejin.cn/post/6844903993420840967)

[JavaScript 中的垃圾回收和内存泄漏](https://juejin.cn/post/6844903833387155464)

[认识 V8 引擎](https://zhuanlan.zhihu.com/p/27628685)

## 事件循环机制

### 浏览器 Event Loop

![图解](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/21/16a3e8964d1e54ce~tplv-t2oaga2asx-watermark.awebp)

**说明：**

- 所有同步任务都在主线程上执行，形成一个执行栈 (Execution Context Stack)。

- 而异步任务会被放置到 `Task Table`，也就是上图中的异步处理模块，当异步任务有了运行结果，就将该函数移入任务队列。

- 一旦执行栈中的所有同步任务执行完毕，引擎就会读取任务队列，然后将任务队列中的第一个任务压入执行栈中运行。

主线程不断重复第三步，也就是只要主线程空了，就会去读取任务队列，该过程不断重复，这就是所谓的事件循环。

**异步任务：**

异步任务分为**宏任务**(macrotask)与**微任务**(microtask)。宏任务会进入一个队列，而微任务会进入到另一个不同的队列，且微任务要优于宏任务执行

**常见的宏任务和微任务:**

宏任务： `script`(整体代码)、`setTimeout`、`setInterval`、`I/O`、`事件`、`postMessage`、 `MessageChannel`、`setImmediate` (Node.js)

微任务： `Promise.then`、 `MutaionObserver`、`process.nextTick` (Node.js)

### Node Event Loop

![图解](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9844fc265e1248b78958ff554c974ab1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**主要阶段:**

1. timers：计时器阶段，用于处理 `setTimeout` 以及 `setInterval` 的回调函数
2. pending callbacks：用于执行某些系统操作的回调，例如 `TCP` 错误
3. idle, prepare：`Node`内部使用，不用做过多的了解
4. poll：轮询阶段，执行队列中的 `I/O` 队列，并检查定时器是否到时
5. check：执行 `setImmediate` 的回调
6. close callbacks：处理关闭的回调，例如：`socket.destroy()`

**常见的宏任务和微任务:**

宏任务： `setTimeout`、`setInterval`、`setImmediate`

微任务： `Promise.then`、`process.nextTick`

**说明：**

- `Node EventLoop` 重点关注这四个阶段，分别是 `timers`、`poll`、`check`、`close callbacks`

### Node 与浏览器的 Event Loop 差异

- 浏览器环境下，执行 `macrotask` 队列前，如果 `microtask` 队列存在则先执行 `microtask` 队列
- `Node10` 及其之前版本环境下，执行 `macrotask` 队列时会将该队列**所有任务执行完毕**再去执行 `microtask` 队列; 10 版本之后和浏览器基本一致

```ts
console.log('start');
setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(function() {
    console.log('promise1');
  });
}, 0);
setTimeout(() => {
  console.log('timer2');
  Promise.resolve().then(function() {
    console.log('promise2');
  });
}, 0);
Promise.resolve().then(function() {
  console.log('promise3');
});
console.log('end');

// 浏览器：start=>end=>promise3=>timer1=>promise1=>timer2=>promise2
// Node：start=>end=>promise3=>timer1=>timer2=>promise1=>promise2
```

[最后一次搞懂 Event Loop](https://juejin.cn/post/6844903827611598862)

[浏览器与 Node 环境下的 Event Loop](https://juejin.cn/post/6886992599006380045)

[浏览器与 Node 的事件循环(Event Loop)有何区别?](https://juejin.cn/post/6844903761949753352)

## 不可变状态 Immutable

不使用深拷贝处理**引用类型**修改问题【修改后不影响原引用类型数据】

- 子节点被修改，那么父节点，或者父父节点被重新创建
- 兄弟节点或者其他与修改节点无关的节点被复用，不会重新创建

```ts
const { produce } = require('immer');

let baseState = {
  home: { name: '小明', arr: [1] },
  b: {},
};

let nextState = produce(baseState, draft => {
  draft.home.name = '小红';
});

console.log(baseState.home === nextState.home); // false
console.log(baseState.home.arr === nextState.home.arr); // true
console.log(baseState.b === nextState.b); // true
```

[理解不可变状态 Immutable.js](https://juejin.cn/post/6937481782262497288)

[React 中为什么要强调使用 Immutable](https://zhuanlan.zhihu.com/p/357700487)

## ES6

[ECMAScript 6 入门(阮一峰)](https://es6.ruanyifeng.com/)

### 数据类型

- 基本数据类型

> 六大基本数据类型: `number`、`string`、`boolean`、`null`、`undefined`、`symbol`、`bigint`

- 引用数据类型
  - 对象 `Object`
  - 数组 `Array`
  - 函数 `Function`

### symbol 简单了解

[简单了解 ES6/ES2015 Symbol() 方法](https://www.zhangxinxu.com/wordpress/2018/04/known-es6-symbol-function/)

### undefined 与 null 的区别

**null** 表示"没有对象"，即该处不应该有值

- 作为函数的参数，表示该函数的参数是对象
- 作为对象原型链的终点

**undefined** 表示**缺少值**，就是此处应该有一个值，但是还没有定义

- 变量被声明了，但没有赋值时，就等于 `undefined`
- 调用函数时，应该提供的参数没有提供，该参数等于 `undefined`
- 对象没有赋值的属性，该属性的值为 `undefined`
- 函数没有返回值时，默认返回 `undefined`

[undefined 与 null 的区别(阮)](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

### var、let、和 const 关键字

- `let`关键字 【声明变量】
  特性:

1. 块级作用域 【局部作用于声明的代码块中】
2. 变量声明不会提升 【变量未声明前无法使用该变量】
3. 暂时性死区 【该变量声明前面的区域无法访问该变量】
4. 不能重复声明 【同一代码块中不能重复声明同一变量】

- `const` 关键字 【声明常量(一般用大写字母表示常量)】
  特性: 【在遵从 `let` 声明变量的特性上再添加如下两条特性】

1. 声明时初始化 【声明的同时必须赋值】
2. 值不可修改

[一看就懂的 var、let、const 三者区别](https://juejin.cn/post/6925641096152399880)

### 箭头函数与普通函数的区别

- 箭头函数 `this` 在声明时由上下文决定，普通函数 `this` 在调用时决定
- 箭头函数没有自己的 `arguments` 对象，但是可以访问外围函数的 `arguments` 对象
- 不能通过 `new` 关键字调用，同样也没有 `new.target` 值和原型

[箭头函数、箭头函数与普通函数的区别](https://juejin.cn/post/6844903805960585224)

### for...in 和 for...of 的区别

- `for...in` 遍历对象属性 `key` 值（包含原型上属性值）
- `for...of` 遍历迭代器对象【包括 Array、Map、Set、String、TypedArray、arguments、Object.entries(obj)等】

```ts
const obj = { a: 1, b: 2 };
const arr = [1, 2];

// for...in
for (const key in obj) {
  // 对象
  console.log(key); // 'a'、'b'
}

for (const key in arr) {
  // 数组
  console.log(key); // '0'、'1'
}

// for...of
for (const val of arr) {
  // 数组
  console.log(val); // 1、2
}

for (const [key, val] of Object.entries(obj)) {
  // 对象
  console.log(`${key}-${value}`); // 'a-1'、'b-2'
}
```

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

- 键值对的集合（`Hash` 结构，迭代器对象)。 键的范围不仅局限于字符串，各种类型都可以

```ts | pure
const a = { name: 'ming' };
const map = new Map([
  [a, 'ming'],
  ['chen', 'chen'],
]); // { key => value }

map.get(a); // ming
map.get({ name: 'ming' }); // undefined
map.get('chen'); // chen
```

**WeakMap:**

`WeakMap` 与 `Map` 的区别有两点:

- `WeakMap` 只接受引用类型作为键名（`null` 除外），不接受其他类型的值作为键名。
- `WeakMap` 的`键`在不再可用后，会被垃圾回收机制处理销毁。

**注意:**
`WeakMap` 的`键`才是弱引用，值不是。在 `WeakMap` 的值中存储对象会阻止垃圾回收，即使该对象的其他引用已全都被移除。

#### `Set(Map)` 与 `WeakSet(WeakMap)` 的区别

- WeakSet(WeakMap) 值(键) 需为引用类型
- WeakSet(WeakMap) 没有 `size` 属性并且迭代器对应方法，只有四个方法 get()、set()、has()、delete()
- WeakSet(WeakMap) 确保额外数据在不可用后被垃圾回收机制回收，从而能优化内存使用并规避内存泄漏。

[Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)

[es6 Map 和 Set](https://segmentfault.com/a/1190000015960005)

#### 引用拓展

[如何实现 JS 真正意义上的弱引用？](https://www.infoq.cn/article/lksmb2tlgh1ehg0*bbyg)

[理解 Java 的强引用、软引用、弱引用和虚引用](https://juejin.cn/post/6844903665241686029)

### Promise/async/Generator

`Generator` 函数是 `ES6` 提供的一种异步编程解决方案；可以控制函数的执行, 一般结合 [co 库](https://www.npmjs.com/package/co) 使用。拓展：[co 函数库的含义和用法](https://www.ruanyifeng.com/blog/2015/05/co.html)、[Thunk 函数的含义和用法](https://www.ruanyifeng.com/blog/2015/05/thunk.html)

- 可暂停函数, `yield` 可暂停，`next` 方法可启动，每次返回的是 `yield` 后的表达式结果
- `yield` 表达式本身没有返回值，或者说总是返回 `undefined`。`next` 方法可以带一个参数，该参数就会被当作**上一个** `yield` 表达式的返回值

```ts
function* foo(x) {
  // 5;
  let y = 2 * (yield x + 1);
  let z = yield y / 3;
  return x + y + z;
}
let it = foo(5);

// yield (5 + 1)
console.log(it.next()); // { value: 6, done: false }
// yield (x + 1) = 12
console.log(it.next(12)); // { value: 8, done: false }
// yield (y / 3) = 13; yield (x + 1) = 12; x = 5, y = 24, z = 13
console.log(it.next(13)); // { value: 42, done: true }
```

[工具库-方法实现-Promise](https://niezicheng.github.io/functions/classic/promise)

[9k 字 | Promise/async/Generator 实现原理解析](https://juejin.cn/post/6844904096525189128)

[JS 异步编程六种方案](https://juejin.cn/post/6844903760280420366)

## 功能判断类型

### 数组去重

- `indexOf` 循环去重
- `ES6` `Set` 去重
  - Array.from(new Set(array))
  - [...new Set(array)]
- `Map` 键值对去重;
  - 把数组的值存成 `Map` 的 `key` 值，比如 `Map[value1] = true`， 在判断另一个值的时候，如果 `Map[value2]` 存在的话，就说明该值是重复的

[JS 数组去重!!!一篇不怎么靠谱的"深度"水文](https://juejin.cn/post/6844903477768896520)

### 数组扁平化

> 所有方法总体来说还是使用递归方法调用来实现的

1. 普通递归调用
2. `toString() + split()` 方法
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

### Js 生成随机字符串

[Js 生成随机字符串的 5 种方法](https://segmentfault.com/a/1190000022718482)

### 生成随机数组

1. `sort` 结合 `Math.random`

```js
arr.sort(() => Math.random() - 0.5);
```

**说明：**

- `v8` 在处理 `sort` 方法时，使用了插入排序和快排两种方案。 当目标数组长度小于 `10` 时，使用**插入排序**；反之，使用**快速排序**
- 所以，严格意义上来讲：这种方式并不是真正意思上的乱序，一些元素并没有机会相互比较， 最终数组元素停留位置的概率并不是完全随机的。

2. 改造 `sort` 和 `Math.random()` 的结合方式

```js
function shuffle(arr) {
  let newArr = arr.map(item => ({ val: item, ram: Math.random() }));
  newArr.sort((a, b) => a.ram - b.ram);
  arr.splice(0, arr.length, ...newArr.map(i => i.val));
  return arr;
}
```

3. Fisher–Yates (洗牌算法)

**思想**：将数组从后向前遍历，然后将当前元素与其前面随机位置的元素进行交换【过程中各元素之间均有相同概率的交换可能】

```js
function shuffle(arr) {
  let m = arr.length;
  while (m > 1) {
    let index = Math.floor(Math.random() * m--);
    [arr[m], arr[index]] = [arr[index], arr[m]];
  }
  return arr;
}
```

[「前端进阶」数组乱序](https://juejin.cn/post/6844903863812620296)

## 拓展

[ES6、ES7、ES8、ES9、ES10 新特性一览](https://juejin.cn/post/6844903811622912014)

[JavaScript 专题系列 20 篇正式完结！](https://juejin.cn/post/6844903506017517582)

[由浅入深，66 条 JavaScript 面试知识点](https://juejin.cn/post/6844904200917221389)

[80% 应聘者都不及格的 JS 面试题](https://juejin.cn/post/6844903470466629640)

[春招季如何横扫 Javascript 面试核心考点(基础版)？](https://juejin.cn/post/6844903809215365134)

[前端 js 收藏集锦](https://zhuanlan.zhihu.com/p/27198172)
