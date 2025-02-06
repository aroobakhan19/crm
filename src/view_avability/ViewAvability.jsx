import React,{useState,useEffect} from 'react'
import { Typography,Card,CardContent,Container} from '@mui/material'
import { Link } from 'react-router-dom'
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader'
import Header from '../components/Header'
const ViewAvability = () => {
      const [role, setRole] = useState('');

          useEffect(() => {
            // Decode role from user in localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.role) {
              setRole(user.role);
            }
          }, []);
  return (
    <div>
      {role === "Sale's Executive" || role === 'Agent' ? (
        <EmployeeAndAgentHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
   <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Column on mobile, row on larger screens
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          mt: { sm: 20 },
        }}
      >
        
        <Link to="/ViewDeveloperAvability" style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              margin: 3,
              borderRadius: '12px',
              width: 300,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#011936', // Dark blue color
              color: 'white',
              boxShadow: 6,
              transition: 'all 0.3s ease', // Smooth transition for hover effect
              '&:hover': {
                backgroundColor: '#004d73', // Slightly lighter blue on hover
                transform: 'translateY(-5px)', // Subtle lift effect
                cursor: 'pointer',
              },
              mb: 3,
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ textAlign: 'center' }} component="div" variant="h5">
            View Developer Avability
          </Typography>
          </CardContent>
      </Card>
      </Link>
     
      <Link to="/ViewOfficeAvability" style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              borderRadius: '12px',
              width: 300,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#011936', // Dark blue color
              color: 'white',
              boxShadow: 6,
              transition: 'all 0.3s ease', // Smooth transition for hover effect
              '&:hover': {
                backgroundColor: '#004d73', // Slightly lighter blue on hover
                transform: 'translateY(-5px)', // Subtle lift effect
                cursor: 'pointer',
              },
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography component="div" variant="h5" sx={{ textAlign: 'center' }}>
              View Office Avability
          </Typography>
          </CardContent>
         
      </Card>
      </Link>

      </Container>
    </div>
  )
}

export default ViewAvability
