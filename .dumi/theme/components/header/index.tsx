import React, { useContext } from 'react';
import { context } from 'dumi/theme';
import SearchBar from './search-bar';
import Nav from './nav-bar';

import './index.scss';

export default () => {
  const { config } = useContext(context);

  return (
    <div className="layout-header">
      <div className="layout-header-left">
        <img
          className="layout-header-logo"
          src={config.logo as string}
          alt="logo"
        />
        <span className="layout-header-title">{config.title}</span>
      </div>

      <div className="layout-header-right">
        <SearchBar />
        <Nav />
      </div>
    </div>
  );
};
