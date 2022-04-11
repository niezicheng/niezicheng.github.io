/**
 * 加载 font， 添加至 document 的 style 标签
 * @param iconfont 加载 font 链接对象
 */
export const loadFont = iconfont => {
  // 添加 font-style 至 style 标签
  const style: any = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = iconfont;
  } else {
    style.appendChild(document.createTextNode(iconfont));
  }

  document.head.appendChild(style);
};

export const defaultFontFiles = `
@font-face {
  font-family: 'iconfont';  /* Project id 2886868 */
  src:
    url('//at.alicdn.com/t/font_2886868_0flbyhs46fpr.woff2?t=1649644290732') format('woff2'),
    url('//at.alicdn.com/t/font_2886868_0flbyhs46fpr.woff?t=1649644290732') format('woff'),
    url('//at.alicdn.com/t/font_2886868_0flbyhs46fpr.ttf?t=1649644290732') format('truetype');
}`;
