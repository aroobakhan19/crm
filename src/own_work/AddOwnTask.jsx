import React,{useState,useEffect} from 'react'
import {Typography,Box,TextField,Button} from '@mui/material'
// import Header from '../components/Header'
// import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader';
import ViewOwnTask from './ViewOwnTask'
import { AddOwntask } from '../config/db'

const AddOwnTask = () => {
    const [inputValue,setInputValue] = useState()
    const [list,setList] = useState([])
    // const [role, setRole] = useState('');
              
    //             useEffect(() => {
    //               // Decode role from user in localStorage
    //               const user = JSON.parse(localStorage.getItem('user'));
    //               if (user && user.role) {
    //                 setRole(user.role);
    //               }
    //             }, []);

    const addTodo = async () => {
      try {
      const addtask = {
        inputValue
      }
      
              await AddOwntask(addtask)
      // const copylist = [...list]
      // copylist.push(inputValue)
      // setList(copylist)
      setInputValue('')
      } catch (e) {
        alert(e.message);
      }
    }
    console.log(list)
  
  
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
    {/* {role === "Sale's Executive" || role === 'Agent' ? (
        <EmployeeAndAgentHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null} */}
<Typography variant='h4' sx={{          marginLeft: '30%',
          color: '#011936', // Dark blue for header
          marginTop: '7%',
          fontWeight: 'bold',}}>
  Add your today work by todo list</Typography> 
      
      <Box sx={{mt:5,ml:'30%'}}>
      <TextField
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{width: "50%" }}
            label="Enter today work "
            variant="outlined"
          /> 
          <Button  
          onClick={addTodo}
          sx={{height:55,width:'25%',ml:2,
            color: '#ffffff', // White text
            backgroundColor: '#011936', // Custom color
            fontWeight: 'bold',
            borderRadius: '8px', // Rounded button corners
            textTransform: 'none', // Keep button text normal
            '&:hover': {
              backgroundColor: '#011936', // Yellow on hover
            },
          }} 
          variant='contained' >ADD List</Button>
          {/* <ul>
          {list.map (function(item) {
            return <li>
            {item}
            </li>
          })}
          </ul> */}
          <ViewOwnTask />
      </Box>
    </div>
  )
}

export default AddOwnTask
