import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useQuery, useMutation, useQueryClient,QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "../components/layout/Header";
import { AddEditPlaceModal } from "../components/modals/AddEditPlaceModal";
import { LoadingState } from "../components/shared/LoadingState";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import * as api from "../services/api";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "address", headerName: "Address", flex: 2 },
  { field: "phone", headerName: "Phone", flex: 1 },
  {
    field: "averageRating",
    headerName: "Rating",
    flex: 1,
    valueGetter: (params) => params.toFixed(1),
  },
];
export const Places = () => {
  useProtectedRoute();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Optional: customize default behavior
      },
    },
  });
  const menuItems = [
    { label: "Dashboard", path: "/dashboard" }
  ];
  const { data: places, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: api.getAllPlaces,
  });
  const createMutation = useMutation({
    mutationFn: api.createPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
      setIsModalOpen(false);
    },
  });
  
  if (isLoading) return <LoadingState />;
  return (
    <Box>
      <Header title="Pizza Places" menuItems={menuItems} />
      <Box sx={{ p: 3 }}>
        <Button
          variant="contained"
          onClick={() => setIsModalOpen(true)}
          sx={{ mb: 2 }}
        >
          Add Place
        </Button>
        <DataGrid
          autoHeight
          rows={places || []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
        <AddEditPlaceModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={createMutation.mutate}
        />
      </Box>
    </Box>
  );
};
