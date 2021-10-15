import { Layout, Menu, Breadcrumb, Image, Skeleton, Table, Button } from "antd";
import { useState } from "react";
require("antd/dist/antd.less");
require("react-chat-elements/dist/main.css");

const { Header, Content, Footer } = Layout;

const msg = {
  position: "right",
  type: "text",
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
  date: new Date(),
};

const data = [
  {
    key: "1",
    image:
      "https://cdn.vox-cdn.com/thumbor/8tLchaDMIEDNzUD3mYQ7v1ZQL84=/0x0:2012x1341/920x613/filters:focal(0x0:2012x1341):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg",
    date: new Date().toLocaleString(),
  },
  {
    key: "2",
    image:
      "https://cdn.vox-cdn.com/thumbor/8tLchaDMIEDNzUD3mYQ7v1ZQL84=/0x0:2012x1341/920x613/filters:focal(0x0:2012x1341):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg",
    date: new Date().toLocaleString(),
  },
  {
    key: "3",
    image:
      "https://cdn.vox-cdn.com/thumbor/8tLchaDMIEDNzUD3mYQ7v1ZQL84=/0x0:2012x1341/920x613/filters:focal(0x0:2012x1341):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg",
    date: new Date().toLocaleString(),
  },
  {
    key: "4",
    image:
      "https://cdn.vox-cdn.com/thumbor/8tLchaDMIEDNzUD3mYQ7v1ZQL84=/0x0:2012x1341/920x613/filters:focal(0x0:2012x1341):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg",
    date: new Date().toLocaleString(),
  },
  {
    key: "5",
    image:
      "https://cdn.vox-cdn.com/thumbor/8tLchaDMIEDNzUD3mYQ7v1ZQL84=/0x0:2012x1341/920x613/filters:focal(0x0:2012x1341):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg",
    date: new Date().toLocaleString(),
  },
];

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    // eslint-disable-next-line react/display-name
    render: (text) => (
      <Image style={{ maxHeight: "150px" }} alt="" src={text} />
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

const ContentRender = (key) => {
  const [loading, setLoading] = useState(true);
  const [loadingButtonText, setLoadingButtonText] = useState("CONNECT");
  const [result, setResult] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  let client: WebSocket;

  setTimeout(async () => {
    if (result === "") {
      const res = await fetch(`/api/getJetracer?type=GETLATEST`);
      const data = await res.json();
      const newResult = `https://${data.ipAddress}:5000/video_feed`;
      setIpAddress(data.ipAddress);
      setResult(newResult);
      setLoading(false);
    }
  }, 2000);

  const [wsData, setWsData] = useState({
    text: `Initial Message`,
    date: new Date(),
  });

  if (key == "LivePreview") {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Camera</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ display: "flex" }}>
          {loading ? (
            <Skeleton.Image style={{ width: "75em", height: "100%" }} />
          ) : (
            <Image width="43%" alt="CAMERA STREAM" src={result} />
          )}
          <div
            className="websocket-container"
            style={{ display: "table-row", margin: "auto" }}
          >
            {loading ? (
              <Button className="websocket-button" disabled>
                {loadingButtonText}
              </Button>
            ) : (
              <Button
                className="websocket-button"
                onClick={() => {
                  client = new WebSocket(`ws://${ipAddress}:5555/`);
                  if (loadingButtonText == "CONNECT") {
                    setTimeout(() => {
                      client.onmessage = (event) => {
                        setWsData({
                          text: `${JSON.parse(event.data)[0].message}`,
                          date: new Date(),
                        });
                      };
                      setLoadingButtonText("DISCONNECT");
                      console.log(loadingButtonText);
                    }, 2000);
                  } else {
                    client.close(1000);
                    setWsData({
                      text: `Initial Message`,
                      date: new Date(),
                    });
                  }
                }}
              >
                {loadingButtonText}
              </Button>
            )}
            <div className="websocket-display">{wsData.text}</div>
          </div>
        </div>
      </>
    );
  } else if (key == "Datasets") {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Data</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <div style={{ width: "100%" }}>
            <Button
              style={{ position: "relative", float: "right", margin: "1em" }}
              size="large"
            >
              Refresh
            </Button>
          </div>
          <Table
            pagination={{ pageSize: 3 }}
            style={{ maxHeight: "70vh" }}
            dataSource={data}
            columns={columns}
          />
        </div>
      </>
    );
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
        {ContentRender(selectedMenuItem)}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Dashboard ©2021 Created by Izzat Jehan
      </Footer>
    </Layout>
  );
};

export default DashboardScreen;
