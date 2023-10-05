import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';


const DecideContraindication = () => {
    return (
        <Container>
      <Row className="flex flex-row">
        <Col className="mt-5" xs={6}>Decide Contraindication</Col>
        <Col xs={3}>
          <Form.Control
            type="text"
            className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300"
            name="high"
            required
          />
        </Col>
        <Col xs={3}>
          <Form.Control
            type="text"
            className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300"
            name="low"
            required
          />
        </Col>
      </Row>
    </Container>
    );
};

export default DecideContraindication;
