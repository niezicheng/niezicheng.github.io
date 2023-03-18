(self["webpackChunkdocs_dumi"]=self["webpackChunkdocs_dumi"]||[]).push([[5908],{22231:function(e,n,t){"use strict";t.d(n,{m:function(){return l.m}});var l=t(9684);t(72255)},59365:function(e,n,t){"use strict";t.r(n);var l=t(67294),a=t(96089),r=t(86003),m=t(65659),c=t(45139),o=l.memo(c.default["reg-exp-demo"].component);n["default"]=e=>(l.useEffect((()=>{var n;null!==e&&void 0!==e&&null!==(n=e.location)&&void 0!==n&&n.hash&&a.AnchorLink.scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),l.createElement(l.Fragment,null,l.createElement(l.Fragment,null,l.createElement("div",{className:"markdown"},l.createElement("h2",{id:"\u6b63\u5219\u5339\u914d\u51fd\u6570"},l.createElement(a.AnchorLink,{to:"#\u6b63\u5219\u5339\u914d\u51fd\u6570","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u6b63\u5219\u5339\u914d\u51fd\u6570"),l.createElement("blockquote",null,l.createElement("p",null,"\u5411 ",l.createElement("code",null,"html")," \u5b57\u4e32\u67d0\u6807\u7b7e\u7684\u6307\u5b9a\u5c5e\u6027\u63d2\u5165\u6307\u5b9a\u5185\u5bb9")),l.createElement("h2",{id:"\u6e90\u7801\u5c55\u793a"},l.createElement(a.AnchorLink,{to:"#\u6e90\u7801\u5c55\u793a","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u6e90\u7801\u5c55\u793a"),l.createElement(m.Z,{code:"/**\n * \u7ed9\u67d0 html \u5b57\u7b26\u4e32\u4e2d\u7684 tagType \u7c7b\u578b\u6807\u7b7e\u7684 propName \u5c5e\u6027\u6dfb\u52a0 addContent \u5185\u5bb9\n * @param htmlStr html \u5185\u5bb9\u5b57\u7b26\u4e32\n * @param tagType \u6807\u7b7e\u7c7b\u578b\u5b57\u7b26\u4e32\n * @param propName \u5c5e\u6027\u540d\u79f0\u5b57\u7b26\u4e32\n * @param addContent \u6dfb\u52a0\u7684\u5185\u5bb9\n * @returns \u8fd4\u56de\u66ff\u6362\u4e4b\u540e\u7684 html \u5b57\u4e32\n */\nconst htmlTagAddPropContent = (\n  htmlStr: string,\n  tagType: string,\n  propName: string,\n  addContent: string,\n) => {\n  //\u6b63\u5219\u5339\u914d\u4e0d\u542bpropName=\"\" \u6216 propName='' \u7684 tagType \u6807\u7b7e\n  var regex1 = new RegExp(\n    `(i?)(<${tagType})(?![^<>]*?${propName}=['\"][^<>]*?>)`,\n    'gmi',\n  );\n\n  //\u7ed9\u4e0d\u542bpropName=\"\" \u6216 propName='' \u7684 tagType \u6807\u7b7e\u52a0\u4e0a propName=\"\"\n  htmlStr = htmlStr.replace(regex1, `$2 ${propName}=\\\"\\\"$3`);\n\n  //\u6b63\u5219\u5339\u914d\u542b\u6709 propName \u7684tagType\u6807\u7b7e\n  var regex2 = new RegExp(\n    `(i?)(\\<${tagType}.*?${propName}=['\\\"])([^\\>]+\\>)`,\n    'gmi',\n  );\n\n  //\u5728 tagType \u6807\u7b7e\u7684 propName \u91cc\u9762\u589e\u52a0\u5185\u5bb9 addContent\n  htmlStr = htmlStr.replace(regex2, `$2${addContent}$3`);\n\n  return htmlStr;\n};",lang:"ts"}),l.createElement("h2",{id:"\u6b63\u5219\u7b26\u53f7\u8bf4\u660e"},l.createElement(a.AnchorLink,{to:"#\u6b63\u5219\u7b26\u53f7\u8bf4\u660e","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u6b63\u5219\u7b26\u53f7\u8bf4\u660e"),l.createElement("p",null,l.createElement(a.Link,{to:"https://www.runoob.com/regexp/regexp-syntax.html"},"?=\u3001?<=\u3001?!\u3001?<! \u7684\u542b\u4e49\u548c\u4f7f\u7528\u533a\u522b")),l.createElement("blockquote",null,l.createElement("p",null,"$n \u8868\u793a\u4e0e ",l.createElement("code",null,"regexp")," \u4e2d\u7684\u7b2c ",l.createElement("code",null,"n")," \u4e2a\u5b50\u8868\u8fbe\u5f0f\u76f8\u5339\u914d\u7684\u6587\u672c eg:")),l.createElement(m.Z,{code:"// \u6e90\u7801\u4e2d\u7684\u4ee3\u7801\u5b9e\u4f8b\nvar regex2 = new RegExp(\n  `(i?)(\\<${tagType}.*?${propName}=['\\\"])([^\\>]+\\>)`,\n  'gmi',\n);\nhtmlStr = htmlStr.replace(regex2, `$2${addContent}$3`);\n\n// $1 => (i?)\n// $2 => (\\<${tagType}.*?${propName}=['\\\"])\n// $3 => ([^\\>]+\\>)\n// \u6240\u4ee5 addContent \u4fbf\u662f\u63d2\u5165\u5230 htmlStr \u5339\u914d $2 \u548c $3 \u4e4b\u95f4",lang:"ts"}),l.createElement("h3",{id:"\u6a21\u5f0f\u4fee\u9970\u7b26"},l.createElement(a.AnchorLink,{to:"#\u6a21\u5f0f\u4fee\u9970\u7b26","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u6a21\u5f0f\u4fee\u9970\u7b26"),l.createElement("ul",null,l.createElement("li",null,"(?i)\u5373\u5339\u914d\u65f6\u4e0d\u533a\u5206\u5927\u5c0f\u5199\u3002\u8868\u793a\u5339\u914d\u65f6\u4e0d\u533a\u5206\u5927\u5c0f\u5199\u3002"),l.createElement("li",null,"(?s)\u5373 ",l.createElement("code",null,"Singleline")," (\u5355\u884c\u6a21\u5f0f)\u3002\u8868\u793a\u66f4\u6539.\u7684\u542b\u4e49\uff0c\u4f7f\u5b83\u4e0e\u6bcf\u4e00\u4e2a\u5b57\u7b26\u5339\u914d\uff08\u5305\u62ec\u6362\u884c \u7b26\\n\uff09\u3002"),l.createElement("li",null,"(?m)\u5373 ",l.createElement("code",null,"Multiline")," (\u591a\u884c\u6a21\u5f0f) \u3002 \u8868\u793a\u66f4\u6539 ^ \u548c $ \u7684 \u542b\u4e49\uff0c\u4f7f\u5b83\u4eec\u5206\u522b\u5728\u4efb\u610f\u4e00\u884c\u7684\u884c\u9996\u548c\u884c\u5c3e\u5339\u914d\uff0c\u800c\u4e0d\u4ec5\u4ec5\u5728\u6574\u4e2a\u5b57\u7b26\u4e32\u7684\u5f00\u5934\u548c\u7ed3\u5c3e\u5339\u914d\u3002(\u5728\u6b64\u6a21\u5f0f\u4e0b, $ \u7684\u7cbe\u786e\u542b\u610f\u662f:\u5339\u914d\\n \u4e4b\u524d\u7684\u4f4d\u7f6e\u4ee5\u53ca\u5b57\u7b26\u4e32\u7ed3\u675f\u524d\u7684\u4f4d\u7f6e.)"),l.createElement("li",null,"(?x)\uff1a\u8868\u793a\u5982\u679c\u52a0\u4e0a\u8be5\u4fee\u9970\u7b26\uff0c\u8868\u8fbe\u5f0f\u4e2d\u7684\u7a7a\u767d\u5b57\u7b26\u5c06\u4f1a\u88ab\u5ffd\u7565\uff0c\u9664\u975e\u5b83\u5df2\u7ecf\u88ab\u8f6c\u4e49\u3002"),l.createElement("li",null,"(?e)\uff1a\u8868\u793a\u672c\u4fee\u9970\u7b26\u4ec5\u4ec5\u5bf9\u4e8e ",l.createElement("code",null,"replacement")," \u6709\u7528\uff0c\u4ee3\u8868\u5728 ",l.createElement("code",null,"replacement")," \u4e2d\u4f5c\u4e3a ",l.createElement("code",null,"PHP")," \u4ee3\u7801\u3002"),l.createElement("li",null,'(?A)\uff1a\u8868\u793a\u5982\u679c\u4f7f\u7528\u8fd9\u4e2a\u4fee\u9970\u7b26\uff0c\u90a3\u4e48\u8868\u8fbe\u5f0f\u5fc5\u987b\u662f\u5339\u914d\u7684\u5b57\u7b26\u4e32\u4e2d\u7684\u5f00\u5934\u90e8\u5206\u3002\u6bd4\u5982\u8bf4"/a/A"\u5339\u914d"abcd"\u3002'),l.createElement("li",null,'(?E)\uff1a\u4e0e"m"\u76f8\u53cd\uff0c\u8868\u793a\u5982\u679c\u4f7f\u7528\u8fd9\u4e2a\u4fee\u9970\u7b26\uff0c\u90a3\u4e48"$"\u5c06\u5339\u914d\u7edd\u5bf9\u5b57\u7b26\u4e32\u7684\u7ed3\u5c3e\uff0c\u800c\u4e0d\u662f\u6362\u884c\u7b26\u524d\u9762\uff0c\u9ed8\u8ba4\u5c31\u6253\u5f00\u4e86\u8fd9\u4e2a\u6a21\u5f0f\u3002'),l.createElement("li",null,'(?U)\uff1a\u8868\u793a\u548c\u95ee\u53f7\u7684\u4f5c\u7528\u5dee\u4e0d\u591a\uff0c\u7528\u4e8e\u8bbe\u7f6e"\u8d2a\u5a6a\u6a21\u5f0f"\u3002')),l.createElement("h2",{id:"\u793a\u4f8b"},l.createElement(a.AnchorLink,{to:"#\u793a\u4f8b","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u793a\u4f8b")),l.createElement(r.default,c.default["reg-exp-demo"].previewerProps,l.createElement(o,null)))))}}]);