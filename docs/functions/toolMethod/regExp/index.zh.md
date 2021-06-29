---
title: RegExp
order: 1
group:
  title: 工具方法
nav:
  title: 工具库
  order: 1
---

## 正则匹配函数

> 向 `html` 字串某标签的指定属性插入指定内容

## 源码展示

```ts | pure
/**
 * 给某 html 字符串中的 tagType 类型标签的 propName 属性添加 addContent 内容
 * @param htmlStr html 内容字符串
 * @param tagType 标签类型字符串
 * @param propName 属性名称字符串
 * @param addContent 添加的内容
 * @returns 返回替换之后的 html 字串
 */
const htmlTagAddPropContent = (htmlStr: string, tagType: string, propName: string, addContent: string) => {
  //正则匹配不含propName="" 或 propName='' 的 tagType 标签
  var regex1 = new RegExp(`(i?)(<${tagType})(?![^<>]*?${propName}=['"][^<>]*?>)`, 'gmi');

  //给不含propName="" 或 propName='' 的 tagType 标签加上 propName=""
  htmlStr = htmlStr.replace(regex1, `$2 ${propName}=\"\"$3`);

  //正则匹配含有 propName 的tagType标签
  var regex2 = new RegExp(`(i?)(\<${tagType}.*?${propName}=['\"])([^\>]+\>)`, 'gmi');

  //在 tagType 标签的 propName 里面增加内容 addContent
  htmlStr = htmlStr.replace(regex2, `$2${addContent}$3`);

  return htmlStr;
}
```

## 正则符号说明

[?=、?<=、?!、?<! 的含义和使用区别](https://www.runoob.com/regexp/regexp-syntax.html)

> $n 表示与 `regexp` 中的第 `n` 个子表达式相匹配的文本
eg:

```ts | pure
// 源码中的代码实例
var regex2 = new RegExp(`(i?)(\<${tagType}.*?${propName}=['\"])([^\>]+\>)`, 'gmi');
htmlStr = htmlStr.replace(regex2, `$2${addContent}$3`);

// $1 => (i?)
// $2 => (\<${tagType}.*?${propName}=['\"])
// $3 => ([^\>]+\>)
// 所以 addContent 便是插入到 htmlStr 匹配 $2 和 $3 之间
```

### 模式修饰符

- (?i)即匹配时不区分大小写。表示匹配时不区分大小写。
- (?s)即 `Singleline` (单行模式)。表示更改.的含义，使它与每一个字符匹配（包括换行 符\n）。
- (?m)即 `Multiline` (多行模式) 。 表示更改 ^ 和 \$ 的 含义，使它们分别在任意一行的行首和行尾匹配，而不仅仅在整个字符串的开头和结尾匹配。(在此模式下, \$ 的精确含意是:匹配\n之前的位置以及字符串结束前的位置.)
- (?x)：表示如果加上该修饰符，表达式中的空白字符将会被忽略，除非它已经被转义。
- (?e)：表示本修饰符仅仅对于 `replacement` 有用，代表在 `replacement` 中作为 `PHP` 代码。
- (?A)：表示如果使用这个修饰符，那么表达式必须是匹配的字符串中的开头部分。比如说"/a/A"匹配"abcd"。
- (?E)：与"m"相反，表示如果使用这个修饰符，那么"$"将匹配绝对字符串的结尾，而不是换行符前面，默认就打开了这个模式。
- (?U)：表示和问号的作用差不多，用于设置"贪婪模式"。

## 示例

<code src="./demo/index.tsx"></code>
