import React, { useEffect, useState } from 'react';
import {
  Box, Typography, OutlinedInput,Button, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
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
import AccountantHeader from "../components/AccountantHeader";
const RequirementReport = () => {
  const [reportData, setReportData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedRow, setExpandedRow] = useState(null);
    const [requirmentNo, setRequirmentNo] = useState('');
                      const [propertyType, setPropertyType] = useState('');
                       const [projectLocation, setProjectLocation] = useState(''); 
                                                 const [role, setRole] = useState('');
                                                                                                
                                                                                                  useEffect(() => {
                                                                                                    // Decode role from user in localStorage
                                                                                                    const user = JSON.parse(localStorage.getItem('user'));
                                                                                                    if (user && user.role) {
                                                                                                      setRole(user.role);
                                                                                                    }
                                                                                                  }, []); 

useEffect(() => {
        fetchReportData();
      }, []);
                    useEffect(() => {
                      applyFilters();
                    }, [requirmentNo, projectLocation,reportData,propertyType]);
  
    async function fetchReportData() {
       try {
        const response = await axios.get('https://crm-backend-plum.vercel.app/report/requirementReport');
        setReportData(response.data.report);
        setTotalPrice(response.data.totalAmount);
        setFilteredData(response.data.report);
      } catch (error) {
        console.error('Error fetching report data:', error);
      } finally {
        setLoading(false);
      }
    };

  console.log(reportData)

  const applyFilters = () => {
    let filtered = [...reportData];

    // Filter by Property Name
    if (requirmentNo) {
      filtered = filtered.filter((row) =>
        row.requirmentNumber.toString().toLowerCase().includes(requirmentNo.toLowerCase())
      );
    }
    

    // Filter by Property Type
    if (propertyType) {
      filtered = filtered.filter((row) =>
        row.requirmentType.toLowerCase().includes(propertyType.toLowerCase())
      );
    }

    // Filter by Property Range (example logic)
    if (projectLocation) {
      filtered = filtered.filter((item) =>
        item.Location.toLowerCase().includes(projectLocation.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };
  console.log(filteredData); // ✅ Check if filteredData is updating


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



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
         {role === "Accountant" ? (
        <AccountantHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
    <Box sx={{mt:'5%',ml:'17%'}}>
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
           Requirment Reporting System
         </Typography>

          <Paper sx={{ p:1, mb: 2, borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', ml: { xs: 0, md: '2%' }, width: '70%' }}>
            <Select
              sx={{ ml: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          displayEmpty
          input={<OutlinedInput fullWidth />}
        >
          <MenuItem value="">
            <em>Select Property Requirement</em>
          </MenuItem>
          <MenuItem value="sell">Sell</MenuItem>
          <MenuItem value="rent">Rent</MenuItem>
        </Select>


                 <OutlinedInput
                     placeholder="Enter Property Location"
                     sx={{ ml: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}
                     fullWidth
                     type="text"
                     value={projectLocation}
                     onChange={(e) => setProjectLocation(e.target.value)}
                   />
                             <OutlinedInput
                     placeholder="Enter requirment number"
                     sx={{ ml: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}
                     fullWidth
                     type="number"
                     value={requirmentNo}
                     onChange={(e) => setRequirmentNo(e.target.value)}
                   />
          </Box>
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
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' ,color: 'white'}}> Requirement No</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' ,color: 'white' }}>Total Price</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' ,color: 'white' }}>Client Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' ,color: 'white' }}>Posted By</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' ,color: 'white' }}>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <>
                  <TableRow key={index} onClick={() => handleRowClick(index)}>
                    <TableCell align="center">{row.requirmentType}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.requirmentNumber}</TableCell>
                    <TableCell align="center">{row.priceOrRent}</TableCell>
                    {/* <TableCell align="center">{row.averagePrice.toFixed(2)}</TableCell> */}
                    <TableCell align="center">{row.clientName}</TableCell>
                    <TableCell align="center">{row.postedBy}</TableCell>
                    <TableCell align="center">{row.Location}</TableCell>
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