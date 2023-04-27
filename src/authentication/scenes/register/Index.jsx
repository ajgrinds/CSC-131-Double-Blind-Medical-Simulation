import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Icon } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register = () =>  {

    const[registerEmail, setRegisterEmail] = useState("");
    const[registerPassword, setRegisterPassword] = useState("");
    const navigate = useNavigate();


    const[user, setUser] = useState({});

    useEffect (() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          });
    });

    const register = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          );
          console.log(user);
        } catch (error) {
          console.log(error.message);
          alert("Invalid Email and/or Password");
        }
        const email = auth.currentUser.email;
        if(email.match("@bavaria.com")) {
          navigate("/bavaria");
        }
        if(email.match("@fda.com")) {
          navigate("/fda");
        }
        if(email.match(/@JaneHopkins.com/gi)) {
          navigate("/JaneHopkins");
        }
    };    
    
    const logout = async () => {
        await signOut(auth);
    };

    const theme = createTheme();

return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor:'#CDCCCC',
            borderRadius: '16px',
            border: 1,
            borderColor:'black'
          }}
        >

          <PersonAddIcon sx = {{fontSize: 100, mt: 3 }}/>
        
          <Typography component="h1" variant="h5" marginTop={2} fontFamily={"Inter"} fontWeight={900} fontSize={36}>
            Register New User
          </Typography>

          <Box noValidate sx={{ display:'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap:1, mt: 3 }}>
                <input
                    placeholder="Email..."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    } } />

                <input
                    placeholder="Password..."
                    onChange={(event) => {
                        setRegisterPassword(event.target.value); 
                    } } />

            </Box>
            
            <Box sx ={{alignContent: 'center'}}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{position:'center', mt: 3, mb: 2 }}
              onClick={register}
            >
              Register New User
            </Button>
            </Box>

        <Box>
          <Typography fontFamily={"Inter"} fontWeight={400} fontSize={16} marginTop={1}>
              <Link to = "/JaneHopkins"> Continue as Guest </Link>
          </Typography>
        </Box>

        <Box>
            
            <Typography fontFamily={"Inter"} fontWeight={400} fontSize={16} marginTop={1}>
              Already have an account? Click 
              <Link to = "/"> Here </Link>
              to log in
          </Typography>
        </Box>

        </Box>
      </Container>
    </ThemeProvider>
  ); }

export default Register;
