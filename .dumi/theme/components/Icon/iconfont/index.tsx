import React from 'react';
import { defaultFontFiles, loadFont } from './load-iconfont';
import icons from './iconfont.json';

const Iconfont = props => {
  const { type, size, color, family = 'iconfont', style, ...restProps } = props;

  loadFont(defaultFontFiles);

  const defaultStyle = {
    color,
    fontSize: size,
    fontFamily: family,
    fontWeight: 'normal',
    fontStyle: 'normal',
    alignItems: 'center',
    lineHeight: 1,
    ...style,
  };

  return (
    <span
      {...restProps}
      style={{ ...defaultStyle }}
      dangerouslySetInnerHTML={{ __html: `&#x${icons?.[type]};` }}
    ></span>
  );
};

export default Iconfont;
