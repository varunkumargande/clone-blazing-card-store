import React, { Component } from "react";
//import {ConnectPlugin} from '../../connectPlugins';
import Link from "next/link";
import { useEffect, useState } from "react";
import Router from "next/router";
import AccountNav from "../../elements/AccountNav";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailValidator,
  upperPresent,
  lowerPresent,
  numPresent,
  specialPresent,
} from "../../helper/emailValidator";
// import { upperPresent, lowerPresent, numPresent, specialPresent } from './PasswordValidation'
import { useTranslation } from "../../../i18n";
import { changePasswordApi, editProfileApi } from "../../../api";
import { useRef } from "react";
import { imageUrl } from "../../../api/url";
import Head from "next/head";
import { toast } from "react-toastify";
import ToastMessage from "../../../api/toast";

function InformationCustom() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  const [userDetail, setUserDetail] = useState("");
  const [mailValid, setMailValid] = useState("");
  const [submit, setSubmit] = useState(0);
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [numError, setNumError] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassError, setNewPassError] = useState([]);
  const [oldPassError, setOldPassError] = useState("");
  const [passSubmit, setPassSubmit] = useState(0);
  const [newDp, setNewDp] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [passButtonLoader, setPassButtonLoader] = useState(false);
  const inputFile = useRef(null);
  const [newDpError, setNewDpError] = useState("");
  const [impuploadsuccess, setimpuploadsuccess] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  useEffect(() => {
    if (localStorage.getItem("blazingUser")) {
      setUserDetail(JSON.parse(localStorage.getItem("blazingUser")));
      setFname(JSON.parse(localStorage.getItem("blazingUser")).firstName);
      let lname =
        JSON.parse(localStorage.getItem("blazingUser")).lastName === null
          ? ""
          : JSON.parse(localStorage.getItem("blazingUser")).lastName;

      setLname(lname);
      setEmail(JSON.parse(localStorage.getItem("blazingUser")).email);
      setNum(JSON.parse(localStorage.getItem("blazingUser")).mobileNumber);
      JSON.parse(localStorage.getItem("blazingUser")).avatar &&
        setNewDp(
          imageUrl +
            "?path=" +
            JSON.parse(localStorage.getItem("blazingUser")).avatarPath +
            "&name=" +
            JSON.parse(localStorage.getItem("blazingUser")).avatar +
            "&width=500&height=500"
        );
    }
  }, []);

  const changeDP = (e) => {
    setNewDpError("");
    // setImageUrl(URL.createObjectURL(e.target.files[0]))
    const { files } = e.target;
    if (files && files[0] && files[0].name.match(/\.(jpg|jpeg|png)$/)) {
      const fsize = files[0].size;
      const file = Math.round(fsize / 1024);

      if (file < 2048) {
        // setNewDp(files[0])
        let reader = new FileReader();

        reader.readAsDataURL(files[0]);

        reader.onloadend = () => setNewDp(reader.result);
        setimpuploadsuccess(true);
      } else {
        //  ToastMessage ({ type: 'error', message: "Please upload minimum 2 MB" });
        setNewDpError("Please upload minimum 2 MB");
        // notification[type]({
        //     message: "Cannot add more than 3 product",
        //     description: '',
        //     duration: 2,
        // });
        //toast({ type: 'error', message: "Cannot add more than 3 product" });
      }

      // let reader = new FileReader()

      // reader.readAsDataURL(files[0])

      // reader.onloadend = () => setNewDp(reader.result)
    }
  };

  const changeHandlerPassword = (name, value) => {
    if (name === "oldPass") {
      if (value === "") {
        setOldPassError("Current password is required");
        setOldPass(value);
      } else {
        setOldPass(value);
        setOldPassError("");
      }
    }
    if (name === "newPass") {
      if (value === "") {
        setNewPassError(["New password is required"]);
        setNewPass(value);
      } else {
        setPassSubmit(1);
        setNewPass(value);
        let arrayValue = [];
        if (!upperPresent(value)) {
          arrayValue.push("Must contain at least 1 in Capital Case!");
        }
        if (!numPresent(value)) {
          arrayValue.push("Must have at least 1 Number");
        }
        if (!lowerPresent(value)) {
          arrayValue.push("Must contain at least 1 Lower Case!");
        }
        if (!specialPresent(value)) {
          arrayValue.push("Must contain at least 1 Special characters!");
        }
        if (value.length < 8) {
          arrayValue.push("Must be at least 8 characters!");
        }
        if (arrayValue.length > 0) {
          setNewPassError(arrayValue);
        } else {
          setNewPassError([]);
        }
      }
    }
  };

  const validate = () => {
    if (fname === "") {
      setFnameError("First name is required");
    } else {
      setFnameError("");
    }

    if (lname === "") {
      setLnameError("Last name is required");
    } else {
      setLnameError("");
    }

    if (EmailValidator(email)) {
      setMailValid("");
    } else {
      if (email.length !== 0) {
        setMailValid("Please enter a valid email");
      } else {
        setMailValid("Email is required");
      }
    }

    if (num.length === 0) {
      setNumError("Mobile number is required");
    } else if (num.length < 4) {
      setNumError("Must be at least 4 numbers long");
    } else {
      setNumError("");
    }
  };

  const onChangeHandler = (name, value) => {
    // switch (name) {
    //login form validators
    if (name === "fname") {
      var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
      var regex = new RegExp(roleExpression);
      var t = value;
      if (!t.match(regex)) {
        if (value === "") {
          setFnameError("First name is required");
          setFname(value);
        } else {
          setFname(value);
          setFnameError("");
        }
      }
    }
    if (name === "lname") {
      var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
      var regex = new RegExp(roleExpression);
      var t = value;
      if (!t.match(regex)) {
        if (value === "") {
          setLname(value);
          setLnameError("Last name is required");
        } else {
          setLname(value);
          setLnameError("");
        }
      }
    }

    // const validnumber=(value)=>{
    //     var roleExpression = /[^0-9]/g;
    //     var regex = new RegExp(roleExpression);
    //     var t = value;
    //     if (!t.match(regex)) {
    //         setNumber(value)
    //     }
    //         if (submit) {
    //             if(t.length === 0){
    //                 setNumValid("Phone number is required")
    //             }
    //             else {
    //                 setNumValid("")
    //             }
    //         }
    //     // }

    // }
    if (name === "num") {
      var roleExpression = /[^0-9]/g;
      var regex = new RegExp(roleExpression);
      var t = value;
      // value.length <= 15 && setNum(value)
      if (!t.match(regex)) {
        setNum(value);
        // if (submit) {
        if (value) {
          setNumError("");
        } else {
          setNumError("Mobile number is required");
        }
        // }
      }
    }
    // if(name==='num'){
    //     setNum(value)
    //     if(value.length === 0){
    //         setNumError("Mobile number is required")
    //     } else if(value.length<4) {
    //         setNumError("Must be at least 4 numbers long")
    //     } else {
    //         setNumError("")
    //     }
    // }
    if (name === "email") {
      if (EmailValidator(value)) {
        setEmail(value);
        setMailValid("");
      } else {
        if (value.length !== 0) {
          setEmail(value);
          setMailValid("Please enter a valid email");
        } else {
          setEmail(value);
          setMailValid("Email is required");
        }
      }
    }
  };

  const handleLoginSubmit = () => {
    setSubmit(1);
    if (
      fname === "" ||
      email === "" ||
      num === "" ||
      lname === "" ||
      fnameError !== "" ||
      mailValid !== "" ||
      numError !== "" ||
      lnameError !== ""
    ) {
      validate();
      return;
    } else {
      setButtonLoader(true);
      editProfileApi(
        fname,
        lname !== undefined ? lname : "",
        email,
        num,
        Router,
        impuploadsuccess === true ? newDp : "",
        setButtonLoader,
        setimpuploadsuccess
      );
    }
  };

  const handlePassSubmit = () => {
    setPassSubmit(1);
    if (
      newPass === "" ||
      oldPass === "" ||
      oldPassError !== "" ||
      newPassError.length !== 0
    ) {
      passVaildator();
    } else {
      setPassButtonLoader(true);
      changePasswordApi(
        oldPass,
        newPass,
        setPassButtonLoader,
        setOldPass,
        setNewPass,
        setOldPassError,
        setNewPassError,
        setPassSubmit
      );
    }
    // if(newPass===""||newPass.length<5||oldPass===""||oldPass.length<5){
    //     if(newPass===""){
    //         setNewPassError("*New password is required")
    //     }
    //     if(newPass.length<5){
    //         setNewPassError("*Minimum 5 characters is required")
    //     }
    //     if(oldPass===""){
    //         setOldPassError("*Current password is required")
    //     }
    //     if(oldPass.length<5){
    //         setOldPassError("*Minimum 5 characters is required")
    //     }
    // }
    // else{
    //     setPassButtonLoader(true)
    //     changePasswordApi(oldPass,newPass,setPassButtonLoader)
    // }
  };

  const passVaildator = () => {
    if (oldPass.length === 0) {
      setOldPassError("Password is required");
    } else {
      setOldPassError("");
    }

    if (newPass.length === 0) {
      setNewPassError(["Password is required"]);
    } else {
      // setNewPass(value)
      let arrayValue = [];
      if (!upperPresent(newPass)) {
        arrayValue.push("Must contain at least 1 in Capital Case!");
      }
      if (!numPresent(newPass)) {
        arrayValue.push("Must have at least 1 Number");
      }
      if (!lowerPresent(newPass)) {
        arrayValue.push("Must contain at least 1 Lower Case!");
      }
      if (!specialPresent(newPass)) {
        arrayValue.push("Must contain at least 1 Special characters!");
      }
      if (newPass.length < 8) {
        arrayValue.push("Must be at least 8 characters!");
      }
      if (arrayValue.length > 0) {
        setNewPassError(arrayValue);
      } else {
        setNewPassError([]);
      }
    }
  };

  function isUpper(str) {
    const pattern = new RegExp(" /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$/");
    // return /^(?=.*[A-Z]).+$/.test("D");
    // return   ;
    return /(\d)([!@#$%^&*(),.?":{}|<>])/.test("dsdsd1#");
  }

  return (
    <section className="cus-account-container">
      <div className="cus-account-subcontainer">
        <Head>
          <title>Account Information</title>
        </Head>
        <div className="cus-position-container">
          <AccountNav keyValue={2} />
          <div className="cus-right-position">
            <div className="cus-right-subcontainer">
              <h3>{t("account.AccountInformation")}</h3>
              <div className="cus-parent-card-container">
                <div className="cus-card-row">
                  <div
                    className="cus-card-account-row"
                    style={{ padding: "20px!important" }}
                  >
                    <div className="cinfo-card-center">
                      <h2>{t("account.AccountDetails")}</h2>
                      <div className="cinfo-image-contain">
                        <img
                          src={newDp ? newDp : "/static/img/user.jpg"}
                          alt=""
                          onClick={(e) => inputFile.current.click()}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          name=""
                          id="file"
                          class="file"
                          ref={inputFile}
                          onChange={(e) => changeDP(e)}
                        />
                        {/* <small style={{marginLeft:"55px",marginTop:"80px"}}>Support (.png .jpg .jpeg) Format & below 2MB Files allowed</small> */}
                        {newDpError === "" ? (
                          <small
                            style={{ marginLeft: "55px", marginTop: "82px" }}
                          >
                            Support (.png .jpg .jpeg) Format & below 2MB Files
                            allowed
                          </small>
                        ) : (
                          <small
                            className="error-span"
                            style={{ marginLeft: "110px", marginTop: "80px" }}
                          >
                            {newDpError}
                          </small>
                        )}
                      </div>
                      <div className="cinfo-input-container">
                        <p>{t("account.FirstName")} *</p>
                        <input
                          name="fname"
                          placeholder={t("account.FirstName")}
                          maxLength="30"
                          value={fname}
                          onChange={(e) =>
                            onChangeHandler(e.target.name, e.target.value)
                          }
                          spellCheck="false"
                          style={{ border: fnameError && "1px solid red" }}
                        />
                        {fnameError !== "" ? (
                          <span className="error-span">{fnameError}</span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="cinfo-input-container">
                        <p>{t("account.LastName")} *</p>
                        <input
                          name="lname"
                          placeholder={t("account.LastName")}
                          maxLength="30"
                          value={lname}
                          onChange={(e) =>
                            onChangeHandler(e.target.name, e.target.value)
                          }
                          spellCheck="false"
                          style={{ border: lnameError && "1px solid red" }}
                        />
                        {lnameError !== "" ? (
                          <span className="error-span">{lnameError}</span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="cinfo-input-container">
                        <p>Email *</p>
                        <input
                          name="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) =>
                            onChangeHandler(e.target.name, e.target.value)
                          }
                          spellCheck="false"
                          style={{ border: mailValid && "1px solid red" }}
                        />
                        {mailValid !== "" ? (
                          <span className="error-span">{mailValid}</span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="cinfo-input-container">
                        <p>{t("account.PhoneNumber")} *</p>
                        <input
                          name="num"
                          maxLength="15"
                          placeholder={t("account.PhoneNumber")}
                          value={num}
                          onChange={(e) =>
                            onChangeHandler(e.target.name, e.target.value)
                          }
                          spellCheck="false"
                          style={{ border: numError && "1px solid red" }}
                        />
                        {numError !== "" ? (
                          <span className="error-span">{numError}</span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="cinfo-btn-contain">
                        <button onClick={(e) => handleLoginSubmit()}>
                          {t("account.Save")}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="cus-card-account-row"
                    style={{ padding: "20px!important" }}
                  >
                    <div className="cinfo-card-center">
                      <h2>{t("account.ChangePassword")}</h2>
                      <div className="cinfo-image-contain-pass">
                        <img src="/static/img/lock.svg" alt="" />
                      </div>
                      <div className="cinfo-input-container">
                        <p>{t("account.CurrentPassword")} *</p>
                        <input
                          placeholder={t("account.CurrentPassword")}
                          spellCheck="false"
                          type="password"
                          name="oldPass"
                          value={oldPass}
                          onChange={(e) =>
                            changeHandlerPassword(e.target.name, e.target.value)
                          }
                          style={{ border: oldPassError && "1px solid red" }}
                        />
                        {oldPassError !== "" ? (
                          <span className="error-span">{oldPassError}</span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="cinfo-input-container">
                        <p>{t("account.NewPassword")} *</p>
                        <input
                          placeholder={t("account.NewPassword")}
                          spellCheck="false"
                          name="newPass"
                          type="password"
                          value={newPass}
                          onChange={(e) =>
                            changeHandlerPassword(e.target.name, e.target.value)
                          }
                          style={{
                            border:
                              newPassError.length !== 0 &&
                              newPassError &&
                              "1px solid red",
                          }}
                        />
                        {newPassError.length !== 0 &&
                          newPassError &&
                          newPassError.map((error) => (
                            <div>
                              <span className="error-span">{error}</span>
                            </div>
                          ))}
                      </div>
                      <div className="cinfo-btn-contain">
                        <button onClick={(e) => handlePassSubmit()}>
                          {t("account.Change")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InformationCustom;
