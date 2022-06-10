import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const Navbar = ({ title }) => {
  let activeStyle = {
    textDecoration: "none",
  };

  return (
    <div className="nav">
      <div>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/home"
        >
          <Button style={{ color: "#fff", fontSize: "20px" }}>Home</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
