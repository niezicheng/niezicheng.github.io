export type SourceItemType = {
  /**
   * 分类标题
   */
  title: string;
  /**
   * 上部分是否完全图片展示
   * 默认值: true
   */
  isImg?: boolean;
  /**
   * 每行展示列数
   * 默认值: 4
   */
  column?: number;
  /**
   * 显示数据类型
   */
  data: Array<ItemDataType>;
};

export type ItemDataType = {
  /**
   * Id, 依次递增
   */
  id?: number;
  /**
   * 数据名称
   */
  name?: string;
  /**
   * 图片地址
   */
  imgUrl?: string;
  /**
   * 网站链接地址
   */
  href?: string;
};
