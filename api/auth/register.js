import {modalSuccess, modalWarning} from "../intercept";
import APIServices from '../../services'

export async function UserRegister(name, email, password,confirmPassword,number,Router) {
    // fetch(apiUrl+'/customer/register', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "name": name,
    //         "emailId": email,
    //         "password": password,
    //         "confirmPassword": confirmPassword,
    //         "phoneNumber":number
    //     })
    // })
    //     .then(json => {
    //         if (json) {
    //             if (json.status) {
    //                 Router.push('/account/login');
    //                 modalSuccess('success',json.message)
    //             }
    //             else{
    //                 modalWarning("error",json.data.message[0])
    //             }
    //         }
    //     })


    const data = JSON.stringify({
            name: name,
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