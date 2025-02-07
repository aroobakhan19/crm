// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Button, Select, MenuItem,TableContainer,Table,TableHead,TableRow,TableCell,TableBody} from '@mui/material';
// import Header from '../components/Header';
// import axios from 'axios';

// const ProjectReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filter, setFilter] = useState('');
//     useEffect(() => {
//         const fetchReportData = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get('http://localhost:3001/report/ProjectReport');
//                 console.log('Fetched report data:', response.data);
//                 setReportData(response.data);
//             } catch (error) {
//                 console.error('Error fetching report data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchReportData();
//     }, []);

//     const handleFilterChange = (event) => {
//         setFilter(event.target.value);
//     };

//     const filteredData = filter ? reportData.filter(item => item._id === filter) : reportData;

//   return (
//     <div>
//          <Typography variant="h3" sx={{ ml: 4, mt: 4 }}>Reporting System</Typography>
//             <Box sx={{ m: 4 }}>
//                 <Select
//                     value={filter}
//                     onChange={handleFilterChange}
//                     displayEmpty
//                     sx={{ mb: 2 }}
//                 >
//                     <MenuItem value="">
//                         <em>All</em>
//                     </MenuItem>
//                     <MenuItem value="Sell">Sell</MenuItem>
//                     <MenuItem value="Rent">Rent</MenuItem>
//                 </Select>
//                 <Button variant="contained" onClick={() => setFilter('')}>Reset Filter</Button>
//             </Box>
//             {loading ? (
//                 <Typography>Loading...</Typography>
//             ) : (
//                 <Box>
//     {filteredData.map((item) => (
//         <Box key={item._id} sx={{ mb: 2, p: 2, border: '1px solid #ccc' }}>
//             <Typography variant="h6">Requirement Type: {item._id}</Typography>
//             <Typography>Total Count: {item.totalCount}</Typography>

//                 <Typography>Total Price: {item.totalPrice}</Typography>

//                         </Box>
//                     ))}
//                 </Box>
//             )}

// <Box sx={{ml:{xs:0,md:'25%'},mt:{md:3,xs:10}}}>
//       <TableContainer>
//         <Table sx={{ maxWidth: 850,height:'2px' }} aria-label="simple table">
//           <TableHead sx={{background:'#EEF0F7',color:'black'}}>
//             <TableRow>
//               <TableCell sx={{fontWeight:'bold'}}>Client Name</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Location</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>project Type</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>project Requirment</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Sqft</TableCell>
//                 <TableCell sx={{fontWeight:'bold'}}>sell</TableCell>
//                 <TableCell sx={{fontWeight:'bold'}}>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           {/* <TableBody>
//           {data.map((row) => (
//               <TableRow key={row._id}
//               className="short-row" 
//               >
//                 <TableCell>{row.clientName}</TableCell>
//                 <TableCell>{row.Location}</TableCell>
//                 <TableCell>{row.ProjectType}</TableCell>
//                 <TableCell>{row.requirmentType}</TableCell>
//                 <TableCell>{row.squareFeet}</TableCell>
//                     <TableCell>{row.addAdvancedPayment?row.addAdvancedPayment:'no Advance'}</TableCell>
//                     <TableCell>{row.addMonthlyPayment?row.addMonthlyPayment:'no Monthly Payment'}</TableCell>
              
//                   <TableCell>{row.addPrice?row.addPrice:'not price included'}
//                     </TableCell>
//                     <TableCell>
//                     </TableCell>
             
//               </TableRow>
//             ))}
//           </TableBody>
//            */}
//           </Table>
//           </TableContainer>
//           </Box>
      
//     </div>
//   )
// }

// export default ProjectReport



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

const ProjectReport = () => {
  const [reportData, setReportData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://crm-backend-plum.vercel.app/report/ProjectReport');
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

  const filteredData = filter ? reportData.filter(item => item._id.ProjectType === filter) : reportData;

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
                  {/* <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Posted By</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{row._id.ProjectType}</TableCell>
                    <TableCell>{row._id.status}</TableCell>
                    <TableCell>{row._id.projectTitle}</TableCell>
                    <TableCell>{row.totalPrice}</TableCell>
                    <TableCell>{row._id.projectAdress}</TableCell>
                    
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

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ mt: 2 }}
        />
      </Paper>
    </Box>
    </Box>
    </>
  );
};

export default ProjectReport;




