import React from "react";
import './Send.css';
import { useTheme } from "@mui/material/styles";

function Send(props) {
  const theme = useTheme();

  return (
    <div className={`send ${props.trigger ? "active" : ""}`}>
      <div className="send-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
        {props.children}
      </div>
    </div>
  );
}

export default Send;
