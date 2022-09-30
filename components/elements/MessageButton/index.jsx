import React from "react";
import { chatHelper } from "../../helper/chatHelper";

export default function MessageButton({name}){
    const handleCheckChatAuth = () => {
        chatHelper()
    }
    return(
        <>
            <button onClick={handleCheckChatAuth}> {name} </button>
        </>
    );
}
