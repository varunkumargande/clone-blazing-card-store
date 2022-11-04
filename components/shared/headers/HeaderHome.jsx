import React from "react";

import SearchHeader from "./modules/SearchHeader";
import { useSelector } from "react-redux";
import { useTranslation } from "../../../i18n";
import Logo from "./modules/Logo";
import HeaderRight from "./modules/HeaderRight";

function HeaderHome() {
  const { t } = useTranslation("common");
  let currentColor = useSelector((s) => s.palette.currentColor);

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
