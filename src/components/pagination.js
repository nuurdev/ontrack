import React from "react";
import ReactPaginate from "react-paginate";

export const Pagination = ({ onChange, data, page, itemsPerPage }) => (
  <ReactPaginate
    previousLabel={"previous"}
    nextLabel={"next"}
    breakLabel={"..."}
    pageCount={data ? Math.ceil(data.count / itemsPerPage) : 100}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={onChange}
    containerClassName={"pagination"}
    subContainerClassName={"pages pagination"}
    pageLinkClassName={"page-link"}
    pageClassName={"page-item"}
    breakLinkClassName={"page-link"}
    breakClassName={"page-item"}
    activeClassName={"active"}
    previousClassName={"page-item"}
    previousLinkClassName={"page-link"}
    nextClassName={"page-item"}
    nextLinkClassName={"page-link"}
    initialPage={page - 1}
    disableInitialCallback
  />
);
