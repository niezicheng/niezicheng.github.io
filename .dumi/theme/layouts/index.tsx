import React, { useState, useRef, useContext } from 'react';
import { Layout, Breadcrumb, Affix } from 'antd';
import { context } from 'dumi/theme';
import MediaQuery from 'react-responsive';
import Drawer from 'rc-drawer';
import Header from '../components/header';
import Footer from '../components/footer';
import SlidMenu from '../components/slid-menu';
import SlugList from '../components/slug-list';
import Icon from '../components/Icon';
import Home from './home';
import StartedPage from './started-page';
import { MIN_SCREEN, MID_SCREEN } from '../utils/constant';

import 'rc-drawer/assets/index.css';
import './index.scss';
import '../styles/markdown.scss';

const { Content, Sider } = Layout;

export default props => {
  const {
    children,
    route: { routes },
    location,
  } = props;
  const { config } = useContext(context);
  const isHome = location.pathname === '/';
  const isGettingStarted = location.pathname === '/getting-started';

  const [collapsed, setCollapsed] = useState(false);
  const [drawOpen, setDrawOpen] = useState<boolean>(false);
  let containerRef = useRef(null);

  const defaultOpenKeys = [
    location.pathname
      .replace(/^\//, '')
      .split('/')
      .shift(),
  ];
  const defaultSelectedKeys = [location.pathname];

  const meta = routes.find(item => {
    return item.path === children.props.location.pathname;
  })?.meta;

  const handleCollapse = collapsed => setCollapsed(collapsed);

  // 打开抽屉菜单
  const handleOpenDraw = () => {
    setDrawOpen(val => !val);
  };

  return (
    <Layout>
      <Header />
      {isHome ? (
        <Home meta={meta}>{children}</Home>
      ) : (
        <Content>
          <Layout className="site-layout-background layout" style={{ flex: 1 }}>
            <div className="layout-sider">
              <MediaQuery minWidth={MID_SCREEN + 1}>
                <Sider
                  className="site-layout-background"
                  collapsible
                  collapsed={collapsed}
                  onCollapse={handleCollapse}
                  width={300}
                >
                  <SlidMenu
                    menus={config.menus}
                    navs={config.navs}
                    defaultOpenKeys={defaultOpenKeys}
                    defaultSelectedKeys={defaultSelectedKeys}
                  />
                </Sider>
              </MediaQuery>
              <MediaQuery maxWidth={MID_SCREEN}>
                <Drawer
                  handler={
                    <div
                      className="drawer-handle"
                      style={{ display: `${drawOpen ? 'none' : 'block'}` }}
                      onClick={handleOpenDraw}
                    >
                      <Icon
                        className="icon menu-switch"
                        type="drawer-handle"
                        size={16}
                        svg
                      />
                    </div>
                  }
                  open={drawOpen}
                  onClose={() => setDrawOpen(false)}
                >
                  <Sider className="site-layout-background" width={240}>
                    <SlidMenu
                      menus={config.menus}
                      navs={config.navs}
                      defaultOpenKeys={defaultOpenKeys}
                      defaultSelectedKeys={defaultSelectedKeys}
                    />
                  </Sider>
                </Drawer>
              </MediaQuery>
            </div>

            <Content className="layout-content">
              {isGettingStarted ? (
                <StartedPage />
              ) : (
                <div ref={containerRef} className="layout-content-container">
                  <div className="layout-content-container-pageContent">
                    <Breadcrumb separator="/">
                      {/* <Breadcrumb.Item>{config.title}</Breadcrumb.Item> */}
                      {meta?.nav?.title && (
                        <Breadcrumb.Item>{meta?.nav?.title}</Breadcrumb.Item>
                      )}
                      {meta?.group?.title && (
                        <Breadcrumb.Item>{meta?.group?.title}</Breadcrumb.Item>
                      )}
                      {meta?.filePath !== 'docs/index.md' && (
                        <Breadcrumb.Item>{meta?.title}</Breadcrumb.Item>
                      )}
                    </Breadcrumb>
                    <div>{children}</div>
                  </div>
                  <div className="layout-content-container-affix">
                    <MediaQuery minWidth={MIN_SCREEN + 1}>
                      <Affix offsetTop={50} target={() => containerRef.current}>
                        <SlugList slugs={meta?.slugs} />
                      </Affix>
                    </MediaQuery>
                    <MediaQuery maxWidth={MIN_SCREEN}>
                      <Affix offsetTop={0} target={() => containerRef.current}>
                        <SlugList slugs={meta?.slugs} />
                      </Affix>
                    </MediaQuery>
                  </div>
                </div>
              )}
              <MediaQuery minWidth={MID_SCREEN + 1}>
                <Footer />
              </MediaQuery>
            </Content>
          </Layout>
        </Content>
      )}
    </Layout>
  );
};
