import React from "react";
//import {ConnectPlugin}   from "../../connectPlugins";
import {contactApi} from "../../../api";
import { useState } from 'react';
import {EmailValidator} from "../../helper/emailValidator";
import {useTranslation} from '../../../i18n';
function ContactComp(){
    const [name,setName]=useState("")
    const [nameError,setNameError]=useState("")
    const [mail,setMail]=useState("")
    const [mailError,setMailError]=useState("")
    const [phone,setPhone]=useState("")
    const [phoneError,setPhoneError]=useState("")
    const [message,setMessage]=useState("")
    const [messageError,setMessageError]=useState("")
    const [submit,setSubmit]=useState(0)
    const { t } = useTranslation('common');
    const handleSubmit=(e)=>{
        e.preventDefault()
        setSubmit(1)
        if(name!==""&&mail!==""&&phone!==""&&message!==""&&message.length>=6&&mailError===""){

                contactApi(name,mail,phone,message)
        }
        else{
            if(name===""){
                setNameError("Name is required")
            }
            if(mail===""){
                setMailError("Mail is required")
            }
            if(phone===""){
                setPhoneError("Phone number is required")
            }
            if(message===""){
                setMessageError("Message is required")
            }
        }
    }

    const emailCheck=(value)=>{
        
        if(EmailValidator(value)){
            setMail(value)
            setMailError("")
        }
        else{ 
            setMail(value)
            setMailError("Please enter a valid email")
        }
    }

    const messageValid=(value)=>{
        setMessage(value)
        if(value.length>=6){
            setMessageError("")
        }
        else{
            setMessageError("Minimum 6 characters is required")
        }
    }

    return( 
        <div className="ct-container">
            <div className="ct-left-container">
                <h3>{t('contact.CONTACTUS')}</h3>
                <div className="ct-form-container">
                    <div className="ct-ip-container">
                        <p>{t('contact.Name')} *</p>
                        <input placeholder={t('contact.Name')} value={name} onChange={e=>setName(e.target.value)} style={{border:submit===1&&name===""&& "1px solid red"}}/>
                        {submit===1&&name===""&&<div className="error-div">{nameError}</div>}
                    </div>
                    <div className="ct-ip-container">
                        <p>{t('contact.Email')} *</p>
                        <input placeholder="Email" value={mail} onChange={e=>emailCheck(e.target.value)} style={{border:mailError && "1px solid red"}}/>
                        {submit===1&&mailError!==""&&<div className="error-div">{mailError}</div>}
                    </div>
                    <div className="ct-ip-container">
                        <p>{t('contact.Phone')} *</p>
                        <input placeholder={t('contact.Phone')} value={phone} onChange={e=>setPhone(e.target.value)} type="number" style={{border:submit===1&&phone===""&& "1px solid red"}}/>
                        {submit===1&&phone===""&&<div className="error-div">{phoneError}</div>}
                    </div>
                    <div className="ct-ip-container">
                        <p>{t('contact.Message')} *</p>
                        <textarea placeholder={t('contact.Message')} value={message} onChange={e=>messageValid(e.target.value)} style={{border:messageError && "1px solid red"}}/>
                        {submit===1&&messageError!==""&&<div className="error-div">{messageError}</div>}
                    </div>
                    <div className="ct-button-container">
                        <button onClick={e=>handleSubmit(e)}>{t('contact.Submit')}</button>
                    </div>
                </div>
            </div>
            <div className="ct-right-container">
                <img src="/static/img/contact-img.svg"/>
            </div>
        </div>
    )
}

export default ContactComp;