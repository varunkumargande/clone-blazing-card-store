import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import MiniCart from "./MiniCart";
import { login } from "../../../../store/auth/action";
import { wishListApi } from "../../../../api";
import { addItemToWishlist } from "../../../../store/wishlist/action";
import { getCompareList } from "../../../../store/compare/action";
import { useTranslation } from "../../../../i18n";
import CompardItems from "./CompardItems";
import WishlistItems from "./wishlistItems";
import AuthSignIN from "./AuthSignIN";

function HeaderRight({ auth }) {
  const { t } = useTranslation("common");
  const [wishlistData, setWishListApi] = useState([]);
  const [compareCount, setCompareCount] = useState([]);
  const [dummy, setDummy] = useState([]);
  let reloadCart = useSelector((s) => s.wishlist.addwishlist);
  let compareSet = useSelector((s) => s.compare.compareCount);

  const dispatch = useDispatch();
  const wishlist = "";
  let TokenAuth = "";
  let cartLocal = [];

  const authFunc = () => {
    if (TokenAuth !== null) {
      dispatch(login());
    }
  };

  useEffect(() => {
    TokenAuth = localStorage.getItem("blazingToken");
    cartLocal = JSON.parse(localStorage.getItem("cartItem"));
    authFunc();
  }, []);

  useEffect(() => {
    dispatch(addItemToWishlist(0));
    localStorage.getItem("blazingToken") &&
      wishListApi(setWishListApi, dispatch, setDummy);
  }, [reloadCart]);

  useEffect(() => {
    dispatch(getCompareList(0));
    setCompareCount(JSON.parse(localStorage.getItem("compareId")));
  }, [compareSet]);

  return (
    <>
      <div className="header__right">
        <div className="header__actions">
          <AuthSignIN auth={auth} />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(HeaderRight);
