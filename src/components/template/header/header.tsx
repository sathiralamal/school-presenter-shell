import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Storage } from "@ionic/storage";
import {
  Avatar,
  Button,
  Dropdown,
  Drawer,
  Icon,
  IconButton,
  Modal,
  Container,
  Nav,
  Navbar,
  Divider,
  Placeholder,
  Grid,
  Row,
  Col,
  IconStack,
  FlexboxGrid,
  Content,
} from "rsuite";
import { NavLink, Link } from "react-router-dom";
//import AppInstallPopup from '../app-install-popup/app-install-popup';
//import NotificationPopup from '../notification-popup/notification-popup';
import "./header.css";
import ProfilePage from "../../../pages/profile/profile-page";
import AppInfoPage from "../../../pages/appinfo/appinfo-page";
import PrivacyPolicyPage from "../../../pages/policies/privacy-policy";

import PlusIcon from "rsuite/";
import ReactDOM from "react-dom";
import { Portal } from "react-portal";
import CloseIcon from "@rsuite/icons/Close";

//redux
import { connect } from "react-redux";
import { classesSetData } from "../../../stores/classes/actions";
import { gradeSetData } from "../../../stores/grades/actions";
import {
  conversationsSetData,
  messagesReset,
} from "../../../stores/messages/actions";
import { contactsResetContacts } from "../../../stores/contacts/actions";
import { invitationsResetContacts } from "../../../stores/contacts/actions";
import { groupsReset } from "../../../stores/groups/actions";
import { rolesReset } from "../../../stores/roles/actions";
import MenuIcon from "@rsuite/icons/Menu";
import { isTSConstructSignatureDeclaration } from "@babel/types";
import * as integration from "scholarpresent-integration";
import ProfileNewMenu from "./profile-menu";
import PresenterHub from "./presenter-hub";
import GridIcon from "@rsuite/icons/Grid";
const Header: React.FC<{
  classesSetData: Function;
  gradeSetData: Function;
  conversationsSetData: Function;
  contactsResetContacts: Function;
  invitationsResetContacts: Function;
  groupsReset: Function;
  rolesReset: Function;
  messagesReset: Function;
}> = ({
  classesSetData,
  gradeSetData,
  conversationsSetData,
  contactsResetContacts,
  invitationsResetContacts,
  groupsReset,
  rolesReset,
  messagesReset,
}) => {
  const history = useHistory();
  const [mobile, setMobile] = useState(window.innerWidth < 992);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showAppInfo, setShowAppInfo] = useState<boolean>(false);
  const [showPrivacyPolicyInfo, setShowPrivacyPolicyInfo] =
    useState<boolean>(false);

  const [showHowTo, setShowHowTo] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>();
  const store = new Storage();
  const [open, setOpen] = React.useState(false);

  const customStyles = {
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
    },
  };

  const toggleModal = (flag = false) => {
    setShowModal(flag);
  };

  const toggleModal2 = (flag = false) => {
    setShowModal2(flag);
  };
  const handleLogout = async () => {
    console.log("header handleLogout enter");

    await store.create();
    let pushNotificationKey = await store.get("pushNotificationKey");
    let appNotificationKey = await store.get("appNotificationKey");
    console.log(
      "handleLogout pushNotificationKey ",
      pushNotificationKey,
      " appNotificationKey ",
      appNotificationKey
    );

    integration
      .authSignOut(pushNotificationKey, appNotificationKey)
      .then((value: any) => {});
    store.clear();
    classesSetData([]);
    gradeSetData([]);
    conversationsSetData([]);
    messagesReset();
    contactsResetContacts();
    rolesReset();
    invitationsResetContacts();
    groupsReset();
    console.log("header handleLogout exit");
  };
  useEffect(() => {}, [mobile, window.innerWidth]);

  const goTo = (url: string) => {
    setActiveTab(url);
    history.push(url);
  };

  const ProfileMenu = () => {
    return (
      <div className="navbar-profile-button-container">
        <Dropdown
          renderTitle={() => {
            return (
              <div className="navbar-profile-button">
                {/* <IconButton
                  color="white"
                  appearance="primary"
                  // icon={<Icon icon="Menu" />}
                  icon={<MenuIcon color="green" />}
                  circle
                /> */}
                <MenuIcon width={20} height={20} color="green" />
              </div>
            );
          }}
          placement="bottomEnd"
        >
          {/* new menu */}
          <ProfileNewMenu logout={handleLogout}></ProfileNewMenu>
          {/* <PresenterHub></PresenterHub> */}
        </Dropdown>
      </div>
    );
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   const ProfileMenuNew = () => {
  //     return (
  //       <Modal overflow={true} open={open} onClose={handleClose}>
  //         <Modal.Header>
  //           <Modal.Title>Modal Title</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Placeholder.Paragraph rows={80} />
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button onClick={handleClose} appearance="primary">
  //             Ok
  //           </Button>
  //           <Button onClick={handleClose} appearance="subtle">
  //             Cancel
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //     );
  //   };

  return (
    <>
      <Navbar className="navbar-container">
        <Navbar.Header>
          <IconButton
            icon={<GridIcon />}
            circle
            color="green"
            size="lg"
            onClick={() => console.log("clcik")}
          />
          {""}
          <img
            className="navbar-brand logo-icon"
            src="assets/logo.png"
            alt="logo"
          />
          {/* {mobile && <Icon icon="ellipsis-v" size="lg" />} */}
          {mobile && <ProfileMenu />}
        </Navbar.Header>
        <Navbar.Body>
          <Nav appearance="subtle" justified pullRight>
            <Nav.Item
              id="learnerContacts"
              icon={<Icon size="2x" icon="id-badge" className="navbar-icon" />}
              active={activeTab === "contacts"}
              onSelect={() => goTo("/contacts")}
            >
              Contacts
            </Nav.Item>
            <Nav.Item
              id="learnerGroups"
              icon={<Icon size="2x" icon="group" className="navbar-icon" />}
              active={activeTab === "groups"}
              onSelect={() => goTo("/groups")}
            >
              Groups
            </Nav.Item>
            <Nav.Item
              id="learnerMessaging"
              icon={<Icon size="2x" className="navbar-icon" icon="wechat" />}
              active={activeTab === "messaging"}
              onSelect={() => goTo("/messaging")}
            >
              Messaging
            </Nav.Item>
            {!mobile && <ProfileMenu />}
          </Nav>
        </Navbar.Body>
      </Navbar>

      <Modal size="xs" show={showModal} onHide={() => toggleModal(false)}>
        <Modal.Body className="ion-no-padding modal-no-margin"></Modal.Body>
      </Modal>

      <Modal size="xs" show={showModal2} onHide={() => toggleModal2(false)}>
        <Modal.Body className="ion-no-padding modal-no-margin"></Modal.Body>
      </Modal>

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

      {/* <Drawer size="xs" className="profile-drawer" onShow={()=>{
                return window.open('https://scholarpresent.com/privacypolicy', '_blank', 'noreferrer')? false:false
                }   
                } >
            </Drawer> */}

      <Drawer
        size="xs"
        className="profile-drawer"
        show={showProfile}
        onHide={() => setShowProfile(false)}
      >
        <div className="profile-modal">
          <ProfilePage
            setShow={setShowProfile}
            size="web"
            type="profile"
            title="My Profile"
          />
        </div>
      </Drawer>

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
    </>
  );
};
const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = {
  classesSetData,
  gradeSetData,
  conversationsSetData,
  contactsResetContacts,
  invitationsResetContacts,
  groupsReset,
  rolesReset,
  messagesReset,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);

const ProfileDropdown = ({ children }: { children: any }) => {
  return ReactDOM.createPortal(<div>{children}</div>, document.body);
};
