import { Box, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../components/layout/Header";
import { UserProfileForm } from "../components/forms/UserProfileForm";
import { UserStatsCards } from "../components/stats/UserStatsCards";
import { UserActivityTable } from "../components/tables/UserActivityTable";
import { LoadingState } from "../components/shared/LoadingState";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { useAuth } from "../context/AuthContext";
import * as api from "../services/api";
export const Profile = () => {
  const user = useProtectedRoute();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: api.getStats,
  });
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: api.getReviews,
  });
  const menuItems = [
    { label: "Dashboard", path: "/dashboard" }
  ];
  if (isLoading) return <LoadingState />;
  const userStats = {
    totalSlices: stats?.reduce((acc, curr) => acc + curr.slices, 0) || 0,
    averageRating:
      reviews?.reduce((acc, curr) => acc + curr.rating, 0) / reviews?.length ||
      0,
    placesVisited: new Set(stats?.map((s) => s.PizzaPlaceId)).size || 0,
  };
  return (
    <Box>
      <Header title="Profile" menuItems={menuItems} />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserProfileForm userData={user} onSubmit={() => {}} />
          </Grid>
          <Grid item xs={12}>
            <UserStatsCards stats={userStats} />
          </Grid>
          <Grid item xs={12}>
            <UserActivityTable
              activities={
                reviews?.map((r) => ({
                  id: r.id,
                  date: r.createdAt,
                  activity: `Reviewed ${r.PizzaPlace.name}`,
                  place: r.PizzaPlace.name,
                })) || []
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
