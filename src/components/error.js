import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "@reach/router";

export const ErrorComponent = ({ message }) => {
  const navigate = useNavigate();

  const onNavigateRoot = () => navigate("/", { replace: true });

  return (
    <div className="container my-3">
      <div className="my-3">
        <h5>Oops something went wrong</h5>
        <span>Error message: {message}</span>
      </div>
      <Button variant="primary" onClick={onNavigateRoot}>
        Try again
      </Button>
    </div>
  );
};
