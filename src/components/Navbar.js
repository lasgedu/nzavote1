import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';


const CustomNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50); // Set 'isScrolled' if user scrolls 50px or more
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}
      fixed="top"
    >
      <Navbar.Brand href="/">
        <img
          src={`${process.env.PUBLIC_URL}/assets/NgaVoteLOGO.png`}
          alt="NzaVote Logo"
          className="navbar-logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#services">Services</Nav.Link>
          <Nav.Link href="#contact">Contact Us</Nav.Link>
          <Nav.Link href="/login">LogIn</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
