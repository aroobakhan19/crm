import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AccountantHeader from "../components/AccountantHeader";
import { TableRow, Box, Table, TableContainer, TableHead, TableBody, TableCell, OutlinedInput, Select, MenuItem,Button} from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';


const ViewPayable = () => {
    const navigate = useNavigate();
          const [data, setData] = useState([]);
          const [filteredData, setFilteredData] = useState([]);
          const [descriptionFilter, setDescriptionFilter] = useState('');
          const [categoryFilter, setCategoryFilter] = useState('');
          const [dateFilter, setDateFilter] = useState('');
           const [role, setRole] = useState('');
                      
                        useEffect(() => {
                          // Decode role from user in localStorage
                          const user = JSON.parse(localStorage.getItem('user'));
                          if (user && user.role) {
                            setRole(user.role);
                          }
                        }, []);
        
          useEffect(() => {
            getExpenses();
          }, []);
        
          useEffect(() => {
            applyFilters();
          }, [descriptionFilter, categoryFilter, dateFilter, data]);
        
          async function getExpenses() {
            try {
              const res = await fetch('https://crm-backend-plum.vercel.app/payable');
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
                item.expenseDiscription.toLowerCase().includes(descriptionFilter.toLowerCase())
              );
            }
          
            if (categoryFilter) {
              filtered = filtered.filter((item) =>
                item.expenseCategory.toLowerCase() === categoryFilter.toLowerCase()
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
              {role === "Accountant" ? (
        <AccountantHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
      <Box sx={{ display: 'flex', ml: { xs: 0, md: '25%' }, mt: { md: 12, xs: 10 }, width: '70%' }}>
        <OutlinedInput
          placeholder="Filter by Description"
          fullWidth
          value={descriptionFilter}
          onChange={(e) => setDescriptionFilter(e.target.value)}
          sx={{
            borderColor: '#011936',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        />
       <Select
                     sx={{
                      ml: 1,
                      borderColor: '#011936',
                      borderRadius: '8px',
                      backgroundColor: '#f9f9f9',
                    }}
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  displayEmpty
  input={<OutlinedInput fullWidth />}
>
  <MenuItem value="">
    <em>Filter by Category</em>
  </MenuItem>
  <MenuItem value="by cash">by Cash</MenuItem>
  <MenuItem value="online transfer">online transfer</MenuItem>
  <MenuItem value="bank transfer">bank transfer</MenuItem>
</Select>

        <OutlinedInput
          type="date"
          sx={{
            ml: 1,
            borderColor: '#011936',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
          fullWidth
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
                <Button
           sx={{
            ml: 4,
            backgroundColor: '#011936',
            color: 'white',
            '&:hover': {
              backgroundColor: '#014F86', // Darker blue on hover
            },
            borderRadius: '8px',
          }}
                      fullWidth
                  variant="contained"
                color="primary"
              onClick={() => navigate('/AddVoucher')}
              >
                Add
              </Button>
      </Box>
    <Box sx={{ ml: { xs: 0, md: '25%' }, mt: { md: 3, xs: 10 } }}>
             <TableContainer>
               <Table sx={{ maxWidth: 850, border: '1px solid #d3d3d3', borderRadius: '8px' }} aria-label="simple table">
                 <TableHead sx={{ background: '#011936', color: 'white' }}>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#555', color: 'white' }}>
            Expense Description
          </TableCell>
          <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '16px', color: '#555', color: 'white' }}>
            Voucher No
          </TableCell>
          <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '16px', color: '#555', color: 'white' }}>
            Expense Category
          </TableCell>
          <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '16px', color: '#555', color: 'white' }}>
            Created At
          </TableCell>
          <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '16px', color: '#555', color: 'white' }}>
            Action
          </TableCell>
        </TableRow>
      </TableHead>

      {/* Table Body */}
      <TableBody>
        {filteredData.map((row) => (
          <TableRow
            key={row._id}
            sx={{
              '&:hover': {
                background: '#f9f9f9',
                cursor: 'pointer',
              },
            }}
          >
            <TableCell sx={{ fontSize: '14px', color: '#555' }}>
              {row.expenses && row.expenses.length > 0
                ? row.expenses.map((expense) => expense.expenseDiscription).join(', ')
                : 'No description available'}
            </TableCell>
            <TableCell align="right" sx={{ fontSize: '14px', color: '#555' }}>
              {row.voucherNumber || '-'}
            </TableCell>
            <TableCell align="right" sx={{ fontSize: '14px', color: '#555' }}>
              {row.expenseCategory || '-'}
            </TableCell>
            <TableCell align="right" sx={{ fontSize: '14px', color: '#555' }}>
              {new Date(row.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell align="right">
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <RemoveRedEyeOutlinedIcon
                  onClick={() => navigate('/PayableDescription/' + row._id)}
                  sx={{
                    background: '#E4F3F6',
                    borderRadius: '50%',
                    padding: '6px',
                    color: '#4AB6D0',
                    cursor: 'pointer',
                    fontSize: '20px',
                  }}
                />
                <RestoreFromTrashOutlinedIcon
                  sx={{
                    background: '#FFE9E9',
                    borderRadius: '50%',
                    padding: '6px',
                    color: '#FF897C',
                    cursor: 'pointer',
                    fontSize: '20px',
                  }}
                />
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Box>


    </div>
  )
}

export default ViewPayable
