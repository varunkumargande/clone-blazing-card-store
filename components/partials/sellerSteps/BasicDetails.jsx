import React from "react";
import IconUpload from "../../Icons/IconUpload";
import IconBack from '../../Icons/IconBack';
export default function BasicDetails(){
    return(
        <div className="step-container">
            <h3 className="flex flex-center"><div className="edit-back"><IconBack/></div>Basic Details</h3>
            <div className="sub-title">Blazing Cards takes marketplace safety seriously. Sellers must have a valid payment method on file. In rare occasions, sellers are charged a $100 fee for severe or repeated infractions of our policies.</div>
            <form>
                <div className="flex space-between">
                    <div className="input-control wd48">
                        <label>Full Name *</label>
                        <input type="text" name="Full Name" placeholder={"Enter here"} />
                    </div>
                    <div className="input-control wd48">
                        <label>SSN *</label>
                        <input type="text" name="ssn" placeholder={"Enter here"} />
                    </div>
                </div>
                <div className="flex space-between">
                    <div className="input-control wd48">
                        <label>Address *</label>
                        <input type="text" name="address" placeholder={"Enter here"} />
                    </div>
                </div>
                <div className="flex space-between">
                    <div className="input-control wd48">
                        <label htmlFor="upload">Upload Doc *</label>
                        <label className="upload flex column justify-center flex-center">
                            <input id="upload" type="file" name="Upload" placeholder={"Enter here"} />
                            <IconUpload />
                            <span className="drag">Drag & Drop your files here</span>
                            <span className="primary-btn">Upload</span>
                        </label>
                    </div>
                </div>
                <div className="submit-wrapper flex space-between">
                    <button className="border-btn">Cancel</button>
                    <button className="primary-btn disable">Save & Next</button>
                </div>
            </form>
        </div>
    );
}