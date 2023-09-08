import { FC, useEffect, useState } from "react";
import { Storage } from "@ionic/storage";
import {
  Avatar,
  Button,
  Container,
  Content,
  Divider,
  Col,
  Row,
  FlexboxGrid,
  Grid,
  Icon,
} from "rsuite";
import CloseIcon from "@rsuite/icons/Close";
import {
  IonButton,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonText,
  IonAvatar,
  IonItem,
} from "@ionic/react";
import {
  funnel,
  search,
  trash,
  pencil,
  add,
  documentTextOutline,
  chevronDown,
  arrowBack,
  arrowForward,
  handLeft,
} from "ionicons/icons";
import MyProfileTab from "./my-profile";
import * as integration from "scholarpresent-integration";
import { useHistory } from "react-router";
import ExitIcon from "@rsuite/icons/Exit";
import SchoolInforTab from "./school-info";
import AppAndMore from "./app-and-more";
import FlexboxGridItem from "rsuite/lib/FlexboxGrid/FlexboxGridItem";
import ArrowUpLineIcon from "@rsuite/icons/ArrowUpLine";
import ChildInforPage from "./child-infor";
import { size } from "lodash";

interface PrifleNewMenu {
  logout: () => void;
}

const ProfileNewMenu: FC<PrifleNewMenu> = (props) => {
  const [tab, setTab] = useState<string>("Contacts");
  const [loading, setLoading] = useState<boolean>(false);
  const [deletePersonalButton, setDeletePersonalButton] = useState(false);
  const history = useHistory();
  const [appSelect, setAppSelect] = useState<boolean>(false);
  const [showLinkedUser, setShowLinkedUser] = useState<boolean>(false);
  const handleSegmentChange = (e: any) => {
    setTab(e.detail.value);
  };
  const goTo = (url: string) => {
    history.push(url);
  };
  const store = new Storage();

  const handleLogout = async () => {
    console.log("header handleLogout enter");
    props.logout();
    // await store.create();
    // let pushNotificationKey = await store.get("pushNotificationKey");
    // let appNotificationKey = await store.get("appNotificationKey");
    // console.log(
    //   "handleLogout pushNotificationKey ",
    //   pushNotificationKey,
    //   " appNotificationKey ",
    //   appNotificationKey
    // );

    // integration
    //   .authSignOut(pushNotificationKey, appNotificationKey)
    //   .then((value: any) => {});
    // store.clear();
    // // classesSetData([]);
    // // gradeSetData([]);
    // // conversationsSetData([]);
    // // messagesReset();
    // // contactsResetContacts();
    // // rolesReset();
    // // invitationsResetContacts();
    // // groupsReset();
    // console.log("header handleLogout exit");
  };

  useEffect(() => {
    integration.getCurrentUserProfile().then((user: any) => {
      setLoading(false);
      console.log("getCurrentUserProfile integration: ", user);
      if (user?.linkedUser && user.linkedUser.items.length > 0) {
        console.log("getUserInfo: user ", user);
        setShowLinkedUser(true);
      }
    });
  }, []);

  return (
    <Container style={{ height: "100%", width: "100%", padding: 10 }}>
      <Container style={{ height: " 10% " }}>
        <FlexboxGrid
          style={{ padding: 4, marginLeft: 10 }}
          align="middle"
          justify="space-between"
        >
          <FlexboxGrid.Item colspan={4}>
            {appSelect ? (
              <FlexboxGrid justify="start">
                <FlexboxGrid.Item colspan={14}>
                  <Icon icon="envelope-o" size="lg" />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={10}>
                  <Icon icon="bell-o" size="lg" />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            ) : (
              <IonButton size="small" onClick={() => setAppSelect(true)}>
                <IonIcon icon={arrowBack} slot="start" />
                Apps
              </IonButton>
            )}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={14}>
            <FlexboxGrid
              justify="end"
              align="middle"
              style={appSelect ? { cursor: "pointer" } : { cursor: "default" }}
              onClick={() => setAppSelect(false)}
            >
              <Avatar
                size="sm"
                circle
                src="https://avatars.githubusercontent.com/u/12592949"
              />
              <IonLabel
                style={{
                  fontSize: 11,
                  paddingLeft: 4,
                  paddingRight: 4,
                  color: "black",
                }}
              >
                Ronil Woodkin
              </IonLabel>
              <ArrowUpLineIcon slot="end" style={{ fontSize: 20 }} />
            </FlexboxGrid>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={2}>
            <CloseIcon style={{ fontSize: 18 }} color="red"></CloseIcon>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider />
      </Container>
      <Container style={{ height: " 80% " }}>
        {/* My profile , My Child Infor ,School Infor */}
        {appSelect ? (
          <AppAndMore />
        ) : (
          <Content>
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
                  value="Contacts"
                >
                  <IonLabel
                    style={{
                      fontSize: 9,
                      color: "#5e5e5e",
                      textTransform: "none",
                    }}
                  >
                    My Profile
                  </IonLabel>
                </IonSegmentButton>
                {!showLinkedUser ? (
                  <>
                    <IonSegmentButton
                      id="btnInvitations"
                      className="contactSegmentBtn"
                      value="Child_info"
                    >
                      <IonLabel
                        style={{
                          fontSize: 10,
                          color: "#5e5e5e",
                          textTransform: "none",
                        }}
                      >
                        My child info
                      </IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton
                      id="btnRequests"
                      className="contactSegmentBtn"
                      value="School_Info"
                    >
                      <IonLabel
                        style={{
                          fontSize: 10,
                          color: "#5e5e5e",
                          textTransform: "none",
                        }}
                      >
                        School info
                      </IonLabel>
                    </IonSegmentButton>
                  </>
                ) : (
                  <IonSegmentButton
                    id="btnRequests"
                    className="contactSegmentBtn"
                    value="School_Info"
                  >
                    <IonLabel
                      style={{
                        fontSize: 10,
                        color: "#5e5e5e",
                        textTransform: "none",
                      }}
                    >
                      School info
                    </IonLabel>
                  </IonSegmentButton>
                )}
              </IonSegment>
            </Container>

            <Container style={lower_container}>
              {tab == "School_Info" ? (
                <Container style={{ height: 450, flex: 1 }}>
                  <SchoolInforTab
                    setShow={true}
                    size="web"
                    type="school-infor"
                    title="School Info"
                  ></SchoolInforTab>
                </Container>
              ) : tab == "Child_info" ? (
                <ChildInforPage />
              ) : (
                <Container style={{ height: 400, flex: 1 }}>
                  <MyProfileTab
                    setShow={true}
                    size="web"
                    type="profile"
                    title="My Profile"
                  />
                </Container>
              )}
            </Container>
          </Content>
        )}
      </Container>
      {/* bottom Logout and delete account */}
      <Container
        style={{
          paddingTop: 4,
          paddingRight: 10,
          height: "10%",
        }}
      >
        <FlexboxGrid justify="space-between" align="middle">
          <FlexboxGrid.Item
            style={{ padding: 20, alignItems: "center", cursor: "pointer" }}
            colspan={10}
            onClick={() => {
              handleLogout();
              goTo("/login/loginStatus=false");
            }}
          >
            <ExitIcon style={{ marginRight: 10 }}></ExitIcon>
            <IonText>Log out</IonText>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={10}>
            <Button
              style={{
                backgroundColor: "black",
                alignSelf: "end",
                color: "white",
              }}
              onClick={async (event) => {
                setDeletePersonalButton(true);
                console.log("Delete Account");
                let result = await integration.deleteCognitoUserInfo();
                console.log("Delete Account result ", result);
                setDeletePersonalButton(false);
                console.log("Logging out");
                goTo("/login/loginStatus=false");
              }}
            >
              {deletePersonalButton ? (
                <IonSpinner name="dots" />
              ) : (
                "Delete Account "
              )}
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
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
  padding: 8,
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

export default ProfileNewMenu;
