import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
const columns = [
  { field: "title", headerName: "Title", flex: 1 },
  { field: "content", headerName: "Content", flex: 2 },
  {
    field: "rating",
    headerName: "Rating",
    flex: 1
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    renderCell: (params) => (
      <>
        <IconButton onClick={() => params.onEdit(params.row)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => params.onDelete(params.row)}>
          <Delete />
        </IconButton>
      </>
    ),
  },
];
const PromptGrid = ({ prompts, onEdit, onDelete }) => {
  const rows =
    prompts?.map((prompt) => ({ ...prompt, onEdit, onDelete })) || [];
  return <DataGrid rows={rows} columns={columns} autoHeight pageSize={5} />;
};
export default PromptGrid;
