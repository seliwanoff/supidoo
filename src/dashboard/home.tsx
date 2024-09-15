import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Header from "../components/alertMessage/header/header";
import { RootState } from "../store/store";
import { useEffect, useRef, useState } from "react";
import Example from "../components/topUpmodal/modal";
import copy from "../assets/images/copy_content.svg";
import axios from "axios";
import SuccessMessage from "../components/alertMessage/successMessage";
import verified from "../assets/images/verified.svg";
import { logout } from "../store/userSlice";
import ErrorMessage from "../components/alertMessage/errorMessage";
import BottomNavigationBar from "../components/bottomNavigationBar/navigatinBar";
import useCheckout, { BaniPopUpType, EventResponse } from "bani-react";
import config from "../constant/configs";
import Status from "../components/unverifiedStatus/status";
import { FaEye } from "react-icons/fa";
import { getActivities } from "../request/_request";
import WithdrawFund from "../components/withdrawFund";
import ModalBankProps from "../components/modal/modalbankDetail";
import loadingComponent from "../components/loader/loadingcomponent";
import LoadingComponent from "../components/loader/loadingcomponent";
import DailyStreak from "../earn/earn";
import DailyStreaks from "../components/task/innerTask";
//import loadingComponent from "../components/loading";
//import config from "../constant/configs";
//import { config } from "../constant/configs";
//import { config } from "process";
//console.log(loadingComponent);
const HomePage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [balance, setBalance] = useState<number>(0);
  const [show, setshow] = useState(false);
  const [tokenLoader, setTokenLoader] = useState(false);
  const [savedToken, setSavedToken] = useState("");
  const [copied, setCopied] = useState(false);
  const [message, setmessage] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [once, setonce] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [actvites, setActivities] = useState([]);
  const [withdrawalRequest, setwithdrawalRwquest] = useState([]);
  //console.log(config);
  const { BaniPopUp } = useCheckout();
  const generateRandomAlphanumeric = (length = 12) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  };
  function generatePhoneNumber() {
    // Array of valid prefixes
    const prefixes = ["090", "080", "081", "070"];

    // Randomly select one of the prefixes
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    // Generate the remaining 8 random digits
    const randomDigits = Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0");

    // Construct the full number
    const phoneNumber = "+234" + randomPrefix.slice(1) + randomDigits;

    return phoneNumber;
  }
  const checkDAte = (date: any) => {
    return new Date(date).toDateString();
  };

  useEffect(() => {
    const getAcrivitiesOfUsers = async () => {
      await getActivities()
        .then((res) => {
          // console.log(res);
          setActivities(res.data.data.data);
          setisLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setisLoading(false);
        });
    };
    getAcrivitiesOfUsers();
  }, []);

  useEffect(() => {
    const getWithdrawalRequest = async () => {
      await axios
        .get("getwithrawrequest")
        .then((res) => {
          setwithdrawalRwquest(res.data.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getWithdrawalRequest();
  }, []);

  const payments = actvites.filter((item: any) => item.type !== "");
  const task = actvites.filter(
    (item: any) => item.type !== "referall" && item.type !== "payment"
  );

  //console.log(task)
  // console.log(getActivities());
  //console.log(generatePhoneNumber());
  const handleOnClose = (response: EventResponse) => {
    console.log("On close: ", response);
  };

  const handleOnSuccess = () => {
    window.location.reload();
  };
  const payWithBani = (e: any) => {
    e.preventDefault();

    const data: BaniPopUpType = {
      amount: "1000",
      phoneNumber: generatePhoneNumber(),
      email: user.data.email,
      firstName: user.data.username,
      lastName: ".",
      merchantKey: `${config}`, //The merchant Bani public key
      metadata: { custom_ref: generateRandomAlphanumeric() },
      callback: handleOnSuccess,
    };

    BaniPopUp(data);

    //  console.log(data);
  };

  {
    /**
  useEffect(() => {
    const checVerify = async () => {
      setEmail(user.data.email);
   //   console.log(user.data.e_status);
      if (user.data.e_status === null) {
        await axios
          .post("/auth/verifyemail", { email: user.data.email })
          .then(() => {
            // dispatch(logout());
            navigate("/email", {
              state: {
                email: user.data.email,
              },
            });
          })
          .catch((error) => {
            console.error("Failed to send email:", error);
          });
      }
    };
    checVerify();
  }, [user.data.email]);
  */
  }

  const generateToken = async () => {
    setTokenLoader(true);
    await axios
      .post("/generatetoken")
      .then((res: any) => {
        console.log(res);
        setSavedToken(res?.data?.token);
        setTokenLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setTokenLoader(false);
      });
  };

  const verifyToken = async (token: any) => {
    setTokenLoader(true);
    await axios
      .post("/verifytoken", {
        token: token,
      })
      .then((res: any) => {
        //  console.log(res);
        setTokenLoader(false);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setmessage("Successful! Your token has been redeemed");
      })
      .catch((e: any) => {
        console.log(e);
        setTokenLoader(false);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        setmessage("Invalid Token, Pls check and try again !");
      });
  };

  const makePayment = async () => {
    setTokenLoader(true);
    await axios
      .post("/getpayment")
      .then((res: any) => {
        //   console.log(res);
        setTokenLoader(false);
        //  setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        //  window.open(res.data.data.data.invoice_url, "_blank");
        window.location.href = `${res.data.data.data.invoice_url}`;

        // setmessage("Successful! Your token has been redeemed");
      })
      .catch((e: any) => {
        console.log(e);
        setTokenLoader(false);
        //setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        //setmessage("Invalid Token, Pls check and try again !");
      });
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(savedToken)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setmessage("Token copied successfully!"); // Reset copied state after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div
      className="container-main"
      style={{
        height: "100vh",
      }}
    >
      <Header />
      {user.data?.status !== 1 && <Status payWithBani={payWithBani} />}
      <Example
        show={show}
        setshow={setshow}
        verifyToken={verifyToken}
        tokenLoader={tokenLoader}
      />
      <SuccessMessage message={message} isTrue={copied} />
      <ErrorMessage message={message} isTrue={copied} errors={errors} />
      <div className="scnd-con-mani">
        <div className="top-notch-bg">
          <div className="wallet-balance-con">
            <div className="balance">
              <h6 style={{ display: "flex" }}>
                <span id="username">Hey {user?.data?.username}</span>
                {"    "}

                {user?.data?.status === 1 && (
                  <span>
                    <img
                      src={verified}
                      alt=""
                      height={"17px"}
                      style={{
                        marginLeft: "5px",
                      }}
                    />
                  </span>
                )}
              </h6>
              <div className="deposit-balance">
                <div className="main-depo">
                  <h6 className="balance" style={{ fontSize: "14px" }}>
                    Total Balance:
                    <br />
                    <span style={{}}>
                      ₦{" "}
                      <span
                        id="total-balance"
                        style={{
                          fontSize: "25px",
                          fontWeight: "600",
                        }}
                      >
                        {parseFloat(user.data.balance).toLocaleString()}
                      </span>{" "}
                    </span>
                  </h6>
                </div>
                {/***
                {user.data?.status !== 1 && (
                  <div className="main-depo">
                    <button
                      type="button"
                      className="animated-button"
                      onClick={() => setshow(true)}
                    >
                      Verify Token
                    </button>
                  </
                  */}
              </div>
            </div>
            {/**  {user.data?.status !== 1 && ( */}
            {/**
            <div
              className="card"
              style={{
                marginTop: "20px",
              }}
            >
              <div className="card-body">
                <h5
                  style={{
                    fontSize: "1rem",
                    textAlign: "left",
                    margin: "0px",
                    color: "crimson",
                  }}
                >
                  Unverified Status
                </h5>
                <p
                  style={{
                    padding: "10px",
                  }}
                >
                  Your account is currently unverified. Please verify your
                  account to enjoy uninterrupted service and access to all
                  features. If you need assistance with verification, follow the
                  in-app prompts or contact support for help.
                </p>
                <a
                  className="animated-button"
                  type="button"
                  //  href="https://t.me/+-JEgPiRXT5JjNjk0"
                  style={{
                    color: "#fff",
                  }}
                  onClick={payWithBani}
                >
                  {tokenLoader ? "Pls wait..." : "Verify now"}
                </a>
              </div>
            </div>
            {/**    )} */}
            {user.data.email === "support@supidoo.com" && (
              <div
                className="card"
                style={{
                  marginTop: "20px",
                }}
              >
                <div className="card-body">
                  <h5
                    style={{
                      fontSize: "1rem",
                      textAlign: "left",
                      margin: "0px",
                    }}
                  >
                    Generate a New Token
                  </h5>
                  <p
                    style={{
                      padding: "10px",
                    }}
                  >
                    As an admin, you can easily generate tokens for users. Click
                    on generate button below:
                  </p>
                  {savedToken.length !== 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        margin: "20px 0px",
                        justifyContent: "start",
                      }}
                    >
                      <span className="copy_text">{savedToken}</span>

                      <div>
                        <img
                          src={copy}
                          alt=""
                          height={"20px"}
                          style={{
                            cursor: "pointer",
                          }}
                          width={"20px"}
                          onClick={handleCopy}
                        />
                      </div>
                    </div>
                  )}
                  <button
                    className="animated-button"
                    onClick={generateToken}
                    disabled={tokenLoader}
                  >
                    {tokenLoader
                      ? "Please wait, generating..."
                      : "Generate Token"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/***<WithdrawFund />**/}

      {user.data?.status === 1 && <ModalBankProps />}
      <div className="welcome-container">
        {<DailyStreaks />}

        {/***
        <h1>Welcome to Supidoo! 🎉</h1>
        <p>
          Your daily tasks are ready to help you unlock amazing rewards. Stay
          consistent, complete tasks each day, and watch your progress grow!
        </p>
        <p>
          Every task completed brings you closer to claiming exciting prizes.
          Ready to start today? Let’s achieve greatness together, one task at a
          time!
        </p>
        */}
      </div>
      <div
        className="tast-container"
        style={{
          marginTop: "40px",
        }}
      >
        <span> Withdrawal request(s)</span>

        <Link to={"#"}>Activity</Link>
      </div>
      <div className="activity_container">
        <div
          className="each-card"
          style={{
            position: "relative",
          }}
        >
          {withdrawalRequest.length === 0 && isLoading == false && (
            <div className="no-task-box">
              <h3>No task yet</h3>
              <p>Please Perform your daily task</p>
            </div>
          )}
          {isLoading && <LoadingComponent />}

          {withdrawalRequest?.map((item: any, index: any) => (
            <div className="each_section_card" key={index}>
              <div className="top_section_card">
                <span className="">
                  {item.accountname} . ({item.accountnumber})
                </span>
                <span>₦{parseFloat(item.amount).toLocaleString()}</span>
              </div>
              <div className="bottom_section_card">
                <span>{checkDAte(item.created_at)}</span>
                <span
                  style={{
                    color: `${
                      item.status === "1"
                        ? "pink"
                        : item.status === "2"
                        ? "green"
                        : "crimson"
                    }`,
                  }}
                >
                  {item.status === "1"
                    ? "Pending"
                    : item.status === "2"
                    ? "Completed"
                    : "Rejected"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div
          className="each-card"
          style={{
            position: "relative",
          }}
        >
          {payments.length === 0 && isLoading == false && (
            <div className="no-task-box">
              <h3>No activities yet</h3>
              <p>Please Perform activities</p>
            </div>
          )}
          {isLoading && <LoadingComponent />}
          {payments?.map((item: any, index: any) => (
            <div className="each_section_card" key={index}>
              <div className="top_section_card">
                <span>{item.type}</span>
                <span>₦{parseFloat(item.amount).toLocaleString()}</span>
              </div>
              <div className="bottom_section_card">
                <span>{checkDAte(item.created_at)}</span>
                <span>Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default HomePage;
