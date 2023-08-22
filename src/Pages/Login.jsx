import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logindetails, setloginDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const values = JSON.parse(localStorage.getItem("login")) || [];
    setloginDetails(values);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const found = logindetails.find((e) => e.email == email);
    if (found) {
      if (found.password == password) {
        localStorage.setItem("userlogin", JSON.stringify(found));
        navigate("/");
      } else {
        alert("Wrong Password");
      }
    } else {
      alert("User not exist please register");
    }
  };
  return (
    <Container fluid>
      <Row>
        <Col
          lg={{ offset: 4, span: 4 }}
          md={{ offset: 3, span: 6 }}
          sm={{ offset: 1, span: 10 }}
        >
          <Card className="mt-3 p-3 signup">
            <Card.Title>Login</Card.Title>
            <Card.Body>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
                disabled={!(email.length > 0 && password.length > 0)}
              >
                Login
              </Button>
            </Card.Body>
            <Link to="/signup">
              <Button className="registerButton">Create an account</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
