import React from 'react';
import { RectAngle } from 'docs-dumi';
import './index.scss';

export default () => {
  return (
    <>
      <div className="container">
        <RectAngle fillColor="#0081ff" />
        <RectAngle type="circle" fillColor="#39b54a" />
        <RectAngle size={40} fillColor="#fbbd08" />
        <RectAngle fillColor="#e54d42" color="#e8f4d9" />
      </div>
      <div className="container">
        <RectAngle position={['top-right', 'bottom-right', 'bottom-left']} />
        <RectAngle position={['top-left', 'bottom-right']} />
        <RectAngle type="circle" position={['top-left']} />
        <RectAngle type="circle" position={['top-right', 'bottom-left']} />
      </div>
      <div className="container">
        <RectAngle
          position={[
            {
              pos: 'top-left',
              color: '#6739b6',
              fillColor: '#0081ff',
              size: 10,
            },
            {
              pos: 'top-right',
              color: '#e03997',
              fillColor: '#39b54a',
              size: 20,
            },
            {
              pos: 'bottom-left',
              color: '#f37b1d',
              fillColor: '#fbbd08',
              size: 30,
              deg: 67,
            },
            {
              pos: 'bottom-right',
              color: '#1cbbb4',
              fillColor: '#e54d42',
              size: 40,
              deg: -58,
            },
          ]}
        />
        <RectAngle
          position={[
            {
              pos: 'top-left',
              fillColor: '#0081ff',
              size: 10,
            },
            {
              pos: 'bottom-left',
              fillColor: '#fbbd08',
              size: 30,
              deg: 67,
            },
            {
              pos: 'bottom-right',
              fillColor: '#e54d42',
              size: 40,
              deg: -58,
            },
          ]}
        />
        <RectAngle
          position={[
            {
              pos: 'top-left',
              fillColor: '#0081ff',
              size: 10,
            },
            {
              pos: 'top-right',
              fillColor: '#39b54a',
              size: 20,
            },
            {
              pos: 'bottom-right',
              fillColor: '#e54d42',
              size: 40,
              deg: -58,
            },
          ]}
        />
        <RectAngle
          position={[
            {
              pos: 'top-left',
              fillColor: '#0081ff',
              size: 10,
            },
            {
              pos: 'top-right',
              fillColor: '#39b54a',
              size: 20,
            },
            {
              pos: 'bottom-left',
              fillColor: '#fbbd08',
              size: 30,
              deg: 67,
            },
          ]}
        />
      </div>
    </>
  );
};
