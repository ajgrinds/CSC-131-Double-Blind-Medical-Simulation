import { useState} from "react";

import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { Link } from 'react-router-dom';
import { tokens } from "../../theme";
import { Box,IconButton, Typography, useTheme} from '@mui/material';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import avatar from "../../pictures/fdaLogo.jpeg"


const Item =({title, to, icon, selected, setSelected}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return(
    <MenuItem 
      active={selected === title} 
      style={{color: colors.sidebarColor[100]}} 
      onClick={() => setSelected(title)} 
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
      
    </MenuItem>
  );
};

const FDAProSideBar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();


  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        
        backgroundColor={colors.sidebarColor[400]}
        
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : undefined
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.sidebarColor[400],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.sidebarColor[300]}>
                  Food & Drug
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <MenuOutlinedIcon/>
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!collapsed && (
            <Box mb="25px">
              <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
                
              >
                <img
                  className="avater-image"
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={avatar}
                  style={{cursor: "pointer", borderRadius: "50%"}}                                 
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.sidebarColor[300]}
                  fontWeight="bold"
                  sx={{m: "10px 0 0 0"}}
                >
                    Admin
                </Typography>
                
              </Box>

            </Box>
          )}

          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/fda"
              icon={<HomeOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.sidebarColor[100]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography>

            <Item
              title="Assign Drugs"
              to="/fda/patient"
              icon={<AssignmentReturnedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Studies"
              to="/fda/studies"
              icon={<ReceiptOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            
            
            <Typography
              variant="h6"
              color={colors.sidebarColor[100]}
              sx={{m: "15px 0 5px 20px"}}
            >
              Pages
            </Typography>

            <Item
              title="Jane Hopkins"
              to="/"
              icon={<LocalHospitalIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Bavaria"
              to="/bavaria"
              icon={<VaccinesIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Logout"
              to="/"
              icon={<PersonOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
           
          </Box> 
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default FDAProSideBar;
