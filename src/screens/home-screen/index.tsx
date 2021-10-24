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
                width="500em"
                height="500em"
              />
              <h6>
                1.Connect the RC Car to your local network<br></br>
                2.Download Jetracer RC Car scripts from
                <a
                  style={{ color: "white" }}
                  href="https://github.com/SKYZAP/jetracer-scripts"
                >
                  {" "}
                  <u>GitHub</u>
                </a>
                <br></br>
                3.Run the script on the Jetracer RC Car<br></br>
                4.Input the IP address of the car in the next section
              </h6>
              <Button onClick={() => fullpageApi.moveSectionDown()}>
                Proceed
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
