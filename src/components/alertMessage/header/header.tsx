import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/supidoo5.png";
import { logout } from "../../../store/userSlice";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    navigate("/login"); // Navigate to the login page
  };
  return (
    <div className="fixeds-top">
      <nav className="navbar navbar-expand-lg navbar-dark mx-background-top-linear">
        <div className="container">
          <Link
            to={"/dashboard"}
            className="navbar-brand"
            style={{ textTransform: "uppercase" }}
          >
            <img
              src={logo}
              alt=""
              style={{
                maxWidth: "140px",
              }}
            />
          </Link>
          {/***
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          */}

          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {/**
              <li className="nav-item active">
                <a className="nav-link" href="../panel/">
                  Token
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="../smtp/">
                  SMTP
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../program/">
                  Program
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../scam-page/">
                  ScamPages
                </a>
              </li>
              <li className="nav-item log-account">
                <a className="nav-link" href="javascript:void(0);">
                  {" "}
                  Logs <i className="fa fa-caret-down" />
                </a>
                <div className="dropdown-con">
                  <ol className="dep-ul-con">
                    <a href="../bank-log/">
                      <li className="ech-li"> Bank Log</li>
                    </a>
                    <a href="../other-log/">
                      <li className="ech-li">Other Log</li>
                    </a>
                  </ol>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../tutorial/">
                  Tutorial
                </a>
              </li>
              <li className="nav-item accout-li">
                <a className="nav-link" href="javascript:void(0);">
                  {" "}
                  <i className="fa fa-user" /> Account{" "}
                  <i className="fa fa-caret-down" />
                </a>
                <div className="account-con">
                  <ol className="dep-ul-con">
                    <a href="../profile/">
                      <li className="ech-li">Profile</li>
                    </a>
                    <a href="../purchase/">
                      <li className="ech-li">Purchased Tools</li>
                    </a>
                    <a href="../contact/">
                      <li className="ech-li">Contact Support</li>
                    </a>
                    <a href="../sign-out/">
                      <li className="ech-li">Sign out</li>
                    </a>
                  </ol>
                </div>
              </li>
               */}
            </ul>
          </div>
          <span
            style={{
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={logOut}
          >
            <FaSignOutAlt />
          </span>
        </div>
      </nav>

      <div className="main-drop">
        <div className="scd-drop">
          <div className="main-head">
            <div className="each-side-con profile-con" />
            <div className="each-side-con">OLAGUNJU SELIM</div>
            <div className="each-side-con profile-con" />
          </div>
        </div>
        <div className="wallet-con">$0.00</div>
        <div className="title-con">
          <h5 className="title-hd">Services</h5>
          <div className="con-mn-drp">
            <a href="../../smtp/">
              <div className="mn-account-pg">SMTP</div>
            </a>
            <a href="../../program/">
              <div className="mn-account-pg">Program</div>
            </a>
            <a href="../../scam-page/">
              <div className="mn-account-pg">Scam Page</div>
            </a>
            <a href="../../bank-log/">
              <div className="mn-account-pg">Bank Log</div>
            </a>
            <a href="../../dating-profile/">
              <div className="mn-account-pg">Dating Profile</div>
            </a>
            <a href="../../other-log/">
              <div className="mn-account-pg">Other Log</div>
            </a>
          </div>
          <h5 className="title-hd">Menu</h5>
          <div className="con-mn-drp">
            <a href="../../profile/">
              <div className="mn-account-pg">Profile</div>
            </a>
            <a href="../../purchased-tools/">
              <div className="mn-account-pg">Purchased Tools</div>
            </a>
            <h5 className="title-hd">Account Settings</h5>
            <div className="con-mn-drp">
              <a href="../../profile/">
                <div className="mn-account-pg">Profile</div>
              </a>
              <a href="../../contact-support/">
                <div className="mn-account-pg">Contact Support</div>
              </a>
              <a href="../../sign-out/">
                <div className="mn-account-pg">Sign Out</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
