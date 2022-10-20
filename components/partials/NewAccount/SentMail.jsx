import React, {useState} from "react";
import Link from "next/link";
import IconKey from "../../Icons/IconKey";
import IconBack from "../../Icons/IconBack";

import { forgotApi } from '../../../api/auth/forgotPassword'
import { forgotPasswordConstant } from "../../Constants/forgot-password";
import { useRouter } from "next/router";

export default function SendMail({mail}) {

    const [mailError, setMailError] = useState("")
    const [forgotSuccess, setForgotSuccess] = useState(false)
    const router = useRouter();

    const handleSubmit = () => {
        if(mail == "") {
            setMailError(forgotPasswordConstant["requiredEmail"])
        }else {
            forgotApi(mail, setForgotSuccess)
        }
    }

    //go back to previous page
  const handleBackButton = () => {
    router.back()
   }  

    return(
        <div className="login-wrapper">

            <div className="back mb32" onClick={handleBackButton}><IconBack /></div>
            <h1 className="title mb8">Check Your Email</h1>
            <div className="infotext mb32">We sent a password reset link to {mail}</div>
            <div className="sent flex space-between">
                <div className="mb32 already">
                    Didn’t receive the email? <a onClick={handleSubmit}>Click to resend</a>
                </div>
                <div className="already">
                    Go Back to <Link href="/account/login"><a>Sign In</a></Link> 
                </div>
                <div className="copyright flex flex-center justify-center">
                    © Blazing Cards. 2022, All Rights Reserved
                </div>
            </div>
            <div className="copyright flex justify-center flex-center">&copy; Blazing Cards. {new Date().getFullYear()}, All Rights Reserved</div>
        </div>
    );
}