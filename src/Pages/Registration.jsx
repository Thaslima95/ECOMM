import React from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const password = useRef("");
  const [cpassword, setcPassword] = useState("");
  const [error, setError] = useState("");
  const [login, setLogin] = useState([]);

  const [pwdValidation, setPwdValidation] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
  });

  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    const values = JSON.parse(localStorage.getItem("login")) || [];
    setLogin(values);
  }, []);

  const { lowercase, uppercase, number, symbol, length } = pwdValidation;

  useEffect(() => {
    const isPwdValid = Object.values(pwdValidation).every(Boolean);
    console.log({ isPwdValid });
    setIsValid(isPwdValid);
    console.log({ isValid });
  }, [pwdValidation]);

  const validatePasword = (e) => {
    const password = e.target.value;
    console.log(password);
    // regex.test(string)
    const lowercase = /(?=.*[a-z])/.test(password);
    const uppercase = /(?=.*[A-Z])/.test(password);
    const number = /(?=.*\d)/.test(password);
    const symbol = /(?=.*[\W_])/.test(password);
    const length = password.length >= 8;
    // setPassword(password);
    setPwdValidation({ lowercase, uppercase, number, symbol, length });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
    console.log(JSON.stringify(password) + "Password");
    if (JSON.stringify(password) != cpassword) {
      alert("Password doesn't match");
    }
    if (login.length == 0) {
      setLogin([...login, { email: email, password: password }]);
      localStorage.setItem(
        "login",
        JSON.stringify([...login, { email: email, password: password }])
      );
    } else {
      if (login.some((e) => e.email == email)) {
        return alert("user already exist");
      } else {
        setLogin([...login, { email: email, password: password }]);
        localStorage.setItem(
          "login",
          JSON.stringify([...login, { email: email, password: password }])
        );
      }
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
            <Card.Title>Signup</Card.Title>
            <Card.Body>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => validatePasword(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setcPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={!isValid}
                onClick={(e) => handleSubmit(e)}
              >
                Signup
              </Button>
            </Card.Body>
            <div className="pwd-strength">
              <div className={lowercase ? "text-success" : "text-danger"}>
                {lowercase ? "" : "Lowercase character :- a-z"}
              </div>
              <div className={uppercase ? "text-success" : "text-danger"}>
                {uppercase ? "" : "Uppercase character :- A-Z"}
              </div>
              <div className={number ? "text-success" : "text-danger"}>
                {number ? "" : "Numeric character :- 0-9"}
              </div>
              <div className={symbol ? "text-success" : "text-danger"}>
                {symbol ? "" : "Special character :- !@#$%^&*()_+"}
              </div>
              <div className={length ? "text-success" : "text-danger"}>
                {length ? "" : "Password should consist of 8 or more character"}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
