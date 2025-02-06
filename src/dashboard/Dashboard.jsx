import React,{useEffect,useContext,useState} from 'react';
import Header from '../components/Header';
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader';
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

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate =  useNavigate()
  const [data,setData] = useState()
  const [requirmentData,setRequirmentData] = useState()
  const [avaibilityData,setAvaibilityData] = useState()

    useEffect(() => {
      getTask();
      getRequirment();
      getAvaibility();
    }, []);
  async function getTask() {
    try {
      const token = localStorage.getItem('token'); // Adjust based on token storage
      const response = await fetch('http://localhost:3001/ownTask', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      // Sort tasks by `createdAt` in descending order
      const sortedData = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const latestFiveTasks = sortedData.slice(0, 3);


      setData(latestFiveTasks); // Store sorted data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log(data)

  async function getRequirment() {
    try {
      const token = localStorage.getItem('token'); // Adjust based on token storage
      const response = await fetch('http://localhost:3001/ownRequirment', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      // Sort tasks by `createdAt` in descending order
      const sortedData = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const latestFiveTasks = sortedData.slice(0, 3);


      setRequirmentData(latestFiveTasks); // Store sorted data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log("requirment data",requirmentData)

  async function getAvaibility() {
    try {
      const token = localStorage.getItem('token'); // Adjust based on token storage
      const response = await fetch('http://localhost:3001/ownAvaibility', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      // Sort tasks by `createdAt` in descending order
      const sortedData = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const latestFiveTasks = sortedData.slice(0, 3);


      setAvaibilityData(latestFiveTasks); // Store sorted data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log("avaibilty data",avaibilityData)


  return (
    <div>
      <Box sx={{background:'#f7f7f7'}}>
      <Header />

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
      <Card
        sx={{
          borderRadius: '12px',
          boxShadow: 5,
          mt: 5,
          ml:"2%",
          width: { xs: '100%', sm: '80%', md: '50%' }, // responsive width
          height: 'auto', // allows the card to expand with content
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent sx={{ width: '100%' }}>

          <Typography variant='h4' sx={{textAlign:'center',color: '#1982C4'}}>Personal Task</Typography>
        <Box sx={{ ml: { xs: 0, md: '0%' }, mt: { md: 3, xs: 10 } }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850, maxHeight: 22 }} aria-label="simple table">
            <TableHead sx={{ background: '#EEF0F7', color: 'black' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Task Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.inputValue}</TableCell>
                  <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <RestoreFromTrashOutlinedIcon
                        sx={{
                          ml: 2,
                          background: '#FFE9E9',
                          border: 'none',
                          color: '#FF897C',
                          padding: '2px 4px',
                          cursor: 'pointer',
                          fontSize: '18px',
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Link to='/AddOwnTask' style={{position:'absolute',right:'3%'}}>
      show more
      </Link>
</CardContent>
</Card>
      </Box>

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

          <Typography variant='h4' sx={{textAlign:'center',color: '#1982C4'}}>Personal Requirment</Typography>
        <Box sx={{ ml: { xs: 0, md: '0%' }, mt: { md: 3, xs: 10 } }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850, maxHeight: 22 }} aria-label="simple table">
            <TableHead sx={{ background: '#EEF0F7', color: 'black' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Client Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>property Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requirmentData?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.clientName}</TableCell>
                  <TableCell>{row.ProjectType}</TableCell>
                  <TableCell>{row.Location}</TableCell>
                  <TableCell>
                    {row.addPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Link to='/ViewOwnRequirment' style={{position:'relative',left:'3%'}}>
      show more
      </Link>
</CardContent>
</Card>
      <Card
        sx={{
          borderRadius: '12px',
          boxShadow: 5,
          mt: 5,
          ml:"2%",
          width: { xs: '100%', sm: '80%', md: '40%' }, // responsive width
          height: 'auto', // allows the card to expand with content
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent sx={{ width: '100%' }}>
        <Typography variant='h4' sx={{textAlign:'center',color: '#1982C4'}}>Personal Avaibilty</Typography>
        <Box sx={{ ml: { xs: 0, md: '0%' }, mt: { md: 3, xs: 10 } }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850, maxHeight: 22 }} aria-label="simple table">
            <TableHead sx={{ background: '#EEF0F7', color: 'black' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Client Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Property Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {avaibilityData?.map((row) => ( 
                <TableRow key={row._id}>
                  <TableCell>{row.clientName}</TableCell>
                  <TableCell>{row.ProjectType}</TableCell>
                  <TableCell>
                    {row.propertyLocation}
                  </TableCell>
                  <TableCell>
                    {row.projectPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Link to='/ViewOwnAvaibilty' style={{position:'absolute',right:'3%'}}>
      show more
      </Link>
</CardContent>
</Card>
      </Box>
 

      </Box>

      
    </div>
  );
};

export default Dashboard;
