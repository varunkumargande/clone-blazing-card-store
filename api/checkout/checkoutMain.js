import  Router  from "next/router";
import {modalSuccess, modalWarning} from "../intercept";
import APIServices from '../../services'
export async function checkOutApi(fname,lname,address,num,city,postCode,email,productDetail,method,address11,address111,postCode1,email1,city1,countryId1,countryId,zoneName1,zoneName,fname1,discountedPrice,couponInput,name,address1,setButtonLoader,coupandata,buttonLoader,cpassword,setbuttondisable) {
        
    // fetch(apiUrl+'/orders/customer-checkout', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //                 "shippingFirstName": fname,
    //                 "shippingLastName":lname!= null ? lname : "",
    //                 "shippingCity":city,
    //                 "shippingPostCode":postCode,
    //                 "shippingCompany": fname,
    //                 "shippingZone":zoneName,
    //                 "gstNo": "",
    //                 "phoneNumber":num,
    //                 "shippingAddressFormat":"",
    //                 "shippingAddress_1":address,
    //                 "shippingAddress_2": address1,
    //                 "emailId":email,
    //                 "shippingCountryId":countryId,
    //                 "productDetails":productDetail,
    //                 "paymentMethod":method,
    //                 "paymentAddress_1": address11,
    //                 "paymentAddress_2": address111,
    //                 "paymentCity": city1,
    //                 "paymentCompany": fname1,
    //                 "paymentCountryId": countryId,
    //                 "paymentFirstName": fname1,
    //                 "paymentLastName": "",
    //                 "paymentPostCode": postCode1,
    //                 "paymentZone": zoneName1,
    //                 "couponCode": couponInput,
    //                 "couponData": coupandata,
    //                 "couponDiscountAmount": discountedPrice
    //         })
    // })
    // .then(json=>{
       
        
    //     if(json.status===1){
            
    //         Router.push('/checkout-success/[cid]','/checkout-success/'+json.data.orderPrefixId)
    //         localStorage.setItem("cartItem",JSON.stringify([]))
    //         modalSuccess('success',json.message)
    //         setButtonLoader(false)
    //     }
    //     if(json.status===3){
    //             window.open(json.data, '_self');
    //             localStorage.setItem("cartItem",JSON.stringify([]))
    //     }
    //     if(json.status===0){
    //         modalWarning("error",json.message)
    //     }
    // })



    const data = JSON.stringify({
        shippingLastName:lname!= null ? lname : "",
        shippingCity:city,
        shippingPostCode:postCode,
        shippingCompany: fname,
        shippingFirstName: fname,
        shippingZone:zoneName,
        gstNo: "",
        phoneNumber:num,
        shippingAddressFormat:"",
        shippingAddress_1:address,
        shippingAddress_2: address1,
        emailId:email,
        shippingCountryId:countryId,
        productDetails:productDetail,
        paymentMethod:method,
        paymentAddress_1: address11,
        paymentAddress_2: address111,
        paymentCity: city1,
        paymentCompany: fname1,
        paymentCountryId: countryId,
        paymentFirstName: fname1,
        paymentLastName: "",
        paymentPostCode: postCode1,
        paymentZone: zoneName1,
        couponCode: couponInput,
        couponData: coupandata,
        couponDiscountAmount: discountedPrice,
        password:cpassword
})

const result =await APIServices.create('orders/customer-checkout',data)


if(result&&result.data&&result.data.status===1){
            
    Router.push('/checkout-success/[cid]','/checkout-success/'+result.data.data.orderPrefixId)
    localStorage.setItem("cartItem",JSON.stringify([]))
    modalSuccess('success',result.data.message)
   
}
if(result&&result.data&&result.data.status===3){
        window.open(result.data.data, '_self');
        localStorage.setItem("cartItem",JSON.stringify([]))
}
if(result&&result.data&&result.data.status===0){
   // 
    modalWarning("error",result.data.data.message)
}
setButtonLoader(false)
setbuttondisable(false)

}