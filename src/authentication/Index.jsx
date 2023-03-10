import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

const Login = () =>  {

    const[registerEmail, setRegisterEmail] = useState("");
    const[registerPassword, setRegisterPassword] = useState("");
    const[loginEmail, setLoginEmail] = useState("");
    const[loginPassword, setLoginPassword] = useState("");

    const[user, setUser] = useState({});

    /*
    try {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          });
    } catch (error) {
        console.log(error.message);
    } */

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
    };    

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          );
          console.log(user);
        } catch (error) {
          console.log(error.message);
          alert("Unrecognized Email and/or Password");
        }
    };
    
    const logout = async () => {
        await signOut(auth);
    };


    return (
        <Box>
            <Box>
                <h1> Register User </h1>
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

                <Button variant = "outlined" onClick={register}> Create User </Button>
            </Box>
        
            <Box>
                <h1> Login </h1>
                <input
                    placeholder="Email..."
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    } } />

                <input
                    placeholder="Password..."
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    } } />

                <Button variant = "outlined" onClick={login}> Login </Button>
            </Box>
            
            <Box>
                <h2> Currently Loggin In As:</h2>
                {user?.email}

                <Button variant = "outlined" onClick={logout}> Sign Out </Button>
            </Box>
        </Box>
    );
}

export default Login;
