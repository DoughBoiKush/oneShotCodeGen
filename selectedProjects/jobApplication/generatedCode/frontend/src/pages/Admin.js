import React, { useState } from "react";
import { Container, Button, Dialog } from "@mui/material";
import Header from "../components/layout/Header";
import UserManagementTable from "../components/admin/UserManagementTable";
import UserForm from "../components/admin/UserForm";
import LoadingState from "../components/common/LoadingState";
const menuItems = [
  { label: "Dashboard", path: "/" },
  { label: "Applications", path: "/applications" },
  { label: "Admin", path: "/admin" },
];
export default function Admin() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const handleSubmit = async (formData) => {
    setOpen(false);
    setEditData(null);
  };
  const handleEdit = (user) => {
    setEditData(user);
    setOpen(true);
  };
  const handleDelete = async (id) => {};
  return (
    <div>
      <Header title="JobTrax" menuItems={menuItems} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ mb: 2 }}
        >
          Add User
        </Button>
        <UserManagementTable
          users={[]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
            setEditData(null);
          }}
          maxWidth="md"
          fullWidth
        >
          <UserForm onSubmit={handleSubmit} initialData={editData} />
        </Dialog>
      </Container>
    </div>
  );
}
