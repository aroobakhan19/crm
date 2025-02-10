import React, { useState, useRef,useEffect} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { AddExpense } from "../config/db";
import Header from "../components/Header";
import {OutlinedInput,Button} from '@mui/material'
import { useLocation } from "react-router-dom";

const AddVoucher = () => {
  const reportRef = useRef();
  const location = useLocation();
const voucherData = location.state || {};
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseType,setExpenseType] = useState('')
  const [expenses, setExpenses] = useState([]); // Array to store multiple expenses
  const [loading, setLoading] = useState(false);
  const [voucherNumber, setVoucherNumber] = useState();
  const [employeeId, setEmployeeId] = useState(voucherData.employeeId || "");
  const [selectedBank,setSelectedBank] = useState('')

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
    if (!expenseType) {
      alert("Expense type is required!");
      return;
    }
    
  
    setLoading(true);
    try {
      const addexpense = {
        expenses, // Directly send the array of expenses
        voucherNumber, 
        expenseCategory,
        expenseType,
        employeeId,
        selectedBank: expenseCategory === "Bank Payment Voucher" ? selectedBank : '',
      };
  
      console.log("Sending payload:", addexpense);
      await AddExpense(addexpense);
  
      // alert("Expenses added successfully!");
      setExpenses([]); // Clear the expenses after submission
    } catch (e) {
      console.error("Error in submitting expenses:", e.message);
      // alert(e.message);
    } finally {
      setLoading(false);
    }
  };
  


  const fetchVoucherNumber = async (category) => {
    try {
        const response = await fetch(`https://crm-backend-plum.vercel.app/submitVoucher/next-voucher/${category}`);
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
              onChange={(e) => {
                setExpenseType(e.target.value);
                if (e.target.value !== "Commission") {
                  setEmployeeId("");  // Clear employeeId if Commission is not selected
                }
              }}
          
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
              <option value="Commission">Commission</option>
              {/* Add more categories here */}
            </select>
          </label>
          {expenseType === "Commission" && (
  <div style={{ marginTop: "10px" }}>
    <label style={{ marginRight: "10px" }}>
      Employee ID:
      <input
        type="text"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        style={{ marginLeft: "10px", padding: "5px" }}
        placeholder="Enter Employee ID"
      />
    </label>
  </div>
)}
{expenseCategory === "Bank Payment Voucher" && (
  <label style={{ marginLeft: "20px", marginRight: "10px" }}>
    Select Bank:
    <select
      value={selectedBank}
      onChange={(e) => setSelectedBank(e.target.value)}
      style={{ marginLeft: "10px" }}
    >
      <option value=""><em>Select Bank</em></option>
      <option value="HBL">HBL</option>
      <option value="UBL">UBL</option>
      <option value="Meezan">Meezan</option>
      <option value="Alfalah">Alfalah</option>
      {/* Add more banks as needed */}
    </select>
  </label>
)}
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

          <Button
            onClick={addExpenseRow}
            sx={{
              ml: 4,
              backgroundColor: '#011936',
              '&:hover': {
                backgroundColor: '#014F86',
              },
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '5px',
            }}
          >
            Add New Expense
          </Button>
        </div>

        {/* Buttons for submitting expenses and generating PDF */}
        <div style={{ marginTop: "20px" }}>
          <Button
            onClick={submitExpenses}
            sx={{
              ml: 4,
              backgroundColor: '#011936',
              '&:hover': {
                backgroundColor: '#014F86',
              },
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '5px',
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit All Expenses"}
          </Button>

          <Button
            onClick={generatePDF}
            sx={{
              ml: 4,
              backgroundColor: '#011936',
              '&:hover': {
                backgroundColor: '#014F86',
              },
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '5px',
            }}
          >
            Generate PDF
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default AddVoucher;
