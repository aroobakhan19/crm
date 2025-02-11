import React, { useState,useEffect} from "react";
import Header from '../components/Header';
import AccountantHeader from "../components/AccountantHeader";
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
  const [role, setRole] = useState('');
                                               
                                                 useEffect(() => {
                                                   // Decode role from user in localStorage
                                                   const user = JSON.parse(localStorage.getItem('user'));
                                                   if (user && user.role) {
                                                     setRole(user.role);
                                                   }
                                                 }, []);
    
  

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
    <div>
            {role === "Accountant" ? (
        <AccountantHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
<Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "0.5rem", // Reduced padding
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "1rem", // Reduced padding
          borderRadius: "8px",
          width: "50%", // Increased width for mobile
    boxShadow: " 10px rgba(0, 0, 0, 0.2)",  
    marginTop: "8%",
    marginLeft:"15%"
        }}
      >
        <Typography variant="h6" align="center" gutterBottom sx={{fontSize:"1rem"}}> {/* Smaller heading */}
          Bank Balance Sheet
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: "0.5rem" }}> {/* Reduced margin */}
          <InputLabel id="bank-select-label">Select Bank</InputLabel>
          <Select
            labelId="bank-select-label"
            id="bank-select"
            value={selectedBank}
            label="Select Bank"
            onChange={(e) => setSelectedBank(e.target.value)}
            size="small" // smaller select field
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
          sx={{ marginBottom: "0.5rem", width: "100%", fontSize:"0.8rem" }} // Reduced margin, smaller font
          size="small" // smaller button
        >
          Fetch Bank Balance Report
        </Button>

        {bankBalanceReport && (
          <div>
            <Typography variant="body1" gutterBottom sx={{fontSize:"0.9rem"}}> {/* Smaller heading */}
              Bank Balance Report for {bankBalanceReport.selectedBank}
            </Typography>
            <Typography variant="body2" gutterBottom> {/* Smaller heading */}
              Total Balance: {bankBalanceReport.totalBankBalance}
            </Typography>

            {/* In Payments Table */}
            <Typography variant="body1" gutterBottom sx={{marginTop:"0.5rem", fontSize:"0.9rem"}}> {/* Smaller heading, reduced margin */}
              In Payments
            </Typography>
            <TableContainer>
              <Table size="small" sx={{fontSize:"0.8rem"}}> {/* Smaller table, smaller font */}
                <TableHead >
                  <TableRow >
                    <TableCell sx={{padding:"0.5rem"}}>Amount</TableCell>
                    <TableCell sx={{padding:"0.5rem"}}>Description</TableCell>
                    <TableCell sx={{padding:"0.5rem"}}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bankBalanceReport.inPayments.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{padding:"0.5rem"}}>{payment.amount}</TableCell>
                      <TableCell sx={{padding:"0.5rem"}}>{payment.description}</TableCell>
                      <TableCell sx={{padding:"0.5rem"}}>{payment.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Out Payments Table */}
            <Typography variant="body1" gutterBottom sx={{marginTop:"0.5rem", fontSize:"0.9rem"}}> {/* Smaller heading, reduced margin */}
              Out Payments
            </Typography>
            <TableContainer>
              <Table size="small" sx={{fontSize:"0.8rem"}}> {/* Smaller table, smaller font */}
                <TableHead>
                  <TableRow>
                    <TableCell sx={{padding:"0.5rem"}}>Amount</TableCell>
                    <TableCell sx={{padding:"0.5rem"}}>Description</TableCell>
                    <TableCell sx={{padding:"0.5rem"}}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bankBalanceReport.outPayments.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{padding:"0.5rem"}}>{payment.amount}</TableCell>
                      <TableCell sx={{padding:"0.5rem"}}>{payment.description}</TableCell>
                      <TableCell sx={{padding:"0.5rem"}}>{payment.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Paper>
    </Box>
    </div>
  );
};

export default BankBalanceSheet;