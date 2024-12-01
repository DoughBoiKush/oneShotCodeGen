import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { AddFriendModal } from "./AddFriendModal";
import { LoadingState } from "../common/LoadingState";
import { useQuery } from "react-query";
import * as api from "../../services/api";
export const FriendsList = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { data: friends, isLoading } = useQuery("friends", api.getFriends);
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];
  if (isLoading) return <LoadingState />;
  return (
    <Box sx={{ height: 400, width: "100%", mt: 2 }}>
      <Button
        onClick={() => setAddModalOpen(true)}
        variant="contained"
        sx={{ mb: 2 }}
      >
        Add Friend
      </Button>
      <DataGrid rows={friends} columns={columns} pageSize={5} />
      <AddFriendModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
    </Box>
  );
};
