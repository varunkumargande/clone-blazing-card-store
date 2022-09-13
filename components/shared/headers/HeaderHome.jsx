import React from "react";

import SearchHeader from "./modules/SearchHeader";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "../../../i18n";
import { categoryListApi } from "../../../api";
import { getServiceApi } from "../../../api";
import LanguageSwicher from "./modules/LanguageSwicher";
import { useRouter } from "next/router";
import Logo from "./modules/Logo";
import HeaderRight from "./modules/HeaderRight";

function HeaderHome() {
  const router = useRouter();

  let category = useSelector((s) => s.product);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  let currentColor = useSelector((s) => s.palette.currentColor);

  useEffect(() => {
    categoryListApi(dispatch);
    // getServiceApi(dispatch);
  }, []);

  return (
    <header className="header header--1" data-sticky="true" id="headerSticky">
      <div className={`header__top ${currentColor}`}>
        <div className="ps-container">
          <div className="header__left">
            <Logo />
            <div className="menu--product-categories">
              <div className="menu__toggle">
                <i className="icon-menu"></i>
                <span> {t("soc")}</span>
              </div>
            </div>
          </div>
          <div className="header-menu-main ">
            <div className="header__right">
              <SearchHeader />
            </div>
            <HeaderRight />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
