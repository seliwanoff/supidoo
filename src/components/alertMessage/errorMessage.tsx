import React from "react";

type ErrorMessageProps = {
  errors: Record<string, any>;
  message: string;
  isTrue: boolean;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errors,
  message,
  isTrue,
}) => {
  if (!isTrue) {
    return null;
  }

  return (
    <div className="messageModal error">
      {message ? (
        <div>{message}</div>
      ) : (
        Object.entries(errors).map(([field, messages]) => (
          <div key={field}>
            <strong>{field}</strong>:
            <ul>
              {messages.map((msg: any, index: any) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ErrorMessage;
