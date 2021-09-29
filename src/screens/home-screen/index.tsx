import ReactFullpage from "@fullpage/react-fullpage";
import { CSSProperties } from "react";
import Image from "next/image";
import jetpic from "../../../public/jethome1.jpg";
import { Button, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
require("antd/dist/antd.less");

const { Search } = Input;

const HomeScreen = () => {
  const router = useRouter();
  const defaultStyle: CSSProperties = {
    fontFamily: "Arial",
    fontSize: "5em",
    textAlign: "center",
  };

  return (
    <ReactFullpage
      //fullpage options
      licenseKey={"YOUR_KEY_HERE"}
      scrollingSpeed={1000} /* Options here */
      sectionsColor={["#342e37", "#9fd356", "#342e37"]}
      navigation={true}
      navigationTooltips={["Intro", "Info", "Start"]}
      render={({ fullpageApi }: { fullpageApi: any }) => {
        return (
          <ReactFullpage.Wrapper>
            <title>Home</title>
            <div
              className="section"
              style={{ ...defaultStyle, color: "#fcfafc" }}
            >
              <div className="nav-menu">
                <Button
                  style={{
                    borderRadius: "20em",
                    fontWeight: "bold",
                    width: "10em",
                  }}
                  className="nav-button"
                  size="large"
                >
                  Contact
                </Button>
                <Button
                  style={{
                    borderRadius: "20em",
                    fontWeight: "bold",
                    width: "10em",
                  }}
                  className="nav-button"
                  size="large"
                >
                  More Info
                </Button>
              </div>
              <h3 style={{ color: "#fcfafc", fontSize: "1em" }}>
                JetRacer Serverless Compute Dashboard
              </h3>
              <div className="fullRow" style={{ width: "100%" }}>
                <Button
                  icon={<DownOutlined />}
                  style={{
                    margin: "auto",
                    fontWeight: "bold",
                    borderRadius: "2em",
                    width: "10em",
                  }}
                  size="large"
                  onClick={() => fullpageApi.moveSectionDown()}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div
              className="section"
              style={{
                ...defaultStyle,
              }}
            >
              <Image
                className="imHome"
                src={jetpic}
                alt="jetracer picture"
                width="550em"
                height="550em"
              />
              <h3>Section 1</h3>
              <Button onClick={() => fullpageApi.moveSectionDown()}>
                Click me to move down
              </Button>
            </div>
            <div className="section" style={{ ...defaultStyle }}>
              <div
                style={{
                  backgroundColor: "white",
                  width: "80vw",
                  margin: "auto",
                  borderRadius: "1em",
                }}
              >
                <h3>Get Started</h3>
                <Search
                  placeholder="Input Jetracer IP"
                  allowClear
                  enterButton="Connect"
                  size="large"
                  style={{ padding: "0.2em", textAlign: "center" }}
                  onSearch={async (text) => {
                    const res = await fetch(
                      `/api/getJetracer?type=CREATE&ip=${text}&mac=EEEFFF`,
                    );
                    router.push("/dashboard");
                  }}
                />
              </div>
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default HomeScreen;
