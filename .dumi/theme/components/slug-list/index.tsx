import React from 'react';
import { Anchor } from 'antd';
import { map } from 'lodash';

import './index.scss';

const { Link } = Anchor;

export default props => {
  const { slugs = [] } = props;

  // 过滤出一级或二级文档标题
  const slugsList = slugs.filter(slug => {
    return slug.depth <= 2;
  });

  return (
    <Anchor>
      {map(slugsList, (slug, index) => (
        <Link
          key={index}
          href={`#${slug.heading}`}
          title={slug?.value?.toLowerCase()}
        />
      ))}
    </Anchor>
  );
};
