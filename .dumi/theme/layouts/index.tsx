import React, { useState, useRef, useReducer, useEffect } from 'react';
import { Layout, Breadcrumb, Anchor } from 'antd';
import Footer from '../components/footer';
import Header from '../components/header';
import Menu from '../components/menu';
import AnchorList from '../components/anchor-list';

import './index.scss';

const { Content, Sider } = Layout;
const { Link } = Anchor;

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  let containerRef = useRef(null);

  useEffect(() => {
    forceUpdate();
  }, []);

  const handleCollapse = collapsed => setCollapsed(collapsed);

  const handleGetContainer = () => containerRef.current;

  return (
    <Layout>
      <Header />
      <Content>
        <Layout className="site-layout-background layout" style={{ flex: 1 }}>
          <Sider
            className="site-layout-background layout-sider"
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            width={300}
          >
            <Menu />
          </Sider>
          <Content className="layout-content">
            <div ref={containerRef} className="layout-content-container">
              <div className="layout-content-container-pageContent">
                <Breadcrumb>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div>Content</div>
              </div>

              <AnchorList
                offsetTop={30}
                getContainer={containerRef.current && handleGetContainer}
              />
            </div>
            <Footer />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
