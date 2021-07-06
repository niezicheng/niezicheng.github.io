import { defineConfig } from 'dumi';

export default defineConfig({
  title: '清香的 orange',
  favicon: 'https://avatars.githubusercontent.com/u/48236720?s=400&u=bdce783b4cef8916cf5732b0d5f249c573ad6b69&v=4',
  logo: 'https://avatars.githubusercontent.com/u/48236720?s=400&u=bdce783b4cef8916cf5732b0d5f249c573ad6b69&v=4',
  outputPath: 'dist',
  ssr: {
    devServerRender: false
  },
  // 不建议用 hash 路由，锚点会不好用，开启 exportStatic: {} 就可以保证刷新页面也能访问了
  exportStatic: {},
  hash: true,
  mode: 'site',
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/niezicheng/article-dumi',
    },
    {
      title: 'JueJin',
      path: 'https://juejin.cn/user/2946346894759319/columns',
    },
  ],
});
