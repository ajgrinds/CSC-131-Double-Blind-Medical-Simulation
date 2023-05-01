import React, { useState, createContext, useContext } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import MyProSidebar from "./MyProSideBar"

const SidebarContext = createContext({});

export const MyProSidebarProvider = ({ children }) => {
  
  
  return (
    <ProSidebarProvider>
      
     
        <div
          style={{
            display: "flex",
            
          }}
        >
          <MyProSidebar />
          {children}
        </div>
     
    </ProSidebarProvider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
