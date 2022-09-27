import React from "react";
import IconDelete from "../../Icons/IconDelete";
import Link from "next/link";

export default function ProfileInformation(){
    return(
        <div className="profile-detail">
            <h3>Profile Image</h3>
            <div className="box">
                <div className="flex flex-center">
                    <div className="prifile-image br50">
                        <img src="/static/images/profile-lg-image.png" alt="Profile" />
                    </div>
                    <div className="profile-text">
                        <div className="profile-btn-wrap flex flex-center mb16">
                            <label className="upload-btn flex justify-center flex-center">
                                Update Profile Image
                                <input type="file" />
                            </label>
                            <button className="delete-btn flex justify-center flex-center br50">
                                <IconDelete/>
                            </button>
                        </div>
                        <div className="dicscription">Must be JPEG, JPG, PNG and cannot exceed 2MB.</div>
                    </div>
                </div>
            </div>
            <h3>Profile Settings</h3>
            <div className="dicscription">Identification details for your account</div>
            <div className="box">
                <div className="inner-box">
                    <div className="flex space-between">
                        <div className="input-control wd50">
                            <label>Full Name *</label>
                            <input name="text" placeholder={"Enter here"} className="grey-bg" />
                            <span className="errorMessage"></span>
                        </div>
                        <div className="input-control wd50">
                            <div className="flex space-between flex-center">
                                <label htmlFor="usr">Username *</label>
                                <button className="verify-email-btn">Verify email to update your username</button>
                            </div>
                            <input name="text" placeholder={"Enter here"} id="usr" className="grey-bg" />
                            <span className="errorMessage"></span>
                        </div>
                    </div>
                    <div className="input-control">
                        <div className="flex space-between flex-center">
                            <label htmlFor="bio">Bio</label>
                            <div className="max-limit">Max. 300 characters</div>
                        </div>
                        <textarea name="" id="bio" placeholder={"Enter here"} className="grey-bg"></textarea>
                        <span className="errorMessage"></span>
                    </div>
                </div>
            </div>
            <h3>Social Share Links</h3>
            <div className="box">
                <div className="inner-box">
                    <div className="flex space-between">
                        <div className="input-control">
                            <label>Twitter</label>
                            <input name="text" placeholder={"Enter your profile url"} className="grey-bg" />
                            <span className="errorMessage"></span>
                        </div>
                        <div className="input-control">
                            <div className="flex space-between flex-center">
                                <label htmlFor="usr">Facebook</label>
                            </div>
                            <input name="text" placeholder={"Enter your profile url"} id="usr" className="grey-bg" />
                            <span className="errorMessage"></span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="button-wrapper flex mb40">
                <button className="border-btn mr16">Cancel</button>
                <button className="primary-btn disable">Save</button>
            </div>
            <h3>Delete Your Blazing Cards Account</h3>
            <div className="dicscription">This will completely deactivate your account</div>
            <div className="box inline">If you want to delete your Blazing Cards account, Please click on <span className="link">Delete Account</span></div>
        </div>
    );
}