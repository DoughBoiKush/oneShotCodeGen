import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { AddRecommendationModal } from "./AddRecommendationModal";
import { EditRecommendationModal } from "./EditRecommendationModal";
import { RatingModal } from "./RatingModal";
import { LoadingState } from "../common/LoadingState";
import { useQuery } from "react-query";
import * as api from "../../services/api";
export const RecommendationsList = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedRec, setSelectedRec] = useState(null);
  const { data: recommendations, isLoading } = useQuery(
    "recommendations",
    api.getRecommendations
  );
  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "User.name",
      headerName: "Recommended By",
      width: 150
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              setSelectedRec(params.row);
              setRatingModalOpen(true);
            }}
          >
            Rate
          </Button>
          <Button
            onClick={() => {
              setSelectedRec(params.row);
              setEditModalOpen(true);
            }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];
  if (isLoading) return <LoadingState />;
  return (
    <Box sx={{ height: 400, width: "100%", mt: 2 }}>
      <Button
        onClick={() => setAddModalOpen(true)}
        variant="contained"
        sx={{ mb: 2 }}
      >
        Add Recommendation
      </Button>
      <DataGrid rows={recommendations} columns={columns} pageSize={5} />
      <AddRecommendationModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      {selectedRec && (
        <>
          <EditRecommendationModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            recommendation={selectedRec}
          />
          <RatingModal
            open={ratingModalOpen}
            onClose={() => setRatingModalOpen(false)}
            recommendation={selectedRec}
          />
        </>
      )}
    </Box>
  );
};
