import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "type", headerName: "Type", width: 130 },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
    valueGetter: (params) =>
      new Date(params).toLocaleDateString(),
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 130,
    valueGetter: (params) => new Date(params).toLocaleDateString(),
  },
  { field: "status", headerName: "Status", width: 130 },
  { field: "reason", headerName: "Reason", width: 200 },
];
export const LeaveStatusTable = ({ leaves }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={leaves}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};
