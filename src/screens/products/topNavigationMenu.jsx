import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/routes';

export const TopNavBar = () => {

    const objNaviagte = useNavigate();

    const btnLogout = () => {
        localStorage.removeItem('loginStatus');
        objNaviagte(AppRoutes.login);
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
        <Container fluid>
            <Navbar.Brand href="#">
                <img border="0" 
                    alt="Google Products" 
                    src="/ProductAppImages/gproducts.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0 justify-content-center flex-grow-1 pe-3 topnav"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2" className='left-nav-selected'> * Products</Nav.Link>
                <Nav.Link href="#action3">Services</Nav.Link>
                <Nav.Link href="#action4">About us</Nav.Link>
                
            </Nav>
            <Form className="d-flex">
                <Button variant="outline-success" onClick={btnLogout}>Logout</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};