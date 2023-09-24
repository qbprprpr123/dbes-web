import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { uuid } from '@/assets/common/utils';
import { userLogin } from '@/store/features/userSlice';
import './index.scss';
import { getCheckCodeUrl } from '@/service/request/login';
import AkImage from '../../components/AkImage';
import AkContainer from '../../components/AkContainer';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [codeId, setCodeId] = useState('');

  useEffect(() => {
    console.log('login');
    setCodeId(getCheckCodeUrl(uuid()));
  }, []);

  // 刷新code码
  const onRefreshSmsCode = () => {
    console.log('???');
    setCodeId(getCheckCodeUrl(uuid()));
  };
  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      const res = await dispatch(userLogin(values)).then(unwrapResult);
      console.log('res =>', res);
    } catch (e) {
      console.log('catch =>', e);
      return e;
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AkContainer className='ak-login-box'>
      <div className='ak-login-wrapper'>
        <div className='ak-login-form-title'>数据库加密系统</div>
        <div className='ak-login-form-tabs'>
          <div className='ak-login-tab-item is-active'>用户名登录</div>
          <div className='ak-login-tab-item'>手机登录</div>
        </div>
        <div className='ak-login-form-account' key='account'>
          <Form
            name='login'
            wrapperCol={{
              span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input placeholder='请输入账号信息' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder='请输入密码信息' />
            </Form.Item>
            <Form.Item>
              <Row gutter={9}>
                <Col span={16}>
                  <Form.Item
                    name='code'
                    noStyle
                    rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                  >
                    <Input placeholder='请输入验证码' />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <AkImage src={codeId}>
                    <div className='ak-login-verify-error' slot='error' onClick={onRefreshSmsCode}>
                      请重试
                    </div>
                  </AkImage>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </AkContainer>
  );
};

export default LoginPage;
