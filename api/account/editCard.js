import { modalWarning, modalSuccess } from "../intercept";
import APIServices from "../../services";

export async function handleCardApi(data, isEdit, cardListApi) {
  if (isEdit) {
    const result = await APIServices.create(
      "customer-card-details/updateCard",
      data
    );
    if (result && result.data && result.data.status === 1) {
      cardListApi();
    }
  } else {
    const result = await APIServices.create(
      "customer-card-details/addCardInProfile",
      data
    );
    if (result.data.status == 1) {
      cardListApi();
      modalSuccess("success", "Card Addedd !");
    } else {
      modalWarning("error", result.data.message);
    }
  }
}
