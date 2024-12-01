import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data: expenses, isLoading } = useFetch(
    "http://localhost:3000/api/expenses",
    token
  );
  const recentExpenses = expenses?.slice(0, 5) || [];
  const metrics = {
    totalSubmitted: expenses?.length || 0,
    totalApproved: expenses?.filter((e) => e.status === "Approved").length || 0,
    totalRejected: expenses?.filter((e) => e.status === "Rejected").length || 0,
  };
  const chartData = [
    { name: "Approved", value: metrics.totalApproved },
    { name: "Rejected", value: metrics.totalRejected },
    {
      name: "Pending",
      value:
        metrics.totalSubmitted - metrics.totalApproved - metrics.totalRejected,
    },
  ];
  const colors = ["#4caf50", "#f44336", "#ff9800"];
  return (
    <Box sx={{ p: 3 }}>
      {" "}
      <Typography variant="h4" mb={2}>
        Dashboard
      </Typography>{" "}
      <Grid container spacing={3}>
        {" "}
        <Grid item xs={12} md={4}>
          {" "}
          <Card>
            {" "}
            <CardContent>
              {" "}
              {isLoading ? (
                <Skeleton variant="rectangular" height={50} />
              ) : (
                <Typography variant="h6">
                  Total Submitted: {metrics.totalSubmitted}
                </Typography>
              )}{" "}
            </CardContent>{" "}
          </Card>{" "}
        </Grid>{" "}
        <Grid item xs={12} md={4}>
          {" "}
          <Card>
            {" "}
            <CardContent>
              {" "}
              {isLoading ? (
                <Skeleton variant="rectangular" height={50} />
              ) : (
                <Typography variant="h6">
                  Total Approved: {metrics.totalApproved}
                </Typography>
              )}{" "}
            </CardContent>{" "}
          </Card>{" "}
        </Grid>{" "}
        <Grid item xs={12} md={4}>
          {" "}
          <Card>
            {" "}
            <CardContent>
              {" "}
              {isLoading ? (
                <Skeleton variant="rectangular" height={50} />
              ) : (
                <Typography variant="h6">
                  Total Rejected: {metrics.totalRejected}
                </Typography>
              )}{" "}
            </CardContent>{" "}
          </Card>{" "}
        </Grid>{" "}
      </Grid>{" "}
      <Box sx={{ mt: 5 }}>
        {" "}
        {isLoading ? (
          <Skeleton variant="rectangular" height={200} />
        ) : (
          <PieChart width={400} height={400}>
            {" "}
            <Pie data={chartData} dataKey="value" outerRadius={150}>
              {" "}
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}{" "}
            </Pie>{" "}
            <Tooltip />{" "}
          </PieChart>
        )}{" "}
      </Box>{" "}
      <Box sx={{ mt: 5 }}>
        {" "}
        <Typography variant="h6" mb={2}>
          Recent Expenses
        </Typography>{" "}
        {isLoading ? (
          <Stack spacing={2}>
            {" "}
            <Skeleton variant="rectangular" height={50} />{" "}
            <Skeleton variant="rectangular" height={50} />{" "}
            <Skeleton variant="rectangular" height={50} />{" "}
          </Stack>
        ) : (
          <DataGrid
            rows={recentExpenses.map((e) => ({
              id: e.id,
              date: new Date(e.date).toLocaleDateString(),
              amount: e.amount,
              status: e.status,
            }))}
            columns={[
              { field: "date", headerName: "Date", flex: 1 },
              { field: "amount", headerName: "Amount", flex: 1 },
              { field: "status", headerName: "Status", flex: 1 },
            ]}
            autoHeight
            pageSize={5}
            onRowClick={(params) => navigate(`/expense/${params.id}`)}
          />
        )}{" "}
      </Box>{" "}
    </Box>
  );
};
export default Dashboard;
