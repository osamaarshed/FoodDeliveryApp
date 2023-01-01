import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt.decode(token);
      console.log(user);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Populated");
      }
    }
  }, []);

  return <div>AdminDashboard</div>;
};

export default AdminDashboard;
