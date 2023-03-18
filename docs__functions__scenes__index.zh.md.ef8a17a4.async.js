(self["webpackChunkdocs_dumi"]=self["webpackChunkdocs_dumi"]||[]).push([[6666],{24506:function(n,e,r){"use strict";r.r(e);var t=r(67294),s=r(96089),o=r(65659);r(45139);e["default"]=n=>(t.useEffect((()=>{var e;null!==n&&void 0!==n&&null!==(e=n.location)&&void 0!==e&&e.hash&&s.AnchorLink.scrollToAnchor(decodeURIComponent(n.location.hash.slice(1)))}),[]),t.createElement(t.Fragment,null,t.createElement("div",{className:"markdown"},t.createElement("h3",{id:"\u63a7\u5236-promise-\u5e76\u53d1\u8bf7\u6c42\u6570\u91cf"},t.createElement(s.AnchorLink,{to:"#\u63a7\u5236-promise-\u5e76\u53d1\u8bf7\u6c42\u6570\u91cf","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"\u63a7\u5236 Promise \u5e76\u53d1\u8bf7\u6c42\u6570\u91cf"),t.createElement(o.Z,{code:"/**\n * @param promiseArr \u8bf7\u6c42\u8fd4\u56de\u7684 promise \u6570\u7ec4\n * @param maxNum \u540c\u65f6\u5e76\u884c\u5904\u7406\u7684\u6700\u5927 promise \u6570\n * @returns \u6240\u6709\u8bf7\u6c42\u7ed3\u679c promise \u5bf9\u8c61\n */\nconst multiRequest = (promiseArr, maxNum) => {\n  const total = promiseArr?.length; // \u603b\u7684\u8bf7\u6c42 promise \u6570\u91cf\n  const res = new Array(total).fill(null); // \u5b58\u50a8\u5bf9\u5e94\u8bf7\u6c42\u7ed3\u679c\n\n  let finishNum = 0; // \u5df2\u5b8c\u6210\u8bf7\u6c42\u6570\n  let sendNum = 0; // \u5df2\u53d1\u9001\u8bf7\u6c42\u6570\n\n  return new Promise(resolve => {\n    // \u5e76\u884c\u6267\u884c\u89c4\u5b9a\u6570\u76ee\u8bf7\u6c42\n    while (sendNum <= maxNum && sendNum <= total) {\n      next();\n    }\n\n    function next() {\n      // \u5f53\u524d\u6267\u884c\u7684\u8bf7\u6c42\uff0c\u7528\u4e8e\u5b58\u50a8\u5f53\u524d\u8bf7\u6c42\u7ed3\u679c\u5230 res\n      const current = sendNum++;\n\n      // \u6267\u884c\u5f53\u524d\u8bf7\u6c42\n      Promise.resolve(promiseArr[current]).then(\n        data => {\n          finishNum++;\n          res[current] = data;\n          // \u8fd8\u5b58\u5728\u672a\u6267\u884c\u7684\u8bf7\u6c42\u9012\u5f52\u8c03\u7528\u6267\u884c\n          if (current < length) {\n            next();\n          } else {\n            // \u5c06\u7ed3\u679c\u8fd4\u56de\n            resolve(res);\n          }\n        },\n        error => {\n          finishNum++;\n          res[current] = error;\n          if (current < length) {\n            next();\n          } else {\n            resolve(res);\n          }\n        },\n      );\n    }\n  });\n};",lang:"ts"}),t.createElement("p",null,t.createElement(s.Link,{to:"https://www.yisu.com/zixun/454030.html"},"\u600e\u4e48\u5728 JavaScript \u4e2d\u4f7f\u7528 Promise \u63a7\u5236\u5e76\u53d1\u8bf7\u6c42\u4e2a\u6570")))))}}]);