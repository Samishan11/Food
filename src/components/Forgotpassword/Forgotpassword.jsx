import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setmsg] = useState("");
  const forgotpassword = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("https://food-backend-50oj.onrender.com/api/forgot-password", {
          email,
        })
        .then((d) => {
          setmsg(d.data);
          console.log(d);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container login">
        <form onClick={forgotpassword} className="login-form bg-light py-4">
          <p>Forgot Password</p>
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
          <Link
            to={`/forgot-password`}
            className="d-block mx-5 text-center"
            style={{ fontSize: ".7rem", cursor: "pointer" }}
          >
            Resend Link?
          </Link>
          <button className="d-block mt-3 mx-auto btn btn-outline-dark h6 px-3">
            send
          </button>
          <p className="text-center text-success h6">{msg}</p>
        </form>
      </div>
    </>
  );
};

export default Forgotpassword;
