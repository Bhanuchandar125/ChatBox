import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { BsPersonCircle } from "react-icons/bs";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { userloginstatus } from "./Context";
import { useNavigate } from "react-router-dom";

function Header() {
  const { setIslogin } = useContext(userloginstatus);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIslogin(false);
    navigate("/login");
  };
  return (
    <Navbar expand="lg" className=" navbarBg ">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_chat_default_1x.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className=" me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavDropdown
              className="navitems"
              title="Active"
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">
                <span className="active"></span>Active
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                Logout{" "}
                <span>
                  <LogoutIcon />
                </span>
              </NavDropdown.Item>

              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item href="#action5">Set away</NavDropdown.Item>
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
          <BsPersonCircle className="profileicon" />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
