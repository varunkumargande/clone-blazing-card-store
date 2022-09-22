import React, { useEffect } from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import {useRouter} from "next/router";




const commonvendorproduct = () => {

    const router=useRouter()
    const Productslug=router.query.cvp
    const breadCrumb = [
      
        {
            text: 'Blogs',
        },
    ];

    
   

    return (
        <div className="layout--product">
        <>
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger />
            <div className="ps-page--blog">
           
                {/* <BreadCrumb2 breacrumb={breadCrumb} /> */}

         
                        
            {/* <Commonvendorproductlist Productslug={Productslug} /> */}
                        

              {/* <commonvendorproduct /> */}

            </div>
            <FooterDefault />
            </>
        </div>
    );
};

export default commonvendorproduct;
