import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
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
    <div>
      <Header />
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      padding: "0.5rem", // Even less padding
      backgroundColor: "#f5f5f5",

    }}
  >
    <Paper
      elevation={3}
      sx={{
        padding: "1rem", // Reduced padding
        borderRadius: "8px",
        width: "50%", // Slightly wider for better mobile
       boxShadow: " 10px rgba(0, 0, 0, 0.2)",  
        marginTop: "8%",
        marginLeft:"15%" // More narrow max width
      }}
    >
      <Typography variant="h6" align="center" gutterBottom sx={{fontSize:"2rem"}}> {/* Smaller heading */}
        Balance Report
      </Typography>
      <Divider sx={{ marginBottom: "0.25rem" }} /> {/* Tiny divider */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "0.75rem", // Smaller margin
          gap:"0.5rem" //space between total balance
        }}
      >
        <Paper
          elevation={2}
          sx={{
            padding: "0.5rem", // Minimal padding
            borderRadius: "4px",
            backgroundColor: "#e0f2f7",
            fontSize: "0.8rem",
          }}
        >
          <Typography variant="body2" gutterBottom> {/* Smaller heading */}
            Total Balance
          </Typography>
          <Typography variant="body2">{reportData.totalBalance} USD</Typography>
        </Paper>
      </Box>

      {/* In Payments Table */}
      <Paper elevation={2} sx={{ padding: "0.75rem", borderRadius: "4px", marginBottom: "0.75rem" }}> {/* Reduced padding/margin */}
        <Typography variant="body1" gutterBottom sx={{fontSize:"0.9rem"}}> {/* Smaller heading */}
          In Payments
        </Typography>
        <TableContainer>
          <Table size="small" sx={{fontSize:"0.8rem"}}> {/* Smaller table font */}
            <TableHead>
              <TableRow>
                {/* TableCell padding can also be reduced if needed */}
                <TableCell sx={{padding:"0.5rem"}}>Amount</TableCell>
                <TableCell sx={{padding:"0.5rem"}}>Description</TableCell>
                <TableCell sx={{padding:"0.5rem"}}>Note</TableCell>
                <TableCell sx={{padding:"0.5rem"}}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.inPayments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell sx={{padding:"0.5rem"}}>{payment.amount} USD</TableCell>
                  <TableCell sx={{padding:"0.5rem"}}>{payment.description}</TableCell>
                  <TableCell sx={{padding:"0.5rem"}}>{payment.note}</TableCell>
                  <TableCell sx={{padding:"0.5rem"}}>{new Date(payment.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Out Payments Table */}
      <Paper elevation={2} sx={{ padding: "0.75rem", borderRadius: "4px" }}> {/* Reduced padding */}
        <Typography variant="body1" gutterBottom sx={{fontSize:"0.9rem"}}> {/* Smaller heading */}
          Out Payments
        </Typography>
        <TableContainer>
          <Table size="small" sx={{fontSize:"0.8rem"}}> {/* Smaller table font */}
            <TableHead>
              <TableRow>
                <TableCell sx={{padding:"0.5rem"}}>Amount</TableCell>
                <TableCell sx={{padding:"0.5rem"}}>Description</TableCell>
                <TableCell sx={{padding:"0.5rem"}}>Voucher Number</TableCell>
                <TableCell sx={{padding:"0.5rem"}}>Category</TableCell>
                <TableCell sx={{padding:"0.5rem"}}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.outPayments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell sx={{padding:"0.5rem"}}>{payment.amount} USD</TableCell>
                  <TableCell sx={{padding:"0.5rem"}}>{payment.description}</TableCell>
                  <TableCell sx={{padding:"0.5rem"}}>{payment.voucherNumber}</TableCell>
                  <TableCell sx={{padding:"0.5rem"}}>{payment.category}</TableCell>
                  <TableCell sx={{padding:"0.5rem"}}>{new Date(payment.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  </Box>
  </div>
  );
}

export default BalanceSheet;