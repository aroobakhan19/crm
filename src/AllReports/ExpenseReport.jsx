import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  TablePagination, Paper, TextField, Toolbar, Divider, IconButton, Grid, CircularProgress,List,ListItem
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from 'axios';
import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';
import Header from '../components/Header';
import AccountantHeader from "../components/AccountantHeader";

const ExpenseReport = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
        const [role, setRole] = useState('');
                                                     
                                                       useEffect(() => {
                                                         // Decode role from user in localStorage
                                                         const user = JSON.parse(localStorage.getItem('user'));
                                                         if (user && user.role) {
                                                           setRole(user.role);
                                                         }
                                                       }, []);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://crm-backend-plum.vercel.app/report/ExpenseReport'); // Adjust the API endpoint as necessary
            setReport(response.data);
        } catch (error) {
            console.error('Error fetching report:', error);
        } finally {
            setLoading(false);
        }
    };
console.log('report',report)

useEffect(() => {
    fetchReport()
  },[]); 


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

       const exportToPDF = () => {
          const element = document.getElementById("reportTable");
          html2pdf(element);
        };
      
        const exportToExcel = () => {
          const ws = XLSX.utils.table_to_sheet(document.getElementById("reportTable"));
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Report Data");
          XLSX.writeFile(wb, "report.xlsx");
        };
      
        const printTable = () => {
          const content = document.getElementById("reportTable").outerHTML;
          const win = window.open();
          win.document.write(content);
          win.document.close();
          win.print();
        };
      
        const downloadTable = () => {
          const csvContent = report.map(row => Object.values(row).join(",")).join("\n");
          const blob = new Blob([csvContent], { type: 'text/csv' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'report.csv';
          link.click();
        };
      
    
    return (
        <>
            {role === "Accountant" ? (
        <AccountantHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
          <Box sx={{mt:'5%',ml:'17%'}}>
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
        Expense Reporting System
      </Typography>

      <Paper sx={{ p:1, mb: 2, borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Select
                // value={filter}
                // onChange={handleFilterChange}
                displayEmpty
                variant="outlined"
                sx={{ minWidth: 150, backgroundColor: 'white', borderRadius: 1 }}
              >
                <MenuItem value=""><em>All</em></MenuItem>
                <MenuItem value="Sell">Sell</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                placeholder="Search by Client or Status..."
                size="small"
                variant="outlined"
                fullWidth
                sx={{ bgcolor: '#f0f0f0', borderRadius: 1 }}
              />
            </Grid>
          </Grid>

          <Box>
            <IconButton sx={{color:'#011936'}} onClick={downloadTable} color="primary">
              <DownloadIcon />
            </IconButton>
            <IconButton sx={{color:'#011936'}} onClick={exportToExcel} color="primary">
              <DownloadIcon />
            </IconButton>
            <IconButton sx={{color:'#011936'}} onClick={printTable} color="primary">
              <PrintIcon />
            </IconButton>
            <IconButton sx={{color:'#011936'}} onClick={exportToPDF} color="primary">
              <PictureAsPdfIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Paper>

            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
                    {loading ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <TableContainer>
                        <Table aria-label="project report table" id="reportTable">
                          <TableHead sx={{ backgroundColor: '#011936' }}>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Category</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Amount</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Count</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Description</TableCell>
                            </TableRow>
                          </TableHead>            
                          <TableBody>
                            {report?.categories.map((category) => (
                                <TableRow key={category.category}>
                                    <TableCell>{category.category}</TableCell>
                                    <TableCell>{category.totalAmount}</TableCell>
                                    <TableCell>{category.count}</TableCell>
                                    <TableCell>
                                        <List>
                                            {category.descriptions.map((desc, index) => (
                                                <ListItem key={index}>{desc}</ListItem>
                                            ))}
                                        </List>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell><strong>{report?.totalAmount}</strong></TableCell>
                                <TableCell><strong>{report?.totalCount?report.totalCount:0}</strong></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            </Paper>
            </Box>
        </Box>
        </>
    );
};

export default ExpenseReport;
