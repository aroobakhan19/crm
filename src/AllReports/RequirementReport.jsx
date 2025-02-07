import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  TablePagination, Paper, TextField, Toolbar, Divider, IconButton, Grid, CircularProgress
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from 'axios';
import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';
import Header from '../components/Header';

const RequirementReport = () => {
  const [reportData, setReportData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedRow, setExpandedRow] = useState(null); 

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://crm-backend-plum.vercel.app/report/requirementReport');
        setReportData(response.data.report);
        setTotalPrice(response.data.totalPrice);
      } catch (error) {
        console.error('Error fetching report data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReportData();
  }, []);
  console.log(reportData)

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = filter ? reportData.filter(item => item._id.requirmentType === filter) : reportData;


  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index); 
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
    const csvContent = reportData.map(row => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'report.csv';
    link.click();
  };

  return (
    <>
    <Header />
    <Box sx={{mt:'5%',ml:'17%'}}>
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
           Requirment Reporting System
         </Typography>

          <Paper sx={{ p:1, mb: 2, borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Select
                value={filter}
                onChange={handleFilterChange}
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
            <IconButton sx={{color:'#011936'}} onClick={downloadTable}>
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

      <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table aria-label="requirement report table" id="reportTable">
                  <TableHead sx={{ backgroundColor: '#011936' }}>
              <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' ,color: 'white' }}>Requirement Type</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' ,color: 'white'}}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' ,color: 'white'}}>Total Requirement</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' ,color: 'white' }}>Total Price</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' ,color: 'white' }}>Client Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' ,color: 'white' }}>Posted By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <>
                  <TableRow key={index} onClick={() => handleRowClick(index)}>
                    <TableCell align="center">{row._id.requirmentType}</TableCell>
                    <TableCell align="center">{row._id.status}</TableCell>
                    <TableCell align="center">{row.totalCount}</TableCell>
                    <TableCell align="center">{row.totalPrice}</TableCell>
                    {/* <TableCell align="center">{row.averagePrice.toFixed(2)}</TableCell> */}
                    <TableCell align="center">{row._id.clientName}</TableCell>
                    <TableCell align="center">{row._id.postedBy}</TableCell>
                  </TableRow>
                  {expandedRow === index && (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <Typography variant="body2">
                          Detailed information about this project:
                          <ul>
                            <li>Project Type: {row._id.requirmentType}</li>
                            <li>Status: {row._id.status}</li>
                            <li>Total Count: {row.totalCount}</li>
                            <li>Total Price: {row.totalPrice}</li>
                            {/* <li>Average Price: {row.averagePrice}</li> */}
                            <li>Total Bedrooms: {row._id.clientName}</li>
                            <li>Total Bathrooms: {row._id.postedBy}</li>
                          </ul>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
              <TableRow>
                <TableCell colSpan={6} sx={{ fontWeight: 'bold', textAlign: 'right' }}>Total Price of All Projects:</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{totalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
    </Box>
    </Box>
    </>
  );
};

export default RequirementReport;