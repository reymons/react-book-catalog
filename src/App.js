import './App.scss';
import { Layout, Menu } from "antd";
import Books from './components/Books';

const App = () => {
  const { Header, Footer, Content } = Layout;

  return (
    <Layout style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" >Главная</Menu.Item>
          <Menu.Item key="2">Управление книгами</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, backgroundColor: "#fff" }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Books/>
        </div>
      </Content>
    </Layout>
  )
}

export default App;
