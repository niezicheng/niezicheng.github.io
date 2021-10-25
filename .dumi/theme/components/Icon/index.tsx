import React from 'react';
import Svg from './svg';
import Iconfont from './iconfont';

export default props => {
  const { svg, name, type, size = 24, color, style, ...restProps } = props;

  const attrs = {
    type: type || name,
    size,
    color,
    style,
  };

  if (svg) {
    return <Svg {...restProps} {...attrs} />;
  }

  return <Iconfont {...restProps} {...attrs} family={restProps?.family} />;
};
