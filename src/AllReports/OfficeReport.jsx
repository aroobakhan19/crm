import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
    TablePagination, Paper, OutlinedInput,TextField, Toolbar, Divider, IconButton, Grid, CircularProgress, List, ListItem
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

const OfficeReport = () => {
    const [officeReportData, setOfficeReportData] = useState([])
    const [loading, setLoading] = useState(true);
       const [filteredData, setFilteredData] = useState([]); // For filtered rows
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
          const [totalPrice, setTotalPrice] = useState(0);
                    const [avaibilityNumber, setAvaibilityNumber] = useState('');
                    const [propertyType, setPropertyType] = useState('');
                     const [projectType, setProjectType] = useState('');
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
                    }, [avaibilityNumber, propertyType, projectType,officeReportData]);
  
    async function fetchReportData() {
            try {
                const response = await axios.get('https://crm-backend-plum.vercel.app/report/officeAvaibiltyReport');
                console.log('Fetched report data:', response.data);
                setOfficeReportData(response.data.report);
                setTotalPrice(response.data.totalAmount);
                setFilteredData(response.data.report);
            } catch (error) {
                console.error('Error fetching report data:', error);
            } finally {
                setLoading(false);
            }
        };


        const applyFilters = () => {
            let filtered = [...officeReportData];
        
            // Filter by Property Name
            if (avaibilityNumber) {
              filtered = filtered.filter((row) =>
                row.availabilityNumber.toString().toLowerCase().includes(avaibilityNumber.toLowerCase())
              );
            }
            
        
            // Filter by Property Type
            if (propertyType) {
              filtered = filtered.filter((row) =>
                row.requirementType.toLowerCase().includes(propertyType.toLowerCase())
              );
            }
        
            // Filter by Property Range (example logic)
            if (projectType) {
              filtered = filtered.filter((item) =>
                item.projectType.toLowerCase().includes(projectType.toLowerCase())
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
        const csvContent = officeReportData.map(row => Object.values(row).join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'report.csv';
        link.click();
    };


    return (
        <div>
                  {role === "Accountant" ? (
        <AccountantHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
            <Box sx={{ mt: '5%', ml: '17%' }}>
                <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
                        Office Avaibilty Reporting System
                    </Typography>

                    <Paper sx={{ p: 1, mb: 2, borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' }}>
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
                     placeholder="Enter Property Type"
                     sx={{ ml: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}
                     fullWidth
                     type="text"
                     value={projectType}
                     onChange={(e) => setProjectType(e.target.value)}
                   />
                             <OutlinedInput
                     placeholder="Enter Avaibility number"
                     sx={{ ml: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}
                     fullWidth
                     type="number"
                     value={avaibilityNumber}
                     onChange={(e) => setAvaibilityNumber(e.target.value)}
                   />
          </Box>

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
                     <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Client Name</TableCell>
                     <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Posted By</TableCell>
                     <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>project Requirment</TableCell>
                     <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Avaibility Number</TableCell>
                     <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Total Price</TableCell>
                     <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>property Adress</TableCell>
                     <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
                     <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>project Type</TableCell>
                   </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredData.map((row) => (
        <TableRow key={row._id} sx={{ mb: 2, p: 2, border: '1px solid #ccc' }}>
                             <TableCell>{row.clientName}</TableCell>
                               <TableCell>{row.postedBy}</TableCell>
                               <TableCell>{row.requirementType}</TableCell>
                               <TableCell>{row.availabilityNumber}</TableCell>
                               <TableCell>{row.price}</TableCell>
                               <TableCell>{row.location}</TableCell>
                               <TableCell>{row.status}</TableCell>
                               <TableCell>{row.projectType}</TableCell>

                        </TableRow>
                                        ))}
                                        <TableRow>
                                                          <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold' }}>Total Price:</TableCell>
                                                          <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>{totalPrice}</TableCell>
                                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Paper>
                </Box>
            </Box>
        </div>
    )
}

export default OfficeReport
