// import React,{useState,useEffect} from 'react'
// import './ViewRequirment.css'
// import Header from '../components/Header';
// import { useNavigate } from 'react-router-dom';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import { Box,OutlinedInput,MenuItem,Select,Typography} from '@mui/material';
// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';


// const ViewRequirment = () => {
//   const navigate = useNavigate()
//     const [data,setData] = useState([])
//     const [propertyRequirment, setPropertyRequirment] = useState('');
//     const [propertyRange, setPropertyRange] = useState('');

//     useEffect(() =>{
//         getRequirments()
//     },[])
    
//      async function getRequirments(){
//       try {
//           await fetch('http://localhost:3001/requirment')
//            .then(res => res.json())
//            .then(res => setData(res.data))
         
//         } catch (error) {
//           console.error('Error fetching data:');
//         }
//     }
//     console.log(data)

//     const handleSelectChange = (event) => {
//       setPropertyRequirment(event.target.value);
//     };
//     const handlePropertyRange = (event) => {
//       setPropertyRange(event.target.value);
//     };

//   return (
//     <div>
//       <Box sx={{display:'flex',ml:{xs:0,md:'25%'},mt:{md:12,xs:10},width:'70%'}}>
//     <OutlinedInput placeholder="Enter property Name" 
//         fullWidth
//         type='string'
//         // onChange={(e) => setClientName(e.target.value)}
//         />
//           <OutlinedInput placeholder="Enter property Type" 
//           sx={{ml:1}}
//         fullWidth
//         type='string'
//         // onChange={(e) => setClientName(e.target.value)}
//         />
//           <Select
//           sx={{ml:1}}
//     labelId="employee-role-label"
//     value={propertyRequirment}
//     onChange={handleSelectChange}
//     displayEmpty
//     input={<OutlinedInput fullWidth />}
//   >
//      <MenuItem value="" disabled>
//     <em>Select Property Requirment</em>
//   </MenuItem>
//     <MenuItem value="sell">Sell</MenuItem>
//     <MenuItem value="rent">Rent</MenuItem>
//   </Select>

//   <Select
//           sx={{ml:1}}
//     labelId="employee-role-label"
//     value={propertyRange}
//     onChange={handlePropertyRange}
//     displayEmpty
//     input={<OutlinedInput fullWidth />}
//   >
//      <MenuItem value="" disabled>
//     <em>Select Property Range</em>
//   </MenuItem>
//     <MenuItem value="sell">100,000 - 50,00,000</MenuItem>
//     <MenuItem value="rent">51,00,000 - 1, 00,00,000</MenuItem>
//     <MenuItem value="rent">1, 00,00,000 - 3,30,00,000</MenuItem>
//     <MenuItem value="rent">3,30,00,000 - 7,00,00,000</MenuItem>
//   </Select>
//         </Box>
//         <Box sx={{ml:{xs:0,md:'25%'},mt:{md:3,xs:10}}}>
//       <TableContainer>
//         <Table sx={{ maxWidth: 850,height:'2px' }} aria-label="simple table">
//           <TableHead sx={{background:'#EEF0F7',color:'black'}}>
//             <TableRow>
//               <TableCell sx={{fontWeight:'bold'}}>Client Name</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Location</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>project Type</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>project Requirment</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Sqft</TableCell>
//                   <TableCell sx={{fontWeight:'bold'}}>Advance Rent</TableCell>
//                   <TableCell sx={{fontWeight:'bold'}}>Monthly Rent</TableCell>
//                 <TableCell sx={{fontWeight:'bold'}}>sell</TableCell>
//                 <TableCell sx={{fontWeight:'bold'}}>Action</TableCell>
//                 <TableCell sx={{fontWeight:'bold'}}>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {data.map((row) => (
//               <TableRow key={row._id}
//               className="short-row" 
//               > {/* Change to a unique key */}
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
//                       <Box sx={{display:'flex'}}>
//                       <RemoveRedEyeOutlinedIcon 
//                       // onClick={() => navigate('/ViewDescriptionPage/' + row._id)}
//                       sx={{background:'#E4F3F6',border:'none',color:'#4AB6D0',padding:"2px 4px",cursor:'pointer',fontSize:'18px'}} />
//                       <RestoreFromTrashOutlinedIcon sx={{ml:2,background:'#FFE9E9',border:'none',color:'#FF897C',padding:"2px 4px",cursor:'pointer',fontSize:'18px'}} />
//                       </Box>
//                     </TableCell>
//                     <TableCell>{row.status}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
          
