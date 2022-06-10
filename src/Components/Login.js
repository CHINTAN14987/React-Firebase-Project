import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "./Button";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = ({ setPassword, setEmail, handleAction }) => {
  return (
    <div className="login_wrapper">
      <div className="heading-wrapper">
        <h3 className="login_Heading">Please enter your Login and Password</h3>
      </div>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="email"
          label="Enter the Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Enter the Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Button title="Login" handleAction={handleAction} />

      <div className="signUpLink">
        Don't have an account? Please {""}
        <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
};

export default Login;
