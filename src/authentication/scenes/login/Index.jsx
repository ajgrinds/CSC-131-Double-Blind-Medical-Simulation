import { useEffect, useState, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import Button from "@mui/material/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SquiliemImage from "./logIn.jpeg";
import Hidden from "@mui/material/Hidden";
import useMediaQuery from "@mui/material/useMediaQuery";
import { UseGiveAuth, UpdateAuthState, UseAuth, UseAuthType, useTakeauth, UseTakeAuth } from "../../context/AuthContext";

const Login = () => {

    const[registerEmail, setRegisterEmail] = useState("");
    const[registerPassword, setRegisterPassword] = useState("");
    const[loginEmail, setLoginEmail] = useState("");
    const[loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();

    const[user, setUser] = useState({});

    const authorization = UseGiveAuth();
    const setAuthType = UpdateAuthState();
    const signOut = UseTakeAuth();
    const authTest = UseAuth();
    const typeTest = UseAuthType();

    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("my-auth-status"));
      if(data){
          setSignedIn(data);
      }
    }, [] );
    

    useEffect (() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          });
    });

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          );
          const email = auth.currentUser.email;
            if(email.match("@bavaria.com")) {
              setAuthType('Bavaria');
              navigate("/bavaria"); 
            }
            if(email.match("@fda.com")) {
              setAuthType('FDA');
              navigate("/fda");
            }
            if(email.match(/@JaneHopkins.com/gi)) {
              setAuthType('JaneHopkins');
              navigate("/JaneHopkins");
            }
          authorization();
        } catch (error) {
          console.log(error.message);
          alert("Unrecognized Email and/or Password");
        }
        
    };  
    
    const logout = async () => {
        //await signOut(auth);
        setAuthType("Guest");
        signOut();
    };

    /*Transition to pages*/
    const handleNavigation = (path) => {
      document.body.classList.add("page-transition");
      setTimeout(() => {
        navigate(path);
        document.body.classList.remove("page-transition");
      }, 500);
    };

    const theme = createTheme();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    /*Password visibility*/
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));


    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="md">
          <Dialog open={true} maxWidth={"md"} fullWidth>
            <Fade in={true} timeout={1000}>
              <DialogContent
                style={{
                  padding: 0,
                  overflowY: isSmallScreen ? "auto" : "hidden",
                  height: "70vh",
                }}
              >
                <Grid container height="100%">
                <Hidden smDown>
                <Grid item sm={6} style={{ backgroundColor: "#f5f5f5", position: "relative" }}>
                  <img
                    src={SquiliemImage}
                    alt="Your image"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "10%",
                      left: "36%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Typography
                      variant="h3"
                      color="#FFFFFF"
                      align="center"
                      fontWeight="bold"
                      style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                    >
                      Pharmastudy
                    </Typography>
                    <Typography
                      variant="h6"
                      color="#FFFFFF"
                      align="flex-start"
                      fontWeight="semi-bold"
                      style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
                    >
                      Jane Hopkins - FDA - Bavaria
                    </Typography>
                  </Box>
                </Grid>
                  </Hidden>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        bgcolor: "#FFFFFF",
                        borderRadius: "0px",
                        border: 1,
                        borderColor: "white",
                        p: 3,
                        height: "100%",
                        overflowY: "auto", // Make the content scrollable on mobile devices
                      }}
                    >
                    <AccountCircleIcon sx={{ fontSize: 100, mt: 1 }} />
                    {!signedIn && (
                      <>
                            <Typography
                          component="h1"
                          variant="h5"
                          marginTop={2}
                          fontFamily={"Inter"}
                          fontWeight={900}
                          fontSize={36}
                        >
                          Sign in
                        </Typography>
                        
                      </>
                    )}
                    {signedIn && (
                      <>
                            <Typography
                          component="h1"
                          variant="h5"
                          marginTop={2}
                          fontFamily={"Inter"}
                          fontWeight={900}
                          fontSize={36}
                          align={"center"}
                        >
                          Sign in to Another Account
                        </Typography>
                      </>
                    )}
                    <TextField
                          fullWidth
                          margin="normal"
                          label="Email"
                          variant="outlined"
                          onChange={(event) => {
                            setLoginEmail(event.target.value);
                          }}
                        />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Password"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      onChange={(event) => {
                        setLoginPassword(event.target.value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              color="inherit"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={login}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : "Sign In"}
                    </Button>
                    <Typography
                      fontFamily={"Inter"}
                      fontWeight={400}
                      fontSize={16}
                      mb={1}
                      onClick={() => handleNavigation("/JaneHopkins")} 
                    >
                      <Link to="#">Continue as Guest</Link> 
                    </Typography>
                    <Typography fontFamily={"Inter"} fontWeight={400} fontSize={16}>
                      Don't have an account? Click{" "}
                      <Link to="/Register"> Here </Link> to register
                    </Typography>
                    </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </Fade>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
