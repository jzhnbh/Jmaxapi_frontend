import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';
const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle={'啥也没有呀，看看URL。'}
    extra={
      <Button type="primary" onClick={() => history.push('/user/login')}>
        {'返回登录页'}
      </Button>
    }
  />
);
export default NoFoundPage;
