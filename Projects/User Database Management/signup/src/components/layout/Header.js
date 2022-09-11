import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import '../styles.css'

const Header = (props) => {
    return (
    <Navbar 
        bg="dark" 
        variant="dark"
        fixed="top"
        className="mb-3 header"
    >
        <Navbar.Brand className="font-weight-bold">
            User Data Management
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className=" justify-content-start mr-auto">
            <Nav.Link className="font-weight-bold" href="/">
                Signup Form
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/user_list">
                User List
            </Nav.Link>
        </Navbar.Collapse>
    </Navbar>
    )
};

export default Header;