import React from "react";

type SuccessMessageProps = {
  message: string;
  isTrue: any;
};

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, isTrue }) => {
  return isTrue && <div className="messageModal">{message}</div>;
};

export default SuccessMessage;
