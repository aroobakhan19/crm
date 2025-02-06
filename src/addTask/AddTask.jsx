import React,{useState} from 'react'
import { Typography,Card,CardContent,Button,TextField,CardActions,Box,OutlinedInput,Select,MenuItem } from '@mui/material'
import { Addtask } from '../config/db'
const AddTask = () => {
    const [taskTitle,setTaskTitle] = useState('')
    const [taskDescription,setTaskDescription] = useState('')
    const [taskPriority,setTaskPriority] = useState('')
    const [taskDueDate,setTaskDueDate] = useState('')
    const [taskAssignedTo,setTaskAssignedTo] = useState('')
    const [taskPersonId,setTaskPersonId] = useState('')


    async function addTask(){
        try {
            if (!taskTitle || !taskDescription || !taskPriority || !taskDueDate || !taskAssignedTo || !taskPersonId ) {
              alert('Please fill in all the inputs!');
              return;
            }
            // If all fields are filled, log the data
            const addtask = {
              taskTitle,
              taskDescription,
              taskPriority,
              taskDueDate,
              taskAssignedTo,
              taskPersonId,
            };
      
            await Addtask(addtask)
          } catch (e) {
            alert(e.message);
          }
        }
      
  return (
    <div>
         <Typography sx={{ml:{xs:0,md:'45%'},mt:{md:12,xs:10},color:'#1982C4',fontWeight:'bold'}} variant='h3'>Add Task</Typography>
         <Box sx={{ ml: '30%', mt: 5, width: '70%' }}>
        <Card sx={{ maxWidth: 800, boxShadow: 20, backgroundColor: 'beige', borderRadius: '8px' }}>
          <CardContent>
            <Typography
              sx={{
                fontWeight: 'bold',
                color: '#1982C4',
                fontFamily: 'Arial, sans-serif',
                fontSize: '20px',
              }}
              variant='h6'
            >
        Assigned Task
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Box sx={{ width: '48%' }}>
                <Typography sx={{ fontWeight: 'bold', color: '#011936', fontFamily: 'Arial, sans-serif' }} variant="body1">
                  Task Name
                </Typography>
        <OutlinedInput placeholder="Please enter text" 
        fullWidth
        type='string'
        onChange={(e) => setTaskTitle(e.target.value)}
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
                  Task Assigned To Id
                </Typography>
        <OutlinedInput placeholder="Please enter Person Id" 
        onChange={(e) => setTaskPersonId(e.target.value)}
        fullWidth
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
                <Typography sx={{ fontWeight: 'bold', color: '#011936', fontFamily: 'Arial, sans-serif' }} variant="body1">
       Task Deadline
        </Typography>
        <OutlinedInput
        type='date'
        placeholder="Please enter Street Address" 
        onChange={(e) => setTaskDueDate(e.target.value)}
        fullWidth
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
       Task Assigned  To
        </Typography>
        <OutlinedInput placeholder="Please enter person name" 
        onChange={(e) => setTaskAssignedTo(e.target.value)}
        fullWidth
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
       Task Priority
        </Typography>
        <OutlinedInput placeholder="Please enter person name" 
        onChange={(e) => setTaskPriority(e.target.value)}
        fullWidth
        sx={{
          height: '35px',
          '&:hover': { borderColor: '#011936' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
        }}
        />
        </Box>

        <Box sx={{ mt: 4 }}>
        <Typography sx={{ fontWeight: 'bold', color: '#011936', fontFamily: 'Arial, sans-serif' }} variant="body1">
       Task Description
        </Typography>
          <TextField
          id="filled-textarea"
          placeholder="Enter Message here"
          multiline
          rows={4}
          fullWidth
          variant="filled"
          type='string'
          onChange={(e) => setTaskDescription(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': { borderColor: '#d3d3d3' },
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
          }}
        />
        </Box>
        <Button 
        onClick={addTask}
        sx={{
          mt: 4,
          width: '100%',
          color: 'white',
          backgroundColor: '#011936',
          '&:hover': {
            backgroundColor: '#002b4e',
          },
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

export default AddTask
