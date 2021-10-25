import React, { useState } from "react";

import { Offcanvas, ToggleButton, NavItem, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <ToggleButton
        className="ion-navicon-round"
        style={{
          border: "none",
          backgroundColor: "white",
          color: "black",
          fontSize: "30px",
        }}
        onClick={handleShow}
      />

      <Offcanvas show={show} onHide={handleClose} className="sidebar-body">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="sidebar-text">ADMIN</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav fill justify className="flex-column">
            <div className="container-fluid">
              <NavItem className="sidebar-navitem">
                <Link className="sidebar-link" to="/Admin">
                  Dashboard
                </Link>
              </NavItem>
            </div>
            <NavItem className="sidebar-navitem">
              <Link className="sidebar-link" to="/AvailableTests">
                Available Tests
              </Link>
            </NavItem>
            <NavItem className="sidebar-navitem">
              <Link className="sidebar-link" to="/CurrentTests">
                Current Tests
              </Link>
            </NavItem>

            <NavItem className="sidebar-navitem">
              <Link className="sidebar-link" to="/UsersPage">
                Users
              </Link>
            </NavItem>
            <NavItem className="sidebar-navitem">
              <Link className="sidebar-link" to="/AdminTable">
                Admin
              </Link>
            </NavItem>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Sidebar;
