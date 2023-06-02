import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "https://food-backend-50oj.onrender.com/api/login",
        {
          email,
          password,
        }
      );
      if (responce.data.token && responce.data.verified === false) {
        navigation("/otp-verification", { state: { email: email } });
      } else if (responce.data.verified && responce.data.role === 0) {
        toast.success("Sucessfully login", {
          position: toast.POSITION.TOP_RIGHT,
        });
        localStorage.setItem("token", responce.data.token);
        window.location = "/";
      } else if (responce.data.role === 1 && responce.data.verified) {
        localStorage.setItem("token", responce.data.token);
        window.location = "/admin";
      } else {
        toast.error("email or password not match", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("email or password not match");
      }
    } catch (error) {
      toast.error("oops!.. something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="container login">
        <form onSubmit={login} className="login-form bg-light py-4">
          <p>Login</p>
          <div className="form-group my-2">
            <input
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              type="email"
              className="text-center form-control d-block mx-auto input100"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="email"
            />
          </div>
          <div className="form-group my-2">
            <input
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              type="password"
              className="text-center form-control d-block mx-auto input100"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="password"
            />
          </div>
          <Link
            to={`/forgot-password`}
            className="d-block text-center mx-5"
            style={{ fontSize: ".7rem", cursor: "pointer" }}
          >
            Forgot password?
          </Link>
          <button className="d-block mt-3 mx-auto btn btn-outline-dark h6 px-3">
            Sign in
          </button>
          <div className="social-icon mt-4">
            <h6>OR LOGIN WITH</h6>
            <div className="icons mt-3">
              <i className="fab fa-google h4"></i>
              <i className="fab fa-facebook mx-3 h4"></i>
              <i className="fab fa-instagram  h4"></i>
            </div>
          </div>
          <p className="my-3" style={{ fontSize: ".8rem" }}>
            Don't have an account?&nbsp;
            <Link className="text-success" to="/register">
              sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
