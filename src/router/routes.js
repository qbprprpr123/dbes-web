import LoginPage from '../views/login';
import DefaultLayoutsPage from '../views/layouts/default';
import DatabaseInfoPage from '../views/database/info';

const routes = [
  {
    path: '/',
    name: 'DefaultLayoutPage',
    component: DefaultLayoutsPage,
    children: [
      {
        path: 'database/info',
        name: 'DataBaseInfoPage',
        component: DatabaseInfoPage,
        meta: { requiredLogin: false, title: '数据库管理' },
      },
    ],
    meta: { requiredLogin: false },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { requiredLogin: false, title: '用户登录' },
  },
];

export default routes;
