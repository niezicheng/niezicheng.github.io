import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { get, map, filter } from 'lodash';
import Icon from '../Icon';
import './index.scss';

const { SubMenu } = Menu;

export default props => {
  const {
    menus: propsMenus,
    navs: propsNavs,
    defaultOpenKeys,
    defaultSelectedKeys,
  } = props;

  const menusObj = get(propsMenus, 'en-US', []);
  const navs = get(propsNavs, 'en-US', []);

  // 构建符合递归菜单数据结构同时过滤出配置中的 nav
  const menus = map(
    filter(navs, nav => get(menusObj, nav?.path)),
    nav => ({ ...nav, children: get(menusObj, nav?.path) }),
  );

  // TODO: 递归渲染前需对 menus 数据通过 order 排序进行
  /**
   *
   * @param menus 菜单数据信息
   * @param isFirstSubMenu 是否为一级 subMenu
   * @returns 返回菜单项
   */
  const renderMenus = (menus, isFirstSubMenu) => {
    return map(menus, menu => {
      if (Array.isArray(menu?.children)) {
        return (
          <SubMenu
            className={isFirstSubMenu && 'first-submenu'}
            icon={<Icon type="sub-menu" size={18} style={{ marginRight: 4 }} />}
            key={menu.path.replace(/^\//, '')}
            title={menu.title}
          >
            {renderMenus(menu.children, false)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item
          key={menu.path}
          icon={<Icon type="menu-item" size={18} style={{ marginRight: 4 }} />}
        >
          <Link to={menu.path}>{menu.title}</Link>
        </Menu.Item>
      );
    });
  };

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      style={{ height: '100%' }}
    >
      {renderMenus(menus, true)}
    </Menu>
  );
};
