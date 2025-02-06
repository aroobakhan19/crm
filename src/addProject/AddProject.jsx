import React,{useState,useEffect} from 'react'
import Header from '../components/Header';
import EmployeeAndAgentHeader from '../components/EmployeeAndAgentHeader'
import { Addproject } from '../config/db';
import { Typography,Card,CardContent,Button,CardActions,Box,OutlinedInput,Select,MenuItem } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const names = ['Villa', 'Residency', 'Apartment', 'Others'];
const AddProject = () => {
    const [selectprojectType, setSelectProjectType] = React.useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [projectTitle,setProjectTitle] = useState();
    const [projectType,setProjectType] = useState();
    const [bedroom,setBedroom] = useState();
    const [bathroom,setBathroom] = useState();
    const [sqft,setSqft] = useState();
    const [price,setPrice] = useState();
    const [address,setAddress] = useState();
    const [state,setState] = useState();
    const [country,setCountry] = useState();
    const [zipCode,setZipCode] = useState();
    const [role, setRole] = useState('');

    useEffect(() => {
          // Decode role from user in localStorage
          const user = JSON.parse(localStorage.getItem('user'));
          if (user && user.role) {
            setRole(user.role);
          }
        }, []);
    

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectProjectType(
      typeof value === 'string' ? value.split(',') : value
    );
    setProjectType(value);  // Set the project type here directly
  };  

async function addProject(){
    try {
      if (!projectTitle || !projectType || !bedroom || !bathroom || !sqft || !price || !address || !state || !country || !zipCode) {
        alert('Please fill in all the inputs!');
        return;
      }

         // If all fields are filled, log the data
         const  addproject = {
          projectTitle,
          projectType,
          bedroom,
          bathroom,
          sqft,
          price,
          address,
          state,
          country,
          zipCode,

        };
        
       await Addproject(addproject)
      } catch(e) {
        alert(e.message);
      }
  }

  return (
    <div>
    {role === "Sale's Executive" || role === 'Agent' ? (
        <EmployeeAndAgentHeader />
      ) : role === 'Admin' ? (
        <Header />
      ) : null}
      <Typography sx={{ml:{xs:0,md:'45%'},mt:{md:12,xs:10},color:'#1982C4',fontWeight:'bold'}} variant='h3'>Add projects</Typography>
      <Box sx={{ ml: '30%', mt: 5, width: '70%' }}>
        <Card sx={{ maxWidth: 800, boxShadow: 20, backgroundColor: 'beige', borderRadius: '8px' }}>
          <CardContent>
        <Typography sx={{fontWeight:"bold",color:'#1982C4'}} variant='h6'>
        Information of Project
        </Typography>
        <Typography sx={{fontWeight:"bold",mt:2}}>
        Project Image
        </Typography>
        <Box
     sx={{
      border: '2px dashed #d3d3d3',
      borderRadius: '8px',
      width: '100%',
      maxWidth: 600,
      height: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#fafafa',
      margin: 'auto',
    }}
    >
      <CloudUploadIcon sx={{ fontSize: 40, color: '#8a8a8a' }} />
      <Typography variant="body1" sx={{ color: '#8a8a8a', marginTop: 1 }}>
        Drop files here or click to upload.
      </Typography>
      <Button
        variant="contained"
        component="label"
        sx={{
          mt: 4,
          color: 'white',
          backgroundColor: '#011936',
          '&:hover': {
            backgroundColor: '#002b4e',
          },
        }}
      >
        Upload
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      {selectedFile && (
        <Typography variant="body2" sx={{ marginTop: 1, color: '#4caf50' }}>
          Selected File: {selectedFile.name}
        </Typography>
      )}
    </Box>
   
    <Typography sx={{fontWeight:"bold",mt:2}}>
        Project Title
        </Typography>
        <OutlinedInput placeholder="Please enter text" 
        fullWidth
        type='string'
        onChange={(e) => setProjectTitle(e.target.value)}
        sx={{
          height: '35px',
          '&:hover': { borderColor: '#011936' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
        }}
        />
        
        <Typography sx={{fontWeight:"bold",mt:2}}>
        Project Type
        </Typography>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={selectprojectType}
  onChange={handleSelectChange}
  displayEmpty
  input={<OutlinedInput fullWidth />}
  sx={{
    height: '35px',
    '&:hover': { borderColor: '#011936' },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  }}
>
  {/* Placeholder option */}
  <MenuItem value="" disabled>
    <em>Select Project Type</em>
  </MenuItem>

  {/* Dynamic list of options */}
  {names.map((name) => (
    <MenuItem key={name} value={name}>
      {name}
    </MenuItem>
  ))}
</Select>

<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
<Box sx={{ width: '48%' }}>
<Typography sx={{fontWeight:"bold"}}>
Bedroom*
        </Typography>
        <OutlinedInput placeholder=" Enter Bedroom" 
        onChange={(e) => setBedroom(e.target.value)}
        type='number'
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
        <Typography sx={{fontWeight:"bold"}}>
        Bathroom*
        </Typography>
        <OutlinedInput placeholder="Enter Bathroom " 
      sx={{
        height: '35px',
        '&:hover': { borderColor: '#011936' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      }}
fullWidth
        onChange={(e) => setBathroom(e.target.value)}
        type='number'
        />
        </Box>
        </Box>


        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Box sx={{ width: '48%' }}>
<Typography sx={{fontWeight:"bold"}}>
SQFT
        </Typography>
        <OutlinedInput placeholder=" Enter SQFT" 
             sx={{
              height: '35px',
              '&:hover': { borderColor: '#011936' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
            }}
            fullWidth
        onChange={(e) => setSqft(e.target.value)}
        type='number'
        />
        </Box>
        <Box sx={{ width: '48%' }}>
        <Typography sx={{fontWeight:"bold"}}>
        Price
        </Typography>
        <OutlinedInput placeholder="Enter Price " 
            sx={{
              height: '35px',
              '&:hover': { borderColor: '#011936' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
            }}
            fullWidth
        onChange={(e) => setPrice(e.target.value)}
        type='number'
        />
        </Box>
        </Box>

        <Typography sx={{fontWeight:"bold",mt:2}}>
        Street Address
        </Typography>
        <OutlinedInput placeholder="Please enter Street Address" 
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        sx={{
          height: '35px',
          '&:hover': { borderColor: '#011936' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
        }}
        />

<Box 
sx={{display:'flex'}}
>
  <Box>
<Typography sx={{fontWeight:"bold",mt:2}}>
State
        </Typography>
        <OutlinedInput placeholder=" Enter State" 
       sx={{
        height: '35px',
        '&:hover': { borderColor: '#011936' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      }}
        onChange={(e) => setState(e.target.value)}
        />
        </Box>
        <Box sx={{ml:3}}>
<Typography sx={{fontWeight:"bold",mt:2}}>
Country
        </Typography>
        <OutlinedInput placeholder=" Enter Country" 
       sx={{
        height: '35px',
        '&:hover': { borderColor: '#011936' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      }}
        onChange={(e) => setCountry(e.target.value)}
        />
        </Box>
        <Box sx={{ml:3}}>
        <Typography sx={{fontWeight:"bold",mt:2}}>
        Zipcode
        </Typography>
        <OutlinedInput placeholder="Enter Zipcode " 
  sx={{
    height: '35px',
    '&:hover': { borderColor: '#011936' },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3' },
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  }}
        onChange={(e) => setZipCode(e.target.value)}
        />
        </Box>
        </Box>
        <Button 
        onClick={addProject}
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

export default AddProject
