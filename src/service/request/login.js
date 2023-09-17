/**
 * 登录相关
 */
import request from '@/service/index';
import { queryStringify } from '@/assets/common/utils';

// 获取验证码地址
export const getCheckCodeUrl = (codeId) => `/api/getCheckCode?codeId=${codeId}`;

// 账号登录
export const accountLogin = (data) =>
  request.post('/login', queryStringify(data), {
    headers: {
      Authorization: 'empty',
    },
  });
