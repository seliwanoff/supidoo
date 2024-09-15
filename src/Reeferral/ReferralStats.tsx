import React from "react";
import "./ReferralStats.css";
import { Link } from "react-router-dom";
type RefferedStat = {
  totalNumber: number;
  statusOneCount: number;
};
const ReferralStats: React.FC<RefferedStat> = ({
  totalNumber,
  statusOneCount,
}) => {
  return (
    <div className="referral-stats">
      <div>
        <div className="icons">
          <div className="icon" style={{ backgroundColor: "#E0FFF7" }}></div>
          <div className="icon" style={{ backgroundColor: "#FFE6E6" }}></div>
          <div className="icon" style={{ backgroundColor: "#FFF3E0" }}></div>
        </div>
        <p
          style={{
            color: "#fff",
          }}
        >
          Total Number Of Referrals
        </p>
        <h3
          style={{
            color: "#fff",
          }}
        >
          {totalNumber} friends
        </h3>
        <p
          style={{
            color: "#fff",
          }}
        >
          {statusOneCount} completed referrals
        </p>
      </div>
      <Link className="history-button" to={"/users"}>
        View History
      </Link>
    </div>
  );
};

export default ReferralStats;
