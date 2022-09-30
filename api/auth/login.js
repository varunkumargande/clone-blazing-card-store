
import { cartListApi } from "../cart/cartList";
import getProfileApi from "../home/getInfo";
import APIServices from '../../services'
import { modalSuccess, modalWarning } from "../intercept";


export async function UserLogin(email, password, loginType, Router, setLoginError, dispatch, setMail, setPassword, setLoadImg) {
    const data = JSON.stringify({
        emailId: email,
        password: password,
        type: loginType
    })
    const result = await APIServices.create('customer/login', data)
    if (result && result.data && result.data.status === 1) {
        
        sessionStorage.setItem("spurtToken", result.data.data.token);
        sessionStorage.setItem("userPass", password)

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
