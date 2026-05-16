import { Navigate } from "react-router-dom";

const ProtectedVendor = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user || user.role !== "vendor") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedVendor;