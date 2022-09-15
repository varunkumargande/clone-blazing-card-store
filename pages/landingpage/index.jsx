import React from "react";
import Header from "../../components/partials/LandingPage/Header";
import Category from "../../components/partials/LandingPage/Category";
import LiveShow from "../../components/partials/LandingPage/LiveShow";
import ScheduledShow from "../../components/partials/LandingPage/ScheduledShow";
import Pokeman from "../../components/partials/LandingPage/Pokeman";
import Jewellery from "../../components/partials/LandingPage/Jewellery";
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