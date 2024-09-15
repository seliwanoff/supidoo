import React, { useState, useEffect } from "react";

interface TimerProps {
  onResend: () => void;
}

const Timer: React.FC<TimerProps> = ({ onResend }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    if (canResend) {
      onResend();
      setTimeLeft(600); // Reset timer to 10 minutes
      setCanResend(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "10px",
        justifyContent: "space-between",
      }}
    >
      <p>
        Time left to resend token:{" "}
        <span
          style={{
            color: "#fa4299",
            fontWeight: "600",
          }}
        >
          {formatTime(timeLeft)}
        </span>
      </p>
      {timeLeft === 0 && (
        <button
          onClick={handleResend}
          disabled={!canResend}
          style={{
            padding: "0px",
            marginTop: "-20px",
            color: "#fa4299",
            fontWeight: "600",
          }}
        >
          Resend Token
        </button>
      )}
    </div>
  );
};

export default Timer;
