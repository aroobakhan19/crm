import React,{useState,useEffect,Paper} from 'react'
import { Typography,Table,TableHead,TableBody,TableCell,TableContainer,TableRow, Box,OutlinedInput,MenuItem,Select,Button} from '@mui/material'
import Header from './components/Header'
import EmployeeAndAgentHeader from './components/EmployeeAndAgentHeader';

const ViewSellItem = () => {
       const [propertyRequirment, setPropertyRequirment] = useState('');
        const [dateFilter, setDateFilter] = useState('');
        const [propertyType, setPropertyType] = useState('');
        const [propertyCategory, setPropertyCategory] = useState('');
        const [filteredData, setFilteredData] = useState([]); // For filtered rows
  const [data,setData] = useState([])
      const [role, setRole] = useState('');
           
                       useEffect(() => {
                         // Decode role from user in localStorage
                         const user = JSON.parse(localStorage.getItem('user'));
                         if (user && user.role) {
                           setRole(user.role);
                         }
                       }, []);
           


      useEffect(() => {
        getData();
        }, []);
          useEffect(() => {
            applyFilters();
          }, [propertyRequirment, dateFilter, propertyCategory, propertyType]);

  const getData = async () => {
    try {
      const res = await fetch('https://crm-backend-plum.vercel.app/addsSellPropert/');
      const data = await res.json();
      setData(data.data);
      setFilteredData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  console.log(data);

  const applyFilters = () => {
    let filtered = [...data];

    // Filter by Property Name
    if (propertyType) {
      filtered = filtered.filter((row) =>
        row.propertyType.toLowerCase().includes(propertyType.toLowerCase())
      );
    }

    // Filter by Property Type
    if (propertyCategory) {
      filtered = filtered.filter((row) =>
        row.propertyCategory.toLowerCase().includes(propertyCategory.toLowerCase())
      );
    }

    // Filter by Property Requirement
    if (propertyRequirment) {
      filtered = filtered.filter(
        (row) => row.propertyRequirmentType.toLowerCase() === propertyRequirment.toLowerCase()
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
      <Box sx={{ display: 'flex', ml: { xs: 0, md: '20%' }, mt: { md: 12, xs: 10 }, width: '70%' }}>
   <OutlinedInput
             placeholder="Enter property Type"
             fullWidth
             type="string"
             value={propertyType}
             onChange={(e) => setPropertyType(e.target.value)}
             sx={{
              borderColor: '#011936',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}
           />
           <OutlinedInput
             placeholder="Enter property Category"
             sx={{ ml: 1,
              borderColor: '#011936',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
             }}
             fullWidth
             type="string"
             value={propertyCategory}
             onChange={(e) => setPropertyCategory(e.target.value)}
           />
           <Select
                     sx={{ ml: 1,
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
                             sx={{ ml: 1,
                              borderColor: '#011936',
                              borderRadius: '8px',
                              backgroundColor: '#f9f9f9',
                             }}
                             fullWidth
                             value={dateFilter}
                             onChange={(e) => setDateFilter(e.target.value)}
                           />
                           </Box>

        <Box sx={{ ml: { xs: 0, md: '25%' }, mt: { md: 3, xs: 10 } }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850, border: '1px solid #d3d3d3', borderRadius: '8px' }} aria-label="simple table">
            <TableHead sx={{ background: '#011936', color: 'white' }}>
              <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>Receiver Employee Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>Buyer Employee Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%' , color: 'white',}}>Property Requirment</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>Property Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>Property Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <>
                  <TableRow key={index}>
                  <TableCell align="center">{row.receivedEmployeeName}</TableCell>
                    <TableCell align="center">{row.buyerEmployeeName}</TableCell>
                    <TableCell align="center">{row.propertyRequirmentType} </TableCell>
                    <TableCell align="center">{row.propertyLocation}</TableCell>
                    <TableCell align="center">{row.buyerPropertyAmount}</TableCell>
                    <TableCell align="center">{row.propertyCategory}</TableCell>
                    <TableCell align="center">{row.propertyType}</TableCell>
                    <TableCell align="center">{row.propertyNo}</TableCell>
                     <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                </>
              ))}
              {/* <TableRow>
                <TableCell colSpan={6} sx={{ fontWeight: 'bold', textAlign: 'right' }}>Total Price of All Projects:</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{totalPrice}</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      {/* )
      } */}

</Box>
    </div>
  )
}

export default ViewSellItem

