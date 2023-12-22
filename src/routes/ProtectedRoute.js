import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (loading === false) {
      if (!isAuthenticated) {
        navigate("/login", {
          state: {
            previousUrl: location.pathname,
          },
        });
        // return <Navigate to="/login" />;
      }
    }
  }, [isAuthenticated, location.pathname, loading, navigate]);

  if (loading === false) {
    return children;
  }
};

export default ProtectedRoute;
