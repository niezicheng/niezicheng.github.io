/**
 * 防抖函数
 * 说明：事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
 * @param fun 回调函数
 * @param delay 时间间隔
 */
export const debounce = <F extends (...arg: any[]) => void>(fun: F, delay: number = 0) => {
  let timeId: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeId);
    timeId = setTimeout(() => fun(...args), delay);
  }
}

/**
 * 节流函数
 * 说明：规定在单位时间 n 秒内，只触发一次函数。如果这个单位时间内函数触发多次，只有一次生效
 * @param fun 回调函数
 * @param wait 时间间隔
 */
export const throttle = <F extends (...arg: any[]) => void>(fun: F, wait: number) => {
  let timeId: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    if (timeId) return;
    timeId = setTimeout(() => {
      fun(...args);
      timeId = null as any;
    }, wait)
  }
}
