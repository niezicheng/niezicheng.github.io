import React, { useContext } from 'react';
import { Space } from 'antd';
import { context } from 'dumi/theme';
import { map, filter, get } from 'lodash';
import Icon from '../../Icon';
import './index.scss';

type NavItem = {
  title: string;
  path: string;
  order?: number;
};

const mapTitleToIcon = {
  GitHub: <Icon svg name="github" />,
  JueJin: <Icon svg name="blog" size={22} color="#2080ff" />,
  YuQue: <Icon svg name="yuque" />,
  JavaScript: <Icon svg name="js" color="#ffca26" />,
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