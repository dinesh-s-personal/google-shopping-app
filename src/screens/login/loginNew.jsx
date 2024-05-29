import React from 'react';
import { Alert, Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/routes';
import { useGetLoginUserDetailsQuery } from '../../redux/service/users';

const LoginAppNew = () => {

    const objNavigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [outputDtls, setOutput] = React.useState('');
    const [loginFailure, setLoginFailure] = React.useState(true);

    const {isError, data} = useGetLoginUserDetailsQuery(null, { refetchOnMountOrArgChange: true });

    const onFormSubmit = (event) => {
        event.preventDefault();
    };

    const btnLogin = () => {

        const filteredData = data.filter(user => (user.email.toLowerCase() === username.toLowerCase() && user.password === pwd))
    
        if (filteredData.length > 0)
        {
            setOutput(localStorage.setItem('loginStatus','Login successful')); 
        }
        else{
            setOutput(localStorage.setItem('loginStatus','Login Failed. Try again!!!'));
        }
        (isError && localStorage.setItem('loginStatus','Login Failed. Try again!!!'));
        
        setUsername('');
        setPwd('');
        if (localStorage.getItem('loginStatus') === 'Login successful'){
            setLoginFailure(true);
            objNavigate(AppRoutes.products);
        }
        else{
            setOutput('Login unsuccessful. Try again!!!');
            setLoginFailure(false);
        }
    };

    return (
        <div className="login-container">
            <div className="left-section">
                <Image src="./ProductAppImages/google-shopping-visuel.jpg" fluid />
            </div>
            <div className="right-section">
                <div className="login-form">
                    <h2>Login</h2>
                    <Form onSubmit={onFormSubmit} className="form-container">
                        
                        <h6>Provide your login credentials</h6>
                    
                        <Form.Group as={Row} controlId="formHorizontalUserName">
                            <Form.Label column sm={25}>
                            Email
                            </Form.Label>
                            <Col sm={25}>
                            <Form.Control required type="email" placeholder="Email" 
                                value={username} onChange={(e) => { setUsername(e.target.value) }}/>
                            </Col>
                        </Form.Group>
                    
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={25}>
                            Password
                            </Form.Label>
                            <Col sm={25}>
                            <Form.Control required type="password" placeholder="Password" 
                                value={pwd} onChange={(e) => {setPwd(e.target.value)}}/>
                            </Col>
                        </Form.Group>
                    
                        <Form.Group as={Row} className="mb-3">
                            <Col >
                            <Button variant="primary" type="submit" onClick={btnLogin}>Login</Button>
                            </Col>
                        </Form.Group>
                    
                        <Form.Group as={Row} className="mb-3">
                            <Col >
                            <span>Not a user? <a href="/create-acct">Create Account!</a></span>
                            </Col>
                        </Form.Group>
                        

                        {!loginFailure && <div>
                        <br />
                        <br />
                        <Alert className='mb-3' variant='danger'>{outputDtls}</Alert> </div>}
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginAppNew;
