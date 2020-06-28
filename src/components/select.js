import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export const Select = ({ onChange, value, options, label, disabled }) => (
  <fieldset disabled={disabled}>
    <Form.Group>
      <Form.Row>
        <Col>
          <Form.Label>{label}</Form.Label>
        </Col>
        <Col>
          <Form.Control as="select" onChange={onChange} value={value}>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Form.Control>
        </Col>
      </Form.Row>
    </Form.Group>
  </fieldset>
);
