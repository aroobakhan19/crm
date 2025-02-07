// import React,{useState,useEffect} from 'react'
// import Header from '../components/Header';
// import { useNavigate } from 'react-router-dom';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import { Box,OutlinedInput,MenuItem,Select,} from '@mui/material';
// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';


// const ViewUser = () => {
//   const navigate = useNavigate()
//     const [data,setData] = useState([])
//     useEffect(() =>{
//         getUsers()
//     },[])
    
//      async function getUsers(){
//       try {
//           await fetch('http://localhost:3001/users')
//            .then(res => res.json())
//            .then(res => setData(res.data))
         
//         } catch (error) {
//           console.error('Error fetching data:');
//         }
//     }
//     console.log(data)

//   return (
//     <div>

// <Box sx={{display:'flex',ml:{xs:0,md:'25%'},mt:{md:12,xs:10},width:'70%'}}>
//     <OutlinedInput placeholder="Enter User Name" 
//         fullWidth
//         type='string'
//         // onChange={(e) => setClientName(e.target.value)}
//         />
//           <OutlinedInput placeholder="Enter User Email" 
//           sx={{ml:1}}
//         fullWidth
//         type='string'
//         // onChange={(e) => setClientName(e.target.value)}
//         />
//         </Box>
//         <Box sx={{ml:{xs:0,md:'25%'},mt:{md:3,xs:10}}}>
//       <TableContainer>
//         <Table sx={{ maxWidth: 850,maxHeight:22 }} aria-label="simple table">
//           <TableHead sx={{background:'#EEF0F7',color:'black'}}>
//             <TableRow>
//               <TableCell sx={{fontWeight:'bold'}}>User Name</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>User Id</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>Employee Role</TableCell>
//               <TableCell sx={{fontWeight:'bold'}}>User Email</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row._id}> {/* Change to a unique key */}
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.role}</TableCell>
//                 <TableCell>{row.email}</TableCell>
//                    <TableCell>
//                       <Box sx={{display:'flex'}}>
//                       <RemoveRedEyeOutlinedIcon 
//                       onClick={() => navigate('/ViewDescriptionPage/' + row._id)}
//                       sx={{background:'#E4F3F6',border:'none',color:'#4AB6D0',padding:"2px 4px",cursor:'pointer',fontSize:'18px'}} />
//                       <RestoreFromTrashOutlinedIcon sx={{ml:2,background:'#FFE9E9',border:'none',color:'#FF897C',padding:"2px 4px",cursor:'pointer',fontSize:'18px'}} />
//                       </Box>
//                     </TableCell>
             
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>

//     </div>
//   )
// }

// export default ViewUser


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box, OutlinedInput,
} from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';

const ViewUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      await fetch('https://crm-backend-plum.vercel.app/users')
        .then(res => res.json())
        .then(res => {
          setData(res.data);
          setFilteredData(res.data);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleFilterChange = () => {
    const filtered = data.filter(user =>
      (user.name.toLowerCase().includes(userName.toLowerCase()) || !userName) &&
      (user.email.toLowerCase().includes(userEmail.toLowerCase()) || !userEmail)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [userName, userEmail]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://crm-backend-plum.vercel.app/users/${id}`, {
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
     <Box sx={{ display: 'flex', ml: { xs: 0, md: '25%' }, mt: { md: 12, xs: 10 }, width: '50%' }}>
        <OutlinedInput
          placeholder="Enter User Name"
          fullWidth
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{
            mr: 1,
            height: '40px',
            fontSize: '0.875rem',
            padding: '5px 12px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        />
        <OutlinedInput
          placeholder="Enter User Email"
          fullWidth
          type="text"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          sx={{
            height: '40px',
            fontSize: '0.875rem',
            padding: '5px 12px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        />
      </Box>
      <Box sx={{ ml: { xs: 0, md: '25%' }, mt: { md: 3, xs: 10 } }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850, border: '1px solid #d3d3d3', borderRadius: '8px' }} aria-label="simple table">
            <TableHead sx={{ background: '#011936', color: 'white' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>User Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>User Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Employee Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>User Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ViewUser;
