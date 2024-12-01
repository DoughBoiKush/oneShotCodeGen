import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 130 },
  {
    field: "leaveBalance",
    headerName: "Annual Leave Balance",
    width: 180,
    valueGetter: (params) => params?.annual || 0,
  },
];
export const UserManagementTable = ({ users }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};
