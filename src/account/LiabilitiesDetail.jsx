import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { payCommission } from "../config/db";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const LiabilitiesDetail = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate()
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [commissionHistory, setCommissionHistory] = useState([]);
  const [error, setError] = useState("");

  // Fetch employee liability details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/addsSellPropert/getLiabilityDetails/${employeeId}`
        );
        setDetails(response.data.data);
        // setPaymentHistory(response.data.data.paymentHistory || []);
      } catch (error) { 
        console.error("Error fetching liability details:", error);
        setError("Failed to load liability details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };


    fetchDetails()
   
  }, [employeeId]);

console.log('details',details)

useEffect(() => {
  const fetchCommissionHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/commissionHistory/${employeeId}`
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
    // employeeName: details.employeeName,
    // totalCommission: details.totalCommission,
    // remainingCommission: details.remainingCommission,
    // payAmount,
  };

  navigate("/AddVoucher", { state: voucherData });
};


  if (loading) {
    return <p>Loading details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
       <h1>Liability Details</h1>
      <Typography>
        {details.employeeName}'s total commission is {details.commissionAmount}
      </Typography>
      <Typography>Remaining Commission: {details.remainingCommission}</Typography>
      
      <Button variant="contained" onClick={handlePayClick}>
        Pay Commission
      </Button>

      {/* Commission History Section */}
      <h2>Commission History</h2>
      {commissionHistory.length > 0 ? (
        <List>
          {commissionHistory.map((entry, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Expense Amount: ${entry.expenseAmount}`}
                secondary={`Paid At: ${new Date(entry.paidAt).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No commission history found.</p>
      )}    </div>
  );
};

export default LiabilitiesDetail;
