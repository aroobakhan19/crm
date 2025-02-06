import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { addUser } from '../config/db';
import { Typography, Box, Button, Card, CardContent, OutlinedInput, Select, MenuItem, Switch } from '@mui/material';

const AddUser = () => {
  const [employeeRole, setEmployeeRole] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  // const [addUserPermission, setAddUserPermission] = useState(false); 
  // const [addRequirmentPermission, setAddRequirmentPermission] = useState(false);
  // const [addAvaibilityPermission, setAddAvaibilityPermission] = useState(false);
  // const [addProjectPermission, setAddProjectPermission] = useState(false);
  // const [addRentalPermission, setAddRentalPermission] = useState(false);
  // const [addExpensePermission, setAddExpensePermission] = useState(false);

  const handleSelectChange = (event) => {
    const role = event.target.value;
    setEmployeeRole(role);

  };

  const addData = async () => {
    try {
      if (!userName || !userId || !userPassword || !userEmail || !employeeRole) {
        alert("Please fill all the fields");
        return;
      }

      // If all fields are filled, log the data
      const information = {
        userName,
        userId,
        userPassword,
        userEmail,
        employeeRole,
        // addUserPermission,
        // addRequirmentPermission,
        // addAvaibilityPermission,
        // addProjectPermission,
        // addRentalPermission,
        // addExpensePermission,
      };
      await addUser(information);
      alert('User added successfully');
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    const fetchNextUserId = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users/next-id");
        console.log("Fetched Next User ID:", response.data.nextUserId); 
        setUserId(response.data.nextUserId); 
      } catch (error) {
        console.error("Error fetching next user ID:", error.message);
      }
    };

    fetchNextUserId(); 
  }, []);

  return (
    <div>
      <Header />
      <Typography sx={{ ml: { xs: 0, md: '45%' }, mt: { md: 12, xs: 10 }, color: '#1982C4', fontWeight: 'bold' }} variant='h3'>Add User</Typography>
      <Box sx={{ ml: "30%", mt: 5, width: '70%' }}>
        <Card sx={{ maxWidth: 800, boxShadow: 20, backgroundColor: 'beige', borderRadius: '8px' }}>
          <CardContent>
            <Typography sx={{ fontWeight: "bold", color: '#1982C4' }} variant='h6'>Information of User</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Box sx={{ width: '48%' }}>
                <Typography sx={{ fontWeight: 'bold', color: '#011936', fontFamily: 'Arial, sans-serif' }} variant="body1">
                  User Name
                  </Typography>
                <OutlinedInput placeholder="Enter User Name" fullWidth required value={userName} onChange={(e) => setUserName(e.target.value)}
                                  sx={{
                                    height: '35px',
                                    '&:hover': { borderColor: '#011936' },
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                                    fontFamily: 'Arial, sans-serif',
                                    fontSize: '14px',
                                  }}
                />
              </Box>
              <Box sx={{ width: '48%' }}>
                <Typography sx={{ fontWeight: 'bold', color: '#011936', fontFamily: 'Arial, sans-serif' }} variant="body1">
                  User Id
                  </Typography>
                <OutlinedInput placeholder="Enter User Id" fullWidth value={userId}
                              sx={{
                                height: '35px',
                                '&:hover': { borderColor: '#011936' },
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '14px',
                              }}
                onChange={(e) => setUserId(e.target.value)} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Box sx={{ width: '48%' }}>
                <Typography sx={{ fontWeight: 'bold', color: '#011936', fontFamily: 'Arial, sans-serif' }} variant="body1">
                  User Password
                  </Typography>
                <OutlinedInput placeholder="Enter User Password" fullWidth value={userPassword} onChange={(e) => setUserPassword(e.target.value)}
                                 sx={{
                                  height: '35px',
                                  '&:hover': { borderColor: '#011936' },
                                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                                  fontFamily: 'Arial, sans-serif',
                                  fontSize: '14px',
                                }} 
                />
              </Box>
              <Box sx={{ width: '48%' }}>
                <Typography sx={{ fontWeight: 'bold', color: '#011936', fontFamily: 'Arial, sans-serif' }} variant="body1">
                  User Email
                  </Typography>
                <OutlinedInput placeholder="Enter User Email" fullWidth value={userEmail} onChange={(e) => setUserEmail(e.target.value)} 
                    sx={{
                      height: '35px',
                      '&:hover': { borderColor: '#011936' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '14px',
                    }}                
                  />
              </Box>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ fontWeight: 'bold', color: '#011936', fontFamily: 'Arial, sans-serif' }} variant="body1">
                Employee Role
                </Typography>
              <Select 
                  sx={{
                    height: '35px',
                    '&:hover': { borderColor: '#011936' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                  }}
              labelId="employee-role-label" value={employeeRole} onChange={handleSelectChange} displayEmpty input={<OutlinedInput fullWidth />}>
                <MenuItem value="" disabled><em>Select Employee Role</em></MenuItem>
                <MenuItem value="Sale's Executive">Sale's Executive</MenuItem>
                <MenuItem value="Agent">Agent</MenuItem>
                <MenuItem value="Accountant">Accountant</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </Box>

            {/* Add other permission switches as required */}

            <Button 
             sx={{
              mt: 4,
              width: '100%',
              color: 'white',
              backgroundColor: '#011936',
              '&:hover': {
                backgroundColor: '#002b4e',
              },
            }}
            variant="contained" size="large" onClick={addData}>
              Add
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default AddUser;
