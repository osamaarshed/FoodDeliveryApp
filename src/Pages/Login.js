import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
// import jwt from "jsonwebtoken"

const Login = () => {
  const [input, setInput] = useState({
    loginemail: "",
    loginpassword: "",
  });
  const [response, setResponse] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setInput((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e) => {
    const payload = {
      loginemail: input.loginemail,
      loginpassword: input.loginpassword,
    };
    e.preventDefault();
    await axios
      .post("http://localhost:8080/login", payload)
      .then((res) => {
        setResponse(res.data);
        // console.log(res.data.user);
        // console.log(res.data);
        if (res.data.user) {
          alert("Login successful");
          window.location.href = "/AdminDashboard";
        } else {
          alert("Login failed");
        }

        // console.log(response.status);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(response.user);

    // let res = await axios.post("http://localhost:8080/login", payload);
    // let data = res.data;
    // console.log(input, "this is data");
    // console.log(input.loginemail, "It is input.Login");
    // console.log(input.loginpassword, "It is input.Passowrd");
  };
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="border px-5 mt-5">
          <div>
            <form className="mb-5" onSubmit={handleSubmit}>
              <h2 className="text-center my-5">Login</h2>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="loginemail"
                  value={input.loginemail}
                  onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  name="loginpassword"
                  value={input.loginpassword}
                  onChange={handleChange}
                />
              </div>
              <div className="row">
                <div className="col-6 form-check mt-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label">Remember Password</label>
                </div>
                <div className="col-6 mt-3">
                  <a href="/">Forgot Password?</a>
                </div>
              </div>
              <div className="text-center mt-3">
                <NavLink to="/signup">
                  <a href="/">Register</a>
                </NavLink>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <button type="submit" className="btn btn-danger">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
