// src/components/Layout/Navbar.js
import React from 'react';
import { Navbar, Container, Image } from 'react-bootstrap';
import msg_logo from '../assets/new_msg_logo.svg'; 

const NavigationBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Image
            src={msg_logo}
            alt="Logo"
            width="100"
            height="40"
            className="d-inline-block align-top me-2"
            rounded
          />
          Questionary
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
