import React from 'react';
import { htmlTagAddPropContent } from 'docs-dumi';
import 'antd/dist/antd.css';

const html = `
  <p><b>新闻事件一</b></p>
  <img src="https://parana.oss-cn-hangzhou.aliyuncs.com/images/2020/07/20/2cd7e8b2-21e6-40af-8572-a7ce098ddd89.png" style="width: 200px" title="01.png"/>
  <p><b>新闻事件二</b></p>
  <img src="https://parana.oss-cn-hangzhou.aliyuncs.com/images/2020/07/20/2cd7e8b2-21e6-40af-8572-a7ce098ddd89.png" style='' title="01.png"/>
  <p><b>新闻事件三</b></p>
  <img src="https://parana.oss-cn-hangzhou.aliyuncs.com/images/2020/07/20/2cd7e8b2-21e6-40af-8572-a7ce098ddd89.png" style="" title="01.png"/>
  <p><b>新闻事件四</b></p>
  <img src="https://parana.oss-cn-hangzhou.aliyuncs.com/images/2020/07/20/2cd7e8b2-21e6-40af-8572-a7ce098ddd89.png" title="01.png"/>
  `;

export default () => {
  // 图片添加最大宽度 100%
  const htmlImg = htmlTagAddPropContent(
    html,
    'img',
    'style',
    'max-width:100%;height:auto;',
  );
  // 去除 p 标签默认底部外边距
  const htmlP = htmlTagAddPropContent(
    htmlImg,
    'p',
    'style',
    'margin-bottom: 0',
  );

  return <div dangerouslySetInnerHTML={{ __html: htmlP }} />;
};
