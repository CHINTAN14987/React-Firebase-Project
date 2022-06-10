import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Components/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { app } from "./firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate("/home");
          localStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/wrong-password") {
            toast.error("Please check the Password");
          }
          if (error.code === "auth/user-not-found") {
            toast.error("Please check the Email");
          }
        });
    }
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate("/home");
          localStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email Already in Use");
          }
        });
    }
  };

  useEffect(() => {
    let authToken = localStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="App">
      <>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Login
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(2)}
              />
            }
          />

          <Route path="/home" element={<Home />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
