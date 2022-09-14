import { login } from "../../store/auth/action";
import { cartListApi } from "../cart/cartList";
import getProfileApi from "../home/getInfo";
import APIServices from '../../services'
import { modalSuccess,modalWarning } from "../intercept";
import { addItemToWishlist } from "../../store/wishlist/action";

import { addItem } from '../../store/cart/action'

export async function UserLogin(email, password, loginType, Router, setLoginError, dispatch, setMail, setPassword, setLoadImg) {

    // return fetch(apiUrl+'customer/login', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         'emailId':email, 'password': password,"type":loginType
    //     })
    // })
    //     .then((response) => {
    //             if (response.status === 1) {
    //                 sessionStorage.setItem("spurtToken", response.data.token);
    //                 // sessionStorage.setItem("spurtUser",JSON.stringify(response.data.user));
    //                 getProfileApi( )
    //                 modalSuccess('success',response.message)
    //                 Router.push('/');
    //                 cartListApi(dispatch)
    //             } else {
    //                 setLoginError(response.message)
    //                 modalWarning('error',response.message)
    //                 setMail("")
    //                 setPassword("")
    //             }
    //     })

    const data = JSON.stringify({
        emailId: email,
        password: password,
        type: loginType
    })
    const result = await APIServices.create('customer/login', data)
    if (result && result.data && result.data.status === 1) {

        sessionStorage.setItem("spurtToken", result.data.data.token);
        // sessionStorage.setItem("spurtUser",JSON.stringify(response.data.user));
        getProfileApi()
        modalSuccess('success', result.data.message)
        Router.push('/');
        cartListApi(dispatch)
    } else {
        setLoginError(result.data.message)
        modalWarning('error', result.data.message)
        setMail("")
        setPassword("")
    }
    setLoadImg(false)

};