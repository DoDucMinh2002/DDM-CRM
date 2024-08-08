// src/pages/Dashboard.js
import React from "react";
import { Grid, Card, CardContent, Typography, Paper } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Das from "./Dashboard.module.scss";
import Head from "../headlast/Head";
const Dashboard = () => {
  // Dữ liệu cho biểu đồ
  const chartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh số",
        data: [
          1200, 1500, 1000, 1800, 2000, 1500, 2222, 2500, 2090, 1850, 500, 1500,
        ],
        backgroundColor: "rgba(25, 118, 210, 0.2)", // Màu nền
        borderColor: "rgba(25, 118, 210, 1)", // Màu đường viền
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div className={Das.div} style={{ height: "100vh", width: "100%" }}>
      <Head />
      <div className={Das.grid}>
        <Grid container spacing={3} style={{ display: "block" }}>
          <div className={Das.divG}>
            {/* Thẻ thông tin */}
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Khách hàng</Typography>
                  <Typography variant="h4">120</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Đơn hàng</Typography>
                  <Typography variant="h4">50</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Doanh thu</Typography>
                  <Typography variant="h4">20,000 USD</Typography>
                </CardContent>
              </Card>
            </Grid>
          </div>
          <div className={Das.divGd}>
            <Grid item xs={12}>
              <Paper style={{ padding: 20, height: "580px", width: "980px" }}>
                <Typography variant="h6">Doanh số theo thời gian</Typography>
                <Line data={chartData} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ padding: 20, height: "580px" }}>
                <Typography variant="h5">Khách hàng tiềm năng</Typography>
                <ul
                  className="navbar-nav me-auto mb-2 mb-lg-0"
                  style={{ alignItems: "flex-start" }}
                >
                  <li>+ Khách hàng: Alice - Giá: 100 USD</li>
                  <li>+ Khách hàng: Bob - Giá: 150 USD</li>
                  <li>+ Khách hàng: Charlie - Giá: 200 USD</li>
                </ul>
              </Paper>
            </Grid>
          </div>
        </Grid>
      </div>
      {/* <Last /> */}
      <div className={Das.last}>CRM@DDM</div>
    </div>
  );
};

export default Dashboard;
