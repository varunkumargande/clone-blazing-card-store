import { combineReducers } from "redux";
import post from "./post/reducer";
import product from "./product/reducer";
import setting from "./setting/reducer";
import cart from "./cart/reducer";
import compare from "./compare/reducer";
import auth from "./auth/reducer";
import wishlist from "./wishlist/reducer";
import collection from "./collection/reducer";
import palette from "./colorPalette/reducer";
import category from "./category/reducer";
import stream from "./stream/reducer";
import search from "./search/reducer";
import order from "./order/reducer";
import becomeSeller from "./becomeSeller/reducer";
import profile from "./profile/reducer";
import likeDislikeStream from "./likedStream/reducer";
import toast from "./toast/reducer";
export default combineReducers({
  auth,
  post,
  product,
  setting,
  cart,
  compare,
  wishlist,
  collection,
  palette,
  category,
  stream,
  search,
  order,
  becomeSeller,
  profile,
  likeDislikeStream,
  toast,
});
