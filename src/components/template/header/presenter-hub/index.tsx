import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Container,
  Content,
  Divider,
  Drawer,
  FlexboxGrid,
  IconButton,
  Icon,
  List,
  Row,
} from "rsuite";
import CloseIcon from "@rsuite/icons/Close";
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import OneColumnIcon from "@rsuite/icons/OneColumn";
import FlexboxGridItem from "rsuite/lib/FlexboxGrid/FlexboxGridItem";
import { colorFill } from "ionicons/icons";
import { sign } from "crypto";
import { size } from "lodash";

const mockData = [
  {
    id: 1,
    name: "Color Run - 18 August 2023",
    department: "12 day left",
    date: "12 day left",
    avatar: (
      <Avatar
        size="md"
        circle
        src="https://avatars.githubusercontent.com/u/12592949"
        alt="@SevenOutman"
      />
    ),
  },
  {
    id: 2,
    name: "Color Run",
    department: "Department of Education - 12 July 2023",
    date: "12 day left",
    avatar: (
      <Avatar
        size="md"
        circle
        src="https://avatars.githubusercontent.com/u/12592949"
        alt="@SevenOutman"
      />
    ),
  },
  {
    id: 3,
    name: "Color Run",
    department: "Department of Health - 15 July 2023",
    date: "12 day left",
    avatar: (
      <Avatar
        size="md"
        circle
        src="https://avatars.githubusercontent.com/u/12592949"
        alt="@SevenOutman"
      />
    ),
  },
  {
    id: 4,
    name: "Walk the Talk with 720",
    department: "3 Days to go!",
    date: "12 day left",
    avatar: (
      <Avatar
        size="md"
        circle
        src="https://avatars.githubusercontent.com/u/12592949"
        alt="@SevenOutman"
      />
    ),
  },
];
const ScholerPresenterNoticeBord = () => {
  return (
    <Container>
      <Container style={{ marginBottom: 16 }}>
        <FlexboxGrid justify="space-around" align="middle">
          <FlexboxGrid.Item>
            <p>Schoar Presenter Notice Board</p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <IconButton
              icon={<Icon icon="page-top" />}
              circle
              color="green"
              size="md"
              onClick={() => console.log("clcik")}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>
      <List>
        {mockData.map((item, index) => (
          <List.Item
            style={{
              padding: 2,
              marginBottom: 10,
              borderRadius: 8,
              backgroundColor: "#F8F8F8",
            }}
            key={item["id"]}
            index={index + 1}
          >
            {/* <Container style={{ padding: 8, borderRadius: 8 }}> */}
            <FlexboxGrid
              as={"div"}
              style={{ padding: 2 }}
              justify="start"
              align="top"
            >
              <FlexboxGrid.Item as={Col} colspan={6} md={4}>
                {item["avatar"]}
              </FlexboxGrid.Item>
              <FlexboxGrid.Item as={Col} colspan={12} md={15}>
                <Container>
                  <Row>
                    <IonLabel
                      style={{
                        fontSize: 11,
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {item["name"]}
                    </IonLabel>
                  </Row>
                  <Row>
                    <Col>
                      <IonLabel style={{ fontSize: 9, color: "#2E2E2E" }}>
                        {item["department"]}
                      </IonLabel>
                    </Col>
                  </Row>
                </Container>
              </FlexboxGrid.Item>
              <FlexboxGridItem
                style={{ marginLeft: 16 }}
                as={Col}
                colspan={4}
                md={6}
              >
                <Button style={{ color: "blue" }}>View</Button>
              </FlexboxGridItem>
            </FlexboxGrid>
            {/* </Container> */}
          </List.Item>
        ))}
      </List>
      <Container style={{ marginTop: 18, marginBottom: 8 }}>
        <Button
          style={{ alignSelf: "flex-end" }}
          color="green"
          appearance="primary"
        >
          View Page
        </Button>
      </Container>
    </Container>
  );
};

const PresenterHub = () => {
  const [tab, setTab] = useState<string>("Tab1");
  const [mobile, setMobile] = useState(window.innerWidth < 992);
  const handleSegmentChange = (e: any) => {
    setTab(e.detail.value);
  };
  return (
    <Container style={{ height: "100%", width: "100%", padding: 10 }}>
      <Container style={{ height: " 10% " }}>
        <Divider />
      </Container>
      <Container style={{ height: " 90% " }}>
        <Content>
          {/* <Container style={upper_container}>
            <IonSegment
              value={tab}
              mode="md"
              className="contactSegment"
              onIonChange={(e) => handleSegmentChange(e)}
            >
              <IonSegmentButton
                id="btnContacts"
                className="contactSegmentBtn"
                value="Tab1"
              >
                <IonLabel style={{ fontSize: 9, color: "black" }}>
                  Market Place
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                id="btnInvitations"
                className="contactSegmentBtn"
                value="Tab2"
              >
                <IonLabel style={{ fontSize: 9, color: "black" }}>
                  Scholer Presenters
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                id="btnRequests"
                className="contactSegmentBtn"
                value="Tab3"
              >
                <IonLabel style={{ fontSize: 9, color: "black" }}>
                  Notice Borad
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </Container> */}
          <Container style={upper_container}>
            <IonSegment
              value={tab}
              mode="md"
              className="contactSegment"
              onIonChange={(e) => handleSegmentChange(e)}
            >
              <IonSegmentButton
                id="btnContacts"
                className="contactSegmentBtn"
                value="Tab1"
              >
                <IonLabel
                  style={{ fontSize: 9, color: "black", textWrap: "wrap" }}
                >
                  Market Place
                </IonLabel>
              </IonSegmentButton>

              <IonSegmentButton
                id="btnInvitations"
                className="contactSegmentBtn"
                value="Tab2"
              >
                <IonLabel
                  style={{ fontSize: 9, color: "black", textWrap: "wrap" }}
                >
                  Scholer Presenters
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                id="btnRequests"
                className="contactSegmentBtn"
                value="Tab3"
              >
                <IonLabel
                  style={{ fontSize: 9, color: "black", textWrap: "wrap" }}
                >
                  Notice Borad
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </Container>

          <Container style={lower_container}>
            {tab == "Tab1" ? (
              <h2>Tab 1</h2>
            ) : tab == "Tab2" ? (
              <h2>Tab 2</h2>
            ) : (
              <Container style={{ height: 400, flex: 1 }}>
                <ScholerPresenterNoticeBord></ScholerPresenterNoticeBord>
              </Container>
            )}
          </Container>
        </Content>
      </Container>
    </Container>
  );
};
const container = {
  marginTop: 4,
  padding: 10,
  justifyContent: "center",
  borderWidth: 10,
  borderColor: "thistle",
  borderRadius: 20,
};

const upper_container = {
  marginTop: 4,
  padding: 10,
  // backgroundColor: "#D3D3D3",
  borderColor: "#B0B7C0",
  borderStyle: "solid",
  justifyContent: "center",
  borderWidth: 2,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
};

const lower_container = {
  marginTop: 4,
  padding: 10,
  // backgroundColor: "#D3D3D3",
  borderColor: "#B0B7C0",
  borderStyle: "solid",
  justifyContent: "center",
  borderWidth: 2,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
};

export default PresenterHub;
