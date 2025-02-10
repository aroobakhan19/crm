import React,{useEffect,useContext,useState} from 'react';
import AccountantHeader from '../components/AccountantHeader';
import Cards from '../components/Cards';
import './chart.css'
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Card, CardContent, Container, Typography,TextField,Button,Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { UserContext } from '../components/UserContext';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const otherSetting = {
    height: 300, // Adjust height if needed
    yAxis: [{ label: 'rainfall (mm)' }],
    grid: { horizontal: true },
  };
  
  const dataset = [
    { london: 59, paris: 57, newYork: 86, seoul: 21, month: 'January' },
    { london: 50, paris: 52, newYork: 78, seoul: 28, month: 'February' },
    { london: 47, paris: 53, newYork: 106, seoul: 41, month: 'March' },
    { london: 54, paris: 56, newYork: 92, seoul: 73, month: 'April' },
    { london: 57, paris: 69, newYork: 92, seoul: 99, month: 'May' },
    { london: 60, paris: 63, newYork: 103, seoul: 144, month: 'June' },
    { london: 59, paris: 60, newYork: 105, seoul: 319, month: 'July' },
    { london: 65, paris: 60, newYork: 106, seoul: 249, month: 'August' },
    { london: 51, paris: 51, newYork: 95, seoul: 131, month: 'September' },
    { london: 60, paris: 65, newYork: 97, seoul: 55, month: 'October' },
    { london: 67, paris: 64, newYork: 76, seoul: 48, month: 'November' },
    { london: 61, paris: 70, newYork: 103, seoul: 25, month: 'December' },
  ];
  
  const valueFormatter = (value) => `${value}mm`;
  


const Accountant = () => {
  return (
    <div>
      <Box sx={{background:'#f7f7f7'}}>
      <AccountantHeader />

      <Cards />

      <Box sx={{display:'flex',flexDirection:{xs:'column',md:'row'},width:'100%'}}>

      <Card
        sx={{
          borderRadius: '12px',
          boxShadow: 5,
          mt: 5,
          ml:"20%",
          width: { xs: '100%', sm: '80%', md: '40%' }, // responsive width
          height: 'auto', // allows the card to expand with content
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent sx={{ width: '100%' }}>
          <BarChart
          className='chart'
            dataset={dataset}
            xAxis={[
              {
                scaleType: 'band',
                dataKey: 'month',
                valueFormatter: (month, context) =>
                  context.location === 'tick'
                    ? `${month.slice(0, 3)} \n2023`
                    : `${month} 2023`,
              },
            ]}
            series={[
              {
                dataKey: 'seoul',
                label: 'Seoul rainfall',
                valueFormatter,
                color: '#1982C4', // Updated color 
              },
            ]}
            {...otherSetting}
          />
        </CardContent>
      </Card>
      </Box>
      </Box>
    </div>
  )
}

export default Accountant
