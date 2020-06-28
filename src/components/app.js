import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useLocation, useNavigate } from "@reach/router";
import { defaultSettings, handleErrors } from "../utils";
import { parse } from "query-string";
import { Select } from "./select";
import { Search } from "./search";
import { Pagination } from "./pagination";
import { TableComponent } from "./table";
import { ErrorComponent } from "./error";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = parse(location.search);

  const getItemsPerPage = () => {
    if (
      defaultSettings.itemsPerPageOptions.includes(+searchParams.itemsPerPage)
    ) {
      return +searchParams.itemsPerPage;
    } else {
      return defaultSettings.itemsPerPage;
    }
  };

  const page = +searchParams.page || defaultSettings.page;
  const searchTerm = searchParams.searchTerm || defaultSettings.searchTerm;
  const itemsPerPage = getItemsPerPage();

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    const body = {
      page,
      itemsPerPage,
      filters: [{ type: "all", values: [searchTerm] }],
    };

    fetch(`http://nyx.vima.ekt.gr:3000/api/books/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [page, itemsPerPage, searchTerm]);

  const handlePageChange = (data) => {
    const newPage = Number(data.selected) + 1;
    navigate(
      `/?page=${newPage}&itemsPerPage=${itemsPerPage}&searchTerm=${searchTerm}`
    );
  };

  const handleItemsPerPageChange = (e) => {
    const { value } = e.target;

    const newPageCount = Math.ceil(data.count / value);

    newPageCount < page
      ? navigate(
          `/?page=${newPageCount}&itemsPerPage=${value}&searchTerm=${searchTerm}`
        )
      : navigate(
          `/?page=${page}&itemsPerPage=${value}&searchTerm=${searchTerm}`
        );
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
        <Col xs={9} sm={6}>
          <Search onSearch={handleSearch} disabled={loading} />
        </Col>

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
            <Col sm={10}>
              <span>
                Returned <strong>{data.count}</strong> result(s)
                {`${searchTerm && ` for ${searchTerm}`}`}
              </span>
            </Col>
            {data && data.books.length > 0 && (
              <Col sm={1}>
                <span>
                  Page <strong>{page}</strong> of{" "}
                  {Math.ceil(data.count / itemsPerPage)}
                </span>
              </Col>
            )}
          </>
        </Row>
      )}

      {data && data.books.length > 0 && (
        <Row className="table-wrapper mt-4">
          <Col>
            <TableComponent data={data} loading={loading} />
          </Col>

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
      )}
    </Container>
  );
};

export default App;
