import { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import routes from './routes';

// 统一路由配置
const Element = (props) => {
  const { component: Component, meta } = props;
  // 登录态校验
  // 修改页面title
  const { requiredLogin = true, title = 'dbes-web' } = meta || {};
  document.title = title;
  console.log('requiredLogin =>', requiredLogin);
  if (requiredLogin) {
    return (
      <Navigate
        to={{
          pathname: '/login',
        }}
      />
    );
  }

  // 获取路由信息传递给组件
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  return <Component params={params} navigate={navigate} location={location} searchParams={searchParams} />;
};

export default function RouterView() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        {routes.map((item) => {
          const { name, path } = item;
          return <Route key={name} path={path} element={<Element {...item} />} />;
        })}
      </Routes>
    </Suspense>
  );
}
