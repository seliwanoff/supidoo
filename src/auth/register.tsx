import axios from "axios";
import { useState } from "react";
import SuccesMessage from "../components/alertMessage/successMessage";
import ErrorMessage from "../components/alertMessage/errorMessage";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  interface UserDetails {
    email: string;
    username: string;
    password: string;
    referral?: string;
  }

  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: "",
    username: "",
    password: "",
    referral: "",
  });
  const [loading, setLoading] = useState(false);
  const [isErrorMessagge, setisErrorMessage] = useState(false);
  const [isSuccessMessgae, setisSuccessMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(value);

    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/auth/register", userDetails)
      .then((res: any) => {
        // console.log(res);
        axios
          .post("/auth/verifyemail", { email: userDetails.email })
          .then(() => {
            setisSuccessMessage(true);
            setisErrorMessage(false);
            setLoading(false);
            setMessage("Verification code has been sent to your email");
          });

        setTimeout(() => {
          setisSuccessMessage(false);
          navigate("/email", {
            state: {
              ...userDetails,
            },
          });
        }, 2500);
      })
      .catch((e) => {
        console.log(e);
        setisErrorMessage(true);
        setisSuccessMessage(false);
        setLoading(false);
        setMessage(e.response.data.message ? e.response.data.message : "");
        setErrors(e?.response?.data?.errors);
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
          <ErrorMessage
            message={message}
            isTrue={isErrorMessagge}
            errors={errors}
          />

          <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">Register</span>
            <form
              className="login100-form validate-form p-b-33 p-t-5"
              onSubmit={handleSubmit}
            >
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter Lastname"
              >
                <input
                  className="input100"
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  required
                  name="email"
                  value={userDetails.email}
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
                  type="text"
                  placeholder="Username"
                  required
                  autoComplete="off"
                  name="username"
                  value={userDetails.username}
                  onChange={handleChange}
                />
                <span className="focus-input100" data-placeholder="" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter Coupon"
              >
                <input
                  className="input100"
                  type="text"
                  placeholder="Coupon (optional)"
                  name="referral"
                  value={userDetails.referral}
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
              <div style={{ padding: "10px", textAlign: "center" }}>
                <span>Already have an account?</span>{" "}
                <Link
                  to={"/login"}
                  style={{
                    fontWeight: "500",
                    fontSize: "1rem",
                    color: "#fa4299",
                  }}
                >
                  Login
                </Link>
              </div>
              <div className="container-login100-form-btn m-t-32">
                <button
                  className="login100-form-btn"
                  id="log-btn"
                  type="submit"
                >
                  {loading ? "..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
