// import React from 'react'

// const ViewSellItem = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default ViewSellItem

import React,{useState,useEffect,Paper} from 'react'
import { Typography,Box,Table,TableHead,TableBody,TableCell,TableContainer,TableRow} from '@mui/material'
import Header from './components/Header'
import EmployeeAndAgentHeader from './components/EmployeeAndAgentHeader';

const ViewSellItem = () => {
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

  const getData = async () => {
    try {
      const res = await fetch('http://localhost:3001/addsSellPropert/');
      const data = await res.json();
      setData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  console.log(data);

  return (
    <div>
        {role === "Sale's Executive" || role === 'Agent' ? (
        <EmployeeAndAgentHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}

<Box sx={{ ml: { xs: 0, md: '20%' }, mt: { md: 13, xs: 8 }, backgroundColor: '#FFFFFF', borderRadius: '8px', padding: 2 }}>
        <TableContainer>
          <Table sx={{ maxWidth: 850 }} aria-label="simple table">
            <TableHead sx={{ background: '#011936' }}>
              <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>total Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>Received Employee Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%' , color: 'white',}}>Received Employee commission </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>Selled Employee Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', width: '10%', color: 'white', }}>Selled Employee commission</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <>
                  <TableRow key={index}>
                  <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.receivedEmployeeName}</TableCell>
                    <TableCell align="center">{row.receivedEmployeeCommission} ({row.commissionPercOfReceivedEmployeed}%) </TableCell>
                    <TableCell align="center">{row.buyerEmployeeName}</TableCell>
                    <TableCell align="center">{row.selledEmployeeCommission}</TableCell>
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

