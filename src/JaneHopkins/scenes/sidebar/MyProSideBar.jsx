import { useState} from "react";

import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { useSidebarContext } from "./sideBarContext";


import { Link } from 'react-router-dom';
import { tokens } from "../../theme";
import { Box,IconButton, Typography, useTheme} from '@mui/material';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import avatar from './squiliem.jpeg';


const Item =({title, to, icon, selected, setSelected}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return(
    <MenuItem 
      active={selected === title} 
      style={{color: colors.grey[100]}} 
      onClick={() => setSelected(title)} 
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
      
    </MenuItem>
  );
};

const MyProSideBar = () => {

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
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        
        backgroundColor={colors.primary[400]}
        
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
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.grey[100]}>
                  Jane Hopkins
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
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                {window.location.pathname === '/JaneHopkins/Admin'? (
                  <Typography variant="h4">ADMIN</Typography>
                  
                ) : (

                  
                  <img
                    className="avater-image"
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={avatar}
                    style={{cursor: "pointer", borderRadius: "50%"}}                                 
                  />

                )}
                
              </Box>

             {window.location.pathname === '/JaneHopkins/Admin' ? (
              <Box textAlign="center">
                <Typography variant="h5" color={colors.greenAccent[500]}>
                Administration
              </Typography>

              </Box>
              
             ) : (

              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{m: "10px 0 0 0"}}
                >
                  Austin M.D.
                </Typography>
                
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Doctor
                </Typography>
                
              </Box>
             )}

              

            </Box>
          )}

          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/JaneHopkins"
              icon={<HomeOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{m: "15px 0 5px 20px"}}
            >
              Pages
            </Typography>

            <Item
              title="Admin"
              to="/JaneHopkins/Admin"
              icon={<PeopleOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography>
            

            <Item
              title="Patients"
              to="/JaneHopkins/patient"
              icon={<PeopleOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Add Patient"
              to="/JaneHopkins/addpatient"
              icon={<PeopleOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Track Dosage"
              to="/JaneHopkins/trackdosage"
              icon={<PeopleOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            
            

            
          </Box> 
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default MyProSideBar;