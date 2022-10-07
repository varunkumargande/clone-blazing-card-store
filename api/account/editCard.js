import { modalWarning, modalSuccess } from "../intercept";
import APIServices from "../../services";

export async function handleCardApi(data, isEdit, cardListApi, setCardLoader) {
  if (isEdit) {
    const result = await APIServices.create(
      "customer-card-details/updateCard",
      data
    );
    if (result && result.data && result.data.status === 1) {
      cardListApi();
      setCardLoader(false)
    }
  } else {
    const result = await APIServices.create(
      "customer-card-details/addCardInProfile",
      data
    );
    if (result.data.status == 1) {
      cardListApi();
      setCardLoader(false)
      modalSuccess("success", "Card Addedd !");
    } else {
      modalWarning("error", result.data.message);
      setCardLoader(false)
    }
  }
}
