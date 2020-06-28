import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "@reach/router";

export const NotFound = () => {
  return (
    <Container fluid className="my-5">
      <h1>404 not found.</h1>
      <Link to="/">Back to home page</Link>
    </Container>
  );
};
