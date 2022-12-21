import App from "next/app";
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "../store/store";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { createWrapper } from "next-redux-wrapper";
import { appWithTranslation } from "../i18n";
import "../scss/style.scss";
import getProfileApi from "../api/home/getProfile";
import getPageApi from "../api/home/getPage";
import {
  colorThemeCurrent,
  viewcolorThemeCurrent,
} from "../store/colorPalette/action";
import Router from "next/router";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/scss/main.scss";
import { LanguageSwitcherAPi } from "../api/account/languageSwitcherAPi";
import NotificationsProvider from "../contexts/Notifications/Notifications";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../scss/elements/_streaming.scss";
import CurrentDeviceProvider from "../contexts/Devices/CurrentDevices";
import CategoriesDataProvider from "../contexts/Categoires/CategoriesData";
import { login } from "../store/auth/action";
import { QueryClient, QueryClientProvider } from "react-query";
// Note: ReactQueryDevtools can be used for api testing purpose when running locally.
//       To use it uncomment it here and also below where it is used. 
// import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }) {
  const RedirectMaintain = useSelector((s) => s.setting.maintenance);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (RedirectMaintain === 1) {
      Router.push("/maintenance");
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(function () {
      document.getElementById("__next").classList.add("loaded");
    }, 100);
    getProfileApi(dispatch);
    getPageApi(dispatch);
    LanguageSwitcherAPi(dispatch);

    localStorage.getItem("colorThemeBlazing") &&
      dispatch(colorThemeCurrent(localStorage.getItem("colorThemeBlazing")));
    localStorage.getItem("colorThemeBlazingView") &&
      dispatch(
        viewcolorThemeCurrent(localStorage.getItem("colorThemeBlazingView"))
      );
  }, []);

// updates the redux state that user logged in
  const authFunc = () => {
    dispatch(login());
  };

  useEffect(() => {
    if (localStorage.getItem("blazingToken") !== null && !isLoggedIn) {
      authFunc();
    }
  }, [typeof window ?? localStorage.getItem("blazingToken"), isLoggedIn]);

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout children={page} />);

  return (
    <SkeletonTheme>
      <NotificationsProvider>
        <CurrentDeviceProvider>
          <CategoriesDataProvider>
            {getLayout(
              <QueryClientProvider client={queryClient}>
              <Provider store={configureStore}>
                <Component {...pageProps} />
                <ToastContainer
                  transition={Zoom}
                  theme="colored"
                  autoClose={1000}
                  hideProgressBar={true}
                  newestOnTop={true}
                  draggable={false}
                  pauseOnVisibilityChange
                  closeOnClick
                  pauseOnHover
                />
                 {/* Note: ReactQueryDevtools can be used for api testing purpose when running locally.
                            To use it uncomment it here and also above import.  */}
                {/* <ReactQueryDevtools initialIsOpen /> */}
              </Provider>
              </QueryClientProvider>
            )}
          </CategoriesDataProvider>
        </CurrentDeviceProvider>
      </NotificationsProvider>
    </SkeletonTheme>
  );
}

const makestore = () => configureStore;
const wrappers = createWrapper(makestore);

export default wrappers.withRedux(appWithTranslation(MyApp));

// MyApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })
