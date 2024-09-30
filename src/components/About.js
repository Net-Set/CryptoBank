// src/components/About.js
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const About = ({ isDarkMode }) => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">About CryptoBank</h1>
      <Card className={`border-primary mb-4 shadow ${isDarkMode ? 'bg-dark text-white' : ''}`}>
        <Card.Body>
          <Card.Text>
            CryptoBank is a revolutionary platform that allows you to manage your cryptocurrency 
            assets efficiently and securely. With our user-friendly interface and advanced features, 
            you can deposit, withdraw, and trade tokens with ease.
          </Card.Text>
        </Card.Body>
      </Card>
      
      <h2 className="text-center mb-3">Features</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Card className={`border-success mb-3 shadow ${isDarkMode ? 'bg-dark text-white' : ''}`}>
            <Card.Body>
              <Card.Title>Secure Wallet Connections</Card.Title>
              <Card.Text>
                Connect securely to your wallet via MetaMask.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className={`border-warning mb-3 shadow ${isDarkMode ? 'bg-dark text-white' : ''}`}>
            <Card.Body>
              <Card.Title>Real-time Balance Updates</Card.Title>
              <Card.Text>
                Keep track of your balance in real-time.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className={`border-info mb-3 shadow ${isDarkMode ? 'bg-dark text-white' : ''}`}>
            <Card.Body>
              <Card.Title>Easy Token Purchases and Transfers</Card.Title>
              <Card.Text>
                Buy and transfer tokens effortlessly.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className={`border-danger mb-3 shadow ${isDarkMode ? 'bg-dark text-white' : ''}`}>
            <Card.Body>
              <Card.Title>Responsive Design</Card.Title>
              <Card.Text>
                Access CryptoBank on any device seamlessly.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="text-center mb-3">Getting Started</h2>
      <Card className={`border-secondary mb-4 shadow ${isDarkMode ? 'bg-dark text-white' : ''}`}>
        <Card.Body>
          <Card.Text>
            To get started, simply connect your wallet and explore the features of CryptoBank.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
