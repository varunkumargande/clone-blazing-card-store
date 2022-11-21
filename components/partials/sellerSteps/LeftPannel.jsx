import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { stepState } from "../../Constants";

export default function LeftPannel(){
    const router = useRouter()
    const steps = useSelector(
        (state) => state?.becomeSeller?.stepContainer
      );
      const submittedData = useSelector(
        (state) => state?.becomeSeller?.submittedDetails
      );

      useEffect(() => {
        stepState.forEach(element => {
            getCurrentState(element)    
        });
      }, [steps])

      useEffect(() => {
        if(submittedData?.steps){
            router.push(`/become-seller/${stepState[submittedData.steps]}`, undefined, {
                shallow: true,
            })
        }
      }, [submittedData])
    
    const getCurrentState = (name) => {
        return `step1 step flex flex-center ${steps[name]}`
    }

    return(
        <div className="left-pannel flex column">
            <div className={getCurrentState(stepState[0])}>
                <span className="count br50 flex flex-center justify-center">1</span>
                <div className="label">Important Guidelines</div>
            </div>
            <div className={getCurrentState(stepState[1])}>
                <span className="count br50 flex flex-center justify-center">2</span>
                <div className="label">Basic Details</div>
            </div>
            <div className={getCurrentState(stepState[2])}>
                <span className="count br50 flex flex-center justify-center">3</span>
                <div className="label">Payment Details</div>
            </div>
            <div className={getCurrentState(stepState[3])}>
                <span className="count br50 flex flex-center justify-center">4</span>
                <div className="label">Shipping Details</div>
            </div>
            <div className={getCurrentState(stepState[4])}>
                <span className="count br50 flex flex-center justify-center">5</span>
                <div className="label">Application Submitted</div>
            </div>
        </div>
    );
}