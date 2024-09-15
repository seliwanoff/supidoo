import React, { useState } from "react";
import "./PasswordUpdateCard.css";
interface PasswordProps {
  handleUpdatePassword: any;
  setPassword: (content: string) => void;
  setOldPassword: (content: string) => void;
  loader: boolean;
  ldPassword: string;
  password: string;
}
const PasswordUpdateCard: React.FC<PasswordProps> = ({
  handleUpdatePassword,
  setOldPassword,
  setPassword,
  loader,
  password,
  ldPassword,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div className="cardss">
        <h2 className="text-w">Update Password</h2>
        <div className="input-group">
          <label htmlFor="current-password" className="text-w">
            Current Password
          </label>
          <input
            type="password"
            id="current-password"
            value={ldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="new-password" className="text-w">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleUpdatePassword} className="button">
          {loader ? "Updating" : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default PasswordUpdateCard;
