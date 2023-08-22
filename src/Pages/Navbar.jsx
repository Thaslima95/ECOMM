import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function NavbarHeader() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const values = JSON.parse(localStorage.getItem("userlogin"));
    setUser(values);
  }, []);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">SHOP CART</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link to="/">Home</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

            {!user && <Nav.Link>Login</Nav.Link>}

            {!user && <Nav.Link> Register</Nav.Link>}

            {user && (
              <NavDropdown
                title={user.email && user.email.split("@")[0]}
                id="navbarScrollingDropdown"
                className=""
              >
                <NavDropdown.Item>
                  <Nav.Link>Cart</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavbarHeader;
