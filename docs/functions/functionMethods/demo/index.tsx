import React, { useCallback } from 'react';
import { Button, Space } from 'antd';
import {
  MyNew,
  myBind,
  myCall,
  myApply
} from 'docs-dumi';
import 'antd/dist/antd.css';

const obj ={ a: 10,  b: 20 };

export default () => {
  function test (key1, key2, methodName) {
    console.log(this[key1] + this[key2], methodName)
  }

  test.myBind = myBind;
  test.myCall = myCall;
  test.myApply = myApply;

  const handleNewClick = useCallback(() => {
    function Person (name, age) {
      this.name = name;
      this.age = age;
    }
    const tom = new Person('tom', 20);
    const jerry = MyNew(Person, 'jerry', 18);
    console.log(tom instanceof Person, jerry instanceof Person, '---MyNew');
  }, [])

  const handleBindClick = useCallback(() => {
    test.myBind(obj)('a', 'b', '---myBind'); // 30
  }, [])

  const handleCallClick = useCallback(() => {
    test.myCall(obj, 'a', 'b', '---myCall') // 30
  }, [])

  const handleApplyClick = useCallback(() => {
    test.myApply(obj, ['a', 'b', '---myApply']) // 30
  }, [])

  return (
    <Space direction="vertical" size="large">
      <Button onClick={handleNewClick}>myNew</Button>
      <Button onClick={handleBindClick}>myBind</Button>
      <Button onClick={handleCallClick}>myCall</Button>
      <Button onClick={handleApplyClick}>myApply</Button>
    </Space>
  )
}
