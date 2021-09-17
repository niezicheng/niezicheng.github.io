import React, { useContext } from 'react';
import { Space } from 'antd';
import { GithubOutlined, YuqueOutlined } from '@ant-design/icons';
import { context } from 'dumi/theme';
import { map, filter, get } from 'lodash';

import './index.scss';

type NavItem = {
  title: string;
  path: string;
  order?: number;
};

const mapTitleToIcon = {
  GitHub: <GithubOutlined />,
  YuQue: <YuqueOutlined />,
};

export default () => {
  const { config } = useContext(context);

  const menusObj = get(config.menus, 'en-US', []);
  const navs = get(config.navs, 'en-US', []);

  // 构建符合递归菜单数据结构同时过滤出配置中的 nav
  const navList: Array<NavItem> = filter(
    navs,
    nav => !get(menusObj, nav?.path),
  ) as Array<NavItem>;

  return (
    <Space size="middle">
      {map(navList, (nav, index) => (
        <a className="header-nav-item" key={index} href={nav.path}>
          {mapTitleToIcon[nav.title] || nav.title}
        </a>
      ))}
    </Space>
  );
};
