import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Select, MenuItem } from '@mui/material';
import Header from '../components/Header';
import axios from 'axios';

const Report = () => {
    return (
        <div>
            <Header />
        <Box sx={{mt:'10%',ml:'20%'}}>
            <Link to='/RequirementReport'>
            <Typography variant='h4'>Requirement Report</Typography>
            </Link>
            <Link to='/ProjectReport'>
            <Typography variant='h4' sx={{mt:5}}>project Report</Typography>
            </Link>
            <Link to='/AvaibilityReport'>
            <Typography variant='h4' sx={{mt:5}}>Avaibility Report</Typography>
            </Link>
            <Link to='/ExpenseReport'>
            <Typography variant='h4' sx={{mt:5}}>Expense Report</Typography>
            </Link>
            <Link to='/VoucherReport'>
            <Typography variant='h4' sx={{mt:5}}>Vouchers Report</Typography>
            </Link>
        </Box>

        </div>
    );
};

export default Report;

