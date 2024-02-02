// Nguyen Do Nhat Nam-104061616 - Tran Thanh Minh - 103809048
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../components/Themes";
import { history as originalHistory } from "../data/history";
import SearchBar from "../components/SearchBar";
const columns = [
  { field: "id", headerName: "ID", width: 60 },
  { field: "fromAddress", headerName: "From Address", width: 520 },
  { field: "toAddress", headerName: "To Address", width: 520 },
  {
    field: "amount",
    headerName: "Amount (ETH)",
    width: 180,
  },
  {
    field: "timestamp",
    headerName: "Time Stamp",
    width: 280,
  },
  {
    field: "valid",
    headerName: "Valid",
    width: 70,
    valueGetter: (params) => (params.value ? "✔" : "✘"),
  },
];

export default function DataTable() {
  const [value, setValue] = useState("");
  const [filteredHistory, setFilteredHistory] = useState(originalHistory);

  const handleChange = (event) => {
    const searchValue = event.target.value; // Use event.target.value directly
    setValue(searchValue);

    const filteredRows = originalHistory.filter((row) =>
      Object.values(row).some((val) =>
        val.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );

    setFilteredHistory(filteredRows);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center text-4xl font-bold my-4">
        Transaction History
      </h1>
      <div className="flex flex-col w-full items-center justify-center my-8">
        <SearchBar value={value} handleChange={handleChange} />
        <div className="text-sm text-gray-400 mt-4">
          Found {filteredHistory.length}{" "}
          {filteredHistory.length === 1 ? "result" : "results"}
        </div>
      </div>
      <div className="h-[400px] w-[90%] mx-auto mb-36">
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={filteredHistory}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            style={{
              fontSize: "20px",
            }}
            className="overflow-auto"
            autoHeight
            getRowId={(row) => row.id}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}
