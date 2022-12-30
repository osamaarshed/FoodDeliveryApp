import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const Signup = () => {
  const [credentials, setCredentials] = useState({
    signupemail: "",
    signuppassword: "",
    signupconfirmpassword: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setCredentials((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <div className="container d-flex justify-content-center">
        <div className="border px-5 mt-5">
          <div>
            <form className="mb-5">
              <h2 className="text-center my-5">Signup</h2>
              <div className="form-group">
                <label>Email address:</label>
                <input
                  type="email"
                  className="form-control"
                  id="InputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="signupemail"
                  value={credentials.signupemail}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="InputPassword"
                  placeholder="Password"
                  name="signuppassword"
                  value={credentials.signuppassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="InputConfirmPassword"
                  placeholder="Confirm Password"
                  name="signupconfirmpassword"
                  value={credentials.signupconfirmpassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <NavLink to="/login">
                  <a href="/">Already a User? CLick to LogIn</a>
                </NavLink>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <button type="submit" className="btn btn-danger">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;