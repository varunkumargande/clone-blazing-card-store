import App from 'next/app';
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import configureStore from '../store/store';
import DefaultLayout from '../components/layouts/DefaultLayout';
import { createWrapper } from 'next-redux-wrapper';
import { appWithTranslation } from '../i18n';
import '../scss/style.scss';
import getProfileApi from '../api/home/getProfile';
import getPageApi from '../api/home/getPage';
import { colorThemeCurrent, viewcolorThemeCurrent } from '../store/colorPalette/action';
import Router from 'next/router';
import { Flip, ToastContainer,Zoom } from "react-toastify";
import 'react-toastify/scss/main.scss'
import { LanguageSwitcherAPi } from '../api/account/languageSwitcherAPi';




function MyApp({ Component, pageProps }) {

 

    const RedirectMaintain = useSelector(s => s.setting.maintenance)
    useEffect(() => {
        if (RedirectMaintain === 1) {
            Router.push('/maintenance')
        }
    }, [])


    const dispatch = useDispatch()


    useEffect(() => {
        setTimeout(function () {
            document.getElementById('__next').classList.add('loaded');
        }, 100);
        getProfileApi(dispatch)
        getPageApi(dispatch)
        LanguageSwitcherAPi(dispatch)
       
        sessionStorage.getItem("colorThemeSpurt") && dispatch(colorThemeCurrent(sessionStorage.getItem("colorThemeSpurt")))
        sessionStorage.getItem("colorThemeSpurtView") && dispatch(viewcolorThemeCurrent(sessionStorage.getItem("colorThemeSpurtView")))

    }, [])

    const getLayout =
        Component.getLayout || (page => <DefaultLayout children={page} />);
    return getLayout(

        <Provider store={configureStore}>
           
            <Component {...pageProps} />
       
            <ToastContainer
            // limit={1}
                transition={Zoom}
                theme="colored"
                autoClose={1000}
                hideProgressBar={true}
                 newestOnTop={true}   
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover
                // hideDuration={100}
                // position='fixed'
                // containerId="second"
               
                
            />

        </Provider>
    );

}

const makestore = () => configureStore;
const wrappers = createWrapper(makestore);

export default wrappers.withRedux(appWithTranslation(MyApp))

// MyApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })
