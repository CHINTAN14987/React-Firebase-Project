import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "./Button";
import "./SignUp.css";
const SignUp = ({ setPassword, setEmail, handleAction }) => {
  return (
    <div className="SignUp_Wrapper">
      <h3 className="signUp_Heading">Sign UP</h3>
      <div className="heading_wrapper">
        <h3>Please fill in this form to create an account::</h3>
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

      <Button title="Register" handleAction={handleAction} />
    </div>
  );
};
export default SignUp;
