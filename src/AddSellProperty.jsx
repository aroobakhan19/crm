import React, { useState, useEffect } from 'react';
import { Card, TextField, Button, Box, Typography, Select, MenuItem, OutlinedInput, Snackbar, Alert,CardContent } from '@mui/material';
import Header from './components/Header';
import EmployeeAndAgentHeader from './components/EmployeeAndAgentHeader';
import { AddSell } from './config/db';

const AddSellProperty = () => {
    const [receivedClientName, setReceivedClientName] = useState('');
    const [receivedEmployeeName, setReceivedEmployeeName] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [propertyLocation, setPropertyLocation] = useState('');
    const [propertyRequirmentType, setPropertyRequirmentType] = useState('');
    const [propertyCategory, setPropertyCategory] = useState('');
    const [propertyNo, setPropertyNo] = useState('');
    const [price, setPrice] = useState('');
    const [commissionPercOfReceivedEmployeed,setCommissionPercOfReceivedEmployeed] = useState('')
    const [receiverEmployeeId,setReceiverEmployeeId] = useState('')

    const [buyerClientName,setBuyerClientName] = useState('');
    const [buyerClientPhoneNumber,setBuyerClientPhoneNumber] = useState('');
    const [propertyAmount,setPropertyAmount] = useState('');
    const [note,setNote] = useState('')
    const [buyerEmployeeName,setBuyerEmployeeName] = useState('');
    const [buyerEmployeeId,setBuyerEmployeeId] = useState('');
    const [commissionPercOfBuyerEmployeed,setCommissionPercOfBuyerEmployeed] = useState('')

    const [autoFilled, setAutoFilled] = useState({
        propertyType: '',
        propertyLocation: '',
        propertyRequirmentType: '',
        receivedClientName: '',
        receivedEmployeeName: '',
        price: '',
        receiverEmployeeId :''
    });
    const [role, setRole] = useState('');
         
                     useEffect(() => {
                       // Decode role from user in localStorage
                       const user = JSON.parse(localStorage.getItem('user'));
                       if (user && user.role) {
                         setRole(user.role);
                       }
                     }, []);
         
    const category = ['Requirement', 'Developer Avability', 'office Avability', "project"];
    const token = localStorage.getItem('token');

    const requireSelectChange = (event) => {
        setPropertyCategory(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = new URL('https://crm-backend-plum.vercel.app/addsSellPropert/getProjectDetails');
                url.searchParams.append('propertyCategory', propertyCategory);
                url.searchParams.append('propertyNo', propertyNo);

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    console.log('Fetched Project Data:', data);
             setAutoFilled({
                    propertyType: data.data?.ProjectType || '',
                    propertyLocation: data.data?.Location || '',
                    propertyRequirmentType: data.data?.requirmentType || '',
                    receivedClientName: data.data?.clientName || '',
                    receivedEmployeeName: data.data?.postedBy || '',
                    price: data.data.requirmentType === 'Rent' ? data.data?.addAdvancedPayment :data.data?.addPrice,
                    receiverEmployeeId: data.data?.userId || ''
                });

                } else {
                    console.error('Error fetching project data:', data.message);
                }
            } catch (error) {
                console.error('Fetch error:', error.message);
            }
        };

        if (propertyNo && propertyCategory) {
            fetchData();
        }
    }, [propertyNo, propertyCategory]);


    async function addSell() {
        try {
            // Consolidate inputs with autoFilled data
            const consolidatedData = {
                propertyType: autoFilled.propertyType || propertyType,
                propertyLocation: autoFilled.propertyLocation || propertyLocation,
                propertyRequirmentType: autoFilled.propertyRequirmentType || propertyRequirmentType,
                propertyCategory,
                receivedClientName: autoFilled.receivedClientName || receivedClientName,
                receivedEmployeeName: autoFilled.receivedEmployeeName || receivedEmployeeName,
                propertyNo,
                price:autoFilled.price || price,
                receiverEmployeeId: autoFilled.receiverEmployeeId || receiverEmployeeId,
                buyerClientName,
                buyerClientPhoneNumber,
                buyerPropertyAmount: propertyAmount, 
                note,
                buyerEmployeeName,
                buyerEmployeeId,
                commissionPercOfBuyerEmployeed,
                commissionPercOfReceivedEmployeed
            };
    
            // Validation
            const missingFields = Object.entries(consolidatedData)
                .filter(([key, value]) => !value)
                .map(([key]) => key);
    
            // if (missingFields.length > 0) {
            //     alert(`Please fill in the following inputs: ${missingFields.join(', ')}`);
            //     return;
            // }
    
            // Proceed with API call
            await AddSell(consolidatedData);
            // alert('Property added successfully!');
            console.log('consolidatedData',consolidatedData)
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }
    
    return (
        <div>
         {role === "Sale's Executive" || role === 'Agent' ? (
        <EmployeeAndAgentHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
      <Box>
        <Typography sx={{ mt: '8%', ml:'42%',color:'#1982C4',fontWeight:'bold'}}  variant="h3">
            Sell Out Property
        </Typography>
        <Box sx={{ ml: "30%", mt: 5, width: '70%' }}>
        <Card sx={{ maxWidth: 800, boxShadow: 20, backgroundColor: 'beige', borderRadius: '8px' }}>
          <CardContent>
            <Typography sx={{color:'#1982C4'}} id="expense-modal-title" variant="h6" component="h2">
                seller Information
            </Typography>
            <Box mt={2}>
           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                     <Box sx={{ width: '48%' }}>
                        <Select
                                sx={{
                                    height: '35px',
                                    '&:hover': { borderColor: '#011936' },
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                                    fontFamily: 'Arial, sans-serif',
                                    fontSize: '14px',
                                  }}
                            value={propertyCategory}
                            onChange={requireSelectChange}
                            displayEmpty
                            input={<OutlinedInput fullWidth placeholder="Select category Type" />}
                        >
                            <MenuItem value="" disabled>
                                <em>Select category Type</em>
                            </MenuItem>
                            {category.map((req) => (
                                <MenuItem key={req} value={req}>
                                    {req}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                <Box sx={{ width: '48%' }}>
                    <OutlinedInput
                            value={propertyNo}
                            onChange={(e) => setPropertyNo(e.target.value)}
                            placeholder="Enter property Number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        <OutlinedInput
                            value={autoFilled.receivedClientName || receivedClientName}
                            onChange={(e) => setReceivedClientName(e.target.value)}
                            placeholder="Enter Client Name"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        <OutlinedInput
                            value={autoFilled.receivedEmployeeName || receivedEmployeeName}
                            onChange={(e) => setReceivedEmployeeName(e.target.value)}
                            placeholder="Enter Employee Name"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        <OutlinedInput
                            value={autoFilled.propertyType || propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            placeholder="Enter property Type"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        <OutlinedInput
                            value={autoFilled.propertyLocation || propertyLocation}
                            onChange={(e) => setPropertyLocation(e.target.value)}
                            placeholder="Enter property Location"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        <OutlinedInput
                            value={autoFilled.propertyRequirmentType || propertyRequirmentType}
                            onChange={(e) => setPropertyRequirmentType(e.target.value)}
                            placeholder="Enter property Requirment Type"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        <OutlinedInput
                           
                            value={autoFilled.price || price}
                            onChange={(e) => setPrice(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            placeholder='enter price'
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
                <OutlinedInput
                           
                           value={autoFilled.receiverEmployeeId || receiverEmployeeId}
                           onChange={(e) => setReceiverEmployeeId(e.target.value)}
                           fullWidth
                           placeholder="Enter Employee Id"
                           margin="normal"
                           variant="outlined"
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
                <OutlinedInput
                           
                           value={commissionPercOfReceivedEmployeed}
                           onChange={(e) => setCommissionPercOfReceivedEmployeed(e.target.value)}
                           fullWidth
                           placeholder="Enter commission percent of received Employee"
                           margin="normal"
                           variant="outlined"
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
            </Box>
            <br />
            <Typography sx={{color:'#1982C4'}} id="expense-modal-title" variant="h6" component="h2">
             Buyer Information
            </Typography>
            <Box mt={2}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Box sx={{ width: '48%' }}>
                    <OutlinedInput
                            value={buyerClientName}
                            onChange={(e) => setBuyerClientName(e.target.value)}
                            placeholder="Enter Buyer Client Name"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        <OutlinedInput
                            value={buyerClientPhoneNumber}
                            onChange={(e) => setBuyerClientPhoneNumber(e.target.value)}
                            placeholder="Enter Buyer Client Phone Number"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        <OutlinedInput
                            value={propertyAmount}
                            onChange={(e) => setPropertyAmount(e.target.value)}
                            placeholder="Enter property Amount"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        <OutlinedInput
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Enter Note"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        <OutlinedInput
                            value={buyerEmployeeName}
                            onChange={(e) => setBuyerEmployeeName(e.target.value)}
                            placeholder="Enter Buyer Employee Name"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        <OutlinedInput
                            value={buyerEmployeeId}
                            onChange={(e) => setBuyerEmployeeId(e.target.value)}
                            placeholder="Enter Buyer Employee ID"
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                <OutlinedInput
                           
                           value={commissionPercOfBuyerEmployeed}
                           onChange={(e) => setCommissionPercOfBuyerEmployeed(e.target.value)}
                           fullWidth
                           placeholder="Enter commission percent of Buyer Employee"
                           margin="normal"
                           variant="outlined"
                           sx={{
                            height: '35px',
                            '&:hover': { borderColor: '#011936' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '14px',
                            mt:4
                          }}
                       />
            </Box>
            <Button onClick={addSell} 
                          sx={{
                            mt: 4,
                            width: '100%',
                            color: 'white',
                            backgroundColor: '#011936',
                            '&:hover': {
                              backgroundColor: '#002b4e',
                            },
                          }}
            variant="contained">
                Add
            </Button>


            </CardContent>
        </Card>
      </Box>
        </Box>
    </div>
    );
};

export default AddSellProperty;

// import React, { useState, useEffect } from 'react';
// import { Select, MenuItem, OutlinedInput, TextField } from '@mui/material';

// const AddSellProperty = () => {
//     const [propertyCategory, setPropertyCategory] = useState('');
//     const [propertyNo, setPropertyNo] = useState('');
//     const [projectData, setProjectData] = useState(null); // Store fetched data here

//     const category = ['Requirement', 'Developer Avability', 'Office Avability', 'Project'];
//     const token = localStorage.getItem('token');

//     const handleCategoryChange = (event) => {
//         setPropertyCategory(event.target.value);
//     };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const url = new URL('http://localhost:3001/addsSellPropert/getProjectDetails');
    //             url.searchParams.append('propertyCategory', propertyCategory);
    //             url.searchParams.append('propertyNo', propertyNo);

    //             const response = await fetch(url.toString(), {
    //                 method: 'GET',
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });

    //             const data = await response.json();
    //             if (response.ok) {
    //                 console.log('Fetched Project Data:', data);
    //                 setProjectData(data.data); // Store fetched project data
    //             } else {
    //                 console.error('Error fetching project data:', data.message);
    //             }
    //         } catch (error) {
    //             console.error('Fetch error:', error.message);
    //         }
    //     };

    //     if (propertyNo && propertyCategory) {
    //         fetchData();
    //     }
    // }, [propertyNo, propertyCategory]);

//     return (
//         <div>
//             <Select
//                 sx={{ mt: 2 }}
//                 value={propertyCategory}
//                 onChange={handleCategoryChange}
//                 displayEmpty
//                 input={<OutlinedInput fullWidth placeholder="Select Category Type" />}
//             >
//                 <MenuItem value="" disabled>
//                     <em>Select Category Type</em>
//                 </MenuItem>
//                 {category.map((req) => (
//                     <MenuItem key={req} value={req}>
//                         {req}
//                     </MenuItem>
//                 ))}
//             </Select>

//             <TextField
//                 value={propertyNo}
//                 onChange={(e) => setPropertyNo(e.target.value)}
//                 label="Enter Property Number"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//             />

//             {projectData && (
//                 <div>
//                     <h3>Project Details:</h3>
//                     <pre>{JSON.stringify(projectData, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddSellProperty;
