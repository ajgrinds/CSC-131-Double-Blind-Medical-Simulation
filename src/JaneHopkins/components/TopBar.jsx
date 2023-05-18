import { useContext, useState } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import { Box, IconButton, Menu, MenuItem, useTheme, InputBase } from '@mui/material';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import SearchIcon from "@mui/icons-material/Search";
import { signOut  } from 'firebase/auth';
import { auth } from '../../authentication/firebase-config'
import { useProSidebar } from 'react-pro-sidebar';
import { UpdateAuthState } from '../../authentication/context/AuthContext'

const TopBar = () => {
  
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const setAuthType = UpdateAuthState();

  const handleMenuButtonClick = () => {
    toggleSidebar();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out!');
        window.location.href = '/';
        setAuthType('Guest');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>

      <Box display="flex">
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2"}}
            onClick={handleMenuButtonClick} // use setSidebarRTL to toggle sidebarRTL state
          >
            <MenuOutlinedIcon/>
          </IconButton>
        )}
      </Box>

      <Box display="flex">
        <IconButton onClick={handleOpenMenu}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default TopBar;
