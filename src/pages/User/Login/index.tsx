import { Footer } from '@/components';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  // ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, Link, history, useModel } from '@umijs/max';
import { Alert, Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect, useState } from 'react';
// import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import { userLoginUsingPost } from '@/services/Jmaxapi_backend/userController';
// import { loginUser } from '@/services/swagger/user';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
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
const ActionIcons = () => {
  const { styles } = useStyles();
  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
    </>
  );
};
const Lang = () => {
  const { styles } = useStyles();
  return;
};
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const idioms = ['山止川行', '暗室逢灯', '阳和启蜇', '宛若青云'];
  const [currentIdiomIndex, setCurrentIdiomIndex] = useState(0);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdiomIndex((prevIndex) => (prevIndex + 1) % idioms.length);
    }, 3000); // 每3000毫秒（3秒）变更一次
    return () => {
      clearInterval(timer); // 移除定时器以防止内存泄露
    };
  }, []);
  

  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost({
        ...values,
      });
      
      if (res.data) {
  
        const successMessage = '欢迎使用Jmax-API！😀';
        message.success(successMessage);

        const urlParams = new URL(window.location.href).searchParams;
    
        // 判断登录用户的角色，来确定跳转的页面
        let redirectUrl = '/user'; // 默认跳转到用户页面
        if (res.data.role === 'admin') {
          redirectUrl = '/admin'; // 如果是管理员，则跳转到管理页面
        }
    
        setTimeout(() => {
          history.push(urlParams.get('redirect') || redirectUrl);
        }, 100);
    
        setInitialState({
          loginUser: res.data,
        });
    
        return;
      }
   
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="https://img2.imgtp.com/2024/04/08/L1saEDDl.png" />}
          title="JmaxAPI开放平台"
          subTitle={'欢迎来到JmaxApi开放平台'}
          initialValues={{
            autoLogin: true,
          }}
          // actions={['其他登录方式 :', <ActionIcons key="icons" />]}
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
                label: '账户密码登录',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
                }}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
                initialValue="admin" 
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} />,
                }}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
                initialValue="123456789" 
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
         <a style={{color:'black'}}>--{idioms[currentIdiomIndex]}--</a>
         <Link style={{ float: 'right' }} to="/user/register">
  没有账号？注册一个
</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;