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
  FlexboxGrid,
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
import { Storage } from "@ionic/storage";

import "./index.css";
// @ts-ignore
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

import * as integration from "scholarpresent-integration";
import {
  CACHE_USER_LOGIN_ROLE_NAME,
  CACHE_COGNITO_CURRENT_USER,
} from "../../../../../utils/StorageUtil";

const ProfileNewPage = (props: any) => {
  const telInputRef = useRef<any>(null);
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(true);

  const [step, setStep] = useState(0);
  const [stage, setStage] = useState(0);
  const [show, setShow] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [parentMobileNumber, setMobileNumber] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentRole, setParentRole] = useState("");

  const [learnerUserId, setLearnerUserId] = useState("");
  const [learnerRole, setLearnerRole] = useState("");

  const [learnerFirstName, setLearnerFirstName] = useState("");
  const [learnerLastName, setLearnerLastName] = useState("");
  const [learnerMobileNumber, setLearnerMobileNumber] = useState("");
  const [learnerEmail, setLearnerEmail] = useState("");
  const [learnerGrade, setLearnerGrade] = useState("");
  const [learnerClass, setLearnerClass] = useState("");
  const [learnerContacts, setLearnerContacts] = useState([]);
  const [showLinkedUser, setShowLinkedUser] = useState(false);

  const [parentUserId, setParentUserId] = useState("");

  const [parentContacts, setParentContacts] = useState([]);
  const fileUploader = useRef<any>(null);
  const [profileImage, setProfileImage] = useState("/assets/user.png");
  const [profileNewImage, setProfileNewImage] = useState<File>();
  const [profileImageKey, setProfileImageKey] = useState("");
  const [profileImageExtension, setProfileImageExtension] = useState("");
  const [profileImageProgress, setProfileImageProgress] = useState<number>(0);

  const [tenantId, setTenantId] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolTelNumber, setSchoolTelNumber] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [updateSchoolButton, setUpdateSchoolButton] = useState(false);
  const [updatePersonalButton, setUpdatePersonalButton] = useState(false);
  const [deletePersonalButton, setDeletePersonalButton] = useState(false);

  const [updateLearnerButton, setUpdateLearnerButton] = useState(false);

  const [schoolInfoUpdate, setSchoolInfoUpdate] = useState(false);
  const [personalInfoUpdate, setPersonalInfoUpdate] = useState(false);
  const [personalInfoDelete, setPersonalInfoDelete] = useState(false);

  const [learnerInfoUpdate, setLearnerInfoUpdate] = useState(false);
  const [currentRoleName, setCurrentRoleName] = useState("");

  const [linkedUserTitle, setLinkedUserTitle] = useState("");

  const [present] = useIonAlert();

  const store = new Storage();

  useEffect(() => {
    if (!show) {
      setStage(0);

      integration.getCurrentUserProfile().then((user: any) => {
        setLoading(false);
        console.log("getCurrentUserProfile integration: ", user);
        setParentUserId(user.id);
        setParentFirstName(user.firstName);
        setParentLastName(user.lastName);
        setParentRole(user?.roleName);
        setParentEmail(user.contactEmail);
        setMobileNumber(user.contactPhone);
        if (user.contacts) {
          setParentContacts(user.contacts);
          for (let index = 0; index < user.contacts.length; index++) {
            console.log(
              "integration: user.contacts[index] ",
              user.contacts[index]
            );

            if (
              user.contacts[index].contactType === "email" &&
              user.contacts[index].detail &&
              user.contacts[index].detail.length > 0
            ) {
              setParentEmail(user.contacts[index].detail);
            } else if (
              user.contacts[index].contactType === "sms" &&
              user.contacts[index].detail &&
              user.contacts[index].detail.length > 0
            ) {
              setMobileNumber(user.contacts[index].detail);
            }
          }
        }

        if (user.tenantId) {
          setTenantId(user.tenantId);
          integration.getTenantInfo().then((value: any) => {
            console.log("getTenantInfo  ", value);
            setSchoolName(value.tenantName);
            setSchoolTelNumber(value.tenantContactNumber);
            setSchoolAddress(value?.tenantAddress);
            setSchoolEmail(value.tenantEmail);
          });
        }
        if (user?.linkedUser && user.linkedUser.items.length > 0) {
          console.log("getUserInfo: user ", user);
          setShowLinkedUser(true);

          let child = user.linkedUser.items[0];
          setLearnerUserId(child.id);
          setLearnerRole(child?.roleName);
          setLearnerFirstName(child.firstName);
          setLearnerLastName(child.lastName);
          if (child?.className?.className) {
            setLearnerClass(child?.className?.className);
          }
          if (child?.className?.grade?.gradeName) {
            setLearnerGrade(child?.className?.grade?.gradeName);
          }
          if (child.contacts) {
            setLearnerContacts(child.contacts);
          }
          for (let index = 0; index < child?.contacts?.length; index++) {
            console.log(
              "integration: user.contacts[index] ",
              child.contacts[index]
            );

            if (
              child.contacts[index].contactType === "email" &&
              child.contacts[index].detail &&
              child.contacts[index].detail.length > 0
            ) {
              setLearnerEmail(child.contacts[index].detail);
            } else if (
              child.contacts[index].contactType === "sms" &&
              child.contacts[index].detail &&
              child.contacts[index].detail.length > 0
            ) {
              setLearnerMobileNumber(child.contacts[index].detail);
            }
          }
        }

        if (user?.profilePhotoKey) {
          setProfileImageKey(user?.profilePhotoKey);
          const callback = (value: any) => {
            console.log("callback ", value);
          };

          integration
            .getProfilePhotoThumbnailInfo(
              user?.profilePhotoKey,
              user?.profilePhotoLocation,
              callback
            )
            .then((imgData: any) => {
              console.log("getProfilePhotoInfo imgData ", imgData);
              setProfileImage(URL.createObjectURL(imgData));
            })
            .catch((error: any) => {
              console.log(
                "error with fetch user?.profilePhoto?.key ",
                user?.profilePhotoKey,
                " at location ",
                user?.profilePhotoLocation
              );

              // present({
              //     cssClass: "my-css",
              //     header: "Something went wrong!",
              //     message: "Error with loading the profile image",
              //     buttons: [{ text: "Ok", handler: (d) => console.log("ok pressed") }],
              //     onDidDismiss: (e) => console.log("did dismiss"),
              // });
            });
        }
      });
    }
  }, [show]);

  useEffect(() => {
    store.create().then((value: any) => {
      store.get(CACHE_USER_LOGIN_ROLE_NAME).then((roleName: any) => {
        setCurrentRoleName(roleName);
      });
    });
  }, []);

  useEffect(() => {}, [profileImageProgress, loading]);

  const isLogonPrincipalRole = () => {
    return currentRoleName === "Principal";
  };

  const uploadFileHandler = async (event: any) => {
    console.log("uploadFileHandler event ", event);

    const imageFile = event.target.files[0];
    console.log("imageFile.name ", imageFile.name);
    const lastDot = imageFile.name.lastIndexOf(".");

    const fileName = imageFile.name.substring(0, lastDot);
    setProfileImageExtension(imageFile.name.substring(lastDot + 1));
    console.log(
      "profileImageExtension ",
      imageFile.name.substring(lastDot + 1)
    );

    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 250,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log("compressedFile  ", compressedFile);

      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB

      setProfileNewImage(compressedFile);
      setProfileImage(URL.createObjectURL(compressedFile));
      setPersonalInfoUpdate(true);
    } catch (error) {
      console.log(error);
    }

    //sendFileMessage(e.target.files[0])
  };
  const openUploader = () => {
    console.log("call upload");
    fileUploader?.current?.click();
    console.log("after upload");
  };

  const goTo = (url: string) => {
    history.push(url);
  };
  return (
    <div>
      {!loading && (
        <div>
          {step === 0 && props.type !== "howTo" && (
            <div>
              <Row
                style={{
                  marginBottom: 8,
                  padding: 4,
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Col xs={10}>
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      overflow: "clip",
                      borderRadius: 45,
                      boxShadow: "0 0 3px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {profileImageProgress > 0 && profileImageProgress < 99 ? (
                      <Progress.Circle
                        percent={profileImageProgress}
                        className="image-profile"
                        strokeColor="#ffc107"
                      />
                    ) : (
                      <div
                        style={{
                          width: 90,
                          height: 70,
                          backgroundColor: "yellow",
                          alignContent: "center",
                          justifyContent: "center",
                          backgroundImage: `url(${profileImage})`,
                        }}
                      ></div>
                    )}

                    <div
                      style={{
                        width: 90,
                        height: 20,
                        backgroundColor: "white",
                        textAlign: "center",
                      }}
                    >
                      <Icon
                        style={{
                          fontSize: 14,
                          paddingBottom: 1,
                          color: "green",
                        }}
                        icon="camera"
                        onClick={() => openUploader()}
                      ></Icon>
                    </div>
                  </div>
                </Col>
                <Col
                  style={{
                    textAlign: "center",
                    color: "black",
                  }}
                  xs={14}
                >
                  <p style={{ fontWeight: "bold", fontSize: 20 }}>
                    {parentFirstName} {parentLastName} <br />
                  </p>
                  <p style={{ fontSize: 12 }}> {parentRole}</p>
                </Col>
              </Row>

              <Grid fluid>
                <Row className="show-grid">
                  <Col xs={24} md={24}>
                    <div className="form-field">
                      <InputGroup>
                        <InputGroup.Addon>
                          {/* <Icon icon="user" /> */}
                          <p style={{ fontSize: 12 }}>&nbsp; First Name </p>
                        </InputGroup.Addon>
                        <Input
                          style={{ fontSize: 13 }}
                          value={parentFirstName}
                          onChange={(value) => {
                            setPersonalInfoUpdate(true);
                            setParentFirstName(value);
                          }}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                  <Col xs={24} md={24}>
                    <div className="form-field">
                      <InputGroup>
                        <InputGroup.Addon>
                          {/* <Icon icon="user" /> */}
                          <p style={{ fontSize: 12 }}> &nbsp; Last Name </p>
                        </InputGroup.Addon>
                        <Input
                          style={{ fontSize: 13 }}
                          value={parentLastName}
                          onChange={(value) => {
                            setPersonalInfoUpdate(true);
                            setParentLastName(value);
                          }}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                  <Col xs={24} md={24}>
                    <div className="form-field">
                      <InputGroup>
                        <InputGroup.Addon>
                          {/* <Icon icon="at" /> */}
                          <p style={{ fontSize: 13 }}>
                            {" "}
                            &nbsp; Email &nbsp; &nbsp; &nbsp;&nbsp;{" "}
                          </p>
                        </InputGroup.Addon>
                        <Input
                          style={{ fontSize: 13 }}
                          value={parentEmail}
                          onChange={(value) => {
                            setPersonalInfoUpdate(true);
                            setParentEmail(value);
                          }}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                  <Col xs={24} md={24}>
                    <div className="form-field">
                      <InputGroup>
                        <InputGroup.Addon>
                          {/* <Icon icon="mobile" /> */}
                          <p style={{ fontSize: 12 }}> Mobile No </p>
                        </InputGroup.Addon>
                        <Input
                          style={{ fontSize: 11 }}
                          value={parentMobileNumber}
                          disabled={true}
                        />
                        <InputGroup.Button
                          style={{ fontSize: 12 }}
                          onClick={() => setShow(true)}
                        >
                          Change
                        </InputGroup.Button>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </Grid>
              <input
                type="file"
                onChange={(e) => uploadFileHandler(e)}
                style={{ display: "none" }}
                ref={fileUploader}
                name=""
              />
            </div>
          )}
        </div>
      )}
      {loading && (
        <div style={{ textAlign: "center", padding: 10 }}>
          <IonSpinner
            name="bubbles"
            style={{ transform: "scale(1.5)" }}
            color="success"
          />
        </div>
      )}
      <Modal backdrop={true} show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Change Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {stage === 0 && (
            <div className="login-component">
              <h3 className="title text-green">
                Provide Your Mobile Number Below
              </h3>
              <br />
              <IntlTelInput
                fieldId="changeProfileNumber"
                containerClassName="intl-tel-input"
                inputClassName="rs-input"
                placeholder="e.g. 073 123 4567"
              />
              <br />
              <br />
              <Button onClick={() => setStage(1)} color="green" block>
                Continue
              </Button>
            </div>
          )}
          {stage === 1 && (
            <div className="login-component">
              <h3 className="title text-green">Are you Realy Sure?</h3>
              <h5 className="title text-green ion-margin-top">
                This will dlink the mobile number +1212122343 to the current
                profile and will no longer be able to use it to login
              </h5>
              <h5 className="title text-green ion-margin-top">
                Please tye the word CHANGE to confirm.
              </h5>
              <br />
              <Input />
              <br />
              <br />
              <Button onClick={() => setShow(false)} color="green">
                Cancel
              </Button>
              &nbsp;
              <Button onClick={() => setStage(2)} color="red">
                Change My Number
              </Button>
            </div>
          )}
          {stage === 2 && (
            <div className="otp-component">
              <h3 className="title text-green">
                One Time Password (OTP) has been sent to your mobile number
                displayed below
              </h3>
              <h5 className="sub-title">
                Enter the code just sent to +27 73 123 4567
              </h5>
              <br />
              <Input className="password-box" placeholder="⸻ ⸻ ⸻ ⸻ ⸻" />
              <br />
              <Button onClick={() => setStage(3)} color="green">
                Validate
              </Button>
              <div className="btn-container">
                <Button appearance="link">Resend One-Time Password</Button>
                <Button appearance="link">Entered a wrong number?</Button>
              </div>
            </div>
          )}
          {stage === 3 && (
            <div className="done-component text-success">
              <img height="50px" src="/assets/done.jpg" alt="" />
              <h5 className="sub-title">Congratulations</h5>
              <h5 className="sub-title ion-margin">
                Your mobile number was successfully updated
              </h5>
              <Button onClick={() => setShow(false)} color="green" block>
                Save
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ProfileNewPage;
