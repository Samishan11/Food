import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCartStore from "../../zustand/store";
import logo from "../images/logo/logo.png";
import "./style.css";

const NavigationBar = ({ token }) => {
  let carts = useCartStore();
  const [colorChange, setColorChange] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY > 0) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  useEffect(() => {
    carts.getCarts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);
    return () => {
      window.removeEventListener("scroll", changeNavbarColor);
    };
  }, []);

  const logout = () => {
    localStorage.clear("token");
    window.location = "/";
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${
          colorChange
            ? "navbar bg-white fixed-top nav_bar navbar-light"
            : "navbar fixed-top nav_baralt navbar-light"
        } `}
      >
        <Container>
          <Link className="navbar-brand d-flex mx-5" to="/">
            <img width={55} src={logo} alt="" />
            <span className="my-auto">Kandu2.0</span>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            className=" py-1"
            style={{ visibility: "visible" }}
            id="navbarScroll"
          >
            <Nav navbarScroll className="mx-auto  mb-2 mb-lg-0">
              <Nav.Link as={Link} to="/" className="fw-bold text-red h6 mx-2">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/food" className="fw-bold h6 mx-2">
                Food
              </Nav.Link>
              <Nav.Link as={Link} to="#" className="fw-bold h6 mx-2">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="fw-bold h6 mx-2">
                Contact
              </Nav.Link>
              {token && (
                <Nav.Link as={Link} to="/order" className="fw-bold h6 mx-2">
                  My Order
                </Nav.Link>
              )}
            </Nav>
            {token && (
              <div className="cart-count mx-5">
                <Link to="/cart" className="fa fa-shopping-cart h5 ">
                  <small>{carts?.carts?.length}</small>
                </Link>
              </div>
            )}
            <div className="log_reg my-auto d-block">
              {token ? (
                <button
                  onClick={logout}
                  className="btn btn-outline-danger mx-2"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-warning mx-2">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-outline-warning mx-2">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
