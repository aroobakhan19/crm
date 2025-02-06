import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader';
import { AddownAvaibility } from '../config/db';
import { Typography, Card, CardContent, Box, Button, OutlinedInput, MenuItem, Select, TextField } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const AddOwnAvaibility = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [requirmentType, setRequirmentType] = useState();
    const [clientName, setClientName] = useState();
    const [clientPhoneNumber, setClientPhoneNumber] = useState();
    const [propertyDescription, setPropertyDescription] = useState();
    const [adress, setAdress] = useState();
    const [projectTitle, setProjectTitle] = useState();
    const [projectType, setProjectType] = useState();
    const [room, setRoom] = useState();
    const [sqft, setSqft] = useState();
    const [advancePayment, setAdvancePayment] = useState();
    const [monthlyPayment, setMonthlyPayment] = useState();
    const [message, setMessage] = useState();
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
    const requireSelectChange = (event) => {
        setRequirmentType(event.target.value);
    };

    const addOfficeAvability = async () => {
        try {
            if (!clientName || !clientPhoneNumber || !propertyDescription || !adress || !projectTitle || !projectType || !requirmentType || !room || !sqft) {
                alert('Please fill all the fields');
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
            const addavability = {
                clientName,
                clientPhoneNumber,
                propertyDescription,
                adress,
                projectTitle,
                projectType,
                requirmentType,
                room,
                sqft,
                price,
                installment,
                monthlyPayment,
                advancePayment,
                message
            }
            await AddownAvaibility(addavability)
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <div>
    {role === "Sale's Executive" || role === 'Agent' ? (
        <EmployeeAndAgentHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
            <Typography sx={{ ml: { xs: 0, md: '45%' }, mt: { md: 12, xs: 10 }, color:'#1982C4',fontWeight:'bold' }} variant='h3'>Add Developer Avability</Typography>
            <Box sx={{ ml: "30%", mt: 5, width: '70%' }}>
                    <Card sx={{ maxWidth: 800, boxShadow: 20, backgroundColor: 'beige', borderRadius: '8px' }}>
                      <CardContent>
                       <Typography sx={{ fontWeight: "bold", color: '#1982C4' }} variant='h6'>
                            Information of Avaibility
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
                                <OutlinedInput placeholder="Enter Client Phone Number"
                                    fullWidth
                                    type='number'
                                    onChange={(e) => setClientPhoneNumber(e.target.value)}
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                    <Box sx={{ width: '48%' }}>
                                    <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
                                    Property Description
                                </Typography>
                                <OutlinedInput placeholder="Enter  Property Description"
                                    fullWidth
                                    type='string'
                                    onChange={(e) => setPropertyDescription(e.target.value)}
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
                                    Property Location
                                </Typography>
                                <OutlinedInput placeholder="Enter  Property Location"
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
                            </Box></Box>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
             <Box sx={{ width: '48%' }}>
             <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
                                    Property Name
                                </Typography>
                                <OutlinedInput placeholder="Enter  Property Name"
                                    fullWidth
                                    type='string'
                                    onChange={(e) => setProjectTitle(e.target.value)}
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
                                    Property Type
                                </Typography>
                                <OutlinedInput placeholder="Enter  Property Type"
                                    fullWidth
                                    type='string'
                                    onChange={(e) => setProjectType(e.target.value)}
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
                                    Requirement Type</Typography>
                                <Select
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
                                    {/* <MenuItem value="" disabled>
    <em>Select Requirement  Type</em>
  </MenuItem> */}
                                    {requirment.map((req) => (
                                        <MenuItem key={req} value={req}>
                                            {req}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
            <Box sx={{ width: '48%' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
                                    Rooms
                                </Typography>
                                <OutlinedInput placeholder="Enter Rooms"
                                    fullWidth
                                    type='string'
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

                        {/* Conditionally Render Inputs Based on Requirement Type */}
                        {requirmentType === 'Sell' && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Box sx={{ width: '48%' }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
                                        Add Price</Typography>
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
                  <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
                                        Add Installment</Typography>
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
                  <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
                                        Advance Payment</Typography>
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                       <Box sx={{ width: '48%' }}>
                                       <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
                                    Property Sqft
                                </Typography>
                                <OutlinedInput placeholder="Enter  Property Sqft"
                                    fullWidth
                                    type='string'
                                    onChange={(e) => setSqft(e.target.value)}
                                    sx={{
                                        height: '55px',
                                        '&:hover': { borderColor: '#011936' },
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                                        fontFamily: 'Arial, sans-serif',
                                        fontSize: '14px',
                                      }}
                                />
                            </Box>
              <Box sx={{ml:8,width:'40%'}}>
                <Typography sx={{ fontWeight: 'bold', color: '#011936' }}>
                                    Message
                                </Typography>
                                <TextField
                                    id="filled-textarea"
                                    placeholder="Enter Message here"
                                    multiline
                                    rows={1}
                                    fullWidth
                                    variant="filled"
                                    type='string'
                                    onChange={(e) => setMessage(e.target.value)}
                                    sx={{
                                        height: '35px',
                                        fontFamily: 'Arial, sans-serif',
                                        fontSize: '14px',
                                        '& .MuiFilledInput-root': {
                                          borderColor: '#d3d3d3',
                                        },
                                      }}
                                />
                            </Box></Box>

                        <Button
                            onClick={addOfficeAvability}
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

                    </CardContent></Card></Box>   
    </div>
  )
}

export default AddOwnAvaibility
