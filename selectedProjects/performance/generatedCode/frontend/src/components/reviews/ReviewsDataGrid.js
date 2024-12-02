import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "type", headerName: "Type", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "feedback", headerName: "Feedback", width: 300 },
  { field: "rating", headerName: "Rating", width: 130 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 130
  },
];
const ReviewsDataGrid = ({ reviews }) => (
  <Box sx={{ height: 400, width: "100%" }}>
    <DataGrid
      rows={reviews}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClick
    />
  </Box>
);
export default ReviewsDataGrid;
