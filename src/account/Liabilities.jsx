import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import AccountantHeader from "../components/AccountantHeader";
import { useNavigate } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const Liabilities = () => {
    const [liabilities, setLiabilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
                   const [role, setRole] = useState('');
                                               
                                                 useEffect(() => {
                                                   // Decode role from user in localStorage
                                                   const user = JSON.parse(localStorage.getItem('user'));
                                                   if (user && user.role) {
                                                     setRole(user.role);
                                                   }
                                                 }, []);  

    useEffect(() => {
        const fetchLiabilities = async () => {
            try {
                const response = await axios.get('https://crm-backend-plum.vercel.app/addsSellPropert/getLiabilities');
                setLiabilities(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLiabilities();
    }, []);
    console.log("liabilities",liabilities)

    return (
        <div>
                 {role === "Accountant" ? (
        <AccountantHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
            <Box sx={{ mt: "10%", ml: "25%" }}>
                {loading ? (
                    <Typography variant="h6" color="textSecondary">
                        Loading liabilities...
                    </Typography>
                ) : error ? (
                    <Typography variant="h6" color="error">
                        Error fetching liabilities: {error}
                    </Typography>
                ) : (
                    <TableContainer sx={{ width: '60%' }} component={Paper}>
                        <Table>
                         <TableHead sx={{ backgroundColor: '#011936' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold',color:'white' }}>Username</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold',color:'white' }}>User ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold',color:'white' }}>Total Commission</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold',color:'white' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {liabilities.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.employeeName}</TableCell>
                                        <TableCell>{item._id}</TableCell>
                                        <TableCell>{item.totalLiabilities}</TableCell>
                                        <TableCell>
                                            <RemoveRedEyeOutlinedIcon
                                                onClick={() => navigate(`/LiabilitiesDetail/${item._id}`)}
                                                sx={{
                                                    background: '#E4F3F6',
                                                    border: 'none',
                                                    color: '#4AB6D0',
                                                    padding: '2px 4px',
                                                    cursor: 'pointer',
                                                    fontSize: '18px',
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </div>
    );
};

export default Liabilities;
