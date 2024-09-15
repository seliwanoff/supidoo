import React from "react";
import { NavLink } from "react-router-dom";
//import "./css/BottomNavigationBar.css";
import "./css/bottomNavigation.css";
import { FaHome, FaMoneyBill, FaSearch, FaUser, FaUsers } from "react-icons/fa";

const BottomNavigationBar = () => {
  return (
    <div
      className="bottom-navigation"
      style={{
        zIndex: "100",
      }}
    >
      <NavLink
        to="/referral"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaUsers />
        <span>Referral</span>
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaHome />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/earn"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaMoneyBill />
        <span>Earn</span>
      </NavLink>
      <NavLink
        to="/account"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaUser />
        <span>Account</span>
      </NavLink>
    </div>
  );
};

export default BottomNavigationBar;
