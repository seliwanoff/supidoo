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

const LoginPage: React.FC = () => {
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
    await dispatch(
      loginUser({
        id: userDetails.username,
        password: userDetails.password,
      })
    )
      .unwrap()
      .then(async (response) => {
        //  console.log(response);
        setIsSuccessMessage(true);
        setIsErrorMessage(false);
        setLoading(false);
        setMessage("Login successful");
        if (response.data.e_status == "true") {
          navigate("/dashboard");
        } else {
          await axios
            .post("/auth/verifyemail", { email: response.data.email })
            .then(() => {
              // dispatch(logout());
              navigate("/email", {
                state: {
                  email: response.data.email,
                },
              });
            })
            .catch((error: any) => {
              console.error("Failed to send email:", error);
            });
        }
      })
      .catch((err) => {
        // console.log(err.message);
        setIsErrorMessage(true);
        setIsSuccessMessage(false);
        setLoading(false);
        setMessage(err?.message);
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
          style={{ backgroundImage: 'url("./assets/images/bg-03-bg.webp")' }}
        >
          <SuccesMessage message={message} isTrue={isSuccessMessage} />
          <ErrorMessage
            message={message}
            isTrue={isErrorMessage}
            errors={errors}
          />
          <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">Member Login</span>
            <form
              className="login100-form validate-form p-b-33 p-t-5"
              onSubmit={handleSubmit}
            >
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <input
                  className="input100"
                  type="text"
                  placeholder="Username"
                  required
                  name="username"
                  value={userDetails.username}
                  onChange={handleChange}
                />
                <span className="focus-input100" data-placeholder="" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  id="password"
                  value={userDetails.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <span className="focus-input100" data-placeholder="" />
              </div>
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span>New here?</span>{" "}
                  <Link
                    to={"/register"}
                    style={{
                      fontWeight: "500",
                      fontSize: "1rem",
                      color: "#fa4299",
                    }}
                  >
                    Register
                  </Link>
                </div>
                <Link
                  to={"/forgotten_password"}
                  style={{
                    fontWeight: "600",
                    fontSize: "1rem",
                    color: "#fa4299",
                  }}
                >
                  Forgotten Password?
                </Link>
              </div>
              <div className="container-login100-form-btn m-t-32">
                <button
                  className="login100-form-btn"
                  id="log-btn"
                  type="submit"
                >
                  {loading ? "Signing In..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
