import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import FooterWidgets from './modules/FooterWidgets';
import FooterLinks from './modules/FooterLinks';
import FooterCopyright from './modules/FooterCopyright';

const FooterFullwidth = () => (
    <footer className="ps-footer">
        <div className="ps-container">
            <FooterWidgets />
            {/* <FooterLinks /> */}
            <FooterCopyright />
        </div>
    </footer>
);

export default FooterFullwidth;
