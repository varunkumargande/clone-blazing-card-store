import APIServices from "../../services";
import { addItemToWishlist } from "../../store/wishlist/action";
import { addItem } from "../../store/cart/action";
import { getProfile } from "../../store/profile/action";
import { connect, useSelector, useDispatch } from "react-redux";

async function getProfileInfoApi(dispatch) {
  const result = await APIServices.getAll("customer/get-profile");
  if (result && result.data) {
    if (result && result.data && result.data.status === 1) {
      sessionStorage.setItem("blazingUser", JSON.stringify(result.data.data));

      getProfile(result.data.data);

      // dispatch(addItem(1))
    }
  }
}
export default getProfileInfoApi;
