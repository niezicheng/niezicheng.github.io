import React, { useCallback } from 'react';
import { Input, Space } from 'antd';
import { debounce, throttle } from 'docs-dumi';
import 'antd/dist/antd.css';

export default () => {
  const InputChange = (val) => {
    console.log('change value---', val);
  }

  const debounceChange = useCallback(debounce(InputChange, 1000), []);

  const throttleChange = useCallback(throttle(InputChange, 1000), []);

  return (
    <>
      <Space direction="vertical" size="large">
        <div>
          <span>正常 input</span>
          <Input
            allowClear
            onChange={(e) => InputChange(e.target.value)}
          />
        </div>
        <div>
          <span>防抖后的 input</span>
          <Input
            allowClear
            onChange={(e) => debounceChange(e.target.value)}
          />
        </div>
        <div>
          <span>节流后的 input</span>
          <Input
            allowClear
            onChange={(e) => throttleChange(e.target.value)}
          />
        </div>
      </Space>
    </>
  )
}
