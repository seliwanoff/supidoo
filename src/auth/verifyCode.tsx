import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loginUser } from "../store/userSlice";
import SuccesMessage from "../components/alertMessage/successMessage";
import ErrorMessage from "../components/alertMessage/errorMessage";
import axios from "axios";

interface UserDetails {
  code: string;
  password: string;
  confirmpassword: string;
}
const VerifyCodey: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    code: "",
    password: "",
    confirmpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user, status, error } = useSelector((state: RootState) => state.user);
  const { state } = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userDetails.password.match(userDetails.confirmpassword)) {
      setLoading(true);
      await axios
        .post("/resetpasswordwithcode", {
          code: userDetails.code,
          password: userDetails.password,
          email: state.email,
        })

        .then(() => {
          setIsSuccessMessage(true);
          setIsErrorMessage(false);
          setLoading(false);
          setMessage("Password updated successfully");

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          setIsErrorMessage(true);
          setIsSuccessMessage(false);
          setLoading(false);
          setMessage("Error updating password.");
          if (err.response?.data?.errors) {
            setErrors(err.response.data.errors);
          } else {
            setErrors([err.message]);
          }
          setTimeout(() => {
            setIsErrorMessage(false);
          }, 2000);
        });
    } else {
      setIsErrorMessage(true);
      setIsSuccessMessage(false);
      setLoading(false);
      setMessage("Password do not match.");
    }
  };

  return (
    <>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: 'url("./assets/images/bg-03-bg.webp")' }}
        >
          <SuccesMessage message={message} isTrue={isSuccessMessage} />
          <ErrorMessage
            message={message}
            isTrue={isErrorMessage}
            errors={errors}
          />
          <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">NEW PAssword</span>
            <form
              className="login100-form validate-form p-b-33 p-t-5"
              onSubmit={handleSubmit}
            >
              <div
                style={{
                  padding: "10px 20px",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
              >
                <p>Enter your new password below.</p>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <input
                  className="input100"
                  type="number"
                  placeholder="Enter code sent"
                  required
                  name="code"
                  autoComplete="off"
                  value={userDetails.code}
                  onChange={handleChange}
                />
                <span className="focus-input100" data-placeholder="" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <input
                  className="input100"
                  type="password"
                  placeholder="Enter new password"
                  required
                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                />
                <span className="focus-input100" data-placeholder="" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <input
                  className="input100"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  name="confirmpassword"
                  value={userDetails.confirmpassword}
                  onChange={handleChange}
                />
                <span className="focus-input100" data-placeholder="" />
              </div>

              <div className="container-login100-form-btn m-t-32">
                <button
                  className="login100-form-btn"
                  id="log-btn"
                  type="submit"
                >
                  {loading ? "sending...." : "Set Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyCodey;
