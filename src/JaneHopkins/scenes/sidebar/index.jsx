import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box,IconButton, Typography, useTheme } from '@mui/material';
import {Link} from 'react-router-dom';
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import avatar from './squiliem.jpeg'


const Item =({title, to, icon, selected, setSelected}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return(
    <MenuItem 
      active={selected === title} 
      style={{color: colors.grey[100]}} 
      onClick={() => setSelected(title)} 
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to}/>
    </MenuItem>
  )
}

const Sidebar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner":{
          background: `${colors.primary[400]} !important`
        },
        "& .pro-icon-wrapper":{
          backgroundColor: "transparent !important"
        },
        "& .pro-inner-item":{
          padding: "5px 35px 5px 20px !important",
          
        },
        "& .pro-inner-item:hover":{
          color: "#009099 !important"
        },
        "& .pro-menu-item.active":{
          color: "#009099 !important"
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
            sytle={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.grey[100]}>
                  Jane Hopkins
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon/>
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
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
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10px"}>
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
            
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{m: "15px 0 5px 20px"}}
            >
              Pages
            </Typography>

            <Item
              title="FDA"
              to="/fda"
              icon={<PersonOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Bavaria"
              to="/Bavaria"
              icon={<CalendarTodayOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
           
          </Box>
          
        </Menu>
      </ProSidebar>

    </Box>
  );
}

export default Sidebar;