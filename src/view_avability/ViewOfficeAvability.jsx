import React,{useState,useEffect} from 'react'
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box,OutlinedInput,MenuItem,Select,Button} from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';

const ViewOfficeAvability = () => {
    const navigate = useNavigate()
     const [propertyRequirment, setPropertyRequirment] = useState('');
      const [dateFilter, setDateFilter] = useState('');
      const [propertyName, setPropertyName] = useState('');
      const [propertyType, setPropertyType] = useState('');
      const [filteredData, setFilteredData] = useState([]); // For filtered rows
    const [viewAvability, setViewAvability] = useState([]);
     const [role, setRole] = useState('');
     
                 useEffect(() => {
                   // Decode role from user in localStorage
                   const user = JSON.parse(localStorage.getItem('user'));
                   if (user && user.role) {
                     setRole(user.role);
                   }
                 }, []);
                                        

    useEffect(() => {
        getOfficeAvability();
      }, []);
        useEffect(() => {
          applyFilters();
        }, [propertyRequirment, dateFilter, propertyName, propertyType]);
      
      async function getOfficeAvability() {
        try {
          const res = await fetch('http://localhost:3001/officeAvability/');
          const data = await res.json();
          setViewAvability(data.data);
          setFilteredData(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      
      console.log(viewAvability);
      const applyFilters = () => {
        let filtered = [...viewAvability];
    
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
          const response = await fetch(`http://localhost:3001/officeAvability/${id}`, {
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
       <Box sx={{ display: 'flex', ml: { xs: 0, md: '20%' }, mt: { md: 12, xs: 10 }, width: '70%' }}>
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
             sx={{ ml: 1,
              borderColor: '#011936',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
             }}
             fullWidth
             type="string"
             value={propertyType}
             onChange={(e) => setPropertyType(e.target.value)}
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
  <Button
         sx={{
          ml: 4,
          backgroundColor: '#011936',
          color: 'white',
          '&:hover': { backgroundColor: '#014F86' },
          borderRadius: '8px',
        }}
    fullWidth
                          variant="contained"
                        color="primary"
                      onClick={() => navigate('/OfficeAvability')}
                      >
                        Add
                      </Button>

        </Box>
        <Box sx={{ ml: { xs: 0, md: '20%' }, mt: { md: 3, xs: 10 } }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850, border: '1px solid #d3d3d3', borderRadius: '8px' }} aria-label="simple table">
            <TableHead sx={{ background: '#011936', color: 'white' }}>
            <TableRow>
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>Client Name</TableCell>
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>Location</TableCell>
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>project Type</TableCell>
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>project Requirment</TableCell>
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>avaibility No</TableCell>
                  <TableCell sx={{fontWeight:'bold', color: 'white'}}>Advance Rent</TableCell>
                  <TableCell sx={{fontWeight:'bold', color: 'white'}}>Monthly Rent</TableCell>
                <TableCell sx={{fontWeight:'bold', color: 'white'}}>Sell Price</TableCell>
                <TableCell sx={{fontWeight:'bold', color: 'white'}}>Date</TableCell>
                <TableCell sx={{fontWeight:'bold', color: 'white'}}>Action</TableCell>
                <TableCell sx={{fontWeight:'bold', color: 'white'}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row._id}> {/* Change to a unique key */}
                <TableCell>{row.clientName}</TableCell>
                <TableCell>{row.Location}</TableCell>
                <TableCell>{row.ProjectType}</TableCell>
                <TableCell>{row.requirmentType}</TableCell>
                <TableCell>0{row.officeAvaibiltyNumber}</TableCell>
                    <TableCell>{row.projectAdvanceRent?row.projectAdvanceRent:'no Advance'}</TableCell>
                    <TableCell>{row.projectMonthlyRent?row.projectMonthlyRent:'no Monthly Payment'}</TableCell>
              
                  <TableCell>{row.projectPrice?row.projectPrice:'not price included'}
                    </TableCell>
                    <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Box sx={{display:'flex',gap: 2}}>
                      <RemoveRedEyeOutlinedIcon 
                      onClick={() => navigate('/ViewOfficeAvabilityDescription/' + row._id)}
                      sx={{
                        background: '#E4F3F6',
                        color: '#4AB6D0',
                        padding: '4px',
                        cursor: 'pointer',
                        fontSize: '20px',
                        borderRadius: '5px',
                      }} />
                      <RestoreFromTrashOutlinedIcon 
                      onClick={() => handleDelete(row._id)}
                      sx={{
                        background: '#FFE9E9',
                        color: '#FF897C',
                        padding: '4px',
                        cursor: 'pointer',
                        fontSize: '20px',
                        borderRadius: '5px',
                      }} />
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

export default ViewOfficeAvability
