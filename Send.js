import React from "react" 
import'./Send.css'

function Send(props) {
    return (props.trigger) ? (
        <div className="send">
            <div className="send-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Send