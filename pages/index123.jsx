import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getCollections } from "../store/collection/action";
import { useState, useEffect } from "react";
import { dealOfDayApi } from "../api";
import { homeBannerApi } from "../api";
import { featuredApi } from "../api";
// import { categoryListApi } from "../api";
import useNetwork from "../components/reusable/NetworkCheck";
import Router from "next/router";
import getPageApi from "../api/home/getPage";
import HeaderDefault from "../components/shared/headers/HeaderDefault";
import HeaderMobile from "../components/shared/headers/HeaderMobile";
import NavigationList from "../components/shared/navigation/NavigationList";
import ThemeChanger from "../components/elements/color/themeControl";
import SubscribePopup from "../components/shared/modal/SubscribePopup";
import HomeBanner from "../components/partials/homepage/home-default/HomeBanner";
import HomeDefaultDealOfDay from "../components/partials/homepage/home-default/HomeDefaultDealOfDay";
import ConumerElectronics from "../components/partials/homepage/home-default/ConumerElectronics";
import FooterFullwidth from "../components/shared/footers/FooterFullwidth";
import { WidgetApi } from "../api/home/widgetsapi";
import TopSelling from "../components/partials/homepage/home-default/TopSelling";




function Index(props) {
  const [subscribe, setSubscribe] = useState(false);
  // const [banner, setBanner] = useState([]);
  // const [brands, setBrands] = useState([]);
  const [wightdata, setDeals]=useState([])
  const dispatch = useDispatch();
  let deals = useSelector((s) => s.collection);
  let banner=useSelector(s=>s.wishlist.banners)

  const network = useNetwork();

  useEffect(() => {
    if (network === false) {
      Router.push("/network-error");
    }
  }, []);

  
  useEffect(() => {
    // ManufacturerApi(dispatch);
    // categoryListApi(dispatch);
    dealOfDayApi(dispatch);
    homeBannerApi(dispatch);
    featuredApi(dispatch);
    WidgetApi(dispatch,setDeals);
    getPageApi(dispatch);

    const { querys } = props;
    if (querys) {
      const collectionsSlug = [
        "deal_of_the_day",
        "consumer_electronics",
        "clothings",
        "garden_and_kitchen",
        "new_arrivals_products",
      ];
      dispatch(getCollections(collectionsSlug));
    }
  }, []);
  return (
    <div className="site-content">
      <HeaderDefault />
     <HeaderMobile />
      <NavigationList />
     <ThemeChanger />


        <SubscribePopup active={subscribe} />
      
      <main id="homepage-1">
        <HomeBanner data={banner} />
        {deals &&
          deals.collections !== [] &&
          
            <HomeDefaultDealOfDay
              collectionSlug="deal_of_the_day"
              data={deals.collections}
            />
          }
          
        {deals &&
          deals.collections !== [] &&
          
            <ConumerElectronics
              collectionSlug="consumer_electronics"
              data={deals.collection}
            />
          }

        <div className="ps-container">
          <div className="banner-container">
            <div className="banner-width">
              <img src="/static/img/banner-sm1.jpg" alt="" />
            </div>
            <div className="banner-width banner-width-sec">
              <img src="/static/img/banner-sm2.jpg" alt="" />
            </div>
            <div className="banner-width">
              <img src="/static/img/banner-sm3.jpg" alt="" />
            </div>
          </div>
        </div>
        {wightdata &&
          wightdata &&
          wightdata.map((deal, index)  => (
                   
                 <TopSelling collectionSlug="top-selling" data={deal.items} coreData={deal}/>
          
           ))}
             
       
       
       
      </main>
   

      <FooterFullwidth />


      
    </div>
  );
}

export default connect((state) => state.collection)(Index);
