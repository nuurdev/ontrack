import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

export const Search = ({ onSearch, disabled }) => (
  <fieldset disabled={disabled}>
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const { value } = e.target.elements.search;
        onSearch(value);
      }}
    >
      <InputGroup>
        <Form.Control
          name="search"
          placeholder={"Search for a book"}
          aria-label="Search for a book"
        />
        <InputGroup.Append>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  </fieldset>
);
