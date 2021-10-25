import React from 'react';
import svgSource from './svg.json';

const Svg = props => {
  const { type, color, size, style } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox={'0 0 1024 1024'}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {svgSource[type]?.map((path, index) => {
        // 多颜色处理
        const fillColor = Array.isArray(color) ? color[index] : color;

        return <path key={index} d={path.d} fill={fillColor || path.fill} />;
      })}
    </svg>
  );
};

export default Svg;
