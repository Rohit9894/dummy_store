import { store } from "@/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((store) => store.auth);

  if (loading) {
    return <div>Loading...</div>; 
  }
  if (!isAuthenticated ) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
