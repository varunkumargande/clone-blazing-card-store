import {modalSuccess, modalWarning} from "../intercept";
import APIServices from '../../services'

export async function VendorRegister(name, email, password,confirmPassword,number,Router,cpersonName,lname) {

    
    // fetch(apiUrl+'vendor/register', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "firstName": name,
    //         "emailId": email,
    //         "password": password,
    //         "confirmPassword": confirmPassword,
    //         "phoneNumber":number,
    //         "contactPersonName": cpersonName,
    //         "lastName": lname,
    //     })
    // })
    //     .then(json => {
            
    //         if (json) {
                
    //             if (json.data) {
    //                 Router.push('/');
    //                 modalSuccess("success",json.message)
    //             }
                
    //            else{
               
               
    //                 modalSuccess("error",json.message)

    //             }
              
    //         }
    //     })


    const data = JSON.stringify({
            firstName: name,
            emailId: email,
            password: password,
            confirmPassword: confirmPassword,
            phoneNumber:number,
            contactPersonName: cpersonName,
            lastName: lname,
})
const result =await APIServices.create('vendor/register',data)

         
            
              
                if (result.status !==400 && result.status !==500) {
                   
                    Router.push('/');
                    modalSuccess("success",result.data.message)
                }
                
               else{
              
                     if(result.status !==500){
                        modalSuccess("error",result.data.message)
                     }
                    

                }
              
            


}