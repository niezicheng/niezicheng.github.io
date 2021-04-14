/**
 * new 的实现
 * 1. 获取构造函数
 * 2. 创建一个新对象
 * 3. 将函数作用域赋给新对象(生产一个新的上下文)
 * 4. 执行函数中的代码(为新对象添加属性方法)
 * 5. 返回一个对象
 */

export function MyNew () {
  let ConStructor = Array.prototype.shift.call(arguments); // 取出构造函数
  let obj: any = {}; // 创建一个新对象

  obj.__proto__ = ConStructor.prototype; // 对象原型等于构造函数的 prototype

  let result = ConStructor.apply(obj, arguments); // 执行函数中的代码

  return typeof result === 'object' ? result : obj; // 返回值须为对象
}
