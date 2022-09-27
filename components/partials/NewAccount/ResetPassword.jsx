import React, {useState} from "react";
import IconKey from "../../Icons/IconKey";
import IconBack from "../../Icons/IconBack";
import IconEye from "../../Icons/IconEye";
export default function SentMail(){

    const [conpassShow, setConPassShow] = useState(false)
    const [passShow, setPassShow] = useState(false)

    return(
        <div className="login-wrapper">
            {/* <div className="back mb32"><IconBack /></div> */}
            <div className="iconkey mb32"><IconKey /></div>
            <h1 className="title mb8">Set New Password</h1>
            <div className="infotext mb32">Your new password must be different to previously used passwords.</div>
            <form className="reset flex space-between">
                <div className="input-control">
                    <label>Password</label>
                    <input  type={passShow ? "text" : "password"} placeholder="Enter here" />
                    {passShow ? <button className="show-hide" onClick={e => setPassShow(!passShow)}><IconEye /></button> : (<> <button className="show-hide" onClick={e => setPassShow(!passShow)}><IconEye /></button> </>)}
                </div>
                <div className="input-control">
                    <label>Conform Password</label>
                    <input  type={conpassShow ? "text" : "password"} placeholder="Enter here" />
                    {conpassShow ? <button className="show-hide" onClick={e => setConPassShow(!conpassShow)}><IconEye /></button> : (<> <button className="show-hide" onClick={e => setConPassShow(!conpassShow)}><IconEye /></button> </>)}
                </div>
                <div className="submitWrap mb32 mt16">
                    <button type="submit" className="primary-btn">Reset Password</button>
                </div>
            </form>
        </div>
    );
}
