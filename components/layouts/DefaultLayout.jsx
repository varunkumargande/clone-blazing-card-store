import React from 'react';
//import {ConnectPlugin} from '../../components/connectPlugins';
import Head from './modules/Head';
import BackToTop from '../elements/BackToTop';


const DefaultLayout = ({ children }) => (
    <div className="layout--default">
        <Head />
        {children}
        <div id="loader-wrapper">
            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
        </div>
        <BackToTop scrollStepInPx="1000" delayInMs="0.5" />
        {/* <Resuable /> */}
    </div>
);

export default DefaultLayout;
