import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const BankBalanceSheet = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [bankBalanceReport, setBankBalanceReport] = useState(null);

  const fetchBankBalanceReport = async () => {
    try {
      const response = await fetch(
        `https://crm-backend-plum.vercel.app/submitVoucher/bankBalanceReport?selectedBank=${selectedBank}`
      );
      const data = await response.json();
      setBankBalanceReport(data);
    } catch (error) {
      console.error("Error fetching bank balance report:", error);
    }
  };

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
          width: "50%",
          maxWidth: "800px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Bank Balance Sheet
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel id="bank-select-label">Select Bank</InputLabel>
          <Select
            labelId="bank-select-label"
            id="bank-select"
            value={selectedBank}
            label="Select Bank"
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <MenuItem value="">Select Bank</MenuItem>
            <MenuItem value="HBL">HBL</MenuItem>
            <MenuItem value="UBL">UBL</MenuItem>
            <MenuItem value="Meezan">Meezan</MenuItem>
            <MenuItem value="Alfalah">Alfalah</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={fetchBankBalanceReport}
          sx={{ marginBottom: "1rem", width: "100%" }}
        >
          Fetch Bank Balance Report
        </Button>

        {bankBalanceReport && (
          <div>
            <Typography variant="h5" gutterBottom>
              Bank Balance Report for {bankBalanceReport.selectedBank}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total Balance: {bankBalanceReport.totalBankBalance}
            </Typography>

            {/* In Payments Table */}
            <Typography variant="h5" gutterBottom sx={{marginTop:"1rem"}}>In Payments</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bankBalanceReport.inPayments.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Out Payments Table */}
            <Typography variant="h5" gutterBottom sx={{marginTop:"1rem"}}>Out Payments</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bankBalanceReport.outPayments.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Paper>
    </Box>
  );
};

export default BankBalanceSheet;