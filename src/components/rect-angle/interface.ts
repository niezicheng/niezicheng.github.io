import React from 'react';

export type PosItemStringType =
  | 'top-left'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left';

export type PosItemObjectType = {
  /**
   * 边角方向
   */
  pos?: PosItemStringType;
  /**
   * 边角颜色
   */
  color?: string;
  /**
   * 容器填充色
   */
  fillColor?: string;
  /**
   * 边角旋转角度
   */
  deg?: number;
  /**
   * 边角大小
   */
  size?: number;
};

export type PositionType = Array<PosItemStringType | PosItemObjectType>;

export interface RectAngleProps {
  /**
   * 边角类型
   * 默认值: 'normal'
   */
  type?: 'normal' | 'circle';
  /**
   * 容器宽度
   * 默认值: 150
   */
  width?: number | string;
  /**
   * 容器高度
   * 默认值: 150
   */
  height?: number | string;
  /**
   * 边角大小
   * 默认值: 20
   */
  size?: number;
  /**
   * 边角颜色
   * 默认值: 'transparent'
   */
  color?: string;
  /**
   * 填充颜色
   * 默认值: '#4569d4'
   */
  fillColor?: string;
  /**
   * 边角方位数组 ｜ 边角方位自定义属性数组
   * 默认值: ['top-left', 'top-right', 'bottom-right', 'bottom-left']
   */
  position?: PositionType;
  /**
   * 子元素节点
   */
  children?: any;
  /**
   * 样式
   */
  style?: React.CSSProperties;
}
