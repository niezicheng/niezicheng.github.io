import React from 'react';
import { Button } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { map } from 'lodash';
import { dataSource } from './data';
import './index.scss';

const StartedPage = () => {
  return (
    <div className="started-page">
      <Button type="link" href="https://zhuanlan.zhihu.com/p/64649254">
        互联网圈内常用的名词
        <DoubleRightOutlined />
      </Button>
      {map(dataSource, (card, key) => (
        <div key={key} className="card">
          <div className="card-title">{card?.title}</div>
          <div className="card-body">
            {map(card?.data, (item, i) => (
              <div key={i} className="card-body-item">
                <div className="card-body-item-name">
                  <span className="short-name">{item?.shortName}</span>
                  <span className="english-name">{`「${item?.englishName}」`}</span>
                  <span className="chinese-name">{item?.chineseName}</span>
                </div>
                {item?.desc && (
                  <div className="card-body-item-desc">{`描述：${item?.desc}`}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StartedPage;
