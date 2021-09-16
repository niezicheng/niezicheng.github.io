import React from 'react';
import { Anchor } from 'antd';

import './index.sass';

const { Link } = Anchor;

export default props => {
  return (
    <Anchor {...props}>
      <Link href="#components-anchor-demo-basic" title="Basic demo" />
      <Link href="#components-anchor-demo-static" title="Static demo" />
      <Link href="#API" title="API">
        <Link href="#Anchor-Props" title="Anchor Props" />
        <Link href="#Link-Props" title="Link Props" />
      </Link>
    </Anchor>
  );
};
