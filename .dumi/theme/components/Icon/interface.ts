export interface IconProps {
  /**
   * 图标类型
   */
  type?: string;
  /**
   * 图标名称，type 和 name 设置一个即可
   */
  name?: string;
  /**
   * 是否 svg 类型
   */
  svg?: boolean;
  /**
   * 图标大小
   * 默认值: 24
   */
  size?: number;
  /**
   * 图标颜色
   * - iconfont 类型为 string
   * - svg 类型多色为数组
   */
  color?: string | Array<string>;
  /**
   * 样式
   */
  style?: React.CSSProperties;

  [propName: string]: any;
}
