import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  {
    field: "averageRating",
    headerName: "Rating",
    flex: 1
  },
  { field: "address", headerName: "Address", flex: 2 },
];
export const TopRatedPlacesTable = ({ places }) => {
  return (
    <DataGrid
      autoHeight
      rows={places}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
    />
  );
};
