//src/components/InstructorNavbar.jsx

import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { instructorLogout } from "../features/auth/instructorAuthSlice";
import "../styles/Components/InstructorNavbar.css"; // optional CSS

const Instructornavbar = () => {
  const dispatch = useDispatch();   // 👈 define dispatch
  const navigate = useNavigate();   // 👈 define navigate

  const handleLogout = () => {
    dispatch(instructorLogout());   // clear redux + localStorage
    navigate("/instructor-signin"); // redirect to login page
  };
  return (
    <nav className="instructor-navbar" data-testid="instructor-navbar">
      <h4 className="navbar-brand">Kasdra Learning Platform</h4>
      <div className="nav-links">
        <Link to="/instructor/home" className="navlink">Home</Link>
        <Link to="/contact" className="navlink">Contact us</Link>
        <button className="auth-btn" onClick={handleLogout}>Sign Out</button>
      </div>
    </nav>
  );
};

export default Instructornavbar;
