import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'

export async function getUsername(username) {
  
    const result= await APIServices.getAll(`customer/username/${username}`)
        if(result && result.data){
           return result.data.status
        }else{
            modalWarning('error',result.data.message);
        }
}
