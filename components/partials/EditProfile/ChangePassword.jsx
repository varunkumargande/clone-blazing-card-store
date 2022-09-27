import React from "react";
import IconDelete from "../../Icons/IconDelete";
import Link from "next/link";

export default function ChangePassword(){
    return(
        <div className="profile-detail">
            <h3>Change Password</h3>
            <div className="box">
                <div className="inner-box">
                    <div className="input-control wd50">
                        <label>Current Password *</label>
                        <input name="passwod" placeholder={"Enter here"} className="grey-bg" />
                        <span className="errorMessage"></span>
                    </div>
                    <div className="input-control wd50">
                            <label htmlFor="usr">New Password *</label>
                        <input name="passwod" placeholder={"Enter here"} id="usr" className="grey-bg" />
                        <span className="errorMessage"></span>
                    </div>
                    <div className="input-control wd50">
                            <label htmlFor="usr">Retype New Password *</label>
                        <input name="passwod" placeholder={"Enter here"} id="usr" className="grey-bg" />
                        <span className="errorMessage"></span>
                    </div>
                </div>
            </div>
            <div className="button-wrapper flex mb40">
                <button className="border-btn mr16">Cancel</button>
                <button className="primary-btn disable">Save</button>
            </div>
        </div>
    );
}