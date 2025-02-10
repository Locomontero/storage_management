import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }, [navigate]);


  return <h2> You have been successfully logged out!</h2>;
};

export default LogoutPage;
