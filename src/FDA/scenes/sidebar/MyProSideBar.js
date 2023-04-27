import React, { useState, createContext, useContext } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import FDAProSidebar from "./FDAProSideBar"

const SidebarContext = createContext({});

export const MyProSidebarProvider = ({ children }) => {
  
  return (
    <ProSidebarProvider>
      
     
        <div
          style={{
            display: "flex",
            
          }}
        >
          <FDAProSidebar />
          {children}
        </div>
     
    </ProSidebarProvider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
