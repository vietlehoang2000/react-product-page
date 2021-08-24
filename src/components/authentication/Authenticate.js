import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccount, checkAccount } from "./authenticateSlide";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Authenticate() {
  const [authenStatus, setAuthenStatus] = useState("login");

  const userName = useSelector((state)=>state.authenticate.userName);
  const passWord = useSelector((state)=>state.authenticate.passWord);

  const dispatch = useDispatch();
  
  return (
    <div className="container">
      <button onClick={() => setAuthenStatus("login")}>LogIn</button>
      <button onClick={() => setAuthenStatus("register")}>Register</button>
      {authenStatus === "login" ? (
        <>
          <h1>Logging in </h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      ) : (
        <>
          <h1>Regist your account</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}
