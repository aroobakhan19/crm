import React, { useState, useEffect } from 'react';
import { Box, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader';

const ViewOwnTask = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
    getTask();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [dateFilter, data]);

  async function getTask() {
    try {
      const token = localStorage.getItem('token'); // Adjust based on token storage
      const response = await fetch('http://localhost:3001/ownTask', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      // Sort tasks by `createdAt` in descending order
      const sortedData = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setData(sortedData); // Store sorted data
      setFilteredData(sortedData); // Apply sorted data to filteredData initially
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const applyFilters = () => {
    let filtered = data;

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.createdAt).toLocaleDateString() ===
          new Date(dateFilter).toLocaleDateString()
      );
    }

    setFilteredData(filtered); // Update filtered data
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/ownTask/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Deleted successfully:', result);
        // Update state to remove deleted item
        setData((prevData) => prevData.filter((item) => item._id !== id));
      } else {
        console.error('Error deleting item:', result.message);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
                  {role === "Sale's Executive" || role === 'Agent' ? (
        <EmployeeAndAgentHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
      <Box
        sx={{
          display: 'flex',
          ml: { xs: 0, md: '60%' },
          mt: { md: 3, xs: 10 },
          width: '30%',
        }}
      >
        <OutlinedInput
          type="date"
          sx={{ ml: 1 }}
          fullWidth
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </Box>
      <Box sx={{ ml: { xs: 0, md: '0%' }, mt: { md: 3, xs: 10 } }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#011936', color: '#ffffff' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold',color: '#ffffff' }}>Task Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: '#ffffff' }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: '#ffffff' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.inputValue}</TableCell>
                  <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <RestoreFromTrashOutlinedIcon
                      onClick={() => handleDelete(row._id)}
                        sx={{
                          ml: 2,
                          background: '#FFE9E9',
                          border: 'none',
                          color: '#FF897C',
                          padding: '2px 4px',
                          cursor: 'pointer',
                          fontSize: '18px',
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
  );
};

export default ViewOwnTask;
