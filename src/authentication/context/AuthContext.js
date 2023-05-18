import { createContext, useState, useContext, useEffect } from "react";

const LoginContext = createContext();
const AuthType = createContext();
const updateUserType = createContext();
const giveAuth = createContext();
const takeAuth = createContext();

export function UseAuth() {
    return useContext( LoginContext )
}

export function UseAuthType() {
    return useContext( AuthType )
}

export function UpdateAuthState() {
    return useContext( updateUserType )
}

export function UseGiveAuth() {
    return useContext( giveAuth )
}

export function UseTakeAuth() {
    return useContext( takeAuth )
}

export function AuthProvider ({children}) {
    const[loggedIn, setLoggedIn] = useState(false);
    const[userType, setUserType] = useState('Guest');


    function updateUser (s) {
        localStorage.setItem("my-auth-type", JSON.stringify(s));
        return setUserType(s);
    }

    function giveAuthTo () {
        localStorage.setItem("my-auth-status", JSON.stringify(true));
        return setLoggedIn(true);
    }

    function takeAuthFrom () {
        localStorage.setItem("my-auth-status", JSON.stringify(false));
        return setLoggedIn(false);
    }

    return (
        <LoginContext.Provider value = {loggedIn} >
            <AuthType.Provider value = {userType}>
                <updateUserType.Provider value = {updateUser} > 
                    <giveAuth.Provider value = {giveAuthTo} > 
                        <takeAuth.Provider value = {takeAuthFrom} > 
                            {children}    
                        </ takeAuth.Provider> 
                    </ giveAuth.Provider> 
                </ updateUserType.Provider> 
            </ AuthType.Provider >
        </ LoginContext.Provider>
    );
}