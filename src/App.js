import { ConfigProvider } from 'antd';
import { HashRouter } from 'react-router-dom';
import RouterView from './router';

function App() {
  return (
    <HashRouter>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemMarginInline: 5,
              subMenuItemBg: '#fff',
              itemMarginBlock: '0 10px',
              itemBorderRadius: 4,
            },
          },
        }}
      >
        <RouterView />
      </ConfigProvider>
    </HashRouter>
  );
}

export default App;
