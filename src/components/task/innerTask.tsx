import React, { useState, useEffect } from "react";
import Header from "../../components/alertMessage/header/header";
import BottomNavigationBar from "../../components/bottomNavigationBar/navigatinBar";
import { getUserTaskList } from "../../request/_request";
import axios from "axios"; // Make sure axios is imported
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface StreakDay {
  day: number;
  reward: number;
  claimed: boolean;
  date: string;
}

interface StreakData {
  currentStreak: number;
  lastClaimed: Date | null;
  totalPoints: number;
  tasks: StreakDay[];
}

const DailyStreaks = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    lastClaimed: null,
    totalPoints: 0,
    tasks: [],
  });

  useEffect(() => {
    const getUserDailyStreak = async () => {
      await getUserTaskList()
        .then((res) => {
          setStreakData((prevData) => ({
            ...prevData,
            tasks: res.data.data, // Assign tasks from API
          }));
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getUserDailyStreak();
  }, []);

  const isNewDay = (lastClaimed: Date | null) => {
    if (!lastClaimed) return true;
    const lastClaimedDate = new Date(lastClaimed);
    const currentDate = new Date();
    return currentDate.getDate() !== lastClaimedDate.getDate();
  };

  const handleClaim = async (taskIndex: number) => {
    // console.log(taskIndex);
    if (!isNewDay(streakData.lastClaimed)) {
      alert("You've already claimed your reward for today!");
      return;
    }

    const today = new Date().toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const currentTask = streakData.tasks[taskIndex];
    //console.log("task date", currentTask.date);
    //console.log("date", today);
    if (currentTask.date !== today) {
      alert("You can only claim today's task!");
      return;
    }

    if (currentTask.claimed) {
      alert("You've already claimed this reward!");
      return;
    }

    try {
      // Send POST request to update task claim status
      const response = await axios.post("/updatetask");

      const updatedTasks = [...streakData.tasks];
      updatedTasks[taskIndex].claimed = true;
      const newTotalPoints =
        streakData.totalPoints + updatedTasks[taskIndex].reward;

      const updatedData = {
        ...streakData,
        currentStreak: streakData.currentStreak + 1,
        lastClaimed: new Date(),
        totalPoints: newTotalPoints,
        tasks: updatedTasks,
      };

      setStreakData(updatedData);
      localStorage.setItem("streakData", JSON.stringify(updatedData));

      // Automatically reset streak if all tasks are claimed
      if (updatedData.currentStreak === updatedTasks.length) {
        setTimeout(() => resetStreak(), 3000);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("There was an error claiming your reward. Please try again.");
    }
  };

  const resetStreak = () => {
    const resetTasks = streakData.tasks.map((task) => ({
      ...task,
      claimed: false,
    }));
    const resetData = {
      currentStreak: 0,
      lastClaimed: null,
      totalPoints: streakData.totalPoints,
      tasks: resetTasks,
    };
    setStreakData(resetData);
    localStorage.setItem("streakData", JSON.stringify(resetData));
  };

  const handleWithdraw = () => {
    alert(`You have withdrawn ₦${streakData.totalPoints.toLocaleString()}!`);
    resetStreak(); // Reset streak after withdrawal.
  };

  const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD

  // Find the index of today's task
  const todayTaskIndex = streakData.tasks.findIndex(
    (task) => task.date === today
  );

  // Ensure todayTaskIndex is valid
  const validTaskIndex = todayTaskIndex === -1 ? 0 : todayTaskIndex;

  // Select the 2 previous tasks (if available), today's task, and 7 upcoming tasks
  console.log(streakData);
  const filteredTasks = streakData.tasks.slice(
    Math.max(0, validTaskIndex - 2), // Two previous tasks
    validTaskIndex + 8 // Today's task + 7 upcoming
  );

  return (
    <>
      <div className="streak-container">
        {user.data?.status === 1 && (
          <>
            <h1>🌟 Daily Task Rewards 🌟</h1>
            <p className="instruction">
              Come back every day to claim your reward! Click the card to claim
              today's reward.
            </p>
            {/***
        <p className="total-points">
          Total Balance: ₦{streakData.totalPoints.toLocaleString()}
        </p>

        <button className="withdraw-button" onClick={handleWithdraw}>
          Withdraw Points
        </button>
        */}

            <div className="streak-cards">
              {filteredTasks.map((task, index) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ fontSize: "12px" }}>Day {task.day}</p>
                  <div
                    key={index}
                    className={`streak-card ${
                      task.date === today ? "active" : ""
                    } ${task.claimed ? "claimed" : ""}`}
                    onClick={() => handleClaim(task.day - 1)}
                  >
                    <p className="reward-text">₦1k</p>
                  </div>
                </div>
              ))}
            </div>

            <style>{`
        .streak-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f0f4f8;
          text-align: center;
          padding: 20px;
        }

        h1 {
          font-size: 24px;
          color: #fa4299;
          margin-bottom: 10px;
        }

        .instruction {
          font-size: 16px;
          margin-bottom: 10px;
          color: #333;
          display:block;
          position:relative;
          padding-top:20px;
          padding-bottom:20px;
          margin-top:20px;
          margin-bottom:20px;
          background:none;
          font-size:1rem
          font-weight:600
        }
.reward-text{
font-size:12px
}
        .total-points {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        .withdraw-button {
          padding: 10px 30px;
          font-size: 16px;
          font-weight: bold;
          color: white;
          background-color: #fa4299;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-bottom: 20px;
        }

        .withdraw-button:hover {
          background-color: #e3574e;
        }

        .streak-cards {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .streak-card {

padding:4px;

          background: linear-gradient(145deg, #ffcb66, #fa4299);
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .streak-card:hover {
          transform: translateY(-5px);
        }

        .streak-card.active {
          border: 2px solid #3b82f6; /* Apply border color to indicate today's task */
          animation: glow 1.5s infinite alternate;
        }

        @keyframes glow {
          from {
            box-shadow: 0 0 10px #3b82f6;
          }
          to {
            box-shadow: 0 0 20px #3b82f6;
          }
        }

        .streak-card.claimed {
          background: #b0e57c;
        }

        .claimed-text {
          font-size: 11px;
          color: #4caf50;
        }
      `}</style>
          </>
        )}
      </div>
      {user.data?.status !== 1 && (
        <>
          <div className="verify-container">
            <p className="verify-message">
              Verify your account to start earning rewards!
            </p>
            <button
              className="verify-button"
              onClick={() => navigate("/dashboard")}
            >
              Go back
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default DailyStreaks;
