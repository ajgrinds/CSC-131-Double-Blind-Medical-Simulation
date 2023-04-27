import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { Link } from 'react-router-dom';

import { useProSidebar } from 'react-pro-sidebar';

const TopBar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuButtonClick = () => {
    toggleSidebar();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};

const handleClose = () => {
    setAnchorEl(null);
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
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box> 
      </Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
                    onClick={handleClick}
                >
                    <PersonOutlinedIcon/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="body1">Logout</Typography>
                        </Link>
                    </MenuItem>
                </Menu>
      </Box>
    </Box>
  );
}

export default TopBar
