import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import './index.scss';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
  getItem('Files', '10', <FileOutlined />),
  getItem('Files', '11', <FileOutlined />),
  getItem('Files', '12', <FileOutlined />),
  getItem('Files', '13', <FileOutlined />),
  getItem('Files', '14', <FileOutlined />),
  getItem('Files', '15', <FileOutlined />),
  getItem('Files', '16', <FileOutlined />),
  getItem('Files', '17', <FileOutlined />),
  getItem('Files', '18', <FileOutlined />),
];

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
const contentStyle = {
  textAlign: 'center',
  height: 'calc(100vh - 64px)',
  lineHeight: '120px',
  color: '#fff',
  overflow: 'scroll',
};
const siderStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#fff',
};

const DefaultLayoutsPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const dispatch = useDispatch();
  // const { loginInfo } = useSelector((state) => state.user);

  const setCollapsedState = () => {
    setCollapsed(!collapsed);
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (!loginInfo) {
  //         const res = await dispatch(login({ token: '1x0000' }));
  //         console.log(res);
  //       } else {
  //         console.log(loginInfo);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, []);

  return (
    <div className='layout-default-box'>
      <Layout>
        <Sider style={siderStyle} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className='demo-logo-vertical' onClick={setCollapsedState}>
            123
          </div>
          <Menu theme='light' style={{ fontSize: '16px' }} defaultSelectedKeys={['1']} mode='inline' items={items} />
        </Sider>
        <Layout>
          <Header style={headerStyle}>Header</Header>
          <Content style={contentStyle}>
            <div className='test'>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DefaultLayoutsPage;
