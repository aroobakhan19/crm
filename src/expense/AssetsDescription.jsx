import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const AssetsDescription = () => {
    const { id } = useParams()
    const reportRef = useRef();
const [expenseDetail,setExpenseDetail] = useState('')
const [totalAmount, setTotalAmount] = useState(0);

useEffect(() => {
   fetchExpenses();
   },[]);
   
   async function fetchExpenses() {
       try {
           const res = await fetch(`https://crm-backend-plum.vercel.app/assets/${id}`);
           const data = await res.json();
           setExpenseDetail(data.data);
     
           // Calculate total amount
           const total = data.data?.expenses?.reduce(
               (acc, curr) => acc + (Number(curr.expenseAmount) || 0),
               0
             );
           setTotalAmount(total);
         } catch (error) {
           console.error('Error fetching data:', error);
         }
   }
   
   console.log(expenseDetail);

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
        <div style={{marginLeft:'250px',marginTop:'120px'}}>
<div ref={reportRef} style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>GROW PROPERTIES</h1>
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <strong>
    {expenseDetail.expenseCategory} -{expenseDetail.voucherNumber}
  </strong>
        </div>
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <strong>Date: {expenseDetail.createdAt}</strong>
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
        
{expenseDetail?.expenses?.map((field, fieldIndex) => (
                  <tr key={fieldIndex}>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {field.expenseDiscription}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {field.expenseAmount}
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
                 {totalAmount.toLocaleString()}
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
      <button
        onClick={generatePDF}
        style={{
          marginTop: "20px",
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
  )
}

export default AssetsDescription
