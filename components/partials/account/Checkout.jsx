import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import { useState } from 'react';
import { useEffect } from 'react';
import { addressListApi, ApplyCouponApi, checkOutApi, countryListApi, removeFromCartApi, addToCartApi } from '../../../api';
import { useTranslation } from '../../../i18n'
import { Collapse } from 'antd';
import { cartRemove, decrementQuantity, incrementQuantity } from '../../helper/cartHelper';
import { addItem, decreaseItemQty, increaseItemQty, removeItem } from '../../../store/cart/action';
import { imageUrl } from '../../../api/url';
import { getPaymentApi } from '../../../api';
import { Radio } from 'antd';
import { EmailValidator,upperPresent,lowerPresent,numPresent,specialPresent } from '../../helper/emailValidator';
import { zoneListApi } from '../../../api/account/zoneList';
import FormCheckoutBilling from './modules/FormCheckoutBilling';
import FormCheckoutBillingInformation from './modules/FormCheckoutBilling';
import { editDetail } from '../../../store/setting/action';
import Router from 'next/router';
import { priceHelpFunc } from '../../helper/priceHelper';


const { Panel } = Collapse;


function Checkout() {
    const [cartItems, setCartItems] = useState("")
    const [details, setDetail] = useState("")
    const [totalData, setTotalData] = useState("")
    const [addressData, setAddressData] = useState([])
    const [addressLoader, setAddressLoader] = useState(false)
    const [couponInput, setCouponInput] = useState("")
    const [couponProduct, setCouponProduct] = useState("")
    const [discountedPrice, setDiscountedPrice] = useState("")
    const [coupandata,setcoupdata]=useState("")
    const [appliedName, setAppliedName] = useState("")
    // const [skunameadd,setskuname]=useState("")
    const [appliedProductArray, setAppliedProductArray] = useState([])
    const [paymentOption, setPaymentOption] = useState([])
    const [name, setName] = useState("")
    const [lname, setLname] = useState("")
    const [mail, setMail] = useState("")
    const [number, setNumber] = useState("")
    const [nameValid, setNameValid] = useState("")
    const [mailValid, setMailValid] = useState("")
    const [numValid, setNumValid] = useState("")
    const [nameFocus, setNameFocus] = useState(false)
    const [mailFocus, setMailFocus] = useState(false)
    const [numFocus, setNumFocus] = useState(false)
    const [lnameFocus, setLnameFocus] = useState(false)
    const [method, setMethod] = useState()
    const [gstNumber, setGstNumber] = useState("")
    const [gstNumberValid, setGstNumberValid] = useState("")
    const [gstNumberFocus, setGstNumberFocus] = useState(false)
    const [gstClick, setGstClick] = useState(false)
    const [accountPassword, setAccountPassword] = useState(false)
    const [paymentvalid, setPaymentValid] = useState("")
    const [gstvalid, setGstValid] = useState("")
    const { t } = useTranslation('common');
    let removeFromCart = useSelector(s => s.cart.removeproduct)
    let reloadCart = useSelector(s => s.cart.addproduct)
    let incrementLoad = useSelector(s => s.cart.increment)
    let decrementLoad = useSelector(s => s.cart.decrement)
    const dispatch = useDispatch()

    const [fname, setFname] = useState("")
    const [l1name, setL1name] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [address1, setAddress1] = useState("")
    const [city, setCity] = useState("")
    const [postCode, setPostCode] = useState("")
    const [num, setNum] = useState("")
    let currentColor = useSelector(s => s.palette.currentColor)
    const [countryId, setCountryId] = useState("")
    const [countryData, setCountryData] = useState([])
    const [countryName, setCountryName] = useState("")
    const [fnameError, setFnameError] = useState("")
    const [numError, setNumError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [addressError, setAddressError] = useState("")
    const [cityError, setCityError] = useState("")
    const [postalError, setPostalError] = useState("")
    const [countryError, setCountryError] = useState("")
    const [zoneData, setZoneData] = useState([])
    const [zoneComp, setZoneComp] = useState([])
    const [zoneId, setZoneId] = useState("")
    const [zoneName, setZoneName] = useState("")
    const [zoneError, setZoneError] = useState("")

    //billing address 
    const [fname1, setFname1] = useState("")
    const [l1name1, setL1name1] = useState("")
    const [email1, setEmail1] = useState("")
    const [address111, setAddress111] = useState("")
    const [address11, setAddress11] = useState("")
    const [city1, setCity1] = useState("")
    const [postCode1, setPostCode1] = useState("")
    const [num1, setNum1] = useState("")
    // let currentColor=useSelector(s=>s.palette.currentColor)
    const [countryId1, setCountryId1] = useState("")
    const [countryData1, setCountryData1] = useState([])
    const [countryName1, setCountryName1] = useState("")
    const [fnameError1, setFnameError1] = useState("")
    const [numError1, setNumError1] = useState("")
    const [emailError1, setEmailError1] = useState("")
    const [addressError1, setAddressError1] = useState("")
    const [cityError1, setCityError1] = useState("")
    const [postalError1, setPostalError1] = useState("")
    const [countryError1, setCountryError1] = useState("")
    const [zoneData1, setZoneData1] = useState([])
    const [zoneComp1, setZoneComp1] = useState([])
    const [zoneId1, setZoneId1] = useState("")
    const [zoneName1, setZoneName1] = useState("")
    const [zoneError1, setZoneError1] = useState("")
    // const [address1,setAddress1]=useState("")

    const [billToSame, setBillToSame] = useState(true)
    const [billToSameAddress, setBillToSameAddress] = useState(true)
    const [cpasswordFocus, setCpasswordFocus] = useState(false)
    const [cpassword, setCpassword] = useState("")
    const [cpasswordValid, setCpasswordValid] = useState([])
    const [couponApplied, setCouponApplied] = useState(false)
    const[couponError,setCounponError]=useState("")
    const [prevAddressRadio, setPrevAddressRadio] = useState(false)
    const [prevAddressRadioValid, setPrevAddressRadioValid] = useState("")
    const [prevAddressBillRadioValid, setPrevAddressBillRadioValid] = useState("")
    const [prevAddressBillRadio, setPrevAddressBillRadio] = useState(false)
    const [dummy, setDummy] = useState()
    const [buttonLoader, setButtonLoader] = useState(false)
const[buttondisable,setbuttondisable]=useState(false)
    const [auth, setAuth]=useState(false)
    const [submit, setSubmit] = useState(0)
 
    let authValue = useSelector(s => s.auth)

    let arrayComp = []

    if (countryData !== []) {
        var len = countryData.length;
        for (var i = 0; i < len; i++) {
            arrayComp.push({
                value: countryData[i].countryId,
                label: countryData[i].name,
            });
        }
    }

    const apiCallFunc = () => {
        countryListApi(setCountryData)
        zoneListApi(setZoneData)
        zoneListApi(setZoneData1)
    }

  

    const couponSubmit = () => {

        if(couponInput==""){
            setCounponError("Please enter the coupon code")
        }else if(!couponApplied){
            ApplyCouponApi(couponInput, mail, couponProduct, setDiscountedPrice, setCouponApplied, setAppliedName, totalData,setcoupdata)
        }

        // if (!couponApplied) {
        //     ApplyCouponApi(couponInput, mail, couponProduct, setDiscountedPrice, setCouponApplied, setAppliedName, totalData,setcoupdata)
        // }

    }

    useEffect(() => {
       
        if (submit) {
           
            validate()
        }
    }, [fname, email, num, address, city, countryName, postCode, zoneName, gstNumber, fname1, address111, city1, postCode1, zoneName1, countryName, countryName1, cpassword, prevAddressRadio, prevAddressBillRadio, method])

    

    useEffect(() => {
        if (sessionStorage.getItem("spurtUser")) {
            setName(JSON.parse(sessionStorage.getItem("spurtUser")).firstName),
                setMail(JSON.parse(sessionStorage.getItem("spurtUser")).email),
                setNumber(JSON.parse(sessionStorage.getItem("spurtUser")).mobileNumber)
            setLname(JSON.parse(sessionStorage.getItem("spurtUser")).lastName)
        }
        
    }, [])

    const validate = () => {
        let validateObj = {
            fnameSub: true, numSub: true, addressSub: true, citySub: true, countryNameSub: true, postCodeSub: true, zoneNameSub: true,
            fname1Sub: true, num1Sub: true, address111Sub: true, city1Sub: true, countryName1Sub: true, postCode1Sub: true, zoneName1Sub: true, nameSub: true,
            mailSub: true, numberSub: true, methodSub: true, gstNumberSub: true, cpasswordSub: true, prevAddressRadioValidSub: true, prevAddressBillRadioValidSub: true,
        }
        


        if (addressData && addressData.length === 0) {
            if (fname === "") {
                setFnameError("Name is required")
                validateObj.fnameSub = false;
            } else {
                setFnameError("")
                validateObj.fnameSub = true;
            }

            

            if (address === "") {
                setAddressError("Address is required")
                validateObj.addressSub = false;
            }
            else {
                setAddressError("")
                validateObj.addressSub = true;
            }

            if (city === "") {
                setCityError("City is required")
                validateObj.citySub = false;
            }
            else {
                setCityError("")
                validateObj.citySub = true;
            }

            if (countryName === "") {
                setCountryError("Country is required")
                validateObj.countryNameSub = false;
            }
            else {
                setCountryError("")
                validateObj.countryNameSub = true;
            }

            if (postCode === "") {
                setPostalError("Post code is required")
                validateObj.postCodeSub = false;
            }
            else {
                setPostalError("")
                validateObj.postCodeSub = true;
            }

            if (zoneName === "") {
                setZoneError("State is required")
                validateObj.zoneNameSub = false;
            }
            else {
                setZoneError("")
                validateObj.zoneNameSub = true;
            }
        }

        if (!billToSame) {
            if (fname1 === "") {
                setFnameError1("Name is required")
                validateObj.fname1Sub = false;
            } else {
                setFnameError1("")
                validateObj.fname1Sub = true;
            }

            // if(num1 === "") {
            //     setNumError1("Number is required")
            //     validateObj.num1Sub = false;
            // }
            // else{
            //     setNumError1("")
            //     validateObj.num1Sub = true;
            // }

            if (address111 === "") {
                setAddressError1("Address is required")
                validateObj.address111Sub = false;
            }
            else {
                setAddressError1("")
                validateObj.address111Sub = true;
            }

            if (city1 === "") {
                setCityError1("City is required")
                validateObj.city1Sub = false
            }
            else {
                setCityError1("")
                validateObj.city1Sub = true
            }

            if (countryName1 === "") {
                setCountryError1("Country is required")
                validateObj.countryName1Sub = false;
            }
            else {
                setCountryError1("")
                validateObj.countryName1Sub = true;
            }

            if (postCode1 === "") {
                setPostalError1("Post code is required")
                validateObj.postCode1Sub = false;
            }
            else {
                setPostalError1("")
                validateObj.postCode1Sub = true;
            }

            if (zoneName1 === "") {
                setZoneError1("State is required")
                validateObj.zoneName1Sub = false;
            }
            else {
                setZoneError1("")
                validateObj.zoneName1Sub = true;
            }
        }

        if (name === "") {
            // setName(value)
            // if(submit) {
            if (name.length < 3 && name.length !== 0) {
                setNameValid("Minimum of 3 characters")
                validateObj.nameSub = false;
            }
            else if (name.length === 0) {
                setNameValid("First name is required")
                validateObj.nameSub = false;
            }
            else {
                setNameValid("")
                validateObj.nameSub = true;
            }
            // }
        }

        // if(name === "lastname") {
        //     setLname(value)
        // }

        if (mail === "") {
            if (mail) {
                let emailCheck = EmailValidator(mail)
                if (emailCheck) {
                    setMailValid("")
                    validateObj.mailSub = true;
                }
                else {
                    setMailValid("Invalid email address")
                    validateObj.mailSub = false;
                }
            }
            else {
                setMailValid("Email is required")
                validateObj.mailSub = false;
            }
        }

        if (number === "") {
            if (number) {
                setNumValid("")
                validateObj.numberSub = true;
            }
            else {
                setNumValid("Number is required")
                validateObj.numberSub = false;
            }
        }

        if (method === undefined) {
            setPaymentValid("Select one of these payment method.")
            validateObj.methodSub = false;
        } else {
            setPaymentValid("")
            validateObj.methodSub = true;
        }

        if (gstClick && gstNumber === "") {
            setGstValid("GST number is required")
            validateObj.gstNumberSub = false;
        } else {
            setGstValid("")
            validateObj.gstNumberSub = true;
        }

        if ( accountPassword && cpassword.length === 0) {
            setCpasswordValid(["Password is required"])
            validateObj.cpasswordSub = true;
        }
        //  else if (!authValue.isLoggedIn && accountPassword && cpassword.length <= 8) {
        //     setCpasswordValid([" Password isn't long enough, minimum of 8 characters"])
        //     validateObj.cpasswordSub = false;
       // }
         else  {
            let arrayValue = []
            if (!upperPresent(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must contain at least 1 in Capital Case!")
            }
            if (!numPresent(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must have at least 1 Number")
            }
            if (!lowerPresent(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must contain at least 1 Lower Case!")
            }
            if (!specialPresent(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must contain at least 1 Special characters!")
            }
            if (!authValue.isLoggedIn && accountPassword && cpassword.length < 8) {
                arrayValue.push("Must be at least 8 characters!")
            }
            if (arrayValue.length > 0) {
                validateObj.cpasswordSub = false
            } else {
                validateObj.cpasswordSub = true
            }
            validateObj.cpasswordSub = true
            setCpasswordValid(arrayValue)

            // setCpasswordValid("")
            // validateObj.cpasswordSub = true;

        }


        if (authValue.isLoggedIn && !prevAddressRadio) {
            setPrevAddressRadioValid("Select one of these address.")
            validateObj.prevAddressRadioValidSub = false;
        } else {
            setPrevAddressRadioValid("")
            validateObj.prevAddressRadioValidSub = true;
        }

        if (authValue.isLoggedIn && !billToSameAddress && !prevAddressBillRadio) {
            setPrevAddressBillRadioValid("Select one of these address.")
            validateObj.prevAddressBillRadioValidSub = false;
        } else {
            setPrevAddressBillRadioValid("")
            validateObj.prevAddressBillRadioValidSub = true;
        }

       

        if (validateObj.fnameSub && validateObj.fname1Sub && validateObj.numSub && validateObj.num1Sub && validateObj.addressSub && validateObj.postCodeSub && validateObj.postCode1Sub && validateObj.zoneNameSub && validateObj.zoneName1Sub && validateObj.address111Sub && validateObj.countryNameSub && validateObj.countryName1Sub && validateObj.nameSub && validateObj.mailSub && validateObj.methodSub &&
            validateObj.gstNumberSub && validateObj.cpasswordSub && validateObj.prevAddressRadioValidSub && validateObj.prevAddressBillRadioValidSub && validateObj.citySub && validateObj.city1Sub) {
            return true;
        } else {
            return false;
        }

        // if( fnameError=== "" && numError === "" && emailError === "" && addressError === "" && cityError === "" && postalError === "" && countryError === "" && zoneError === "" && fnameError1 === "" && numError1 === "" &&  emailError1 === "" && addressError1 === "" && 
        // cityError1 === "" && postalError1 === "" && countryError1 === "" && zoneError1 === "" && cpasswordValid === "" && prevAddressRadioValid === "" && prevAddressBillRadioValid === "" && nameValid === "" && mailValid === "" && numValid === "" && paymentvalid === "") {
        //     return true;
        // } else {
        //     return false;
        // }
    }

    const addressSelect = (e, address) => {
     
        setPrevAddressRadio(true)
        setAddress(address.address1)
        setAddress1(address.address2)
        setCity(address.city)
        setPostCode(address.postcode)
        setCountryId(address.countryId)
        setZoneName(address.state)
        setFname(address.company)

        if (billToSameAddress) {
       
            setPrevAddressBillRadio(true)
            setAddress11(address.address1)
            setAddress111(address.address2)
            setCity1(address.city)
            setPostCode1(address.postcode)
            setCountryId1(address.countryId)
            setZoneName1(address.state)
            setFname1(address.company)
        }
       
    }

    const billAddressSelect = (e, billAddress) => {
        setPrevAddressBillRadio(true)
        setAddress11(billAddress.address1)
        setAddress111(billAddress.address2)
        setCity1(billAddress.city)
        setPostCode1(billAddress.postcode)
        setCountryId1(billAddress.countryId)
        setZoneName1(billAddress.state)
        setFname1(billAddress.company)
    }


    const handleChangePaymentMethod = e => {
        setMethod(e.target.value)
        // this.setState({ method: e.target.value });
    };

    const detailCart = () => {
        let cartLocale = JSON.parse(sessionStorage.getItem("cartItem"))
        let cartFinal = {}
        let cartArray = []
        
        cartLocale.forEach((product) => {
            // cartFinal.productId=product.productId
            // cartFinal.productPrice=product.price
            // cartFinal.quantity=product.quantity
            // cartFinal.total=product.price*product.quantity

            cartFinal = { productId: product.productId, productPrice: product.price, quantity: product.quantity,skuName:product.skuName, total: product.price * product.quantity }

            cartArray.push(cartFinal)
            setCouponProduct(cartArray)



        }
        )
       

    }

    const totalInCart = () => {
        const locale = JSON.parse(sessionStorage.getItem("cartItem"))
        var len = locale && locale.length;
        let detailArray = []
        for (var i = 0; i < len; i++) {
            detailArray.push(locale[i].price * locale[i].quantity)
        }
        var sum = detailArray.reduce(function (a, b) {
            return a + b;
        }, 0);
        setTotalData(sum)

    }

    const addressList = () => {
        addressListApi(setAddressData, setAddressLoader)
    }

    useEffect(() => {
        addressList()
        detailCart()
        getPaymentApi(setPaymentOption)
        apiCallFunc()
    }, [discountedPrice, totalData,coupandata])

    const radioStyle = {
        // display: 'block',
        // height: '70px',
        // lineHeight: '100px',
    };

    const arrayCreate = () => {
        const locale = JSON.parse(sessionStorage.getItem("cartItem"))
        var len = locale && locale.length;
        
        
        let detailArray = []
        for (var i = 0; i < len; i++) {
            let vendorids=locale[i].vendorId&&locale[i].vendorId?locale[i].vendorId:0
           
            // setskuname(locale[i].skuName)
           
            detailArray.push({
                productId: locale[i].productId,
                quantity: locale[i].quantity,
                price: locale[i].price,
                basePrice: locale[i].price,
                model: locale[i].name,
                name: locale[i].name+`(${locale[i].variantName})`,
                productVarientOptionId: "",
                taxType: null,
                taxValue: null,
                varientName: "",            
                skuName: locale[i].skuName,
                vendorId:vendorids
            });
           

        }
        
        setDetail(detailArray)

    }
    useEffect(() => {
        if (sessionStorage.getItem("spurtToken")) {
             setAuth(true);
        }
   }, []);


    useEffect(() => {
        setCartItems(JSON.parse(sessionStorage.getItem("cartItem")))
        arrayCreate()
        totalInCart()


    }, [reloadCart, removeFromCart, incrementLoad, decrementLoad])

    const handleIncreaseItemQty = (product) => {
       
        incrementQuantity(product)
        dispatch(increaseItemQty(product));
        dispatch(addItem(1))
        setCouponApplied(false)
        setDiscountedPrice("")
        setCouponInput("")
        console.log(product,'reeew');
        if(product.maxQuantityAllowedCart===product.quantity){
            return
        }
        
        if(auth){
            const localCart = JSON.parse(sessionStorage.getItem('cartItem'))
           
            let currentProduct=localCart.find((current)=>{
                return current.productId === product.productId
            })
            if(product.flag===""){
                addToCartApi(product.productId,priceHelpFunc(product.price,product.taxType,product.taxValue,""),currentProduct.quantity,"","",setDummy,product.skuName,"",product.variantId,product.variantName)
            }   
            else{
                
                addToCartApi(product.productId,priceHelpFunc(product.pricerefer,product.taxType,product.taxValue,""),currentProduct.quantity,"","",setDummy,product.skuName,"",product.variantId,product.variantName)
     
        }
        }
    }

    const handleDecreaseItemQty = (product) => {

        if(product.quantity !== 1){
            setCouponApplied(false)
            setDiscountedPrice("")
            setCouponInput("")
            decrementQuantity(product)
            dispatch(decreaseItemQty(product));
            dispatch(addItem(1))
            if(auth){
                const localCart = JSON.parse(sessionStorage.getItem('cartItem'))
                let currentProduct=localCart.find((current)=>{
                    return current.productId === product.productId
                })
                if(product.flag===""){
                    addToCartApi(product.productId,priceHelpFunc(product.price,product.taxType,product.taxValue,""),currentProduct.quantity,"","",setDummy,product.skuName,"",product.variantId,product.variantName)
                }   
                else{
                    addToCartApi(product.productId,priceHelpFunc(product.pricerefer,product.taxType,product.taxValue,""),currentProduct.quantity,"","",setDummy,product.skuName,"",product.variantId,product.variantName)
                }
            }
            } else {
                
               
                removeFromCartApi(product.productId,product.price,"",product.skuName)
                cartRemove(product)
                dispatch(removeItem(product))
                
            }

        
    }
    // const validNameFill = (value) => {
    //     var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
    //     var regex = new RegExp(roleExpression);
    //     var t = value;
    //     if (!t.match(regex)) {
    //       setFname(value);
    //     }
    //   };


    const registerOnChange = (e) => {
        const { name, value } = e.target;
       
        if (name === "fullname") {
            var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
            var regex = new RegExp(roleExpression);
            var t = value;
            if (!t.match(regex)) {
                setName(value)
            }
          
           
            // if(submit) {
            if (value.length < 3 && value.length !== 0) {
                setNameValid("Minimum of 3 characters")
            }
            else if (value.length === 0) {
                setNameValid("Full name is required")
            }
            else {
                setNameValid("")
            }
            // }
        }

        if (name === "lastname") {
            var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
            var regex = new RegExp(roleExpression);
            var t = value;
            if (!t.match(regex)) {
                setLname(value)
            }
          
            
        }

        if (name === "email") {
            setMail(value)
            // if(submit) {
            if (value) {
                let emailCheck = EmailValidator(value)
                if (emailCheck) {
                    setMailValid("")
                }
                else {
                    setMailValid("Invalid email address")
                }
            }
            else {
                setMailValid("Email is required")
            }
            
        }

        if (name === "number") {
            value.length <= 15 && setNumber(e.target.value)
            // if(submit) {
            if (value) {
                setNumValid("")
            }
            else {
                setNumValid("Phone number is required")
            }
            // }
        }

        if(name==="cpassname"){
            if(value===""){
                setCpasswordValid([" password is required"])
                setCpassword(value)
            }
            else{
             
                setCpassword(value)
                let arrayValue = []
                if (!upperPresent(value)) {
                    arrayValue.push("Must contain at least 1 in capital case!")
                }
                if (!numPresent(value)) {
                    arrayValue.push("Must have at least 1 Number")
                }
                if (!lowerPresent(value)) {
                    arrayValue.push("Must contain at least 1 lower case!")
                }
                if (!specialPresent(value)) {
                    arrayValue.push("Must contain at least 1 special characters!")
                }
                if (value.length < 8) {
                    arrayValue.push("Must be at least 8 characters!")
                }
                if (arrayValue.length > 0) {
                    setCpasswordValid(arrayValue)
                   
                } else {
                    
                    setCpasswordValid([])
                }
            }
        }
    }
  


    const cancelCoupon = () => {
        setCouponApplied(false)
        setDiscountedPrice("")
    }
    
    const onCheckoutApiCall = () => {
        
        setSubmit(1);
        
        validate();
        let any = validate()
       
        if (validate()) {
            
            setButtonLoader(true)
            setbuttondisable(true)
            checkOutApi(fname, lname, address, number, city, postCode, mail, details, method, address11, address111, postCode1, email1, city1, countryId1, countryId, zoneName1, zoneName, fname1, discountedPrice, couponInput, name, address1,setButtonLoader,coupandata,buttonLoader,cpassword,setbuttondisable)
           
        }
    }
   

    const EditAddress = (detail) => {
      
        dispatch(editDetail(detail));
        Router.push('/account/addaddresses_edit/[eaid]', `/account/addaddresses_edit/${detail.addressId}`)

    }

    const handleRemoveFromCart = (product) => {
        removeFromCartApi(product.productId, product.price, "", product.skuName, product.variantId, product.variantName)
        cartRemove(product)
        dispatch(removeItem(product))
    }

    const CouponOnchange=(e)=>{
        setCouponInput(e.target.value)
        setCounponError("")
    }
    
    return (
        
        <div className="cart-container">
         
           
            <div className="checkout-contaoner">
                <div className="custom-checkout-form">
                    <div className="custom-checkout-form-left">
                        <h2>{t('checkouts.FillYourInfo')}</h2>
                        <div className="custom-checkout-form-contact">
                            {/* <div className="custom-checkout-form-contact"> */}
                            <div className='custom-field-row'>
                                <input className="vendor-sign-input" maxLength="30" placeholder= {t('checkouts.FirstName')}  name="fullname"  value={name} onFocus={e => setNameFocus(true)} onBlur={e => { setNameFocus(false); registerOnChange(e) }}
                                    onChange={e => registerOnChange(e)} style={{borderColor: nameValid && "red"}}  />
                                {/* <label className={nameFocus || name !== "" ? "vendor-sign-label-focus checkout-form-label" :"vendor-sign-label checkout-form-label"} style={{color:nameValid && "red"}}>First Name *</label> */}
                                {nameValid !== "" && <span className='custom-field-error' style={{}}>{nameValid}</span>}
                            </div>
                            <div className='custom-field-row'>
                                <input className="vendor-sign-input" name="lastname" value={lname} placeholder={t('authentication.LastName')}
                                    onChange={e => registerOnChange(e)} onFocus={e => setLnameFocus(true)} onBlur={e => { setLnameFocus(false); registerOnChange(e) }} />
                                {/* <label className={lnameFocus || lname !=="" ? "vendor-sign-label-focus checkout-form-label" :"vendor-sign-label checkout-form-label"}>Last Name</label> */}
                            </div>

                            <div className='custom-field-row'>
                                <input className="vendor-sign-input" placeholder='Email *' value={mail} name="email" onChange={e => registerOnChange(e)} onFocus={e => setMailFocus(true)} onBlur={e => setMailFocus(false)}style={{ borderColor: mailValid && "red" }} />
                                {/* <label className={mailFocus || mail !=="" ? "vendor-sign-label-focus checkout-form-label" :"vendor-sign-label checkout-form-label"} style={{color:mailValid && "red"}}>Email ID *</label>  */}
                                {mailValid !== "" && <span className='custom-field-error' style={{}}>{mailValid}</span>}
                            </div>

                            <div className='custom-field-row'>
                                <input className="vendor-sign-input" type="number" name="number" placeholder={t('contact.Phone')} value={number} onChange={e => registerOnChange(e)} onFocus={e => setNumFocus(true)} onBlur={e => { setNumFocus(false); registerOnChange(e) }}style={{ borderColor: numValid && "red" }} />
                                {/* <label className={numFocus || number !=="" ? "vendor-sign-label-focus checkout-form-label" :"vendor-sign-label checkout-form-label"} style={{color:numValid && "red"}}>Mobile Number *</label> */}
                                {numValid !== "" && <span className='custom-field-error' style={{}}>{numValid}</span>}
                                {/* </div> */}
                            </div>

                            <div className="add-gst-number-container">
                                <div className="add-gst-number-subcontainer">
                                    <input type="checkbox" onClick={e => setGstClick(e.target.checked)} />
                                    <span>{t('checkouts.AddGstNumber')}</span>
                                </div>
                                {gstClick && <div className='agns-input'>
                                    <input className="vendor-sign-input" placeholder="GST Number *" name="gstnumber" style={{ borderColor: gstvalid && "red" }} value={gstNumber} onChange={e => setGstNumber(e.target.value)} onBlur={e => setGstNumberFocus(false)} onFocus={e => setGstNumberFocus(true)} />
                                    {gstvalid !== "" ? <span className="error-span">{gstvalid}</span> : ""}
                                </div>}
                            </div>
                            {!authValue.isLoggedIn && <div className="add-gst-number-container">
                                <div className="add-gst-number-subcontainer">
                                    <input type="checkbox" onClick={e => setAccountPassword(e.target.checked)} />
                                    <span>{t('checkouts.createAccount')}</span>
                                </div>
                                {accountPassword && <div className='agns-input'>
                                    <input className="vendor-sign-input" placeholder='create account password *' name="cpassname" value={cpassword} type="password"
                                        onChange={e => registerOnChange(e)} onFocus={e => setCpasswordFocus(true)} onBlur={e => { setCpasswordFocus(false) }}  />
                                    {/* <label className={cpasswordFocus || cpassword !== "" ? "vendor-sign-label-focus checkout-form-label" :"vendor-sign-label checkout-form-label"}>create account password *</label> */}
                                    {cpasswordValid !== "" ?<>
                                    
                                    {cpasswordValid.map((error)=>(
                                      <span className="error-span" style={{}}>{error}<br></br></span>
                                    ))}
                                        </>: ""}
                                </div>}

                                {/* {accountPassword && <div>
                                        <input className="vendor-sign-input" name="gstnumber" style={{width:"180px"}} value={gstNumber} onBlur={e=>setGstNumberFocus(false)} onFocus={e=>setGstNumberFocus(true)}/>
                                    </div>} */}
                            </div>}

                            {authValue.isLoggedIn && addressData.length === 0 ? <>
                                <div className="checkout-add-shipping-address">
                                    <Link href="/account/addaddress"><a>+ Add Shipping Address</a></Link>
                                </div>
                                <div className="checkout-add-shipping-address">
                                    <Link href="/account/addaddress"><a>+ Add Billing Address</a></Link>
                                </div>
                            </> : <>
                                {authValue.isLoggedIn &&
                                    <>
                                        <h2 className="add-select-address">{t('account.ShippingAddress')} <Link href="/account/addaddress"><a>+ {t('account.AddNewAddress')}</a></Link>
                                        </h2>
                                        
                                        {addressData && addressData.map((address, index) => {
                                           
                                            return (
                                                
                                                <div className="address-container">
                                                    
                                                    <input type="radio" name="address-radeo" className="addr-input" id={address.addressId} onClick={e => addressSelect(e, address)} value={address}/>
                                                    <label className="address-custom-label" for={address.addressId}>{address.addressType === 0 ? "Work" : "Home"}
                                                        <a className="edit-address" onClick={e => EditAddress(address)}>{t('checkouts.Edit')}</a>
                                                    </label>
                                                    <p className="address-paragraph">{address && address.address1},{address.address2},{address.city},{address.state + ":" + address.postcode}</p>
                                                </div>)
                                        })}
                                        {prevAddressRadioValid !== "" ? <span className="error-span">{prevAddressRadioValid}</span> : ""}

                                        <div className="add-gst-number-subcontainer" style={{ marginBottom: "20px", marginLeft: "12px" }}>
                                            <input type="checkbox" onClick={e => setBillToSameAddress(e.target.checked)} checked={billToSameAddress} />
                                            <span>{t('checkouts.BillToSame')}</span>
                                        </div>
                                        {!billToSameAddress &&
                                            <>
                                                <h2 className="add-select-address">Select a billing address
                                                </h2>
                                                {addressData && addressData.map((address, index) => {
                                                    return (
                                                        <div className="address-container">
                                                            <input type="radio" className="addr-input" id={address.addressId} onClick={e => billAddressSelect(e, address)} value={address} />
                                                            <label className="address-custom-label">{address.addressType === 0 ? "Work" : "Home"}</label>
                                                            <p className="address-paragraph">{address && address.address1},{address.address2},{address.city},{address.state + ":" + address.postcode}</p>
                                                        </div>)
                                                })}
                                                {prevAddressBillRadioValid !== "" ? <span className="error-span">{prevAddressBillRadioValid}</span> : ""}
                                            </>}
                                    </>}

                                {/* {addressData&&addressData.map((address,index)=>{
                                        return(
                                            <div className="address-container" key={index}>
                                       <input type="radio" id={address.addressId} name="drone" onClick={e=>addressSelect(address)} value={address}  className="addr-input"/>
                                       <label for={address.addressId} className="address-custom-label">{address.addressType===0?"Home":"Work"}</label>
                                        <p className="address-paragraph">{address&&address.address1},{address.address2},{address.city},{address.state+":"+address.postcode}</p>
                                    </div>

                                        )
                                    })} */}

                            </>
                            }

                            {!authValue.isLoggedIn &&
                                <>
                                    <FormCheckoutInformation
                                        // amount={amount}
                                        // cartTotal={cartTotal}
                                        cartItems={cartItems}
                                        productDetail={details}
                                        amount={totalData}
                                        addressData={addressData}
                                        fname={fname}
                                        setFname={setFname}
                                        l1name={l1name}
                                        setL1name={setL1name}
                                        email={email}
                                        setEmail={setEmail}
                                        address={address}
                                        setAddress={setAddress}
                                        address1={address1}
                                        setAddress1={setAddress1}
                                        city={city}
                                        setCity={setCity}
                                        postCode={postCode}
                                        setPostCode={setPostCode}
                                        num={num}
                                        setNum={setNum}
                                        countryId={countryId}
                                        setCountryId={setCountryId}
                                        countryData={countryData}
                                        setCountryData={setCountryData}
                                        countryName={countryName}
                                        setCountryName={setCountryName}
                                        fnameError={fnameError}
                                        setFnameError={setFnameError}
                                        numError={numError}
                                        setNumError={setNumError}
                                        emailError={emailError}
                                        setEmailError={setEmailError}
                                        addressError={addressError}
                                        setAddressError={setAddressError}
                                        cityError={cityError}
                                        setCityError={setCityError}
                                        postalError={postalError}
                                        setPostalError={setPostalError}
                                        countryError={countryError}
                                        setCountryError={setCountryError}
                                        submit={submit}
                                        setSubmit={setSubmit}

                                        zoneData={zoneData}
                                        setZoneData={setZoneData}
                                        zoneComp={zoneComp}
                                        setZoneComp={setZoneComp}
                                        zoneId={zoneId}
                                        setZoneId={setZoneId}
                                        zoneName={zoneName}
                                        setZoneName={setZoneName}
                                        zoneError={zoneError}
                                    // handleLoginSubmit={handleLoginSubmit}
                                    />
                                    <div className="add-gst-number-subcontainer" style={{ marginBottom: "20px" }}>
                                        <input type="checkbox" onClick={e => setBillToSame(e.target.checked)} checked={billToSame} />
                                        <span>{t('checkouts.BillToSame')}</span>
                                    </div>
                                    {!billToSame && <FormCheckoutBillingInformation
                                        cartItems={cartItems}
                                        productDetail={details}
                                        amount={totalData}
                                        addressData={addressData}
                                        fname={fname1}
                                        setFname={setFname1}
                                        l1name={l1name1}
                                        setL1name={setL1name1}
                                        email={email1}
                                        setEmail={setEmail1}
                                        address={address111}
                                        setAddress={setAddress111}
                                        address1={address11}
                                        setAddress1={setAddress11}
                                        city={city1}
                                        setCity={setCity1}
                                        postCode={postCode1}
                                        setPostCode={setPostCode1}
                                        num={num1}
                                        setNum={setNum1}
                                        countryId={countryId1}
                                        setCountryId={setCountryId1}
                                        countryData={countryData1}
                                        setCountryData={setCountryData1}
                                        countryName={countryName1}
                                        setCountryName={setCountryName1}
                                        fnameError={fnameError1}
                                        setFnameError={setFnameError1}
                                        numError={numError1}
                                        setNumError={setNumError1}
                                        emailError={emailError1}
                                        setEmailError={setEmailError1}
                                        addressError={addressError1}
                                        setAddressError={setAddressError1}
                                        cityError={cityError1}
                                        setCityError={setCityError1}
                                        postalError={postalError1}
                                        setPostalError={setPostalError1}
                                        countryError={countryError1}
                                        setCountryError={setCountryError1}
                                        submit={submit}
                                        setSubmit={setSubmit}
                                        zoneData={zoneData1}
                                        setZoneData={setZoneData1}
                                        zoneComp={zoneComp1}
                                        setZoneComp={setZoneComp1}
                                        zoneId={zoneId1}
                                        setZoneId={setZoneId1}
                                        zoneName={zoneName1}
                                        setZoneName={setZoneName1}
                                        zoneError={zoneError1}
                                    />}
                                </>}

                        </div>

                    </div>

                    <div className="custom-checkout-form-right">
                        <h2>{t('ItemsinCart')} - {cartItems.length}
                            <Link href="/account/shopping-cart"><a className="custom-checkout-form-veiw-cart">{t('view-cart')}</a></Link>
                        </h2>
                       
                    {cartItems.length >0 &&
                    <div>
                        <div className="custom-checkout-product-card">
                            <table className="custom-checkout-card-table">
                                {cartItems &&
                                    cartItems.map(product => (
                                        <tr>
                                            <td className="custom-checkout-td-img" style={{ width: "80px" }}>
                                                <div className="">
                                                    <img src={product.productImage && product.productImage[0] && product.productImage[0].containerName !== "/" ? imageUrl + "?path=" + product.productImage[0].containerName + "&name=" + product.productImage[0].image + "&width=400&height=200" : "/static/img/no-image.png"} />
                                                </div>
                                            </td>
                                            <td className="custom-checkout-td-content">
                                              
                                                <a className="close-btn-outer" style={{}} onClick={e => handleRemoveFromCart(product)}>x</a>
                                               
                                                    <a className="checkout-td-prooductname">{product.name}
                                                    </a>
                                               
                                                <div className="checkout-td-prooductname-subcontainer">
                                                    <p>{product.skuName} {product.variantName}</p>
                                                    <div className="custom-product-box">
                                                        <button onClick={e => handleDecreaseItemQty(product)}>-</button>
                                                        <span>{product.quantity}</span>
                                                        <button onClick={e => handleIncreaseItemQty(product)}>+</button>
                                                    </div>
                                                    <div className='cctd-price'>$
                                                       
                                                        {/* {product && product.flag === "" ?  } */}
                                                        
                                                        
                                                        {product && product.initialPrice ? product.quantity * product.price : product.quantity * JSON.parse(product.price)*product.quantity}

                                                    </div>

                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                <tr>
                                    <td className="custom-td-total"> {t('total')}</td>
                                   
                                    <td className="custom-td-total" style={{ textAlign: "right" }}>{'$ '}{totalData}</td>
                                </tr>

                                {couponApplied && <tr>
                                    <td className="custom-td-total"> Discount Amount
                                        <p className="coupon-apply-text">Coupons, Vouchers  & Promotional</p></td>
                                    <td className="custom-td-total" style={{ textAlign: "right" }}>(-) $ {discountedPrice}	</td>
                                    <td className="custom-td-total" onClick={e => cancelCoupon()} style={{ cursor: "pointer" }}>x</td>

                                </tr>


                                }
                                {couponApplied &&
                                    <tr>
                                        <td className="custom-td-total"> Total amount payable</td>
                                        <td className="custom-td-total">$ {appliedName}</td>
                                    </tr>
                                }



                            </table>

                        </div>

                        <Collapse defaultActiveKey={['1']} expandIconPosition="right"     className="site-collapse-custom-collapse" bordered={false}>
                        
                            <Panel  key="1" header={t('checkouts.couponsHeader')} className="site-collapse-custom-panel" >
                                <div>
                                
                                    <p >{t('checkouts.couponLabel')}</p>
                                    <div className="apply-coup-new">
                                        <input value={couponInput} onChange={e => CouponOnchange(e)} placeholder="Enter Coupon" style={{ borderColor: couponError && "red" }} />
                                        <button style={{backgroundColor:"#fb641c",width:"81px"}} onClick={e => couponSubmit()}>{t('checkouts.Apply')}</button>
                                        
                                        {couponApplied && <h5 className="apply-coupon-texting"><img src="/static/img/tick-green-new.svg" />Coupon Applied </h5>}
                                        
                                    </div>
                                </div>
                                <p></p>
                                <h5 style={{color:"#ff5252" }}>{couponError}</h5>
                            </Panel>
                        </Collapse>
                        <div className="payment-new-screen">
                            <p>{t('checkouts.SelectPaymentMode')}</p>
                            <div className="payment-main-grid" style={{ width: "calc(100% - 0px)", fontSize: "18px" }}>
                                <Radio.Group
                                    onChange={e => handleChangePaymentMethod(e)
                                    }
                                    value={method} size="small">
                                    <div className="payment-main-grid">
                                        {paymentOption && paymentOption.map((pay) => (
                                            <Radio style={radioStyle} value={pay.id} key={pay.id}>
                                                
                                                <img src={imageUrl + "?path=" + pay.pluginAvatarPath + "&name=" + pay.pluginAvatar + "&width=100&height=100"} alt="" style={{}} />

                                                {/* </div> */}
                                            </Radio>

                                        ))}

                                    </div>
                                </Radio.Group>
                            </div>
                            {paymentvalid !== "" ? <span className="error-span">{paymentvalid}</span> : ""}
                        </div>
                        </div>
                       }
                     
                        {/* <div className="custom-place-order">
                            <button onClick={e => onCheckoutApiCall(e)} disabled={buttonLoader}>{!buttonLoader ?<>{t('StockCheckout.Placeorder')}
                            </>:<i class="fa fa-refresh fa-spin"></i>} </button>
                           
                        </div> */}
                       
                        {/* <div className="custom-place-order">
                            <button onClick={e => onCheckoutApiCall(e)}>{!buttonLoader ?<>{t('StockCheckout.Placeorder')}
                            </>:<i class="fa fa-refresh fa-spin"></i>} </button>
                           
                        </div> */}
                        <div className="custom-place-order">
                            {buttonLoader===true?<button disabled={buttondisable===true}><i class="fa fa-refresh fa-spin"></i></button>:<button disabled={buttondisable===true} onClick={e => onCheckoutApiCall(e)}>{t('StockCheckout.Placeorder')}</button>}
                        </div>

                    </div>


                </div>

            </div>
            {/* </div> */}
            {/* <div className="ps-section__header">
                        <h1>{t('checkout-info')}</h1>
                    </div> */}
            {/* <div className="ps-section__content">
                        <FormCheckoutInformation
                            // amount={amount}
                            // cartTotal={cartTotal}
                            cartItems={cartItems}
                            productDetail={details}
                            amount={totalData}
                            addressData={addressData}
                        />
                    </div> */}
            {/* </div> */}
        </div>
    );

}

const mapStateToProps = state => {
    return state.cart;
};
export default connect(mapStateToProps)(Checkout);
