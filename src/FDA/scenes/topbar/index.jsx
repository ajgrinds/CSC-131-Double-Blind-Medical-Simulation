import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { ColorModeContext } from '../../theme';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from 'react-router-dom';
import { UpdateAuthState } from '../../../authentication/context/AuthContext';

const TopBar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const setAuthType = UpdateAuthState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAuthType("Guest");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" />
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Typography variant="body1" component={Link} to="/" color="inherit" underline="none" onClick={handleSignOut}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default TopBar;
