import React, { useState, useRef, useContext } from 'react';
import { Layout, Breadcrumb, Affix } from 'antd';
import { context } from 'dumi/theme';
import Header from '../components/header';
import Footer from '../components/footer';
import SlidMenu from '../components/slid-menu';
import SlugList from '../components/slug-list';

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

  const [collapsed, setCollapsed] = useState(false);
  let containerRef = useRef(null);

  const defaultOpenKeys = [
    location.pathname
      .replace(/^\//, '')
      .split('/')
      .shift(),
  ];
  const defaultSelectedKeys = [location.pathname];

  const { meta } = routes.find(item => {
    return item.path === children.props.location.pathname;
  });

  const handleCollapse = collapsed => setCollapsed(collapsed);

  return (
    <Layout>
      <Header />
      <Content>
        <Layout className="site-layout-background layout" style={{ flex: 1 }}>
          <div className="layout-sider">
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
          </div>

          <Content className="layout-content">
            <div ref={containerRef} className="layout-content-container">
              <div className="layout-content-container-pageContent">
                <Breadcrumb separator="/">
                  {/* <Breadcrumb.Item>{config.title}</Breadcrumb.Item> */}
                  {meta.nav?.title && (
                    <Breadcrumb.Item>{meta.nav?.title}</Breadcrumb.Item>
                  )}
                  {meta.group?.title && (
                    <Breadcrumb.Item>{meta.group?.title}</Breadcrumb.Item>
                  )}
                  <Breadcrumb.Item>{meta.title}</Breadcrumb.Item>
                </Breadcrumb>
                <div>{children}</div>
              </div>
              <div className="layout-content-container-affix">
                <Affix offsetTop={50} target={() => containerRef.current}>
                  <SlugList slugs={meta?.slugs} />
                </Affix>
              </div>
            </div>
            <Footer />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
