/**
 * apply 方法
 * 改变函数内部 this 指向，接受数组作为函数参数
 * @param context 函数内部 this 指向对象
 * @param args 传递给函数的参数数组
 */
export default function(context: any = global, args: Array<any>) {
  if (typeof this !== 'function') {
    throw new TypeError('type error');
  }

  // 将调用该方法的 function 的 this 指向赋给 context 的 fn 属性
  context.fn = this;

  let result;
  if (!args) {
    result = context.fn();
  } else {
    result = context.fn(...args); // 执行函数
  }

  delete context.fn; // 删除属性，避免污染
  return result;
}
