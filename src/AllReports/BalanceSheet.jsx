// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, Button, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
//   TablePagination, Paper, TextField, Toolbar, Divider, IconButton, Grid, CircularProgress
// } from '@mui/material';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import DownloadIcon from '@mui/icons-material/Download';
// import PrintIcon from '@mui/icons-material/Print';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import html2pdf from 'html2pdf.js';
// import Header from '../components/Header';

// const BalanceSheet = () => {
//     const [reportData, setReportData] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   useEffect(() => {
//     const fetchReportData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:3001/report/ProjectReport');
//         setReportData(response.data.report);
//         setTotalPrice(response.data.totalPrice);
//       } catch (error) {
//         console.error('Error fetching report data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReportData();
//   }, []);
//   console.log(reportData)

//   const handleFilterChange = (event) => {
//     setFilter(event.target.value);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = filter ? reportData.filter(item => item._id.ProjectType === filter) : reportData;

//   const exportToPDF = () => {
//     const element = document.getElementById("reportTable");
//     html2pdf(element);
//   };

//   const exportToExcel = () => {
//     const ws = XLSX.utils.table_to_sheet(document.getElementById("reportTable"));
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Report Data");
//     XLSX.writeFile(wb, "report.xlsx");
//   };

//   const printTable = () => {
//     const content = document.getElementById("reportTable").outerHTML;
//     const win = window.open();
//     win.document.write(content);
//     win.document.close();
//     win.print();
//   };

//   const downloadTable = () => {
//     const csvContent = reportData.map(row => Object.values(row).join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'report.csv';
//     link.click();
//   };

//   return (
//     <div>
//       <Header />
//     <Box sx={{mt:'5%',ml:'17%'}}>
//     <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
//       <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
//         Balance Sheet
//       </Typography>

//       <Paper sx={{ p:1, mb: 2, borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' }}>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={4}>
//               <Select
//                 value={filter}
//                 onChange={handleFilterChange}
//                 displayEmpty
//                 variant="outlined"
//                 sx={{ minWidth: 150, backgroundColor: 'white', borderRadius: 1 }}
//               >
//                 <MenuItem value=""><em>All</em></MenuItem>
//                 <MenuItem value="Sell">Sell</MenuItem>
//                 <MenuItem value="Rent">Rent</MenuItem>
//               </Select>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 placeholder="Search by Client or Status..."
//                 size="small"
//                 variant="outlined"
//                 fullWidth
//                 sx={{ bgcolor: '#f0f0f0', borderRadius: 1 }}
//               />
//             </Grid>
//           </Grid>

//           <Box>
//             <IconButton onClick={downloadTable} color="primary">
//               <DownloadIcon />
//             </IconButton>
//             <IconButton onClick={exportToExcel} color="primary">
//               <DownloadIcon />
//             </IconButton>
//             <IconButton onClick={printTable} color="primary">
//               <PrintIcon />
//             </IconButton>
//             <IconButton onClick={exportToPDF} color="primary">
//               <PictureAsPdfIcon />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </Paper>
// </Box>
// </Box>
//     </div>
//   )
// }

// export default BalanceSheet

import React, { useEffect, useState } from "react";


function BalanceSheet() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the report data
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch("http://localhost:3001/report/balanceReport"); // Update the URL if necessary
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
console.log(reportData)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <header className="App-header">
        <h1>Balance Report</h1>
      </header>

      <div className="report-container">
        {/* Total Balance */}
        <div className="card total-balance">
          <h2>Total Balance</h2>
          <p>{reportData.totalBalance} USD</p>
        </div>

        {/* In Payments */}
        <div className="card in-payments">
          <h2>In Payments</h2>
          <ul>
            {reportData.inPayments.map((payment, index) => (
              <li key={index}>
                <strong>{payment.amount} USD</strong> - {payment.description}
                <br />
                <small>Note: {payment.note}</small>
                <br />
                <small>Date: {new Date(payment.date).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        </div>

        {/* Out Payments */}
        <div className="card out-payments">
          <h2>Out Payments</h2>
          <ul>
            {reportData.outPayments.map((payment, index) => (
              <li key={index}>
                <strong>{payment.amount} USD</strong> - {payment.description}
                <br />
                <small>Voucher Number: {payment.voucherNumber}</small>
                <br />
                <small>Category: {payment.category}</small>
                <br />
                <small>Date: {new Date(payment.date).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BalanceSheet;
