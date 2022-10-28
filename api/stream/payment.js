import APIServices from "../../services";
import { modalSuccess, modalWarning } from "../../api/intercept";

async function addCardDetail(data, productDetail, close) {
  if (sessionStorage.getItem("blazingUser")) {
    let expDate = "";
    let year = data.expiration.split("-")[0].slice(-2);
    let month = data.expiration.split("-")[1];
    expDate = month + "/" + year;

    const jsondata = JSON.stringify({
      cardNumber: data.cardNumber,
      expireDate: expDate,
      cvc: data.cvv,
      customerId: String(JSON.parse(sessionStorage.getItem("blazingUser")).id),
      name: JSON.parse(sessionStorage.getItem("blazingUser")).firstName,
      emailId: JSON.parse(sessionStorage.getItem("blazingUser")).email,
    });
    const result = await APIServices.create(
      "customer-card-details/addCard",
      jsondata
    );
    if (result.status == 200) {
      modalSuccess("success", result.data.message);
      close(false);
    } else {
      modalWarning("error", result.data.message);
      // close(false)
    }
  }
}

export { addCardDetail };
