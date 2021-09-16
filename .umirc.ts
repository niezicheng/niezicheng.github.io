import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  title: '清香的 orange',
  favicon:
    'https://avatars.githubusercontent.com/u/48236720?s=400&u=bdce783b4cef8916cf5732b0d5f249c573ad6b69&v=4',
  logo:
    'https://avatars.githubusercontent.com/u/48236720?s=400&u=bdce783b4cef8916cf5732b0d5f249c573ad6b69&v=4',
  outputPath: 'dist',
  alias: {
    'react-native': path.resolve(__dirname, 'node_modules', 'react-native-web'),
  },
  define: {
    __DEV__: false,
  },
  exportStatic: {}, // 不建议用 hash 路由，锚点会不好用，开启 exportStatic: {} 就可以保证刷新页面也能访问了
  mfsu: {},
  webpack5: {}, // 使用 webpack 5 代替 webpack 4 进行构建
  dynamicImport: {}, // 是否启用按需加载
  hash: true,
  mode: 'site',
  resolve: {
    passivePreview: true,
    previewLangs: ['tsx', 'jsx'],
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'JavaScript',
      path: 'https://tsejx.github.io/javascript-guidebook/',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/niezicheng/article-dumi',
    },
    {
      title: 'JueJin',
      path: 'https://juejin.cn/user/2946346894759319/columns',
    },
  ],

  sass: {
    implementation: require('node-sass'),
    sassOptions: {
      data: '@import "./.dumi/theme/styles/theme.scss";',
    },
  },
});
