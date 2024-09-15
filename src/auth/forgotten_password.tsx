import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loginUser } from "../store/userSlice";
import SuccesMessage from "../components/alertMessage/successMessage";
import ErrorMessage from "../components/alertMessage/errorMessage";
import axios from "axios";

interface UserDetails {
  username: string;
  password: string;
}

const ForgottenPassword: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user, status, error } = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/sendresetcode", {
        id: userDetails.username,
      })

      .then(() => {
        setIsSuccessMessage(true);
        setIsErrorMessage(false);
        setLoading(false);
        setMessage("Reset Code sent successfully");
        setTimeout(() => {
          navigate("/new_password", {
            state: {
              email: userDetails.username,
            },
          });
        }, 2000);
      })
      .catch((err) => {
        setIsErrorMessage(true);
        setIsSuccessMessage(false);
        setLoading(false);
        setMessage("Error sending code.");
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
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: 'url("./assets/images/bg-01.png")' }}
        >
          <SuccesMessage message={message} isTrue={isSuccessMessage} />
          <ErrorMessage
            message={message}
            isTrue={isErrorMessage}
            errors={errors}
          />
          <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">
              Forgotten Password
            </span>
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
                <p>
                  Enter your email address below to receive a password reset
                  code.
                </p>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <input
                  className="input100"
                  type="email"
                  placeholder="Enter your email"
                  required
                  name="username"
                  value={userDetails.username}
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
                  {loading ? "sending...." : "Send Code"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgottenPassword;
