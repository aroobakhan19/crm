import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
    TablePagination, Paper, TextField, Toolbar, Divider, IconButton, Grid, CircularProgress, List, ListItem
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from 'axios';
import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';
import Header from '../components/Header';

const OfficeReport = () => {
    const [officeReportData, setOfficeReportData] = useState([])
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchOfficeReportData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://crm-backend-plum.vercel.app/report/officeAvaibiltyReport');
                console.log('Fetched report data:', response.data);
                setOfficeReportData(response.data);
            } catch (error) {
                console.error('Error fetching report data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOfficeReportData();
    }, []);


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

    const filteredOfficeData = filter ? officeReportData.filter(item => item._id === filter) : officeReportData

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
            <Header />
            <Box sx={{ mt: '5%', ml: '17%' }}>
                <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
                        Office Avaibilty Reporting System
                    </Typography>

                    <Paper sx={{ p: 1, mb: 2, borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' }}>
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
                                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Property Type</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Total count</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Total Price</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}> Advance Payment</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Monthly Payment</TableCell>
                                            {/* <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Posted By</TableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredOfficeData.map((item) => (
                                            <TableRow key={item._id} sx={{ mb: 2, p: 2, border: '1px solid #ccc' }}>
                                                <TableCell>{item._id}</TableCell>
                                                <TableCell>{item.totalCount}</TableCell>
                                                {item._id === "Sell" ? (
                                                    <TableCell>{item.totalPrice}</TableCell>
                                                ) : (
                                                    <>
                                                        <TableCell>0</TableCell>
                                                    </>
                                                )}
                                                {item._id === "Rent" ? (
                                                    <TableCell>{item.totalAdvancePayment}</TableCell>
                                                ) : (
                                                    <>
                                                        <TableCell>0</TableCell>
                                                    </>
                                                )}
                                                {item._id === "Rent" ? (
                                                    <TableCell>{item.totalMonthlyPayment}</TableCell>
                                                ) : (
                                                    <>
                                                        <TableCell>0</TableCell>
                                                    </>
                                                )}


                                            </TableRow>
                                        ))}
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
