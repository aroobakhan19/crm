import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { TableRow, Box, Table, TableContainer, TableHead, TableBody, TableCell, OutlinedInput, Select, MenuItem,Button} from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';

const ViewBalance = () => {

    const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [category,setCategory] = useState('')

  useEffect(() => {
    getBalances();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [descriptionFilter, dateFilter, data,category]);

  async function getBalances() {
    try {
      const res = await fetch('https://crm-backend-plum.vercel.app/balance');
      const result = await res.json();
      setData(result.data);
      setFilteredData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  console.log(data)

  const applyFilters = () => {
    let filtered = data;
  
    if (descriptionFilter) {
      filtered = filtered.filter((item) =>
        item.balanceDescription.toLowerCase().includes(descriptionFilter.toLowerCase())
      );
    }

  
    if (dateFilter) {
      filtered = filtered.filter((item) =>
        new Date(item.createdAt).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
      );
    }
    if (category) {
      filtered = filtered.filter((item) =>
        item.category.toLowerCase().includes(category.toLowerCase())
      );
    }
  
    setFilteredData(filtered);
  };
  
  return (
    <div>
      <Header />
      <Box sx={{ display: 'flex', ml: { xs: 0, md: '20%' }, mt: { md: 12, xs: 8 }, width: '70%' }}>
        <OutlinedInput
          placeholder="Filter by Description"
          fullWidth
          value={descriptionFilter}
          onChange={(e) => setDescriptionFilter(e.target.value)}
          sx={{
            backgroundColor: '#F5F5F5',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderColor: '#1982C4',
            },
          }}
        />

<OutlinedInput
          placeholder="Filter by Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{
            backgroundColor: '#F5F5F5',
            borderRadius: 2,
            ml: 2,
            '& .MuiOutlinedInput-root': {
              borderColor: '#1982C4',
            },
          }}
        />

        <OutlinedInput
          type="date"
          sx={{ ml: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}
          fullWidth
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          
        />
          
      </Box>
      <Box sx={{ ml: { xs: 0, md: '23%' }, mt: { md: 3, xs: 8 }, backgroundColor: '#FFFFFF', borderRadius: '8px', padding: 2 }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850 }} aria-label="simple table">
            <TableHead sx={{ background: '#011936' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Balance Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Balance Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Voucher No</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Action</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.balanceDescription}</TableCell>
                  <TableCell>{row.balanceAmount}</TableCell>
                  <TableCell>Voucher No {row.balanceNote}</TableCell>
                  <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                    {row.action} payment
                    </Box>
                  </TableCell>
                  <TableCell>{row.expenseType}</TableCell>
                  <TableCell>{row.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};


export default ViewBalance
