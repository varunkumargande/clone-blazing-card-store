import APIServices from '../../services'
import { modalSuccess, modalWarning } from "../../../../api/intercept";

async function addCardDetail(setOpen, data) {
    let expDate = ""
    let year = data.expiary.split("-")[0].slice(-2)
    let month = data.expiary.split("-")[1]
    expDate = month + "/" + year

    const data = JSON.stringify({
        "cardNumber": data.cardNumber,
        "expireDate": expDate,
        "cvc": data.cvc,
        "customerId": String(JSON.parse(sessionStorage.getItem("spurtUser")).id),
        "name": JSON.parse(sessionStorage.getItem("spurtUser")).firstName,
        "emailId": JSON.parse(sessionStorage.getItem("spurtUser")).email
    })
    const result = await APIServices.create('customer-card-details/addCard', data)
    if (result.status == 200) {
        modalSuccess('success', result.data.message)
        setOpen(false)
    } else {
        modalWarning('error', result.data.message)
    }
}

export { addCardDetail };
