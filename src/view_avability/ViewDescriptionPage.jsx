import React,{useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import CottageIcon from '@mui/icons-material/Cottage';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import {Box} from '@mui/material'

const ViewDescriptionPage = () => {
    const { id } = useParams()
    const [viewAvability, setViewAvability] = useState([]);

    useEffect(() => {
        getDeveloperAvabilityDescription();
    },[]);
    
    async function getDeveloperAvabilityDescription() {
      try {
        const res = await fetch(`https://crm-backend-plum.vercel.app/developerAvability/${id}`);
        const data = await res.json();
        setViewAvability(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    console.log(viewAvability);
  return (
    <div>
        <Box sx={{ml:{xs:0,md:'20%'},mt:{md:12,xs:10},display:'flex',gap:4,width:'80%'}}>
       <Card sx={{ width:'70%' }}>
        <CardMedia
          component="img"
          height="340"
          image="https://media.gettyimages.com/id/147205632/photo/modern-home-with-swimming-pool.jpg?s=612x612&w=gi&k=20&c=KziR75bRl6md69oB-cEvNv_0ak-I-f6kmkUpKVQBH-E="
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {viewAvability.propertyName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {viewAvability.propertyDescription}
          </Typography>
          <Typography variant='h6'  sx={{ color: 'text.secondary' }}>Message:
          {viewAvability.Message}
          </Typography>
          <Typography variant='h6' sx={{mt:3,fontWeight:'bold'}}>
            Property Overview
          </Typography>
          <Box sx={{display:'flex',mt:1,flexWrap:'wrap'}}>          
            <Box
      sx={{
        border: '2px dashed #d3d3d3',
        borderRadius: '8px',
        width: '45%',
        // maxWidth: 300,
        height: 60,
        backgroundColor: '#fafafa',
        display:'flex'
      }}
    >
      <LocalAtmIcon sx={{background:'#E4F3F6',border:'none',color:'#4AB6D0',padding:"6px 14px",cursor:'pointer',fontSize:'22px',mt:1.5,ml:3}} />
      {viewAvability.projectRequirment === 'Rent' ?
      <Typography variant="body1" sx={{mt:0.5,ml:2,fontSize:18}}>
        {viewAvability.projectAdvanceRent}(Advance) <br />
        {viewAvability.projectMonthlyRent}(Monthly)
       </Typography>:
      <Typography variant="body1" sx={{mt:1.5,ml:2,fontSize:20}}>
      {viewAvability.projectPrice}
     </Typography> 
}
      </Box>
      <Box
      sx={{
        border: '2px dashed #d3d3d3',
        borderRadius: '8px',
        width: '40%',
        // maxWidth: 300,
        height: 60,
        backgroundColor: '#fafafa',
        display:'flex',
        ml:3
      }}
    >
      <AirlineSeatIndividualSuiteIcon sx={{background:'#FFE9E9',border:'none',color:'#FF897C',padding:"6px 14px",cursor:'pointer',fontSize:'22px',mt:1.5,ml:3}} />
      <Typography variant="body1" sx={{mt:1.5,ml:2,fontSize:20}}>
      {viewAvability.rooms} Rooms
      </Typography>
        </Box>
        <Box
      sx={{
        border: '2px dashed #d3d3d3',
        borderRadius: '8px',
        width: '45%',
        // maxWidth: 300,
        height: 60,
        backgroundColor: '#fafafa',
        display:'flex',
        mt:2
      }}
    >
      <CottageIcon sx={{background:'#E4F3F6',border:'none',color:'#4AB6D0',padding:"6px 14px",cursor:'pointer',fontSize:'22px',mt:1.5,ml:3}} />
      <Typography variant="body1" sx={{mt:1.5,ml:2,fontSize:20}}>
      {viewAvability.ProjectType}
      </Typography>
        </Box>
        <Box
      sx={{
        border: '2px dashed #d3d3d3',
        borderRadius: '8px',
        width: '40%',
        // maxWidth: 300,
        height: 60,
        backgroundColor: '#fafafa',
        display:'flex',
        ml:3,
        mt:2
      }}
    >
      <AddRoadIcon sx={{background:'#FFE9E9',border:'none',color:'#FF897C',padding:"6px 14px",cursor:'pointer',fontSize:'22px',mt:1.5,ml:3}} />
      <Typography variant="body1" sx={{mt:1.5,ml:2,fontSize:20}}>
      {viewAvability.sqft} SQFT
      </Typography>
        </Box>
        </Box>
        <Typography variant='h6' sx={{mt:3,fontWeight:'bold'}}>Property Location</Typography>
        <Typography variant="body1" sx={{mt:1.5,ml:2,fontSize:20}}>
        {viewAvability.propertyLocation}
        </Typography>
        </CardContent>
    </Card>
  <Box sx={{width:'30%'}}>
        <Box
      sx={{
        border: '1px solid #d3d3d3',
        borderRadius: '8px',
        width: '90%',
        // maxWidth: 300,
        height: 70,
        backgroundColor: '#FF6C6C',
        display:'flex',
        mt:4
      }}
    >
         {viewAvability.projectRequirment === 'Rent' ?
      <Typography variant="body1" sx={{mt:0.5,ml:2,fontSize:18,color:'white'}}>
        {viewAvability.projectAdvanceRent} - {viewAvability.projectMonthlyRent}
        <Typography>
       advance - monthly
       </Typography>
       </Typography> :
      <Typography variant="body1" sx={{mt:1.5,ml:2,fontSize:20,color:'white'}}>
      {viewAvability.projectPrice}
     </Typography> 
}
        </Box>
        <Card sx={{ maxWidth: 280,mt:5 }}>
        <CardContent>
            <Typography variant='h5' sx={{textAlign:'center'}}>Client Info</Typography>
            <Typography variant='h6' sx={{mt:2}}>Client Name : {viewAvability.clientName}</Typography>
        </CardContent>
    </Card>
    </Box>
    </Box>
 
    </div>
  )
}

export default ViewDescriptionPage
