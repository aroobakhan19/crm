// import React, { useState } from 'react'
// import {Modal,Paper,TextField,Button,Box,Typography} from '@mui/material'
// import { AddExpense } from '../config/db'
// import Header from '../components/Header'

// const AddExpenseModal = () => {
//     const [expenseDescription,setExpenseDescription] = useState('')
//     const [expenseAmount,setExpenseAmount]  = useState('')
//     const [expenseCategory,setExpenseCategory] = useState('')
//     const [expenseNote,setExpenseNote] = useState('')


//     async function addExpense(){
//         try {
//             if (!expenseDescription || !expenseAmount || !expenseCategory || !expenseNote) {
//               alert('Please fill in all the inputs!');
//               return;
//             }
    
//             const addexpense = {
//                 expenseDescription,
//                 expenseAmount,
//                 expenseCategory,
//                 expenseNote,
//             };
      
//             await AddExpense(addexpense)
//           } catch (e) {
//             alert(e.message);
//           }
//         }
      
//   return (
//     <div>
//         <Header />
//         <Paper 
//           sx={{
//             mt:5,
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             padding: 4,
//             outline: 'none',
//             borderRadius: '8px',
//           }}
//         >
//           <Typography id="expense-modal-title" variant="h6" component="h2">
//             Add Expense
//           </Typography>
//           <Box mt={2}>
//             <TextField
//             value={expenseAmount}
//             onChange={(e) => setExpenseAmount(e.target.value)}
//               label="Expense Amount"
//               fullWidth
//               margin="normal"
//               variant="outlined"
//             />
//             <TextField
//                 value={expenseDescription}
//                 onChange={(e) => setExpenseDescription(e.target.value)}
//               label="Expense Description"
//               fullWidth
//               margin="normal"
//               variant="outlined"
//             />
//             <TextField
//         value={expenseCategory}
//         onChange={(e) => setExpenseCategory(e.target.value)}
//               label="Expense Category"
//               fullWidth
//               margin="normal"
//               variant="outlined"
//             />
//             <TextField
//              value={expenseNote}
//             onChange={(e) => setExpenseNote(e.target.value)}
//               label="Expense Note"
//               fullWidth
//               margin="normal"
//               variant="outlined"
//             />
//             <Button 
//             //   onClick={onClose} 
//             onClick={addExpense}
//               variant="contained" 
//               color="primary" 
//               fullWidth 
//               sx={{ mt: 2 }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Paper>
//     </div>
//   )
// }

// export default AddExpenseModal

import React, { useState, useRef,useEffect} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { AddExpense } from "../config/db";
import Header from "../components/Header";
import {OutlinedInput} from '@mui/material'

const AddExpenseModal = () => {
  const reportRef = useRef();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseType,setExpenseType] = useState('')
  const [expenses, setExpenses] = useState([]); // Array to store multiple expenses
  const [loading, setLoading] = useState(false);
  const [voucherNumber, setVoucherNumber] = useState();

  // Add a new empty expense row
  const addExpenseRow = () => {
    setExpenses([...expenses, { expenseDiscription: "", expenseAmount: "" }]);
  };

  // Update a specific expense row
  const updateExpense = (index, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);
  };

  // Remove a specific expense row
  const removeExpenseRow = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const submitExpenses = async () => {
    if (expenses.some(expense => !expense.expenseDiscription || !expense.expenseAmount)) {
      alert("Please fill in all fields for each expense!");
      return;
    }
  
    if (!voucherNumber) {
      alert("Voucher number is not available!");
      return;
    }
  
    setLoading(true);
    try {
      const addexpense = {
        expenses, // Directly send the array of expenses
        voucherNumber, 
        expenseCategory,
      };
  
      console.log("Sending payload:", addexpense);
      await AddExpense(addexpense);
  
      alert("Expenses added successfully!");
      setExpenses([]); // Clear the expenses after submission
    } catch (e) {
      console.error("Error in submitting expenses:", e.message);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };
  


  const fetchVoucherNumber = async (category) => {
    try {
        const response = await fetch(`https://crm-backend-plum.vercel.app/expense/next-voucher/${category}`);
        const data = await response.json();
        setVoucherNumber(data.nextVoucherNo);
    } catch (error) {
        console.error("Failed to fetch voucher number:", error);
    }
};

useEffect(() => {
  if (expenseCategory) {
    console.log("Fetching voucher number for category:", expenseCategory);
    fetchVoucherNumber(expenseCategory);
  }
}, [expenseCategory]);



  
  // Generate PDF
  const generatePDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("voucher-report.pdf");
  };


  
  return (
    <div>
      <Header />
      {/* Controls */}
      <div style={{ marginLeft: "250px", marginTop: "120px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>
            Select Date:
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </label>

          <label style={{ marginLeft: "20px", marginRight: "10px" }}>
            Select Category:
            <select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              style={{ marginLeft: "10px" }}
              displayEmpty
              input={<OutlinedInput fullWidth />}
            >
              <option value="">
              <em>select Category</em>
              </option> 
              <option value="Journal Payment Voucher">Journal Payment Voucher</option>
              <option value="Cash Payment Voucher">Cash Payment Voucher</option>
              
              <option value="Bank Payment Voucher">Bank Payment Voucher</option>
              {/* Add more categories here */}
            </select>
          </label>

          <label style={{ marginLeft: "20px", marginRight: "10px" }}>
            Select Type:
            <select
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
              style={{ marginLeft: "10px" }}
              displayEmpty
              input={<OutlinedInput fullWidth />}
            >
              <option value="">
              <em>Select Type</em>
              </option> 
              <option value="Expense">Expense</option>
              <option value="A/Receivable">A/Receivable</option>
              <option value="Assets">Assets</option>
              <option value="A/Payable">A/Payable</option>
              {/* Add more categories here */}
            </select>
          </label>
        </div>

        {/* Voucher Report Content */}
        <div ref={reportRef} style={{ padding: "20px", fontFamily: "Arial" }}>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>GROW PROPERTIES</h1>
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <strong>
        {expenseCategory} - {voucherNumber?.toString().padStart(3, "0")}
    </strong>
          </div>
          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <strong>Date: {selectedDate}</strong>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>DESCRIPTION</th>
                <th style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>AMOUNT</th>
                <th style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    <input
                      type="text"
                      value={expense.expenseDiscription}
                      onChange={(e) => updateExpense(index, "expenseDiscription", e.target.value)}
                      style={{ width: "100%", padding: "5px" }}
                      placeholder="Enter description"
                    />
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    <input
                      type="number"
                      value={expense.expenseAmount}
                      onChange={(e) => updateExpense(index, "expenseAmount", e.target.value)}
                      style={{ width: "100%", padding: "5px" }}
                      placeholder="Enter amount"
                    />
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                    <button
                      onClick={() => removeExpenseRow(index)}
                      style={{ color: "red", cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Total
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    fontWeight: "bold",
                  }}
                >
                  {expenses.reduce((total, expense) => total + Number(expense.expenseAmount || 0), 0)}
                </td>
              </tr>
            </tfoot>
          </table>

          <button
            onClick={addExpenseRow}
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add New Expense
          </button>
        </div>

        {/* Buttons for submitting expenses and generating PDF */}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={submitExpenses}
            style={{
              marginRight: "20px",
              padding: "10px 20px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit All Expenses"}
          </button>

          <button
            onClick={generatePDF}
            style={{
              padding: "10px 20px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;

