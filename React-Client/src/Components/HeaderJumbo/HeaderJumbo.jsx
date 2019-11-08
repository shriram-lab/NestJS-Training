import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../webCRMlogo.webp";

export default class HeaderJumbo extends Component {
  noreload = event => false;
  render() {
    const {match} = this.props;
    console.log(match);
    return (
      <>
        <Navbar bg="dark" variant="dark" >
          <Navbar.Brand href="home">
            <img
              alt=""
              src={logo}
              width="auto"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav
            className="mr-auto"
            defaultActiveKey={match.path.toLowerCase()}
            as="ul"
          >
            <Nav.Item as="li" className="mr-sm-3">
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="mr-sm-3">
              <Nav.Link href="/users">
                Users
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="#deets" className="mr-sm-3" >Username</Nav.Link>
            <Nav.Link eventKey={2} href="#memes" className="mr-sm-3">
              Login
            </Nav.Link>
          </Nav>
        </Navbar>
      </>
    );
  }
}
