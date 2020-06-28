import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const Select = ({ onChange, value, options, label, disabled }) => (
  <fieldset disabled={disabled}>
    <Form.Group as={Row}>
      <Form.Label column sm="auto">
        {label}
      </Form.Label>
      <Col>
        <Form.Control as="select" onChange={onChange} value={value}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Form.Control>
      </Col>
    </Form.Group>
  </fieldset>
);
