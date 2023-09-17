/**
 * @intro: http统一封装.
 */
import axios from 'axios';
import { isFormData, isFormScheme } from '@/assets/common/validate';

const service = axios.create({
  // 请求根地址
  baseURL: '/api/',
  // 设置全局默认的headers
  headers: {
    'Content-Type': 'application/json',
  },
  // 设置请求超时设置
  timeout: 30000,
  responseType: 'json',
  // 请求转换
  transformRequest: [
    (data, headers) => {
      // 处理token

      // 表单上传
      if (isFormData(data)) return data;
      // 普通表单
      if (isFormScheme(data)) {
        // eslint-disable-next-line no-param-reassign
        headers['Content-Type'] = 'application/x-www-form-urlencoded';

        return data;
      }

      return JSON.stringify(data);
    },
  ],
});

// response拦截
service.interceptors.response.use(
  (response) => {
    const data = response?.data;

    // const rejectResult = () =>
    //   // eslint-disable-next-line
    //   Promise.reject({
    //     ...data,
    //     type: 'business',
    //   });

    // // 请求成功
    // if (judgeCode(data?.code)) return data;
    // if (isBlobData(data)) {
    //   const fileName = response.headers['content-disposition']?.split('filename=')?.[1];
    //   if (fileName) {
    //     // 如果有文件名称时就转成file类型，因为file继承blob，并且blob不能设置文件名字
    //     return new File([data], decodeURIComponent(fileName), { type: data.type || 'application/octet-stream' });
    //   }
    //   return data;
    // }

    // return rejectResult();

    return data;
  },
  (err) =>
    // eslint-disable-next-line
    Promise.reject({
      code: +err.status || 500,
      message: err.message || 'System Busy!',
      type: 'system',
    }),
);

export default service;
