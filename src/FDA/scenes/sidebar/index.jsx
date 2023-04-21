import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box,IconButton, Typography, useTheme } from '@mui/material';
import {Link} from 'react-router-dom';
import { tokens } from "../../theme";
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
    >
      <Typography>{title}</Typography>
      <Link to={to}/>
    </MenuItem>
  )
}

const FDASidebar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner":{
          background: `${colors.sidebarColor[200]} !important`
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
              color: colors.sidebarColor[400],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="35px"
              >
              <Typography variant="h5" color={colors.sidebarColor[300]}>
                  Food & Drug
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
                  width="220px"
                  height="120px"
                  src={avatar}
                  style={{cursor: "pointer", borderRadius: "0%"}}                                 
                />
                
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.sidebarColor[300]}
                  fontWeight="bold"
                  sx={{m: "10px 0 0 0"}}
                >
                  Big Boss FDA Man
                </Typography>
                <Typography variant="h5" color={colors.sidebarColor[400]}>
                  FDA
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10px"}>
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
              sx={{m: "15px 0 5px 20px"}}
            >
              Data
            </Typography>

            <Item
              title="Patients"
              to="/fda/patient"
              icon={<PeopleOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Assign Drugs"
              to="/fda/drugs"
              icon={<AssignmentReturnedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Progress Report"
              to="/janehopkins/dashboard"
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
              title="Profile Form"
              to="/fda/form"
              icon={<PersonOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/fda/calendar"
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

export default FDASidebar;
