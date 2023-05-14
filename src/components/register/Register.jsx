import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { toast } from "react-toastify";
// import { Toast } from 'react-toastify/dist/components'
import axios from "axios";
const Register = () => {
  const navigation = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post("/register", {
        username,
        email,
        password,
      });
      // Toast.error('oops!.. something went wrong', {position:Toast.POSITION.TOP_RIGHT})
      console.log(responce.data.success);
      if (responce.data.success === "true") {
        toast.success("sucessfully register", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigation("/login");
      } else {
        toast.error("user already exist", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("user already exist");
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
      <div className="container register">
        <form onSubmit={register} className="register-form bg-light py-5">
          <p>Register</p>
          <div className="form-group my-2">
            <input
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              type="text"
              className="text-center form-control d-block mx-auto input100"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="username"
            />
          </div>
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
          <button
            type="submit"
            className="d-block mt-3 mx-auto btn btn-outline-dark h6 px-3"
          >
            Sign in
          </button>
          <p className="my-3" style={{ fontSize: ".8rem" }}>
            Already have an account?&nbsp;
            <Link className="text-success" to="/login">
              sign in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
