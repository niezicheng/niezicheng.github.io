import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'blog-docs',
  favicon: 'https://avatars.githubusercontent.com/u/48236720?s=400&u=bdce783b4cef8916cf5732b0d5f249c573ad6b69&v=4',
  logo: 'https://avatars.githubusercontent.com/u/48236720?s=400&u=bdce783b4cef8916cf5732b0d5f249c573ad6b69&v=4',
  outputPath: 'dist',
  mode: 'site',
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi',
    },
  ],
});
