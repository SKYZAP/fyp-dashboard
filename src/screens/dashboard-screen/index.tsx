import { Layout, Menu, Breadcrumb, Image, Skeleton } from "antd";
import { useState } from "react";
require("antd/dist/antd.less");

const { Header, Content, Footer } = Layout;

const ContentRender = (key) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

  const getData = () => {
    setTimeout(async () => {
      const res = await fetch(`/api/getJetracer?type=GETLATEST`);
      const data = await res.json();
      const result = `http://${data.ipAddress}:5000/video_feed`;
      setLoading(false);
      setResult(result);
    }, 2000);
  };
  getData();
  if (key == "LivePreview") {
    return (
      <div className="site-layout-content" style={{ display: "flex" }}>
        {loading ? (
          <Skeleton.Image style={{ width: "75em", height: "100%" }} />
        ) : (
          <Image width="75%" alt="CAMERA STREAM" src={result} />
        )}
        <div
          className="streamChat"
          style={{
            border: "solid 1px black",
            margin: "auto",
            width: "20%",
            height: "50em",
          }}
        >
          Text
        </div>
      </div>
    );
  } else if (key == "Datasets") {
    return <div className="site-layout-content">DATA</div>;
  }
};

const DashboardScreen = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("LivePreview");
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
          <Menu.Item
            key={"LivePreview"}
            onClick={(e) => {
              console.log(e.key);
              setSelectedMenuItem(e.key);
            }}
          >
            Camera View
          </Menu.Item>
          <Menu.Item
            key={"Datasets"}
            onClick={(e) => {
              console.log(e.key);
              setSelectedMenuItem(e.key);
            }}
          >
            Datasets
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Camera</Breadcrumb.Item>
        </Breadcrumb>
        {ContentRender(selectedMenuItem)}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Dashboard ©2021 Created by Izzat Jehan
      </Footer>
    </Layout>
  );
};

export default DashboardScreen;
