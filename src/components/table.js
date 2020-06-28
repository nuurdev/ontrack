import React from "react";
import Table from "react-bootstrap/Table";
import Skeleton from "react-loading-skeleton";

export const TableComponent = ({ data, loading }) =>
  loading ? (
    <Table bordered hover responsive>
      <thead>
        <tr>
          {Array.from(Array(7)).map((v, i) => (
            <td key={i}>
              <Skeleton />
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from(Array(10)).map((v, i) => (
          <tr key={i}>
            {Array.from(Array(7)).map((v, i) => (
              <td key={i}>
                <Skeleton />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <Table bordered hover responsive>
      <thead>
        <tr>
          {Object.keys(data.books[0]).map((property) => (
            <td key={property}>{property}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.books.map((book) => (
          <tr key={book.id}>
            {Object.keys(book).map((property) => (
              <td key={property}>{book[property]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
