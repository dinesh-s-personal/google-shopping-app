import React from "react";
import { Alert, Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useCreateAccountMutation } from "../../redux/service/users";
import { AppRoutes } from "../../router/routes";

export const CreateUserAccount = () => {

    const objNavigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [retypepwd, setReTypePwd] = React.useState('');
    const [useremail, setUserEmail] = React.useState('');
    const [creationFailure, setCreationFailure] = React.useState(false);
    const [isValidationFailure, setValidationFailure] = React.useState(true);

    const [addAccount, {isLoading, isError} ] = useCreateAccountMutation();

    const onFormSubmit = (event) => {
        event.preventDefault();
    };

    const btnCreateUser = () => {
        addAccount({
            name: username,
            email: useremail,
            password: pwd
        }).then(res => {
            if (res.data) {
                alert('New account created. Happy shopping!!!');
                objNavigate(AppRoutes.login);
            }else{
                setCreationFailure(true);
            }
        });
    };

    const btnRetypePwdChange = (e) => {
        const tmpRetypePassword = e.target.value;
        setReTypePwd(tmpRetypePassword);
        if (tmpRetypePassword === pwd)
        {
            setValidationFailure(false);
        }
        else {
            setValidationFailure(true);
        }
    }

    return <div className="container">
        <div className="left-section">
            <Image src="./ProductAppImages/google-shopping-visuel.jpg" fluid />
        </div>
        <div className="right-section">
            <div className="login-form">
                <h2>Welcome to Google Store!</h2>
                <Form onSubmit={onFormSubmit} className="form-container" autoComplete="off">
                    <Row>
                        <h6>Register your account</h6>
                    </Row>
                    
                    <Row>
                        <Form.Group as={Row} controlId="formHorizontalUserName">
                            <Form.Label column sm={25}>
                            Username
                            </Form.Label>
                            <Col sm={25}>
                            <Form.Control required type="text" placeholder="username" 
                                value={username} onChange={(e) => { setUsername(e.target.value) }}/>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Row} controlId="formHorizontalUserEmail">
                            <Form.Label column sm={25}>
                            Email ID
                            </Form.Label>
                            <Col sm={25}>
                            <Form.Control required type="email" placeholder="Email Id" 
                                value={useremail} onChange={(e) => { setUserEmail(e.target.value) }}/>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCreatePassword">
                            <Form.Label column sm={25}>
                            Create Password
                            </Form.Label>
                            <Col sm={25}>
                            <Form.Control required type="password" placeholder="Password" 
                                value={pwd} onChange={(e) => {setPwd(e.target.value)}}/>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalReTypePassword">
                            <Form.Label column sm={25}>
                            Retype Password
                            </Form.Label>
                            <Col sm={25}>
                            <Form.Control required type="password" placeholder="Password" 
                                value={retypepwd} onChange={btnRetypePwdChange}/>
                                
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Col >
                            <Button id="createAccount" disabled={isValidationFailure} 
                                    variant="primary" type="submit" onClick={btnCreateUser}>
                                        {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                            </Col>
                        </Form.Group>
                    </Row>

                    {(creationFailure || isError) && <div>
                    <br />
                    <br />
                    <Alert className='mb-3' variant='danger'>Something went wrong!! Account creation failed. Try after sometime.</Alert> </div>}
                </Form>
            </div>
        </div>
    </div>
}