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
import { useSpring, animated } from 'react-spring';

const Register = () =>  {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    });

    const register = async () => {
        if (registerPassword !== registerConfirmPassword) {
            alert("Passwords do not match");
            return;
        }

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
        if (email.match("@bavaria.com")) {
            navigate("/bavaria");
        }
        if (email.match("@fda.com")) {
            navigate("/fda");
        }
        if (email.match(/@JaneHopkins.com/gi)) {
            navigate("/JaneHopkins");
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    const theme = createTheme();

    const animatedProps = useSpring({
        from: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
        to: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        config: { duration: 500 },
    });

    const handleHereClick = () => {
        navigate("/");
    };

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <animated.div style={animatedProps}>
            <Box
                    /*Inside elements codes*/
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'white',
                        borderRadius: '16px',
                        border: 1,
                        borderColor: 'divider',
                        boxShadow: 5,
                        padding: 3,
                        width:400
                    }}
                >   
                    {/*Icon/header's codes*/}
                    <PersonAddIcon sx={{ fontSize: 100, mt: 3 }} />

                    <Typography component="h1" variant="h5" marginTop={2} fontFamily={"Inter"} fontWeight={900} fontSize={36}>
                        Register New User
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={registerEmail}
                            onChange={(event) => setRegisterEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={registerPassword}
                            onChange={(event) => setRegisterPassword(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirm-password"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            value={registerConfirmPassword}
                            onChange={(event) => setRegisterConfirmPassword(event.target.value)}
                        />
    
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                            onClick={register}
                        >
                            Register New User
                        </Button>
                    </Box>
    
                    <Box mt={2}>
                        <Typography fontFamily={"Inter"} fontWeight={400} fontSize={16} marginTop={1}>
                            <Link to="/JaneHopkins">Continue as Guest</Link>
                        </Typography>
                    </Box>
    
                    <Box mt={2}>
                      <Typography fontFamily={"Inter"} fontWeight={400} fontSize={16} marginTop={1}>
                          Already have an account? Click{' '}
                          <animated.span style={animatedProps} onClick={handleHereClick}>
                              <Link to="/" onClick={(e) => e.preventDefault()}>
                                  Here
                              </Link>
                          </animated.span> to log in
                      </Typography>
                  </Box>
               </Box>
            </animated.div>
          </Container>
        </ThemeProvider>
      );
  };
export default Register;
    
                            
