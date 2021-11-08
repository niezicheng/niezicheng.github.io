import React, { useContext } from 'react';
import { context } from 'dumi/theme';
import { Space, Popover } from 'antd';
import MediaQuery from 'react-responsive';
import SearchBar from './search-bar';
import Nav from './nav-bar';
import Icon from '../Icon';
import { MOBILE_DEVICE, BRAND_COLOR } from '../../utils/constant';

import './index.scss';

export default () => {
  const { config } = useContext(context);

  return (
    <div className="layout-header">
      <a href="/" className="layout-header-left">
        <img
          className="layout-header-logo"
          src={config.logo as string}
          alt="logo"
        />
        <MediaQuery minWidth={MOBILE_DEVICE + 1}>
          <span className="layout-header-title">{config.title}</span>
        </MediaQuery>
        <MediaQuery minWidth={376} maxWidth={MOBILE_DEVICE}>
          <span className="layout-header-title">
            {config.title?.split(' ').splice(-1)[0]}
          </span>
        </MediaQuery>
      </a>

      <div className="layout-header-right">
        <MediaQuery minWidth={MOBILE_DEVICE + 1}>
          <Space size="large">
            <SearchBar />
            <Nav />
          </Space>
        </MediaQuery>
        <MediaQuery maxWidth={MOBILE_DEVICE}>
          <Space size="middle">
            <SearchBar />
            <Popover content={<Nav />}>
              <Icon type="nav-menu" color={BRAND_COLOR} />
            </Popover>
          </Space>
        </MediaQuery>
      </div>
    </div>
  );
};
