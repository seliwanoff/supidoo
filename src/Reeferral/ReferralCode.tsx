import { useSelector } from "react-redux";

import React from "react";
import "./RefferalCode.css";
import { RootState } from "../store/store";

const ReferralCode = () => {
  const referralCode = "RtmHlbLR";
  const user = useSelector((state: RootState) => state.user.user);
  //console.log(user);

  return (
    <div className="referral-code">
      <div className="code-section">
        <p>Your referral code</p>
        <div className="code-copy">
          <input type="text" value={user.data.username} readOnly />
          <button
            onClick={() => navigator.clipboard.writeText(user.data.username)}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralCode;
