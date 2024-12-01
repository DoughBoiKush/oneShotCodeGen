import { Box, Grid, Button } from "@mui/material";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "../components/layout/Header";
import { MetricsCard } from "../components/metrics/MetricsCard";
import { RecentActivityTable } from "../components/tables/RecentActivityTable";
import { TopRatedPlacesTable } from "../components/tables/TopRatedPlacesTable";
import { LoadingState } from "../components/shared/LoadingState";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { AddConsumptionModal } from "../components/modals/AddConsumptionModal"; 
import * as api from "../services/api";
const menuItems = [
  { label: "Places", path: "/places" }
];
export const Dashboard = () => {
  useProtectedRoute();
  const [addConsumptionModalOpen, setAddConsumptionModalOpen] = useState(false);
  const { data: places, isLoading: placesLoading } = useQuery({
    queryKey: ["places"],
    queryFn: api.getAllPlaces,
  });
  
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: api.getReviews,
  });
  const { mutate: addConsumption } = useMutation({
    mutationFn: api.logConsumption,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: api.getStats,
  });
  
  if (placesLoading || reviewsLoading || statsLoading) return <LoadingState />;
  return (
    <Box>
      <Header title="Pizza Tracker" menuItems={menuItems} />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={() => {
                setAddConsumptionModalOpen(true);
              }}
            >
              Add Consumption
            </Button>
            <AddConsumptionModal
              open={addConsumptionModalOpen}
              onClose={() => setAddConsumptionModalOpen(false)}
              onSubmit={addConsumption}
              places={places}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <MetricsCard title="Total Places" value={places?.length || 0} />
              </Grid>
              <Grid item xs={12} md={3}>
                <MetricsCard
                  title="Total Reviews"
                  value={reviews?.length || 0}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <MetricsCard
                  title="Total Slices"
                  value={
                    stats?.reduce((acc, curr) => acc + curr.slices, 0) || 0
                  }
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <MetricsCard
                  title="Average Rating"
                  value={(
                    reviews?.reduce((acc, curr) => acc + curr.rating, 0) /
                      reviews?.length || 0
                  ).toFixed(1)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentActivityTable
              activities={reviews?.map((r) => ({
                id: r.id,
                date: r.createdAt,
                type: "Review",
                description: `${r.User.name} reviewed ${r.PizzaPlace.name}`,
              }))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TopRatedPlacesTable
              places={places
                ?.sort((a, b) => b.averageRating - a.averageRating)
                .slice(0, 5)}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
