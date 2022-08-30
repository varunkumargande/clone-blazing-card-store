import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
export async function changePasswordApi(oldPass,newPass,setPassButtonLoader,setOldPass,setNewPass,setOldPassError,setNewPassError,setPassSubmit){   

    // fetch(apiUrl+'/customer/change-password',{
    //     method: 'POST',
    //     body: JSON.stringify({
    //         oldPassword:oldPass,
    //         newPassword:newPass,
    //     })
    // })      
    // .then((json)=>{
    //     setPassButtonLoader(false)
    //     if (json.status === 1) {
    //         modalSuccess('success',json.message)
    //         setOldPass("")
    //         setNewPass("")
    //         setOldPassError("")
    //         setNewPassError("")
    //         setPassSubmit(0)
    //     } else {
    //         modalWarning('error',json.message);
    //         setOldPass("");
    //         setNewPass("");
    //         setOldPassError("");
    //         setNewPassError("");
    //         setPassSubmit(0);
    //     }
    //     return json
    // })    


    const data = JSON.stringify({
        oldPassword:oldPass,
                newPassword:newPass,    
    })
    const result =await APIServices.create('customer/change-password',data)
   
    if(result && result.data){
        setPassButtonLoader(false)
    
    if (result && result.data && result.data.status === 1) {
  
        modalSuccess('success',result.data.message)
                setOldPass("")
                setNewPass("")
                setOldPassError("")
                setNewPassError("")
                setPassSubmit(0)
    }else{

        modalWarning('error',result.data.message);
            setOldPass("");
            setNewPass("");
            setOldPassError("");
            setNewPassError("");
            setPassSubmit(0);

    }
    return result.data //unwanted
}
}