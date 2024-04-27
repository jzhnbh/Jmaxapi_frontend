import Footer from '@/components/Footer';
import { userRegisterUsingPost } from '@/services/Jmaxapi_backend/userController';
import { Link } from '@@/exports';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history } from '@umijs/max';
import { Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  // const { setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const { userPassword, checkPassword } = values;
    if (userPassword !== checkPassword) {
      message.error('再次输入的密码不一致');
      return;
    }

    try {
      // 注册
      const id = await userRegisterUsingPost({ ...values });

      if (id) {
        // 注册成功反馈
        const successMessage = '欢迎注册JmaxApi！😀';
        message.success(successMessage);

        history.push('/user/login');
        return;
      } else {
        throw new Error(`register error id = ${id}`);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      // 控制台打印错误信息
      console.log(error);
      // 显示错误信息
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>注册页- {Settings.title}</title>
      </Helmet>
      {/* <Lang /> */}
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="https://img2.imgtp.com/2024/04/08/L1saEDDl.png" />}
          title="JmaxAPI开放平台"
          subTitle="欢迎来到JmaxApi开放平台"
          // initialValues={{
          //   autoLogin: true,
          // }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码注册',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="username" defaultMessage="请输入用户名!" />,
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="password" defaultMessage="请输入密码！" />,
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8',
                  },
                ]}
              />

              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="password" defaultMessage="请再次输入密码！" />,
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            {/*<ProFormCheckbox noStyle name="autoLogin">*/}
            {/*  <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动注册" />*/}
            {/*</ProFormCheckbox>*/}
            {/*<a*/}
            {/*  style={{*/}
            {/*    float: 'right',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />*/}
            {/*</a>*/}
          </div>

          <div
            style={{
              marginBottom: 24,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%', // 根据你的需求调整
            }}
          >
            <Link to="/user/login">返回登录页</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
