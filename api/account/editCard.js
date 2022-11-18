import APIServices from "../../services";
import { show } from "../../store/toast/action";
import { apiValidation } from "../utils/apiValidation";

export async function handleCardApi(
  data,
  isEdit,
  cardListApi,
  setCardLoader,
  dispatch,
  setShowModal=null
) {
  if (isEdit) {
    const result = await APIServices.create(
      "customer-card-details/updateCard",
      data
    );
    const resp = apiValidation(result, dispatch, setShowModal);
    if (resp) {
      cardListApi();
    }
    setCardLoader(false);
  } else {
    const result = await APIServices.create(
      "customer-card-details/addCardInProfile",
      data
    );
    const resp = apiValidation(result, dispatch, setShowModal);
    if (resp) {
      cardListApi();
    }
    setCardLoader(false);
  }
}
