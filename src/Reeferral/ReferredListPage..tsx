import React, { useEffect, useState } from "react";
import axios from "axios";
import ReferredUser from "./ReferredUser";
import "./ReferralListPage.css";
import BottomNavigationBar from "../components/bottomNavigationBar/navigatinBar";

interface User {
  username: string;
  created_at: string;
  status: string;
}

const ReferralListPage: React.FC = () => {
  const [referredUsers, setReferredUsers] = useState<User[]>([]);

  useEffect(() => {
    const getAllRefer = async () => {
      try {
        const response = await axios.get("/getallrefers");
        setReferredUsers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllRefer();
  }, []);
  // console.log(referredUsers);

  return (
    <>
      <div className="referral-list-page">
        <header className="referral-header">
          <h1>Referred Users</h1>
        </header>
        <div className="referred-users-list">
          {referredUsers.map((user, index) => (
            <ReferredUser
              key={index}
              username={user.username}
              email={user.created_at}
              status={user.status}
            />
          ))}
        </div>
      </div>
      <BottomNavigationBar />
    </>
  );
};

export default ReferralListPage;
