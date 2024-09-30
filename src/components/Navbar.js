// src/components/ResponsiveNavbar.js
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Import a CSS file for dark mode styles

function ResponsiveNavbar({ account, onConnectWallet }) {
  const [isDarkMode, setIsDarkMode] = useState(true); // Set default to true for dark mode

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode); // Apply dark mode class to body
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <Navbar expand="lg" className={`mb-3 ${isDarkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"}`}>
        <Container fluid>
          <Navbar.Brand href="/" className="brand-name">
            CryptoBank
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                CryptoBank
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
              </Nav>
              <Button 
                variant="primary" 
                onClick={onConnectWallet} 
                className="ms-2"
              >
                {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
              </Button>
              <Button 
                style={{
                  border: "2px solid", 
                  borderColor: "lightgray", // Fixed border color for dark mode
                  backgroundColor: "#555", // Fixed background color for dark mode
                  color: "white" // Fixed text color for dark mode
                }} 
                onClick={toggleDarkMode} 
                className="ms-2"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default ResponsiveNavbar;
