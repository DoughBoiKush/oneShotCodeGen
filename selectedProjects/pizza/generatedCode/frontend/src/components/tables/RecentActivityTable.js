import { DataGrid } from "@mui/x-data-grid";
const columns = [
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    valueGetter: (params) => new Date(params).toLocaleDateString(),
  },
  { field: "type", headerName: "Type", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
];
export const RecentActivityTable = ({ activities }) => {
  return (
    <DataGrid
      autoHeight
      rows={activities}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
    />
  );
};
