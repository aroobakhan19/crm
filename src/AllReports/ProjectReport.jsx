import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, OutlinedInput,Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
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

const ProjectReport = () => {
  const [reportData, setReportData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
                 const [propertyType, setPropertyType] = useState('');
                       const [projectTitle, setProjectTitle] = useState('');
 useEffect(() => {
        fetchReportData();
      }, []);
                    useEffect(() => {
                      applyFilters();
                    }, [propertyType, projectTitle,reportData]);
  
    async function fetchReportData() {
      try {
        const response = await axios.get('https://crm-backend-plum.vercel.app/report/ProjectReport');
        setReportData(response.data.report);
        setTotalPrice(response.data.totalPrice);
        setFilteredData(response.data.report);
      } catch (error) {
        console.error('Error fetching report data:', error);
      } finally {
        setLoading(false);
      }
    };

  console.log(reportData)

  const applyFilters = () => {
    if (!Array.isArray(reportData)) {
      console.error("reportData is not an array:", reportData);
      return;
    }
  
    let filtered = [...reportData];
  
    // Correct field names for filtering
    if (propertyType) {
      filtered = filtered.filter((row) =>
        row._id.ProjectType?.toLowerCase().includes(propertyType.toLowerCase())
      );
    }
  
    if (projectTitle) {
      filtered = filtered.filter((item) =>
        item._id.projectTitle?.toLowerCase().includes(projectTitle.toLowerCase())
      );
    }
  
    setFilteredData(filtered);
  };
   


 
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
        Project Reporting System
      </Typography>

      <Paper sx={{ p:1, mb: 2, borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ display: 'flex', ml: { xs: 0, md: '2%' }, width: '70%' }}>
    

                 <OutlinedInput
                     placeholder="Enter Property Type"
                     sx={{ ml: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}
                     fullWidth
                     type="text"
                     value={propertyType}
                     onChange={(e) => setPropertyType(e.target.value)}
                   />
                             <OutlinedInput
                     placeholder="Enter project Title"
                     sx={{ ml: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}
                     fullWidth
                     
                     value={projectTitle}
                     onChange={(e) => setProjectTitle(e.target.value)}
                   />
          </Box>

          <Box>
            <IconButton sx={{color:'#011936'}} onClick={downloadTable} color="#ebb94a">
              <DownloadIcon />
            </IconButton>
            <IconButton sx={{color:'#011936'}} onClick={exportToExcel} color="#ebb94a">
              <DownloadIcon />
            </IconButton>
            <IconButton sx={{color:'#011936'}} onClick={printTable} color="#ebb94a">
              <PrintIcon />
            </IconButton>
            <IconButton sx={{color:'#011936'}} onClick={exportToPDF} color="#ebb94a">
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
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Property Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>project Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Total Price</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>property Adress</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Posted By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{row._id.ProjectType}</TableCell>
                    <TableCell>{row._id.status}</TableCell>
                    <TableCell>{row._id.projectTitle}</TableCell>
                    <TableCell>{row.totalPrice}</TableCell>
                    <TableCell>{row._id.projectAdress}</TableCell>
                    <TableCell>{row._id.postedBy}</TableCell>
                    
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
    </>
  );
};

export default ProjectReport;




