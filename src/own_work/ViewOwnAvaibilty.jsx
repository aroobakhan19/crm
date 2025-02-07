import React, { useState, useEffect } from 'react';
import { Box, OutlinedInput, MenuItem, Select, Button,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import Header from '../components/Header';
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader';
import { useNavigate } from 'react-router-dom';

const ViewOwnAvaibilty = () => {
  const navigate = useNavigate()
    const [data, setData] = useState([]);
      const [filteredData, setFilteredData] = useState([]); // For filtered rows
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
            getAvaibility();
            }, []);

                useEffect(() => {
                  applyFilters();
                }, [propertyName, propertyType, propertyRequirment, dateFilter]);
      
            const getAvaibility = async () => {
                  try {
                      const token = localStorage.getItem('token'); // Adjust based on token storage
                      const response = await fetch('https://crm-backend-plum.vercel.app/ownAvaibility', {
                          headers: {
                              'Authorization': `Bearer ${token}`,
                          }
                      });
                      const result = await response.json();
                      console.log('Fetched data:', result); // Inspect backend response
                      setData(result.data);
                      setFilteredData(result.data); // Initially, show all data
                  } catch (error) {
                      console.error('Error fetching data:', error);
                  }
              };
              
          console.log(data)

          const handleDelete = async (id) => {
            try {
              const token = localStorage.getItem('token');
              const response = await fetch(`https://crm-backend-plum.vercel.app/ownAvaibility/${id}`, {
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
          placeholder="Enter property Name"
          fullWidth
          type="string"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          sx={{ borderColor: '#011936', borderRadius: '8px', backgroundColor: '#f9f9f9' }}
        />
        <OutlinedInput
          placeholder="Enter property Type"
          sx={{ ml: 1, borderColor: '#011936', borderRadius: '8px', backgroundColor: '#f9f9f9' }}
          fullWidth
          type="string"
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
          <MenuItem value="" disabled>
            <em>Select Property Requirment</em>
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
              onClick={() => navigate('/AddOwnAvaibility')}
              >
                Add
              </Button>
      </Box>
      <Box sx={{ ml: { xs: 0, md: '25%' }, mt: { md: 3, xs: 10 } }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850, border: '1px solid #d3d3d3', borderRadius: '8px' }} aria-label="simple table">
            <TableHead sx={{ background: '#011936', color: 'white' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Client Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Project Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Project Requirment</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Sqft</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Advance Rent</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Monthly Rent</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Sell</TableCell>
                  <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Action</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color: 'white' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.clientName}</TableCell>
                  <TableCell>{row.propertyLocation}</TableCell>
                  <TableCell>{row.ProjectType}</TableCell>
                  <TableCell>{row.projectRequirment}</TableCell>
                  <TableCell>{row.sqft}</TableCell>
                  <TableCell>{row.projectAdvanceRent || 'No Advance'}</TableCell>
                  <TableCell>{row.projectMonthlyRent || 'No Monthly Payment'}</TableCell>
                  <TableCell>{row.projectPrice || 'No Price Included'}</TableCell>
                   <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <RemoveRedEyeOutlinedIcon
                        // onClick={() => navigate('/ViewDescriptionPage/' + row._id)}
                        sx={{
                          background: '#E4F3F6',
                          border: 'none',
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
                        border: 'none',
                        color: '#FF897C',
                        padding: '2px 4px',
                        cursor: 'pointer',
                        fontSize: '18px',
                      }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}

export default ViewOwnAvaibilty
