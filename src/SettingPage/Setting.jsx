import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { TextField, Button, Select, MenuItem, Checkbox, List, ListItem,Box} from '@mui/material';

const Setting = () => {
  const [fields, setFields] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [newType, setNewType] = useState('text');
  const [newRequired, setNewRequired] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/addVoucherField/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFields(data);
        } else {
          console.error('Invalid data format:', data);
          setFields([]);
        }
      })
      .catch(error => console.error('Error fetching fields:', error));
  }, []);

  const handleAddField = () => {
    const newField = { label: newLabel, type: newType, required: newRequired };

    fetch('http://localhost:3001/addVoucherField/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newField),
    })
      .then(res => res.json())
      .then(savedField => {
        if (savedField) {
          setFields([...fields, savedField]);
        } else {
          console.error('Error saving field:', savedField);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDeleteField = (id) => {
    fetch(`http://localhost:3001/addVoucherField/${id}`, { method: 'DELETE' })
      .then(() => {
        setFields(fields.filter(field => field._id !== id));
      })
      .catch(error => {
        console.error('Error deleting field:', error);
      });
  };

  return (
    <div>
      <Header />
      <Box sx={{mt:"10%",ml:"20%"}}>
      <h2>Manage Voucher Fields</h2>
      <TextField label="Field Label" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
      <Select value={newType} onChange={(e) => setNewType(e.target.value)}>
        <MenuItem value="text">Text</MenuItem>
        <MenuItem value="number">Number</MenuItem>
        <MenuItem value="date">Date</MenuItem>
      </Select>
      <Checkbox checked={newRequired} onChange={(e) => setNewRequired(e.target.checked)} /> Required
      <Button onClick={handleAddField}>Add Field</Button>

      <List>
        {fields.map((field) => (
          <ListItem key={field._id}>
            {field.label} - {field.type} - {field.required ? 'Required' : 'Optional'}
            <Button onClick={() => handleDeleteField(field._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      </Box>
    </div>
  );
};

export default Setting;
