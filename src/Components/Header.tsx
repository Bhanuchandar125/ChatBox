import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import {BsPersonCircle} from 'react-icons/bs';


function Header() {
  return (
    <Navbar expand="lg" className=" navbarBg ">
      <Container fluid >
        <Navbar.Brand href="#"><img src='https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_chat_default_1x.png'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className=" me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='navitems' href="#action1">Chats</Nav.Link>
            <Nav.Link className='navitems' href="#action2">Spaces</Nav.Link>
            
            <Nav.Link className='navitems' href="#action3" >
              Meets
            </Nav.Link>
            <NavDropdown className='navitems' title="Active" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Active</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Do not disturb
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item href="#action5">
                Set away
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Find People, Spaces and meets"
              className="searchbar me-2"
              aria-label="Search"
            />
            <Button variant="success">Search</Button>
          </Form>
          <BsPersonCircle className='profileicon'/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;