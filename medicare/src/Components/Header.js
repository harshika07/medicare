import "../css/Header.css";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Firebase/AuthContext";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../Assets/img/logo.png";

function Header() {
  let Homepage = "/";
  let Book_Appointment_Home = "/AppointmentHome";
  let Get_Report = "/GetReport";
  let FAQ = "/Faq";
  let About_Us = "/AboutUs";
  let Login_User = "/Login";
  let Profilepage = "/ProfilePage";
  let Admin_Page = "/Admin";
  const { currentUser , getRole } = useAuth();
  const newRole = getRole();
  console.log("here inside header role is " + newRole);
  console.log(currentUser);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Container fluid>
          <Link className="nav-item nav-link" to={Homepage}>
            <img className="img-responsive" src={logo} alt="brand logo" />
          </Link>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="navbar-toggler"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Link className="nav-item nav-link" to={Book_Appointment_Home}>
                Book Appointment
              </Link>
              <Link className="nav-item nav-link" to={Get_Report}>
                Get Report
              </Link>
              <Link className="nav-item nav-link" to={FAQ}>
                FAQ
              </Link>
              <Link className="nav-item nav-link" to={About_Us}>
                About Us
              </Link>
              {newRole === "admin" && (
                <Link className="nav-item nav-link" to={Admin_Page}>
                  Admin
                </Link>
              )}
              {!currentUser && (
                <Link className="nav-item  nav-link" to={Login_User}>
                  Login / Sign Up
                </Link>
              )}
              {currentUser && (
                <Link className="nav-item  nav-link" to={Profilepage}>
                  Profile Page
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
