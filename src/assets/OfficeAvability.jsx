import React, { useState } from 'react'
import Header from '../components/Header'
import { AddOfficeAvability } from '../config/db';
import { Typography, Card, CardContent, Box, Button, OutlinedInput, MenuItem, Select, TextField } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const OfficeAvability = () => {
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
            const addofficeavability = {
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
            await AddOfficeAvability(addofficeavability)
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <div>
            <Header />
            <Typography sx={{ ml: { xs: 0, md: '40%' }, mt: { md: 12, xs: 10 }, color:'#2B80EC',fontWeight:'bold' }} variant='h3'>Add office Avability</Typography>
            <Box sx={{ ml: "30%", mt: 5 }}>
                <Card sx={{ width: '80%', boxShadow: 10 }}>
                    <CardContent>
                        <Typography sx={{ fontWeight: "bold", color: '#453a94' }} variant='h6'>
                            Information of office Avaibility
                        </Typography>
                        <Typography sx={{ fontWeight: "bold", mt: 2, ml: 8 }}>
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
                                margin: 'auto'
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
                                    // width: "100%",
                                    background: '#11CDEF',
                                    color: 'white',
                                    '&:hover': {
                                        background: '#2B80EC',
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
                        <Box
                            sx={{ display: 'flex' }}
                        >
                            <Box sx={{ ml: 8, width: '40%' }}>
                                <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                                    Client Name
                                </Typography>
                                <OutlinedInput placeholder="Enter Client Name"
                                    fullWidth
                                    type='string'
                                    onChange={(e) => setClientName(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ ml: 5, width: '40%' }}>
                                <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                                    Client Phone Number
                                </Typography>
                                <OutlinedInput placeholder="Enter Client Phone Number"
                                    fullWidth
                                    type='number'
                                    onChange={(e) => setClientPhoneNumber(e.target.value)}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{ display: 'flex' }}
                        >
                            <Box sx={{ ml: 8, width: '40%' }}>
                                <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                                    Property Description
                                </Typography>
                                <OutlinedInput placeholder="Enter  Property Description"
                                    fullWidth
                                    type='string'
                                    onChange={(e) => setPropertyDescription(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ ml: 5, width: '40%' }}>
                                <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                                    Property Location
                                </Typography>
                                <OutlinedInput placeholder="Enter  Property Location"
                                    fullWidth
                                    type='string'
                                    onChange={(e) => setAdress(e.target.value)}
                                />
                            </Box></Box>
                        <Box
                            sx={{ display: 'flex' }}
                        >
                            <Box sx={{ ml: 8, width: '40%' }}>
                                <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                                    Property Name
                                </Typography>
                                <OutlinedInput placeholder="Enter  Property Name"
                                    fullWidth
                                    type='string'
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ ml: 5, width: '40%' }}>
                                <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                                    Property Type
                                </Typography>
                                <OutlinedInput placeholder="Enter  Property Type"
                                    fullWidth
                                    type='string'
                                    onChange={(e) => setProjectType(e.target.value)}
                                />
                            </Box></Box>
                        <Box sx={{ display: 'flex', mt: 4 }}>
                            <Box sx={{ ml: 8, width: '40%' }}>
                                <Typography sx={{ fontWeight: 'bold', mt: 2 }}>Requirement Type</Typography>
                                <Select
                                    value={requirmentType}
                                    onChange={requireSelectChange}
                                    displayEmpty
                                    input={<OutlinedInput fullWidth placeholder="Select Requirement Type" />}
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
                            <Box sx={{ ml: 5, width: '40%' }}>
                                <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                                    Rooms
                                </Typography>
                                <OutlinedInput placeholder="Enter Rooms"
                                    fullWidth
                                    type='string'
                                    onChange={(e) => setRoom(e.target.value)}
                                />
                            </Box>
                        </Box>

                        {/* Conditionally Render Inputs Based on Requirement Type */}
                        {requirmentType === 'Sell' && (
                            <Box sx={{ mt: 4, display: 'flex' }}>
                                <Box sx={{ ml: 8, width: '40%' }}>
                                    <Typography sx={{ fontWeight: 'bold' }}>Add Price</Typography>
                                    <OutlinedInput fullWidth placeholder="Enter Price" type="number"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ ml: 5, width: '40%' }}>
                                    <Typography sx={{ fontWeight: 'bold' }}>Add Installment</Typography>
                                    <OutlinedInput fullWidth placeholder="Enter Installment" type="number"
                                        onChange={(e) => setInstallment(e.target.value)}
                                    />
                                </Box>
                            </Box>
                        )}

                        {requirmentType === 'Rent' && (
                            <Box sx={{ mt: 4, display: 'flex' }}>
                                <Box sx={{ ml: 8, width: '40%' }}>
                                    <Typography sx={{ fontWeight: 'bold' }}>Advance Payment</Typography>
                                    <OutlinedInput fullWidth placeholder="Enter Advance Payment" type="number"
                                        onChange={(e) => setAdvancePayment(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ ml: 5, width: '40%' }}>
                                    <Typography sx={{ fontWeight: 'bold' }}>Monthly Rent</Typography>
                                    <OutlinedInput fullWidth placeholder="Enter Monthly Rent" type="number"
                                        onChange={(e) => setMonthlyPayment(e.target.value)}
                                    />
                                </Box>
                            </Box>
                        )}
                        <Box
                            sx={{ display: 'flex' }}
                        >
                            <Box sx={{ ml: 8, width: '40%' }}>
                                <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                                    Property Sqft
                                </Typography>
                                <OutlinedInput placeholder="Enter  Property Sqft"
                                    fullWidth
                                    type='string'
                                    onChange={(e) => setSqft(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ ml: 5, width: '40%' }}>
                                <Typography sx={{ fontWeight: "bold", mt: 2 }}>
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
                                />
                            </Box></Box>

                        <Button
                            onClick={addOfficeAvability}
                            sx={{
                                mt: 4,
                                width: "100%",
                                background: '#2B80EC',
                                color: 'white',
                                '&:hover': {
                                    background: '#11CDEF',
                                },
                            }}
                            variant="contained" size="large">
                            Upload
                        </Button>

                    </CardContent></Card></Box>

        </div>
    )
}

export default OfficeAvability
