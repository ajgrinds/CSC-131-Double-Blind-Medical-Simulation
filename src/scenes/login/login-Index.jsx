import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

const Login = () =>  {

    const[registerEmail, setRegisterEmail] = useState("");
    const[registerPassword, setRegisterPassword] = useState("");
    const[loginEmail, setLoginEmail] = useState("");
    const[loginPassword, setLoginPassword] = useState("");

    const[user, setUser] = useState([]);

     /* try {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          });
    } catch (error) {
        console.log(error.message);
    } */
    

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
          alert("Email and/or password invalid");
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
          alert("Email and/or password not recognized");
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
                     type = "text"
                     name = "regEmail"
                     placeholder="Email..."
                     value = {registerEmail}
                     onChange={(event) => {
                         setRegisterEmail(event.target.value);
                    } } />

                <input
                    type = "text"
                    name = "regPassword"
                    placeholder="Password..."
                    value = {registerPassword}
                    onChange={(event) => {
                        setRegisterPassword(event.target.value); 
                    } } />

                <Button variant = "outlined" onClick={register}> Create User </Button>
            </Box>
        
            <Box>
                <h1> Login </h1>
                <input
                    type = "text"
                    name = "Email"
                    placeholder="Email..."
                    value = {loginEmail}
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    } } />

                <input
                    type = "text"
                    name = "Password"
                    placeholder="Password..."
                    value = {loginPassword}
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
