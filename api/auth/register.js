import {modalSuccess, modalWarning} from "../intercept";
import APIServices from '../../services'

export async function UserRegister(firstname, lastname, email, password,confirmPassword,number,Router) {

    const data = JSON.stringify({
            name: firstname,
            lastName: lastname,
            emailId: email,
            password: password,
            confirmPassword: confirmPassword,
            phoneNumber:number
   })
   const result =await APIServices.create('customer/register',data)
   if (result&&result.data) {
                if (result&&result.data&&result.data.status) {
                    Router.push('/account/login');
                    modalSuccess('success',result.data.message)
                }
                else{
                    modalWarning("error",result.data.data.data.message[0])
                }
            }
}