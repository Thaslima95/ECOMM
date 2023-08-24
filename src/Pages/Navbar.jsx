import React, { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function NavbarHeader() {
  // let user = JSON.parse(localStorage.getItem("userlogin"));
  const [user, setUser] = useState("");
  const [value, setValue] = useState();
  const [, setSearchparam] = useSearchParams();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userlogin")) || null);
  }, []);
  const logout = () => {
    localStorage.removeItem("userlogin");
    window.location.reload();
  };

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
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/smartphones">
                SmartPhones
              </Nav.Link>
              <Nav.Link as={Link} to="/laptops">
                Laptops
              </Nav.Link>
              <Nav.Link as={Link} to="/skincare">
                Skin Care
              </Nav.Link>
              <Nav.Link as={Link} to="/groceries">
                Grocery
              </Nav.Link>
              <Nav.Link as={Link} to="/home">
                Home Decors
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  setSearchparam({ search: e.target.value.toLowerCase() });
                }}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            {!user && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            &nbsp;
            {!user && (
              <Nav.Link as={Link} to="/signup">
                Register
              </Nav.Link>
            )}
            {user && (
              <NavDropdown
                title={user && user.split("@")[0]}
                id="navbarScrollingDropdown"
                className=""
              >
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/cart">
                    Cart
                    <span>
                      {(JSON.parse(localStorage.getItem(user)) &&
                        JSON.parse(localStorage.getItem(user)).length) ||
                        0}
                    </span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => logout()}>
                  Logout
                </NavDropdown.Item>
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
