import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Welcome = () => {
    return (
      <Container className="welcome-container">
        <Row>
          <Col xs={12} className="text-center">
            <h1>Welcome to Our Menu</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel sapien
              eu nulla luctus facilisis. In hac habitasse platea dictumst. Proin
              consequat odio quis massa auctor, vitae hendrerit risus accumsan.
            </p>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Welcome;
  