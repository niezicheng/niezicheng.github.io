import React from 'react';
import { map } from 'lodash';
import { source } from './data';
import './index.scss';

const Home = props => {
  const {
    meta: { features = [], hero = {} },
    children,
  } = props;

  return (
    <div className="home">
      <div className="home-container">
        {/* 网站头部展示 */}
        <div className="home-hero">
          <div className="home-hero-title">{hero?.title}</div>
          <div dangerouslySetInnerHTML={{ __html: hero?.desc }}></div>
          {map(hero?.actions, (action, key) => (
            <a href={action?.link} key={key} className="action-item">
              {action?.text}
            </a>
          ))}
        </div>
        {/* 自身网站特点描述 */}
        <div className="home-features">
          {map(features, (feature, key) => (
            <div key={key} className="feature-item">
              <img src={feature?.icon} />
              <div className="feature-item-title">{feature?.title}</div>
              <div dangerouslySetInnerHTML={{ __html: feature?.desc }}></div>
            </div>
          ))}
        </div>
        {/* blog、资源类网站展示 */}
        {map(source, ({ title, isImg = false, column = 4, data }) => (
          <>
            <h2>{title}</h2>
            <div className="card">
              {map(data, ({ id, href, name, imgUrl }) => (
                <div
                  key={id}
                  className="card-item"
                  style={{ width: `${100 / column}%` }}
                >
                  <a href={href} target="_blank">
                    {isImg ? (
                      <img src={imgUrl} />
                    ) : (
                      <div className="card-item-top">
                        <img src={imgUrl} />
                      </div>
                    )}
                    <div className="card-item-title">{name}</div>
                  </a>
                </div>
              ))}
            </div>
          </>
        ))}

        {children}
      </div>
    </div>
  );
};

export default Home;
