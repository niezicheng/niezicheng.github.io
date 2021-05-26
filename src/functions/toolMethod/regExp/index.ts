/**
 * 给某 html 字符串中的 tagType 类型标签的 propName 属性添加 addContent 内容
 * @param htmlStr html 内容字符串
 * @param tagType 标签类型字符串
 * @param propName 属性名称字符串
 * @param addContent 添加的内容
 * @returns 返回替换之后的 html 字串
 */
const htmlTagAddPropContent = (htmlStr: string, tagType: string, propName: string, addContent: string) => {
  //正则匹配所有 tagType 标签
  //var regex0 = new RegExp(`(i?)(\<${tagType})([^\>]+\>)`, 'gmi');
  //正则匹配不含propName="" 或 propName='' 的img标签
  var regex1 = new RegExp(`(i?)(\<${tagType})(?!(.*?${propName}=['\"](.*)['\"])[^\>]+\>)`, 'gmi');
  //给不含propName="" 或 propName='' 的 tagType 标签加上propName=""
  htmlStr = htmlStr.replace(regex1, `$2 ${propName}=\"\"$3`);
  //正则匹配含有propName的tagType标签
  var regex2 = new RegExp(`(i?)(\<${tagType}.*?${propName}=['\"])([^\>]+\>)`, 'gmi');
  //在 tagType 标签的 propName 里面增加内容 addContent
  htmlStr = htmlStr.replace(regex2, `$2${addContent}$3`);
  return htmlStr;
}

export { htmlTagAddPropContent };
