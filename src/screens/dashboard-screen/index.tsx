import { Layout, Menu, Breadcrumb, Image, Skeleton, Table, Button } from "antd";
import { useState } from "react";
import { render } from "react-dom";
require("antd/dist/antd.less");
require("react-chat-elements/dist/main.css");

const { Header, Content, Footer } = Layout;

const parseTableData = (media) => {
  // insert request
  let result = [{}];
  for (let i = 0; i < media.length; i++) {
    result = [
      ...result,
      {
        key: `${i + 1}`,
        image: media[i].url,
        date: new Date(media[i].date).toLocaleString(),
      },
    ];
  }
  result.shift();
  console.log("RESULT: ", result);
  return result;
};

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
  const [tableMedia, setTableMedia] = useState([{}]);
  let client: WebSocket;

  setTimeout(async () => {
    if (result === "") {
      // GET JETRACER DETAILS
      const res = await fetch(`/api/getJetracer?type=GETLATEST`);
      const data = await res.json();
      setIpAddress(data.ipAddress);

      // GET MEDIA TABLE DATA
      const media = await fetch(`/api/uploadJetracer?type=GETMEDIA`);
      const mediaData = await media.json();
      setTableMedia(parseTableData(mediaData));

      // SET JETRACER VIDEO FEED IP & SETS LOADING TO FALSE
      const newResult = `https://${data.ipAddress}:5000/video_feed`;
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
          {loading ? (
            <Table
              pagination={{ pageSize: 3 }}
              style={{ maxHeight: "70vh" }}
              loading={true}
              columns={columns}
            />
          ) : (
            <Table
              pagination={{ pageSize: 3 }}
              style={{ maxHeight: "70vh" }}
              dataSource={tableMedia}
              columns={columns}
            />
          )}
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
