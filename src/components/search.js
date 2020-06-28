import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Search = ({ onSearch, disabled }) => (
  <fieldset disabled={disabled}>
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const { value } = e.target.elements.search;
        onSearch(value);
      }}
    >
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Control
              name="search"
              placeholder={"Search for a book"}
              aria-label="Search for a book"
            />
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Form.Row>
    </Form>
  </fieldset>
);
