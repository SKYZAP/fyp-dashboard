import { Layout, Menu, Breadcrumb } from "antd";
require("antd/dist/antd.less");

const { Header, Content, Footer } = Layout;

const DashboardScreen = () => {
  return (
    <Layout className="layout">
      <title>Dashboard</title>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["LivePreview"]}
        >
          <Menu.Item key={"LivePreview"}>Camera View</Menu.Item>
          <Menu.Item key={"Datasets"}>Datasets</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Camera</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Dashboard ©2021 Created by Izzat Jehan
      </Footer>
    </Layout>
  );
};

export default DashboardScreen;
