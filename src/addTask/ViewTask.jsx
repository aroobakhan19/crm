import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box,OutlinedInput,MenuItem,Select, Button,} from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader'
import Header from '../components/Header'

const ViewTask = () => {
    const navigate = useNavigate()
    const [task,setTask] = useState([])
    const [complete,setComplete] = useState()
    // const [taskAdmin,setTaskAdmin] = useState()
    const token = localStorage.getItem('token');
    const [role, setRole] = useState('');
         
                     useEffect(() => {
                       // Decode role from user in localStorage
                       const user = JSON.parse(localStorage.getItem('user'));
                       if (user && user.role) {
                         setRole(user.role);
                       }
                     }, []);
         

    useEffect(() =>{
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role === 'Admin') {
        getTaskForAdmin()
      } else {
        getTask()
      }        
    },[])
    
     async function getTask(){
      try {
        const response = await fetch(`https://crm-backend-plum.vercel.app/task/view`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         
        },
    });
    if (!response.ok) {
        const errorDetails = await response.text(); // Get error details
        throw new Error(`Failed to fetch booking history: ${errorDetails}`);
    }

    const data = await response.json();
    console.log("Fetched Booking History:", data); // Log fetched data
    setTask(data.data || []);

         
        } catch (error) {
          console.error('Error fetching data:');
        }
    }
    console.log(task)


    async function completed (_id) {
      try {
        const response = await fetch(`https://crm-backend-plum.vercel.app/task/updateStatus/${_id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         
        },
    });
    if (!response.ok) {
        const errorDetails = await response.text(); // Get error details
        throw new Error(`Failed to fetch booking history: ${errorDetails}`);
    }

    const data = await response.json();
    console.log("Fetched Booking History:", data); // Log fetched data
    getTask();
        } catch (error) {
          console.error('Error fetching data:');
        }
    }
    // console.log(task)

    async function getTaskForAdmin(){
      try {
        const response = await fetch(`https://crm-backend-plum.vercel.app/task`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         
        },
    });
    if (!response.ok) {
        const errorDetails = await response.text(); // Get error details
        throw new Error(`Failed to fetch booking history: ${errorDetails}`);
    }

    const data = await response.json();
    console.log("Fetched Booking History:", data); // Log fetched data
    setTask(data.data || []);

         
        } catch (error) {
          console.error('Error fetching data:');
        }
    }

  return (
    <div>
                    {role === "Sale's Executive" || role === 'Agent' ? (
        <EmployeeAndAgentHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
             <Box sx={{ ml: { xs: 0, md: '25%' }, mt: { md: 15, xs: 10 } }}>
             <TableContainer>
          <Table sx={{ maxWidth: 850, border: '1px solid #d3d3d3', borderRadius: '8px' }} aria-label="simple table">
            <TableHead sx={{ background: '#011936', color: 'white' }}>
            <TableRow>
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>Task Name</TableCell>
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>Assigned By</TableCell>
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>Task Priority</TableCell>
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>task Dead Line</TableCell>
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>task Description</TableCell>
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>task status</TableCell>
              {role === 'Admin'? null :
              <TableCell sx={{fontWeight:'bold', color: 'white'}}>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {task.map((row) => (
              <TableRow key={row._id}> {/* Change to a unique key */}
                <TableCell>{row.taskName}</TableCell>
                <TableCell>{row.AssignedBy}</TableCell>
                <TableCell>{row.taskPriority}</TableCell>
                <TableCell>{row.taskDeadLine}</TableCell>
                <TableCell>{row.taskDescription}</TableCell>
                <TableCell>{row.status}</TableCell>
                {role === 'Admin'? null :
                <TableCell>
                <Button  
                                     sx={{
                                      mt: 4,
                                      color: 'white',
                                      backgroundColor: '#011936',
                                      '&:hover': {
                                        backgroundColor: '#002b4e',
                                      },
                                    }}
                variant="contained" onClick={() => completed(row._id)}>
                  Completed
                </Button>
                </TableCell>}

                   {/* <TableCell>
                      <Box sx={{display:'flex'}}>
                      <RemoveRedEyeOutlinedIcon 
                      onClick={() => navigate('/ViewDescriptionPage/' + row._id)}
                      sx={{background:'#E4F3F6',border:'none',color:'#4AB6D0',padding:"2px 4px",cursor:'pointer',fontSize:'18px'}} />
                      <RestoreFromTrashOutlinedIcon sx={{ml:2,background:'#FFE9E9',border:'none',color:'#FF897C',padding:"2px 4px",cursor:'pointer',fontSize:'18px'}} />
                      </Box>
                    </TableCell> */}
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    </div>
  )
}

export default ViewTask
