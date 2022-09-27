import {modalSuccess, modalWarning} from "../intercept";
import APIServices from '../../services'

export async function UserGoogleRegister(firstname, lastname, email, password,confirmPassword, username) {

    const data = JSON.stringify({
            name: firstname,
            lastName: lastname,
            emailId: email,
            password: password,
            confirmPassword: confirmPassword,
            userName: username
   })
   const result =await APIServices.create('customer/register',data)
   if (result&&result.data) {
                if (result&&result.data&&result.data.status) {
                    // Router.push('/account/login');
                    // modalSuccess('success',result.data.message)
                    console.log('Signup succesful$$$$$$$$$$$$$$$$$')
                    return result.data;
                }
                else{
                   // modalWarning("error",result.data.data.data.message[0]);
                   console.log('Signup unsuccesful - UUUUUUUUUUUUUU')
                    return null;
                }
            }
}