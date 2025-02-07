import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function BalanceSheet() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(
          "https://crm-backend-plum.vercel.app/report/balanceReport"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the report data");
        }
        const data = await response.json();
        setReportData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  if (!reportData) return <Typography>No data available.</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "900px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Balance Report
        </Typography>
        <Divider sx={{ marginBottom: "1rem" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "2rem",
          }}
        >
          <Paper
            elevation={2}
            sx={{
              padding: "1rem",
              borderRadius: "4px",
              backgroundColor: "#e0f2f7",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Balance
            </Typography>
            <Typography variant="h5">{reportData.totalBalance} USD</Typography>
          </Paper>
        </Box>

        {/* In Payments Table */}
        <Paper elevation={2} sx={{ padding: "1rem", borderRadius: "4px", marginBottom: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            In Payments
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Note</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.inPayments.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{payment.amount} USD</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell>{payment.note}</TableCell>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Out Payments Table */}
        <Paper elevation={2} sx={{ padding: "1rem", borderRadius: "4px" }}>
          <Typography variant="h5" gutterBottom>
            Out Payments
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Voucher Number</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.outPayments.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{payment.amount} USD</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell>{payment.voucherNumber}</TableCell>
                    <TableCell>{payment.category}</TableCell>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Paper>
    </Box>
  );
}

export default BalanceSheet;