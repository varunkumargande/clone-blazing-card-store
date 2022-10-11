import React from "react";
import IconWhitecheck from "../../Icons/IconWhitecheck";
import IconWhiteError from "../../Icons/IconWhiteError";
import IconClose from "../../Icons/IconClose";

export function SuceesTostmessage(){
    return (
        <div className="ToastMessageWrapper flex space-between flex-center success">
            <div className="toast-massage flex flex-center"><IconWhitecheck /> Information updated successfully!</div>
            <button className="close">
              <IconClose />
            </button>
        </div>
    )
}
export function ErorrTostmessage(){
    return (
        <div className="ToastMessageWrapper flex space-between flex-center error">
            <div className="toast-massage flex flex-center"><IconWhiteError /> Error</div>
            <button className="close">
              <IconClose />
            </button>
        </div>
    )
}
