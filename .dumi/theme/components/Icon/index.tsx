import React from 'react';
import Svg from './svg';
import Iconfont from './iconfont';
import { IconProps } from './interface';

export default (props: IconProps) => {
  const {
    svg = false,
    name,
    type,
    size = 24,
    color,
    style,
    ...restProps
  } = props;

  // 公共属性
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
