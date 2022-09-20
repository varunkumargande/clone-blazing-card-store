import React from 'react';

import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import AddAddress from '../../components/partials/account/AddAddress';
import MobileHeader from '../../components/shared/headers/MobileHeader';
import Header from '../../components/shared/headers/modules/Header';
import Category from '../../components/partials/LandingPage/Category';
import { useSelector, useDispatch } from 'react-redux';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Account',
            url: '/',
        },
        {
            text: 'Add address',
        },
    ];

    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };
    const categories = useSelector((state)=>state?.category?.categories)
    const dispatch = useDispatch();
    console.log("landing page", dispatch)
    useEffect(() => {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    }, []);


    return (
        <div className="site-content">
           {windowWidth <= 1024 ? <MobileHeader/> : <HeaderDefault />}
            <Category />
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <AddAddress/>
            </div>
            {/* <Newsletters layout="container" /> */}
            <FooterDefault />
        </div>
    );
};

export default MyAccountPage;
