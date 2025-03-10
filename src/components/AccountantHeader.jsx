import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {
  AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Box,
  Avatar, Tooltip, Menu, Divider,Button,Modal,MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EmailIcon from '@mui/icons-material/Email';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import { UserContext } from './UserContext';
import GrowProperty from './GrowProperty.png'
import { Stack } from '@mui/material';


const settings = ['Logout'];

const AccountantHeader = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({
      availability: false,
      addAvailability: false,
      employee: false,
      tasks: false,
      requirements: false,
      projects: false,
      task: false,
    });
    const [addButtonMenu, setAddButtonMenu] = useState(null);
    const [userMenuOpen,setUserMenuOpen] = useState()
    const open = Boolean(userMenuOpen);

  
    const toggleDropdown = (dropdown) => {
      setOpenDropdowns((prev) => ({
        ...prev,
        [dropdown]: !prev[dropdown],
      }));
    };
  
    const menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, link: '/Accountant' },
      {
        text: 'ledgers', icon: <MeetingRoomIcon />,
        isDropdown: true,
        dropdownItems: [
          { text: 'Expense', link: '/ViewExpense' },
          { text: 'Assets', link: '/ViewAssets' },
          { text: 'Receivable', link: '/ViewReceivable' },
          { text: 'Payable', link: '/ViewPayable' },
        ].filter(Boolean),
      },
      // { text: 'Report', icon: <ReportIcon />, link: '/Report' },
      // {
      //   text: 'Report', icon: <MeetingRoomIcon />,
      //   isDropdown: true,
      //   dropdownItems: [
          { text: 'View requirment report', link: '/RequirementReport',icon: <MeetingRoomIcon /> },
          { text: 'View Project Report', link: '/ProjectReport',icon: <MeetingRoomIcon /> },
         { text: 'Voucher report', link: '/VoucherReport',icon: <MeetingRoomIcon /> },
         { text: 'Balance sheet report', link: '/BalanceSheet',icon: <MeetingRoomIcon /> },
         { text: 'Bank Balance sheet report', link: '/BankBalanceSheet',icon: <MeetingRoomIcon /> },
         { 
          text: 'avability report',
          icon: <MeetingRoomIcon />,
          isDropdown: true,
          dropdownItems: [  
            { text: 'Developer report', link: '/AvaibilityReport' },
            { text: 'Office Report', link: '/OfficeReport' },
          ].filter(Boolean),
        },
      //   ].filter(Boolean),
      // },
      {
        text: 'Account', icon: <MeetingRoomIcon />,
        isDropdown: true,
        dropdownItems: [
          { text: 'View Liabilities', link: '/Liabilities' },
          { text: 'Add voucher', link: '/AddVoucher' },
          // { text: 'Add Balance', link: '/AddBalance' },
          { text: 'View Balance', link: '/ViewBalance' },
          // user?.AddProject && { text: 'Add Expense', link: '/AddExpenseModal' },
        ].filter(Boolean),
      },
    
    ];
  
  
    const handleClick = (event) => {
      setAddButtonMenu(event.currentTarget);
    };
  
    const handleClose = () => {
      setAddButtonMenu(null);
    };
  
    const handleMenuClick = (path) => {
      navigate(path);
      handleClose();
    };
  
    const handleUserOpen = (event) => {
      setUserMenuOpen(event.currentTarget);
    };
  
    const handleUserClose = () => {
      setUserMenuOpen(null);
    };
  
    const handleLogout = () => {
      handleUserClose();
      // Redirect to login page
      navigate("/Login", { replace: true });
  
      // Disable back button
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", function (event) {
        window.history.pushState(null, "", window.location.href);
      });
    }

  return (
    <div>
    <Box sx={{ display: 'flex' }}>
    <AppBar position="fixed" sx={{ background: '#fff', color: 'black', zIndex: 1300 }}>
<Toolbar>
 <IconButton
   color="inherit"
   aria-label="open drawer"
   edge="start"
   onClick={() => setDrawerOpen(!drawerOpen)}
   sx={{ mr: 2 }}
 >
   <MenuIcon />
 </IconButton>
 <img width={"10%"} src={GrowProperty} alt="Logo" />
 {/* <Typography variant="h6" noWrap component="div">Client 360</Typography> */}
 <Box sx={{ flexGrow: 1 }} />
 {/* <Box sx={{ flexGrow: 0 }}> */}
 <Stack direction="row" spacing={2}>
   </Stack>

   <Menu
     anchorEl={addButtonMenu}
     open={Boolean(addButtonMenu)}
     onClose={handleClose}
   >
     <MenuItem onClick={() => handleMenuClick("/AddRequirment")}>
       Requirement
     </MenuItem>
     <MenuItem onClick={() => handleMenuClick("/AddProject")}>
       Project
     </MenuItem>
   </Menu>

   <Tooltip title="Open settings">
     <IconButton sx={{ p: 0, ml: 2 }} onClick={handleUserOpen}>
       <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
     </IconButton>
   </Tooltip>
  <Menu
          id="menu-appbar"
          anchorEl={userMenuOpen}
          open={open}
          onClose={handleUserClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
     {settings.map((setting) => (
       <MenuItem key={setting} 
                 onClick={setting === "Logout" ? handleLogout : handleClose}
                 >
                   {setting}
                 </MenuItem>
     ))}
   </Menu>
 {/* </Box> */}
</Toolbar>
</AppBar>


   <Drawer variant="permanent" 
   sx={{
     width: 240,
     flexShrink: 0,
     '& .MuiDrawer-paper': {
       width: 240,
       boxSizing: 'border-box',
       backgroundColor: '#011936',
       color: 'white',
       fontWeight: 'bold',
     },
   }}
   open={drawerOpen}
   >
     <Toolbar />
     <Divider />
     <List sx={{ color: 'white', fontWeight: 'bold' }}>
{menuItems.map((item) => (
 <React.Fragment key={item.text}>
   <ListItem
     button
     onClick={item.isDropdown ? () => toggleDropdown(item.text.toLowerCase().replace(" ", "")) : undefined}
     component={item.link ? Link : 'div'}
     to={item.link}
     sx={{
       paddingY: 0.25,
       '&:hover': {
         backgroundColor: '#136a8a',
       },
     }}
   >
    <ListItemIcon sx={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{item.icon}</ListItemIcon>
     <ListItemText
             sx={{
               color: 'white',
               fontWeight: 'bold',
               fontSize: '0.75rem',
               padding: 0,
             }}
             primary={item.text}
      />
     
     {/* Clickable Icon for Dropdown */}
     {item.isDropdown && (
       openDropdowns[item.text.toLowerCase().replace(" ", "")]
         ? <ExpandLessIcon 
             onClick={(e) => {
               e.stopPropagation(); // prevent the parent list item from also toggling
               toggleDropdown(item.text.toLowerCase().replace(" ", ""));
             }} 
             sx={{ cursor: 'pointer' }} 
           />
         : <ExpandMoreIcon 
             onClick={(e) => {
               e.stopPropagation(); // prevent the parent list item from also toggling
               toggleDropdown(item.text.toLowerCase().replace(" ", ""));
             }} 
             sx={{ cursor: 'pointer' }} 
           />
     )}
   </ListItem>

   {/* Dropdown Items */}
   {item.isDropdown && (
     <Collapse in={openDropdowns[item.text.toLowerCase().replace(" ", "")]} timeout="auto" unmountOnExit>
       <List component="div" disablePadding>
         {item.dropdownItems.map((dropdownItem) => (
           <React.Fragment key={dropdownItem.text}>
             <ListItem
               button
               component={dropdownItem.link ? Link : 'div'}
               to={dropdownItem.link}
               sx={{ pl: 4 }}  // Adjust padding for dropdown items
             >
               <ListItemText primary={dropdownItem.text} />
               
               {/* Nested dropdown for Add Availability */}
               {dropdownItem.isDropdown && (
                 openDropdowns.addAvailability
                   ? <ExpandLessIcon 
                       onClick={(e) => {
                         e.stopPropagation(); // prevent the parent list item from also toggling
                         toggleDropdown('addAvailability');
                       }} 
                       sx={{ cursor: 'pointer' }} 
                     />
                   : <ExpandMoreIcon 
                       onClick={(e) => {
                         e.stopPropagation(); // prevent the parent list item from also toggling
                         toggleDropdown('addAvailability');
                       }} 
                       sx={{ cursor: 'pointer' }} 
                     />
               )}
             </ListItem>

             {/* Nested Dropdown Items for Add Availability */}
             {dropdownItem.isDropdown && (
               <Collapse in={openDropdowns.addAvailability} timeout="auto" unmountOnExit>
                 <List component="div" disablePadding>
                   {dropdownItem.dropdownItems.map((nestedItem) => (
                     <ListItem
                       button
                       key={nestedItem.text}
                       component={nestedItem.link ? Link : 'div'}
                       to={nestedItem.link}
                       sx={{ pl: 8 }}  // Adjust padding for nested dropdown items
                     >
                       <ListItemText primary={nestedItem.text} />
                     </ListItem>
                   ))}
                 </List>
               </Collapse>
             )}
           </React.Fragment>
         ))}
       </List>
     </Collapse>
   )}
 </React.Fragment>
))}
</List>

   </Drawer>
 </Box>
 </div>
)
}


export default AccountantHeader
