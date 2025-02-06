// import React,{useState,useEffect} from 'react'
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header'
// import {Typography,CardContent ,Card,Container,TableRow,Box,Table,TableContainer,TableHead,TableBody,TableCell} from '@mui/material'
// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';

// const ViewProject = () => {
//   const navigate = useNavigate();
//     const [data,setData] = useState([])
//     useEffect(() =>{
//         getProjects()
//     },[])
    
//      async function getProjects(){
//       try {
//           await fetch('http://localhost:3001/project')
//            .then(res => res.json())
//            .then(res => setData(res.data))
         
//         } catch (error) {
//           console.error('Error fetching data:');
//         }
//     }
//     console.log(data)

//   return (
//     <div>
//         <Header />
//         <Box sx={{ml:{xs:0,md:'25%'},mt:{md:12,xs:10}}}>
//       <TableContainer>
//         <Table sx={{ maxWidth: 850,maxHeight:22 }} aria-label="simple table">
//           <TableHead sx={{background:'#EEF0F7',color:'black'}}>
//             <TableRow>
//               <TableCell sx={{fontWeight:'bold'}}>Project Title</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Project Type</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Project Address</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Square Feet</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Bed Room</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Price</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Action</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {data.map((row) => (
//               <TableRow key={row._id}> {/* Change to a unique key */}
//                 <TableCell>{row.projectTitle}</TableCell>
//                 <TableCell>{row.ProjectType}</TableCell>
//                 <TableCell>{row.streetAdress}</TableCell>
//                 <TableCell>{row.squareFeet}</TableCell>
//                 <TableCell>{row.BedRoom}</TableCell>
//                 <TableCell>{row.price}</TableCell>
//                 <TableCell>
//                       <Box sx={{display:'flex'}}>
//                       <RemoveRedEyeOutlinedIcon 
//                       onClick={() => navigate('/ViewDescriptionPage/' + row._id)}
//                       sx={{background:'#E4F3F6',border:'none',color:'#4AB6D0',padding:"2px 4px",cursor:'pointer',fontSize:'18px'}} />
//                       <RestoreFromTrashOutlinedIcon sx={{ml:2,background:'#FFE9E9',border:'none',color:'#FF897C',padding:"2px 4px",cursor:'pointer',fontSize:'18px'}} />
//                       </Box>
//                     </TableCell>
//                     <TableCell>{row.status}</TableCell>
//                 </TableRow>
//             ))}
//           </TableBody>

//           </Table>
//           </TableContainer>
//           </Box>
//       {/* <Container
//       sx={{
//         display: 'flex',
//         flexDirection: { xs: 'column', md: 'row' }, // Column on mobile, row on larger screens
//         alignItems: 'center',
//         justifyContent: { xs: 'center', }, // Centered on mobile, spaced between on larger screens
//         flexWrap: 'wrap', // Allows wrapping in case of small screens
//         mt: 10,
//         ml: { xs: 0, md: 20} 
//       }}
//     >
//       {data.map(item => {
//     return (
//         <Card sx={{ maxWidth: 400,ml:5}}>
//         <CardContent>
//           <Typography gutterBottom sx={{fontSize: 14 }}>
//             {item.projectTitle}
//           </Typography>
//           <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
//           <Typography variant="body2">
//             well meaning and kindly.
//             <br />
//             {'"a benevolent smile"'}
//           </Typography>
//         </CardContent>
//         </Card>
//     );
// })}
// </Container> */}
//     </div>
//   )
// }

// export default ViewProject


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader'
import { Box, OutlinedInput, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, CardContent, Card,Button } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';

const ViewProject = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
    const [role, setRole] = useState('');
      const [filteredData, setFilteredData] = useState([]); // For filtered rows
      const [propertyName, setPropertyName] = useState('');
      const [propertyType, setPropertyType] = useState('');
       const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
      // Decode role from user in localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role) {
        setRole(user.role);
      }
    }, []);

  useEffect(() => {
    getProjects();
  }, []);
                useEffect(() => {
                  applyFilters();
                }, [propertyName, propertyType, dateFilter]);
      

  async function getProjects() {
    try {
      const response = await fetch('http://localhost:3001/project');
      const result = await response.json();
      setData(result.data);
      setFilteredData(result.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
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
      const response = await fetch(`http://localhost:3001/project/${id}`, {
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
        <Box sx={{ display: 'flex', ml: { xs: 0, md: '25%' }, mt: { md: 12, xs: 10 }, width: '70%' }}>
           <OutlinedInput
                  placeholder="Enter property Name"
                  fullWidth
                  type="string"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  sx={{
                    borderColor: '#011936',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                  }}
                />
                <OutlinedInput
                  placeholder="Enter property Type"
                  sx={{
                    ml: 1,
                    borderColor: '#011936',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                  }}
                  fullWidth
                  type="string"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                />
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
              onClick={() => navigate('/AddProject')}
              >
                Add
              </Button>
      </Box>
      <Box sx={{ ml: { xs: 0, md: '25%' }, mt: { md: 3, xs: 10 } }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850, border: '1px solid #d3d3d3', borderRadius: '8px' }} aria-label="simple table">
            <TableHead sx={{ background: '#011936', color: 'white' }}>
              <TableRow>
                <TableCell  sx={{ fontWeight: 'bold', color: 'white' }}>Project Title</TableCell>
                <TableCell  sx={{ fontWeight: 'bold', color: 'white' }}>Project Type</TableCell>
                <TableCell  sx={{ fontWeight: 'bold', color: 'white' }}>Project Address</TableCell>
                <TableCell  sx={{ fontWeight: 'bold', color: 'white' }}>project No</TableCell>
                <TableCell  sx={{ fontWeight: 'bold', color: 'white' }}>Bed Room</TableCell>
                <TableCell  sx={{ fontWeight: 'bold', color: 'white' }}>Price</TableCell>
                <TableCell  sx={{ fontWeight: 'bold', color: 'white' }}>Action</TableCell>
                <TableCell  sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.projectTitle}</TableCell>
                  <TableCell>{row.ProjectType}</TableCell>
                  <TableCell>{row.Location}</TableCell>
                  <TableCell>0{row.projectNumber}</TableCell>
                  <TableCell>{row.BedRoom}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex',gap: 2}}>
                      <RemoveRedEyeOutlinedIcon
                        onClick={() => navigate('/ProjectDetail/' + row._id)}
                        sx={{
                          background: '#E4F3F6',
                          color: '#4AB6D0',
                          padding: '4px',
                          cursor: 'pointer',
                          fontSize: '20px',
                          borderRadius: '5px',
                        }}
                      />
                      <RestoreFromTrashOutlinedIcon
                      onClick={() => handleDelete(row._id)}
                      sx={{
                        background: '#FFE9E9',
                        color: '#FF897C',
                        padding: '4px',
                        cursor: 'pointer',
                        fontSize: '20px',
                        borderRadius: '5px',
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
  );
};

export default ViewProject;
