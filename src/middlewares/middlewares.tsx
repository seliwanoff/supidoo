// middlewares/authMiddleware.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store/store";

interface MiddlewareProps {
  children: JSX.Element;
}

// Middleware to protect routes that require authentication
export const AuthMiddleware: React.FC<MiddlewareProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();

  // Allow access to /email route for both authenticated and unauthenticated users
  if (location.pathname === "/email") {
    return children;
  }

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, allow access to the protected route
  return children;
};

// Middleware to protect routes that should only be accessible to unauthenticated users
export const GuestMiddleware: React.FC<MiddlewareProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();

  // Allow access to /email route for both authenticated and unauthenticated users
  if (location.pathname === "/email") {
    return children;
  }

  // If the user is logged in, redirect to the dashboard
  if (user !== null) {
    return <Navigate to="/dashboard" />;
  }

  // If the user is not logged in, allow access to the guest route
  return children;
};
