import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./ReferredUser.css";

type ReferredStat = {
  username: string;
  email: string;
  status: string;
};

const ReferredUser: React.FC<ReferredStat> = ({ username, email, status }) => {
  return (
    <div className="referred-user">
      <div className="user-details">
        <p className="user-name">{username}</p>
        <p className="user-email">{new Date(email).toDateString()}</p>
      </div>
      <div className="user-status">
        {status === "1" ? (
          <FaCheckCircle className="status-icon verified" />
        ) : (
          <FaTimesCircle className="status-icon not-verified" />
        )}
      </div>
    </div>
  );
};

export default ReferredUser;
