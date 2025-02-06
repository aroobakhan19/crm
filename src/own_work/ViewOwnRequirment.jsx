import React, { useState, useEffect } from 'react';
import {
  Box,
  OutlinedInput,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import Header from '../components/Header';
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader';
import { useNavigate } from 'react-router-dom';

const ViewOwnRequirment = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propertyRequirment, setPropertyRequirment] = useState('');
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
    getRequirments();
  }, []);
    useEffect(() => {
      applyFilters();
    }, [propertyName, propertyType, propertyRequirment, dateFilter]);

  const getRequirments = async () => {
    try {
      const token = localStorage.getItem('token'); // Adjust based on token storage
      const response = await fetch('http://localhost:3001/ownRequirment', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log('Fetched data:', result); // Inspect backend response
      setData(result.data);
      setFilteredData(result.data); // Initially, show all data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/ownRequirment/${id}`, {
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

  const applyFilters = () => {
    let filtered = [...data];

    // Filter by Property Name
    if (propertyName) {
      filtered = filtered.filter((row) =>
        row.clientName.toLowerCase().includes(propertyName.toLowerCase())
      );
    }

    // Filter by Property Type
    if (propertyType) {
      filtered = filtered.filter((row) =>
        row.ProjectType.toLowerCase().includes(propertyType.toLowerCase())
      );
    }

    // Filter by Property Requirement
    if (propertyRequirment) {
      filtered = filtered.filter(
        (row) => row.requirmentType.toLowerCase() === propertyRequirment.toLowerCase()
      );
    }

    // Filter by Property Range (example logic)
    if (dateFilter) {
      filtered = filtered.filter((item) =>
        new Date(item.createdAt).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
      );
    }

    setFilteredData(filtered);
  };


  return (
    <div>
                  {role === "Sale's Executive" || role === 'Agent' ? (
        <EmployeeAndAgentHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
      <Box sx={{ display: 'flex', ml: { xs: 0, md: '25%' }, mt: { md: 12, xs: 10 }, width: '70%' }}>
        <OutlinedInput
          placeholder="Enter Property Name"
          fullWidth
          type="text"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          sx={{ borderColor: '#011936', borderRadius: '8px', backgroundColor: '#f9f9f9' }}
        />
        <OutlinedInput
          placeholder="Enter Property Type"
          sx={{ ml: 1, borderColor: '#011936', borderRadius: '8px', backgroundColor: '#f9f9f9' }}
          fullWidth
          type="text"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        />
        <Select
             sx={{
              ml: 1,
              borderColor: '#011936',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}
          value={propertyRequirment}
          onChange={(e) => setPropertyRequirment(e.target.value)}
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
          onClick={() => navigate('/AddOwnRequiremnt')}
        >
          Add
        </Button>
      </Box>
      <Box sx={{ ml: { xs: 0, md: '25%' }, mt: { md: 3, xs: 10 } }}>
        <TableContainer>
          <Table 
          sx={{ maxWidth: 850, border: '1px solid #d3d3d3', borderRadius: '8px' }}
          aria-label="simple table">
            <TableHead sx={{ background: '#011936', color: 'white' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Client Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Project Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Requirement</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Sqft</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Advance Rent</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Monthly Rent</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Sell</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row._id} className="short-row">
                  <TableCell>{row.clientName}</TableCell>
                  <TableCell>{row.Location}</TableCell>
                  <TableCell>{row.ProjectType}</TableCell>
                  <TableCell>{row.requirmentType}</TableCell>
                  <TableCell>{row.squareFeet}</TableCell>
                  <TableCell>{row.addAdvancedPayment || 'No Advance'}</TableCell>
                  <TableCell>{row.addMonthlyPayment || 'No Monthly Payment'}</TableCell>
                  <TableCell>{row.addPrice || 'Not included'}</TableCell>
                   <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex',gap: 2 }}>
                      <RemoveRedEyeOutlinedIcon
                        sx={{
                          background: '#E4F3F6',
                          color: '#4AB6D0',
                          padding: '2px 4px',
                          cursor: 'pointer',
                          fontSize: '18px',
                        }}
                      />
                      <RestoreFromTrashOutlinedIcon
                        onClick={() => handleDelete(row._id)}
                        sx={{
                          ml: 2,
                          background: '#FFE9E9',
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

export default ViewOwnRequirment;
