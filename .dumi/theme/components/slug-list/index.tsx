import React from 'react';
import { Anchor } from 'antd';
import { map } from 'lodash';

import './index.scss';

const { Link } = Anchor;

export default props => {
  const { slugs = [] } = props;

  const slugsList = slugs.filter(slug => {
    return slug.depth <= 2;
  });

  return (
    <Anchor style={{ maxWidth: 300 }}>
      {map(slugsList, (slug, index) => (
        <Link key={index} href={`#${slug.heading}`} title={slug?.value} />
      ))}
    </Anchor>
  );
};
