import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { getTransactHist } from "../api"; // Assuming getTransactHist is an API call

export const CrudGridTransact = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getTransactData() {
      try {
        const response = await getTransactHist();
        const result = await response.json();
        if (response.status === 200) {
          console.log("Fetched data:", result); // Log the fetched data
          setRows(result);
        } else {
          console.error("Error fetching transactions");
        }
      } catch (error) {
        console.error(error);
      }
    }
    getTransactData();
  }, []);

  useEffect(() => {
    console.log("Rows set:", rows); // Log the rows whenever they are set
  }, [rows]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", width: 180 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "subtotal", headerName: "Subtotal", width: 100 },

  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
};
