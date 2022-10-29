import APIServices from "../../services";
import { show } from "../../store/toast/action";
export async function handleCardApi(
  data,
  isEdit,
  cardListApi,
  setCardLoader,
  dispatch
) {
  if (isEdit) {
    const result = await APIServices.create(
      "customer-card-details/updateCard",
      data
    )
    if (result?.status === 200) { 
      cardListApi();
      setCardLoader(false);
      dispatch(show({ message: result.data.message, type: "success" }));
    } else {
      setCardLoader(false);
      dispatch(show({ message: result.data.message, type: "error" }));
    }
  } else { 
    const result = await APIServices.create(
      "customer-card-details/addCardInProfile",
      data
    );
    if (result?.data?.status === 1) {
      setCardLoader(false);
      dispatch(show({ message: "Card added successfully", type: "success" }));
      cardListApi();
    } else {
      setCardLoader(false);
      dispatch(show({ message: result.data.message, type: "error" }));
    }
  }
}
