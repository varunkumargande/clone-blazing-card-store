import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'

export async function forgotApi(email,setForgotSuccess, setForError) {
  
    const result= await APIServices.getAll('customer/forgot-password-link?email='+email)
        if(result&&result.data&&result.data.status === 1){
            modalSuccess('success',result.data.message)  
            setForgotSuccess(true) 
        }else{
            modalWarning('error',result.data.message);
            setForError(result.data.message)
        }
}
