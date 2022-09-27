import { login } from "../../store/auth/action";
import { cartListApi } from "../cart/cartList";
import getProfileApi from "../home/getInfo";
import APIServices from '../../services'
import { modalSuccess,modalWarning } from "../intercept";
import { UserOauthLogin } from "./oAuthLogin";
import { UserGoogleRegister } from './onlyRegister';


export async function GoogleLoginApi(firstname, lastname, mail, password, confirmPassword, username, gmail,setgoogleId,setgooglePath,googleId,googlePath,profie,Router,res){
    
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
    const signupResult = UserGoogleRegister(firstname, lastname, mail, password, confirmPassword, username)
    if(signupResult !== null ) {
        const data = JSON.stringify({
            emailId:mail, 
            password: password,
            type:gmail
        })
        const result =await APIServices.create('customer/login',data)
        console.log(result.data,'response45------------------------------');
        console.log(result.data.status)
        if(result&&result.data&&result.data.status === 1){
            if(result.data.data.clientId&&result.data.data.returnPath){
                console.log('response46------------------------------');
                UserOauthLogin(profie,Router,res,result.data.data.clientId,result.data.data.returnPath)
            }
           
          
        }else{
           
            
        }
    }

    
    

};