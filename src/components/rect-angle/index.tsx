import React from 'react';
import {
  PosItemStringType,
  PosItemObjectType,
  RectAngleProps,
} from './interface';
import { linearPos, mapPosToLinear } from './utils';
import './index.scss';

const RectAngle = (props: RectAngleProps) => {
  const {
    width = 150,
    height = 150,
    type = 'normal',
    color = 'transparent',
    size = 20,
    fillColor = '#4569d4',
    position = ['top-left', 'top-right', 'bottom-right', 'bottom-left'],
    children,
    ...restProps
  } = props;

  console.log(position);

  const bgLinear = linearPos?.map(
    (pos: PosItemStringType | PosItemObjectType) =>
      mapPosToLinear(position, type, pos, color, size, fillColor),
  );

  return (
    <div
      {...restProps}
      style={{
        ...props.style,
        width,
        height,
        background: bgLinear.join(','),
        backgroundSize: '50% 50%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  );
};

export default RectAngle;
