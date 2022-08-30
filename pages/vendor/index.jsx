import React from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import VendorSignUpIndex from '../../components/partials/account/VendorSign';

function VendorSignUp() {

    return(
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            {/* <ThemeChanger/> */}
            <div className="ps-page--my-account">
                <VendorSignUpIndex/>
            </div>
            <FooterDefault />
        </div>
    )

}
export default VendorSignUp;