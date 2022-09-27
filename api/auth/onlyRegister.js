import APIServices from '../../services'

export async function UserGoogleRegister(firstname, lastname, email, password, confirmPassword, username) {
    const data = JSON.stringify({
        name: firstname,
        lastName: lastname,
        emailId: email,
        password: password,
        confirmPassword: confirmPassword,
        userName: username
    })

    const result = await APIServices.create('customer/register', data);    
    if(result && result.status) {
        if(result.data) {
            return true;
        } 
    }
}