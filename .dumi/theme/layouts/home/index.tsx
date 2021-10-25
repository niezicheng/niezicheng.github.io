import React from 'react';
import { map } from 'lodash';
import './index.scss';

const Home = props => {
  const {
    meta: { features = [], hero = {} },
    children,
  } = props;

  console.log(props.meta);

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-hero">
          <div className="home-hero-title">{hero?.title}</div>
          <div dangerouslySetInnerHTML={{ __html: hero?.desc }}></div>
          {map(hero?.actions, (action, key) => (
            <a href={action?.link} key={key} className="action-item">
              {action?.text}
            </a>
          ))}
        </div>
        <div className="home-features">
          {map(features, (feature, key) => (
            <div key={key} className="feature-item">
              <img src={feature?.icon} />
              <div className="feature-item-title">{feature?.title}</div>
              <div dangerouslySetInnerHTML={{ __html: feature?.desc }}></div>
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Home;
