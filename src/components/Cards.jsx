import React, { useState,useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, Container,Box} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const navigate = useNavigate();
  const [project,setProject] = useState()
  const [employeeName, setEmployeeName] = useState("");
  const [task, setTask] = useState(0);
  const [requirements, setRequirements] = useState(0);
  const [avability, setAvability] = useState(0);


  const token = localStorage.getItem('tokens');
  
  useEffect(() => {
    if (token) {
        fetchUserName();
        // getUsers();
        getTask();
        getRequirment();
        getAvaibilty();
        getProjects();
    }
}, []);

//  async function getUsers(){
//   try {
//     const response = await fetch('http://localhost:3001/users', {
//       method: 'GET',
//       headers: {
//           'Authorization': `Bearer ${token}`,
//       },
//   });

//     const data = await response.json();
//     if (response.ok) {
//       setUserData(data.data);
    
//   }
     
//     } catch (error) {
//       console.error('Error fetching data:');
//     }
// }

async function getProjects(){
  try {
    const response = await fetch('https://crm-backend-plum.vercel.app/project', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  });

    const data = await response.json();
    if (response.ok) {
      setProject(data.data);
    
  }
     
    } catch (error) {
      console.error('Error fetching data:');
    }
}

async function getTask(){
  try {
    const response = await fetch('https://crm-backend-plum.vercel.app/task', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  });

    const data = await response.json();
    if (response.ok) {
      setTask(data.data);
    
  }
     
    } catch (error) {
      console.error('Error fetching data:');
    }
}

async function getRequirment(){
  try {
    const response = await fetch('https://crm-backend-plum.vercel.app/requirment', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  });

    const data = await response.json();
    if (response.ok) {
      setRequirements(data.data);
    
  }
     
    } catch (error) {
      console.error('Error fetching data:');
    }
}

async function getAvaibilty(){
  try {
    const response = await fetch('https://crm-backend-plum.vercel.app/officeAvability', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  });

    const data = await response.json();
    if (response.ok) {
      setAvability(data.data);
    
  }
     
    } catch (error) {
      console.error('Error fetching data:');
    }
}

// console.log('userdata ==>',userData)




const fetchUserName = async () => {
  const response = await fetch('https://crm-backend-plum.vercel.app/users/getUserByToken', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
  const data = await response.json();
  if (response.ok) {
      setEmployeeName(data.name);
  } else {
      console.log('Error fetching user name:', data.message);
  }
};

console.log('user Name ==>',employeeName)


  return (
    <>
<Box sx={{background:"linear-gradient(#1982C4, #0B3948)", mt:"4%", ml:'17%', height:{xs:0, md:280}}}>
          <Typography variant='h4' sx={{ml:5,pt:5,color:'white'}}>
            Welcome  {    employeeName}
          </Typography>
 

    <Box sx={{display:'flex',
    flexDirection: {xs:'column',md:'row'},
    justifyContent: {xs:'center',md:'normal'},
    mt:{xs:0,md:10},
    mb:{xs:0,md:5}
    }}>
      <Card 
      onClick={() => navigate('/ViewUser')}
      sx={{ 
        // borderRadius: '12px', boxShadow: 3, 
        width: { xs: '100%', md: '23%' }, // Full width on mobile, 23% on larger screens
        height: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: { xs: 2, md: 0 }, // Margin top on mobile
        ml:{xs:0,md:2}
      }}>
        <Avatar sx={{ backgroundColor: '#1982C4', width: 56, height: 56, marginRight: '60px' }}>
          <LocalShippingIcon sx={{ color: 'white', fontSize: 30 }} />
        </Avatar>
        <CardContent sx={{ color: 'black' }}>
          <Typography component="div" variant="h4">
            {project?.length}
          </Typography>
          <Typography component="div">
            Projects
          </Typography>
        </CardContent>
      </Card>

      <Card 
       onClick={() => navigate('/ViewTask')}
      sx={{ 
        // borderRadius: '12px', boxShadow: 3, 
        width: { xs: '100%', md: '23%' }, 
        height: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: { xs: 2, md: 0 },
        ml:{xs:0,md:2}
      }}>
        <Avatar sx={{ backgroundColor: '#1982C4', width: 56, height: 56, marginRight: '60px' }}>
          <LocalShippingIcon sx={{ color: 'white', fontSize: 30 }} />
        </Avatar>
        <CardContent sx={{ color: 'black' }}>
          <Typography component="div" variant="h4">
            {task?task.length : 0}
          </Typography>
          <Typography component="div">
            Task
          </Typography>
        </CardContent>
      </Card>

      <Card
            onClick={() => navigate('/ViewRequirment')}
       sx={{ 
        width: { xs: '100%', md: '23%' }, 
        height: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: { xs: 2, md: 0 },
        ml:{xs:0,md:2}
      }}>
        <Avatar sx={{ backgroundColor: '#1982C4', width: 56, height: 56, marginRight: '20px' }}>
          <LocalShippingIcon sx={{ color: 'white', fontSize: 30 }} />
        </Avatar>
        <CardContent sx={{ color: 'black' }}>
          <Typography component="div" variant="h4">
            {requirements?requirements.length : 0}
          </Typography>
          <Typography component="div">
            Requirements
          </Typography>
        </CardContent>
      </Card>

      <Card
      onClick={() => navigate('/ViewOfficeAvability')} 
      sx={{ 
        // borderRadius: '12px', boxShadow: 3, 
        width: { xs: '100%', md: '23%' }, 
        height: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: { xs: 2, md: 0 },
        ml:{xs:0,md:2}
      }}>
        <Avatar sx={{ backgroundColor: '#1982C4', width: 56, height: 56, marginRight: '20px' }}>
          <LocalShippingIcon sx={{ color: 'white', fontSize: 30 }} />
        </Avatar>
        <CardContent sx={{ color: 'black' }}>
          <Typography component="div" variant="h4">
            {avability?avability.length : 0}
          </Typography>
          <Typography component="div">
            Availability
          </Typography>
        </CardContent>
      </Card>
      
      
      </Box>

    </Box>
    </>
  );
};

export default Cards;
