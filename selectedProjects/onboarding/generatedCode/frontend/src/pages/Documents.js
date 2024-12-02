import React, { useState } from "react";
import { Box, Button, Dialog } from "@mui/material";
import Header from "../components/layout/Header";
import DocumentTable from "../components/document/DocumentTable";
import DocumentForm from "../components/document/DocumentForm";
import Loading from "../components/common/Loading";
import { useDocuments, useUploadDocument } from "../hooks/useApi";
const navLinks = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/employees", label: "Employees" },
  { path: "/tasks", label: "Tasks" },
  { path: "/documents", label: "Documents" },
];
export default function Documents() {
  const { data: documents, isLoading } = useDocuments();
  const uploadDocument = useUploadDocument();
  const [open, setOpen] = useState(false);
  const handleSubmit = async ({ formData }) => {
    await uploadDocument.mutateAsync(formData);
    setOpen(false);
  };
  if (isLoading) return <Loading />;
  return (
    <Box>
      <Header title="Document Management" links={navLinks} />
      <Box sx={{ p: 3 }}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ mb: 2 }}
        >
          Upload Document
        </Button>
        <DocumentTable data={documents || []} />
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Box sx={{ p: 2 }}>
            <DocumentForm onSubmit={handleSubmit} />
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
}
