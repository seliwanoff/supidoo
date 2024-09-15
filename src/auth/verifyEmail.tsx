import axios from "axios";
import { useState } from "react";
import SuccesMessage from "../components/alertMessage/successMessage";
import ErrorMessage from "../components/alertMessage/errorMessage";
import { useLocation, useNavigate } from "react-router-dom";
import { stat } from "fs";
import Timer from "../components/resendTimer";
import { logout } from "../store/userSlice";
import { useDispatch } from "react-redux";

const VerifyEmail = () => {
  interface UserDetails {
    firstname: "";
    email: string;
  }
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstname: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [isErrorMessagge, setisErrorMessage] = useState(false);
  const [isSuccessMessgae, setisSuccessMessage] = useState(false);
  const [message, setMessage] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  //console.log(state);
  const [errors, setErrors] = useState([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(value);

    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleResendToken = async () => {
    alert();
    await axios
      .post("/auth/verifyemail", { email: userDetails.email })
      .then(() => {
        setisSuccessMessage(true);
        setisErrorMessage(false);
        setLoading(false);
        setMessage("Verification code has been sent to your email");
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/auth/confirm_email", {
        email: state?.email,
        code: userDetails?.firstname,
      })
      .then((res: any) => {
        //  console.log(res);
        setisSuccessMessage(true);
        setisErrorMessage(false);
        setLoading(false);
        setMessage(res?.data?.message);

        setisSuccessMessage(false);
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        setisErrorMessage(true);
        setisSuccessMessage(false);
        setLoading(false);
        setMessage("Invalid code");

        setTimeout(() => {
          setisErrorMessage(false);
        }, 2500);
      });
  };
  return (
    <>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: 'url("./assets/images/bg-03-bg.webp")' }}
        >
          <SuccesMessage message={message} isTrue={isSuccessMessgae} />
          <ErrorMessage message={""} isTrue={isErrorMessagge} errors={errors} />

          <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">Verify email</span>
            <form
              className="login100-form validate-form p-b-33 p-t-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <span
                style={{
                  padding: "20px",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}
              >
                &larr;
              </span>
              <div>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "1.1rem",
                    color: "#000",
                    padding: "10px 20px",
                    textAlign: "center",
                  }}
                >
                  A verification code has been sent to your email. Please enter
                  it below.
                </p>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <input
                  className="input100"
                  type="number"
                  placeholder="Enter the code sent"
                  required
                  value={userDetails.firstname}
                  onChange={handleChange}
                  name="firstname"
                />
                <span className="focus-input100" data-placeholder="" />
              </div>{" "}
              <Timer onResend={handleResendToken} />
              <div className="container-login100-form-btn m-t-32">
                <button
                  className="login100-form-btn"
                  id="log-btn"
                  type="submit"
                >
                  {loading ? "..." : "Verify "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
