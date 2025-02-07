import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const LiabilitiesDetail = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [commissionHistory, setCommissionHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://crm-backend-plum.vercel.app/addsSellPropert/getLiabilityDetails/${employeeId}`
        );
        setDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching liability details:", error);
        setError("Failed to load liability details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [employeeId]);

  useEffect(() => {
    const fetchCommissionHistory = async () => {
      try {
        const response = await axios.get(
          `https://crm-backend-plum.vercel.app/commissionHistory/${employeeId}`
        );
        setCommissionHistory(response.data.commissionHistory);
      } catch (error) {
        console.error("Error fetching commission history:", error);
      }
    };

    fetchCommissionHistory();
  }, [employeeId]);

  const handlePayClick = () => {
    const voucherData = {
      employeeId,
    };

    navigate("/AddVoucher", { state: voucherData });
  };

  if (loading) {
    return <Typography variant="h6">Loading details...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
          Liability Details
        </Typography>
        <Divider sx={{ marginBottom: "1rem" }} />

        <Typography variant="h6" gutterBottom>
          {details.employeeName}'s total commission is {details.commissionAmount}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Remaining Commission: {details.remainingCommission}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handlePayClick}
          sx={{ margin: "1rem 0", width: "100%" }}
        >
          Pay Commission
        </Button>

        <Typography variant="h5" gutterBottom sx={{ marginTop: "2rem" }}>
          Commission History
        </Typography>
        <Divider sx={{ marginBottom: "1rem" }} />

        {commissionHistory.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Expense Amount</TableCell>
                  <TableCell>Paid At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commissionHistory.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.expenseAmount}</TableCell>
                    <TableCell>
                      {new Date(entry.paidAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No commission history found.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LiabilitiesDetail;