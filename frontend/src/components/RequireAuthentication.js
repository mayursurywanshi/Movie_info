import { Navigate, useLocation } from "react-router-dom";
import { getAuthentication } from "../services/authStorage";

export const RequireAuthentication = ({ children }) => {
  const location = useLocation();

  if (!getAuthentication()) {
    return (
      <Navigate
        to="/account"
        replace
        state={{
          backgroundPath: "/",
          returnPath: location.pathname,
        }}
      />
    );
  }

  return children;
};
