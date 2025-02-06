import React,{useState,useEffect} from 'react'
import { AddOwnrequirments } from '../config/db';
import Header from '../components/Header'
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader';
import { Typography, Box, Button, Card, CardContent, OutlinedInput, Select, MenuItem, TextField } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const names = ['Villa', 'Residency', 'Apartment', 'Others'];

const AddOwnRequiremnt = () => {

    const [projectType, setProjectType] = React.useState([]);
    const [requirmentType, setRequirmentType] = React.useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
  
    const [clientName, setClientName] = useState();
    const [clienPhoneNumber, setClienPhoneNumber] = useState();
    const [adress, setAdress] = useState();
    const [projecttype, setprojecttype] = useState();
    const [sqft, setSqft] = useState();
    const [room, setRoom] = useState();
    const [message, setMessage] = useState();
    const [advancePayment, setAdvancePayment] = useState();
    const [monthlyPayment, setMonthlyPayment] = useState();
    const [price, setPrice] = useState();
    const [installment, setInstallment] = useState();
        const [role, setRole] = useState('');
          
            useEffect(() => {
              // Decode role from user in localStorage
              const user = JSON.parse(localStorage.getItem('user'));
              if (user && user.role) {
                setRole(user.role);
              }
            }, []);
  
    const requirment = ['Sell', 'Rent']
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
  
    const handleSelectChange = (event) => {
      const {
        target: { value },
      } = event;
      setProjectType(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
      setprojecttype(value)
    };
    const requireSelectChange = (event) => {
      setRequirmentType(event.target.value)
    };
  
    async function addRequirment() {
      try {
        if (!clientName || !clienPhoneNumber || !adress || !projecttype || !requirmentType || !sqft || !room || !message) {
          alert('Please fill in all the inputs!');
          return;
        }
  
        if (requirmentType === 'Sell') {
          if (!price || !installment) {
            alert('filled input')
            return;
          }
        }
        if (requirmentType === 'Rent') {
          if (!advancePayment || !monthlyPayment) {
            alert('Please fill all the fields');
            return;
          }
        }
  
        // If all fields are filled, log the data
        const addrequirment = {
          clientName,
          clienPhoneNumber,
          adress,
          projecttype,
          sqft,
          room,
          message,
          requirmentType,
          price,
          installment,
          monthlyPayment,
          advancePayment
        };
  
        await AddOwnrequirments(addrequirment)
      } catch (e) {
        alert(e.message);
      }
    }
  
  return (
    <div>
    {role === "Sale's Executive" || role === 'Agent' ? (
        <EmployeeAndAgentHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
      <Typography sx={{ ml: { xs: 0, md: '45%' }, mt: { md: 12, xs: 10 }, color:'#1982C4',fontWeight:'bold' }} variant='h3'>Add Requirment</Typography>
      <Box sx={{ ml: "30%", mt: 5, width: '70%' }}>
        <Card sx={{ maxWidth: 800, boxShadow: 20, backgroundColor: 'beige', borderRadius: '8px' }}>
          <CardContent>
            <Typography sx={{ fontWeight: "bold", color: '#1982C4' }} variant='h6'>
              Information of Requirment
            </Typography>
            <Typography sx={{ fontWeight: "bold", mt: 2, ml: 11 }}>
              Project Image
            </Typography>
            <Box
              sx={{
                border: '2px dashed #d3d3d3',
                borderRadius: '8px',
                width: '100%',
                maxWidth: 600,
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#fafafa',
                margin: 'auto',
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 40, color: '#8a8a8a' }} />
              <Typography variant="body1" sx={{ color: '#8a8a8a', marginTop: 1 }}>
                Drop files here or click to upload.
              </Typography>
              <Button
                variant="contained"
                component="label"
                sx={{
                  mt: 4,
                  color: 'white',
                  backgroundColor: '#011936',
                  '&:hover': {
                    backgroundColor: '#002b4e',
                  },
                }}
              >
                Upload
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {selectedFile && (
                <Typography variant="body2" sx={{ marginTop: 1, color: '#4caf50' }}>
                  Selected File: {selectedFile.name}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Box sx={{ width: '48%' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#011936' }} >
              Client Name
            </Typography>
            <OutlinedInput placeholder="Enter Client Name"
              fullWidth
              type='string'
              onChange={(e) => setClientName(e.target.value)}
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
            <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
              Client Phone Number
            </Typography>
            <OutlinedInput placeholder="Enter Client Name"
              fullWidth
              type='number'
              onChange={(e) => setClienPhoneNumber(e.target.value)}
              sx={{
                height: '35px',
                '&:hover': { borderColor: '#011936' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
              }}
            />
            </Box></Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Box sx={{ width: '48%' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
              Required Location
            </Typography>
            <OutlinedInput placeholder="Enter Required Location"
              fullWidth
              type='string'
              onChange={(e) => setAdress(e.target.value)}
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
            <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
              Project Type
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projectType}
              onChange={handleSelectChange}
              displayEmpty
              input={<OutlinedInput fullWidth />}
              sx={{
                height: '35px',
                '&:hover': { borderColor: '#011936' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
              }}
            >
              {/* Placeholder option */}
              <MenuItem value="" disabled>
                <em>Select Project Type</em>
              </MenuItem>

              {/* Dynamic list of options */}
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            </Box>
</Box>

<Box sx={{ mt: 4 }}>
            <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
              Requirment Type
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={requirmentType}
              onChange={requireSelectChange}
              displayEmpty
              input={<OutlinedInput fullWidth placeholder="Select Requirement Type" />}
              sx={{
                height: '35px',
                '&:hover': { borderColor: '#011936' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
              }}
            >
              {/* Placeholder option */}
              {/* <MenuItem value="" disabled>
    <em>Select Requirment Type</em>
  </MenuItem> */}

              {/* Dynamic list of options */}
              {requirment.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {requirmentType === 'Sell' && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Box sx={{ width: '48%' }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>Add Price</Typography>
                  <OutlinedInput fullWidth placeholder="Enter Price" type="number"
                    onChange={(e) => setPrice(e.target.value)}
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
                  <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>Add Installment</Typography>
                  <OutlinedInput fullWidth placeholder="Enter Installment" type="number"
                    onChange={(e) => setInstallment(e.target.value)}
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
            )}

            {requirmentType === 'Rent' && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Box sx={{ width: '48%' }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>Advance Payment</Typography>
                  <OutlinedInput fullWidth placeholder="Enter Advance Payment" type="number"
                    onChange={(e) => setAdvancePayment(e.target.value)}
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
                  <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>Monthly Rent</Typography>
                  <OutlinedInput fullWidth placeholder="Enter Monthly Rent" type="number"
                    onChange={(e) => setMonthlyPayment(e.target.value)}
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
            )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Box sx={{ width: '48%' }}>
                <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
                  SQFT
                </Typography>
                <OutlinedInput placeholder=" Enter SQFT"
                fullWidth
                  type='number'
                  onChange={(e) => setSqft(e.target.value)}
                  sx={{
                    height: '35px',
                    '&:hover': { borderColor: '#011936' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                  }}
                />
              </Box>
              <Box sx={{ml:8,width:'40%'}}>
                <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
                  Rooms
                </Typography>
                <OutlinedInput placeholder="Enter  Rooms"
                fullWidth
                  type='number'
                  onChange={(e) => setRoom(e.target.value)}
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
            <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
              Message
            </Typography>
            <TextField
              id="filled-textarea"
              placeholder="Enter Message here"
              multiline
              rows={4}
              fullWidth
              variant="filled"
              type='string'
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                height: '90px',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                '& .MuiFilledInput-root': {
                  borderColor: '#d3d3d3',
                },
              }}
            />
            </Box>
            <Button
              onClick={addRequirment}
              sx={{
                mt: 6,
                width: '100%',
                color: 'white',
                backgroundColor: '#011936',
                '&:hover': { backgroundColor: '#002b4e' },
              }}
              variant="contained" size="large">
              Upload
            </Button>

          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default AddOwnRequiremnt
