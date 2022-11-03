import React,{useState,useEffect} from "react";
import IconBack from '../../Icons/IconBack';
import { Router, useRouter } from "next/router";

export default function ApplicationSubmitted(){
    const [windowWidth, setWindowWidth] = useState(0);
  
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    const router = useRouter();
    return(
        <div className="step-container">
            <h3>Application Submitted</h3>
            <div className="timer mb12"><img src="/static/images/timer.svg" alt="" /></div>
            <h4 className="mb16">Thank you for filling out the Application!</h4>
            <div className="sub-title">Please allow the Applications Team up to 2 weeks to review your Application.</div>
            {windowWidth >= 1025 ? <h6 className="flex flex-center backto-home"><div className="edit-back" onClick={() => router.push("/")} ><IconBack/></div>Back to home</h6> : ""}
        </div>
    );
}