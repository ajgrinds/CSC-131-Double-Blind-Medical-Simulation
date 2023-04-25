import React from "react";
import './Assign.css';
import { useTheme } from "@mui/material/styles";

function Assign(props) {
  const theme = useTheme();

  return (
    <div className={`assign ${props.trigger ? "active" : ""}`}>
      <div className="assign-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
        {props.children}
      </div>
    </div>
  );
}

export default Assign;
