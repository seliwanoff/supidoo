import React, { useEffect, useState } from "react";
import "./RefferalCode.css";

import "./ReferralPage.css";
import CashbackSection from "./CashbackSection";
import ReferralStats from "./ReferralStats";
import ReferralCode from "./ReferralCode";
import InviteSection from "./InviteSection";
import axios from "axios";
import BottomNavigationBar from "../components/bottomNavigationBar/navigatinBar";

const ReferralPage = () => {
  interface User {
    fname: string;
    lname: string;
    email: string;
    status: number; // Assuming 'status' is a number
  }
  const [referredUsers, setReferredUsers] = useState<User[]>([]);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [statusOneCount, setStatusOneCount] = useState<number>(0);
  const [statusZeroCount, setStatusZeroCount] = useState<number>(0);

  useEffect(() => {
    const getAllRefer = async () => {
      try {
        const response = await axios.get("/getallrefers");
        //console.log(response);

        const users: User[] = response.data.data;

        setTotalNumber(users.length);
        setReferredUsers(users);

        const statusOneUsers = users.filter((user) => user.status === 1);
        const statusZeroUsers = users.filter((user) => user.status === 0);

        setStatusOneCount(statusOneUsers.length);
        setStatusZeroCount(statusZeroUsers.length);
      } catch (error) {
        console.error(error);
      }
    };

    getAllRefer();
  }, []);
  return (
    <>
      <div className="referral-page">
        <header className="referral-header">
          <h1>Referrals</h1>
        </header>
        <CashbackSection />
        <ReferralStats
          totalNumber={totalNumber}
          statusOneCount={statusOneCount}
        />
        <InviteSection />
        <ReferralCode />
      </div>
      <BottomNavigationBar />
    </>
  );
};

export default ReferralPage;
