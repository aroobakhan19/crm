import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import Header from "../components/Header";
import {Button} from '@mui/material'

const VoucherReport = () => {
  const reportRef = useRef();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [selectedCategory, setSelectedCategory] = useState("Cash Payment Voucher"); // Default category
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("https://crm-backend-plum.vercel.app/submitVoucher");
  
      console.log("API Response:", response.data); // Debugging
  
      if (response.data && Array.isArray(response.data.data)) {
        setExpenses(response.data.data); // Access the correct array
      } else {
        console.error("Expected an array but received:", response.data);
        setExpenses([]); // Set an empty array to avoid errors
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("An error occurred while fetching the expenses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
 
  useEffect(() => {
    fetchExpenses();
  }, [selectedDate, selectedCategory]);

  useEffect(() => {
    // Filter expenses based on selected date and category
    const filteredData = expenses.filter(expense =>
      new Date(expense.createdAt).toISOString().split("T")[0] === selectedDate &&
      expense.expenseCategory === selectedCategory
    );
    setFilteredExpenses(filteredData);
  }, [expenses, selectedDate, selectedCategory]);
  console.log(filteredExpenses)
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
      <div style={{marginLeft:'250px',marginTop:'120px'}}>
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="Cash Payment Voucher">Cash Payment Voucher</option>
            <option value="Journal Payment Voucher">Journal Payment Voucher</option>
            {/* Add more categories here */}
          </select>
        </label>
      </div>

      <div ref={reportRef} style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>GROW PROPERTIES</h1>
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
        {/* <strong>
    {selectedCategory} -000
    {expenses
      .filter((expense) => expense.category === selectedCategory)
      .map((expense) => expense.voucherNumber)[0] || "N/A"}
  </strong> */}
        </div>
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <strong>Date: {selectedDate}</strong>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                DESCRIPTION
              </th>
              <th style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                AMOUNT
              </th>
            </tr>
          </thead>
          <tbody>
  {filteredExpenses.map((expense, index) => (
    <React.Fragment key={index}>
      {expense.expenses.map((field, fieldIndex) => (
        <tr key={fieldIndex}>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            {field.expenseDiscription}
          </td>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            {field.expenseAmount}
          </td>
        </tr>
      ))}
    </React.Fragment>
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
      {totalAmount}
    </td>
  </tr>
</tfoot>

        </table>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
            <strong>Prepared By:</strong> ___________________{" "}
            <strong>Approved By:</strong> ___________________{" "}
            <strong>Received By:</strong> ___________________
          </p>
        </div>
      </div>

      {/* Button to Generate PDF */}
      <Button
        onClick={generatePDF}
        sx={{
          mt: 4,
          width: '80%',
          color: 'white',
          ml:'10%',
          backgroundColor: '#011936',
          '&:hover': {
            backgroundColor: '#002b4e',
          },
        }}
      >
        Generate PDF
      </Button>
      </div>
    </div>
  );
};





// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const VoucherReport = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  // Fetch expenses from the backend
  // const fetchExpenses = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3001/submitVoucher/expenses");
  //     setExpenses(response.data); // Assuming the response contains 'data'
  //   } catch (error) {
  //     console.error("Error fetching expenses:", error);
  //     setError("An error occurred while fetching the expenses. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // console.log(expenses)
  // useEffect(() => {
  //   fetchExpenses();
  // }, []);

  // return (
  //   <div>
  //     <h1 style={{ textAlign: "center" }}>Expense Report</h1>
  //     <table style={{ width: "100%", borderCollapse: "collapse" }}>
  //       <thead>
  //         <tr>
  //           <th style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
  //             Description
  //           </th>
  //           <th style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
  //             Amount
  //           </th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {expenses.map((expense, index) => (
  //           <React.Fragment key={index}>
  //             {expense.fieldData.map((field, fieldIndex) => (
  //               <tr key={fieldIndex}>
  //                 <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
  //                   {field.fieldName} {/* Display field name */}
  //                 </td>
  //                 <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
  //                   {field.fieldValue} {/* Display field value */}
  //                 </td>
  //               </tr>
  //             ))}
  //           </React.Fragment>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
// };

export default VoucherReport;
