/**
 * bind 方法
 * 改变函数内部 this 指向，接受为扩展变量作为函数参数
 * @param context 函数内部 this 指向对象
 */
export default function(context: any = global) {
  if (typeof this !== 'function') {
    throw new TypeError('type error');
  }

  context.fn = this;
  return function() {
    let result = context.fn(...arguments); // 执行函数
    delete context.fn; // 删除属性，避免污染
    return result;
  };
}
