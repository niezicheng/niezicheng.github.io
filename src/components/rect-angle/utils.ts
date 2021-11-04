import {
  PosItemStringType,
  PosItemObjectType,
  PositionType,
} from './interface';

export const mapPosToDeg = {
  'top-left': 135,
  'top-right': -135,
  'bottom-right': -45,
  'bottom-left': 45,
};

export const linearPos: PositionType = [
  'top-left',
  'top-right',
  'bottom-right',
  'bottom-left',
];

/**
 * 获取 linearGradient 样式信息
 * @param position 外部边角位置数组
 * @param pos 边角单个方位字串
 * @param color 边角颜色
 * @param size 边角大小
 * @param fillColor 容器背景颜色
 * @returns 相应单个边角 linearGradient 样式
 */
export const mapPosToLinear = (
  position: PositionType,
  type: any,
  pos?: PosItemStringType | PosItemObjectType,
  color?: string,
  size?: number,
  fillColor?: string,
) => {
  let deg;
  const isCircle = type === 'circle';

  // 处理外部自定义 linearGradient 样式
  if (position?.length && typeof position[0] !== 'string') {
    // 获取当前循环 pos 对应的对象
    const posit = position.filter(
      item => (item as PosItemObjectType).pos === pos,
    )?.[0];
    // 获取 item.pos 组成的数组
    position = position.map(item => (item as PosItemObjectType).pos) as any;

    color = (posit as PosItemObjectType)?.color || color;
    fillColor = (posit as PosItemObjectType)?.fillColor || fillColor;
    size = (posit as PosItemObjectType)?.size || size;
    deg = (posit as PosItemObjectType)?.deg;
  }

  // 判断外部是否传递该方向
  const isIncludes = pos && position.includes(pos);

  const getLinearGradient = (pos: PosItemStringType, deg?: number) => {
    const position = pos?.split('-')?.join(' '); // 'top-left' => 'top left'

    return `${
      isCircle
        ? `radial-gradient(circle at ${position}, ${color} ${
            isIncludes ? size : 0
          }px, ${fillColor}  0) ${position}`
        : `linear-gradient(${deg || mapPosToDeg[pos]}deg, ${color} ${
            isIncludes ? size : 0
          }px, ${fillColor}  0) ${position}`
    }`;
  };

  console.log(getLinearGradient(pos as PosItemStringType, deg), '======');

  return getLinearGradient(pos as PosItemStringType, deg);
};
