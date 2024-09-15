import React, { Suspense, lazy, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import { store, persistor } from "./store/store";
import { fetchUserDetails } from "./store/userSlice";
import App from "./App";
import { useAppDispatch } from "./store/hook";

import { AuthMiddleware, GuestMiddleware } from "./middlewares/middlewares";
import "./axiosConfig";
import ReferralListPage from "./Reeferral/ReferredListPage.";
import Profile from "./profile/main";
import PrivacyContainer from "./Privacy/home";
import Terms from "./Terms/main";

const Register = lazy(() => import("./auth/register"));
const Login = lazy(() => import("./auth/login"));
const Email = lazy(() => import("./auth/verifyEmail"));
const HomePage = lazy(() => import("./dashboard/home"));
const MainHome = lazy(() => import("./homepage/home"));
const ReferralHome = lazy(() => import("./Reeferral/main"));
const EarnHome = lazy(() => import("./earn/earn"));
const ReferralList = lazy(() => import("./Reeferral/ReferredListPage."));

const ForgottenPassword = lazy(() => import("./auth/forgotten_password"));
const VerifyPassword = lazy(() => import("./auth/verifyCode"));
const AccountPage = lazy(() => import("./profile/main"));

axios.defaults.baseURL = "https://api.supidoo.com/api/";

const Root: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch]);

  return (
    <Router>
      <Suspense>
        <Routes>
          <Route
            path="/register"
            element={
              <GuestMiddleware>
                <Register />
              </GuestMiddleware>
            }
          />
          <Route path="/" element={<MainHome />} />
          <Route
            path="/login"
            element={
              <GuestMiddleware>
                <Login />
              </GuestMiddleware>
            }
          />
          <Route
            path="/email"
            element={
              <GuestMiddleware>
                <Email />
              </GuestMiddleware>
            }
          />
          <Route
            path="/forgotten_password"
            element={
              <GuestMiddleware>
                <ForgottenPassword />
              </GuestMiddleware>
            }
          />
          <Route
            path="/new_password"
            element={
              <GuestMiddleware>
                <VerifyPassword />
              </GuestMiddleware>
            }
          />
          <Route
            path="/privacy"
            element={
              <AuthMiddleware>
                <PrivacyContainer />
              </AuthMiddleware>
            }
          />
          <Route
            path="/earn"
            element={
              <AuthMiddleware>
                <EarnHome />
              </AuthMiddleware>
            }
          />
          <Route
            path="/term"
            element={
              <AuthMiddleware>
                <Terms />
              </AuthMiddleware>
            }
          />
          <Route
            path="/home"
            element={
              <AuthMiddleware>
                <App />
              </AuthMiddleware>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthMiddleware>
                <HomePage />
              </AuthMiddleware>
            }
          />
          <Route
            path="/referral"
            element={
              <AuthMiddleware>
                <ReferralHome />
              </AuthMiddleware>
            }
          />
          <Route
            path="/users"
            element={
              <AuthMiddleware>
                <ReferralListPage />
              </AuthMiddleware>
            }
          />
          <Route
            path="/account"
            element={
              <AuthMiddleware>
                <AccountPage />
              </AuthMiddleware>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
