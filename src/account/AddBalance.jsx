import React, { useState } from 'react'
import {Modal,Paper,TextField,Button,Box,Typography} from '@mui/material'
import Header from '../components/Header'
import { Addbalance } from '../config/db'

const AddBalance = () => {
        const [balanceDescription,setBalanceDescription] = useState('')
        const [balanceAmount,setBalanceAmount]  = useState('')
        const [balanceNote,setBalanceNote] = useState('')

async function addBalance(){
        try {
            if (!balanceDescription || !balanceAmount || !balanceNote) {
              alert('Please fill in all the inputs!');
              return;
            }
    
            const addbalance = {
                balanceDescription,
                balanceAmount,
                balanceNote,
            };
      
            await Addbalance(addbalance)
          } catch (e) {
            alert(e.message);
          }
        }
    

  return (
    <div>
      <Header />
        <Paper 
          sx={{
            mt:5,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            padding: 4,
            outline: 'none',
            borderRadius: '8px',
          }}
        >
          <Typography id="expense-modal-title" variant="h6" component="h2">
            Add Balance
          </Typography>
          <Box mt={2}>
            <TextField
            value={balanceAmount}
            onChange={(e) => setBalanceAmount(e.target.value)}
              label="Balance Amount"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
                value={balanceDescription}
                onChange={(e) => setBalanceDescription(e.target.value)}
              label="balance Description"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
             value={balanceNote}
            onChange={(e) => setBalanceNote(e.target.value)}
              label="Expense Note"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button 
            //   onClick={onClose} 
            onClick={addBalance}
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
    </div>
  )
}

export default AddBalance
