import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useLocation } from "@reach/router";
import { parse } from "query-string";

function App() {
  const location = useLocation();
  const searchParams = parse(location.search);

  console.log(searchParams);

  return (
    <Container className="my-5">
      <Row className="my-3">
        <h2>OnTrack Application</h2>
      </Row>
    </Container>
  );
}

export default App;
