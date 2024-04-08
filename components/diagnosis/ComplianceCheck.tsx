import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const ComplianceCheck = () => {
  return (
    <Form>
      <Row>
        <Col md={6} className="mt-5">
          Enter Blood Pressure
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            className="w-100 p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300"
            name="high"
            required
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            className="w-100 p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-secondary-300 text-sm font-medium leading-none text-secondary-300"
            name="low"
            required
          />
        </Col>
      </Row>
    </Form>
  );
};

export default ComplianceCheck;
