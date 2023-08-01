import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBars, FaHome } from 'react-icons/fa';

const Welcome = () => {
    return (
      <Container className="welcome-container">
        <Row>
          <Col xs={12} className="text-center">
            <h1>Welcome to Our Menu!</h1>
            <p>
              You can find all our dishes in the "<FaHome className="me-1" /> Menu" link at the top of this page. <br />
              Note that if you are using a smaller device to watch our menu, then you'll need to click on the <FaBars className="me-1" /> 
              icon, located at the top of this page.<br />
              We are here to serve you, so take your time to find out about all of the 
              delisous meals that we have to offer<br />
              -together with our outrageously cheap prices!
            </p>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Welcome;
  