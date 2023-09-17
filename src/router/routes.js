import LoginPage from '../views/login';

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { title: '登录' },
  },
];

export default routes;
