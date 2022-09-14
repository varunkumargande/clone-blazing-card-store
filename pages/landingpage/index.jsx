import React from "react";
import Header from "../../components/partials/Landingpage/Header";
import Category from "../../components/partials/Landingpage/Category";
import LiveShow from "../../components/partials/Landingpage/LiveShow";
import ScheduledShow from "../../components/partials/Landingpage/ScheduledShow";
import Pokeman from "../../components/partials/Landingpage/Pokeman";
import Jewellery from "../../components/partials/Landingpage/Jewellery";
import Footer from "../../components/partials/LandingPage/Footer";

export default function landingpage(){
    return(
        <div className="home-container">
            <Header />
            <Category />
            <div className="card-wrapper">
                <LiveShow />
                <ScheduledShow />
                <Pokeman />
                <Jewellery />
            </div>
            <Footer />
        </div>
    );
}