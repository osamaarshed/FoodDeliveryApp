import React from "react";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
// import axios from "axios";

const Navbar = () => {
  // const navigate = useNavigate();
  // const handleAuthentication = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("jwttoken");
  //   await axios
  //     .post(
  //       "http://localhost:8080/AdminDashboard/Menu",
  //       { data: "Example" },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data.user);
  //       if (res.data.user) {
  //         navigate("/AdminDashboard/Menu");
  //       } else {
  //         navigate("/login");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(
  //         "This is The Error of Authentication on AdminDashboard" + err
  //       );
  //     });
  // };

  const logout = () => {
    localStorage.removeItem("jwttoken");
  };

  return (
    <div className="container-fluid px-5 bg-light">
      <div className="contaier">
        <nav className="navbar navbar-expand-lg navbar-light">
          <NavLink to="/AdminDashboard">
            <a className="navbar-brand" href="/">
              Admin Panel
            </a>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink to="/AdminDashboard">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </NavLink>
              </li>
              {localStorage.getItem("jwttoken") ? (
                <>
                  <NavDropdown title="Menu" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <NavLink to="/AdminDashboard/Menu">Add Menu</NavLink>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <NavLink to="/AdminDashboard/MenuList">
                        Menu List{" "}
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <li className="nav-item">
                    <NavLink to="/AdminDashboard/MyOrders">
                      <a className="nav-link" href="/">
                        Order Details
                      </a>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/AdminDashboard/ContactMessages">
                      <a className="nav-link" href="/">
                        Messages
                      </a>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" onClick={logout}>
                      <a className="nav-link" href="/">
                        Logout
                      </a>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/Login">
                      <a className="nav-link" href="/">
                        LoginIn
                      </a>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/Signup">
                      <a className="nav-link" href="/">
                        SignUp
                      </a>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
