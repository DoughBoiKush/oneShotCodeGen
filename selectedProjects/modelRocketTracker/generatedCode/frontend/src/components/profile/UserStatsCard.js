import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
export const UserStatsCard = ({ stats }) => {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Your Statistics
        </Typography>
        <Grid container spacing={2}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Typography variant="h4" color="primary" gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {stat.label}
              </Typography>
            </Grid>
          ))}{" "}
        </Grid>
      </CardContent>
    </Card>
  );
};
