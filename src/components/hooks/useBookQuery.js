import React from "react";
import { useLocation } from "@reach/router";
import { defaultSettings, handleErrors } from "../../utils";
import { parse } from "query-string";

export const useBookQuery = () => {
  const location = useLocation();
  const searchParams = parse(location.search);

  const page = +searchParams.page || defaultSettings.page;
  const searchTerm = searchParams.searchTerm || defaultSettings.searchTerm;
  const itemsPerPage = getItemsPerPage(searchParams);

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

  return [page, searchTerm, itemsPerPage, data, loading, error];
};

const getItemsPerPage = (searchParams) => {
  if (
    defaultSettings.itemsPerPageOptions.includes(+searchParams.itemsPerPage)
  ) {
    return +searchParams.itemsPerPage;
  } else {
    return defaultSettings.itemsPerPage;
  }
};
