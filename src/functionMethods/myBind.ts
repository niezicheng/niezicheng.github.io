/**
 * bind 方法
 * 说明：只改变 this 的指向
 */
export default function (context: any = global) {
  context.fn = this;
  return function () {
    let result = context.fn(...arguments); // 执行函数
    delete context.fn; // 删除属性，避免污染
    return result;
  }
}
