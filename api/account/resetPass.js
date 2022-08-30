import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'

export async function resetPassApi(key,newPass,Router) {

    // fetch(apiUrl+'/api/customer/reset-password',{
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         key:key,
    //         newPassword:newPass,
    //     })
    // }) 

    // .then((json) =>{
    //     if (json.status === 1) {
    //         Router.push("/account/login")
    //         modalSuccess("success",json.message)
    //     }
    // })
    const data = JSON.stringify({
        key:key,
            newPassword:newPass,
    })
    const result =await APIServices.updateUser('CustomerAddress/update-address',data)
    
    if(result&&result.data&&result.data.status===1){
        Router.push("/account/login")
                modalSuccess("success",result.data.message)

    }

}