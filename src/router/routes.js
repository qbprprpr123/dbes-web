import LoginPage from '../views/login';
import DatabaseInfoPage from '../views/database/info';

const routes = [
  {
    path: '/',
    name: 'DefaultLayoutPage',
    component: DatabaseInfoPage,
    meta: { requiredLogin: false, title: '数据源管理' },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { requiredLogin: false, title: '用户登录' },
  },
];

export default routes;
