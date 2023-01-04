import React from "react";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navbar = () => {
  return (
    <div className="container-fluid px-5 bg-light">
      <div className="contaier">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            Admin Panel
          </a>
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
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>

              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavLink to="/AdminDashboard/Menu">
                  <NavDropdown.Item href="#action/3.1">
                    Add Menu
                  </NavDropdown.Item>
                </NavLink>
                <NavDropdown.Divider />
                <NavLink to="/AdminDashboard/MenuList">
                  <NavDropdown.Item href="#action/3.2">
                    Menu List
                  </NavDropdown.Item>
                </NavLink>
              </NavDropdown>

              <li className="nav-item">
                <NavLink to="/AdminDashboard/MyOrders">
                  <a className="nav-link" href="/">
                    Order Details
                  </a>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
