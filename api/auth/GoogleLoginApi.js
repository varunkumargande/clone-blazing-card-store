import { login } from "../../store/auth/action";
import { cartListApi } from "../cart/cartList";
import getProfileApi from "../home/getInfo";
import APIServices from '../../services'
import { modalSuccess, modalWarning } from "../intercept";
import { UserOauthLogin } from "./oAuthLogin";
import { UserGoogleRegister } from './onlyRegister';
import axios from "axios"
import { getProfile } from "../../store/profile/action";

export async function GoogleLoginApi(firstname, lastname, mail, password, confirmPassword, username, gmail, setgoogleId, setgooglePath, googleId, googlePath, profie, Router, res, encyrpted) {

    const data = {
        emailId: mail,
        firstName: firstname,
        lastName: lastname,
        userName: username,
        oauthData: JSON.stringify(encyrpted),
        type: gmail
    };
    const result = await axios.post('http://localhost:9000/gmail-login', data);
    if (result && result.data && result.data.status === 1) {
        sessionStorage.setItem("spurtToken", result.data.data.token);
        sessionStorage.setItem("spurtUser", JSON.stringify(result.data.data.user));
        getProfile(JSON.stringify(result.data.data.user));
        modalSuccess('success', result.data.message)
        Router.push('/');
    }
};