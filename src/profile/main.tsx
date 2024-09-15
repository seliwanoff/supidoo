import React, { useState } from "react";
//import Sidebar from './Sidebar';
//import Modal from 'react-modal';
import Sidebar from "./component/sidebat";
import { Modal } from "react-bootstrap";
import BottomNavigationBar from "../components/bottomNavigationBar/navigatinBar";
import PasswordUpdateCard from "./password/update";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import SuccessMessage from "../components/alertMessage/successMessage";
import ErrorMessage from "../components/alertMessage/errorMessage";
import Header from "../components/alertMessage/header/header";

//Modal.setAppElement('#root');

const Profile: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.user);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState<string>("");
  const [ldPassword, setOldPassword] = useState<string>("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [currentTab, setCurrentTab] = useState(0);
  const openModal = (content: string) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent("");
  };
  const handleUpdatePassword = async () => {
    setLoader(true);
    await axios
      .post("/updatepassword", {
        newpassword: password,
        password: ldPassword,
      })
      .then((response) => {
        setIsSuccessMessage(true);
        setIsErrorMessage(false);
        setLoader(false);
        setMessage("Password updated succesfully");
      })
      .catch((err: any) => {
        // console.log(err.message);
        setIsErrorMessage(true);
        setIsSuccessMessage(false);
        setLoader(false);
        setMessage("Your current password is not correct");
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors([err.message]);
        }
        setTimeout(() => {
          setIsErrorMessage(false);
        }, 2000);
      });
  };

  return (
    <>
      <Header />
      <div
        className="Profile"
        style={{
          display: "flex",
        }}
      >
        <SuccessMessage message={message} isTrue={isSuccessMessage} />
        <ErrorMessage
          message={message}
          isTrue={isErrorMessage}
          errors={errors}
        />
        <Sidebar
          openModal={openModal}
          setCurrentTab={setCurrentTab}
          user={user}
          modalIsOpen={modalIsOpen}
        />
        {currentTab === 0 ? (
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="cardss"
              style={{
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <div className="card-body">
                <h4 className="text-w" style={{ marginBottom: "20px" }}>
                  Account Details
                </h4>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexDirection: "column",
                  }}
                >
                  <span
                    className="text-w"
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#000",
                    }}
                  >
                    Username
                  </span>
                  <p>{user?.data.username}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexDirection: "column",
                  }}
                >
                  <span
                    className="text-w"
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#000",
                    }}
                  >
                    Email
                  </span>
                  <p>{user?.data.email}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#000",
                    }}
                  >
                    Member ID
                  </span>
                  <p>{user?.data?.id}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <PasswordUpdateCard
            handleUpdatePassword={handleUpdatePassword}
            setOldPassword={setOldPassword}
            setPassword={setPassword}
            loader={loader}
            ldPassword={ldPassword}
            password={password}
          />
        )}
      </div>

      <BottomNavigationBar />
    </>
  );
};

export default Profile;
