/**
 * new 的实现
 * 1. 获取构造函数
 * 2. 创建一个新的空对象实例。
 * 3. 将函数作用域赋给新对象, (将此空对象的隐式原型指向其构造函数的显示原型, 生产一个新的上下文)
 * 4. 执行构造函数(为新对象添加属性方法), 同时执行构造函数内的 this 指向这个新对象
 * 5. 如果返回值是一个新对象，那么直接返回该对象；如果无返回值或者返回一个非对象值，那么就将步骤（1）创建的对象返回
 */

export function MyNew () {
  let ConStructor = Array.prototype.shift.call(arguments); // 取出构造函数
  let obj: any = {}; // 创建一个新对象

  obj.__proto__ = ConStructor.prototype; // 对象原型指向构造函数的 prototype

  let result = ConStructor.apply(obj, arguments); // 执行函数中的代码

  return typeof result === 'object' ? result : obj; // 返回值须为对象
}
