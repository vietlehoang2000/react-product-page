import React, { useState,useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAccount, checkAccount,logIn } from "./authenticateSlide";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";

import './authenticate.css'
import Home from "../../home";

import { useHistory } from "react-router-dom";

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";


export default function Authenticate({setproductNavStatus,setproductNavContent}) {
  const [authenStatus, setAuthenStatus] = useState("login");

  const logInStatus = useSelector((state) => state.authenticate.logInStatus);

  const [failLogInStatus,setFailLogInStatus] = useState('')

  const [inputUname, setInputUname] = useState("");
  const [inputPassWord, setInputPassWord] = useState("");

  const [validated, setValidated] = useState(false);

  const history = useHistory();

  const data={username:inputUname,password:inputPassWord}

  useEffect(() => {
        setproductNavStatus("light");
        setproductNavContent('Authenticate');
        
  }, []);


  const handleSubmitRegister = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    

    dispatch(getAccount([inputUname, inputPassWord]));
  };

  const handleSubmitLogIn = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log(inputUname,inputPassWord)
    dispatch(logIn(data)).unwrap().then((originalPromiseResult) => {

      setFailLogInStatus('');
      history.replace("/");
    })
    .catch((rejectedValueOrSerializedError) => {
      
      setFailLogInStatus(rejectedValueOrSerializedError.message)
    });
    setValidated(true);
  };

  const dispatch = useDispatch();

  return (
    <>
      (
        <div className="container authenticate">
         
          {authenStatus === "login" ? (
            <>
              <h1 className='mb-4'>Please sign in </h1>
              <Form className='col-sm-6 col-12 mb-4' noValidate validated={validated}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <InputGroup hasValidation >
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      required
                      onChange={(e) => setInputUname(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              
                <Form.Group className="mb-3" controlId="LogInPassword">
                  <InputGroup hasValidation>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Password"
                      aria-describedby="inputGroupPrepend"
                      required
                      onChange={(e) => setInputPassWord(e.target.value)}
                    />
                    
                  </InputGroup>
                  <div className="failStatus mt-3">
                      {failLogInStatus}
                    </div>
                </Form.Group>

                <Button variant="primary" onClick={(e) => handleSubmitLogIn(e)}>
                  Log In
                </Button>
              </Form>
            </>
          ) : (
            <>
              <h1 className='mb-4'>Regist your account</h1>
              <Form className='col-sm-6 col-12 mb-4' noValidate validated={validated}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      size="lg"
                      type="email"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      required
                      onChange={(e) => setInputUname(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <InputGroup hasValidation>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Password"
                      aria-describedby="inputGroupPrepend"
                      required
                      onChange={(e) => setInputPassWord(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter password.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={(e) => handleSubmitRegister(e)}
                >
                  Sign Up
                </Button>
              </Form>
            </>
          )}
           <button className='btn--login mb-1' onClick={() => setAuthenStatus("login")}>Sign in your account</button>
           <br/>
          <button className='btn--regis' onClick={() => setAuthenStatus("register")}>Create an account</button>
        </div>
      
      )
      
      
    </>
  );
}