//           </Table>
//           </TableContainer>
//           </Box>
      
// </div>
//   )
// }

// export default ViewRequirment


import React, { useState, useEffect } from 'react';
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader'
import Header from '../components/Header';
import './ViewRequirment.css';
import { Box, OutlinedInput, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import { useNavigate } from 'react-router-dom';

const ViewRequirment = () => {
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
    getRequirments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [propertyName, propertyType, propertyRequirment, dateFilter]);

  const getRequirments = async () => {
    try {
      const response = await fetch('http://localhost:3001/requirment');
      const result = await response.json();
      setData(result.data);
      setFilteredData(result.data); // Initially, show all data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(data)

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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/requirment/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Deleted successfully:', result);
        // Update state to remove deleted item
        setFilteredData((prevData) => prevData.filter((item) => item._id !== id));
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
    <Box sx={{ display: 'flex', ml: { xs: 0, md: '20%' }, mt: { md: 12, xs: 8 }, width: '70%' }}>
        <OutlinedInput
          placeholder="Enter Property Name"
          fullWidth
          type="text"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          sx={{
            backgroundColor: '#F5F5F5',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderColor: '#1982C4',
            },
          }}
        />
        <OutlinedInput
          placeholder="Enter Property Type"
          sx={{ ml: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}
          fullWidth
          type="text"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        />
        <Select
              sx={{ ml: 1, backgroundColor: '#F5F5F5', borderRadius: 2 }}
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
                      fullWidth
                  variant="contained"
                color="primary"
              onClick={() => navigate('/AddRequirment')}
              >
                Add
              </Button>
      </Box>
      <Box sx={{ ml: { xs: 0, md: '20%' }, mt: { md: 3, xs: 8 }, backgroundColor: '#FFFFFF', borderRadius: '8px', padding: 2 }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850 }} aria-label="simple table">
            <TableHead sx={{ background: '#011936' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '10%' }}>Client Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '10%' }}>Location</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '12%' }}>Project Type</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '10%' }}>Requirement</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '10%' }}>Requirment No</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '12%' }}>Advance Rent</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '12%' }}>Monthly Rent</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '10%' }}>Sell</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '12%' }}>Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '8%' }}>Action</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '8%' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row._id} className="short-row">
                  <TableCell sx={{ padding: '8px' }}>{row.clientName}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.Location}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.ProjectType}</TableCell>
                  <TableCell sx={{ padding: '31px' }}>{row.requirmentType}</TableCell>
                  <TableCell sx={{ padding: '25px' }}>{row.requirmentNumber}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.addAdvancedPayment || 'No Advance'}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.addMonthlyPayment || 'No Monthly Payment'}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.addPrice || 'Not included'}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  {/* {new Date(row.createdAt).toLocaleDateString()} */}
                  <TableCell sx={{ padding: '8px' }}>
                    <Box sx={{ display: 'flex' }}>
                      <RemoveRedEyeOutlinedIcon
                       onClick={() => navigate('/RequirmentDetail/' + row._id)}
                       sx={{
                        background: '#E4F3F6',
                        color: '#4AB6D0',
                        padding: '4px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        borderRadius: 1,
                        '&:hover': { backgroundColor: '#E1F7FD' },
                      }}
                      />
                      <RestoreFromTrashOutlinedIcon
                       onClick={() => handleDelete(row._id)}
                       sx={{
                        ml: 2,
                        background: '#FFE9E9',
                        color: '#FF897C',
                        padding: '4px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        borderRadius: 1,
                        '&:hover': { backgroundColor: '#FFDDDC' },
                      }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ViewRequirment;
