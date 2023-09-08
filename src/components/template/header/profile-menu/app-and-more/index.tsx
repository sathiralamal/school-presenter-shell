import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";

import {
  Button,
  InputGroup,
  Uploader,
  Progress,
  Icon,
  Input,
  Grid,
  Row,
  Col,
  Message,
  Modal,
  Container,
  List,
  FlexboxGrid,
  IconButton,
  ButtonToolbar,
  Drawer,
} from "rsuite";
import imageCompression from "browser-image-compression";
import {
  IonItem,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonSpinner,
  useIonAlert,
} from "@ionic/react";
import GearIcon from "@rsuite/icons/Gear";
import CalendarIcon from "@rsuite/icons/Calendar";
import PcIcon from "@rsuite/icons/Pc";
import EventDetailIcon from "@rsuite/icons/EventDetail";
import CreditCardPlusIcon from "@rsuite/icons/CreditCardPlus";
import ProfilePage from "../../../../../pages/profile/profile-page";
import AppInfoPage from "../../../../../pages/appinfo/appinfo-page";
const data = [
  {
    title: "Financial Managemet",
    icon: <CreditCardPlusIcon style={{ width: 30, height: 30 }} />,
    buttonstate: "open",
  },
  {
    title: "Attendnce Registaion",
    icon: <EventDetailIcon style={{ width: 30, height: 30 }} />,
    buttonstate: "get",
  },
  {
    title: "Assist Managment",
    icon: <PcIcon style={{ width: 30, height: 30 }} />,
    buttonstate: "get",
  },
  {
    title: "School calander",
    icon: <CalendarIcon style={{ width: 30, height: 30 }} />,
    buttonstate: "get",
  },
];

const AppAndMore = (props: any) => {
  const [showHowTo, setShowHowTo] = useState<boolean>(false);
  const [showAppInfo, setShowAppInfo] = useState<boolean>(false);
  const [showPresenterHub, setshowPresenterHub] = useState<boolean>(false);
  return (
    <Container style={container}>
      <Button
        color="green"
        onClick={() => setshowPresenterHub(!showPresenterHub)}
        appearance="primary"
        block
      >
        Your Apps and more!
      </Button>

      <Container>
        <Container style={upper_container}>
          <List>
            {data.map((item, index) => (
              <List.Item
                style={{ padding: 4, margin: 8, borderRadius: 8 }}
                key={item["title"]}
                index={index + 1}
              >
                <FlexboxGrid justify="space-between" align="middle">
                  <FlexboxGrid.Item>{item["icon"]}</FlexboxGrid.Item>
                  <FlexboxGrid.Item>
                    <p>{item["title"]}</p>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item>
                    {item["buttonstate"] == "get" ? (
                      <Button color="yellow" appearance="primary">
                        Get
                      </Button>
                    ) : (
                      <Button color="green" appearance="primary">
                        Open
                      </Button>
                    )}
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </List.Item>
            ))}
          </List>
        </Container>
        <Container style={lower_container}>
          <FlexboxGrid justify="space-between" align="middle">
            <FlexboxGrid.Item
              style={{ fontSize: 12, cursor: "pointer" }}
              onClick={() => setShowHowTo(true)}
            >
              <IconButton
                icon={<Icon icon="support" />}
                circle
                size="sm"
                // onClick={() => setShowHowTo(true)}
              />
              How To
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              style={{ fontSize: 12, cursor: "pointer" }}
              onClick={() =>
                window.open("https://scholarpresent.com/privacypolicy")
              }
            >
              <IconButton
                icon={<Icon icon="newspaper-o" />}
                circle
                size="sm"
              ></IconButton>
              Privacy Policy
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              style={{ fontSize: 12, cursor: "pointer" }}
              onClick={() => setShowAppInfo(!showAppInfo)}
            >
              <IconButton
                icon={<Icon icon="info" />}
                circle
                size="sm"
                onClick={() => setShowAppInfo(!showAppInfo)}
              />
              App info
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Container>
        <Drawer size="xs" show={showHowTo} onHide={() => setShowHowTo(false)}>
          <div className="profile-modal">
            <ProfilePage
              setShow={setShowHowTo}
              size="web"
              type="howTo"
              title="How to"
            />
          </div>
        </Drawer>
        <Drawer
          size="xs"
          className="profile-drawer"
          show={showAppInfo}
          onHide={() => setShowAppInfo(false)}
        >
          <div className="profile-modal">
            <AppInfoPage
              setShow={setShowAppInfo}
              size="web"
              type="profile"
              title="App Info"
            />
          </div>
        </Drawer>
      </Container>
    </Container>
  );
};

const container = {
  marginTop: 4,
  padding: 10,
  width: 320,
  justifyContent: "center",
  borderWidth: 10,
  borderRadius: 20,
};

const upper_container = {
  padding: 1,
  marginTop: 12,
  backgroundColor: "#fff",
  borderWidth: "2px",
  borderColor: "#55555",
  borderStyle: "solid",
  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
};
const lower_container = {
  padding: 8,
  marginTop: 12,
  backgroundColor: "#fff",
  borderWidth: "2px",
  borderColor: "#55555",
  borderStyle: "solid",
  borderBottomRightRadius: 20,
  borderBottomLeftRadius: 20,
};

export default AppAndMore;
