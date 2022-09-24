import { Navbar, NavItem, Container } from "react-bootstrap";
import { Link } from "react-router-dom";




const Nav = () => {

  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <NavItem style={{display: "flex"}}>
        <Link to="/" className="nav-link" style={{color: 'white'}}>
          Home
        </Link>
        <Link to="/drivers" className="nav-link" style={{color: 'white'}}>
          Drivers
        </Link>
      </NavItem>
    </Container>
    </Navbar>
  );
};

export default Nav;
