import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Stack,
  Skeleton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { getAllUsers } from "../services/userService";
const AdminUserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");
  const { data: users, isLoading } = useFetch(
    "http://localhost:3000/api/users",
    token
  );
  const navigate = useNavigate();
  const handleAddUser = async () => {
    try {
      const newUser = { name, role, status };
      await getAllUsers(token);
      setSuccess(true);
      setIsModalOpen(false);
    } catch {
      setError(true);
    }
  };
  return (
    <Box sx={{ p: 3 }}>
      {" "}
      <Typography variant="h4" mb={2}>
        User Management
      </Typography>{" "}
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Add User
      </Button>{" "}
      <Box sx={{ mt: 3 }}>
        {" "}
        {isLoading ? (
          <Stack spacing={2}>
            {" "}
            <Skeleton variant="rectangular" height={50} />{" "}
            <Skeleton variant="rectangular" height={50} />{" "}
            <Skeleton variant="rectangular" height={50} />{" "}
          </Stack>
        ) : (
          <DataGrid
            rows={users.map((u) => ({
              id: u.id,
              username: u.name,
              role: u.role,
              status: u.status ? "Active" : "Inactive",
            }))}
            columns={[
              { field: "username", headerName: "Username", flex: 1 },
              { field: "role", headerName: "Role", flex: 1 },
              { field: "status", headerName: "Status", flex: 1 },
            ]}
            autoHeight
            pageSize={5}
            onRowClick={(params) => navigate(`/user/${params.id}`)}
          />
        )}{" "}
      </Box>{" "}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {" "}
        <DialogContent>
          {" "}
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />{" "}
          <TextField
            label="Role"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ mb: 2 }}
          />{" "}
          <TextField
            label="Status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ mb: 2 }}
          />{" "}
        </DialogContent>{" "}
        <DialogActions>
          {" "}
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>{" "}
          <Button onClick={handleAddUser} variant="contained">
            Add
          </Button>{" "}
        </DialogActions>{" "}
      </Dialog>{" "}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        {" "}
        <Alert severity="success">User added successfully!</Alert>{" "}
      </Snackbar>{" "}
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
      >
        {" "}
        <Alert severity="error">Failed to add user!</Alert>{" "}
      </Snackbar>{" "}
    </Box>
  );
};
export default AdminUserManagement;
