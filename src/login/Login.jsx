import React, { useState, useContext, useEffect } from 'react';
import { LoginUser } from '../config/db';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import './Login.css';
import { Card, CardContent, Typography, TextField, Button, InputAdornment,Alert,Snackbar} from '@mui/material';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Grow from './Grow.png'


const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Access setUser from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(true);  // No delay in showing the login form
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error"); // "success" | "error" | "warning" | "info"
  


    // Spring animation for the login form
    const loginCardAnimation = useSpring({
      opacity: showLogin ? 1 : 0,
      transform: showLogin ? 'translateY(0px)' : 'translateY(50px)',
      config: { tension: 200, friction: 15 },
    });
  
    useEffect(() => {
      setLoading(false);  // Skip splash screen and directly show login
    }, []);
  
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };

  async function login() {
    try {
      if (!email || !password) {
        setSnackbarMessage("Please fill in all the inputs!");
        setSnackbarSeverity("warning");
        setOpenSnackbar(true);
        return;
      }

      const userLogin = { email, password };
      const response = await LoginUser(userLogin); // Fetch user from API

      if (response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user); // Save user data in context

        // Redirect based on the user's role
        if (response.user.role === 'Admin') {
          navigate('/'); // Redirect to Admin Dashboard
          setSnackbarMessage("Welcome Admin!");
          setSnackbarSeverity("success");
        } else if (response.user.role === "Sale's Executive" || response.user.role === 'Agent') {
          navigate('/EmployeeAndAgentDashboard'); // Redirect to Employee/Agent Dashboard
          setSnackbarMessage("Welcome Employee/Agent!");
          setSnackbarSeverity("success");
        } else if (response.user.role === "Accountant") {
          navigate('/Accountant'); // Redirect to Employee/Agent Dashboard
          setSnackbarMessage("Welcome Employee/Agent!");
          setSnackbarSeverity("success");
        }
        else {
          setSnackbarMessage("Unauthorized role");
          setSnackbarSeverity("error");
        }
      } else {
        setSnackbarMessage("Login failed");
        setSnackbarSeverity("error");
      }
    } catch (e) {
      setSnackbarMessage(e.message);
      setSnackbarSeverity("error");
    }
    setOpenSnackbar(true)
  }

  return (
    <div 
    className="login-container" 
    style={{
      display: 'flex',            // Use flexbox for layout
      height: '100vh',            // Full viewport height
      position: 'relative',       // Positioning for elements
    }}
  >
    {/* Left side with large image and black background */}
    <div 
      style={{
        width: '50%',               // Half of the screen for the image
        display: 'flex',                // Flexbox for centering image
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
          
  borderBottomRightRadius: '15%', 
      }}
    >
      <img src={Grow} alt="Logo" style={{ width: '100%', height: 'auto', maxWidth: '700px', opacity: 0.9  }} /> {/* Large image */}
    </div>

    {/* Right side with login form */}
    <div 
      className="login-form-container" 
      style={{
        width: '50%',               // Half of the screen for the login form
        display: 'flex',            
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <animated.div style={loginCardAnimation}>
        <Card sx={{ width: '100%', maxWidth: 475, borderRadius: 3, boxShadow: 4, transition: 'transform 0.3s ease-out' }}>
          <CardContent>
            <Typography sx={{ textAlign: 'center', mt: 1, color: '#333333' }} variant="h5">
              Hi, Welcome Back
            </Typography>
            <Typography sx={{ textAlign: 'center', mt: 1, color: '#6d6d6d' }} variant="body2">
              Enter your credentials to continue
            </Typography>
            <TextField
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mt: 4,
                width: "100%",
                '& .MuiOutlinedInput-root': {
                  borderRadius: 25,
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                },
              }}
              label="Enter Email"
              variant="outlined"
              color="primary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#007bb5' }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mt: 4,
                width: "100%",
                '& .MuiOutlinedInput-root': {
                  borderRadius: 25,
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                },
              }}
              label="Enter Password"
              variant="outlined"
              color="primary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#007bb5' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              sx={{
                mt: 4,
                width: "100%",
                backgroundImage: 'linear-gradient(#007bb5, #1982C4)',
                color: 'white',
                boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundImage: 'linear-gradient(#007bb5, #1982C4)',
                  transform: 'scale(1.05)',
                  boxShadow: '0px 15px 20px rgba(0, 0, 0, 0.3)',
                },
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              variant="contained"
              size="large"
              onClick={login}
            >
              Log in
            </Button>
          </CardContent>
        </Card>
      </animated.div>
    </div>
          <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
  </div>
);
};

export default Login;
