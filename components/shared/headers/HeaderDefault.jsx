import React from "react";
//import {ConnectPlugin} from '../../connectPlugins';
import NavigationDefault from "../navigation/NavigationDefault";
import HeaderActions from "./modules/HeaderActions";

import SearchHeader from "./modules/SearchHeader";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "../../../i18n";
import { categoryListApi } from "../../../api";
import { getServiceApi } from "../../../api";
import LanguageSwicher from "./modules/LanguageSwicher";
import { useRouter } from "next/router";
import Logo from "./modules/Logo";

function HeaderDefault() {
  const router = useRouter();

  let category = useSelector((s) => s.product);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  let currentColor = useSelector((s) => s.palette.currentColor);

  useEffect(() => {
    categoryListApi(dispatch);
    // getServiceApi(dispatch);
  }, []);

<<<<<<< HEAD

=======
>>>>>>> pre-dev
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
            <div className="header__center">
              <SearchHeader />
              <div
                className="header__newtheme_language"
                style={{
                  paddingLeft: "0px",
                  height: "30px",
                  padding: "0px 0px",
                  marginLeft: "21px",
                }}
              >
                <LanguageSwicher />
              </div>
            </div>
<<<<<<< HEAD
=======

>>>>>>> pre-dev
            <HeaderActions />
          </div>
        </div>
      </div>
      <NavigationDefault />
    </header>
  );
  // }
}

export default HeaderDefault;
