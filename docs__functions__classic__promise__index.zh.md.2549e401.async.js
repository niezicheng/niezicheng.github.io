(self["webpackChunkdocs_dumi"]=self["webpackChunkdocs_dumi"]||[]).push([[736],{22231:function(e,n,l){"use strict";l.d(n,{m:function(){return t.m}});var t=l(9684);l(72255)},75966:function(e,n,l){"use strict";l.r(n);var t=l(67294),r=l(96089),a=l(86003),c=l(65659),o=l(45139),m=t.memo(o.default["promise.zh-demo"].component),s=t.memo(o.default["promise.zh-demo-1"].component);n["default"]=e=>(t.useEffect((()=>{var n;null!==e&&void 0!==e&&null!==(n=e.location)&&void 0!==n&&n.hash&&r.AnchorLink.scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),t.createElement(t.Fragment,null,t.createElement(t.Fragment,null,t.createElement("div",{className:"markdown"},t.createElement("h2",{id:"promise"},t.createElement(r.AnchorLink,{to:"#promise","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"Promise"),t.createElement("blockquote",null,t.createElement("p",null,"\u901a\u4fd7\u6765\u8bb2\uff0c",t.createElement("code",null,"Promise")," \u6240\u505a\u7684\u5c31\u662f\u5c06\u5c42\u5c42\u5d4c\u5957\u56de\u8c03\u6539\u53d8\u4e3a\u94fe\u5f0f\u8c03\u7528\u7684\u5f62\u5f0f\uff0c\u589e\u52a0\u53ef\u8bfb\u6027\u548c\u53ef\u7ef4\u62a4\u6027")),t.createElement("h3",{id:"promise-\u6d41\u7a0b\u8c03\u7528"},t.createElement(r.AnchorLink,{to:"#promise-\u6d41\u7a0b\u8c03\u7528","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"Promise \u6d41\u7a0b\u8c03\u7528"),t.createElement("ul",null,t.createElement("li",null,t.createElement("code",null,"Promise")," \u7684\u6784\u9020\u65b9\u6cd5\u63a5\u6536\u4e00\u4e2a ",t.createElement("code",null,"executor()"),"(\u6267\u884c\u5668)\uff0c\u5728 ",t.createElement("code",null,"new Promise()")," \u65f6\u5c31\u7acb\u523b\u6267\u884c\u8fd9\u4e2a ",t.createElement("code",null,"executor")," \u56de\u8c03"),t.createElement("li",null,t.createElement("code",null,"executor()")," \u5185\u90e8\u7684\u5f02\u6b65\u4efb\u52a1\u88ab\u653e\u5165\u5b8f/\u5fae\u4efb\u52a1\u961f\u5217\uff0c\u7b49\u5f85\u6267\u884c"),t.createElement("li",null,t.createElement("code",null,"then()")," \u88ab\u6267\u884c\uff0c\u6536\u96c6\u6210\u529f/\u5931\u8d25\u56de\u8c03\uff0c\u653e\u5165\u6210\u529f/\u5931\u8d25\u961f\u5217"),t.createElement("li",null,t.createElement("code",null,"executor()")," \u7684\u5f02\u6b65\u4efb\u52a1\u88ab\u6267\u884c\uff0c\u89e6\u53d1 ",t.createElement("code",null,"resolve/reject"),"\uff0c\u4ece\u6210\u529f/\u5931\u8d25\u961f\u5217\u4e2d\u53d6\u51fa\u56de\u8c03\u4f9d\u6b21\u6267\u884c")),t.createElement("blockquote",null,t.createElement("p",null,"\u5f02\u6b65\u89e6\u53d1 ",t.createElement("code",null,"_resolve")," -> ",t.createElement("code",null,"then")," \u6536\u96c6\u56de\u8c03\u6267\u884c\u51fd\u6570 -> \u6267\u884c ",t.createElement("code",null,"_resolve")," -> \u53d6\u51fa\u961f\u5217\u6536\u96c6\u56de\u8c03\u51fd\u6570\u4f9d\u6b21\u6267\u884c")),t.createElement("h3",{id:"promise-a\u89c4\u8303"},t.createElement(r.AnchorLink,{to:"#promise-a\u89c4\u8303","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"Promise A+\u89c4\u8303"),t.createElement("p",null,t.createElement(r.Link,{to:"https://promisesaplus.com/"},"Promise A+\u89c4\u8303")),t.createElement("blockquote",null,t.createElement("ol",null,t.createElement("li",null,t.createElement("code",null,"Promise")," \u672c\u8d28\u662f\u4e00\u4e2a\u72b6\u6001\u673a\uff0c\u4e14\u72b6\u6001\u53ea\u80fd\u4e3a\u4ee5\u4e0b\u4e09\u79cd\uff1a",t.createElement("code",null,"Pending"),"\uff08\u7b49\u5f85\u6001\uff09\u3001",t.createElement("code",null,"Fulfilled"),"\uff08\u6267\u884c\u6001\uff09\u3001",t.createElement("code",null,"Rejected"),"\uff08\u62d2\u7edd\u6001\uff09\uff0c\u72b6\u6001\u7684\u53d8\u66f4\u662f\u5355\u5411\u7684\uff0c\u53ea\u80fd\u4ece",t.createElement("code",null,"Pending")," -> ",t.createElement("code",null,"Fulfilled")," \u6216 ",t.createElement("code",null,"Pending")," -> ",t.createElement("code",null,"Rejected"),"\uff0c\u72b6\u6001\u53d8\u66f4\u4e0d\u53ef\u9006"),t.createElement("li",null,t.createElement("code",null,"then")," \u65b9\u6cd5\u63a5\u6536\u4e24\u4e2a\u53ef\u9009\u53c2\u6570\uff0c\u5206\u522b\u5bf9\u5e94\u72b6\u6001\u6539\u53d8\u65f6\u89e6\u53d1\u7684\u56de\u8c03\u3002",t.createElement("code",null,"then")," \u65b9\u6cd5\u8fd4\u56de\u4e00\u4e2a ",t.createElement("code",null,"promise"),"\u3002",t.createElement("code",null,"then")," \u65b9\u6cd5\u53ef\u4ee5\u88ab\u540c\u4e00\u4e2a ",t.createElement("code",null,"promise")," \u8c03\u7528\u591a\u6b21"))),t.createElement("h3",{id:"\u9759\u6001\u65b9\u6cd5"},t.createElement(r.AnchorLink,{to:"#\u9759\u6001\u65b9\u6cd5","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"\u9759\u6001\u65b9\u6cd5"),t.createElement("h4",{id:"promiseresolve"},t.createElement(r.AnchorLink,{to:"#promiseresolve","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"Promise.resolve()"),t.createElement("ul",null,t.createElement("li",null,t.createElement("p",null,"\u53c2\u6570\u7c7b\u578b"),t.createElement("ol",null,t.createElement("li",null,"Promise \u5b9e\u4f8b \u3010\u8fd4\u56de\u8fd9\u4e2a ",t.createElement("code",null,"Promise")," \u5bf9\u8c61\u3011"),t.createElement("li",null,"thenable \u5bf9\u8c61 \u3010",t.createElement("code",null,"thenable")," \u5bf9\u8c61\u6307\u7684\u662f\u5177\u6709 then \u65b9\u6cd5\u7684\u5bf9\u8c61\u3011"),t.createElement("li",null,"\u5176\u4ed6\u7c7b\u578b\u6216\u4e0d\u5b58\u5728 \u3010\u8fd4\u56de\u4e00\u4e2a ",t.createElement("code",null,"fulfilled")," \u72b6\u6001\u7684\u65b0 ",t.createElement("code",null,"Promise")," \u5bf9\u8c61\u3011"))),t.createElement("li",null,t.createElement("p",null,"\u53c2\u6570\u7c7b\u578b\u7b2c 2 \u70b9\u8bf4\u660e:"),t.createElement("blockquote",null,t.createElement("p",null,t.createElement("code",null,"Promise.resolve")," \u65b9\u6cd5\u4f1a\u5c06\u8fd9\u4e2a ",t.createElement("code",null,"thenable")," \u5bf9\u8c61\u8f6c\u4e3a ",t.createElement("code",null,"Promise")," \u5bf9\u8c61,\u7136\u540e\u5c31\u7acb\u5373\u6267\u884c\u8fd9\u4e2a ",t.createElement("code",null,"thenable")," \u5bf9\u8c61\u7684 ",t.createElement("code",null,"then")," \u65b9\u6cd5")))),t.createElement("h5",{id:"promiseall"},t.createElement(r.AnchorLink,{to:"#promiseall","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"Promise.all()"),t.createElement("ul",null,t.createElement("li",null,t.createElement("p",null,"\u51fd\u6570\u53c2\u6570"),t.createElement("p",null,"\u53c2\u6570\u4e3a\u591a\u4e2a ",t.createElement("code",null,"Promise")," \u5b9e\u4f8b\u5bf9\u8c61\u7ec4\u6210\u7684\u6570\u7ec4")),t.createElement("li",null,t.createElement("p",null,"\u53c2\u6570\u8bf4\u660e"),t.createElement("ol",null,t.createElement("li",null,"\u5c06\u591a\u4e2a ",t.createElement("code",null,"Promise")," \u5b9e\u4f8b,\u5305\u88c5\u6210\u4e00\u4e2a\u65b0\u7684 ",t.createElement("code",null,"Promise")," \u5b9e\u4f8b, \u5e76\u8fd4\u56de"),t.createElement("li",null,"\u82e5\u53c2\u6570\u6570\u7ec4\u4e2d\u7684\u6240\u6709 ",t.createElement("code",null,"Promise")," \u5b9e\u4f8b\u72b6\u6001\u4e3a ",t.createElement("code",null,"fulfilled")," \u65f6, \u8fd4\u56de\u65b0\u7684 ",t.createElement("code",null,"Promise")," \u5b9e\u4f8b, ",t.createElement("code",null,"then")," \u4e2d\u6210\u529f\u56de\u8c03\u51fd\u6570\u8fd4\u56de\u7ed3\u679c\u4e3a\u6570\u7ec4\u4e2d\u5404 ",t.createElement("code",null,"Promise")," \u8fd4\u56de\u7ed3\u679c\u7ec4\u6210\u7684\u6570\u7ec4"),t.createElement("li",null,"\u82e5\u53c2\u6570\u6570\u7ec4\u4e2d\u78b0\u5230\u6709 ",t.createElement("code",null,"Promise")," \u5b9e\u4f8b\u72b6\u6001\u4e3a ",t.createElement("code",null,"rejected")," \u65f6,\u65e0\u9700\u518d\u770b\u6570\u7ec4\u540e\u9762 ",t.createElement("code",null,"Promise")," \u5b9e\u4f8b\u72b6\u6001, \u76f4\u63a5\u8fd4\u56de\u65b0\u7684 ",t.createElement("code",null,"Promise")," \u5b9e\u4f8b\uff0c",t.createElement("code",null,"catch")," \u4e2d\u5931\u8d25\u56de\u8c03\u51fd\u6570\u8fd4\u56de\u7ed3\u679c\u4e3a\u8be5\u4e2d\u5404 ",t.createElement("code",null,"Promise")," \u8fd4\u56de\u7ed3\u679c\u7ec4\u6210\u7684\u6570\u7ec4"))))),t.createElement(a.default,o.default["promise.zh-demo"].previewerProps,t.createElement(m,null)),t.createElement("div",{className:"markdown"},t.createElement("h5",{id:"promiserace"},t.createElement(r.AnchorLink,{to:"#promiserace","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"Promise.race()"),t.createElement("ul",null,t.createElement("li",null,t.createElement("p",null,"\u51fd\u6570\u53c2\u6570"),t.createElement("p",null,"\u53c2\u6570\u4e3a\u591a\u4e2a ",t.createElement("code",null,"Promise")," \u5b9e\u4f8b\u5bf9\u8c61\u7ec4\u6210\u7684\u6570\u7ec4")),t.createElement("li",null,t.createElement("p",null,"\u53c2\u6570\u8bf4\u660e"),t.createElement("ol",null,t.createElement("li",null,"\u5c06\u591a\u4e2a ",t.createElement("code",null,"Promise")," \u5b9e\u4f8b,\u5305\u88c5\u6210\u4e00\u4e2a\u65b0\u7684 ",t.createElement("code",null,"Promise")," \u5b9e\u4f8b, \u5e76\u8fd4\u56de"),t.createElement("li",null,"\u8fd4\u56de\u53c2\u6570 ",t.createElement("code",null,"promise")," \u5b9e\u4f8b\u6570\u7ec4\u4e2d\u6267\u884c\u8fd4\u56de\u7ed3\u679c\u6700\u5feb\u7684 ",t.createElement("code",null,"Promise")," \u5bf9\u8c61\u4fe1\u606f"))))),t.createElement(a.default,o.default["promise.zh-demo-1"].previewerProps,t.createElement(s,null)),t.createElement("div",{className:"markdown"},t.createElement("h3",{id:"\u6e90\u7801"},t.createElement(r.AnchorLink,{to:"#\u6e90\u7801","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"\u6e90\u7801"),t.createElement(c.Z,{code:"//Promise/A+\u89c4\u8303\u7684\u4e09\u79cd\u72b6\u6001\n// \u7b49\u5f85\u6001\nconst PENDING = 'pending';\n\n// \u6267\u884c\u6001\nconst FULFILLED = 'fulfilled';\n\n// \u62d2\u7edd\u6001\nconst REJECTED = 'rejected';\n\nclass MyPromise {\n  // Promise \u72b6\u6001\n  _status: string;\n\n  // \u50a8\u5b58 then \u65b9\u6cd5\u56de\u8c03\u8fd4\u56de\u503c\n  _value: any;\n\n  // then \u65b9\u6cd5\u6536\u96c6\u7684\u6267\u884c\u6210\u529f\u7684\u56de\u8c03\u961f\u5217\n  _resolveQueue: any[];\n\n  // then \u65b9\u6cd5\u6536\u96c6\u7684\u6267\u884c\u5931\u8d25\u7684\u56de\u8c03\u961f\u5217\n  _rejectQueue: any[];\n\n  // \u6784\u9020\u65b9\u6cd5\u63a5\u53d7\u4e00\u4e2a\u56de\u8c03\u6267\u884c\u51fd\u6570\n  constructor(executor: any) {\n    this._status = PENDING;\n    this._value = undefined;\n    this._resolveQueue = [];\n    this._rejectQueue = [];\n\n    let _resolve = (val: any) => {\n      // \u4f7f\u7528 setTimeout \u5305\u88f9\uff0c\u517c\u5bb9 executor \u540c\u6b65\u4ee3\u7801\u60c5\u51b5, \u9700\u4fdd\u8bc1 callback() \u5728 then \u4e2d\u6536\u96c6\n      setTimeout(() => {\n        if (this._status !== PENDING) {\n          return;\n        }\n\n        this._status = FULFILLED;\n        this._value = val;\n\n        // \u5b9e\u73b0\u89c4\u8303\u8981\u6c42\u4e2d then \u65b9\u6cd5\u7684\u53ef\u4ee5\u94fe\u5f0f\u8c03\u7528\n        while (this._resolveQueue?.length) {\n          const callback = this._resolveQueue.shift();\n          callback(val);\n        }\n      });\n    };\n\n    let _reject = (val: any) => {\n      setTimeout(() => {\n        if (this._status !== PENDING) {\n          return;\n        }\n\n        this._status = REJECTED;\n        this._value = val;\n\n        while (this._rejectQueue?.length) {\n          const callback = this._rejectQueue.shift();\n          callback(val);\n        }\n      });\n    };\n\n    // new Promise()\u65f6\u7acb\u5373\u6267\u884c executor,\u5e76\u4f20\u5165 resolve \u548c reject\n    executor(_resolve, _reject);\n  }\n\n  /**\n   * Promise \u94fe\u5f0f\u8c03\u7528\u51fd\u6570\n   * @param resolveFn \u6210\u529f\u56de\u8c03\u51fd\u6570\n   * @param rejectFn \u5931\u8d25\u56de\u8c03\u51fd\u6570\n   */\n  then(resolveFn: any, rejectFn: any) {\n    // \u5ffd\u7565 then \u4e0d\u4e3a\u51fd\u6570\u7c7b\u578b\uff0c\u4fdd\u8bc1 then \u65b9\u6cd5\u94fe\u5f0f\u8c03\u7528\u7684\u6267\u884c\n    typeof resolveFn !== 'function'\n      ? (resolveFn = (value: any) => value)\n      : null;\n    typeof rejectFn !== 'function'\n      ? (rejectFn = (reason: Error) => {\n          throw new Error(reason instanceof Error ? reason.message : reason);\n        })\n      : null;\n\n    // \u8fd4\u56de\u4e00\u4e2a\u65b0\u7684 Promise \u5bf9\u8c61\n    return new MyPromise((resolve: any, reject: any) => {\n      // \u5c01\u88c5 resolveFn \u65b9\u6cd5\uff0c\u4fbf\u4e8e\u5bf9\u56de\u8c03\u4e0d\u540c\u7c7b\u578b\u8fd4\u56de\u503c\u8fdb\u884c\u5904\u7406\n      const fulfilledFn = (value: any) => {\n        try {\n          // \u83b7\u53d6\u5f53\u524d resolveFn \u56de\u8c03\u51fd\u6570\u8fd4\u56de\u503c\n          let x = resolveFn(value);\n          // \u6839\u636e\u8fd4\u56de\u503c\u7c7b\u578b\u6267\u884c\u5bf9\u5e94\u51fd\u6570\u56de\u8c03\n          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);\n        } catch (error) {\n          reject(error);\n        }\n      };\n\n      const rejectedFn = (error: any) => {\n        try {\n          let x = rejectFn(error);\n          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);\n        } catch (error) {\n          reject(error);\n        }\n      };\n\n      switch (this._status) {\n        case PENDING:\n          // \u6536\u96c6 then \u6267\u884c\u6210\u529f\u7684\u56de\u8c03\uff0c\u4fdd\u8bc1\u94fe\u5f0f\u8c03\u7528\u7684\u987a\u5e8f\u6267\u884c\n          this._resolveQueue.push(fulfilledFn);\n          this._rejectQueue.push(rejectedFn);\n          break;\n        // \u5f53\u72b6\u6001\u5df2\u7ecf\u53d8\u4e3a resolve/reject \u65f6,\u76f4\u63a5\u6267\u884cthen\u56de\u8c03\n        case FULFILLED:\n          fulfilledFn(this._value);\n          break;\n        case REJECTED:\n          rejectedFn(this._value);\n          break;\n      }\n    });\n  }\n\n  /**\n   * \u5931\u8d25\u8c03\u7528\u51fd\u6570\n   * @param rejectFn \u5931\u8d25\u56de\u8c03\u51fd\u6570\n   */\n  catch(rejectFn: any) {\n    return this.then(undefined, rejectFn);\n  }\n\n  /**\n   * finally\n   * @param callback \u56de\u8c03\u51fd\u6570\n   */\n  finally(callback: any) {\n    return this.then(\n      (value: any) => MyPromise.resolve(callback).then(() => value, undefined),\n      (reason: any) =>\n        MyPromise.resolve(callback).then(() => {\n          throw reason;\n        }, undefined),\n    );\n  }\n\n  /**\n   * \u9759\u6001\u7684resolve\u65b9\u6cd5\n   * @param value\n   */\n  static resolve(value: any) {\n    // \u6839\u636e\u89c4\u8303, \u5982\u679c\u53c2\u6570\u662f Promise \u5b9e\u4f8b, \u76f4\u63a5\u8fd4\u56de\u8fd9\u4e2a\u5b9e\u4f8b\n    if (value instanceof MyPromise) {\n      return value;\n    }\n    return new MyPromise((resolve: any) => resolve(value));\n  }\n\n  /**\n   * \u9759\u6001\u7684reject\u65b9\u6cd5\n   * @param reason\n   */\n  static reject(reason: any) {\n    return new MyPromise((resolve: any, reject: any) => reject(reason));\n  }\n\n  /**\n   * all\n   * @param promiseArray promise \u5b9e\u4f8b\u6570\u7ec4\n   */\n  static all(promiseArray: any) {\n    let index = 0;\n    let result: any[] = [];\n    return new MyPromise((resolve: any, reject: any) => {\n      promiseArray.forEach((p: any, i: number) => {\n        MyPromise.resolve(p).then(\n          (val: any) => {\n            index++;\n            result[i] = val;\n            // \u6240\u6709 then \u6267\u884c\u540e resolve \u7ed3\u679c\n            if (index === promiseArray.length) {\n              resolve(result);\n            }\n          },\n          (error: any) => {\n            // \u6709\u4e00\u4e2aPromise\u88abreject\u65f6\uff0cMyPromise\u7684\u72b6\u6001\u53d8\u4e3areject\n            reject(error);\n          },\n        );\n      });\n    });\n  }\n\n  /**\n   * race\n   * @param promiseArray promise \u5b9e\u4f8b\u6570\u7ec4\n   */\n  static race(promiseArray: any) {\n    return new MyPromise((resolve: any, reject: any) => {\n      for (let p of promiseArray) {\n        MyPromise.resolve(p).then(\n          (value: any) => {\n            resolve(value);\n          },\n          (error: any) => {\n            reject(error);\n          },\n        );\n      }\n    });\n  }\n}\n\nexport default MyPromise;",lang:"ts"})))))}}]);