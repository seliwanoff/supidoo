import React from "react";
import "./InviteSection.css";

const InviteSection = () => {
  return (
    <div className="invite-section">
      <h2>Spread the love!</h2>
      <p>
        Invite your friends and family to enjoy supidoo with your referral code
      </p>
      <div className="invite-images">
        <div className="invite-image"></div>
        <div className="invite-image"></div>
        <div className="invite-image"></div>
        <div className="gift-image"></div>
      </div>
      <p className="terms">Referral Terms & Conditions</p>
    </div>
  );
};

export default InviteSection;
