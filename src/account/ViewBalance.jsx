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

  useEffect(() => {
    getBalances();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [descriptionFilter, dateFilter, data]);

  async function getBalances() {
    try {
      const res = await fetch('http://localhost:3001/balance');
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
          type="date"
          sx={{ ml: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}
          fullWidth
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          
        />
                <Button
    sx={{
      ml: 4,
      backgroundColor: '#011936',
      '&:hover': {
        backgroundColor: '#014F86',
      },
      color: 'white',
      fontWeight: 'bold',
      padding: '10px 20px',
      borderRadius: '5px',
    }}
                  variant="contained"
                color="primary"
                fullWidth
              onClick={() => navigate('/AddBalance')}
              >
                Add
              </Button>
      </Box>
      <Box sx={{ ml: { xs: 0, md: '23%' }, mt: { md: 3, xs: 8 }, backgroundColor: '#FFFFFF', borderRadius: '8px', padding: 2 }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850 }} aria-label="simple table">
            <TableHead sx={{ background: '#011936' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Balance Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Balance Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Balance Note</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Action</TableCell>
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
