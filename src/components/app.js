import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useLocation, useNavigate } from "@reach/router";
import { defaultSettings } from "../utils";
import { parse } from "query-string";
import { Select } from "./select";
import { Search } from "./search";
import { Pagination } from "./pagination";
import { TableComponent } from "./table";

function App() {
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

  React.useEffect(() => {
    setLoading(true);
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
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(() => setLoading(false));
    // handle error
  }, [page, itemsPerPage, searchTerm]);

  const handlePageChange = (data) => {
    const newPage = Number(data.selected) + 1;
    navigate(
      `/?page=${newPage}&itemsPerPage=${itemsPerPage}&searchTerm=${searchTerm}`
    );
  };

  const handleItemsPerPageChange = (e) => {
    const { value } = e.target;
    navigate(`/?page=${page}&itemsPerPage=${value}&searchTerm=${searchTerm}`);
  };

  const handleSearch = (searchTermString) => {
    navigate(
      `/?page=${page}&itemsPerPage=${itemsPerPage}&searchTerm=${searchTermString}`
    );
  };

  return (
    <Container fluid className="my-5">
      <Row className="header-wrapper">
        <Col xs={12} className="my-3">
          <h2>OnTrack Application</h2>
        </Col>
      </Row>

      <Row className="controls-wrapper">
        <Col xs={12} lg={4}>
          <Search onSearch={handleSearch} disabled={loading} />
        </Col>

        {data && data.books.length > 0 && (
          <Col xs={12} lg={4}>
            <Pagination
              onChange={handlePageChange}
              data={data}
              page={page}
              itemsPerPage={itemsPerPage}
            />
          </Col>
        )}

        {data && data.books.length > 0 && (
          <Col sm={12} lg={4}>
            <Select
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
              options={defaultSettings.itemsPerPageOptions}
              label={"Items per page"}
              disabled={loading}
            />
          </Col>
        )}

        {data && (
          <Col sm={12}>
            <span>
              Returned <strong>{data.count}</strong> results
              {`${searchTerm && ` for ${searchTerm}`}`}
            </span>
          </Col>
        )}
      </Row>

      {data && data.books.length > 0 && (
        <Row className="table-wrapper mt-4">
          <Col>
            <TableComponent data={data} loading={loading} />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
