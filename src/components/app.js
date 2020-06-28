import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

import { Select } from "./select";
import { Search } from "./search";
import { Pagination } from "./pagination";
import { useNavigate } from "@reach/router";
import { defaultSettings } from "../utils";
import { TableComponent } from "./table";
import { ErrorComponent } from "./error";
import { useBookQuery } from "./hooks/useBookQuery";

const App = () => {
  const navigate = useNavigate();
  const [page, searchTerm, itemsPerPage, data, loading, error] = useBookQuery();

  const handlePageChange = (data) => {
    const newPage = Number(data.selected) + 1;
    navigate(
      `/?page=${newPage}&itemsPerPage=${itemsPerPage}&searchTerm=${searchTerm}`
    );
  };

  const handleItemsPerPageChange = (e) => {
    const { value } = e.target;
    const newPageCount = Math.ceil(data.count / value);
    if (newPageCount < page) {
      navigate(
        `/?page=${newPageCount}&itemsPerPage=${value}&searchTerm=${searchTerm}`
      );
    } else {
      navigate(`/?page=${page}&itemsPerPage=${value}&searchTerm=${searchTerm}`);
    }
  };

  const handleSearch = (searchTermString) => {
    navigate(
      `/?page=${1}&itemsPerPage=${itemsPerPage}&searchTerm=${searchTermString}`
    );
  };

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <Container fluid className="my-5">
      <div className="my-3">
        <h2>OnTrack Application</h2>
      </div>

      <Row className="controls-wrapper">
        {data && (
          <Col xs={9} sm={6}>
            <Search onSearch={handleSearch} disabled={loading} />
          </Col>
        )}

        {data && data.books.length > 0 && (
          <Col xs={"auto"}>
            <Select
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
              options={defaultSettings.itemsPerPageOptions}
              label={"Items per page"}
              disabled={loading}
            />
          </Col>
        )}

        {data && data.books.length > 0 && (
          <Col sm={12} style={{ overflowX: "auto" }}>
            <Pagination
              onChange={handlePageChange}
              data={data}
              page={page}
              itemsPerPage={itemsPerPage}
            />
          </Col>
        )}
      </Row>

      {data && (
        <Row>
          <>
            <Col xs={6}>
              <span>
                Returned <strong>{data.count}</strong> result(s)
                {`${searchTerm && ` for ${searchTerm}`}`}
              </span>
            </Col>
            {data && data.books.length > 0 && (
              <Col xs={6}>
                <span>
                  Page <strong>{page}</strong> of{" "}
                  {Math.ceil(data.count / itemsPerPage)}
                </span>
              </Col>
            )}
          </>
        </Row>
      )}

      {loading && !data && (
        <Row>
          <Col>
            <Spinner animation="border" variant="primary" />
          </Col>
        </Row>
      )}

      {data && data.books.length > 0 && (
        <Row className="table-wrapper mt-4">
          <Col>
            <TableComponent data={data} loading={loading} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default App;
