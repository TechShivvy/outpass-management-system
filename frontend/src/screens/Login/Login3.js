
import React, { useEffect, useState } from 'react'
import Mainscreen from '../../components/Mainscreen'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../actions/userActions"
// import "./Login.css"

const LoginScreen = ({ history }) => {

    // for storing credentials 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [error, setError] = useState(false)
    // const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    console.log("FRom login",userInfo);

    

    const navigate = useNavigate();
    
    useEffect(() => {
        if (userInfo) {
            // console.log("UserInfo_ID",userInfo.id);
            // navigate("/mynotes");
            if (userInfo.id[0]==='S') { navigate("/student");} 
            else if (userInfo.id[0]==='F') {navigate("/faculty");}  
            else {navigate("/warden");} 
        }
    }, [history, userInfo,navigate]);


    // after form submission
    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(email, password);
        dispatch(login(email, password));
    }

    return (
        <Mainscreen title="LOGIN" className="login">
            
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        // add these lines to add email address 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        // add these lines to add password 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    {/* <Form.Check type="checkbox" label="Check me out" /> */}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Mainscreen>
    )
}

export default LoginScreen