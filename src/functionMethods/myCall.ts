/**
 * call 的实现 fn.call(obj, a, b)
 * 说明：
 *  1. 调用函数 fn 上下文指向 obj
 *  2. 改变 this 指；a、b 以逗号分割作为参数传递
 *  3. 执行 fn 函数，返回结果
 */

export default function (context: any = global, ...args: any) {
  // 将调用 myCall 的 function 的 this 指向赋给 context 的 fn 属性
  context.fn = this;
  let result = context.fn(...args); // 执行函数
  delete context.fn; // 删除属性，避免污染
  return result;
}
