import { useEffect, useState } from "react";
import axios from "axios";
import { tableApi } from "./constant";
import Table from "./Table";
import Pagination from "./Pagination";

const Main = () => {
  const [data, setData] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [paginatedData, setPaginatedData] = useState([]); 
  const [heading, setHeading] = useState([]); 
  const reqHeadings = ["s.no", "percentage.funded", "amt.pledged"];
  const [gotoPage, setGoToPage] = useState(1)

  useEffect(() => {
    axios
      .get(`${tableApi}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const dynamicHeadings = Object.keys(data[0]).filter((key) =>
        reqHeadings.includes(key)
      );
      setHeading(dynamicHeadings);
    }
  }, [data]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setPaginatedData(data.slice(startIndex, endIndex));
  }, [data, currentPage, rowsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Rows per page:{" "}
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
      </div>
      <Table heading={heading} data={paginatedData} />
      <Pagination
        currentPage={currentPage}
        totalRows={data.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
        gotoPage={gotoPage}
        setGoToPage={setGoToPage}
      />
    </>
  );
};

export default Main;
