import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Import a CSS file for dark mode styles

function ResponsiveNavbar({ account, onConnectWallet, isDarkMode, toggleDarkMode }) {
    // Effect to toggle the body class based on dark mode
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("bg-dark", "text-white");
        } else {
            document.body.classList.remove("bg-dark", "text-white");
        }
    }, [isDarkMode]);

    return (
        <>
            <Navbar 
                expand="lg" 
                className={`mb-3 ${isDarkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"}`} 
                style={{
                    boxShadow: isDarkMode 
                        ? '0 4px 15px rgba(255, 255, 255, 0.1)' 
                        : '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out'
                }}
            >
                <Container fluid>
                    <Navbar.Brand href="/" className="brand-name">CryptoBank</Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">CryptoBank</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/about">About</Nav.Link>
                            </Nav>
                            <Button variant="primary" onClick={onConnectWallet} className="ms-2">
                                {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
                            </Button>
                            <Button 
                                style={{
                                    border: "2px solid", 
                                    borderColor: "lightgray",
                                    backgroundColor: "#555",
                                    color: "white"
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
