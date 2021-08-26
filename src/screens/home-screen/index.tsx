import ReactFullpage from "@fullpage/react-fullpage";
import { CSSProperties } from "react";
import Image from "next/image";
import jetpic from "../../../public/jethome1.jpg";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
require("antd/dist/antd.less");

const HomeScreen = () => {
  const defaultStyle: CSSProperties = {
    fontFamily: "Arial",
    fontSize: "50px",
    textAlign: "center",
  };

  return (
    <ReactFullpage
      //fullpage options
      licenseKey={"YOUR_KEY_HERE"}
      scrollingSpeed={1000} /* Options here */
      sectionsColor={["#342e37", "#9fd356", "#342e37", "#9fd356"]}
      navigation={true}
      navigationTooltips={[
        "firstSlide",
        "secondSlide",
        "thirdSlide",
        "fourthSlide",
      ]}
      render={({ fullpageApi }: { fullpageApi: any }) => {
        return (
          <ReactFullpage.Wrapper>
            <div
              className="section"
              style={{ ...defaultStyle, color: "#fcfafc" }}
            >
              <div className="nav-menu">
                <Button
                  style={{
                    borderRadius: "20px",
                    fontWeight: "bold",
                    width: "10%",
                  }}
                  className="nav-button"
                  size="large"
                >
                  Contact
                </Button>
                <Button
                  style={{
                    borderRadius: "20px",
                    fontWeight: "bold",
                    width: "10%",
                  }}
                  className="nav-button"
                  size="large"
                >
                  More Info
                </Button>
              </div>
              <h3 style={{ color: "#fcfafc", fontSize: "70px" }}>
                JetRacer Serverless Compute Dashboard
              </h3>
              <Button
                icon={<DownOutlined />}
                style={{
                  position: "absolute",
                  bottom: 25,
                  fontWeight: "bold",
                  width: "10%",
                  left: "45.5%",
                }}
                size="large"
                onClick={() => fullpageApi.moveSectionDown()}
              >
                Learn More
              </Button>
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
            <div
              className="section"
              style={{ ...defaultStyle, color: "#fcfafc" }}
            >
              <h3>Section 2</h3>
            </div>
            <div className="section" style={{ ...defaultStyle }}>
              <h3 style={{ color: "#fcfafc", fontSize: "100px" }}>
                Get Started
              </h3>
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default HomeScreen;
