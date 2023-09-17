/**
 * 代理服务相关
 */
import request from '@/service/index';

// 查询代理服务
export const getProxyList = (data) => request.post('/proxy/list', data);
