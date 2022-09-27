import { login } from "../../store/auth/action";
import { cartListApi } from "../cart/cartList";
import getProfileApi from "../home/getInfo";
import APIServices from '../../services'
import { modalSuccess,modalWarning } from "../intercept";
import { UserOauthLogin } from "./oAuthLogin";
import { UserGoogleRegister } from './onlyRegister';


export async function GoogleLoginApi(firstname, lastname, mail, password, confirmPassword, username, gmail,setgoogleId,setgooglePath,googleId,googlePath,profie,Router,res){
    
    const signupResult = UserGoogleRegister(firstname, lastname, mail, password, confirmPassword, username)
    
    if(signupResult) {
        const data = JSON.stringify({
            emailId:mail, 
            password: password,
            type:gmail
        })
        const result =await APIServices.create('customer/login',data);
        if(result && result.data && result.data.status === 1){
            if(result.data.data.returnPath){
                UserOauthLogin(profie,Router,res,result.data.data.clientId,result.data.data.returnPath)
            } 
        }
    }
};